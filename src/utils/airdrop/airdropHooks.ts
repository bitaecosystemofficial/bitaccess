
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface AirdropData {
  phase: number;
  totalPhases: number;
  allocation: number;
  claimed: number;
  progress: number;
  endTimeInSeconds: number;
  tasks: {
    twitter: boolean;
    telegram: boolean;
    newsletter: boolean;
    share: boolean;
  };
}

export const useAirdropData = () => {
  const [airdropData, setAirdropData] = useState<AirdropData>({
    phase: 1,
    totalPhases: 3,
    allocation: 2000000,
    claimed: 840000,
    progress: 42,
    endTimeInSeconds: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
    tasks: {
      twitter: false,
      telegram: false,
      newsletter: false,
      share: false
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAirdropData(prev => ({
        ...prev,
        claimed: prev.claimed + Math.floor(Math.random() * 50),
        progress: Math.min(Math.floor((prev.claimed + Math.floor(Math.random() * 50)) / prev.allocation * 100), 100)
      }));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return airdropData;
};

export const useClaimAirdrop = () => {
  const mockTransaction = async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return '0x' + Array(64).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)).join('');
  };

  return async () => {
    try {
      await mockTransaction();
      toast({
        title: "Claim Successful",
        description: "You have successfully claimed your airdrop tokens!",
      });
      return true;
    } catch (error) {
      toast({
        title: "Claim Failed",
        description: "Transaction failed. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };
};
