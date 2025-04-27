
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { TokenABI } from '@/contracts/abis/TokenABI';
import { AirdropABI } from '@/contracts/abis/AirdropABI';
import { PresaleABI } from '@/contracts/abis/PresaleABI';
import { StakingABI } from '@/contracts/abis/StakingABI';
import { SwapABI } from '@/contracts/abis/SwapABI';

export class ContractService {
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.Signer;

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
    } else {
      throw new Error('No Ethereum provider found');
    }
  }

  // Get contract instances
  private async getTokenContract() {
    return new ethers.Contract(contractAddresses.token, TokenABI, this.signer);
  }

  private async getAirdropContract() {
    return new ethers.Contract(contractAddresses.airdrop, AirdropABI, this.signer);
  }

  private async getPresaleContract() {
    return new ethers.Contract(contractAddresses.presale, PresaleABI, this.signer);
  }

  private async getStakingContract() {
    return new ethers.Contract(contractAddresses.staking, StakingABI, this.signer);
  }

  private async getSwapContract() {
    return new ethers.Contract(contractAddresses.swap, SwapABI, this.signer);
  }

  // Token methods
  async getBalance(address: string) {
    const contract = await this.getTokenContract();
    return contract.balanceOf(address);
  }

  // Airdrop methods
  async claimAirdrop() {
    const contract = await this.getAirdropContract();
    const tx = await contract.claim();
    return tx.wait();
  }

  async checkAirdropEligibility(address: string) {
    const contract = await this.getAirdropContract();
    return contract.isEligible(address);
  }

  // Presale methods
  async buyPresaleTokens(amount: number) {
    const contract = await this.getPresaleContract();
    const tx = await contract.buyTokens(amount);
    return tx.wait();
  }

  async getPresaleInfo() {
    const contract = await this.getPresaleContract();
    const phase = await contract.getCurrentPhase();
    const price = await contract.getTokenPrice();
    const available = await contract.getAvailableTokens();
    const endTime = await contract.getEndTime();
    
    return { phase, price, available, endTime };
  }

  // Staking methods
  async stake(amount: string) {
    const contract = await this.getStakingContract();
    const tx = await contract.stake(amount);
    return tx.wait();
  }

  async unstake(amount: string) {
    const contract = await this.getStakingContract();
    const tx = await contract.unstake(amount);
    return tx.wait();
  }

  async getStakingInfo(address: string) {
    const contract = await this.getStakingContract();
    const stakedBalance = await contract.getStakedBalance(address);
    const rewards = await contract.getRewards(address);
    return { stakedBalance, rewards };
  }

  // Swap methods
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

export const contractService = new ContractService();
