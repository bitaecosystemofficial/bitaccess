
import React, { createContext, useContext, useState, useEffect } from "react";
import { useWallet } from "./WalletContext";
import { storeService } from "@/services/StoreService";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export enum MembershipType {
  Regular = "Regular",
  Merchant = "Merchant"
}

interface MembershipData {
  isActive: boolean;
  type: MembershipType;
  startDate: string;
  expiryDate: string;
  endDate: Date;
  status: string;
  level: string;
  rewards: number;
  earnings: string;
  referrals: string[];
  level2Referrals: number;
  level3Referrals: number;
  level4Referrals: number;
  level5Referrals: number;
  level6Referrals: number;
  level7Referrals: number;
  pendingRewards: any[];
  claimedRewardsArray: any[]; // Renamed to avoid duplicate identifier
  referralEarnings: number;
  stakingEarnings: number;
  hasClaimedRewards: boolean; // Renamed from claimedRewards to avoid duplicate
}

interface MembershipStats {
  totalSubscribers: number;
  activeSubscriptions: number;
  totalDeposits: string;
  totalWithdrawals: string;
  referralEarnings: string;
  availableEarnings: string;
}

interface MembershipContextType {
  membershipData: MembershipData | null;
  membershipStats: MembershipStats | null;
  isLoading: boolean;
  loadingStats: boolean;
  subscribe: (type: MembershipType, referrer?: string) => Promise<boolean>;
  claimRewards: () => Promise<boolean>;
  getReferrals: () => Promise<string[]>;
  getReferralsByLevel: (level: number) => Promise<string[]>;
  withdrawEarnings: () => Promise<boolean>;
  referralEarningsHistory: any[];
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined);

export const MembershipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isConnected, address } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [membershipData, setMembershipData] = useState<MembershipData | null>(null);
  const [membershipStats, setMembershipStats] = useState<MembershipStats | null>(null);
  const [referralEarningsHistory, setReferralEarningsHistory] = useState<any[]>([]);
  const queryClient = useQueryClient();

  // Simulate loading membership data when wallet connects
  useEffect(() => {
    const loadMembershipData = async () => {
      if (!isConnected || !address) {
        setMembershipData(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // This is mock data - in a real app, we would fetch this from a backend
        // For merchant functionality, we attempt to check if the user is a merchant
        const isMerchant = await checkMerchantStatus(address);
        
        // Set mock membership data or null if no active membership
        const mockMembership: MembershipData = {
          isActive: true,
          type: isMerchant ? MembershipType.Merchant : MembershipType.Regular,
          startDate: '2025-04-23',
          expiryDate: '2026-04-23',
          endDate: new Date('2026-04-23'), // Fixed to string-compatible date
          status: "Active",
          level: "Gold",
          hasClaimedRewards: false, // Renamed from claimedRewards
          referrals: ["0x123...456", "0x789...012", "0xABC...DEF"],
          rewards: 25,
          earnings: "120 BIT",
          level2Referrals: 5,
          level3Referrals: 3,
          level4Referrals: 2,
          level5Referrals: 1,
          level6Referrals: 0,
          level7Referrals: 0,
          pendingRewards: [
            {type: "Referral Bonus", description: "Level 1 Referral Reward", amount: 10},
            {type: "Activity Reward", description: "Daily Login Bonus", amount: 5}
          ],
          claimedRewardsArray: [ // Renamed from claimedRewards
            {type: "Welcome Bonus", claimedDate: "2025-05-01", amount: 50},
            {type: "Staking Reward", claimedDate: "2025-05-10", amount: 25}
          ],
          referralEarnings: 75,
          stakingEarnings: 45
        };
        
        setMembershipData(mockMembership);
        
        // Load membership stats
        await loadMembershipStats();
        
        // Load earnings history
        await loadEarningsHistory();
      } catch (error) {
        console.error("Error loading membership data:", error);
        toast({
          title: "Error",
          description: "Failed to load membership data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMembershipData();
  }, [isConnected, address]);
  
  // Check if the user is a merchant
  const checkMerchantStatus = async (userAddress: string): Promise<boolean> => {
    try {
      // In a real app, this would call a contract or API
      // For now, this is a mock that simulates a merchant check
      const status = await storeService.getStoreStatus(userAddress);
      return status > 0;
    } catch (error) {
      console.error("Error checking merchant status:", error);
      return false;
    }
  };
  
  // Load membership statistics
  const loadMembershipStats = async () => {
    setLoadingStats(true);
    try {
      // In a real app, this would fetch from a backend
      // For now, we'll use mock data
      const mockStats: MembershipStats = {
        totalSubscribers: 2345,
        activeSubscriptions: 1892,
        totalDeposits: "102500.00",
        totalWithdrawals: "67892.50",
        referralEarnings: "120.50",
        availableEarnings: "45.75"
      };
      
      setMembershipStats(mockStats);
    } catch (error) {
      console.error("Error loading membership stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };
  
  // Load earnings history
  const loadEarningsHistory = async () => {
    try {
      // Mock data for earnings history
      const mockEarningsHistory = [
        {
          user: "0x123...456",
          amount: "15.00",
          level: 1,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
          user: "0x789...012",
          amount: "10.00",
          level: 1,
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
          user: "0xABC...DEF",
          amount: "5.25",
          level: 2,
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        },
        {
          user: "0xGHI...JKL",
          amount: "2.50",
          level: 3,
          timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
        }
      ];
      
      setReferralEarningsHistory(mockEarningsHistory);
    } catch (error) {
      console.error("Error loading earnings history:", error);
    }
  };
  
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
      
      // In a real app, this would call a contract to purchase a subscription
      // For now, we'll simulate a successful subscription
      
      // For merchant subscription, we'll use the StoreService
      if (type === MembershipType.Merchant) {
        const duration = 180; // 6 months in days
        const planName = "Merchant";
        
        const result = await storeService.payWithToken(planName, duration, "USDT");
        
        if (!result.success) {
          toast({
            title: "Subscription Failed",
            description: result.error || "Transaction failed",
            variant: "destructive",
          });
          return false;
        }
      }
      
      // Set new membership data
      const newMembership: MembershipData = {
        isActive: true,
        type: type,
        startDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + (type === MembershipType.Merchant ? 180 : 365) * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + (type === MembershipType.Merchant ? 180 : 365) * 24 * 60 * 60 * 1000),
        hasClaimedRewards: false,
        referrals: membershipData?.referrals || [],
        status: "Active",
        level: "Bronze",
        rewards: 0,
        earnings: "0 BIT",
        level2Referrals: 0,
        level3Referrals: 0,
        level4Referrals: 0,
        level5Referrals: 0,
        level6Referrals: 0,
        level7Referrals: 0,
        pendingRewards: [],
        claimedRewardsArray: [],
        referralEarnings: 0,
        stakingEarnings: 0
      };
      
      setMembershipData(newMembership);
      
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
    if (!isConnected || !membershipData?.isActive) {
      return false;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, this would call a contract to claim rewards
      // For now, we'll simulate claiming rewards with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update membership data to show claimed rewards
      setMembershipData({
        ...membershipData,
        hasClaimedRewards: true // Updated from claimedRewards
      });
      
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
  
  // Get referrals
  const getReferrals = async (): Promise<string[]> => {
    if (!isConnected || !membershipData?.isActive) {
      return [];
    }
    
    // In a real app, this would fetch from a backend
    return membershipData.referrals;
  };
  
  // Get referrals by level
  const getReferralsByLevel = async (level: number): Promise<string[]> => {
    if (!isConnected || !membershipData?.isActive) {
      return [];
    }
    
    // Mock data for different levels
    const mockReferralsByLevel: Record<number, string[]> = {
      1: membershipData.referrals,
      2: ["0xDEF...456", "0xGHI...789"],
      3: ["0xJKL...012"],
      4: ["0xMNO...345", "0xPQR...678", "0xSTU...901"],
      5: ["0xVWX...234"],
      6: [],
      7: []
    };
    
    return mockReferralsByLevel[level] || [];
  };
  
  // Withdraw earnings
  const withdrawEarnings = async (): Promise<boolean> => {
    if (!isConnected || !membershipData?.isActive) {
      return false;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, this would call a contract to withdraw earnings
      // For now, we'll simulate a withdrawal with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update stats to show withdrawn earnings
      if (membershipStats) {
        setMembershipStats({
          ...membershipStats,
          availableEarnings: "0.00"
        });
      }
      
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

  return (
    <MembershipContext.Provider value={{ 
      membershipData, 
      membershipStats,
      isLoading, 
      loadingStats,
      subscribe,
      claimRewards,
      getReferrals,
      getReferralsByLevel,
      withdrawEarnings,
      referralEarningsHistory
    }}>
      {children}
    </MembershipContext.Provider>
  );
};

export const useMembership = (): MembershipContextType => {
  const context = useContext(MembershipContext);
  if (context === undefined) {
    throw new Error("useMembership must be used within a MembershipProvider");
  }
  return context;
};
