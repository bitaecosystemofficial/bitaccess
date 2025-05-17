
import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftRight, Info, TrendingUp, DollarSign, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useWallet } from "@/contexts/WalletContext";
import { tokenAddresses, contractAddresses } from '@/constants/contracts';
import { useSwapData, useTokenBalance, swapTokens, SwapPair } from "@/hooks/useSwap";
import { ethers } from "ethers";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useSmartContract } from "@/hooks/useSmartContract";
import { TokenABI } from "@/contracts/abis/TokenABI";
import { Slider } from "@/components/ui/slider";

const Swap = () => {
  const { isConnected, address, signer } = useWallet();
  const swapData = useSwapData();
  
  // Form state
  const [fromToken, setFromToken] = useState("bnb");
  const [toToken, setToToken] = useState("bit");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(2.5);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [currentPair, setCurrentPair] = useState<SwapPair | null>(null);
  
  // Get token addresses
  const fromTokenAddress = useMemo(() => {
    if (fromToken === "bit") return tokenAddresses.bit;
    if (fromToken === "bnb") return tokenAddresses.bnb;
    return tokenAddresses.usdt;
  }, [fromToken]);
  
  const toTokenAddress = useMemo(() => {
    if (toToken === "bit") return tokenAddresses.bit;
    if (toToken === "bnb") return tokenAddresses.bnb;
    return tokenAddresses.usdt;
  }, [toToken]);
  
  // Get token balances
  const { balance: fromBalance } = useTokenBalance(fromTokenAddress);
  const { balance: toBalance } = useTokenBalance(toTokenAddress);

  // ERC20 approval
  const { contract: fromTokenContract, executeContractCall: executeFromTokenCall } = useSmartContract({
    contractAddress: fromTokenAddress,
    contractABI: TokenABI,
  });

  // Update the pair info whenever the tokens change
  useEffect(() => {
    if (swapData.pairs.length === 0) return;
    
    const matchingPair = swapData.pairs.find(
      p => (p.from.toLowerCase() === fromToken.toUpperCase() && p.to.toLowerCase() === toToken.toUpperCase())
    );
    
    if (matchingPair) {
      setCurrentPair(matchingPair);
    } else {
      // Try the reverse pair
      const reversePair = swapData.pairs.find(
        p => (p.from.toLowerCase() === toToken.toUpperCase() && p.to.toLowerCase() === fromToken.toUpperCase())
      );
      
      if (reversePair) {
        // Invert the rate for the reverse pair
        setCurrentPair({
          ...reversePair,
          from: reversePair.to,
          to: reversePair.from,
          rate: 1 / reversePair.rate,
          fromAddress: reversePair.toAddress,
          toAddress: reversePair.fromAddress,
          reserveFrom: reversePair.reserveTo,
          reserveTo: reversePair.reserveFrom
        });
      } else {
        setCurrentPair(null);
      }
    }
  }, [fromToken, toToken, swapData.pairs]);

  // Update toAmount when fromAmount changes
  useEffect(() => {
    if (!fromAmount || !currentPair) {
      setToAmount("");
      return;
    }
    
    try {
      const calculatedAmount = parseFloat(fromAmount) * currentPair.rate;
      if (!isNaN(calculatedAmount)) {
        setToAmount(calculatedAmount.toFixed(6));
      } else {
        setToAmount("");
      }
    } catch (error) {
      console.error("Error calculating swap amount:", error);
      setToAmount("");
    }
  }, [fromAmount, currentPair]);

  const handleTokenSwap = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleMaxClick = () => {
    setFromAmount(fromBalance);
  };

  const handleSlippageChange = (value: number[]) => {
    setSlippage(value[0]);
  };

  const handleSwap = async () => {
    if (!address || !signer || !currentPair || !fromAmount || !toAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid swap",
        description: "Please enter valid amount and ensure wallet is connected",
        variant: "destructive",
      });
      return;
    }

    setIsSwapping(true);
    
    try {
      // For ERC20 tokens, we need to approve the contract first
      if (fromToken !== "bnb") {
        toast({
          title: "Approval needed",
          description: "Please approve access to your tokens",
        });
        
        const amountToApprove = ethers.utils.parseEther(fromAmount);
        const approvalResult = await executeFromTokenCall<boolean>(
          "approve",
          contractAddresses.swap,  // Use contractAddresses.swap instead of tokenAddresses.swap
          amountToApprove.toString()
        );
        
        if (!approvalResult.success) {
          throw new Error("Failed to approve token transfer");
        }
      }
      
      // Execute swap
      const result = await swapTokens(
        fromTokenAddress,
        toTokenAddress,
        fromAmount,
        slippage
      );
      
      if (result.success) {
        toast({
          title: "Swap successful",
          description: `Successfully swapped ${fromAmount} ${fromToken.toUpperCase()} to ${toAmount} ${toToken.toUpperCase()}`,
        });
        
        // Reset form
        setFromAmount("");
        setToAmount("");
      } else {
        toast({
          title: "Swap failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Swap error:", error);
      toast({
        title: "Swap failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSwapping(false);
    }
  };

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Swap Access Required"
          description="Please connect your wallet to access the token swap functionality"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Token Swap"
            subtitle="Swap BIT tokens with BNB and USDT quickly and securely"
            centered
          />
          
          <div className="max-w-xl mx-auto">
            <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-bitaccess-gold/10 p-3 rounded-full">
                    <ArrowLeftRight size={28} className="text-bitaccess-gold" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Swap Tokens</h3>
                  <button 
                    className="p-2 rounded-full hover:bg-bitaccess-black transition-colors"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings size={20} className="text-bitaccess-gold" />
                  </button>
                </div>
                
                {showSettings && (
                  <div className="mb-6 p-4 bg-bitaccess-black rounded-lg border border-bitaccess-gold/10 animate-fade-in">
                    <h4 className="text-white font-medium mb-3">Transaction Settings</h4>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-gray-400">Slippage Tolerance</label>
                        <span className="text-sm text-bitaccess-gold font-medium">{slippage}%</span>
                      </div>
                      <Slider
                        value={[slippage]}
                        min={0.1}
                        max={5}
                        step={0.1}
                        onValueChange={handleSlippageChange}
                        className="[&>span]:bg-bitaccess-gold"
                      />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>0.1%</span>
                        <span>5%</span>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-400">
                          Swap Fee
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info size={14} className="ml-1 inline-block text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-bitaccess-black text-white border-bitaccess-gold/20">
                                <p>This fee is deducted from the swap amount</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                        <span className="text-sm text-white">
                          {swapData.isLoading ? (
                            <Skeleton className="w-10 h-4" />
                          ) : (
                            `${swapData.fees.swap.toFixed(2)}%`
                          )}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-400">
                          LP Fee
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info size={14} className="ml-1 inline-block text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-bitaccess-black text-white border-bitaccess-gold/20">
                                <p>Fee distributed to liquidity providers</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                        <span className="text-sm text-white">
                          {swapData.isLoading ? (
                            <Skeleton className="w-10 h-4" />
                          ) : (
                            `${swapData.fees.liquidity.toFixed(2)}%`
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* From Token */}
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">From</label>
                  <div className="flex gap-3">
                    <Select
                      value={fromToken}
                      onValueChange={(value) => {
                        if (value === toToken) {
                          setToToken(fromToken);
                        }
                        setFromToken(value);
                        setFromAmount("");
                        setToAmount("");
                      }}
                    >
                      <SelectTrigger className="bg-bitaccess-black border border-bitaccess-gold/20 focus:border-bitaccess-gold focus:ring-bitaccess-gold w-32">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent className="bg-bitaccess-black border border-bitaccess-gold/20">
                        <SelectItem value="bnb">BNB</SelectItem>
                        <SelectItem value="usdt">USDT</SelectItem>
                        <SelectItem value="bit">BIT</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <input
                      type="number"
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="flex-1 p-3 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">Balance: {parseFloat(fromBalance).toFixed(4)} {fromToken.toUpperCase()}</span>
                    <button 
                      className="text-xs text-bitaccess-gold hover:underline"
                      onClick={handleMaxClick}
                    >
                      Max
                    </button>
                  </div>
                </div>
                
                {/* Swap Icon */}
                <div className="flex justify-center my-4">
                  <button 
                    className="bg-bitaccess-black p-2 rounded-full border border-bitaccess-gold/20 hover:border-bitaccess-gold transition-colors"
                    onClick={handleTokenSwap}
                  >
                    <ArrowLeftRight size={20} className="text-bitaccess-gold" />
                  </button>
                </div>
                
                {/* To Token */}
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-2">To</label>
                  <div className="flex gap-3">
                    <Select
                      value={toToken}
                      onValueChange={(value) => {
                        if (value === fromToken) {
                          setFromToken(toToken);
                        }
                        setToToken(value);
                        setToAmount("");
                      }}
                    >
                      <SelectTrigger className="bg-bitaccess-black border border-bitaccess-gold/20 focus:border-bitaccess-gold focus:ring-bitaccess-gold w-32">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent className="bg-bitaccess-black border border-bitaccess-gold/20">
                        <SelectItem value="bit">BIT</SelectItem>
                        <SelectItem value="bnb">BNB</SelectItem>
                        <SelectItem value="usdt">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <input
                      type="number"
                      placeholder="0.0"
                      value={toAmount}
                      readOnly
                      className="flex-1 p-3 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">Balance: {parseFloat(toBalance).toFixed(4)} {toToken.toUpperCase()}</span>
                  </div>
                </div>
                
                {/* Swap Info */}
                {(!!fromAmount && parseFloat(fromAmount) > 0 && !!toAmount && currentPair) && (
                  <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10 mb-6 animate-fade-in">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Price</span>
                      <span className="text-white">
                        1 {fromToken.toUpperCase()} = {currentPair.rate.toFixed(6)} {toToken.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">
                        Minimum received
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size={14} className="ml-1 inline-block text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-bitaccess-black text-white border-bitaccess-gold/20">
                              <p>Minimum amount you'll receive based on your slippage setting</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                      <span className="text-white">
                        {(parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)} {toToken.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">
                        Fee
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size={14} className="ml-1 inline-block text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-bitaccess-black text-white border-bitaccess-gold/20">
                              <p>Fee deducted from your swap amount</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                      <span className="text-white">
                        {(parseFloat(fromAmount) * (swapData.fees.swap / 100)).toFixed(6)} {fromToken.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handleSwap}
                  disabled={
                    !fromAmount || 
                    parseFloat(fromAmount) <= 0 || 
                    !toAmount || 
                    parseFloat(fromAmount) > parseFloat(fromBalance) || 
                    isSwapping || 
                    swapData.isLoading
                  }
                  className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                >
                  {isSwapping ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-bitaccess-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Swapping...
                    </span>
                  ) : !fromAmount || parseFloat(fromAmount) <= 0 ? (
                    "Enter amount" 
                  ) : parseFloat(fromAmount) > parseFloat(fromBalance) ? (
                    "Insufficient balance"
                  ) : (
                    "Swap"
                  )}
                </Button>
              </CardContent>
            </Card>
            
            {/* Pool Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-bitaccess-black border border-bitaccess-gold/20 hover:border-bitaccess-gold/30 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="bg-bitaccess-gold/10 p-1.5 rounded-full mr-2">
                      <DollarSign size={16} className="text-bitaccess-gold" />
                    </div>
                    <h4 className="text-gray-400 font-medium">BIT Liquidity</h4>
                  </div>
                  {swapData.isLoading ? (
                    <Skeleton className="h-8 w-full" />
                  ) : (
                    <p className="text-xl font-bold text-white">
                      {swapData.liquidity.bitPool.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-bitaccess-gold">BIT</span>
                    </p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-bitaccess-black border border-bitaccess-gold/20 hover:border-bitaccess-gold/30 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="bg-bitaccess-gold/10 p-1.5 rounded-full mr-2">
                      <TrendingUp size={16} className="text-bitaccess-gold" />
                    </div>
                    <h4 className="text-gray-400 font-medium">BNB Pool</h4>
                  </div>
                  {swapData.isLoading ? (
                    <Skeleton className="h-8 w-full" />
                  ) : (
                    <p className="text-xl font-bold text-white">
                      {swapData.liquidity.bnbPool.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-bitaccess-gold">BNB</span>
                    </p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-bitaccess-black border border-bitaccess-gold/20 hover:border-bitaccess-gold/30 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="bg-bitaccess-gold/10 p-1.5 rounded-full mr-2">
                      <DollarSign size={16} className="text-bitaccess-gold" />
                    </div>
                    <h4 className="text-gray-400 font-medium">USDT Pool</h4>
                  </div>
                  {swapData.isLoading ? (
                    <Skeleton className="h-8 w-full" />
                  ) : (
                    <p className="text-xl font-bold text-white">
                      {swapData.liquidity.usdtPool.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-bitaccess-gold">USDT</span>
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-400">
              <p>Powered by BitAccess DEX | <a href="/dex-analytics" className="text-bitaccess-gold hover:underline">View Analytics</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Swap;
