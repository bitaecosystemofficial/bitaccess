
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { claimAirdrop } from "@/utils/airdrop/airdropHooks";

const AirdropClaim = () => {
  const { isConnected, connectWallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await claimAirdrop();
      if (result.success) {
        toast({
          title: "Airdrop Claimed",
          description: "You have successfully claimed your BIT tokens!"
        });
      } else {
        toast({
          title: "Claim Failed",
          description: result.error || "Transaction failed. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center mt-8">
      <Button 
        onClick={handleClaim}
        disabled={isLoading}
        size="lg" 
        className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
      >
        {isLoading ? 'Processing...' : isConnected ? 'Claim Airdrop' : 'Connect Wallet to Participate'}
      </Button>
    </div>
  );
};

export default AirdropClaim;
