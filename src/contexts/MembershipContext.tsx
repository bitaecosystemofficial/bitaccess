
import React, { createContext, useContext, useState, useEffect } from "react";
import { useWallet } from "./WalletContext";
import { toast } from "@/hooks/use-toast";
import { ethers } from "ethers";
import { contractAddresses } from "@/constants/contracts";

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

interface MembershipContextType {
  membershipData: MembershipData | null;
  isLoading: boolean;
  subscribe: (type: MembershipType, referrer?: string) => Promise<boolean>;
  claimRewards: () => Promise<boolean>;
  getReferrals: () => Promise<string[]>;
  refreshMembership: () => Promise<void>;
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
  isLoading: false,
  subscribe: async () => false,
  claimRewards: async () => false,
  getReferrals: async () => [],
  refreshMembership: async () => {}
});

interface MembershipProviderProps {
  children: React.ReactNode;
}

const MEMBERSHIP_ABI = [
  "function subscribe(uint8 mType, address referrer) external",
  "function claimRewards() external",
  "function getUserSubscription(address user) external view returns (tuple(uint8 mType, uint256 startDate, uint256 endDate, address referrer, bool claimedRewards))",
  "function getUserReferrals(address user) external view returns (address[])",
  "function isSubscribed(address user) external view returns (bool)"
];

const MEMBERSHIP_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"; // Replace with actual contract

export function MembershipProvider({ children }: MembershipProviderProps) {
  const { isConnected, address, signer, provider } = useWallet();
  const [membershipData, setMembershipData] = useState<MembershipData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const getMembershipContract = () => {
    if (!signer) throw new Error("Wallet not connected");
    return new ethers.Contract(MEMBERSHIP_CONTRACT_ADDRESS, MEMBERSHIP_ABI, signer);
  };

  const subscribe = async (type: MembershipType, referrer: string = ethers.constants.AddressZero): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const contract = getMembershipContract();
      const tx = await contract.subscribe(type, referrer);
      await tx.wait();
      
      toast({
        title: "Subscription Successful",
        description: `You have successfully subscribed to the ${type === MembershipType.Regular ? "Regular" : "Merchant"} membership!`,
      });
      
      refreshMembership();
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
      
      const contract = getMembershipContract();
      const tx = await contract.claimRewards();
      await tx.wait();
      
      toast({
        title: "Rewards Claimed",
        description: "You have successfully claimed your membership rewards!",
      });
      
      refreshMembership();
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

  const getReferrals = async (): Promise<string[]> => {
    try {
      if (!isConnected || !address) return [];
      
      const contract = getMembershipContract();
      const referrals = await contract.getUserReferrals(address);
      return referrals;
    } catch (error) {
      console.error("Error getting referrals:", error);
      return [];
    }
  };

  const refreshMembership = async (): Promise<void> => {
    if (!isConnected || !address || !provider) {
      setMembershipData(null);
      return;
    }

    try {
      setIsLoading(true);
      const contract = getMembershipContract();
      
      const isActive = await contract.isSubscribed(address);
      if (!isActive) {
        setMembershipData({
          ...defaultMembershipData,
          isActive: false
        });
        return;
      }
      
      const subscription = await contract.getUserSubscription(address);
      const referrals = await contract.getUserReferrals(address);
      
      setMembershipData({
        type: subscription.mType,
        startDate: new Date(subscription.startDate.toNumber() * 1000),
        endDate: new Date(subscription.endDate.toNumber() * 1000),
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

  useEffect(() => {
    refreshMembership();
  }, [isConnected, address]);

  return (
    <MembershipContext.Provider 
      value={{ 
        membershipData, 
        isLoading, 
        subscribe, 
        claimRewards, 
        getReferrals,
        refreshMembership
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
}

export const useMembership = () => useContext(MembershipContext);
