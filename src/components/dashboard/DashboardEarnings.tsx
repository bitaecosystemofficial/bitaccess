
import React, { useEffect, useState } from "react";
import { useMembership } from "@/contexts/MembershipContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, TrendingUp, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardEarnings = () => {
  const { membershipStats, loadingStats, referralEarningsHistory, withdrawEarnings, isLoading } = useMembership();
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (referralEarningsHistory?.length > 0) {
      const processedData = processEarningsData(referralEarningsHistory);
      setChartData(processedData);
    }
  }, [referralEarningsHistory]);

  const processEarningsData = (earnings: any[]) => {
    // Group by day
    const earningsByDay = earnings.reduce((acc: any, earning: any) => {
      const date = format(new Date(earning.timestamp), 'yyyy-MM-dd');
      
      if (!acc[date]) {
        acc[date] = 0;
      }
      
      acc[date] += parseFloat(earning.amount);
      return acc;
    }, {});
    
    // Convert to array for chart
    return Object.entries(earningsByDay)
      .map(([date, value]) => ({
        date,
        amount: value
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const handleWithdrawEarnings = async () => {
    await withdrawEarnings();
  };

  if (loadingStats) {
    return (
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader>
          <Skeleton className="h-7 w-1/3" />
          <Skeleton className="h-5 w-2/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="border border-gray-700 bg-bitaccess-black lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-bitaccess-gold" />
            Referral Earnings History
          </CardTitle>
          <CardDescription>
            Track your referral commission earnings over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date"
                  stroke="#666"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#666"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    borderColor: '#333',
                    color: '#fff',
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)} USDT`, 'Earnings']}
                  labelFormatter={(label) => format(new Date(label), 'MMM dd, yyyy')}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#d4af37"
                  fill="url(#colorEarnings)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No earnings data available yet
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="border border-gray-700 bg-bitaccess-black h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-bitaccess-gold" />
            Available Earnings
          </CardTitle>
          <CardDescription>
            Withdraw your referral earnings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-bitaccess-black-light rounded-lg p-4 mb-4">
            <div className="text-gray-400 text-sm mb-1">Available for withdrawal</div>
            <div className="text-3xl font-bold text-white">
              ${parseFloat(membershipStats?.availableEarnings || "0").toFixed(2)}
              <span className="text-gray-400 text-sm ml-2">USDT</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total earnings:</span>
              <span className="text-white">${parseFloat(membershipStats?.referralEarnings || "0").toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Direct referrals earnings:</span>
              <span className="text-white">
                ${parseFloat(referralEarningsHistory
                  .filter(e => e.level === 1)
                  .reduce((sum, e) => sum + parseFloat(e.amount), 0)
                  .toString()).toFixed(2)} USDT
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Indirect referrals earnings:</span>
              <span className="text-white">
                ${parseFloat(referralEarningsHistory
                  .filter(e => e.level > 1)
                  .reduce((sum, e) => sum + parseFloat(e.amount), 0)
                  .toString()).toFixed(2)} USDT
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleWithdrawEarnings}
            disabled={isLoading || !parseFloat(membershipStats?.availableEarnings || "0")} 
            className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black flex items-center gap-2"
          >
            Withdraw Earnings
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="border border-gray-700 bg-bitaccess-black lg:col-span-3">
        <CardHeader>
          <CardTitle>Recent Earnings</CardTitle>
          <CardDescription>
            Your latest referral commissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Referred User</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Level</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {referralEarningsHistory.length > 0 ? (
                  referralEarningsHistory
                    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                    .slice(0, 5)
                    .map((earning, i) => (
                      <tr key={i} className="border-b border-gray-700/50 hover:bg-bitaccess-black-light/50">
                        <td className="py-3 px-4 text-gray-300">
                          {format(new Date(earning.timestamp), 'MMM dd, yyyy')}
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {`${earning.user.substring(0, 6)}...${earning.user.substring(earning.user.length - 4)}`}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            earning.level === 1 
                              ? "bg-green-900/30 text-green-400"
                              : earning.level === 2
                                ? "bg-blue-900/30 text-blue-400" 
                                : "bg-purple-900/30 text-purple-400"
                          }`}>
                            Level {earning.level}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-bitaccess-gold">
                          +${parseFloat(earning.amount).toFixed(2)} USDT
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-500">
                      No earnings recorded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardEarnings;
