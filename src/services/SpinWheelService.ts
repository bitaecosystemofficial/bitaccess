
import { ethers } from 'ethers';
import { contractAddresses, tokenAddresses } from '@/constants/contracts';
import { SpinWheelABI } from '@/contracts/abis/SpinWheelABI';
import { TokenABI } from '@/contracts/abis/TokenABI';
import { BaseContractService } from './BaseContractService';

export interface Prize {
  name: string;
  amount: number; // This will be converted from BigNumber
  probability: number;
  isFreeSpin: boolean;
  spinMultiplier: number;
}

export interface UserPrize {
  prizeId: number;
  amount: number;
  timestamp: number;
  isFreeSpin: boolean;
  spinMultiplier: number;
}

export class SpinWheelService extends BaseContractService {
  async getSpinWheelContract() {
    return new ethers.Contract(contractAddresses.spinWheel, SpinWheelABI, this.signer);
  }

  async getTokenContract() {
    return new ethers.Contract(tokenAddresses.bit, TokenABI, this.signer);
  }
  
  async getSpinCost() {
    const contract = await this.getSpinWheelContract();
    const spinCost = await contract.spinCost();
    return ethers.utils.formatEther(spinCost);
  }

  async approveTokensForSpin() {
    try {
      const tokenContract = await this.getTokenContract();
      const spinWheelContract = await this.getSpinWheelContract();
      const spinCost = await spinWheelContract.spinCost();
      
      // Approve with a slightly higher amount to account for gas
      const approvalAmount = spinCost.mul(110).div(100);
      const tx = await tokenContract.approve(contractAddresses.spinWheel, approvalAmount);
      return await tx.wait();
    } catch (error) {
      console.error("Error approving tokens for spin:", error);
      throw error;
    }
  }

  async spin() {
    const contract = await this.getSpinWheelContract();
    const tx = await contract.spin();
    return tx.wait();
  }

  async canSpin(address: string) {
    const contract = await this.getSpinWheelContract();
    return contract.canSpin(address);
  }

  async getSpinCooldown(address: string) {
    const contract = await this.getSpinWheelContract();
    return contract.getUserLastSpin(address);
  }

  async getTotalSpins() {
    const contract = await this.getSpinWheelContract();
    return contract.getTotalSpins();
  }

  async getDailySpins() {
    const contract = await this.getSpinWheelContract();
    return contract.getDailySpins();
  }

  async getCooldownPeriod() {
    const contract = await this.getSpinWheelContract();
    return contract.getCooldownPeriod();
  }

  async getPrizes() {
    try {
      const contract = await this.getSpinWheelContract();
      const prizes = await contract.getPrizes();
      
      return prizes.map((prize: any) => ({
        name: prize.name,
        amount: parseInt(ethers.utils.formatEther(prize.amount)),
        probability: prize.probability.toNumber(),
        isFreeSpin: prize.isFreeSpin,
        spinMultiplier: prize.spinMultiplier.toNumber()
      }));
    } catch (error) {
      console.error("Error fetching prizes:", error);
      return [];
    }
  }

  async getUserPrizes(address: string) {
    try {
      const contract = await this.getSpinWheelContract();
      const prizes = await contract.getUserPrizes(address);
      
      return prizes.map((prize: any) => ({
        prizeId: prize.prizeId.toNumber(),
        amount: parseInt(ethers.utils.formatEther(prize.amount)),
        timestamp: prize.timestamp.toNumber(),
        isFreeSpin: prize.isFreeSpin,
        spinMultiplier: prize.spinMultiplier.toNumber()
      }));
    } catch (error) {
      console.error("Error fetching user prizes:", error);
      return [];
    }
  }

  async getFreeSpins(address: string) {
    try {
      const contract = await this.getSpinWheelContract();
      const freeSpins = await contract.getFreeSpins(address);
      return freeSpins.toNumber();
    } catch (error) {
      console.error("Error fetching free spins:", error);
      return 0;
    }
  }

  async getSpinMultiplier(address: string) {
    try {
      const contract = await this.getSpinWheelContract();
      const multiplier = await contract.getSpinMultiplier(address);
      return multiplier.toNumber();
    } catch (error) {
      console.error("Error fetching spin multiplier:", error);
      return 1;
    }
  }
}

export const spinWheelService = new SpinWheelService();
