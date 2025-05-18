
import React, { createContext, useContext, useState, useEffect } from "react";
import { useWallet } from "./WalletContext";
import { toast } from "@/hooks/use-toast";
import { ethers } from "ethers";
import { membershipService, ReferralEarning } from "@/services/MembershipService";

export enum MembershipType {
  None = -1,
  Regular = 0,
  Merchant = 1
}

export interface MembershipData {
  type: MembershipType;
  startDate: Date;
  endDate: Date;
  referrer: string;
  claimedRewards: boolean;
  isActive: boolean;
  referrals: string[];
}

interface MembershipStats {
  totalDeposits: string;
  totalWithdrawals: string;
  totalSubscribers: number;
  activeSubscriptions: number;
  referralEarnings: string;
  availableEarnings: string;
}

interface MembershipContextType {
  membershipData: MembershipData | null;
  membershipStats: MembershipStats | null;
  isLoading: boolean;
  loadingStats: boolean;
  referralEarningsHistory: ReferralEarning[];
  subscribe: (type: MembershipType, referrer?: string) => Promise<boolean>;
  claimRewards: () => Promise<boolean>;
  withdrawEarnings: () => Promise<boolean>;
  getReferrals: () => Promise<string[]>;
  getReferralsByLevel: (level: number) => Promise<string[]>;
  refreshMembership: () => Promise<void>;
  refreshStats: () => Promise<void>;
  loadReferralEarningsHistory: () => Promise<void>;
}

const defaultMembershipData: MembershipData = {
  type: MembershipType.None,
  startDate: new Date(),
  endDate: new Date(),
  referrer: "",
  claimedRewards: false,
  isActive: false,
  referrals: []
};

const MembershipContext = createContext<MembershipContextType>({
  membershipData: defaultMembershipData,
  membershipStats: null,
  isLoading: false,
  loadingStats: false,
  referralEarningsHistory: [],
  subscribe: async () => false,
  claimRewards: async () => false,
  withdrawEarnings: async () => false,
  getReferrals: async () => [],
  getReferralsByLevel: async () => [],
  refreshMembership: async () => {},
  refreshStats: async () => {},
  loadReferralEarningsHistory: async () => {}
});

interface MembershipProviderProps {
  children: React.ReactNode;
}

export function MembershipProvider({ children }: MembershipProviderProps) {
  const { isConnected, address } = useWallet();
  const [membershipData, setMembershipData] = useState<MembershipData | null>(null);
  const [membershipStats, setMembershipStats] = useState<MembershipStats | null>(null);
  const [referralEarningsHistory, setReferralEarningsHistory] = useState<ReferralEarning[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStats, setLoadingStats] = useState<boolean>(false);

  const subscribe = async (type: MembershipType, referrer: string = ethers.constants.AddressZero): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      await membershipService.subscribe(type, referrer);
      
      toast({
        title: "Subscription Successful",
        description: `You have successfully subscribed to the ${type === MembershipType.Regular ? "Regular" : "Merchant"} membership!`,
      });
      
      await refreshMembership();
      await refreshStats();
      return true;
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: error.message || "An error occurred during subscription",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const claimRewards = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      await membershipService.withdrawAllRewards();
      
      toast({
        title: "Rewards Claimed",
        description: "You have successfully claimed your membership rewards!",
      });
      
      await refreshMembership();
      return true;
    } catch (error: any) {
      console.error("Claiming rewards error:", error);
      toast({
        title: "Claiming Failed",
        description: error.message || "An error occurred while claiming rewards",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawEarnings = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      await membershipService.withdrawEarnings();
      
      toast({
        title: "Earnings Withdrawn",
        description: "You have successfully withdrawn your referral earnings!",
      });
      
      await refreshStats();
      return true;
    } catch (error: any) {
      console.error("Withdrawing earnings error:", error);
      toast({
        title: "Withdrawal Failed",
        description: error.message || "An error occurred while withdrawing earnings",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getReferrals = async (): Promise<string[]> => {
    try {
      if (!isConnected || !address) return [];
      
      return await membershipService.getUserReferrals(address);
    } catch (error) {
      console.error("Error getting referrals:", error);
      return [];
    }
  };

  const getReferralsByLevel = async (level: number): Promise<string[]> => {
    try {
      if (!isConnected || !address) return [];
      
      return await membershipService.getReferralsByLevel(address, level);
    } catch (error) {
      console.error(`Error getting level ${level} referrals:`, error);
      return [];
    }
  };

  const loadReferralEarningsHistory = async (): Promise<void> => {
    if (!isConnected || !address) {
      setReferralEarningsHistory([]);
      return;
    }

    try {
      const history = await membershipService.getReferralEarningsHistory(address);
      setReferralEarningsHistory(history);
    } catch (error) {
      console.error("Error loading referral earnings history:", error);
    }
  };

  const refreshMembership = async (): Promise<void> => {
    if (!isConnected || !address) {
      setMembershipData(null);
      return;
    }

    try {
      setIsLoading(true);
      
      const isActive = await membershipService.isSubscribed(address);
      if (!isActive) {
        setMembershipData({
          ...defaultMembershipData,
          isActive: false
        });
        return;
      }
      
      const subscription = await membershipService.getUserSubscription(address);
      const referrals = await membershipService.getUserReferrals(address);
      
      setMembershipData({
        type: subscription.mType,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        referrer: subscription.referrer,
        claimedRewards: subscription.claimedRewards,
        isActive,
        referrals
      });
    } catch (error) {
      console.error("Error refreshing membership:", error);
      setMembershipData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshStats = async (): Promise<void> => {
    if (!isConnected || !address) {
      setMembershipStats(null);
      return;
    }

    try {
      setLoadingStats(true);
      
      const stats = await membershipService.getTotalStats();
      const referralEarnings = await membershipService.getReferralEarnings(address);
      const availableEarnings = await membershipService.getAvailableEarnings(address);
      
      setMembershipStats({
        totalDeposits: stats.deposits,
        totalWithdrawals: stats.withdrawals,
        totalSubscribers: stats.subscribers,
        activeSubscriptions: stats.activeSubscriptions,
        referralEarnings,
        availableEarnings
      });
    } catch (error) {
      console.error("Error refreshing stats:", error);
      setMembershipStats(null);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      refreshMembership();
      refreshStats();
      loadReferralEarningsHistory();

      // Subscribe to membership events
      const setupEventListeners = async () => {
        try {
          await membershipService.subscribeToMembershipEvents((event) => {
            console.log('Membership event:', event);
            
            // Refresh data when events occur
            if (event.args.user?.toLowerCase() === address?.toLowerCase() || 
                event.args.referrer?.toLowerCase() === address?.toLowerCase()) {
              refreshMembership();
              refreshStats();
              loadReferralEarningsHistory();
              
              if (event.event === "RewardsClaimed") {
                toast({
                  title: "Rewards Claimed",
                  description: `Rewards have been claimed!`
                });
              } else if (event.event === "ReferralEarned") {
                toast({
                  title: "Referral Bonus Earned",
                  description: `You earned ${event.args.amount} USDT from a level ${event.args.level} referral`
                });
              } else if (event.event === "EarningsWithdrawn") {
                toast({
                  title: "Earnings Withdrawn",
                  description: `${event.args.amount} USDT has been withdrawn to your wallet`
                });
              }
            }
          });
        } catch (error) {
          console.error('Error setting up event listeners:', error);
        }
      };
      
      setupEventListeners();
    } else {
      setMembershipData(null);
      setMembershipStats(null);
      setReferralEarningsHistory([]);
    }
    
    return () => {
      membershipService.cleanup();
    };
  }, [isConnected, address]);

  return (
    <MembershipContext.Provider 
      value={{ 
        membershipData, 
        membershipStats,
        isLoading, 
        loadingStats,
        referralEarningsHistory,
        subscribe, 
        claimRewards,
        withdrawEarnings,
        getReferrals,
        getReferralsByLevel,
        refreshMembership,
        refreshStats,
        loadReferralEarningsHistory
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
}

export const useMembership = () => useContext(MembershipContext);
