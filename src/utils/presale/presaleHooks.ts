
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { presaleService } from '@/services/PresaleService';
import { useWallet } from '@/contexts/WalletContext';
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { CryptoCompareService } from '@/services/CryptoCompareService';

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
  bnbPrice?: number;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Static presale configuration
const PRESALE_CONFIG = {
  currentPrice: 0.000108,
  targetPrice: 0.00030,
  totalSupply: 1000000000, // 1B BIT
  bonusPercent: 5
};

export const usePresaleData = (): PresaleData => {
  const { isConnected } = useWallet();
  const [presaleData, setPresaleData] = useState<PresaleData>({
    currentPhase: 1,
    totalPhases: 3,
    bnbRate: PRESALE_CONFIG.currentPrice,
    usdtRate: PRESALE_CONFIG.currentPrice,
    totalSupply: PRESALE_CONFIG.totalSupply,
    soldTokens: 0,
    progress: 0,
    softCap: PRESALE_CONFIG.totalSupply * 0.3,
    hardCap: PRESALE_CONFIG.totalSupply,
    endTimeInSeconds: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    paymentMethods: {
      bnb: { rate: PRESALE_CONFIG.currentPrice, min: 0.1, max: 50 },
      usdt: { rate: PRESALE_CONFIG.currentPrice, min: 100, max: 25000 }
    },
    bonusTiers: {
      bnb: [{ minAmount: 0.1, bonusPercent: PRESALE_CONFIG.bonusPercent }],
      usdt: [{ minAmount: 100, bonusPercent: PRESALE_CONFIG.bonusPercent }]
    },
    address: contractAddresses.presale,
    bnbPrice: 600
  });

  useEffect(() => {
    const fetchBnbPrice = async () => {
      const price = await CryptoCompareService.getBNBPrice();
      setPresaleData(prev => ({ ...prev, bnbPrice: price }));
    };

    fetchBnbPrice();
    const interval = setInterval(fetchBnbPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

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
