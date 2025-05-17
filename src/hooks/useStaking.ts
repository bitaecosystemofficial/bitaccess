
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { stakingService, StakingTier } from '@/services/StakingService';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from '@/hooks/use-toast';
import { useContractEvents } from '@/hooks/useContractEvents';

export interface TierInfo {
  apy: number;
  duration: number;
  displayName: string;
  durationInDays: number;
}

export interface StakingData {
  stakedBalance: string;
  rewards: string;
  totalStaked: string;
  apy: number;
  unlockTime: number;
  lockPeriod: number;
  currentTier: StakingTier;
  tiers: Record<StakingTier, TierInfo>;
  earlyWithdrawalFee: number;
  minStakeAmount: string;
  hasActiveStake: boolean;
  timeRemaining: number;
}

export const useStaking = () => {
  const { isConnected, address } = useWallet();
  const { latestStakingEvent } = useContractEvents();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stakingData, setStakingData] = useState<StakingData>({
    stakedBalance: '0',
    rewards: '0',
    totalStaked: '0',
    apy: 0,
    unlockTime: 0,
    lockPeriod: 0,
    currentTier: StakingTier.TIER_120DAYS,
    tiers: {
      [StakingTier.TIER_120DAYS]: { apy: 10, duration: 120 * 86400, displayName: '120 Days', durationInDays: 120 },
      [StakingTier.TIER_180DAYS]: { apy: 20, duration: 180 * 86400, displayName: '180 Days', durationInDays: 180 },
      [StakingTier.TIER_240DAYS]: { apy: 30, duration: 240 * 86400, displayName: '240 Days', durationInDays: 240 }
    },
    earlyWithdrawalFee: 25,
    minStakeAmount: '100',
    hasActiveStake: false,
    timeRemaining: 0
  });
  
  const fetchStakingData = useCallback(async () => {
    if (!isConnected || !address) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      const data = await stakingService.getStakingInfo(address);
      
      const now = Math.floor(Date.now() / 1000);
      const remainingTime = data.unlockTime > now ? data.unlockTime - now : 0;
      
      // Format tier display names
      const formattedTiers: Record<StakingTier, TierInfo> = {
        [StakingTier.TIER_120DAYS]: {
          apy: data.tiers[StakingTier.TIER_120DAYS].apy,
          duration: data.tiers[StakingTier.TIER_120DAYS].duration,
          displayName: '120 Days',
          durationInDays: Math.floor(data.tiers[StakingTier.TIER_120DAYS].duration / 86400)
        },
        [StakingTier.TIER_180DAYS]: {
          apy: data.tiers[StakingTier.TIER_180DAYS].apy,
          duration: data.tiers[StakingTier.TIER_180DAYS].duration,
          displayName: '180 Days',
          durationInDays: Math.floor(data.tiers[StakingTier.TIER_180DAYS].duration / 86400)
        },
        [StakingTier.TIER_240DAYS]: {
          apy: data.tiers[StakingTier.TIER_240DAYS].apy,
          duration: data.tiers[StakingTier.TIER_240DAYS].duration,
          displayName: '240 Days',
          durationInDays: Math.floor(data.tiers[StakingTier.TIER_240DAYS].duration / 86400)
        }
      };
      
      setStakingData({
        stakedBalance: ethers.utils.formatEther(data.stakedBalance),
        rewards: ethers.utils.formatEther(data.rewards),
        totalStaked: ethers.utils.formatEther(data.totalStaked),
        apy: data.apy.toNumber(),
        unlockTime: data.unlockTime,
        lockPeriod: data.lockPeriod,
        currentTier: data.stake.tier,
        tiers: formattedTiers,
        earlyWithdrawalFee: data.earlyWithdrawalFee,
        minStakeAmount: data.minStakeAmount,
        hasActiveStake: data.stakedBalance.gt(0),
        timeRemaining: remainingTime
      });
    } catch (error) {
      console.error('Error fetching staking data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch staking data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address]);

  const stakeTokens = async (amount: string, tier: StakingTier) => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return false;
    }
    
    try {
      await stakingService.stake(amount, tier);
      toast({
        title: 'Success',
        description: `Successfully staked ${amount} BIT tokens`,
      });
      fetchStakingData();
      return true;
    } catch (error) {
      console.error('Error staking tokens:', error);
      toast({
        title: 'Staking Failed',
        description: error instanceof Error ? error.message : 'Transaction failed',
        variant: 'destructive',
      });
      return false;
    }
  };

  const unstakeTokens = async (amount: string) => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return false;
    }
    
    try {
      await stakingService.unstake(amount);
      toast({
        title: 'Success',
        description: `Successfully unstaked ${amount} BIT tokens`,
      });
      fetchStakingData();
      return true;
    } catch (error) {
      console.error('Error unstaking tokens:', error);
      toast({
        title: 'Unstaking Failed',
        description: error instanceof Error ? error.message : 'Transaction failed',
        variant: 'destructive',
      });
      return false;
    }
  };

  const claimRewards = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return false;
    }
    
    try {
      await stakingService.claimRewards();
      toast({
        title: 'Success',
        description: 'Successfully claimed your rewards',
      });
      fetchStakingData();
      return true;
    } catch (error) {
      console.error('Error claiming rewards:', error);
      toast({
        title: 'Claiming Failed',
        description: error instanceof Error ? error.message : 'Transaction failed',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchStakingData();
    
    // Refresh staking data periodically (every 30 seconds)
    const interval = setInterval(fetchStakingData, 30000);
    return () => clearInterval(interval);
  }, [fetchStakingData]);

  // Update on staking events
  useEffect(() => {
    if (latestStakingEvent) {
      console.log('New staking event detected:', latestStakingEvent);
      fetchStakingData();
    }
  }, [latestStakingEvent, fetchStakingData]);

  // Update remaining time every second
  useEffect(() => {
    if (!stakingData.hasActiveStake) return;
    
    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const remainingTime = stakingData.unlockTime > now ? 
        stakingData.unlockTime - now : 0;
      
      setStakingData(prev => ({
        ...prev,
        timeRemaining: remainingTime
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [stakingData.unlockTime, stakingData.hasActiveStake]);

  return {
    stakingData,
    isLoading,
    stakeTokens,
    unstakeTokens,
    claimRewards,
    refreshData: fetchStakingData
  };
};
