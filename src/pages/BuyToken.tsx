
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import SectionHeading from "@/components/ui/section-heading";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useWallet } from "@/contexts/WalletContext";
import { ethers } from "ethers";
import { presaleService } from "@/services/PresaleService";
import { toast } from "@/hooks/use-toast";
import { usePresaleData, useBuyTokens, BonusTier } from "@/utils/presale/presaleHooks";
import { Wallet, CreditCard, Clock, AlertCircle } from "lucide-react";

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
  const calculateBonus = (amount: number, tiers: BonusTier[]): number => {
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
  
  // Format large numbers for display
  const formatNumber = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '0';
    
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(2) + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(2) + 'K';
    } else {
      return num.toFixed(2);
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
              <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-bitaccess-gold" />
                    Presale Info
                  </CardTitle>
                  <CardDescription>Phase {presaleData.currentPhase} of {presaleData.totalPhases}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Token Sale Progress</p>
                    <Progress value={presaleData.progress} className="h-2 bg-bitaccess-black" />
                    <div className="flex justify-between text-xs mt-1">
                      <span>{formatNumber(presaleData.soldTokens)} BIT sold</span>
                      <span>{formatNumber(presaleData.totalSupply)} BIT total</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-bitaccess-black rounded border border-bitaccess-gold/20">
                      <p className="text-xs text-gray-400">BNB Rate</p>
                      <p className="font-medium">{presaleData.bnbRate.toLocaleString()} BIT</p>
                    </div>
                    <div className="p-3 bg-bitaccess-black rounded border border-bitaccess-gold/20">
                      <p className="text-xs text-gray-400">USDT Rate</p>
                      <p className="font-medium">{presaleData.usdtRate.toLocaleString()} BIT</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Bonus Tiers</h4>
                    <div className="space-y-1">
                      {presaleData.bonusTiers.bnb.map((tier, i) => (
                        <div key={`bnb-${i}`} className="flex justify-between text-xs">
                          <span>≥ {tier.minAmount} BNB</span>
                          <span className="text-bitaccess-gold">+{tier.bonusPercent}% Bonus</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-1 mt-2">
                      {presaleData.bonusTiers.usdt.map((tier, i) => (
                        <div key={`usdt-${i}`} className="flex justify-between text-xs">
                          <span>≥ {tier.minAmount} USDT</span>
                          <span className="text-bitaccess-gold">+{tier.bonusPercent}% Bonus</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-bitaccess-black rounded border border-bitaccess-gold/20">
                    <div className="flex items-center mb-1">
                      <AlertCircle className="h-4 w-4 mr-1 text-yellow-500" />
                      <p className="text-sm font-medium">Presale Limits</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <p>Min BNB: {presaleData.paymentMethods.bnb.min}</p>
                      <p>Max BNB: {presaleData.paymentMethods.bnb.max}</p>
                      <p>Min USDT: {presaleData.paymentMethods.usdt.min}</p>
                      <p>Max USDT: {presaleData.paymentMethods.usdt.max}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                      
                      <TabsContent value="bnb" className="space-y-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">BNB Amount</label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="text"
                              value={bnbAmount}
                              onChange={handleBnbChange}
                              placeholder="Enter BNB amount"
                              className="bg-bitaccess-black border-bitaccess-gold/30"
                            />
                            <span className="text-sm font-medium">BNB</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Minimum purchase: {presaleData.paymentMethods.bnb.min} BNB
                          </p>
                        </div>
                        
                        <Button 
                          onClick={handleBuyTokens} 
                          disabled={isLoading || !isValidAmount}
                          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                        >
                          {isLoading ? "Processing..." : "Buy with BNB"}
                        </Button>
                      </TabsContent>
                      
                      <TabsContent value="usdt" className="space-y-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">USDT Amount</label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="text"
                              value={usdtAmount}
                              onChange={handleUsdtChange}
                              placeholder="Enter USDT amount"
                              className="bg-bitaccess-black border-bitaccess-gold/30"
                            />
                            <span className="text-sm font-medium">USDT</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Minimum purchase: {presaleData.paymentMethods.usdt.min} USDT
                          </p>
                        </div>
                        
                        {!approved ? (
                          <Button 
                            onClick={handleApprove} 
                            disabled={isLoading || !isValidAmount}
                            className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                          >
                            {isLoading ? "Approving..." : "Approve USDT"}
                          </Button>
                        ) : (
                          <Button 
                            onClick={handleBuyTokens} 
                            disabled={isLoading || !isValidAmount}
                            className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                          >
                            {isLoading ? "Processing..." : "Buy with USDT"}
                          </Button>
                        )}
                      </TabsContent>
                    </Tabs>
                    
                    {/* Token calculation box */}
                    <div className="p-4 bg-bitaccess-black rounded-lg border border-bitaccess-gold/20">
                      <h4 className="font-medium mb-3">Token Calculation</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Base Tokens:</span>
                          <span>{formatNumber(tokenAmount)} BIT</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Bonus Tokens:</span>
                          <span className="text-bitaccess-gold">+{formatNumber(bonusAmount)} BIT</span>
                        </div>
                        <div className="border-t border-bitaccess-gold/20 pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Total Tokens:</span>
                            <span>{formatNumber(totalTokens)} BIT</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
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
