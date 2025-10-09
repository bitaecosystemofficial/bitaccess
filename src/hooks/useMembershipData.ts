
import { useState, useEffect } from 'react';
import { useWallet } from "@/contexts/WalletContext";
import { MembershipType } from "@/contexts/MembershipContext";
import { toast } from "@/hooks/use-toast";
import { useMembershipService } from "./useMembershipService";
import { membershipService } from "@/services/MembershipService";
import { ethers } from "ethers";

export interface MembershipData {
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
  claimedRewardsArray: any[]; 
  referralEarnings: number;
  stakingEarnings: number;
  hasClaimedRewards: boolean; 
}

export interface MembershipStats {
  totalSubscribers: number;
  activeSubscriptions: number;
  totalDeposits: string;
  totalWithdrawals: string;
  referralEarnings: string;
  availableEarnings: string;
}

export const useMembershipData = () => {
  const { isConnected, address } = useWallet();
  const { isLoading, setIsLoading } = useMembershipService();
  const [membershipData, setMembershipData] = useState<MembershipData | null>(null);
  const [membershipStats, setMembershipStats] = useState<MembershipStats | null>(null);
  const [referralEarningsHistory, setReferralEarningsHistory] = useState<any[]>([]);

  // Load membership data when wallet connects
  useEffect(() => {
    const loadMembershipData = async () => {
      if (!isConnected || !address) {
        setMembershipData(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch real membership data from contract
        try {
          const subscription = await membershipService.getUserSubscription(address);
          
          // Check if user has an active subscription
          const now = Math.floor(Date.now() / 1000);
          const endDateNum = Number(subscription.endDate);
          const startDateNum = Number(subscription.startDate);
          const isActive = endDateNum > now;
          
          // Get available earnings
          const contract = await membershipService.getMembershipContract(false);
          const availableEarnings = await contract.getAvailableEarnings(address);
          
          const membershipData: MembershipData = {
            isActive: isActive,
            type: subscription.mType === 0 ? MembershipType.Regular : MembershipType.Merchant,
            startDate: new Date(startDateNum * 1000).toISOString(),
            expiryDate: new Date(endDateNum * 1000).toISOString(),
            endDate: new Date(endDateNum * 1000),
            status: isActive ? "Active" : "Inactive",
            level: subscription.mType === 0 ? "Regular" : "Merchant",
            hasClaimedRewards: subscription.claimedRewards || false,
            referrals: [],
            rewards: 0,
            earnings: ethers.utils.formatEther(availableEarnings || "0"),
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
          
          setMembershipData(membershipData);
        } catch (error) {
          // If contract call fails, set to inactive
          const defaultData: MembershipData = {
            isActive: false,
            type: MembershipType.Regular,
            startDate: new Date().toISOString(),
            expiryDate: new Date().toISOString(),
            endDate: new Date(),
            status: "Inactive",
            level: "Regular",
            hasClaimedRewards: false,
            referrals: [],
            rewards: 0,
            earnings: "0",
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
          setMembershipData(defaultData);
        }
        
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

  // Load membership statistics
  const loadMembershipStats = async () => {
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

  return {
    membershipData,
    membershipStats,
    referralEarningsHistory,
    getReferrals,
    getReferralsByLevel
  };
};
