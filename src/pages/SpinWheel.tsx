
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Award, Users, Clock, ArrowRight } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useSpinWheelData, spinWheel } from "@/hooks/useSpinWheel";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";

const SpinWheel = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const spinWheelData = useSpinWheelData();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw wheel sections
    const numPrizes = spinWheelData.prizes.length;
    const anglePerSection = (2 * Math.PI) / numPrizes;
    
    // Apply rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    
    for (let i = 0; i < numPrizes; i++) {
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
      
      // Fill section
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      
      // Add prize text
      ctx.save();
      ctx.rotate(i * anglePerSection + anglePerSection / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.font = "bold 14px Arial";
      ctx.fillText(spinWheelData.prizes[i], radius / 2, 0);
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

    if (!spinWheelData.userCanSpin) {
      toast({
        title: "Cooldown Period",
        description: "You can spin again after 24 hours.",
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
            const result = await spinWheel(address as string);
            
            if (result.success) {
              setSpinResult(selectedPrize);
              
              toast({
                title: "Spin Successful",
                description: `You won: ${selectedPrize}!`,
              });
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

          <div className="max-w-3xl mx-auto bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-bitaccess-black border-bitaccess-gold/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Award className="h-6 w-6 text-bitaccess-gold" />
                    <h3 className="text-xl font-bold text-white">Total Spins</h3>
                  </div>
                  <p className="text-3xl font-semibold text-bitaccess-gold">{spinWheelData.totalSpins}</p>
                </CardContent>
              </Card>

              <Card className="bg-bitaccess-black border-bitaccess-gold/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Users className="h-6 w-6 text-bitaccess-gold" />
                    <h3 className="text-xl font-bold text-white">Daily Spins</h3>
                  </div>
                  <p className="text-3xl font-semibold text-bitaccess-gold">{spinWheelData.dailySpins}</p>
                </CardContent>
              </Card>
            </div>

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

            <Card className="bg-bitaccess-black border-bitaccess-gold/10 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="h-6 w-6 text-bitaccess-gold" />
                  <h3 className="text-xl font-bold text-white">Spin Cooldown</h3>
                </div>
                <p className="text-gray-400">
                  You can spin the wheel every 24 hours.
                </p>
                <Progress value={spinWheelData.userLastSpinTime} max={spinWheelData.cooldownPeriod} className="mt-4" />
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
                disabled={isSpinning || !spinWheelData.userCanSpin}
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
            </div>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Good luck!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpinWheel;
