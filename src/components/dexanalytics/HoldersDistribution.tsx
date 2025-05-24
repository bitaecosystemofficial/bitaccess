
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const holdersData = [
  { name: 'Whales (>1M)', value: 5, color: '#F9D975' },
  { name: 'Large Holders (100K-1M)', value: 15, color: '#22c55e' },
  { name: 'Medium Holders (10K-100K)', value: 25, color: '#3b82f6' },
  { name: 'Small Holders (1K-10K)', value: 35, color: '#8b5cf6' },
  { name: 'Retail (<1K)', value: 20, color: '#ef4444' },
];

const HoldersDistribution = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bitaccess-black p-3 border border-bitaccess-gold/30 rounded-lg shadow-lg">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-bitaccess-gold">{payload[0].value}% of holders</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
      <h3 className="text-xl font-semibold text-white mb-6">Token Holders Distribution</h3>
      
      {/* Full width container with increased height */}
      <div className="w-full -mx-6">
        <div className="px-6">
          <ChartContainer
            className="h-96"
            config={{
              whales: { theme: { light: "#F9D975", dark: "#F9D975" } },
              large: { theme: { light: "#22c55e", dark: "#22c55e" } },
              medium: { theme: { light: "#3b82f6", dark: "#3b82f6" } },
              small: { theme: { light: "#8b5cf6", dark: "#8b5cf6" } },
              retail: { theme: { light: "#ef4444", dark: "#ef4444" } }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={holdersData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {holdersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  formatter={(value) => <span style={{ color: 'white' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {holdersData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-bitaccess-black rounded-lg">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-3" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-300 text-sm">{item.name}</span>
            </div>
            <span className="text-white font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoldersDistribution;
