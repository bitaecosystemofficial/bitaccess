import { useEffect, useState } from 'react';
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coins } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { usePresaleData, buyPresaleTokens } from "@/utils/contractUtils";
import { toast } from "@/hooks/use-toast";

const Presale = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const presaleData = usePresaleData();
  
  const [paymentMethod, setPaymentMethod] = useState<'bnb' | 'usdt'>('bnb');
  const [usdAmount, setUsdAmount] = useState<number>(0);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate token amount based on USD input
  useEffect(() => {
    if (usdAmount > 0) {
      const calculatedTokens = usdAmount / presaleData.currentPrice;
      
      // Apply bonus structure
      let bonus = 0;
      if (usdAmount >= 5000) {
        bonus = 0.15;
      } else if (usdAmount >= 1000) {
        bonus = 0.10;
      } else if (usdAmount >= 500) {
        bonus = 0.05;
      }
      
      const totalTokens = calculatedTokens * (1 + bonus);
      setTokenAmount(parseFloat(totalTokens.toFixed(2)));
    } else {
      setTokenAmount(0);
    }
  }, [usdAmount, presaleData.currentPrice]);
  
  const handleBuyTokens = async () => {
    if (!isConnected || !address) {
      connectWallet();
      return;
    }
    
    if (usdAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    const minAmount = presaleData.paymentMethods[paymentMethod].min;
    const maxAmount = presaleData.paymentMethods[paymentMethod].max;
    
    if (usdAmount < minAmount || usdAmount > maxAmount) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be between ${minAmount} and ${maxAmount} ${paymentMethod.toUpperCase()}`,
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await buyPresaleTokens(tokenAmount, paymentMethod, address);
      if (result.success) {
        toast({
          title: "Purchase Successful",
          description: `You have successfully purchased ${tokenAmount.toFixed(2)} BIT tokens!`,
        });
        setUsdAmount(0);
        setTokenAmount(0);
      } else {
        toast({
          title: "Purchase Failed",
          description: result.error || "Transaction failed. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate time remaining
  const calculateTimeRemaining = () => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = presaleData.endTimeInSeconds - now;
    
    if (timeLeft <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = Math.floor(timeLeft % 60);
    
    return { days, hours, minutes, seconds };
  };
  
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [presaleData.endTimeInSeconds]);

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Token Presale"
            subtitle="Secure your BIT tokens using BNB or USDT before public listing"
            centered
          />
          
          <div className="max-w-3xl mx-auto bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                <Coins size={40} className="text-bitaccess-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Presale Phase: 2 of 3</h3>
                <p className="text-gray-400">
                  Current Price: ${presaleData.currentPrice} | Next Phase: ${presaleData.nextPhasePrice} | Launch Price: ${presaleData.launchPrice}
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-bitaccess-gold">
                  {presaleData.progress}% ({(presaleData.soldTokens).toLocaleString()} / {(presaleData.totalSupply).toLocaleString()} BIT)
                </span>
              </div>
              <Progress value={presaleData.progress} className="h-3 bg-gray-700" />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-400">Soft Cap: {(presaleData.softCap / 1000000).toFixed(1)}M BIT</span>
                <span className="text-xs text-gray-400">Hard Cap: {(presaleData.hardCap / 1000000).toFixed(1)}M BIT</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
                <p className="text-gray-400 text-sm mb-1">Presale Ends In</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-bitaccess-black-dark p-2 text-center rounded">
                    <span className="block text-xl font-bold text-bitaccess-gold">
                      {String(timeRemaining.days).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-500">Days</span>
                  </div>
                  <div className="bg-bitaccess-black-dark p-2 text-center rounded">
                    <span className="block text-xl font-bold text-bitaccess-gold">
                      {String(timeRemaining.hours).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-500">Hours</span>
                  </div>
                  <div className="bg-bitaccess-black-dark p-2 text-center rounded">
                    <span className="block text-xl font-bold text-bitaccess-gold">
                      {String(timeRemaining.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-500">Minutes</span>
                  </div>
                  <div className="bg-bitaccess-black-dark p-2 text-center rounded">
                    <span className="block text-xl font-bold text-bitaccess-gold">
                      {String(timeRemaining.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-gray-500">Seconds</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
                <p className="text-gray-400 text-sm mb-1">Bonus Structure</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-300">Purchase $500-$999:</span>
                    <span className="text-bitaccess-gold">+5% Bonus</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Purchase $1,000-$4,999:</span>
                    <span className="text-bitaccess-gold">+10% Bonus</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Purchase $5,000+:</span>
                    <span className="text-bitaccess-gold">+15% Bonus</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10 mb-8">
              <h4 className="font-medium text-white mb-4">Purchase BIT Tokens</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Payment Method</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setPaymentMethod('bnb')}
                      className={`flex-1 p-3 rounded border ${
                        paymentMethod === 'bnb'
                          ? 'bg-bitaccess-gold/20 border-bitaccess-gold text-bitaccess-gold'
                          : 'border-gray-600 text-gray-400'
                      }`}
                    >
                      BNB
                    </button>
                    <button
                      onClick={() => setPaymentMethod('usdt')}
                      className={`flex-1 p-3 rounded border ${
                        paymentMethod === 'usdt'
                          ? 'bg-bitaccess-gold/20 border-bitaccess-gold text-bitaccess-gold'
                          : 'border-gray-600 text-gray-400'
                      }`}
                    >
                      USDT
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Min: {presaleData.paymentMethods[paymentMethod].min} {paymentMethod.toUpperCase()} |
                    Max: {presaleData.paymentMethods[paymentMethod].max} {paymentMethod.toUpperCase()}
                  </p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Amount in {paymentMethod.toUpperCase()}</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder={`Enter ${paymentMethod.toUpperCase()} amount`}
                      value={usdAmount || ''}
                      onChange={(e) => setUsdAmount(parseFloat(e.target.value) || 0)}
                      className="w-full p-3 bg-bitaccess-black-dark border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none pr-20"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {paymentMethod.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">You will receive</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.0"
                      value={tokenAmount || ''}
                      className="w-full p-3 bg-bitaccess-black-dark border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none pr-12"
                      readOnly
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">BIT</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                onClick={handleBuyTokens}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : isConnected ? 'Buy BIT Tokens' : 'Connect Wallet to Purchase'}
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Running on Binance Smart Chain (BSC) | View contract on <a href={`https://bscscan.com/address/${presaleData.address}`} target="_blank" rel="noopener noreferrer" className="text-bitaccess-gold hover:underline">BscScan</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Presale;
