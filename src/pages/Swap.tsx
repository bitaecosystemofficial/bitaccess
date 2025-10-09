
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useWallet } from "@/contexts/WalletContext";
import { tokenAddresses, networkInfo } from "@/constants/contracts";
import { switchNetwork } from "@/utils/blockchainUtils";
import { toast } from "@/hooks/use-toast";
import { useSwapData, useTokenBalance, swapTokens } from "@/hooks/useSwap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownUp, Info, AlertCircle, Loader2 } from "lucide-react";
import { parseBigNumber, formatBigNumber } from "@/utils/contractUtils";
import bitLogo from "@/assets/bit-token-logo.png";

const Swap = () => {
  const { isConnected } = useWallet();
  const { pairs, isLoading: pairsLoading, error } = useSwapData();
  
  const [fromToken, setFromToken] = useState(tokenAddresses.bnb);
  const [toToken, setToToken] = useState(tokenAddresses.bit);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState(5); // Default 5% slippage
  const [swapping, setSwapping] = useState(false);

  // Get token balances
  const { balance: fromBalance, isLoading: fromBalanceLoading } = useTokenBalance(fromToken);
  const { balance: toBalance, isLoading: toBalanceLoading } = useTokenBalance(toToken);
  
  // Helper for token symbols
  const getTokenSymbol = (address: string) => {
    if (address === tokenAddresses.bnb) return "BNB";
    if (address === tokenAddresses.usdt) return "USDT";
    if (address === tokenAddresses.bit) return "BIT";
    if (address === tokenAddresses.btcb) return "BTCB";
    if (address === tokenAddresses.usdc) return "USDC";
    return "Unknown";
  };

  // Helper for token logos
  const getTokenLogo = (address: string) => {
    if (address === tokenAddresses.bnb) return "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png";
    if (address === tokenAddresses.usdt) return "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png";
    if (address === tokenAddresses.usdc) return "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png";
    if (address === tokenAddresses.btcb) return "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png";
    if (address === tokenAddresses.bit) return bitLogo;
    return null;
  };
  
  // Check for correct network on component mount
  useEffect(() => {
    if (isConnected) {
      const checkAndSwitchNetwork = async () => {
        const isCorrectNetwork = await switchNetwork();
        if (!isCorrectNetwork) {
          toast({
            title: "Network Required",
            description: `Please switch to ${networkInfo.name} to use swap features`,
            variant: "destructive",
          });
        }
      };
      
      checkAndSwitchNetwork();
    }
  }, [isConnected]);
  
  // Update to amount when from amount changes
  useEffect(() => {
    if (!fromAmount || pairsLoading) {
      setToAmount("");
      return;
    }
    
    // Find the correct pair
    const pair = pairs.find(p => 
      (p.fromAddress.toLowerCase() === fromToken.toLowerCase() && 
       p.toAddress.toLowerCase() === toToken.toLowerCase()) ||
      (p.fromAddress.toLowerCase() === toToken.toLowerCase() && 
       p.toAddress.toLowerCase() === fromToken.toLowerCase())
    );
    
    if (pair) {
      try {
        const fromValue = parseFloat(fromAmount);
        let rate;
        
        if (pair.fromAddress.toLowerCase() === fromToken.toLowerCase()) {
          rate = pair.rate;
        } else {
          rate = 1 / pair.rate;
        }
        
        // Avoid NaN values
        if (!isNaN(rate) && !isNaN(fromValue)) {
          const calculatedAmount = (fromValue * rate).toFixed(6);
          setToAmount(calculatedAmount);
        } else {
          setToAmount("0");
        }
      } catch (error) {
        console.error("Error calculating swap amount:", error);
        setToAmount("");
      }
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken, pairs, pairsLoading]);
  
  const handleFromTokenChange = (value: string) => {
    // Don't allow same token for from and to
    if (value === toToken) {
      setToToken(fromToken);
    }
    setFromToken(value);
    setFromAmount("");
    setToAmount("");
  };
  
  const handleToTokenChange = (value: string) => {
    // Don't allow same token for from and to
    if (value === fromToken) {
      setFromToken(toToken);
    }
    setToToken(value);
    setFromAmount("");
    setToAmount("");
  };
  
  const handleSwapPositions = () => {
    const tempFromToken = fromToken;
    const tempToToken = toToken;
    const tempFromAmount = fromAmount;
    const tempToAmount = toAmount;
    
    setFromToken(tempToToken);
    setToToken(tempFromToken);
    setFromAmount(tempToAmount);
    setToAmount(tempFromAmount);
  };
  
  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0 || !toAmount || parseFloat(toAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      });
      return;
    }
    
    setSwapping(true);
    try {
      const result = await swapTokens(fromToken, toToken, fromAmount, slippage);
      
      if (result.success) {
        toast({
          title: "Swap Successful",
          description: `Swapped ${fromAmount} ${getTokenSymbol(fromToken)} for ${toAmount} ${getTokenSymbol(toToken)}`,
        });
        
        // Reset form
        setFromAmount("");
        setToAmount("");
      } else {
        toast({
          title: "Swap Failed",
          description: result.error || "There was an error processing your swap",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Swap error:", error);
      toast({
        title: "Swap Failed",
        description: error instanceof Error ? error.message : "There was an error processing your swap",
        variant: "destructive",
      });
    } finally {
      setSwapping(false);
    }
  };
  
  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Swap Access Required"
          description="Please connect your wallet to use the token swap feature"
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
            subtitle="Swap between BIT tokens, BNB, and stablecoins"
            centered
          />
          
          <div className="max-w-xl mx-auto bg-bitaccess-black-light rounded-xl p-6 border border-bitaccess-gold/20">
            <h2 className="text-xl font-bold mb-6 text-center">Swap Tokens on {networkInfo.name}</h2>
            
            <div className="space-y-6">
              {error ? (
                <div className="p-4 bg-red-900/20 text-red-500 rounded-lg flex items-center gap-2 justify-center">
                  <AlertCircle size={18} />
                  <div>
                    <p className="text-center font-medium">Failed to load swap data. Please try again later.</p>
                    <p className="text-center text-sm mt-1">Using default values - swap rates may not be accurate</p>
                  </div>
                </div>
              ) : pairsLoading ? (
                <div className="p-6 flex justify-center items-center">
                  <Loader2 className="h-6 w-6 animate-spin text-bitaccess-gold mr-2" />
                  <span>Loading swap data...</span>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="from-amount">From</Label>
                        <span className="text-xs text-gray-400">
                          Balance: {fromBalanceLoading ? "Loading..." : `${parseFloat(fromBalance).toFixed(4)} ${getTokenSymbol(fromToken)}`}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Input
                          id="from-amount"
                          placeholder="0.0"
                          className="bg-bitaccess-black-light"
                          value={fromAmount}
                          onChange={(e) => setFromAmount(e.target.value)}
                          type="number"
                          min="0"
                        />
                        <Select value={fromToken} onValueChange={handleFromTokenChange}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={tokenAddresses.bnb}>
                              <div className="flex items-center gap-2">
                                <img src={getTokenLogo(tokenAddresses.bnb)!} alt="BNB" className="w-5 h-5" />
                                <span>BNB</span>
                              </div>
                            </SelectItem>
                            <SelectItem value={tokenAddresses.usdt}>
                              <div className="flex items-center gap-2">
                                <img src={getTokenLogo(tokenAddresses.usdt)!} alt="USDT" className="w-5 h-5" />
                                <span>USDT</span>
                              </div>
                            </SelectItem>
                            <SelectItem value={tokenAddresses.usdc}>
                              <div className="flex items-center gap-2">
                                <img src={getTokenLogo(tokenAddresses.usdc)!} alt="USDC" className="w-5 h-5" />
                                <span>USDC</span>
                              </div>
                            </SelectItem>
                            <SelectItem value={tokenAddresses.btcb}>
                              <div className="flex items-center gap-2">
                                <img src={getTokenLogo(tokenAddresses.btcb)!} alt="BTCB" className="w-5 h-5" />
                                <span>BTCB</span>
                              </div>
                            </SelectItem>
                            <SelectItem value={tokenAddresses.bit}>
                              <div className="flex items-center gap-2">
                                <img src={getTokenLogo(tokenAddresses.bit)!} alt="BIT" className="w-5 h-5" />
                                <span>BIT</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex justify-between">
                        <button 
                          className="text-xs text-bitaccess-gold hover:underline" 
                          onClick={() => setFromAmount(fromBalance)}
                        >
                          Max
                        </button>
                        <button 
                          className="text-xs text-bitaccess-gold hover:underline"
                          onClick={() => setFromAmount((parseFloat(fromBalance) / 2).toString())}
                        >
                          Half
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-full"
                        onClick={handleSwapPositions}
                      >
                        <ArrowDownUp className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="to-amount">To</Label>
                        <span className="text-xs text-gray-400">
                          Balance: {toBalanceLoading ? "Loading..." : `${parseFloat(toBalance).toFixed(4)} ${getTokenSymbol(toToken)}`}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Input
                          id="to-amount"
                          placeholder="0.0"
                          className="bg-bitaccess-black-light"
                          value={toAmount}
                          readOnly
                        />
                        <Select value={toToken} onValueChange={handleToTokenChange}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={tokenAddresses.bnb}>
                              <div className="flex items-center gap-2">
                                <img src={getTokenLogo(tokenAddresses.bnb)!} alt="BNB" className="w-5 h-5" />
                                <span>BNB</span>
                              </div>
                            </SelectItem>
                            <SelectItem value={tokenAddresses.usdt}>
                              <div className="flex items-center gap-2">
                                <img src={getTokenLogo(tokenAddresses.usdt)!} alt="USDT" className="w-5 h-5" />
                                <span>USDT</span>
                              </div>
                            </SelectItem>
                            <SelectItem value={tokenAddresses.usdc}>
                              <div className="flex items-center gap-2">
                                <img src={getTokenLogo(tokenAddresses.usdc)!} alt="USDC" className="w-5 h-5" />
                                <span>USDC</span>
                              </div>
                            </SelectItem>
                            <SelectItem value={tokenAddresses.btcb}>
                              <div className="flex items-center gap-2">
                                <img src={getTokenLogo(tokenAddresses.btcb)!} alt="BTCB" className="w-5 h-5" />
                                <span>BTCB</span>
                              </div>
                            </SelectItem>
                            <SelectItem value={tokenAddresses.bit}>
                              <div className="flex items-center gap-2">
                                <img src={getTokenLogo(tokenAddresses.bit)!} alt="BIT" className="w-5 h-5" />
                                <span>BIT</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="border-gray-700 bg-bitaccess-black">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Slippage Tolerance</span>
                        <div className="flex gap-2">
                          {[1, 2, 5].map((value) => (
                            <Button
                              key={value}
                              variant={slippage === value ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSlippage(value)}
                              className={slippage === value ? "bg-bitaccess-gold text-black" : ""}
                            >
                              {value}%
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Rate</span>
                        <span className="text-sm">
                          1 {getTokenSymbol(fromToken)} = {pairsLoading ? "Loading..." : 
                            (pairs.find(p => 
                              (p.fromAddress.toLowerCase() === fromToken.toLowerCase() && 
                              p.toAddress.toLowerCase() === toToken.toLowerCase())
                            )?.rate || 
                            (1 / (pairs.find(p => 
                              p.fromAddress.toLowerCase() === toToken.toLowerCase() && 
                              p.toAddress.toLowerCase() === fromToken.toLowerCase()
                            )?.rate || 1))).toFixed(6)
                          } {getTokenSymbol(toToken)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400 flex items-center">
                          <Info className="h-3 w-3 mr-1" /> 
                          Min. Received
                        </span>
                        <span className="text-sm">
                          {toAmount ? (parseFloat(toAmount) * (1 - slippage/100)).toFixed(6) : "0"} {getTokenSymbol(toToken)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button 
                    className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                    disabled={!fromAmount || !toAmount || swapping || pairsLoading}
                    onClick={handleSwap}
                  >
                    {swapping ? "Swapping..." : "Swap"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Swap;
