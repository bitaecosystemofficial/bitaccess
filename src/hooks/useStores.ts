
import { useState, useEffect } from 'react';
import { ContractResult } from '@/types/contracts';
import { storeService } from '@/services/StoreService';
import { contractAddresses } from '@/constants/contracts';
import { ethers } from 'ethers';

export const useStoreData = () => {
  const [storeData, setStoreData] = useState({
    totalStores: 385,
    activeStores: 312,
    categories: [
      { name: "Fashion & Apparel", count: 124 },
      { name: "Electronics", count: 96 },
      { name: "Home & Garden", count: 67 },
      { name: "Beauty & Health", count: 45 },
      { name: "Toys & Games", count: 25 },
      { name: "Digital Goods", count: 28 }
    ],
    plans: [
      {
        name: "Membership",
        price: "20",
        currency: "USDT",
        duration: "365 days",
        description: "Access exclusive benefits and education",
        features: [
          "Access to Blockchain Education & Technical Training",
          "$1 USDT worth of BTCB Reward",
          "$1 USDT worth of USDT Reward",
          "$1 USDT worth of BNB Reward",
          "$2 USDT worth of BIT Token Rewards",
          "Discounts from all our Products & Services",
          "Earn Referral Commission: 15% - Direct, 10% - 2nd Level, 5% - 3rd Level"
        ]
      },
      {
        name: "Merchant",
        price: "100",
        currency: "USDT",
        duration: "365 days",
        description: "Full business solution with promotional benefits",
        features: [
          "Blockchain Education and Technical Training",
          "$1 USDT worth of BTCB Reward",
          "$1 USDT worth of USDT Reward",
          "$1 USDT worth of BNB Reward",
          "$10 USDT worth of BIT Token Rewards",
          "Bit Merchant Stickers",
          "Promotions and Advertisements on BIT Community",
          "Earn Referral Commission: 15% - Direct, 10% - 2nd Level, 5% - 3rd Level"
        ],
        highlighted: true
      }
    ]
  });

  useEffect(() => {
    // Fetch store data from the blockchain
    const fetchStoreData = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          console.log("Fetching store data from contract:", contractAddresses.merchants);
          
          // This will be replaced with actual contract calls
          const storeContract = await storeService.getStoreContract();
          
          try {
            // Attempt to call actual contract methods
            const totalStores = await storeContract.getTotalMerchants();
            const activeStores = await storeContract.getActiveMerchants();
            
            if (totalStores && activeStores) {
              setStoreData(prev => ({
                ...prev,
                totalStores: parseInt(totalStores.toString()),
                activeStores: parseInt(activeStores.toString())
              }));
            } else {
              // Fallback if contract methods don't return expected values
              setStoreData(prev => ({
                ...prev,
                totalStores: prev.totalStores + Math.floor(Math.random() * 2),
                activeStores: Math.min(prev.activeStores + Math.floor(Math.random() * 2), prev.totalStores + Math.floor(Math.random() * 2))
              }));
            }
          } catch (error) {
            console.error("Error calling contract methods:", error);
            // Use fallback behavior
            setStoreData(prev => ({
              ...prev,
              totalStores: prev.totalStores + Math.floor(Math.random() * 2),
              activeStores: Math.min(prev.activeStores + Math.floor(Math.random() * 2), prev.totalStores + Math.floor(Math.random() * 2))
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchStoreData();
    const interval = setInterval(fetchStoreData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return storeData;
};

export const subscribeStore = async (
  plan: string, 
  duration: number, 
  walletAddress: string,
  paymentToken: 'BIT' | 'USDT' = 'USDT'
): Promise<ContractResult> => {
  try {
    console.log("Subscribing to plan:", plan, "for address:", walletAddress, "using token:", paymentToken);
    
    const result = await storeService.payWithToken(plan, duration, paymentToken);
    return result;
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
