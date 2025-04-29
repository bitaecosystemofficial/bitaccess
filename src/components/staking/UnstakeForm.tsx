
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { stakingService } from "@/services/StakingService";

interface UnstakeFormProps {
  isConnected: boolean;
  connectWallet: () => Promise<void>;
}

const UnstakeForm = ({ isConnected, connectWallet }: UnstakeFormProps) => {
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    try {
      await stakingService.unstake(unstakeAmount);
      toast({
        title: "Unstake Successful",
        description: `You have successfully unstaked ${unstakeAmount} BIT.`,
      });
      setUnstakeAmount("");
    } catch (error) {
      toast({
        title: "Unstake Failed",
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
          <Clock className="h-4 w-4 text-bitaccess-gold" />
          <p className="text-sm text-gray-400">
            Unstake your BIT tokens at any time. A small fee may apply.
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">
            Amount to Unstake
          </p>
          <Input
            type="number"
            placeholder="Enter amount"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
            className="bg-bitaccess-black border-bitaccess-gold/20 text-white"
          />
        </div>

        <Button
          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
          onClick={handleUnstake}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Unstake BIT"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UnstakeForm;
