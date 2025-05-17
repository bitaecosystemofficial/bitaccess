
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";

interface SpinCooldownProps {
  userLastSpinTime: number;
  cooldownPeriod: number;
  isLoading: boolean;
}

const SpinCooldown = ({ userLastSpinTime, cooldownPeriod, isLoading }: SpinCooldownProps) => {
  const timeUntilNextSpin = () => {
    if (!userLastSpinTime || !cooldownPeriod) return "Now";
    
    const nextSpinTime = userLastSpinTime + cooldownPeriod;
    const now = Math.floor(Date.now() / 1000);
    
    if (now >= nextSpinTime) return "Now";
    
    const timeRemaining = nextSpinTime - now;
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
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
                (Math.floor(Date.now() / 1000) - userLastSpinTime) * 100 / cooldownPeriod,
                100
              )} 
              className="h-2 [&>div]:bg-bitaccess-gold" 
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SpinCooldown;
