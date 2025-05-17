
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Award, Users, Clock, ArrowRight, Coins, Star, Gift, Ticket } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useSpinWheelData, spinWheel } from "@/hooks/useSpinWheel";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow, format } from "date-fns";
import { ethers } from "ethers";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SpinWheel = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const { spinWheelData, isLoading, refreshData } = useSpinWheelData();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  
  // Colors for wheel sections
  const colors = [
    "#FFD700", // Gold
    "#1E90FF", // Blue
    "#32CD32", // Green
    "#FF6347", // Red
    "#9370DB", // Purple
    "#FF8C00", // Orange
  ];

  // Draw wheel on canvas
  useEffect(() => {
    if (!canvasRef.current || !spinWheelData.prizes || spinWheelData.prizes.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw wheel sections
    const prizeNames = spinWheelData.prizes.map(prize => prize.name);
    const numPrizes = prizeNames.length;
    const anglePerSection = (2 * Math.PI) / numPrizes;
    
    // Apply rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    
    for (let i = 0; i < numPrizes; i++) {
      const prize = spinWheelData.prizes[i];
      
      // Draw section
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(
        0, 
        0, 
        radius, 
        i * anglePerSection, 
        (i + 1) * anglePerSection
      );
      ctx.closePath();
      
      // Determine fill color based on prize type
      let fillColor = colors[i % colors.length];
      if (prize.isFreeSpin) {
        fillColor = "#32CD32"; // Green for free spins
      } else if (prize.spinMultiplier > 1) {
        fillColor = "#FFD700"; // Gold for multipliers
      } else if (prize.amount < 0) {
        fillColor = "#FF6347"; // Red for losses
      } else if (prize.amount > 1000) {
        fillColor = "#9370DB"; // Purple for jackpots
      }
      
      ctx.fillStyle = fillColor;
      ctx.fill();
      
      // Add prize text
      ctx.save();
      ctx.rotate(i * anglePerSection + anglePerSection / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.font = "bold 14px Arial";
      
      // Format text based on prize type
      let prizeText = prize.name;
      if (prizeText.length > 12) {
        prizeText = prizeText.substring(0, 10) + "...";
      }
      ctx.fillText(prizeText, radius / 2, 0);
      ctx.restore();
    }
    
    ctx.restore();
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "#222";
    ctx.fill();
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw outer border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 15);
    ctx.lineTo(centerX - 15, centerY - radius + 10);
    ctx.lineTo(centerX + 15, centerY - radius + 10);
    ctx.closePath();
    ctx.fillStyle = "#FFD700";
    ctx.fill();
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.stroke();
    
  }, [rotationAngle, spinWheelData.prizes]);

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

  const renderSpinHistory = () => {
    if (spinWheelData.userPrizes.length === 0) {
      return (
        <div className="p-6 text-center text-gray-400">
          No spin history available yet.
        </div>
      );
    }

    return (
      <div className="space-y-4 max-h-60 overflow-y-auto p-2">
        {spinWheelData.userPrizes.slice().reverse().map((prize, index) => (
          <Card key={index} className="bg-bitaccess-black border-bitaccess-gold/10">
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-white">
                    {spinWheelData.prizes[prize.prizeId - 1]?.name || `Prize #${prize.prizeId}`}
                  </p>
                  <p className="text-sm text-gray-400">
                    {format(new Date(prize.timestamp * 1000), 'MMM d, h:mm a')}
                  </p>
                </div>
                <Badge
                  className={`${prize.amount > 0 ? 'bg-green-600' : prize.amount < 0 ? 'bg-red-600' : 'bg-blue-600'}`}
                >
                  {prize.amount > 0 ? '+' + prize.amount : prize.amount < 0 ? prize.amount : prize.isFreeSpin ? 'Free Spin' : 'x' + prize.spinMultiplier}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-bitaccess-black border-bitaccess-gold/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-2">
                    <Award className="h-6 w-6 text-bitaccess-gold" />
                    <h3 className="text-lg font-bold text-white">Total Spins</h3>
                  </div>
                  {isLoading ? (
                    <Skeleton className="h-8 w-24 bg-gray-700" />
                  ) : (
                    <p className="text-2xl font-semibold text-bitaccess-gold">{spinWheelData.totalSpins}</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-bitaccess-black border-bitaccess-gold/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-2">
                    <Users className="h-6 w-6 text-bitaccess-gold" />
                    <h3 className="text-lg font-bold text-white">Daily Spins</h3>
                  </div>
                  {isLoading ? (
                    <Skeleton className="h-8 w-24 bg-gray-700" />
                  ) : (
                    <p className="text-2xl font-semibold text-bitaccess-gold">{spinWheelData.dailySpins}</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-bitaccess-black border-bitaccess-gold/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-2">
                    <Coins className="h-6 w-6 text-bitaccess-gold" />
                    <h3 className="text-lg font-bold text-white">Spin Cost</h3>
                  </div>
                  {isLoading ? (
                    <Skeleton className="h-8 w-24 bg-gray-700" />
                  ) : (
                    <p className="text-2xl font-semibold text-bitaccess-gold">
                      {spinWheelData.freeSpins > 0 
                        ? <span>Free ({spinWheelData.freeSpins} left)</span> 
                        : <span>{spinWheelData.spinCost} BIT</span>
                      }
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                {/* Premium Wheel Design */}
                <div className="relative flex justify-center mb-10">
                  <div className="relative">
                    <canvas 
                      ref={canvasRef} 
                      width={400} 
                      height={400} 
                      className={`${isSpinning ? "animate-pulse" : ""}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-bitaccess-black rounded-full w-16 h-16 flex items-center justify-center border-2 border-bitaccess-gold">
                        <span className="text-bitaccess-gold font-bold">SPIN</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="bg-bitaccess-black border-bitaccess-gold/10 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Clock className="h-6 w-6 text-bitaccess-gold" />
                      <h3 className="text-xl font-bold text-white">Spin Cooldown</h3>
                    </div>
                    {isLoading ? (
                      <Skeleton className="h-6 w-full bg-gray-700" />
                    ) : (
                      <>
                        <p className="text-gray-400 mb-2">
                          Next spin available: <span className="text-bitaccess-gold">{timeUntilNextSpin()}</span>
                        </p>
                        <Progress 
                          value={Math.min(
                            (Math.floor(Date.now() / 1000) - spinWheelData.userLastSpinTime) * 100 / spinWheelData.cooldownPeriod,
                            100
                          )} 
                          className="h-2 [&>div]:bg-bitaccess-gold" 
                        />
                      </>
                    )}
                  </CardContent>
                </Card>

                <div className="text-center">
                  {spinResult && (
                    <div className="mb-4 p-4 bg-bitaccess-gold/10 border border-bitaccess-gold rounded-lg animate-fade-in">
                      <h4 className="text-2xl font-bold text-bitaccess-gold">Congratulations!</h4>
                      <p className="text-white text-lg">You won: {spinResult}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleSpin}
                    disabled={isSpinning || (!spinWheelData.userCanSpin && spinWheelData.freeSpins === 0)}
                    size="lg"
                    className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                  >
                    {isSpinning ? (
                      <>
                        Spinning... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Spin the Wheel <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="mt-3 text-sm text-gray-400">
                    {spinWheelData.freeSpins > 0 ? (
                      <span>Using free spin ({spinWheelData.freeSpins} remaining)</span>
                    ) : (
                      <span>Cost: {spinWheelData.spinCost} BIT per spin</span>
                    )}
                  </p>

                  {spinWheelData.spinMultiplier > 1 && (
                    <Badge className="mt-2 bg-bitaccess-gold text-black">
                      x{spinWheelData.spinMultiplier} Multiplier Active!
                    </Badge>
                  )}
                </div>
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
                      {isLoading ? (
                        <CardContent>
                          <div className="space-y-2">
                            {[...Array(4)].map((_, i) => (
                              <Skeleton key={i} className="h-14 w-full bg-gray-700" />
                            ))}
                          </div>
                        </CardContent>
                      ) : (
                        renderSpinHistory()
                      )}
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
                        {isLoading ? (
                          <div className="space-y-2">
                            {[...Array(5)].map((_, i) => (
                              <Skeleton key={i} className="h-8 w-full bg-gray-700" />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {spinWheelData.prizes.map((prize, i) => (
                              <div
                                key={i}
                                className="flex justify-between items-center p-2 border-b border-gray-700 last:border-0"
                              >
                                <span className="text-white">
                                  {prize.name}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    prize.amount > 0
                                      ? "border-green-500 text-green-500"
                                      : prize.amount < 0
                                      ? "border-red-500 text-red-500"
                                      : prize.isFreeSpin
                                      ? "border-blue-500 text-blue-500"
                                      : prize.spinMultiplier > 1
                                      ? "border-yellow-500 text-yellow-500"
                                      : "border-gray-500 text-gray-500"
                                  }`}
                                >
                                  {(prize.probability / 100).toFixed(1)}%
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
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
