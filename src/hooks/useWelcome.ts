
import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { welcomeService } from '@/services/ContractService';
import { toast } from '@/hooks/use-toast';

export const useWelcome = () => {
  const { address, isConnected } = useWallet();
  const [hasVisited, setHasVisited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has visited before
  useEffect(() => {
    const visited = localStorage.getItem('hasVisitedBitAccess');
    setHasVisited(!!visited);
  }, []);

  // Record welcome visit on blockchain
  const recordVisit = async () => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to record your visit.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await welcomeService.recordWelcomeVisit(address);
      
      toast({
        title: "Welcome Recorded",
        description: "Your visit has been recorded on the blockchain!",
      });
    } catch (error) {
      console.error("Error recording welcome visit:", error);
      toast({
        title: "Recording Failed",
        description: "Failed to record visit on blockchain.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mark as visited locally
  const markAsVisited = () => {
    localStorage.setItem('hasVisitedBitAccess', 'true');
    setHasVisited(true);
  };

  // Get affiliate link
  const getAffiliateLink = () => {
    return "https://bitaccess.io/affiliates";
  };

  return {
    hasVisited,
    isLoading,
    recordVisit,
    markAsVisited,
    getAffiliateLink,
  };
};
