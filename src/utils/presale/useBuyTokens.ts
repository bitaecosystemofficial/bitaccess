
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { presaleService } from '@/services/PresaleService';
import { ethers } from 'ethers';

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
