
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Users, Coins } from "lucide-react";

interface SpinStatsProps {
  totalSpins: number;
  dailySpins: number;
  spinCost: string;
  freeSpins: number;
  isLoading: boolean;
}

const SpinStats = ({ totalSpins, dailySpins, spinCost, freeSpins, isLoading }: SpinStatsProps) => {
  return (
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
            <p className="text-2xl font-semibold text-bitaccess-gold">{totalSpins}</p>
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
            <p className="text-2xl font-semibold text-bitaccess-gold">{dailySpins}</p>
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
              {freeSpins > 0 
                ? <span>Free ({freeSpins} left)</span> 
                : <span>{spinCost} BIT</span>
              }
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpinStats;
