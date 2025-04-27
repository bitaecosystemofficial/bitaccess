import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { contractService } from '@/services/ContractService';
import { useWallet } from '@/contexts/WalletContext';
import { ethers } from 'ethers';

export interface PresaleData {
  currentPrice: number;
  nextPhasePrice: number;
  launchPrice: number;
  totalSupply: number;
  soldTokens: number;
  progress: number;
  softCap: number;
  hardCap: number;
  endTimeInSeconds: number;
  paymentMethods: {
    bnb: { rate: number; min: number; max: number };
    usdt: { rate: number; min: number; max: number };
  };
  address: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const usePresaleData = () => {
  const { isConnected } = useWallet();
  const [presaleData, setPresaleData] = useState<PresaleData>({
    currentPrice: 0.042,
    nextPhasePrice: 0.056,
    launchPrice: 0.07,
    totalSupply: 5000000,
    soldTokens: 3400000,
    progress: 68,
    softCap: 2000000,
    hardCap: 5000000,
    endTimeInSeconds: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    paymentMethods: {
      bnb: { rate: 250, min: 0.1, max: 50 },
      usdt: { rate: 1, min: 50, max: 25000 }
    },
    address: '0x1234567890123456789012345678901234567890'
  });

  useEffect(() => {
    const fetchPresaleData = async () => {
      if (!isConnected) return;

      try {
        const info = await contractService.getPresaleInfo();
        setPresaleData(prev => ({
          ...prev,
          currentPrice: parseFloat(ethers.utils.formatEther(info.price)),
          soldTokens: parseFloat(ethers.utils.formatEther(info.available)),
          endTimeInSeconds: info.endTime.toNumber()
        }));
      } catch (error) {
        console.error("Error fetching presale data:", error);
      }
    };

    fetchPresaleData();
    const interval = setInterval(fetchPresaleData, 30000);
    return () => clearInterval(interval);
  }, [isConnected]);

  return presaleData;
};

export const useBuyTokens = () => {
  return async (amount: number) => {
    try {
      const tx = await contractService.buyPresaleTokens(amount);
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${amount.toFixed(2)} BIT tokens!`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Transaction failed. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };
};
