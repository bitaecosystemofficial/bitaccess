
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
    try {
      const contract = await this.getSwapContract();
      // Try to get the fee - if this fails, use a default value
      let fee = 30; // Default 0.3% fee (30/10000)
      let feeDenominator = 10000; // Default denominator
      
      try {
        fee = await contract.swapFee();
        feeDenominator = await contract.FEE_DENOMINATOR();
      } catch (error) {
        console.warn("Could not fetch swap fee from contract, using default values", error);
      }
      
      return {
        fee: typeof fee === 'number' ? fee : fee.toNumber(),
        feeDenominator: typeof feeDenominator === 'number' ? feeDenominator : feeDenominator.toNumber()
      };
    } catch (error) {
      console.error("Error in getSwapFee:", error);
      return {
        fee: 30,
        feeDenominator: 10000
      };
    }
  }

  async getPairInfo(tokenA: string, tokenB: string) {
    try {
      const contract = await this.getSwapContract();
      const pairInfo = await contract.getPairInfo(tokenA, tokenB);
      return {
        reserveA: ethers.utils.formatEther(pairInfo.reserveA),
        reserveB: ethers.utils.formatEther(pairInfo.reserveB),
        totalLiquidity: ethers.utils.formatEther(pairInfo.totalLiquidity)
      };
    } catch (error) {
      console.error("Error fetching pair info:", error);
      // Return default values if we can't fetch the data
      return {
        reserveA: "0",
        reserveB: "0",
        totalLiquidity: "0"
      };
    }
  }

  async getAllowedTokens() {
    try {
      const contract = await this.getSwapContract();
      let bitAddress = tokenAddresses.bit;
      let bnbAddress = tokenAddresses.bnb;
      let usdtAddress = tokenAddresses.usdt;
      
      try {
        bitAddress = await contract.BIT();
        bnbAddress = await contract.BNB();
        usdtAddress = await contract.USDT();
      } catch (error) {
        console.warn("Could not fetch token addresses from contract, using defaults", error);
      }
      
      return {
        BIT: bitAddress,
        BNB: bnbAddress,
        USDT: usdtAddress
      };
    } catch (error) {
      console.error("Error in getAllowedTokens:", error);
      return {
        BIT: tokenAddresses.bit,
        BNB: tokenAddresses.bnb,
        USDT: tokenAddresses.usdt
      };
    }
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
