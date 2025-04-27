
import { useState, useEffect } from 'react';
import { ContractResult } from '@/types/contracts';
import { contractService } from '@/services/ContractService';
import { contractAddresses } from '@/constants/contracts';

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
    // Fetch spin wheel data from the blockchain
    const fetchSpinWheelData = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          console.log("Fetching spin wheel data from contract:", contractAddresses.spinWheel);
          
          // This will be replaced with actual contract calls in a production environment
          // For demo purposes, we're using simulated data
          const spinWheelContract = await contractService.getSpinWheelContract();
          
          // In a real implementation, you would call contract methods like:
          // const totalSpins = await spinWheelContract.getTotalSpins();
          // const dailySpins = await spinWheelContract.getDailySpins();
          // const userLastSpin = await spinWheelContract.getUserLastSpin(address);
          
          setSpinWheelData(prev => ({
            ...prev,
            totalSpins: prev.totalSpins + Math.floor(Math.random() * 5),
            dailySpins: Math.floor(Math.random() * 10) + 1240
          }));
        }
      } catch (error) {
        console.error("Error fetching spin wheel data:", error);
      }
    };

    fetchSpinWheelData();
    const interval = setInterval(fetchSpinWheelData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return spinWheelData;
};

export const spinWheel = async (walletAddress: string): Promise<ContractResult> => {
  try {
    console.log("Spinning wheel for address:", walletAddress);
    
    const spinWheelContract = await contractService.getSpinWheelContract();
    const tx = await spinWheelContract.spin();
    const receipt = await tx.wait();
    
    return { 
      success: true, 
      hash: receipt.transactionHash 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
