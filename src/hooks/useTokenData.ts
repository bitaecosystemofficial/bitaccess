
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { tokenService } from '@/services/TokenService';
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
    contractAddress: '',
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
        if (!isConnected) {
          setIsLoading(false);
          return;
        }
        
        setIsLoading(true);
        
        // Get token details from contract
        const tokenDetails = await tokenService.getTokenDetails();
        
        // Get user balance if wallet is connected
        let userBalance = "0";
        if (address) {
          const balance = await tokenService.getBalance(address);
          userBalance = ethers.utils.formatUnits(balance, tokenDetails.decimals);
        }
        
        setTokenData({
          name: tokenDetails.name || "BIT ACCESS",
          symbol: tokenDetails.symbol || "BIT",
          contractAddress: tokenService.contractAddress || '',
          network: "Binance Smart Chain (BSC)",
          decimal: tokenDetails.decimals || 9,
          standard: "BEP20",
          marketSupply: "100,000,000,000",
          totalSupply: "100,000,000,000",
          buyTax: "3%",
          sellTax: "3%",
          balance: userBalance,
          price: metrics.price,
        });
        
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
