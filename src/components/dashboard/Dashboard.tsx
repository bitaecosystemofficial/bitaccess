
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import { useTokenData } from "@/hooks/useTokenData";
import { useStaking } from "@/hooks/useStaking";
import { Wallet, CreditCard, Gift, TrendingUp, Calendar, Coins, DollarSign, ShoppingCart, Star, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { isConnected, balance, isMembershipActivated } = useWallet();
  const { membershipData, withdrawEarnings } = useMembership();
  const { tokenData } = useTokenData();
  const { stakingData } = useStaking();

  if (!isConnected) {
    return null;
  }

  // Mock balances - in a real app, these would come from BSC blockchain queries
  const mockBalances = {
    bnb: "2.45",
    usdt: "850.20"
  };

  // Mock airdrop data
  const mockAirdropData = {
    claimed: false,
    claimAmount: "500.00",
    eligibleAmount: "500.00"
  };

  const handleWithdrawEarnings = async () => {
    try {
      const success = await withdrawEarnings();
      if (success) {
        toast({
          title: "Withdrawal Initiated",
          description: "Your earnings withdrawal has been processed successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Failed to process withdrawal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBuyUSDT = () => {
    window.open("https://pancakeswap.finance/swap?outputCurrency=0x55d398326f99059fF775485246999027B3197955", "_blank");
  };

  const handleBuyBIT = () => {
    window.open("https://pancakeswap.finance/swap?outputCurrency=" + tokenData.contractAddress, "_blank");
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

      {/* Action Cards Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-6 text-white">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Withdraw Earnings */}
          <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Withdraw Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-bitaccess-gold" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Available</span>
                  <span className="text-sm font-semibold text-white">
                    {membershipData?.earnings || "0.00"} BIT
                  </span>
                </div>
                <Button 
                  onClick={handleWithdrawEarnings}
                  className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                  disabled={!membershipData?.earnings || parseFloat(membershipData.earnings) <= 0}
                >
                  Withdraw Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Buy USDT */}
          <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Buy USDT</CardTitle>
              <ShoppingCart className="h-4 w-4 text-bitaccess-gold" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-300">
                  Get USDT tokens for cross-border payments and trading
                </p>
                <Button 
                  onClick={handleBuyUSDT}
                  className="w-full bg-transparent border border-bitaccess-gold hover:bg-bitaccess-gold/10 text-bitaccess-gold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buy on PancakeSwap
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Buy BIT Token */}
          <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Buy BIT Token</CardTitle>
              <Coins className="h-4 w-4 text-bitaccess-gold" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-300">
                  Increase your BIT holdings for staking and governance
                </p>
                <Button 
                  onClick={handleBuyBIT}
                  className="w-full bg-transparent border border-bitaccess-gold hover:bg-bitaccess-gold/10 text-bitaccess-gold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buy BIT Token
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-colors md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Recommendations</CardTitle>
              <Star className="h-4 w-4 text-bitaccess-gold" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs text-gray-400">Based on your membership:</p>
                   <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Stake BIT tokens for rewards</li>
                    <li>• Refer friends to earn commissions</li>
                    <li>• Participate in governance voting</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Governance */}
          <Card className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Governance</CardTitle>
              <TrendingUp className="h-4 w-4 text-bitaccess-gold" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-300">
                  Participate in community governance and voting
                </p>
                <Button 
                  onClick={() => window.location.href = '/governance'}
                  className="w-full bg-transparent border border-bitaccess-gold hover:bg-bitaccess-gold/10 text-bitaccess-gold"
                >
                  View Proposals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
