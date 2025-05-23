
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/contexts/WalletContext";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { toast } from "@/hooks/use-toast";
import { presaleService } from "@/services/PresaleService";
import { ethers } from "ethers";
import { ArrowRight, CreditCard, TrendingUp } from "lucide-react";

const BuyToken = () => {
  const { isConnected, address } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [estimatedTokens, setEstimatedTokens] = useState<string>("0");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // Constants
  const TOKEN_RATE = 10000; // 1,000,000 tokens per 100 USDT (10,000 per 1 USDT)
  const MIN_AMOUNT = 10; // Minimum 10 USDT
  
  useEffect(() => {
    // Calculate estimated tokens when amount changes
    if (!amount || isNaN(parseFloat(amount))) {
      setEstimatedTokens("0");
      return;
    }
    
    const amountValue = parseFloat(amount);
    const tokens = amountValue * TOKEN_RATE;
    setEstimatedTokens(tokens.toLocaleString());
  }, [amount]);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  
  const handleBuyTokens = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    const amountValue = parseFloat(amount);
    
    if (amountValue < MIN_AMOUNT) {
      toast({
        title: "Below Minimum",
        description: `Minimum purchase amount is ${MIN_AMOUNT} USDT`,
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    try {
      const usdtAmount = ethers.utils.parseUnits(amount, 18);
      await presaleService.buyWithUSDT(usdtAmount);
      
      toast({
        title: "Purchase Successful",
        description: `You've purchased ${estimatedTokens} BIT tokens!`,
      });
      
      setAmount("");
    } catch (error) {
      console.error("Error buying tokens:", error);
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Transaction failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (!isConnected) {
    return <WalletConnectPrompt title="Connect to Buy Tokens" description="Please connect your wallet to access the token purchase page" />;
  }
  
  return (
    <Layout>
      <div className="container py-12 px-4 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center gold-text">Buy BIT Access Tokens</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-bitaccess-black border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <TrendingUp className="h-10 w-10 text-bitaccess-gold mb-3" />
                <h3 className="text-lg font-semibold mb-1">High Potential</h3>
                <p className="text-sm text-gray-400">Early access to a growing ecosystem</p>
              </CardContent>
            </Card>
            
            <Card className="bg-bitaccess-black border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <CreditCard className="h-10 w-10 text-bitaccess-gold mb-3" />
                <h3 className="text-lg font-semibold mb-1">Token Utility</h3>
                <p className="text-sm text-gray-400">Access exclusive features and services</p>
              </CardContent>
            </Card>
            
            <Card className="bg-bitaccess-black border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <ArrowRight className="h-10 w-10 text-bitaccess-gold mb-3" />
                <h3 className="text-lg font-semibold mb-1">Easy Process</h3>
                <p className="text-sm text-gray-400">Simple and secure token purchase</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-bitaccess-black p-8 border-bitaccess-gold/20">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Purchase Tokens</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0 space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Amount (USDT)</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount in USDT"
                  className="bg-bitaccess-black-light border-gray-700"
                />
                <p className="text-xs text-gray-400 mt-1">Minimum: {MIN_AMOUNT} USDT</p>
              </div>
              
              <div className="bg-bitaccess-black-light p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Rate:</span>
                  <span className="text-white font-medium">1,000,000 BIT = 100 USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">You receive:</span>
                  <span className="text-bitaccess-gold font-semibold">{estimatedTokens} BIT</span>
                </div>
              </div>
              
              <Button 
                onClick={handleBuyTokens}
                disabled={isProcessing || !amount || parseFloat(amount) < MIN_AMOUNT}
                className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
              >
                {isProcessing ? "Processing..." : "Buy Tokens"}
              </Button>
              
              <p className="text-center text-xs text-gray-400">
                By purchasing tokens, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BuyToken;
