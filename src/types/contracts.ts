
export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  enrolledStudents: number;
  modules?: {
    title: string;
    description: string;
  }[];
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  level: string;
  instructor: string;
  views: number;
  likes: number;
  requiresMembership: boolean;
  courseId: string;
}

export interface ContractResult {
  success: boolean;
  hash?: string;
  error?: string;
}

// Add missing types needed by useCommunity.ts
export interface SocialActivity {
  id: string;
  type: string;
  reward: number;
  description: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  reward: number;
  endTime: number;
  isActive: boolean;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  votes: number;
  status: string;
  endTime: number;
}

export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingRewards: number;
}
