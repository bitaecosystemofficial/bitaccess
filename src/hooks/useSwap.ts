
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { swapService } from '@/services/SwapService';
import { ContractResult } from '@/types/contracts';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/contexts/WalletContext';
import { tokenAddresses } from '@/constants/contracts';
import { CryptoCompareService } from '@/services/CryptoCompareService';

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
  prices: {
    BNB: number;
    USDT: number;
    USDC: number;
    BTCB: number;
    BIT: number;
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
    prices: {
      BNB: 600,
      USDT: 1,
      USDC: 1,
      BTCB: 95000,
      BIT: 0.000108
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
        // Fetch real-time prices from CryptoCompare
        const prices = await CryptoCompareService.getAllPrices();
        
        // Get fee data
        const { fee, feeDenominator } = await swapService.getSwapFee();
        const feePercentage = (fee / feeDenominator) * 100;

        // Get pair info for liquidity pools
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
        
        try {
          usdtBitPair = await swapService.getPairInfo(
            tokenAddresses.usdt,
            tokenAddresses.bit
          );
        } catch (error) {
          console.error("Error fetching USDT-BIT pair:", error);
        }

        // Calculate swap rates based on real-time USD prices
        const calculateRate = (fromPrice: number, toPrice: number) => {
          return toPrice > 0 ? fromPrice / toPrice : 0;
        };

        // Create all possible trading pairs
        const createPair = (fromToken: string, toToken: string, fromAddress: string, toAddress: string) => {
          const fromPrice = prices[fromToken as keyof typeof prices];
          const toPrice = prices[toToken as keyof typeof prices];
          return {
            from: fromToken,
            to: toToken,
            rate: calculateRate(fromPrice, toPrice),
            fromAddress,
            toAddress,
            reserveFrom: fromToken === 'BNB' ? bnbBitPair.reserveA : 
                         fromToken === 'USDT' ? usdtBitPair.reserveA : "0",
            reserveTo: toToken === 'BIT' ? 
                      (fromToken === 'BNB' ? bnbBitPair.reserveB : usdtBitPair.reserveB) : "0"
          };
        };

        const pairs: SwapPair[] = [
          createPair('BNB', 'BIT', tokenAddresses.bnb, tokenAddresses.bit),
          createPair('USDT', 'BIT', tokenAddresses.usdt, tokenAddresses.bit),
          createPair('USDC', 'BIT', tokenAddresses.usdc, tokenAddresses.bit),
          createPair('BTCB', 'BIT', tokenAddresses.btcb, tokenAddresses.bit),
          createPair('BNB', 'USDT', tokenAddresses.bnb, tokenAddresses.usdt),
          createPair('BNB', 'USDC', tokenAddresses.bnb, tokenAddresses.usdc),
          createPair('BNB', 'BTCB', tokenAddresses.bnb, tokenAddresses.btcb),
          createPair('USDT', 'USDC', tokenAddresses.usdt, tokenAddresses.usdc),
          createPair('USDT', 'BTCB', tokenAddresses.usdt, tokenAddresses.btcb),
          createPair('USDC', 'BTCB', tokenAddresses.usdc, tokenAddresses.btcb),
        ];

        setSwapData({
          pairs,
          liquidity: {
            bnbPool: parseFloat(bnbBitPair.reserveA),
            usdtPool: parseFloat(usdtBitPair.reserveA),
            bitPool: parseFloat(bnbBitPair.reserveB) + parseFloat(usdtBitPair.reserveB)
          },
          fees: {
            swap: feePercentage,
            liquidity: feePercentage * 0.55
          },
          prices,
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
    
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchSwapData, 30000);
    
    return () => clearInterval(interval);
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
