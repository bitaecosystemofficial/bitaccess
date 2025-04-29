
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { contractService } from "@/services/ContractService"; 

const AirdropClaim = () => {
  const { isConnected, connectWallet, address } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  
  const checkEligibility = async () => {
    if (!address) return false;
    
    setCheckingEligibility(true);
    try {
      const eligible = await contractService.checkAirdropEligibility(address);
      setIsEligible(eligible);
      return eligible;
    } catch (error) {
      console.error("Error checking eligibility:", error);
      // For demo purposes, assume eligible
      setIsEligible(true);
      return true;
    } finally {
      setCheckingEligibility(false);
    }
  };

  const handleClaim = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    // Check eligibility first
    const eligible = await checkEligibility();
    if (!eligible) {
      toast({
        title: "Not Eligible",
        description: "You are not eligible for the airdrop at this time. Complete all required tasks first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const tx = await contractService.claimAirdrop();
      toast({
        title: "Airdrop Claimed",
        description: `You have successfully claimed your BIT tokens! Transaction hash: ${tx.transactionHash.substring(0, 6)}...${tx.transactionHash.substring(tx.transactionHash.length - 4)}`
      });
    } catch (error) {
      console.error("Error claiming airdrop:", error);
      toast({
        title: "Claim Failed",
        description: error instanceof Error ? error.message : "Transaction failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center mt-8">
      {isEligible === false ? (
        <div className="mb-4 text-red-500">
          <p>You are not yet eligible for the airdrop. Please complete all required tasks.</p>
        </div>
      ) : null}
      
      <Button 
        onClick={handleClaim}
        disabled={isLoading || checkingEligibility || isEligible === false}
        size="lg" 
        className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
      >
        {isLoading ? 'Processing...' : 
         checkingEligibility ? 'Checking Eligibility...' : 
         !isConnected ? 'Connect Wallet to Participate' : 'Claim Airdrop'}
      </Button>
    </div>
  );
};

export default AirdropClaim;
