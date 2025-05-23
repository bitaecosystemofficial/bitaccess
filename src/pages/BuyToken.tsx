
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SectionHeading from "@/components/ui/section-heading";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useWallet } from "@/contexts/WalletContext";
import { ethers } from "ethers";
import { presaleService } from "@/services/PresaleService";
import { toast } from "@/hooks/use-toast";

const BuyToken = () => {
  const { isConnected } = useWallet();
  const [usdtAmount, setUsdtAmount] = useState<string>("10");
  const [tokenAmount, setTokenAmount] = useState<string>("100000000");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  
  const TOKEN_RATE = 1000000; // 1,000,000 tokens per 100 USDT
  const MIN_USDT = 10;
  
  // Calculate token amount based on USDT input
  useEffect(() => {
    if (!usdtAmount || isNaN(parseFloat(usdtAmount))) {
      setTokenAmount("0");
      return;
    }
    
    const usdtValue = parseFloat(usdtAmount);
    const calculatedTokens = (usdtValue * TOKEN_RATE) / 100;
    setTokenAmount(calculatedTokens.toLocaleString('fullwide', { useGrouping: false }));
  }, [usdtAmount]);
  
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
      
      // Mock approval for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      
      const usdtValue = parseFloat(usdtAmount);
      
      if (isNaN(usdtValue) || usdtValue < MIN_USDT) {
        toast({
          title: "Invalid Amount",
          description: `Minimum purchase is ${MIN_USDT} USDT`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Convert to wei
      const usdtAmountWei = ethers.utils.parseUnits(usdtAmount, 18);
      
      // Use the existing presale service to handle the purchase
      const tx = await presaleService.buyWithUSDT(usdtAmountWei);
      
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${parseInt(tokenAmount).toLocaleString()} BIT tokens`,
      });
      
      // Reset form
      setApproved(false);
      
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
  
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="Buy BIT Tokens"
            subtitle="Purchase BIT tokens using USDT with real-time token calculation"
            centered
          />
          
          <div className="max-w-lg mx-auto">
            <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle>Token Purchase</CardTitle>
                <CardDescription>Current rate: 1,000,000 BIT = 100 USDT</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
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
                    <p className="text-xs text-gray-400 mt-1">Minimum purchase: {MIN_USDT} USDT</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Token Amount</label>
                    <div className="p-3 bg-bitaccess-black rounded border border-bitaccess-gold/30 flex justify-between">
                      <span>{parseInt(tokenAmount).toLocaleString()}</span>
                      <span className="text-bitaccess-gold">BIT</span>
                    </div>
                  </div>
                  
                  {parseFloat(usdtAmount) < MIN_USDT && (
                    <Alert variant="destructive" className="bg-red-900/20 border-red-900">
                      <AlertDescription>
                        Amount is below minimum requirement of {MIN_USDT} USDT
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="flex flex-col space-y-3">
                    {!approved ? (
                      <Button 
                        onClick={handleApprove} 
                        disabled={isLoading || parseFloat(usdtAmount) < MIN_USDT}
                        className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                      >
                        {isLoading ? "Approving..." : "Approve USDT"}
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleBuyTokens} 
                        disabled={isLoading || parseFloat(usdtAmount) < MIN_USDT}
                        className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                      >
                        {isLoading ? "Processing..." : "Buy Tokens"}
                      </Button>
                    )}
                  </div>
                  
                  <div className="text-center text-xs text-gray-400 mt-4">
                    <p>Transaction processing may take a few minutes.</p>
                    <p>Tokens will be delivered to your wallet after confirmation.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyToken;
