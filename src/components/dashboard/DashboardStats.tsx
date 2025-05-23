
import React from "react";
import { useMembership, MembershipType } from "@/contexts/MembershipContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Calendar, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardStats = () => {
  const { membershipData, membershipStats, isLoading, loadingStats } = useMembership();

  if (isLoading || loadingStats) {
    return (
      <>
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
      </>
    );
  }

  const membershipType = !membershipData?.isActive 
    ? "No Membership" 
    : membershipData.type === MembershipType.Regular 
      ? "Regular Member" 
      : "Merchant";

  const referralCount = membershipData?.referrals?.length || 0;
  
  const daysLeft = membershipData?.isActive 
    ? Math.ceil((membershipData.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <>
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-400">Membership Type</CardTitle>
          <Award className="h-5 w-5 text-bitaccess-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{membershipType}</div>
          <p className="text-sm text-muted-foreground mt-1">
            {membershipData?.isActive 
              ? "Your membership is active" 
              : "Subscribe to activate membership"}
          </p>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-400">Your Referrals</CardTitle>
          <Users className="h-5 w-5 text-bitaccess-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{referralCount}</div>
          <p className="text-sm text-muted-foreground mt-1">
            {referralCount === 0 
              ? "Invite users to earn rewards" 
              : referralCount === 1 
                ? "1 user has joined through you" 
                : `${referralCount} users have joined through you`}
          </p>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-400">Available Earnings</CardTitle>
          <DollarSign className="h-5 w-5 text-bitaccess-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            ${parseFloat(membershipStats?.availableEarnings || "0").toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {parseFloat(membershipStats?.availableEarnings || "0") > 0
              ? "Ready to withdraw to your wallet"
              : "Refer users to earn commissions"}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardStats;
