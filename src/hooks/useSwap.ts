
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { swapService } from '@/services/SwapService';
import { ContractResult } from '@/types/contracts';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/contexts/WalletContext';
import { tokenAddresses } from '@/constants/contracts';

export type SwapPair = {
  from: string;
  to: string;
  rate: number;
  fromAddress: string;
  toAddress: string;
  reserveFrom: string;
  reserveTo: string;
};

export type SwapDataType = {
  pairs: SwapPair[];
  liquidity: {
    bnbPool: number;
    usdtPool: number;
    bitPool: number;
  };
  fees: {
    swap: number;
    liquidity: number;
  };
  isLoading: boolean;
  error: string | null;
};

export const swapTokens = async (
  fromToken: string, 
  toToken: string, 
  amount: string,
  slippage: number = 5
): Promise<ContractResult> => {
  try {
    // Convert to wei
    const amountInWei = ethers.utils.parseEther(amount);
    
    // Get quote
    const quote = await swapService.getSwapQuote(fromToken, toToken, amountInWei.toString());
    
    // Apply slippage to the quote (slippage is in percentage)
    const minAmount = quote.mul(100 - slippage).div(100);
    
    // Execute swap
    const tx = await swapService.executeSwap(
      fromToken,
      toToken,
      amountInWei.toString(),
      minAmount.toString()
    );
    
    return { 
      success: true, 
      hash: tx.transactionHash 
    };
  } catch (error) {
    console.error("Swap error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error during swap' 
    };
  }
};

export const useSwapData = (): SwapDataType => {
  const { toast } = useToast();
  const { isConnected } = useWallet();
  const [swapData, setSwapData] = useState<SwapDataType>({
    pairs: [],
    liquidity: {
      bnbPool: 0,
      usdtPool: 0,
      bitPool: 0
    },
    fees: {
      swap: 0.3,
      liquidity: 0.17
    },
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchSwapData = async () => {
      if (!isConnected) {
        setSwapData(prevData => ({
          ...prevData,
          isLoading: false
        }));
        return;
      }

      try {
        // Get fee data - this now has error handling built in
        const { fee, feeDenominator } = await swapService.getSwapFee();
        const feePercentage = (fee / feeDenominator) * 100;

        // Get pair info for BNB-BIT with better error handling
        let bnbBitPair = { reserveA: "0", reserveB: "0", totalLiquidity: "0" };
        let usdtBitPair = { reserveA: "0", reserveB: "0", totalLiquidity: "0" };
        
        try {
          bnbBitPair = await swapService.getPairInfo(
            tokenAddresses.bnb,
            tokenAddresses.bit
          );
        } catch (error) {
          console.error("Error fetching BNB-BIT pair:", error);
        }
        
        // Get pair info for USDT-BIT with better error handling
        try {
          usdtBitPair = await swapService.getPairInfo(
            tokenAddresses.usdt,
            tokenAddresses.bit
          );
        } catch (error) {
          console.error("Error fetching USDT-BIT pair:", error);
        }

        // Calculate rates with safeguards against division by zero
        const bnbBitRate = parseFloat(bnbBitPair.reserveA) > 0 
          ? parseFloat(bnbBitPair.reserveB) / parseFloat(bnbBitPair.reserveA)
          : 0;
          
        const usdtBitRate = parseFloat(usdtBitPair.reserveA) > 0
          ? parseFloat(usdtBitPair.reserveB) / parseFloat(usdtBitPair.reserveA)
          : 0;
          
        const usdtBnbRate = parseFloat(bnbBitPair.reserveA) > 0
          ? parseFloat(usdtBitPair.reserveA) / parseFloat(bnbBitPair.reserveA)
          : 0;

        // Prepare data
        setSwapData({
          pairs: [
            { 
              from: 'BNB', to: 'BIT', 
              rate: bnbBitRate,
              fromAddress: tokenAddresses.bnb,
              toAddress: tokenAddresses.bit,
              reserveFrom: bnbBitPair.reserveA,
              reserveTo: bnbBitPair.reserveB
            },
            { 
              from: 'USDT', to: 'BIT', 
              rate: usdtBitRate,
              fromAddress: tokenAddresses.usdt,
              toAddress: tokenAddresses.bit,
              reserveFrom: usdtBitPair.reserveA,
              reserveTo: usdtBitPair.reserveB
            },
            { 
              from: 'USDT', to: 'BNB', 
              rate: usdtBnbRate,
              fromAddress: tokenAddresses.usdt,
              toAddress: tokenAddresses.bnb,
              reserveFrom: usdtBitPair.reserveA,
              reserveTo: bnbBitPair.reserveA
            }
          ],
          liquidity: {
            bnbPool: parseFloat(bnbBitPair.reserveA),
            usdtPool: parseFloat(usdtBitPair.reserveA),
            bitPool: parseFloat(bnbBitPair.reserveB) + parseFloat(usdtBitPair.reserveB)
          },
          fees: {
            swap: feePercentage,
            liquidity: feePercentage * 0.55 // Liquidity provider fee (55% of swap fee)
          },
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error("Error fetching swap data:", error);
        setSwapData(prevData => ({
          ...prevData,
          isLoading: false,
          error: "Failed to load swap data. Please check your connection and try again."
        }));
        
        toast({
          title: "Failed to fetch swap data",
          description: "Using default values - some features may be limited",
          variant: "destructive",
        });
      }
    };

    fetchSwapData();
  }, [isConnected, toast]);

  return swapData;
};

export const useTokenBalance = (tokenAddress: string | null) => {
  const { address, provider } = useWallet();
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBalance = async () => {
      if (!address || !provider || !tokenAddress) {
        setBalance('0');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // If this is the native token (BNB)
        if (tokenAddress.toLowerCase() === tokenAddresses.bnb.toLowerCase()) {
          const balance = await provider.getBalance(address);
          setBalance(ethers.utils.formatEther(balance));
        } else {
          // For other tokens, use the ERC20 interface
          const tokenContract = new ethers.Contract(
            tokenAddress,
            ["function balanceOf(address) view returns (uint256)"],
            provider
          );
          
          const balance = await tokenContract.balanceOf(address);
          setBalance(ethers.utils.formatEther(balance));
        }
      } catch (error) {
        console.error("Error fetching token balance:", error);
        setBalance('0');
      } finally {
        setIsLoading(false);
      }
    };

    getBalance();
  }, [address, provider, tokenAddress]);

  return { balance, isLoading };
};
