
import { useState, useEffect } from 'react';
import { SocialActivity, Promotion, Proposal, ReferralStats, ContractResult } from '@/types/contracts';
import { mockTransaction } from '@/utils/blockchainUtils';

export const useCommunityData = () => {
  const [communityData, setCommunityData] = useState({
    socialActivities: [
      {
        id: "share-1",
        type: "share",
        reward: 5,
        description: "Share our platform on Twitter"
      },
      {
        id: "engage-1",
        type: "engage",
        reward: 10,
        description: "Participate in community discussions"
      },
      {
        id: "create-1",
        type: "create",
        reward: 20,
        description: "Create educational content"
      }
    ],
    proposals: [
      {
        id: "prop-1",
        title: "New Reward Structure",
        description: "Implement tiered rewards for community participation",
        votes: 156,
        status: 'active',
        endTime: Date.now() + 7 * 24 * 60 * 60 * 1000
      }
    ],
    promotions: [
      {
        id: "promo-1",
        title: "Early Bird Bonus",
        description: "Get 2x rewards for all activities this week",
        reward: 2,
        endTime: Date.now() + 3 * 24 * 60 * 60 * 1000,
        isActive: true
      }
    ],
    referralStats: {
      totalReferrals: 245,
      activeReferrals: 178,
      totalEarnings: 12500,
      pendingRewards: 450
    }
  });

  return communityData;
};

export const participateInActivity = async (
  activityId: string,
  walletAddress: string
): Promise<ContractResult> => {
  try {
    const hash = await mockTransaction();
    return { success: true, hash };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export const voteOnProposal = async (
  proposalId: string,
  walletAddress: string
): Promise<ContractResult> => {
  try {
    const hash = await mockTransaction();
    return { success: true, hash };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export const claimPromotionReward = async (
  promotionId: string,
  walletAddress: string
): Promise<ContractResult> => {
  try {
    const hash = await mockTransaction();
    return { success: true, hash };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export const getReferralLink = (walletAddress: string): string => {
  return `https://example.com/ref/${walletAddress}`;
};
