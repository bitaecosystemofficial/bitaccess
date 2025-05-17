
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useSpinWheelData, spinWheel } from "@/hooks/useSpinWheel";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Ticket } from "lucide-react";

// Import new components
import SpinStats from "@/components/spinwheel/SpinStats";
import SpinCooldown from "@/components/spinwheel/SpinCooldown";
import SpinWheelContainer from "@/components/spinwheel/SpinWheelContainer";
import SpinHistory from "@/components/spinwheel/SpinHistory";
import PrizeList from "@/components/spinwheel/PrizeList";

const SpinWheel = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const { spinWheelData, isLoading, refreshData } = useSpinWheelData();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  
  const handleSpin = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (!spinWheelData.userCanSpin && spinWheelData.freeSpins === 0) {
      toast({
        title: "Cooldown Period",
        description: `You can spin again in ${timeUntilNextSpin()}.`,
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    
    try {
      // Animation for spinning wheel
      const targetAngle = rotationAngle + 1440 + Math.random() * 360; // Spin multiple times + random
      
      // Animate the wheel
      const startTime = performance.now();
      const duration = 5000; // 5 seconds
      
      const animateWheel = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        if (elapsed < duration) {
          // Easing function for smooth deceleration
          const progress = elapsed / duration;
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          setRotationAngle(rotationAngle + easeOut * (targetAngle - rotationAngle));
          requestAnimationFrame(animateWheel);
        } else {
          setRotationAngle(targetAngle);
          
          // Determine the winning prize after spinning
          const numPrizes = spinWheelData.prizes.length;
          const anglePerSection = 360 / numPrizes;
          const normalizedAngle = targetAngle % 360;
          const prizeIndex = Math.floor(numPrizes - (normalizedAngle / anglePerSection) % numPrizes);
          const selectedPrize = spinWheelData.prizes[prizeIndex % numPrizes];
          
          setTimeout(async () => {
            if (!address) return;
            
            const result = await spinWheel(address);
            
            if (result.success) {
              setSpinResult(selectedPrize.name);
              
              toast({
                title: "Spin Successful",
                description: `You won: ${selectedPrize.name}!`,
              });
              
              // Refresh data to update balances and spin status
              refreshData();
            } else {
              toast({
                title: "Spin Failed",
                description: result.error || "Failed to spin the wheel.",
                variant: "destructive",
              });
            }
            setIsSpinning(false);
          }, 500);
        }
      };
      
      requestAnimationFrame(animateWheel);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsSpinning(false);
    }
  };

  const timeUntilNextSpin = () => {
    if (!spinWheelData.userLastSpinTime || !spinWheelData.cooldownPeriod) return "Now";
    
    const nextSpinTime = spinWheelData.userLastSpinTime + spinWheelData.cooldownPeriod;
    const now = Math.floor(Date.now() / 1000);
    
    if (now >= nextSpinTime) return "Now";
    
    const timeRemaining = nextSpinTime - now;
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Spin Wheel Access Required"
          description="Please connect your wallet to spin the wheel and win rewards"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="Spin the Wheel"
            subtitle="Try your luck and win BIT tokens!"
            centered
          />

          <div className="max-w-5xl mx-auto bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
            <SpinStats 
              totalSpins={spinWheelData.totalSpins}
              dailySpins={spinWheelData.dailySpins}
              spinCost={spinWheelData.spinCost}
              freeSpins={spinWheelData.freeSpins}
              isLoading={isLoading}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <SpinWheelContainer
                  prizes={spinWheelData.prizes}
                  spinMultiplier={spinWheelData.spinMultiplier}
                  freeSpins={spinWheelData.freeSpins}
                  spinCost={spinWheelData.spinCost}
                  userCanSpin={spinWheelData.userCanSpin || spinWheelData.freeSpins > 0}
                  isSpinning={isSpinning}
                  spinResult={spinResult}
                  onSpin={handleSpin}
                />
                
                <SpinCooldown 
                  userLastSpinTime={spinWheelData.userLastSpinTime}
                  cooldownPeriod={spinWheelData.cooldownPeriod}
                  isLoading={isLoading}
                />
              </div>

              <div className="md:col-span-1">
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-bitaccess-black border-bitaccess-gold/20">
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="prizes">Prizes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="history" className="mt-2">
                    <Card className="bg-bitaccess-black-light border-bitaccess-gold/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Ticket className="h-4 w-4 mr-2" /> Your Spin History
                        </CardTitle>
                      </CardHeader>
                      <SpinHistory 
                        userPrizes={spinWheelData.userPrizes}
                        prizes={spinWheelData.prizes}
                        isLoading={isLoading}
                      />
                    </Card>
                  </TabsContent>
                  <TabsContent value="prizes" className="mt-2">
                    <Card className="bg-bitaccess-black-light border-bitaccess-gold/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Gift className="h-4 w-4 mr-2" /> Available Prizes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <PrizeList 
                          prizes={spinWheelData.prizes}
                          isLoading={isLoading}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpinWheel;
