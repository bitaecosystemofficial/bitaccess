
import { useState, useEffect } from "react";
import { presaleService } from "@/services/PresaleService";
import { useBuyTokens } from '@/utils/presale';
import { toast } from "@/hooks/use-toast";
import { ethers } from "ethers";
import { PresaleData } from "@/utils/presale/types";

const useBuyTokenForm = (presaleData: PresaleData) => {
  const [bnbAmount, setBnbAmount] = useState<string>("0.1");
  const [usdtAmount, setUsdtAmount] = useState<string>("10");
  const [tokenAmount, setTokenAmount] = useState<string>("0");
  const [bonusAmount, setBonusAmount] = useState<string>("0");
  const [totalTokens, setTotalTokens] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"bnb" | "usdt">("bnb");
  
  const { buyWithBNB, buyWithUSDT } = useBuyTokens();

  // Calculate token amount based on input
  useEffect(() => {
    if (paymentMethod === "bnb") {
      calculateBnbTokens();
    } else {
      calculateUsdtTokens();
    }
  }, [bnbAmount, usdtAmount, paymentMethod, presaleData]);
  
  const calculateBnbTokens = () => {
    if (!bnbAmount || isNaN(parseFloat(bnbAmount)) || !presaleData.bnbRate) {
      setTokenAmount("0");
      setBonusAmount("0");
      setTotalTokens("0");
      return;
    }
    
    const bnbValue = parseFloat(bnbAmount);
    const calculatedTokens = bnbValue * presaleData.bnbRate;
    setTokenAmount(calculatedTokens.toString());
    
    // Calculate bonus
    const bonus = calculateBonus(bnbValue, presaleData.bonusTiers.bnb);
    const bonusTokens = (calculatedTokens * bonus) / 100;
    setBonusAmount(bonusTokens.toString());
    setTotalTokens((calculatedTokens + bonusTokens).toString());
  };
  
  const calculateUsdtTokens = () => {
    if (!usdtAmount || isNaN(parseFloat(usdtAmount)) || !presaleData.usdtRate) {
      setTokenAmount("0");
      setBonusAmount("0");
      setTotalTokens("0");
      return;
    }
    
    const usdtValue = parseFloat(usdtAmount);
    const calculatedTokens = usdtValue * presaleData.usdtRate;
    setTokenAmount(calculatedTokens.toString());
    
    // Calculate bonus
    const bonus = calculateBonus(usdtValue, presaleData.bonusTiers.usdt);
    const bonusTokens = (calculatedTokens * bonus) / 100;
    setBonusAmount(bonusTokens.toString());
    setTotalTokens((calculatedTokens + bonusTokens).toString());
  };
  
  // Calculate bonus percentage based on amount and tier
  const calculateBonus = (amount: number, tiers: { minAmount: number; bonusPercent: number }[]): number => {
    if (!tiers || tiers.length === 0) return 0;
    
    // Sort tiers in descending order by minAmount
    const sortedTiers = [...tiers].sort((a, b) => b.minAmount - a.minAmount);
    
    // Find the applicable tier
    for (const tier of sortedTiers) {
      if (amount >= tier.minAmount) {
        return tier.bonusPercent;
      }
    }
    
    return 0;
  };
  
  // Handle BNB input change with validation
  const handleBnbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow only numbers and decimals
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setBnbAmount(value);
    }
  };
  
  // Handle USDT input change with validation
  const handleUsdtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow only numbers and decimals
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setUsdtAmount(value);
    }
  };
  
  const handleApprove = async () => {
    try {
      setIsLoading(true);
      
      // Call the approve function from presaleService
      const result = await presaleService.approveUSDT(
        ethers.utils.parseUnits(usdtAmount, 18)
      );
      
      toast({
        title: "USDT Approved",
        description: "You have successfully approved USDT for spending",
      });
      
      setApproved(true);
    } catch (error) {
      console.error("Error approving USDT:", error);
      toast({
        title: "Approval Failed",
        description: "Failed to approve USDT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBuyTokens = async () => {
    try {
      setIsLoading(true);
      let success = false;
      
      if (paymentMethod === "bnb") {
        const bnbValue = parseFloat(bnbAmount);
        
        if (isNaN(bnbValue) || bnbValue < presaleData.paymentMethods.bnb.min) {
          toast({
            title: "Invalid Amount",
            description: `Minimum purchase is ${presaleData.paymentMethods.bnb.min} BNB`,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        success = await buyWithBNB(bnbValue);
      } else {
        const usdtValue = parseFloat(usdtAmount);
        
        if (isNaN(usdtValue) || usdtValue < presaleData.paymentMethods.usdt.min) {
          toast({
            title: "Invalid Amount",
            description: `Minimum purchase is ${presaleData.paymentMethods.usdt.min} USDT`,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        success = await buyWithUSDT(usdtValue);
      }
      
      if (success) {
        // Reset form
        setApproved(false);
        
        if (paymentMethod === "bnb") {
          setBnbAmount("0.1");
        } else {
          setUsdtAmount("10");
        }
      }
      
    } catch (error) {
      console.error("Error buying tokens:", error);
      toast({
        title: "Purchase Failed",
        description: "Failed to buy tokens. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the amount is valid
  const isValidAmount = paymentMethod === "bnb" 
    ? parseFloat(bnbAmount) >= presaleData.paymentMethods.bnb.min
    : parseFloat(usdtAmount) >= presaleData.paymentMethods.usdt.min;

  return {
    bnbAmount,
    usdtAmount,
    tokenAmount,
    bonusAmount,
    totalTokens,
    paymentMethod,
    setPaymentMethod,
    handleBnbChange,
    handleUsdtChange,
    handleApprove,
    handleBuyTokens,
    isLoading,
    approved,
    isValidAmount
  };
};

export default useBuyTokenForm;
