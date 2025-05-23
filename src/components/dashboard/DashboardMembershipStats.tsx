
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DashboardMembershipStats = () => {
  // This would typically come from a hook or context
  const membershipStats = {
    totalMembers: 12485,
    activeMembers: 8742,
    averageStaking: "5680 BIT",
    growthRate: "+12.4%"
  };

  return (
    <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg mb-8">
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold text-white">Global Membership Statistics</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-400">Total Members</p>
            <p className="text-2xl font-bold text-white">{membershipStats.totalMembers.toLocaleString()}</p>
            <Progress value={70} className="mt-2 bg-bitaccess-black h-2" indicatorClassName="bg-bitaccess-gold" />
          </div>
          
          <div>
            <p className="text-sm text-gray-400">Active Members</p>
            <p className="text-2xl font-bold text-white">{membershipStats.activeMembers.toLocaleString()}</p>
            <Progress value={70} className="mt-2 bg-bitaccess-black h-2" indicatorClassName="bg-blue-500" />
          </div>
          
          <div>
            <p className="text-sm text-gray-400">Average Staking</p>
            <p className="text-2xl font-bold text-white">{membershipStats.averageStaking}</p>
            <Progress value={55} className="mt-2 bg-bitaccess-black h-2" indicatorClassName="bg-green-500" />
          </div>
          
          <div>
            <p className="text-sm text-gray-400">Monthly Growth Rate</p>
            <p className="text-2xl font-bold text-green-500">{membershipStats.growthRate}</p>
            <Progress value={62} className="mt-2 bg-bitaccess-black h-2" indicatorClassName="bg-green-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMembershipStats;
