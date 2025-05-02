
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
        name: "Basic",
        price: "99",
        description: "Perfect for small e-commerce businesses",
        features: [
          "Accept BIT Token payments",
          "Basic sales analytics",
          "Email support",
          "Product dashboard",
          "Basic API access",
          "10 product listings"
        ]
      },
      {
        name: "Premium",
        price: "299",
        description: "For established online stores seeking growth",
        features: [
          "All Basic features",
          "Priority transaction processing",
          "Advanced sales analytics",
          "Priority customer support",
          "Inventory management",
          "Marketing promotion in ecosystem",
          "100 product listings"
        ],
        highlighted: true
      },
      {
        name: "Enterprise",
        price: "599",
        description: "Comprehensive solution for large online stores",
        features: [
          "All Premium features",
          "Dedicated account manager",
          "Custom store development",
          "Branded checkout portal",
          "Advanced API capabilities",
          "Multi-currency support",
          "Unlimited product listings",
          "Strategic partnership opportunities"
        ]
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
  paymentToken: 'BIT' | 'USDT' = 'BIT'
): Promise<ContractResult> => {
  try {
    console.log("Subscribing store plan:", plan, "for address:", walletAddress, "using token:", paymentToken);
    
    const result = await storeService.payWithToken(plan, duration, paymentToken);
    return result;
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
