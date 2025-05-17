
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, AlertCircle, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useStaking } from "@/hooks/useStaking";

interface UnstakeFormProps {
  isConnected: boolean;
  connectWallet: () => Promise<void>;
}

const UnstakeForm = ({ isConnected, connectWallet }: UnstakeFormProps) => {
  const { stakingData, unstakeTokens } = useStaking();
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if early withdrawal penalty applies
  const earlyWithdrawal = useMemo(() => {
    return stakingData.hasActiveStake && stakingData.timeRemaining > 0;
  }, [stakingData]);

  // Calculate potential penalty
  const potentialPenalty = useMemo(() => {
    if (!earlyWithdrawal || !unstakeAmount || parseFloat(unstakeAmount) <= 0) return 0;
    return (parseFloat(unstakeAmount) * stakingData.earlyWithdrawalFee) / 100;
  }, [earlyWithdrawal, unstakeAmount, stakingData.earlyWithdrawalFee]);

  // Calculate actual amount received after penalty
  const amountAfterPenalty = useMemo(() => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) return 0;
    return parseFloat(unstakeAmount) - potentialPenalty;
  }, [unstakeAmount, potentialPenalty]);

  const handleUnstake = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount to unstake.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(unstakeAmount) > parseFloat(stakingData.stakedBalance)) {
      toast({
        title: "Error",
        description: "Amount exceeds your staked balance.",
        variant: "destructive",
      });
      return;
    }

    // Confirm if early withdrawal
    if (earlyWithdrawal) {
      if (!confirm(`Warning: You will be charged a ${stakingData.earlyWithdrawalFee}% early withdrawal fee (${potentialPenalty.toFixed(2)} BIT). You will receive ${amountAfterPenalty.toFixed(2)} BIT. Do you want to proceed?`)) {
        return;
      }
    }

    setIsLoading(true);
    try {
      await unstakeTokens(unstakeAmount);
      setUnstakeAmount("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-bitaccess-black p-5 border border-bitaccess-gold/20">
      <CardContent className="space-y-5 p-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-white font-medium">Available to Unstake</h3>
            <p className="text-xl font-bold text-bitaccess-gold">
              {parseFloat(stakingData.stakedBalance).toFixed(4)} BIT
            </p>
          </div>
          <div className="bg-bitaccess-gold/10 p-3 rounded-full">
            <Shield className="h-6 w-6 text-bitaccess-gold" />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="unstake-amount" className="text-white font-medium">
            Amount to Unstake
          </label>
          <Input
            id="unstake-amount"
            type="number"
            placeholder="Enter amount"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
            className="bg-bitaccess-black-light border-bitaccess-gold/20 text-white focus:border-bitaccess-gold"
          />
          {stakingData.hasActiveStake && (
            <Button 
              variant="outline"
              onClick={() => setUnstakeAmount(stakingData.stakedBalance)} 
              className="mt-1 text-xs border-bitaccess-gold/30 text-bitaccess-gold hover:bg-bitaccess-gold/10"
            >
              Max
            </Button>
          )}
        </div>

        {earlyWithdrawal && (
          <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/20 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                <span className="text-red-400 font-medium">Early Withdrawal Warning</span>: 
                Unstaking before your lock period ends will incur a {stakingData.earlyWithdrawalFee}% penalty.
              </p>
              
              {parseFloat(unstakeAmount) > 0 && (
                <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="text-gray-400">Penalty:</div>
                  <div className="text-red-400 font-medium">{potentialPenalty.toFixed(4)} BIT</div>
                  
                  <div className="text-gray-400">You will receive:</div>
                  <div className="text-white font-medium">{amountAfterPenalty.toFixed(4)} BIT</div>
                </div>
              )}
            </div>
          </div>
        )}

        {stakingData.timeRemaining > 0 && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-bitaccess-black-light">
            <div className="flex items-center text-gray-400">
              <Clock className="h-5 w-5 mr-2 text-bitaccess-gold" />
              <span>Time until fee-free withdrawal</span>
            </div>
            <span className="text-white font-medium">
              {Math.floor(stakingData.timeRemaining / 86400)}d {Math.floor((stakingData.timeRemaining % 86400) / 3600)}h
            </span>
          </div>
        )}

        <Button
          onClick={handleUnstake}
          disabled={isLoading || !stakingData.hasActiveStake}
          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black font-medium h-12"
        >
          {isLoading ? "Processing..." : "Unstake BIT Tokens"}
        </Button>

        {!stakingData.hasActiveStake && (
          <p className="text-center text-sm text-gray-400">
            You don't have any tokens staked
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default UnstakeForm;
