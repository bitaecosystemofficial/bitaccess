
import { useState, useEffect } from 'react';
import { ContractResult } from '@/types/contracts';
import { merchantService } from '@/services/MerchantService';
import { contractAddresses } from '@/constants/contracts';
import { ethers } from 'ethers';

export const useMerchantData = () => {
  const [merchantData, setMerchantData] = useState({
    totalMerchants: 385,
    activeMerchants: 312,
    categories: [
      { name: "Retail", count: 124 },
      { name: "Services", count: 96 },
      { name: "Food & Dining", count: 67 },
      { name: "Travel", count: 25 }
    ],
    plans: [
      {
        name: "Basic",
        price: "99",
        description: "Perfect for small businesses new to crypto",
        features: [
          "Accept BIT Token payments",
          "Basic customer analytics",
          "Email support",
          "Transaction dashboard",
          "Basic API access"
        ]
      },
      {
        name: "Premium",
        price: "299",
        description: "For established businesses seeking growth",
        features: [
          "All Basic features",
          "Priority transaction processing",
          "Advanced analytics and reports",
          "Priority customer support",
          "Custom integration assistance",
          "Marketing promotion in ecosystem"
        ],
        highlighted: true
      },
      {
        name: "Enterprise",
        price: "599",
        description: "Comprehensive solution for large businesses",
        features: [
          "All Premium features",
          "Dedicated account manager",
          "Custom development solutions",
          "Branded payment portal",
          "Advanced API capabilities",
          "Exclusive networking events",
          "Strategic partnership opportunities"
        ]
      }
    ]
  });

  useEffect(() => {
    // Fetch merchant data from the blockchain
    const fetchMerchantData = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          console.log("Fetching merchant data from contract:", contractAddresses.merchants);
          
          // This will be replaced with actual contract calls in a production environment
          // For demo purposes, we're using simulated data
          const merchantContract = await merchantService.getMerchantContract();
          
          // In a real implementation, you would call contract methods like:
          // const totalMerchants = await merchantContract.getTotalMerchants();
          // const activeMerchants = await merchantContract.getActiveMerchants();
          
          setMerchantData(prev => ({
            ...prev,
            totalMerchants: prev.totalMerchants + Math.floor(Math.random() * 2),
            activeMerchants: Math.min(prev.activeMerchants + Math.floor(Math.random() * 2), prev.totalMerchants + Math.floor(Math.random() * 2))
          }));
        }
      } catch (error) {
        console.error("Error fetching merchant data:", error);
      }
    };

    fetchMerchantData();
    const interval = setInterval(fetchMerchantData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return merchantData;
};

export const subscribeMerchant = async (
  plan: string, 
  duration: number, 
  walletAddress: string,
  paymentToken: 'BIT' | 'USDT' = 'BIT'
): Promise<ContractResult> => {
  try {
    console.log("Subscribing merchant plan:", plan, "for address:", walletAddress, "using token:", paymentToken);
    
    const result = await merchantService.payWithToken(plan, duration, paymentToken);
    return result;
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
