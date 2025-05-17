
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TrendingUp, Shield, Clock, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useStaking, TierInfo } from "@/hooks/useStaking";
import { StakingTier } from "@/services/StakingService";
import { ethers } from "ethers";

interface StakeFormProps {
  isConnected: boolean;
  connectWallet: () => Promise<void>;
}

const StakeForm = ({ isConnected, connectWallet }: StakeFormProps) => {
  const { stakingData, stakeTokens, isLoading } = useStaking();
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedTier, setSelectedTier] = useState<StakingTier>(StakingTier.TIER_120DAYS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minStakeAmount = useMemo(() => {
    return stakingData?.minStakeAmount || "100";
  }, [stakingData]);

  const renderTierOption = (tier: StakingTier, info: TierInfo) => {
    const isSelected = selectedTier === tier;
    
    return (
      <div 
        key={tier}
        onClick={() => setSelectedTier(tier)}
        className={`p-4 rounded-lg cursor-pointer border transition-all ${
          isSelected 
            ? "border-bitaccess-gold bg-bitaccess-gold/10" 
            : "border-bitaccess-gold/20 hover:border-bitaccess-gold/50"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-white">{info.displayName}</h4>
          <div className="h-5 w-5 rounded-full border border-bitaccess-gold flex items-center justify-center">
            {isSelected && <div className="h-3 w-3 bg-bitaccess-gold rounded-full"></div>}
          </div>
        </div>
        <div className="text-xl font-bold text-bitaccess-gold">{info.apy}% APY</div>
      </div>
    );
  };

  const handleStake = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount to stake.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(stakeAmount) < parseFloat(minStakeAmount)) {
      toast({
        title: "Error",
        description: `Minimum stake amount is ${minStakeAmount} BIT`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await stakeTokens(stakeAmount, selectedTier);
      setStakeAmount("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-bitaccess-black p-5 border border-bitaccess-gold/20">
      <CardContent className="space-y-5 p-0">
        <div className="flex flex-col space-y-1">
          <label htmlFor="stake-amount" className="text-white font-medium">
            Amount to Stake
          </label>
          <Input
            id="stake-amount"
            type="number"
            placeholder={`Minimum ${minStakeAmount} BIT`}
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="bg-bitaccess-black-light border-bitaccess-gold/20 text-white focus:border-bitaccess-gold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-white font-medium">
            Lock Duration
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {stakingData && Object.entries(stakingData.tiers).map(([tier, info]) => 
              renderTierOption(Number(tier) as StakingTier, info)
            )}
          </div>
        </div>
        
        {/* Staking info summary */}
        <div className="bg-bitaccess-black-light p-4 rounded-lg border border-bitaccess-gold/10 space-y-3">
          <div className="flex justify-between">
            <div className="flex items-center text-gray-400">
              <Shield className="h-4 w-4 mr-2 text-bitaccess-gold" />
              <span>Selected APY</span>
            </div>
            <span className="text-white font-medium">
              {stakingData?.tiers[selectedTier]?.apy}%
            </span>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center text-gray-400">
              <Clock className="h-4 w-4 mr-2 text-bitaccess-gold" />
              <span>Lock Period</span>
            </div>
            <span className="text-white font-medium">
              {stakingData?.tiers[selectedTier]?.durationInDays} Days
            </span>
          </div>
          
          {parseFloat(stakeAmount) > 0 && (
            <div className="flex justify-between">
              <div className="flex items-center text-gray-400">
                <TrendingUp className="h-4 w-4 mr-2 text-bitaccess-gold" />
                <span>Est. Annual Yield</span>
              </div>
              <span className="text-white font-medium">
                {(parseFloat(stakeAmount) * stakingData?.tiers[selectedTier]?.apy / 100).toFixed(2)} BIT
              </span>
            </div>
          )}
        </div>

        {/* Early withdrawal warning */}
        <div className="flex items-start p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/20">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-gray-300">
            Early withdrawals before the lock period ends incur a {stakingData?.earlyWithdrawalFee}% penalty fee.
          </p>
        </div>

        <Button
          onClick={handleStake}
          disabled={isSubmitting || isLoading}
          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black font-medium h-12"
        >
          {isSubmitting ? "Processing..." : "Stake BIT Tokens"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default StakeForm;
