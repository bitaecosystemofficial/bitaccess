
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ContractResult } from '@/types/contracts';
import { spinWheelService, Prize, UserPrize } from '@/services/SpinWheelService';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from '@/hooks/use-toast';

export interface SpinWheelData {
  totalSpins: number;
  dailySpins: number;
  prizes: Prize[];
  userCanSpin: boolean;
  userLastSpinTime: number;
  cooldownPeriod: number;
  spinCost: string;
  freeSpins: number;
  spinMultiplier: number;
  userPrizes: UserPrize[];
}

export const useSpinWheelData = () => {
  const { isConnected, address } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [spinWheelData, setSpinWheelData] = useState<SpinWheelData>({
    totalSpins: 0,
    dailySpins: 0,
    prizes: [],
    userCanSpin: false,
    userLastSpinTime: 0,
    cooldownPeriod: 24 * 60 * 60,
    spinCost: "100",
    freeSpins: 0,
    spinMultiplier: 1,
    userPrizes: []
  });

  const fetchSpinWheelData = async () => {
    if (!isConnected || !address) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      const [
        totalSpins,
        dailySpins,
        prizes,
        canSpin,
        lastSpin,
        cooldownPeriod,
        spinCost,
        freeSpins,
        spinMultiplier,
        userPrizes
      ] = await Promise.all([
        spinWheelService.getTotalSpins(),
        spinWheelService.getDailySpins(),
        spinWheelService.getPrizes(),
        spinWheelService.canSpin(address),
        spinWheelService.getSpinCooldown(address),
        spinWheelService.getCooldownPeriod(),
        spinWheelService.getSpinCost(),
        spinWheelService.getFreeSpins(address),
        spinWheelService.getSpinMultiplier(address),
        spinWheelService.getUserPrizes(address)
      ]);

      setSpinWheelData({
        totalSpins: totalSpins ? totalSpins.toNumber() : 0,
        dailySpins: dailySpins ? dailySpins.toNumber() : 0,
        prizes: prizes || [],
        userCanSpin: canSpin || false,
        userLastSpinTime: lastSpin ? lastSpin.toNumber() : 0,
        cooldownPeriod: cooldownPeriod ? cooldownPeriod.toNumber() : 24 * 60 * 60,
        spinCost: spinCost || "100",
        freeSpins: freeSpins || 0,
        spinMultiplier: spinMultiplier || 1,
        userPrizes: userPrizes || []
      });
    } catch (error) {
      console.error("Error fetching spin wheel data:", error);
      toast({
        title: "Error fetching spin wheel data",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpinWheelData();
    
    // Set up a refresh interval
    const interval = setInterval(fetchSpinWheelData, 30000);
    return () => clearInterval(interval);
  }, [isConnected, address]);

  const refreshData = () => {
    fetchSpinWheelData();
  };

  return { spinWheelData, isLoading, refreshData };
};

export const spinWheel = async (walletAddress: string): Promise<ContractResult> => {
  try {
    // First approve tokens for spending
    await spinWheelService.approveTokensForSpin();
    
    // Then perform the spin
    const receipt = await spinWheelService.spin();
    
    return { 
      success: true, 
      hash: receipt.transactionHash 
    };
  } catch (error) {
    console.error("Error spinning wheel:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
