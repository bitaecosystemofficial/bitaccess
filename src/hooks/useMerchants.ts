
import { useState, useEffect } from 'react';
import { ContractResult } from '@/types/contracts';
import { mockTransaction } from '@/utils/blockchainUtils';

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
    const interval = setInterval(() => {
      setMerchantData(prev => ({
        ...prev,
        totalMerchants: prev.totalMerchants + Math.floor(Math.random() * 2),
        activeMerchants: Math.min(prev.activeMerchants + Math.floor(Math.random() * 2), prev.totalMerchants + Math.floor(Math.random() * 2))
      }));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return merchantData;
};

export const subscribeMerchant = async (
  plan: string, 
  duration: number, 
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
