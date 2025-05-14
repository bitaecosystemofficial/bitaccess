
import { tokenDistribution } from "./tokenDistributionData";

const TokenDistributionChart = () => {
  return (
    <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10 mb-6">
      <div className="space-y-4">
        {tokenDistribution.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">{item.name}</span>
              <span className="text-sm text-bitaccess-gold">{item.percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-bitaccess-gold h-2 rounded-full" 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenDistributionChart;
