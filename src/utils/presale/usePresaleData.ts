
import { useState, useEffect } from 'react';
import { presaleService } from '@/services/PresaleService';
import { useWallet } from '@/contexts/WalletContext';
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { PresaleData, BonusTier } from './types';
import { CryptoCompareService } from '@/services/CryptoCompareService';

// Static presale configuration
const PRESALE_CONFIG = {
  currentPrice: 0.000108,
  targetPrice: 0.00030,
  totalSupply: 1000000000, // 1B BIT
  bonusPercent: 5
};

export const usePresaleData = (): PresaleData => {
  const { isConnected } = useWallet();
  const [bnbPrice, setBnbPrice] = useState(600);
  const [presaleData, setPresaleData] = useState<PresaleData>({
    currentPhase: 1,
    totalPhases: 3,
    bnbRate: PRESALE_CONFIG.currentPrice,
    usdtRate: PRESALE_CONFIG.currentPrice,
    totalSupply: PRESALE_CONFIG.totalSupply,
    soldTokens: 0,
    progress: 0,
    softCap: PRESALE_CONFIG.totalSupply * 0.3,
    hardCap: PRESALE_CONFIG.totalSupply,
    endTimeInSeconds: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    paymentMethods: {
      bnb: { rate: PRESALE_CONFIG.currentPrice, min: 0.1, max: 50 },
      usdt: { rate: PRESALE_CONFIG.currentPrice, min: 100, max: 25000 }
    },
    bonusTiers: {
      bnb: [{ minAmount: 0.1, bonusPercent: PRESALE_CONFIG.bonusPercent }],
      usdt: [{ minAmount: 100, bonusPercent: PRESALE_CONFIG.bonusPercent }]
    },
    address: contractAddresses.presale,
    bnbPrice: 600
  });

  useEffect(() => {
    const fetchBnbPrice = async () => {
      const price = await CryptoCompareService.getBNBPrice();
      setPresaleData(prev => ({ ...prev, bnbPrice: price }));
    };

    fetchBnbPrice();
    const interval = setInterval(fetchBnbPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return presaleData;
};
