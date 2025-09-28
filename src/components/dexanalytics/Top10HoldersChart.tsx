
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { useRealTimeTokenData } from "@/hooks/useRealTimeTokenData";
import { formatNumber } from "@/utils/formatUtils";
import { Skeleton } from "@/components/ui/skeleton";

const Top10HoldersChart = () => {
  const { tokenInfo, topHolders, isLoading } = useRealTimeTokenData();

  // Format holders data for chart - get top 10
  const top10Holders = topHolders.slice(0, 10);
  const holdersData = top10Holders.map((holder, index) => ({
    name: `Holder ${index + 1}`,
    value: parseFloat(holder.percentage.toFixed(2)),
    address: `${holder.address.slice(0, 6)}...${holder.address.slice(-4)}`,
    tokens: formatNumber(parseFloat(holder.balance)),
    fullAddress: holder.address
  }));

  const COLORS = [
    '#FFD700', // Gold
    '#FFA500', // Orange
    '#FF6347', // Tomato
    '#32CD32', // Lime Green
    '#1E90FF', // Dodger Blue
    '#9370DB', // Medium Purple
    '#FF69B4', // Hot Pink
    '#00CED1', // Dark Turquoise
    '#FFA07A', // Light Salmon
    '#98FB98', // Pale Green
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-bitaccess-black-light p-3 rounded-lg border border-bitaccess-gold/20">
          <p className="text-white font-semibold">{data.name}</p>
          <p className="text-gray-400 text-sm">{data.address}</p>
          <p className="text-bitaccess-gold">{data.value}% ({data.tokens} BIT)</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-48 bg-gray-700" />
          <Skeleton className="h-8 w-32 bg-gray-700" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 bg-gray-700" />
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-16 bg-gray-700" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Calculate statistics from real data
  const totalHoldersCount = tokenInfo?.holders || 4605;
  const largestHolderPercentage = top10Holders[0]?.percentage || 0;
  const tenthLargestPercentage = top10Holders[9]?.percentage || 0;
  const top10TotalPercentage = holdersData.reduce((sum, holder) => sum + holder.value, 0);

  return (
    <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Top 10 Holders Distribution</h3>
        <div className="bg-bitaccess-gold/20 rounded-full px-3 py-1 text-sm text-bitaccess-gold">
          Total Supply: 100,000,000,000 BIT
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-80">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={holdersData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                  labelLine={false}
                >
                  {holdersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Holders List */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white mb-4">Holder Details</h4>
          <div className="max-h-72 overflow-y-auto space-y-2">
            {holdersData.map((holder, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <div>
                    <p className="text-white font-medium">#{index + 1}</p>
                    <p className="text-gray-400 text-sm font-mono">{holder.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-bitaccess-gold font-semibold">{holder.value}%</p>
                  <p className="text-gray-400 text-sm">{holder.tokens} BIT</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-bitaccess-gold">
              {top10TotalPercentage.toFixed(1)}%
            </p>
            <p className="text-gray-400 text-sm">Top 10 Holdings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{totalHoldersCount.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">Total Holders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{largestHolderPercentage.toFixed(2)}%</p>
            <p className="text-gray-400 text-sm">Largest Holder</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{tenthLargestPercentage.toFixed(2)}%</p>
            <p className="text-gray-400 text-sm">10th Largest</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top10HoldersChart;
