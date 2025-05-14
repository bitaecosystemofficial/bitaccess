
import { ChartLine } from "lucide-react";
import { TokenMetrics } from "@/types/analytics";
import MetricItem from "./MetricItem";

interface TokenMetricsCardProps {
  metrics: TokenMetrics;
}

const TokenMetricsCard = ({ metrics }: TokenMetricsCardProps) => {
  return (
    <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Price Statistics</h3>
        <ChartLine className="text-bitaccess-gold" size={24} />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <MetricItem 
          label="24h Change"
          value={`${metrics.priceChange24h.toFixed(2)}%`}
          isPercentage={true}
          percentageChange={metrics.priceChange24h}
        />
        
        <MetricItem 
          label="7d Change"
          value={`${metrics.priceChange7d.toFixed(2)}%`}
          isPercentage={true}
          percentageChange={metrics.priceChange7d}
        />
        
        <MetricItem 
          label="Volume 24h"
          value={`$${metrics.volume24h.toLocaleString()}`}
        />
        
        <MetricItem 
          label="Market Cap"
          value={`$${metrics.marketCap.toLocaleString()}`}
        />
      </div>
    </div>
  );
};

export default TokenMetricsCard;
