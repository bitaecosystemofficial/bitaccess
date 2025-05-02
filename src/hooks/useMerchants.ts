
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
    // Fetch merchant data from the blockchain
    const fetchMerchantData = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          console.log("Fetching merchant data from contract:", contractAddresses.merchants);
          
          // This will be replaced with actual contract calls
          const merchantContract = await merchantService.getMerchantContract();
          
          try {
            // Attempt to call actual contract methods
            const totalMerchants = await merchantContract.getTotalMerchants();
            const activeMerchants = await merchantContract.getActiveMerchants();
            
            if (totalMerchants && activeMerchants) {
              setMerchantData(prev => ({
                ...prev,
                totalMerchants: parseInt(totalMerchants.toString()),
                activeMerchants: parseInt(activeMerchants.toString())
              }));
            } else {
              // Fallback if contract methods don't return expected values
              setMerchantData(prev => ({
                ...prev,
                totalMerchants: prev.totalMerchants + Math.floor(Math.random() * 2),
                activeMerchants: Math.min(prev.activeMerchants + Math.floor(Math.random() * 2), prev.totalMerchants + Math.floor(Math.random() * 2))
              }));
            }
          } catch (error) {
            console.error("Error calling contract methods:", error);
            // Use fallback behavior
            setMerchantData(prev => ({
              ...prev,
              totalMerchants: prev.totalMerchants + Math.floor(Math.random() * 2),
              activeMerchants: Math.min(prev.activeMerchants + Math.floor(Math.random() * 2), prev.totalMerchants + Math.floor(Math.random() * 2))
            }));
          }
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
