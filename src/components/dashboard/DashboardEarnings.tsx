
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMembership } from "@/contexts/MembershipContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ArrowUpRight, Download } from "lucide-react";

const DashboardEarnings = () => {
  const { membershipData } = useMembership();
  
  // Sample data for the chart
  const earningsData = [
    { month: 'Jan', amount: 120 },
    { month: 'Feb', amount: 180 },
    { month: 'Mar', amount: 150 },
    { month: 'Apr', amount: 210 },
    { month: 'May', amount: 290 },
    { month: 'Jun', amount: 320 },
  ];
  
  const transactions = [
    { date: '2025-05-20', type: 'Referral Bonus', amount: 45, status: 'Completed' },
    { date: '2025-05-18', type: 'Staking Reward', amount: 12, status: 'Completed' },
    { date: '2025-05-15', type: 'Membership Bonus', amount: 30, status: 'Completed' },
    { date: '2025-05-10', type: 'Referral Bonus', amount: 25, status: 'Completed' },
    { date: '2025-05-05', type: 'Staking Reward', amount: 8, status: 'Completed' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bitaccess-black p-2 border border-gray-800 text-white text-xs">
          <p>{`${label} : ${payload[0].value} BIT`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
          <CardContent className="p-6">
            <h4 className="text-gray-400 text-sm">Total Earnings</h4>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold text-white">{membershipData?.earnings || "0 BIT"}</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-green-500 text-sm">+12% from last month</span>
              <ArrowUpRight size={14} className="text-green-500 ml-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
          <CardContent className="p-6">
            <h4 className="text-gray-400 text-sm">Referral Earnings</h4>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold text-white">{membershipData?.referralEarnings || 0}</span>
              <span className="ml-2 text-xl text-white">BIT</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-green-500 text-sm">+8% from last month</span>
              <ArrowUpRight size={14} className="text-green-500 ml-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
          <CardContent className="p-6">
            <h4 className="text-gray-400 text-sm">Staking Rewards</h4>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold text-white">{membershipData?.stakingEarnings || 0}</span>
              <span className="ml-2 text-xl text-white">BIT</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-green-500 text-sm">+5% from last month</span>
              <ArrowUpRight size={14} className="text-green-500 ml-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold text-white">Earnings History</h3>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#d4af37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
          <Button variant="outline" className="text-bitaccess-gold border-bitaccess-gold hover:bg-bitaccess-gold hover:text-bitaccess-black">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4 text-right">Amount</th>
                  <th className="pb-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index} className="border-t border-gray-800 text-white">
                    <td className="py-4">{tx.date}</td>
                    <td className="py-4">{tx.type}</td>
                    <td className="py-4 text-right">{tx.amount} BIT</td>
                    <td className="py-4 text-right">
                      <span className="text-green-500">{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <Button variant="link" className="text-bitaccess-gold hover:text-bitaccess-gold/80 w-full mt-4">
            View All Transactions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardEarnings;
