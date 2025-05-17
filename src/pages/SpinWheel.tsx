
import { useState } from "react";
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
      const result = await spinWheel(address as string);
      if (result.success) {
        const randomIndex = Math.floor(Math.random() * spinWheelData.prizes.length);
        const prize = spinWheelData.prizes[randomIndex];
        setSpinResult(prize);

        toast({
          title: "Spin Successful",
          description: `You won: ${prize}!`,
        });
      } else {
        toast({
          title: "Spin Failed",
          description: result.error || "Failed to spin the wheel.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
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

            <Card className="bg-bitaccess-black border-bitaccess-gold/10 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Prizes</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {spinWheelData.prizes.map((prize, index) => (
                    <li key={index}>{prize}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

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
                <div className="mb-4">
                  <h4 className="text-2xl font-bold text-bitaccess-gold">Congratulations!</h4>
                  <p className="text-white">You won: {spinResult}</p>
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
