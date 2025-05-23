
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeading from "@/components/ui/section-heading";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useWallet } from "@/contexts/WalletContext";
import { ethers } from "ethers";
import { presaleService } from "@/services/PresaleService";
import { toast } from "@/hooks/use-toast";
import { usePresaleData, useBuyTokens } from '@/utils/presale';
import { Wallet, CreditCard } from "lucide-react";
import { TokenCalculator } from "@/components/buytoken/TokenCalculator";
import { PresaleInfoCard } from "@/components/buytoken/PresaleInfoCard";
import { BnbPaymentForm } from "@/components/buytoken/BnbPaymentForm";
import { UsdtPaymentForm } from "@/components/buytoken/UsdtPaymentForm";

const BuyToken = () => {
  const { isConnected } = useWallet();
  const [bnbAmount, setBnbAmount] = useState<string>("0.1");
  const [usdtAmount, setUsdtAmount] = useState<string>("10");
  const [tokenAmount, setTokenAmount] = useState<string>("0");
  const [bonusAmount, setBonusAmount] = useState<string>("0");
  const [totalTokens, setTotalTokens] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"bnb" | "usdt">("bnb");
  
  const presaleData = usePresaleData();
  const { buyWithBNB, buyWithUSDT, isProcessing } = useBuyTokens();
  
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

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Buy Token Access Required"
          description="Please connect your wallet to purchase BIT tokens"
        />
      </Layout>
    );
  }
  
  const isValidAmount = paymentMethod === "bnb" 
    ? parseFloat(bnbAmount) >= presaleData.paymentMethods.bnb.min
    : parseFloat(usdtAmount) >= presaleData.paymentMethods.usdt.min;
  
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="Buy BIT Tokens"
            subtitle="Purchase BIT tokens during the presale phase with special bonuses"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Presale Info Card */}
            <div className="md:col-span-1">
              <PresaleInfoCard 
                currentPhase={presaleData.currentPhase}
                totalPhases={presaleData.totalPhases}
                bnbRate={presaleData.bnbRate}
                usdtRate={presaleData.usdtRate}
                soldTokens={presaleData.soldTokens}
                totalSupply={presaleData.totalSupply}
                progress={presaleData.progress}
                bonusTiers={presaleData.bonusTiers}
                paymentMethods={presaleData.paymentMethods}
              />
            </div>
            
            {/* Purchase Card */}
            <div className="md:col-span-2">
              <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20">
                <CardHeader>
                  <CardTitle>Token Purchase</CardTitle>
                  <CardDescription>
                    Select payment method and amount to purchase BIT tokens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Tabs 
                      defaultValue="bnb" 
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as "bnb" | "usdt")}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="bnb" className="flex items-center">
                          <Wallet className="mr-2 h-4 w-4" />
                          Pay with BNB
                        </TabsTrigger>
                        <TabsTrigger value="usdt" className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay with USDT
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="bnb" className="mt-4">
                        <BnbPaymentForm 
                          bnbAmount={bnbAmount}
                          handleBnbChange={handleBnbChange}
                          handleBuyTokens={handleBuyTokens}
                          isLoading={isLoading}
                          isValidAmount={isValidAmount}
                          minPurchaseAmount={presaleData.paymentMethods.bnb.min}
                        />
                      </TabsContent>
                      
                      <TabsContent value="usdt" className="mt-4">
                        <UsdtPaymentForm 
                          usdtAmount={usdtAmount}
                          handleUsdtChange={handleUsdtChange}
                          handleApprove={handleApprove}
                          handleBuyTokens={handleBuyTokens}
                          isLoading={isLoading}
                          isValidAmount={isValidAmount}
                          approved={approved}
                          minPurchaseAmount={presaleData.paymentMethods.usdt.min}
                        />
                      </TabsContent>
                    </Tabs>
                    
                    {/* Token calculation box */}
                    <TokenCalculator 
                      tokenAmount={tokenAmount}
                      bonusAmount={bonusAmount}
                      totalTokens={totalTokens}
                    />
                    
                    {!isValidAmount && (
                      <Alert variant="destructive" className="bg-red-900/20 border-red-900">
                        <AlertDescription>
                          Amount is below minimum requirement
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="text-center text-xs text-gray-400">
                      <p>Transaction processing may take a few minutes.</p>
                      <p>Tokens will be delivered to your wallet after the presale ends.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyToken;
