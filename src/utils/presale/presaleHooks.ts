
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { presaleService } from '@/services/PresaleService';
import { useWallet } from '@/contexts/WalletContext';
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';

export interface BonusTier {
  minAmount: number;
  bonusPercent: number;
}

export interface PresaleData {
  currentPhase: number;
  totalPhases: number;
  bnbRate: number;
  usdtRate: number;
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
  bonusTiers: {
    bnb: BonusTier[];
    usdt: BonusTier[];
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
    currentPhase: 1,
    totalPhases: 3,
    bnbRate: 0,
    usdtRate: 0,
    totalSupply: 5000000,
    soldTokens: 0,
    progress: 0,
    softCap: 0,
    hardCap: 0,
    endTimeInSeconds: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    paymentMethods: {
      bnb: { rate: 0, min: 0.1, max: 50 },
      usdt: { rate: 0, min: 100, max: 25000 }
    },
    bonusTiers: {
      bnb: [],
      usdt: []
    },
    address: contractAddresses.presale
  });

  useEffect(() => {
    const fetchPresaleData = async () => {
      if (!isConnected) return;

      try {
        const info = await presaleService.getPresaleInfo();
        const bonusInfo = await presaleService.getBonusTiers();
        
        // Format BNB rate - convert from wei to ether
        const bnbRateInEther = parseFloat(ethers.utils.formatEther(info.bnbRate));
        // Format USDT rate - assuming 18 decimals
        const usdtRateInUsd = parseFloat(ethers.utils.formatUnits(info.usdtRate, 18));
        
        // Format bonus tiers
        const bnbTiers = bonusInfo.bnbTiers.map(tier => ({
          minAmount: parseFloat(ethers.utils.formatEther(tier.minAmount)),
          bonusPercent: tier.bonusPercent.toNumber()
        }));
        
        const usdtTiers = bonusInfo.usdtTiers.map(tier => ({
          minAmount: parseFloat(ethers.utils.formatUnits(tier.minAmount, 18)),
          bonusPercent: tier.bonusPercent.toNumber()
        }));

        // Calculate progress
        const soldTokensFormatted = parseFloat(ethers.utils.formatUnits(info.soldTokens, 6)); // Assuming 6 decimals for BIT token
        const totalSupplyFormatted = parseFloat(ethers.utils.formatUnits(info.totalSupply, 6));
        const progress = Math.round((soldTokensFormatted / totalSupplyFormatted) * 100);

        setPresaleData(prev => ({
          ...prev,
          currentPhase: info.phase.toNumber(),
          bnbRate: bnbRateInEther,
          usdtRate: usdtRateInUsd,
          totalSupply: totalSupplyFormatted,
          soldTokens: soldTokensFormatted,
          progress: progress,
          softCap: parseFloat(ethers.utils.formatUnits(info.softCap, 6)),
          hardCap: parseFloat(ethers.utils.formatUnits(info.hardCap, 6)),
          endTimeInSeconds: info.endTime.toNumber(),
          paymentMethods: {
            bnb: { 
              rate: bnbRateInEther, 
              min: 0.1, 
              max: 50 
            },
            usdt: { 
              rate: usdtRateInUsd, 
              min: 100, 
              max: 25000 
            }
          },
          bonusTiers: {
            bnb: bnbTiers,
            usdt: usdtTiers
          }
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
  const [isProcessing, setIsProcessing] = useState(false);

  const buyWithBNB = async (amount: number) => {
    setIsProcessing(true);
    try {
      const bnbAmount = ethers.utils.parseEther(amount.toString());
      const tx = await presaleService.buyWithBNB(bnbAmount);
      
      toast({
        title: "Purchase Successful",
        description: `You have successfully bought tokens with ${amount} BNB!`,
      });
      return true;
    } catch (error) {
      console.error("Error buying with BNB:", error);
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Transaction failed. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const buyWithUSDT = async (amount: number) => {
    setIsProcessing(true);
    try {
      const usdtAmount = ethers.utils.parseUnits(amount.toString(), 18); // Assuming USDT has 18 decimals
      const tx = await presaleService.buyWithUSDT(usdtAmount);
      
      toast({
        title: "Purchase Successful",
        description: `You have successfully bought tokens with ${amount} USDT!`,
      });
      return true;
    } catch (error) {
      console.error("Error buying with USDT:", error);
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Transaction failed. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return { buyWithBNB, buyWithUSDT, isProcessing };
};

export const usePresaleTimer = (): TimeRemaining => {
  const presaleData = usePresaleData();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = Math.max(0, presaleData.endTimeInSeconds - now);
      
      const days = Math.floor(diff / (24 * 60 * 60));
      const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((diff % (60 * 60)) / 60);
      const seconds = Math.floor(diff % 60);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, [presaleData.endTimeInSeconds]);
  
  return timeRemaining;
};
