
import { useState, useEffect } from 'react';
import { presaleService } from '@/services/PresaleService';
import { useWallet } from '@/contexts/WalletContext';
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { PresaleData, BonusTier } from './types';

export const usePresaleData = () => {
  const { isConnected } = useWallet();
  const [presaleData, setPresaleData] = useState<PresaleData>({
    currentPhase: 1,
    totalPhases: 3,
    bnbRate: 0,
    usdtRate: 0,
    totalSupply: 5000000,
    soldTokens: 0,
    progress: 0,
    softCap: 0,
    hardCap: 0,
    endTimeInSeconds: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    paymentMethods: {
      bnb: { rate: 0, min: 0.1, max: 50 },
      usdt: { rate: 0, min: 100, max: 25000 }
    },
    bonusTiers: {
      bnb: [],
      usdt: []
    },
    address: contractAddresses.presale
  });

  useEffect(() => {
    const fetchPresaleData = async () => {
      if (!isConnected) return;

      try {
        const info = await presaleService.getPresaleInfo();
        const bonusInfo = await presaleService.getBonusTiers();
        
        // Format BNB rate - convert from wei to ether
        const bnbRateInEther = parseFloat(ethers.utils.formatEther(info.bnbRate));
        // Format USDT rate - assuming 18 decimals
        const usdtRateInUsd = parseFloat(ethers.utils.formatUnits(info.usdtRate, 18));
        
        // Format bonus tiers
        const bnbTiers = bonusInfo.bnbTiers.map(tier => ({
          minAmount: parseFloat(ethers.utils.formatEther(tier.minAmount)),
          bonusPercent: tier.bonusPercent.toNumber()
        }));
        
        const usdtTiers = bonusInfo.usdtTiers.map(tier => ({
          minAmount: parseFloat(ethers.utils.formatUnits(tier.minAmount, 18)),
          bonusPercent: tier.bonusPercent.toNumber()
        }));

        // Calculate progress
        const soldTokensFormatted = parseFloat(ethers.utils.formatUnits(info.soldTokens, 6)); // Assuming 6 decimals for BIT token
        const totalSupplyFormatted = parseFloat(ethers.utils.formatUnits(info.totalSupply, 6));
        const progress = Math.round((soldTokensFormatted / totalSupplyFormatted) * 100);

        setPresaleData(prev => ({
          ...prev,
          currentPhase: info.phase.toNumber(),
          bnbRate: bnbRateInEther,
          usdtRate: usdtRateInUsd,
          totalSupply: totalSupplyFormatted,
          soldTokens: soldTokensFormatted,
          progress: progress,
          softCap: parseFloat(ethers.utils.formatUnits(info.softCap, 6)),
          hardCap: parseFloat(ethers.utils.formatUnits(info.hardCap, 6)),
          endTimeInSeconds: info.endTime.toNumber(),
          paymentMethods: {
            bnb: { 
              rate: bnbRateInEther, 
              min: 0.1, 
              max: 50 
            },
            usdt: { 
              rate: usdtRateInUsd, 
              min: 100, 
              max: 25000 
            }
          },
          bonusTiers: {
            bnb: bnbTiers,
            usdt: usdtTiers
          }
        }));
      } catch (error) {
        console.error("Error fetching presale data:", error);
      }
    };

    fetchPresaleData();
    const interval = setInterval(fetchPresaleData, 30000);
    return () => clearInterval(interval);
  }, [isConnected]);

  return presaleData;
};
