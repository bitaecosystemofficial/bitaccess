
import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useTokenMetrics } from './useTokenMetrics';

export interface TokenData {
  name: string;
  symbol: string;
  contractAddress: string;
  network: string;
  decimal: number;
  standard: string;
  marketSupply: string;
  totalSupply: string;
  buyTax: string;
  sellTax: string;
  balance: string;
  price: number;
}

export const useTokenData = () => {
  const { address, isConnected } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "BIT ACCESS",
    symbol: "BIT",
    contractAddress: '0xd3bde17ebd27739cf5505cd58ecf31cb628e469c',
    network: "Binance Smart Chain (BSC)",
    decimal: 9,
    standard: "BEP20",
    marketSupply: "100,000,000,000",
    totalSupply: "100,000,000,000",
    buyTax: "3%",
    sellTax: "3%",
    balance: "0",
    price: 0.00000275,
  });
  
  const { metrics } = useTokenMetrics();

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setIsLoading(true);
        
        // Since we removed the TokenService, we'll use static data
        // and only update with wallet balance if needed
        setTokenData(prev => ({
          ...prev,
          balance: isConnected && address ? "0" : "0", // Would need to implement balance fetching
          price: metrics.price,
        }));
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching token data:", error);
        setIsLoading(false);
      }
    };

    fetchTokenData();
  }, [address, isConnected, metrics.price]);

  return {
    tokenData,
    isLoading,
  };
};
