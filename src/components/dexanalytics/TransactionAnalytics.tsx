
import { ChartContainer } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  Line
} from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Database, TrendingUp } from "lucide-react";
import { TokenTransaction } from "@/services/BscscanService";
import { useMemo } from "react";

const transactionData = [
  { date: '05-06', buys: 145, sells: 87, volume: 5600 },
  { date: '05-07', buys: 167, sells: 92, volume: 6200 },
  { date: '05-08', buys: 190, sells: 110, volume: 7400 },
  { date: '05-09', buys: 178, sells: 130, volume: 8100 },
  { date: '05-10', buys: 254, sells: 156, volume: 9800 },
  { date: '05-11', buys: 236, sells: 142, volume: 8700 },
  { date: '05-12', buys: 198, sells: 121, volume: 7600 },
  { date: '05-13', buys: 210, sells: 109, volume: 8200 },
];

interface TransactionAnalyticsProps {
  transactions?: TokenTransaction[];
}

// Move the getTimeAgo helper function above where it's used
const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  
  if (diffMins < 60) {
    return `${diffMins} mins ago`;
  } else if (diffMins < 1440) {
    return `${Math.floor(diffMins / 60)} hours ago`;
  } else {
    return `${Math.floor(diffMins / 1440)} days ago`;
  }
};

const TransactionAnalytics = ({ transactions = [] }: TransactionAnalyticsProps) => {
  // Process BSCScan transactions for display
  const formattedTransactions = useMemo(() => {
    return transactions.slice(0, 5).map(tx => {
      // Convert Wei to Token value (assuming 9 decimals)
      const valueBN = BigInt(tx.value);
      const decimals = BigInt(10 ** 9);
      const tokenAmount = Number(valueBN) / Number(decimals);
      const formattedAmount = tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 0 });
      
      // Estimate USD value (using placeholder price)
      const estimatedUSD = (tokenAmount * 0.00000275).toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      // Format timestamp
      const date = new Date(Number(tx.timeStamp) * 1000);
      const timeAgo = getTimeAgo(date);
      
      // Determine if it's a buy or sell (simplified logic)
      // In a real app, you'd compare with known exchange addresses
      const type = tx.to === '0x7a42F1196271B5A68A36FA0D6A61F85A6cFA7E12' ? "Sell" : "Buy";
      
      return {
        hash: tx.hash,
        type,
        amount: formattedAmount,
        value: estimatedUSD,
        time: timeAgo
      };
    });
  }, [transactions]);
  
  // Removed duplicate getTimeAgo function since it's now defined above
  
  return (
    <div className="space-y-6">
      <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Transaction Volume</h3>
          <div className="flex items-center bg-bitaccess-black rounded-full px-3 py-1">
            <TrendingUp size={16} className="mr-2 text-green-500" />
            <span className="text-white text-sm">+23.4% this week</span>
          </div>
        </div>
        
        <ChartContainer
          className="h-80"
          config={{
            buys: {
              theme: { light: "#22c55e", dark: "#22c55e" },
              label: "Buys"
            },
            sells: {
              theme: { light: "#ef4444", dark: "#ef4444" },
              label: "Sells"
            },
            volume: {
              theme: { light: "#F9D975", dark: "#F9D975" },
              label: "Volume ($)"
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" tick={{ fill: "#A0AEC0" }} />
              <YAxis yAxisId="left" tick={{ fill: "#A0AEC0" }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#A0AEC0" }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1A1A1A", 
                  borderColor: "#F9D975", 
                  color: "white" 
                }}
              />
              <Legend 
                formatter={(value) => <span style={{ color: 'white' }}>{value}</span>}
              />
              <Bar yAxisId="left" dataKey="buys" name="Buys" fill="#22c55e" />
              <Bar yAxisId="left" dataKey="sells" name="Sells" fill="#ef4444" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="volume" 
                name="Volume ($)" 
                stroke="#F9D975" 
                strokeWidth={2} 
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
        <div className="flex items-center mb-6">
          <Database className="mr-3 text-bitaccess-gold" size={24} />
          <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedTransactions.length > 0 ? (
                formattedTransactions.map((tx, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">
                      <a 
                        href={`https://bscscan.com/tx/${tx.hash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-bitaccess-gold hover:underline"
                      >
                        {tx.hash.substring(0, 18) + '...'}
                      </a>
                    </TableCell>
                    <TableCell className={tx.type === "Buy" ? "text-green-500" : "text-red-500"}>
                      {tx.type}
                    </TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>{tx.value}</TableCell>
                    <TableCell className="text-gray-400">{tx.time}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400 py-4">
                    No transaction data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TransactionAnalytics;
