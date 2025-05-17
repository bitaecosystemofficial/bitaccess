
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Prize } from "@/services/SpinWheelService";

interface PrizeListProps {
  prizes: Prize[];
  isLoading: boolean;
}

const PrizeList = ({ prizes, isLoading }: PrizeListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-full bg-gray-700" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {prizes.map((prize, i) => (
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
  );
};

export default PrizeList;
