
import { contractAddresses } from '@/constants/contracts';

export interface BonusTier {
  minAmount: number;
  bonusPercent: number;
}

export interface PresaleData {
  currentPhase: number;
  totalPhases: number;
  bnbRate: number;
  usdtRate: number;
  totalSupply: number;
  soldTokens: number;
  progress: number;
  softCap: number;
  hardCap: number;
  endTimeInSeconds: number;
  paymentMethods: {
    bnb: { rate: number; min: number; max: number };
    usdt: { rate: number; min: number; max: number };
  };
  bonusTiers: {
    bnb: BonusTier[];
    usdt: BonusTier[];
  };
  address: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
