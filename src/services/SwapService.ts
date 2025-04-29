
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { SwapABI } from '@/contracts/abis/SwapABI';
import { BaseContractService } from './BaseContractService';

export class SwapService extends BaseContractService {
  async getSwapContract() {
    return new ethers.Contract(contractAddresses.swap, SwapABI, this.signer);
  }

  async getSwapQuote(tokenIn: string, tokenOut: string, amountIn: string) {
    const contract = await this.getSwapContract();
    return contract.getAmountOut(tokenIn, tokenOut, amountIn);
  }

  async executeSwap(tokenIn: string, tokenOut: string, amountIn: string, minAmountOut: string) {
    const contract = await this.getSwapContract();
    const tx = await contract.swap(tokenIn, tokenOut, amountIn, minAmountOut, await this.signer.getAddress());
    return tx.wait();
  }
}

export const swapService = new SwapService();
