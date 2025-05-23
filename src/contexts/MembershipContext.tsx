
import React, { createContext, useContext } from "react";
import { useMembershipService } from "@/hooks/useMembershipService";
import { useMembershipData, MembershipData, MembershipStats } from "@/hooks/useMembershipData";

export enum MembershipType {
  Regular = "Regular",
  Merchant = "Merchant"
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
  // Use our custom hooks to manage membership functionality
  const { 
    isLoading, 
    loadingStats, 
    subscribe,
    claimRewards, 
    withdrawEarnings 
  } = useMembershipService();

  const {
    membershipData,
    membershipStats,
    referralEarningsHistory,
    getReferrals,
    getReferralsByLevel
  } = useMembershipData();

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
