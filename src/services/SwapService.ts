
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { SwapABI } from '@/contracts/abis/SwapABI';
import { BaseContractService } from './BaseContractService';
import { tokenAddresses } from '@/constants/contracts';

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

  async getSwapFee() {
    const contract = await this.getSwapContract();
    const fee = await contract.swapFee();
    const feeDenominator = await contract.FEE_DENOMINATOR();
    return {
      fee: fee.toNumber(),
      feeDenominator: feeDenominator.toNumber()
    };
  }

  async getPairInfo(tokenA: string, tokenB: string) {
    const contract = await this.getSwapContract();
    const pairInfo = await contract.getPairInfo(tokenA, tokenB);
    return {
      reserveA: ethers.utils.formatEther(pairInfo.reserveA),
      reserveB: ethers.utils.formatEther(pairInfo.reserveB),
      totalLiquidity: ethers.utils.formatEther(pairInfo.totalLiquidity)
    };
  }

  async getAllowedTokens() {
    const contract = await this.getSwapContract();
    const bitAddress = await contract.BIT();
    const bnbAddress = await contract.BNB();
    const usdtAddress = await contract.USDT();
    
    return {
      BIT: bitAddress,
      BNB: bnbAddress,
      USDT: usdtAddress
    };
  }

  async addLiquidity(tokenA: string, tokenB: string, amountA: string, amountB: string) {
    const contract = await this.getSwapContract();
    const tx = await contract.addLiquidity(tokenA, tokenB, amountA, amountB);
    return tx.wait();
  }

  async removeLiquidity(tokenA: string, tokenB: string, liquidity: string) {
    const contract = await this.getSwapContract();
    const tx = await contract.removeLiquidity(tokenA, tokenB, liquidity);
    return tx.wait();
  }
}

export const swapService = new SwapService();
