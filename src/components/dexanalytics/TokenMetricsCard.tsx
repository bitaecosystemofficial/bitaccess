
import { ArrowUp, ArrowDown, ChartLine } from "lucide-react";
import { TokenMetrics } from "@/types/analytics";

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
        <div className="p-3 bg-bitaccess-black rounded-lg">
          <p className="text-gray-400 text-sm">24h Change</p>
          <p className={`font-bold ${metrics.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {metrics.priceChange24h >= 0 ? '+' : ''}{metrics.priceChange24h.toFixed(2)}% 
            {metrics.priceChange24h >= 0 ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />}
          </p>
        </div>
        <div className="p-3 bg-bitaccess-black rounded-lg">
          <p className="text-gray-400 text-sm">7d Change</p>
          <p className={`font-bold ${metrics.priceChange7d >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {metrics.priceChange7d >= 0 ? '+' : ''}{metrics.priceChange7d.toFixed(2)}% 
            {metrics.priceChange7d >= 0 ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />}
          </p>
        </div>
        <div className="p-3 bg-bitaccess-black rounded-lg">
          <p className="text-gray-400 text-sm">Volume 24h</p>
          <p className="font-bold text-white">${metrics.volume24h.toLocaleString()}</p>
        </div>
        <div className="p-3 bg-bitaccess-black rounded-lg">
          <p className="text-gray-400 text-sm">Market Cap</p>
          <p className="font-bold text-white">${metrics.marketCap.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenMetricsCard;
