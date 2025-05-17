import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { AirdropABI } from '@/contracts/abis/AirdropABI';
import { BaseContractService } from './BaseContractService';

export class AirdropService extends BaseContractService {
  // Add the missing ensureConnected method
  async ensureConnected() {
    if (!this.provider) {
      throw new Error("Provider not initialized. Please connect to a wallet.");
    }
    
    if (!this.signer) {
      throw new Error("Signer not initialized. Please connect to a wallet.");
    }
  }
  
  async getAirdropContract(withSigner = false) {
    try {
      if (withSigner) {
        await this.ensureConnected();
        return new ethers.Contract(contractAddresses.airdrop, AirdropABI, this.signer);
      } else {
        return new ethers.Contract(contractAddresses.airdrop, AirdropABI, this.provider);
      }
    } catch (error) {
      console.error("Error getting Airdrop contract:", error);
      throw error;
    }
  }

  async claimAirdrop() {
    try {
      const contract = await this.getAirdropContract(true);
      const tx = await contract.claim();
      return tx.wait();
    } catch (error) {
      console.error("Error claiming airdrop:", error);
      throw error;
    }
  }

  async completeTask(taskId: number, uniqueCode: string) {
    try {
      const contract = await this.getAirdropContract(true);
      // Convert the string to bytes32
      const bytes32Code = ethers.utils.id(uniqueCode);
      const tx = await contract.completeTask(taskId, bytes32Code);
      return tx.wait();
    } catch (error) {
      console.error(`Error completing task ${taskId}:`, error);
      throw error;
    }
  }

  async getUserStatus(address: string) {
    try {
      const contract = await this.getAirdropContract();
      const status = await contract.getUserStatus(address);
      return {
        completedTasks: status[0].toNumber(),
        pendingReward: ethers.utils.formatEther(status[1]),
        eligible: status[2]
      };
    } catch (error) {
      console.error("Error getting user status:", error);
      return { completedTasks: 0, pendingReward: "0", eligible: false };
    }
  }

  async hasTaskCompleted(address: string, taskId: number) {
    try {
      const contract = await this.getAirdropContract();
      return await contract.hasTaskCompleted(address, taskId);
    } catch (error) {
      console.error(`Error checking task ${taskId} completion:`, error);
      return false;
    }
  }

  async getAirdropInfo() {
    try {
      const contract = await this.getAirdropContract();
      
      const totalAmount = await contract.totalAirdropAmount();
      const totalClaimed = await contract.totalClaimed();
      const participants = await contract.totalParticipants();
      const deadline = await contract.claimDeadline();
      const remaining = await contract.getRemainingAirdrop();
      
      return {
        totalAmount: ethers.utils.formatEther(totalAmount),
        totalClaimed: ethers.utils.formatEther(totalClaimed),
        participants: participants.toNumber(),
        deadline: new Date(deadline.toNumber() * 1000),
        remaining: ethers.utils.formatEther(remaining)
      };
    } catch (error) {
      console.error("Error fetching airdrop info:", error);
      throw error;
    }
  }

  async getTaskDetails() {
    try {
      const contract = await this.getAirdropContract();
      
      const tasks = [];
      for (let i = 1; i <= 4; i++) {
        const task = await contract.tasks(i);
        tasks.push({
          id: i,
          url: task.url,
          reward: ethers.utils.formatEther(task.reward),
          active: task.active
        });
      }
      
      return tasks;
    } catch (error) {
      console.error("Error fetching task details:", error);
      return [];
    }
  }

  async hasClaimed(address: string) {
    try {
      const contract = await this.getAirdropContract();
      return await contract.hasClaimed(address);
    } catch (error) {
      console.error("Error checking claim status:", error);
      return false;
    }
  }
  
  // Fixed subscribeToAirdropEvents method
  async subscribeToAirdropEvents(callbacks: { onTaskCompleted?: (user: string, taskId: number) => void, onTokensClaimed?: (user: string, amount: string) => void }) {
    try {
      // Await the contract to get the actual instance
      const contract = await this.getAirdropContract();
      
      if (callbacks.onTaskCompleted) {
        contract.on("TaskCompleted", (user, taskId) => {
          callbacks.onTaskCompleted?.(user, taskId.toNumber());
        });
      }
      
      if (callbacks.onTokensClaimed) {
        contract.on("TokensClaimed", (user, amount) => {
          callbacks.onTokensClaimed?.(user, ethers.utils.formatEther(amount));
        });
      }
      
      return () => {
        contract.removeAllListeners("TaskCompleted");
        contract.removeAllListeners("TokensClaimed");
      };
    } catch (error) {
      console.error("Error subscribing to airdrop events:", error);
      return () => {};
    }
  }
}

export const airdropService = new AirdropService();
