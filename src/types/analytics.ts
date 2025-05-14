
export interface TokenMetrics {
  price: number;
  priceChange24h: number;
  priceChange7d: number;
  volume24h: number;
  marketCap: number;
  athPrice?: number;
  athDate?: Date;
  atlPrice?: number;
  atlDate?: Date;
  fullyDilutedValuation?: number;
}

export interface TokenHolderData {
  address: string;
  balance: string;
  percentage: number;
}

export interface TokenTransactionFilter {
  type?: 'all' | 'buys' | 'sells' | 'transfers';
  minAmount?: number;
  maxAmount?: number;
  fromDate?: Date;
  toDate?: Date;
  address?: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  volume?: number;
}
