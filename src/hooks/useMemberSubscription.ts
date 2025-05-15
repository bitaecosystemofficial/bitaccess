
import { useState } from "react";
import { useMembership, MembershipType } from "@/contexts/MembershipContext";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { switchNetwork } from "@/utils/blockchainUtils";

export type SubscriptionPlan = 'Membership' | 'Merchant';

interface SubscribeResult {
  success: boolean;
  error?: string;
}

export const useMemberSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { address, isConnected, connectWallet } = useWallet();
  const { subscribe } = useMembership();

  const subscribeToMembership = async (
    plan: SubscriptionPlan, 
    referrer?: string
  ): Promise<SubscribeResult> => {
    setIsProcessing(true);
    
    try {
      if (!isConnected) {
        await connectWallet();
        // Check if we're connected after trying to connect
        if (!isConnected) {
          return {
            success: false,
            error: "Failed to connect wallet"
          };
        }
      }
      
      // First ensure we're on BSC Network
      const networkSwitched = await switchNetwork();
      if (!networkSwitched) {
        return {
          success: false,
          error: "Please switch to BSC network"
        };
      }
      
      const membershipType = 
        plan === 'Merchant' 
          ? MembershipType.Merchant 
          : MembershipType.Regular;
      
      toast({
        title: "Processing Subscription",
        description: `Subscribing to ${plan} for 365 days...`,
      });
      
      const success = await subscribe(membershipType, referrer);
      
      if (success) {
        return {
          success: true
        };
      } else {
        return {
          success: false,
          error: "Subscription failed"
        };
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      
      return {
        success: false,
        error: error.message || "An error occurred during subscription"
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    subscribeToMembership,
    isProcessing
  };
};
