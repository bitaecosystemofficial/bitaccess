
export interface ContractResult {
  success: boolean;
  hash?: string;
  error?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  enrolledStudents: number;
  modules: {
    title: string;
    description: string;
  }[];
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  votes: number;
  status: 'active' | 'completed' | 'failed';
  endTime: number;
}

export interface SocialActivity {
  id: string;
  type: 'share' | 'engage' | 'create';
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

export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingRewards: number;
}
