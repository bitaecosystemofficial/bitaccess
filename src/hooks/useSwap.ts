
import { swapService } from '@/services/SwapService';
import { ContractResult } from '@/types/contracts';
import { toast } from '@/hooks/use-toast';
import { useWallet } from '@/contexts/WalletContext';

export const swapTokens = async (
  fromToken: string, 
  toToken: string, 
  amount: string
): Promise<ContractResult> => {
  try {
    const quote = await swapService.getSwapQuote(fromToken, toToken, amount);
    const minAmount = quote.mul(95).div(100); // 5% slippage
    const tx = await swapService.executeSwap(fromToken, toToken, amount, minAmount);
    
    return { 
      success: true, 
      hash: tx.transactionHash 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export const useSwapData = () => {
  // This would fetch data from the blockchain in a real implementation
  // For now, returning static data
  return {
    pairs: [
      { from: 'BNB', to: 'BIT', rate: 12500 },
      { from: 'USDT', to: 'BIT', rate: 5000 },
      { from: 'BUSD', to: 'BIT', rate: 5000 },
    ],
    liquidity: {
      bnbPool: 250.5,
      usdtPool: 125000,
      bitPool: 3250000
    },
    fees: {
      swap: 0.3,
      liquidity: 0.17
    }
  };
};
