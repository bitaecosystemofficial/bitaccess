
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const holdersData = [
  { name: 'Top 1-10', value: 68.5, color: '#F9D975' },
  { name: 'Top 11-50', value: 15.8, color: '#FFA500' },
  { name: '51-100', value: 6.2, color: '#FFD700' },
  { name: '101-500', value: 5.5, color: '#b99207' },
  { name: '501+', value: 4.0, color: '#ddca7a' }
];

const topHoldersData = [
  { rank: 1, address: "0x7a42f1196271b5a68a36fa0d6a61f85a6cfa7e12", percentage: "18.5%", tokens: "18,500,000,000", type: "Contract (PancakeSwap)" },
  { rank: 2, address: "0x6f82e3cc2a3d6b7565ee1f28c3b149cd13a37022", percentage: "12.3%", tokens: "12,300,000,000", type: "Team Wallet (Locked)" },
  { rank: 3, address: "0xd138592f8741c6147bdbc413ea52537926482192", percentage: "9.7%", tokens: "9,700,000,000", type: "Marketing" },
  { rank: 4, address: "0xa9c28ce2141b56c474f0e26b9b70e7b978566430", percentage: "7.8%", tokens: "7,800,000,000", type: "Staking Contract" },
  { rank: 5, address: "0x3782844a2da2d31c52c3b4917e42f881ef32f907", percentage: "6.4%", tokens: "6,400,000,000", type: "Private Investor" },
];

const truncateAddress = (address: string) => {
  return address.substring(0, 6) + "..." + address.substring(address.length - 4);
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bitaccess-black p-3 rounded border border-bitaccess-gold/20">
        <p className="text-white font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const HoldersDistribution = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
        <h3 className="text-xl font-semibold text-white mb-4">Token Distribution</h3>
        <ChartContainer 
          className="h-80" 
          config={{
            holders: {
              theme: {
                light: "#F9D975",
                dark: "#F9D975"
              }
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={holdersData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {holdersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right" 
                formatter={(value) => <span className="text-white">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
        <h3 className="text-xl font-semibold text-white mb-4">Top 5 Holders</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>%</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topHoldersData.map((holder) => (
                <TableRow key={holder.rank}>
                  <TableCell className="text-bitaccess-gold font-medium">{holder.rank}</TableCell>
                  <TableCell className="font-mono">
                    <a 
                      href={`https://bscscan.com/address/${holder.address}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-bitaccess-gold hover:underline"
                    >
                      {truncateAddress(holder.address)}
                    </a>
                  </TableCell>
                  <TableCell>{holder.percentage}</TableCell>
                  <TableCell className="text-gray-400">{holder.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HoldersDistribution;
