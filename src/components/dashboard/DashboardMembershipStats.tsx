
import React from "react";
import { useMembership } from "@/contexts/MembershipContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Users, BarChart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardMembershipStats = () => {
  const { membershipStats, loadingStats } = useMembership();

  if (loadingStats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-gray-700 bg-bitaccess-black">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-4 w-full mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!membershipStats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-400">Total Subscribers</CardTitle>
          <Users className="h-5 w-5 text-bitaccess-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {membershipStats.totalSubscribers.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            <span className="text-green-500">{membershipStats.activeSubscriptions.toLocaleString()}</span> active subscriptions
          </p>
        </CardContent>
      </Card>

      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-400">Platform Volume</CardTitle>
          <BarChart className="h-5 w-5 text-bitaccess-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            ${parseFloat(membershipStats.totalDeposits).toLocaleString()} USDT
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Total subscription payments
          </p>
        </CardContent>
      </Card>

      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-400">Your Referral Earnings</CardTitle>
          <Wallet className="h-5 w-5 text-bitaccess-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            ${parseFloat(membershipStats.referralEarnings).toLocaleString()} USDT
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            From direct and indirect referrals
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMembershipStats;
