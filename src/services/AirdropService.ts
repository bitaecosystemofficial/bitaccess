
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { AirdropABI } from '@/contracts/abis/AirdropABI';
import { BaseContractService } from './BaseContractService';

export interface AirdropEvents {
  onTaskCompleted?: (user: string, taskId: number) => void;
  onTokensClaimed?: (user: string, amount: string) => void;
}

export class AirdropService extends BaseContractService {
  async getAirdropContract(withEvents = false) {
    const contract = new ethers.Contract(contractAddresses.airdrop, AirdropABI, this.signer);
    if (withEvents && !this.eventSubscriptions.has('airdrop')) {
      this.eventSubscriptions.set('airdrop', contract);
      console.log('Subscribed to Airdrop events');
    }
    return contract;
  }

  async claimAirdrop() {
    const contract = await this.getAirdropContract();
    const tx = await contract.claim();
    return tx.wait();
  }

  async checkAirdropEligibility(address: string) {
    const contract = await this.getAirdropContract();
    return contract.isEligible(address);
  }

  async verifyAirdropTask(address: string, taskId: number) {
    const contract = await this.getAirdropContract();
    const tx = await contract.verifyTasks(address, taskId);
    return tx.wait();
  }

  async subscribeToAirdropEvents(events: AirdropEvents) {
    const contract = await this.getAirdropContract(true);
    
    if (events.onTaskCompleted) {
      contract.on('TaskCompleted', (user, taskId, timestamp) => {
        events.onTaskCompleted?.(user, taskId.toNumber());
      });
    }
    
    if (events.onTokensClaimed) {
      contract.on('TokensClaimed', (user, amount, timestamp) => {
        events.onTokensClaimed?.(user, ethers.utils.formatEther(amount));
      });
    }
    
    console.log('Subscribed to Airdrop events');
  }

  async cleanup() {
    const contract = this.eventSubscriptions.get('airdrop');
    if (contract) {
      contract.removeAllListeners('TaskCompleted');
      contract.removeAllListeners('TokensClaimed');
      this.eventSubscriptions.delete('airdrop');
      console.log('Unsubscribed from Airdrop events');
    }
  }
}

export const airdropService = new AirdropService();
