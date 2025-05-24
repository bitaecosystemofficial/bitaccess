
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import { useTokenData } from "@/hooks/useTokenData";
import { useStaking } from "@/hooks/useStaking";
import { Wallet, CreditCard, Gift, TrendingUp, Calendar, Coins } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const { isConnected, balance, isMembershipActivated } = useWallet();
  const { membershipData } = useMembership();
  const { tokenData } = useTokenData();
  const { stakingData } = useStaking();

  if (!isConnected) {
    return null;
  }

  // Mock balances - in a real app, these would come from blockchain queries
  const mockBalances = {
    dcash: "1,250.75",
    bnb: "2.45",
    usdt: "850.20"
  };

  // Mock airdrop data
  const mockAirdropData = {
    claimed: false,
    claimAmount: "500.00",
    eligibleAmount: "500.00"
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 bg-gold-gradient text-transparent bg-clip-text">
        Dashboard Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Token Balances */}
        <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Token Balances</CardTitle>
            <Wallet className="h-4 w-4 text-bitaccess-gold" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">DCASH</span>
                <span className="text-sm font-semibold text-white">{mockBalances.dcash}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">BNB</span>
                <span className="text-sm font-semibold text-white">{mockBalances.bnb}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">USDT</span>
                <span className="text-sm font-semibold text-white">{mockBalances.usdt}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">BIT</span>
                <span className="text-sm font-semibold text-white">{parseFloat(tokenData.balance).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Membership Status */}
        <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Membership Status</CardTitle>
            <CreditCard className="h-4 w-4 text-bitaccess-gold" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Status</span>
                <Badge variant={isMembershipActivated ? "default" : "destructive"} className={isMembershipActivated ? "bg-green-600" : ""}>
                  {isMembershipActivated ? "Active" : "Inactive"}
                </Badge>
              </div>
              {membershipData && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Type</span>
                    <span className="text-sm font-semibold text-white">{membershipData.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Level</span>
                    <span className="text-sm font-semibold text-white">{membershipData.level}</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Merchant Subscription */}
        <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Merchant Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-bitaccess-gold" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Subscription</span>
                <Badge variant={membershipData?.type === "Merchant" ? "default" : "secondary"} 
                       className={membershipData?.type === "Merchant" ? "bg-green-600" : ""}>
                  {membershipData?.type === "Merchant" ? "Active" : "Inactive"}
                </Badge>
              </div>
              {membershipData?.type === "Merchant" && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Plan</span>
                  <span className="text-sm font-semibold text-white">Premium</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Card Expiration */}
        <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Card Expiration</CardTitle>
            <Calendar className="h-4 w-4 text-bitaccess-gold" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {membershipData ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Expires</span>
                    <span className="text-sm font-semibold text-white">
                      {format(membershipData.endDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Days Left</span>
                    <span className="text-sm font-semibold text-white">
                      {Math.max(0, Math.ceil((membershipData.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-400">No active membership</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Airdrop Status */}
        <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Airdrop Status</CardTitle>
            <Gift className="h-4 w-4 text-bitaccess-gold" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Claim Status</span>
                <Badge variant={mockAirdropData.claimed ? "default" : "secondary"} 
                       className={mockAirdropData.claimed ? "bg-green-600" : "bg-yellow-600"}>
                  {mockAirdropData.claimed ? "Claimed" : "Pending"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Amount</span>
                <span className="text-sm font-semibold text-white">
                  {mockAirdropData.claimed ? mockAirdropData.claimAmount : mockAirdropData.eligibleAmount} BIT
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Staking Status */}
        <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Staking Status</CardTitle>
            <Coins className="h-4 w-4 text-bitaccess-gold" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Status</span>
                <Badge variant={stakingData.hasActiveStake ? "default" : "secondary"} 
                       className={stakingData.hasActiveStake ? "bg-green-600" : ""}>
                  {stakingData.hasActiveStake ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Staked</span>
                <span className="text-sm font-semibold text-white">
                  {parseFloat(stakingData.stakedBalance).toFixed(2)} BIT
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Rewards</span>
                <span className="text-sm font-semibold text-white">
                  {parseFloat(stakingData.rewards).toFixed(2)} BIT
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
