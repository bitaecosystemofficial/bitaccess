
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

const recentTransactions = [
  { hash: "0x3a2f4e26b7a3f17...", type: "Buy", amount: "120,000,000", value: "$2,340", time: "10 mins ago" },
  { hash: "0x7b8c9d0e1f2a3b4...", type: "Sell", amount: "87,500,000", value: "$1,706", time: "23 mins ago" },
  { hash: "0xc5d6e7f8a9b0c1d...", type: "Buy", amount: "56,300,000", value: "$1,097", time: "37 mins ago" },
  { hash: "0x1a2b3c4d5e6f7g8...", type: "Buy", amount: "98,200,000", value: "$1,914", time: "42 mins ago" },
  { hash: "0x9h8g7f6e5d4c3b...", type: "Sell", amount: "35,700,000", value: "$696", time: "55 mins ago" },
];

const TransactionAnalytics = () => {
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
              {recentTransactions.map((tx, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">
                    <a 
                      href={`https://bscscan.com/tx/${tx.hash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-bitaccess-gold hover:underline"
                    >
                      {tx.hash}
                    </a>
                  </TableCell>
                  <TableCell className={tx.type === "Buy" ? "text-green-500" : "text-red-500"}>
                    {tx.type}
                  </TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.value}</TableCell>
                  <TableCell className="text-gray-400">{tx.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TransactionAnalytics;
