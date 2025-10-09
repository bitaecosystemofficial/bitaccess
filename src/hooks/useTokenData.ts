
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { tokenService } from '@/services/TokenService';
import { useWallet } from '@/contexts/WalletContext';

export interface TokenData {
  name: string;
  symbol: string;
  contractAddress: string;
  network: string;
  decimal: number;
  standard: string;
  marketSupply: string;
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
    buyTax: "3%",
    sellTax: "3%",
    balance: "0",
    price: 0.00000275,
  });

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
          marketSupply: ethers.utils.formatUnits(tokenDetails.totalSupply || 0, tokenDetails.decimals),
          buyTax: "3%", // Could be fetched from contract
          sellTax: "3%", // Could be fetched from contract
          balance: userBalance,
          price: 0.00000275,
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching token data:", error);
        setIsLoading(false);
      }
    };

    fetchTokenData();
  }, [address, isConnected]);

  return {
    tokenData,
    isLoading,
  };
};
