
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MetricItemProps {
  label: string;
  value: string | number;
  isPercentage?: boolean;
  percentageChange?: number;
  className?: string;
}

const MetricItem = ({ 
  label, 
  value, 
  isPercentage = false, 
  percentageChange,
  className 
}: MetricItemProps) => {
  // Only show arrow and colorize if we have percentage change data
  const showPercentageIndicator = isPercentage && percentageChange !== undefined;
  const isPositive = percentageChange !== undefined ? percentageChange >= 0 : false;
  
  return (
    <div className={cn("p-3 bg-bitaccess-black rounded-lg", className)}>
      <p className="text-gray-400 text-sm">{label}</p>
      {showPercentageIndicator ? (
        <p className={`font-bold ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
          {isPositive ? '+' : ''}{value}
          {isPositive ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />}
        </p>
      ) : (
        <p className="font-bold text-white">{value}</p>
      )}
    </div>
  );
};

export default MetricItem;
