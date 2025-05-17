
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, TrendingUp } from "lucide-react";
import { useStaking } from "@/hooks/useStaking";
import { StakingTier } from "@/services/StakingService";

const StakingTiers = () => {
  const { stakingData, isLoading } = useStaking();
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-10 bg-bitaccess-black-light rounded w-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-40 bg-bitaccess-black-light rounded-lg"></div>
          <div className="h-40 bg-bitaccess-black-light rounded-lg"></div>
          <div className="h-40 bg-bitaccess-black-light rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Staking Tiers</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(stakingData.tiers).map(([tierKey, tierInfo]) => {
          const tier = Number(tierKey) as StakingTier;
          
          return (
            <Card 
              key={tierKey} 
              className={`bg-gradient-to-br from-bitaccess-black to-bitaccess-black-light border border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all duration-300`}
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-bold text-white">
                    {tierInfo.displayName}
                  </h4>
                  <Shield className="h-6 w-6 text-bitaccess-gold" />
                </div>
                
                <div className="text-3xl font-bold text-bitaccess-gold">
                  {tierInfo.apy}% <span className="text-lg">APY</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5" />
                      Lock Period:
                    </div>
                    <span className="text-white font-medium">
                      {tierInfo.durationInDays} Days
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-400">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1.5" />
                      Early Fee:
                    </div>
                    <span className="text-white font-medium">
                      {stakingData.earlyWithdrawalFee}%
                    </span>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-bitaccess-gold/10">
                  <p className="text-xs text-gray-400">
                    Stake your BIT tokens for {tierInfo.durationInDays} days to earn {tierInfo.apy}% APY. Early withdrawal will incur a {stakingData.earlyWithdrawalFee}% penalty fee.
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StakingTiers;
