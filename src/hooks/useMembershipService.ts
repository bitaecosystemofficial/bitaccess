
import { useState } from "react";
import { MembershipType } from "@/contexts/MembershipContext";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { membershipService } from "@/services/MembershipService";
import { switchNetwork } from "@/utils/blockchainUtils";
import { useQueryClient } from "@tanstack/react-query";

export const useMembershipService = () => {
  const { isConnected, address } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const queryClient = useQueryClient();

  // Subscribe to membership
  const subscribe = async (type: MembershipType, referrer?: string): Promise<boolean> => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to subscribe",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      setIsLoading(true);
      
      // First ensure we're on BSC Network
      const networkSwitched = await switchNetwork();
      if (!networkSwitched) {
        toast({
          title: "Network Error",
          description: "Please switch to Binance Smart Chain",
          variant: "destructive",
        });
        return false;
      }
      
      // Invalidate any queries that might depend on membership status
      queryClient.invalidateQueries();
      
      toast({
        title: "Subscription Successful",
        description: `You are now a ${type} member!`,
      });
      
      return true;
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Subscription Error",
        description: "An error occurred during subscription",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Claim membership rewards
  const claimRewards = async (): Promise<boolean> => {
    if (!isConnected) {
      return false;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, this would call a contract to claim rewards
      // For now, we'll simulate claiming rewards with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Rewards Claimed",
        description: "Your membership rewards have been sent to your wallet",
      });
      
      return true;
    } catch (error) {
      console.error("Error claiming rewards:", error);
      toast({
        title: "Claim Error",
        description: "Failed to claim rewards",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Withdraw earnings
  const withdrawEarnings = async (): Promise<boolean> => {
    if (!isConnected) {
      return false;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, this would call a contract to withdraw earnings
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Withdrawal Successful",
        description: "Your earnings have been sent to your wallet",
      });
      
      return true;
    } catch (error) {
      console.error("Error withdrawing earnings:", error);
      toast({
        title: "Withdrawal Error",
        description: "Failed to withdraw earnings",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loadingStats,
    setIsLoading,
    setLoadingStats,
    subscribe,
    claimRewards,
    withdrawEarnings
  };
};

export default useMembershipService;
