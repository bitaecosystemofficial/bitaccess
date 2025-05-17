
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserPrize, Prize } from "@/services/SpinWheelService";
import { Ticket } from "lucide-react";

interface SpinHistoryProps {
  userPrizes: UserPrize[];
  prizes: Prize[];
  isLoading: boolean;
}

const SpinHistory = ({ userPrizes, prizes, isLoading }: SpinHistoryProps) => {
  if (isLoading) {
    return (
      <CardContent>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full bg-gray-700" />
          ))}
        </div>
      </CardContent>
    );
  }

  if (userPrizes.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        No spin history available yet.
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-60 overflow-y-auto p-2">
      {userPrizes.slice().reverse().map((prize, index) => (
        <Card key={index} className="bg-bitaccess-black border-bitaccess-gold/10">
          <CardContent className="p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-white">
                  {prizes[prize.prizeId - 1]?.name || `Prize #${prize.prizeId}`}
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

export default SpinHistory;
