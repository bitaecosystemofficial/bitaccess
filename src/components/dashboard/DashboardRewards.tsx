
import React from "react";
import { useMembership, MembershipType } from "@/contexts/MembershipContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gift } from "lucide-react";

const DashboardRewards = () => {
  const { membershipData, isLoading, claimRewards } = useMembership();

  if (!membershipData?.isActive) {
    return (
      <Card className="border border-gray-700 bg-bitaccess-black">
        <CardHeader>
          <CardTitle>Membership Rewards</CardTitle>
          <CardDescription>
            Subscribe to a membership plan to receive rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            Each membership comes with token rewards that you can claim once your subscription is active
          </p>
        </CardContent>
      </Card>
    );
  }

  const rewardsData = membershipData.type === MembershipType.Regular ? {
    btcb: "$1 USDT worth of BTCB",
    usdt: "$1 USDT",
    bnb: "$1 USDT worth of BNB",
    bit: "$2 USDT worth of BIT"
  } : {
    btcb: "$1 USDT worth of BTCB",
    usdt: "$1 USDT",
    bnb: "$1 USDT worth of BNB",
    bit: "$10 USDT worth of BIT"
  };

  const handleClaimRewards = async () => {
    await claimRewards();
  };

  return (
    <Card className="border border-gray-700 bg-bitaccess-black">
      <CardHeader>
        <CardTitle>Membership Rewards</CardTitle>
        <CardDescription>
          {membershipData.claimedRewards 
            ? "You have already claimed your rewards" 
            : "Your membership rewards are ready to claim"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-bitaccess-black-light p-3 rounded-md">
              <div className="text-sm text-gray-400">BTCB Reward</div>
              <div className="text-lg font-medium text-white mt-1">{rewardsData.btcb}</div>
            </div>
            
            <div className="bg-bitaccess-black-light p-3 rounded-md">
              <div className="text-sm text-gray-400">USDT Reward</div>
              <div className="text-lg font-medium text-white mt-1">{rewardsData.usdt}</div>
            </div>
            
            <div className="bg-bitaccess-black-light p-3 rounded-md">
              <div className="text-sm text-gray-400">BNB Reward</div>
              <div className="text-lg font-medium text-white mt-1">{rewardsData.bnb}</div>
            </div>
            
            <div className="bg-bitaccess-black-light p-3 rounded-md">
              <div className="text-sm text-gray-400">BIT Token Reward</div>
              <div className="text-lg font-medium text-white mt-1">{rewardsData.bit}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {membershipData.claimedRewards ? (
          <Button disabled className="w-full gap-2">
            <CheckCircle className="h-4 w-4" />
            Rewards Already Claimed
          </Button>
        ) : (
          <Button 
            onClick={handleClaimRewards} 
            className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black gap-2"
          >
            <Gift className="h-4 w-4" />
            Claim Rewards
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DashboardRewards;
