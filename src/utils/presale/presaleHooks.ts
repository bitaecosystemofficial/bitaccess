
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

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
    const interval = setInterval(() => {
      setPresaleData(prev => ({
        ...prev,
        soldTokens: prev.soldTokens + Math.floor(Math.random() * 100),
        progress: Math.min(Math.floor((prev.soldTokens + Math.floor(Math.random() * 100)) / prev.totalSupply * 100), 100)
      }));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return presaleData;
};

export const usePresaleTimer = (): TimeRemaining => {
  const presaleData = usePresaleData();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = presaleData.endTimeInSeconds - now;
      
      if (timeLeft <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      
      const days = Math.floor(timeLeft / (24 * 60 * 60));
      const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
      const seconds = Math.floor(timeLeft % 60);
      
      return { days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [presaleData.endTimeInSeconds]);

  return timeRemaining;
};

export const useBuyTokens = () => {
  const mockTransaction = async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return '0x' + Array(64).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)).join('');
  };

  return async (amount: number, paymentMethod: 'bnb' | 'usdt') => {
    try {
      await mockTransaction();
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${amount.toFixed(2)} BIT tokens!`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Transaction failed. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };
};
