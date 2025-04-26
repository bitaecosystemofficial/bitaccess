
import { useState, useEffect } from 'react';
import { ContractResult } from '@/types/contracts';
import { mockTransaction } from '@/utils/blockchainUtils';

export const useSpinWheelData = () => {
  const [spinWheelData, setSpinWheelData] = useState({
    totalSpins: 18457,
    dailySpins: 1245,
    prizes: [
      "5 BIT Tokens",
      "10 BIT Tokens",
      "25 BIT Tokens",
      "50 BIT Tokens",
      "100 BIT Tokens",
      "Try Again"
    ],
    winRate: 65,
    userCanSpin: true,
    userLastSpinTime: 0,
    cooldownPeriod: 24 * 60 * 60
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinWheelData(prev => ({
        ...prev,
        totalSpins: prev.totalSpins + Math.floor(Math.random() * 5),
        dailySpins: Math.floor(Math.random() * 10) + 1240
      }));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return spinWheelData;
};

export const spinWheel = async (walletAddress: string): Promise<ContractResult> => {
  try {
    const hash = await mockTransaction();
    return { success: true, hash };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
