
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { claimAirdrop } from "@/utils/airdrop/airdropHooks";
import { Coins } from "lucide-react";

interface AirdropClaimProps {
  eligibilityPercentage: number;
  isAllTasksCompleted: boolean;
}

const AirdropClaim = ({ eligibilityPercentage, isAllTasksCompleted }: AirdropClaimProps) => {
  const { isConnected, connectWallet, address } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClaim = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    // Check if all tasks are completed
    if (!isAllTasksCompleted) {
      toast({
        title: "Not Eligible",
        description: "You need to complete all required tasks first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await claimAirdrop();
      
      if (result.success) {
        toast({
          title: "Airdrop Claimed",
          description: `You have successfully claimed your BIT tokens! Transaction hash: ${result.hash.substring(0, 6)}...${result.hash.substring(result.hash.length - 4)}`
        });
      } else {
        toast({
          title: "Claim Failed",
          description: result.error || "Transaction failed. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error claiming airdrop:", error);
      toast({
        title: "Claim Failed",
        description: error instanceof Error ? error.message : "Transaction failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-bitaccess-black-light to-bitaccess-black rounded-xl border border-bitaccess-gold/20">
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="bg-bitaccess-gold/10 p-3 rounded-full mr-4">
            <Coins className="h-6 w-6 text-bitaccess-gold" />
          </div>
          <div>
            <h4 className="font-medium text-white">Claim Your Tokens</h4>
            <p className="text-sm text-gray-400">Complete all tasks to become eligible</p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-400">Eligibility</span>
            <span className="text-sm text-bitaccess-gold">{eligibilityPercentage}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-bitaccess-gold h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${eligibilityPercentage}%` }}
            />
          </div>
        </div>
        
        <Button 
          onClick={handleClaim}
          disabled={isLoading || !isConnected || !isAllTasksCompleted}
          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
        >
          {isLoading ? 'Processing...' : !isConnected ? 'Connect Wallet' : 
           isAllTasksCompleted ? 'Claim BIT Tokens' : 'Complete All Tasks First'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AirdropClaim;
