
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { StakingABI } from '@/contracts/abis/StakingABI';
import { BaseContractService } from './BaseContractService';

export enum StakingTier {
  TIER_120DAYS = 0,
  TIER_180DAYS = 1,
  TIER_240DAYS = 2
}

export interface StakeInfo {
  amount: ethers.BigNumber;
  startTime: ethers.BigNumber;
  lastClaimTime: ethers.BigNumber;
  tier: StakingTier;
}

export class StakingService extends BaseContractService {
  async getStakingContract(withEvents = false) {
    const contract = new ethers.Contract(contractAddresses.staking, StakingABI, this.signer);
    if (withEvents && !this.eventSubscriptions.has('staking')) {
      this.eventSubscriptions.set('staking', contract);
      console.log('Subscribed to Staking events');
    }
    return contract;
  }

  async stake(amount: string, tier: StakingTier) {
    const contract = await this.getStakingContract();
    const tx = await contract.stake(ethers.utils.parseEther(amount), tier);
    return tx.wait();
  }

  async unstake(amount: string) {
    const contract = await this.getStakingContract();
    const tx = await contract.unstake(ethers.utils.parseEther(amount));
    return tx.wait();
  }

  async claimRewards() {
    const contract = await this.getStakingContract();
    const tx = await contract.claimRewards();
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
      const [stakedBalance, rewards, totalStaked, apy, unlockTime, lockPeriod, stake] = await Promise.all([
        contract.getStakedBalance(address),
        contract.getRewards(address),
        contract.getTotalStaked(),
        contract.getAPY(address).catch(() => ethers.BigNumber.from(0)),
        contract.getUserUnlockTime(address).catch(() => ethers.BigNumber.from(0)),
        contract.getLockPeriod(address).catch(() => ethers.BigNumber.from(0)),
        contract.stakes(address).catch(() => ({ amount: ethers.BigNumber.from(0), startTime: ethers.BigNumber.from(0), lastClaimTime: ethers.BigNumber.from(0), tier: 0 }))
      ]);
      
      // Get tier information
      const tier0APY = await contract.tierAPY(0);
      const tier1APY = await contract.tierAPY(1);
      const tier2APY = await contract.tierAPY(2);
      
      const tier0Duration = await contract.tierDuration(0);
      const tier1Duration = await contract.tierDuration(1);
      const tier2Duration = await contract.tierDuration(2);
      
      const earlyWithdrawalFee = await contract.earlyWithdrawalFee();
      const minStakeAmount = await contract.getMinStakeAmount();

      console.log('Fetched staking info:', {
        stakedBalance: ethers.utils.formatEther(stakedBalance),
        rewards: ethers.utils.formatEther(rewards),
        totalStaked: ethers.utils.formatEther(totalStaked),
        apy: apy.toString(),
        unlockTime: unlockTime.toNumber(),
        lockPeriod: lockPeriod.toNumber(),
        stake,
        tiers: {
          [StakingTier.TIER_120DAYS]: {
            apy: tier0APY.toNumber(),
            duration: tier0Duration.toNumber()
          },
          [StakingTier.TIER_180DAYS]: {
            apy: tier1APY.toNumber(),
            duration: tier1Duration.toNumber()
          },
          [StakingTier.TIER_240DAYS]: {
            apy: tier2APY.toNumber(),
            duration: tier2Duration.toNumber()
          }
        },
        earlyWithdrawalFee: earlyWithdrawalFee.toNumber(),
        minStakeAmount: ethers.utils.formatEther(minStakeAmount)
      });

      return {
        stakedBalance,
        rewards,
        totalStaked,
        apy,
        unlockTime: unlockTime.toNumber(),
        lockPeriod: lockPeriod.toNumber(),
        stake,
        tiers: {
          [StakingTier.TIER_120DAYS]: {
            apy: tier0APY.toNumber(),
            duration: tier0Duration.toNumber()
          },
          [StakingTier.TIER_180DAYS]: {
            apy: tier1APY.toNumber(),
            duration: tier1Duration.toNumber()
          },
          [StakingTier.TIER_240DAYS]: {
            apy: tier2APY.toNumber(),
            duration: tier2Duration.toNumber()
          }
        },
        earlyWithdrawalFee: earlyWithdrawalFee.toNumber(),
        minStakeAmount: ethers.utils.formatEther(minStakeAmount)
      };
    } catch (error) {
      console.error('Error fetching staking info:', error);
      throw error;
    }
  }

  async getTierDetails() {
    const contract = await this.getStakingContract();
    
    try {
      // Get tier information
      const tier0APY = await contract.tierAPY(0);
      const tier1APY = await contract.tierAPY(1);
      const tier2APY = await contract.tierAPY(2);
      
      const tier0Duration = await contract.tierDuration(0);
      const tier1Duration = await contract.tierDuration(1);
      const tier2Duration = await contract.tierDuration(2);

      return {
        [StakingTier.TIER_120DAYS]: {
          apy: tier0APY.toNumber(),
          duration: tier0Duration.toNumber() 
        },
        [StakingTier.TIER_180DAYS]: {
          apy: tier1APY.toNumber(),
          duration: tier1Duration.toNumber()
        },
        [StakingTier.TIER_240DAYS]: {
          apy: tier2APY.toNumber(),
          duration: tier2Duration.toNumber()
        }
      };
    } catch (error) {
      console.error('Error fetching tier details:', error);
      throw error;
    }
  }
}

export const stakingService = new StakingService();
