
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SpinWheel = () => {
  const { isConnected, connectWallet } = useWallet();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPrizeDialog, setShowPrizeDialog] = useState(false);
  const [prize, setPrize] = useState("");

  const prizes = [
    "5 BIT Tokens",
    "10 BIT Tokens",
    "25 BIT Tokens",
    "50 BIT Tokens",
    "100 BIT Tokens",
    "Try Again"
  ];

  const handleSpin = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to spin the wheel",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    
    // Simulate wheel spinning
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setPrize(randomPrize);
      setIsSpinning(false);
      setShowPrizeDialog(true);
    }, 3000);
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
            
            <div className="relative flex justify-center items-center my-12">
              {/* Stylized wheel representation */}
              <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-bitaccess-gold relative overflow-hidden ${isSpinning ? "animate-spin" : ""}`} 
                style={{ 
                  animationDuration: "3s", 
                  backgroundImage: "conic-gradient(#ffd700, #b8860b, #ffd700, #b8860b, #ffd700, #b8860b)" 
                }}
              >
                {prizes.map((prize, index) => (
                  <div 
                    key={index} 
                    className="absolute w-full text-center text-black font-bold"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${index * (360 / prizes.length)}deg) translateY(-120px) rotate(90deg)`,
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
                <Button 
                  onClick={handleSpin}
                  disabled={isSpinning}
                  size="lg" 
                  className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                >
                  {isSpinning ? "Spinning..." : "Spin the Wheel"}
                </Button>
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
