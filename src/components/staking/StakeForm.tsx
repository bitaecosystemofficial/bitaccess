
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { stakingService } from "@/services/StakingService";

interface StakeFormProps {
  isConnected: boolean;
  connectWallet: () => Promise<void>;
}

const StakeForm = ({ isConnected, connectWallet }: StakeFormProps) => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("30");
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    try {
      await stakingService.stake(stakeAmount);
      toast({
        title: "Stake Successful",
        description: `You have successfully staked ${stakeAmount} BIT for ${selectedDuration} days.`,
      });
      setStakeAmount("");
    } catch (error) {
      toast({
        title: "Stake Failed",
        description: error instanceof Error ? error.message : "Transaction failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-bitaccess-black p-4 border border-bitaccess-gold/10">
      <CardContent className="space-y-4 p-0">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-bitaccess-gold" />
          <p className="text-sm text-gray-400">
            Earn up to 15% APY on your staked BIT tokens.
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">
            Amount to Stake
          </p>
          <Input
            type="number"
            placeholder="Enter amount"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="bg-bitaccess-black border-bitaccess-gold/20 text-white"
          />
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">
            Staking Duration
          </p>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className={`border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 ${
                selectedDuration === "30" ? "bg-bitaccess-gold/10" : ""
              }`}
              onClick={() => setSelectedDuration("30")}
            >
              30 Days
            </Button>
            <Button
              variant="outline"
              className={`border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 ${
                selectedDuration === "90" ? "bg-bitaccess-gold/10" : ""
              }`}
              onClick={() => setSelectedDuration("90")}
            >
              90 Days
            </Button>
            <Button
              variant="outline"
              className={`border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 ${
                selectedDuration === "180" ? "bg-bitaccess-gold/10" : ""
              }`}
              onClick={() => setSelectedDuration("180")}
            >
              180 Days
            </Button>
          </div>
        </div>

        <Button
          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
          onClick={handleStake}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Stake BIT"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default StakeForm;
