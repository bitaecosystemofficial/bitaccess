
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { StakingABI } from '@/contracts/abis/StakingABI';
import { BaseContractService } from './BaseContractService';

export class StakingService extends BaseContractService {
  async getStakingContract(withEvents = false) {
    const contract = new ethers.Contract(contractAddresses.staking, StakingABI, this.signer);
    if (withEvents && !this.eventSubscriptions.has('staking')) {
      this.eventSubscriptions.set('staking', contract);
      console.log('Subscribed to Staking events');
    }
    return contract;
  }

  async stake(amount: string) {
    const contract = await this.getStakingContract();
    const tx = await contract.stake(amount);
    return tx.wait();
  }

  async unstake(amount: string) {
    const contract = await this.getStakingContract();
    const tx = await contract.unstake(amount);
    return tx.wait();
  }

  async subscribeToStakingEvents(callback: (event: any) => void) {
    const contract = await this.getStakingContract(true);
    contract.on('Staked', callback);
    contract.on('Unstaked', callback);
    contract.on('RewardsClaimed', callback);
    console.log('Subscribed to Staking events');
  }

  async getStakingInfo(address: string) {
    const contract = await this.getStakingContract();
    try {
      const [stakedBalance, rewards, totalStaked, apy] = await Promise.all([
        contract.getStakedBalance(address),
        contract.getRewards(address),
        contract.getTotalStaked(),
        contract.getAPY()
      ]);
      
      console.log('Fetched staking info:', {
        stakedBalance: ethers.utils.formatEther(stakedBalance),
        rewards: ethers.utils.formatEther(rewards),
        totalStaked: ethers.utils.formatEther(totalStaked),
        apy: apy.toString()
      });

      return {
        stakedBalance,
        rewards,
        totalStaked,
        apy
      };
    } catch (error) {
      console.error('Error fetching staking info:', error);
      throw error;
    }
  }
}

export const stakingService = new StakingService();
