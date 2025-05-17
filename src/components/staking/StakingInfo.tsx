
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Award, Clock, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useStaking } from "@/hooks/useStaking";
import { formatDistanceToNow } from "date-fns";
import { useWallet } from "@/contexts/WalletContext";
import TokenStatCard from "@/components/ui/token-stat-card";

const StakingInfo = () => {
  const { stakingData, isLoading, claimRewards } = useStaking();
  const { isConnected } = useWallet();

  // Format unlock time
  const formatUnlockTime = () => {
    if (!stakingData.hasActiveStake) return "No active stake";
    
    if (stakingData.timeRemaining <= 0) {
      return "Unlocked";
    }
    
    const days = Math.floor(stakingData.timeRemaining / 86400);
    const hours = Math.floor((stakingData.timeRemaining % 86400) / 3600);
    const minutes = Math.floor((stakingData.timeRemaining % 3600) / 60);
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Calculate unlock percentage
  const calculateUnlockProgress = () => {
    if (!stakingData.hasActiveStake || stakingData.lockPeriod === 0) return 0;
    const elapsed = stakingData.lockPeriod - stakingData.timeRemaining;
    return Math.min(100, Math.round((elapsed / stakingData.lockPeriod) * 100));
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-pulse">
        <div className="h-32 bg-bitaccess-black-light rounded-lg"></div>
        <div className="h-32 bg-bitaccess-black-light rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-6">
      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TokenStatCard
          title="Your Staking APY"
          value={`${stakingData.apy}%`}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        
        <TokenStatCard
          title="Your Rewards"
          value={`${parseFloat(stakingData.rewards).toFixed(4)} BIT`}
          icon={<Award className="h-6 w-6" />}
        />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-bitaccess-black p-4 border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-bitaccess-gold" />
              <h4 className="font-medium text-white">Amount Staked</h4>
            </div>
            <p className="text-2xl font-bold text-bitaccess-gold">
              {parseFloat(stakingData.stakedBalance).toFixed(2)} BIT
            </p>
            {stakingData.hasActiveStake && (
              <p className="text-sm text-gray-400 mt-1">
                {stakingData.tiers[stakingData.currentTier].displayName} lock period
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-bitaccess-black p-4 border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-bitaccess-gold" />
              <h4 className="font-medium text-white">Total Protocol TVL</h4>
            </div>
            <p className="text-2xl font-bold text-bitaccess-gold">
              {parseFloat(stakingData.totalStaked).toLocaleString()} BIT
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Minimum stake: {stakingData.minStakeAmount} BIT
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-bitaccess-black p-4 border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-bitaccess-gold" />
              <h4 className="font-medium text-white">Unlock Time</h4>
            </div>
            <p className="text-2xl font-bold text-bitaccess-gold">
              {formatUnlockTime()}
            </p>
            {stakingData.hasActiveStake && (
              <div className="mt-2">
                <Progress value={calculateUnlockProgress()} className="h-2 bg-gray-700" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Rewards claim section */}
      {stakingData.hasActiveStake && parseFloat(stakingData.rewards) > 0 && (
        <Card className="bg-bitaccess-black-light p-5 border border-bitaccess-gold/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Available Rewards
              </h3>
              <p className="text-xl font-bold text-bitaccess-gold">
                {parseFloat(stakingData.rewards).toFixed(4)} BIT
              </p>
            </div>
            <Button
              onClick={claimRewards}
              disabled={!isConnected || parseFloat(stakingData.rewards) <= 0}
              className="mt-4 md:mt-0 bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black font-medium px-8"
            >
              Claim Rewards
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default StakingInfo;
