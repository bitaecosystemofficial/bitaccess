
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { RotateCw, Trophy, Users } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSpinWheelData, spinWheel } from "@/utils/contractUtils";

const SpinWheel = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const spinWheelData = useSpinWheelData();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPrizeDialog, setShowPrizeDialog] = useState(false);
  const [prize, setPrize] = useState("");
  const [timeToNextSpin, setTimeToNextSpin] = useState<string>("");
  
  // Calculate time until next spin is available
  useEffect(() => {
    if (!spinWheelData.userCanSpin && spinWheelData.userLastSpinTime > 0) {
      const updateTimer = () => {
        const now = Math.floor(Date.now() / 1000);
        const nextSpinTime = spinWheelData.userLastSpinTime + spinWheelData.cooldownPeriod;
        const secondsLeft = Math.max(0, nextSpinTime - now);
        
        if (secondsLeft <= 0) {
          setTimeToNextSpin("");
          return;
        }
        
        const hours = Math.floor(secondsLeft / 3600);
        const minutes = Math.floor((secondsLeft % 3600) / 60);
        const seconds = secondsLeft % 60;
        
        setTimeToNextSpin(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      };
      
      updateTimer();
      const timer = setInterval(updateTimer, 1000);
      return () => clearInterval(timer);
    }
  }, [spinWheelData.userCanSpin, spinWheelData.userLastSpinTime, spinWheelData.cooldownPeriod]);
  
  const handleSpin = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    if (!spinWheelData.userCanSpin) {
      toast({
        title: "Spin Limit Reached",
        description: `You can spin again in ${timeToNextSpin}`,
        variant: "destructive",
      });
      return;
    }
    
    setIsSpinning(true);
    
    try {
      const result = await spinWheel(address!);
      if (result.success) {
        // Simulate wheel spinning with a random prize
        setTimeout(() => {
          const winningIndex = Math.floor(Math.random() * spinWheelData.prizes.length);
          const randomPrize = spinWheelData.prizes[winningIndex];
          setPrize(randomPrize);
          setIsSpinning(false);
          setShowPrizeDialog(true);
        }, 3000);
      } else {
        setIsSpinning(false);
        toast({
          title: "Spin Failed",
          description: result.error || "Failed to spin the wheel. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsSpinning(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Lucky Wheel"
            subtitle="Spin the wheel for a chance to win BIT tokens and other rewards"
            centered
          />
          
          <div className="max-w-3xl mx-auto bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                <RotateCw size={40} className="text-bitaccess-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Daily Rewards</h3>
                <p className="text-gray-400">
                  Spin once every 24 hours for a chance to win BIT tokens and other prizes
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10 text-center">
                <Trophy size={24} className="mx-auto mb-2 text-bitaccess-gold" />
                <p className="text-gray-400 text-sm">Total Spins</p>
                <p className="text-xl font-bold text-white">{spinWheelData.totalSpins.toLocaleString()}</p>
              </div>
              
              <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10 text-center">
                <Users size={24} className="mx-auto mb-2 text-bitaccess-gold" />
                <p className="text-gray-400 text-sm">Daily Spins</p>
                <p className="text-xl font-bold text-white">{spinWheelData.dailySpins.toLocaleString()}</p>
              </div>
              
              <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10 text-center">
                <div className="flex justify-center">
                  <div className="rounded-full h-6 w-6 bg-bitaccess-gold flex items-center justify-center text-bitaccess-black font-bold text-xs">
                    %
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-2">Win Rate</p>
                <p className="text-xl font-bold text-white">{spinWheelData.winRate}%</p>
              </div>
            </div>
            
            <div className="relative flex justify-center items-center my-12">
              {/* Stylized wheel representation */}
              <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-bitaccess-gold relative overflow-hidden ${isSpinning ? "animate-spin" : ""}`} 
                style={{ 
                  animationDuration: "3s", 
                  backgroundImage: "conic-gradient(#ffd700, #b8860b, #ffd700, #b8860b, #ffd700, #b8860b)" 
                }}
              >
                {spinWheelData.prizes.map((prize, index) => (
                  <div 
                    key={index} 
                    className="absolute w-full text-center text-black font-bold"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${index * (360 / spinWheelData.prizes.length)}deg) translateY(-120px) rotate(90deg)`,
                      transformOrigin: 'left'
                    }}
                  >
                    {prize}
                  </div>
                ))}
              </div>
              
              {/* Center pin */}
              <div className="absolute w-8 h-8 bg-bitaccess-black rounded-full border-2 border-bitaccess-gold z-10"></div>
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-bitaccess-gold z-10"></div>
            </div>
            
            <div className="text-center mt-12">
              {isConnected ? (
                <>
                  <Button 
                    onClick={handleSpin}
                    disabled={isSpinning || !spinWheelData.userCanSpin}
                    size="lg" 
                    className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                  >
                    {isSpinning ? "Spinning..." : 
                     !spinWheelData.userCanSpin && timeToNextSpin ? `Spin Again in ${timeToNextSpin}` : 
                     "Spin the Wheel"}
                  </Button>
                  
                  {!spinWheelData.userCanSpin && timeToNextSpin && (
                    <p className="text-sm text-gray-400 mt-2">You can spin again after the cooldown period ends.</p>
                  )}
                </>
              ) : (
                <Button 
                  onClick={connectWallet}
                  size="lg" 
                  className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                >
                  Connect Wallet to Spin
                </Button>
              )}
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Running on Binance Smart Chain (BSC) | View contract on <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer" className="text-bitaccess-gold hover:underline">BscScan</a></p>
            </div>
          </div>

          {/* Rules section */}
          <div className="max-w-3xl mx-auto mt-8 bg-bitaccess-black-light rounded-xl p-6 border border-bitaccess-gold/20">
            <h3 className="text-lg font-bold text-bitaccess-gold mb-4">How it works</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Connect your wallet to participate</li>
              <li>Each wallet address can spin once every 24 hours</li>
              <li>Tokens won will be automatically transferred to your wallet</li>
              <li>Make sure you have enough BNB for gas fees</li>
              <li>"Try Again" result means no prize this time, but you can come back tomorrow!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Prize Dialog */}
      <Dialog open={showPrizeDialog} onOpenChange={setShowPrizeDialog}>
        <DialogContent className="bg-bitaccess-black border border-bitaccess-gold/20">
          <DialogHeader>
            <DialogTitle className="text-center text-bitaccess-gold text-xl">
              {prize === "Try Again" ? "Better Luck Next Time!" : "Congratulations!"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            {prize === "Try Again" ? (
              <p className="text-white">No prize this time. Come back tomorrow for another chance!</p>
            ) : (
              <>
                <p className="text-white mb-4">You've won:</p>
                <p className="text-2xl font-bold text-bitaccess-gold mb-4">{prize}</p>
                <p className="text-gray-400 text-sm">Tokens will be transferred to your wallet shortly.</p>
              </>
            )}
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => setShowPrizeDialog(false)}
              className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SpinWheel;
