
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

const Top10HoldersChart = () => {
  // Mock data for top 10 holders with realistic distribution
  const holdersData = [
    { name: 'Holder 1', value: 15.2, address: '0x1a2b...3c4d', tokens: '15,200,000,000' },
    { name: 'Holder 2', value: 12.8, address: '0x5e6f...7g8h', tokens: '12,800,000,000' },
    { name: 'Holder 3', value: 10.5, address: '0x9i0j...1k2l', tokens: '10,500,000,000' },
    { name: 'Holder 4', value: 8.7, address: '0x3m4n...5o6p', tokens: '8,700,000,000' },
    { name: 'Holder 5', value: 7.3, address: '0x7q8r...9s0t', tokens: '7,300,000,000' },
    { name: 'Holder 6', value: 6.1, address: '0x1u2v...3w4x', tokens: '6,100,000,000' },
    { name: 'Holder 7', value: 5.4, address: '0x5y6z...7a8b', tokens: '5,400,000,000' },
    { name: 'Holder 8', value: 4.8, address: '0x9c0d...1e2f', tokens: '4,800,000,000' },
    { name: 'Holder 9', value: 4.2, address: '0x3g4h...5i6j', tokens: '4,200,000,000' },
    { name: 'Holder 10', value: 3.7, address: '0x7k8l...9m0n', tokens: '3,700,000,000' },
  ];

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
                    <p className="text-gray-400 text-sm">{holder.address}</p>
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
              {holdersData.reduce((sum, holder) => sum + holder.value, 0).toFixed(1)}%
            </p>
            <p className="text-gray-400 text-sm">Top 10 Holdings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">3,194</p>
            <p className="text-gray-400 text-sm">Total Holders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">15.2%</p>
            <p className="text-gray-400 text-sm">Largest Holder</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">3.7%</p>
            <p className="text-gray-400 text-sm">10th Largest</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top10HoldersChart;
