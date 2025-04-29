
import { ethers } from 'ethers';
import { contractAddresses, networkInfo } from '@/constants/contracts';
import { TokenABI } from '@/contracts/abis/TokenABI';
import { AirdropABI } from '@/contracts/abis/AirdropABI';
import { PresaleABI } from '@/contracts/abis/PresaleABI';
import { StakingABI } from '@/contracts/abis/StakingABI';
import { SwapABI } from '@/contracts/abis/SwapABI';
import { MerchantABI } from '@/contracts/abis/MerchantABI';
import { SpinWheelABI } from '@/contracts/abis/SpinWheelABI';
import { EducationABI } from '@/contracts/abis/EducationABI';

export class ContractService {
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.Signer;
  private eventSubscriptions: Map<string, ethers.Contract>;

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      this.eventSubscriptions = new Map();
      this.initializeProviderEvents();
    } else {
      throw new Error('No Ethereum provider found');
    }
  }

  private initializeProviderEvents() {
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });
  }

  // Enhanced contract instances with event support
  private async getTokenContract(withEvents = false) {
    const contract = new ethers.Contract(contractAddresses.token, TokenABI, this.signer);
    if (withEvents && !this.eventSubscriptions.has('token')) {
      this.eventSubscriptions.set('token', contract);
      console.log('Subscribed to Token events');
    }
    return contract;
  }

  // Changed from private to public to allow access from outside the class
  async getAirdropContract(withEvents = false) {
    const contract = new ethers.Contract(contractAddresses.airdrop, AirdropABI, this.signer);
    if (withEvents && !this.eventSubscriptions.has('airdrop')) {
      this.eventSubscriptions.set('airdrop', contract);
      console.log('Subscribed to Airdrop events');
    }
    return contract;
  }

  private async getStakingContract(withEvents = false) {
    const contract = new ethers.Contract(contractAddresses.staking, StakingABI, this.signer);
    if (withEvents && !this.eventSubscriptions.has('staking')) {
      this.eventSubscriptions.set('staking', contract);
      console.log('Subscribed to Staking events');
    }
    return contract;
  }

  private async getPresaleContract() {
    return new ethers.Contract(contractAddresses.presale, PresaleABI, this.signer);
  }

  private async getSwapContract() {
    return new ethers.Contract(contractAddresses.swap, SwapABI, this.signer);
  }

  async getMerchantContract() {
    return new ethers.Contract(contractAddresses.merchants, MerchantABI, this.signer);
  }

  async getSpinWheelContract() {
    return new ethers.Contract(contractAddresses.spinWheel, SpinWheelABI, this.signer);
  }

  async getEducationContract() {
    return new ethers.Contract(contractAddresses.education, EducationABI, this.signer);
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

  async verifyAirdropTask(address: string, taskId: number) {
    const contract = await this.getAirdropContract();
    const tx = await contract.verifyTasks(address, taskId);
    return tx.wait();
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

  // Merchant methods
  async subscribeMerchant(planId: number, duration: number) {
    const contract = await this.getMerchantContract();
    const tx = await contract.subscribe(planId, duration);
    return tx.wait();
  }

  async getMerchantStatus(address: string) {
    const contract = await this.getMerchantContract();
    return contract.getMerchantStatus(address);
  }

  // SpinWheel methods
  async spin() {
    const contract = await this.getSpinWheelContract();
    const tx = await contract.spin();
    return tx.wait();
  }

  async getSpinCooldown(address: string) {
    const contract = await this.getSpinWheelContract();
    // This method depends on the actual contract implementation
    // For demo, assuming there's a method like this
    return contract.getUserLastSpin(address);
  }

  // Education methods
  async enrollInCourse(courseId: string) {
    const contract = await this.getEducationContract();
    const tx = await contract.enrollInCourse(courseId);
    return tx.wait();
  }

  async getCourseStatus(courseId: string, address: string) {
    const contract = await this.getEducationContract();
    return contract.getCourseStatus(courseId, address);
  }

  // Real-time data methods
  async subscribeToTokenTransfers(callback: (from: string, to: string, amount: ethers.BigNumber) => void) {
    const contract = await this.getTokenContract(true);
    contract.on('Transfer', callback);
    console.log('Subscribed to Token transfers');
  }

  async subscribeToStakingEvents(callback: (event: any) => void) {
    const contract = await this.getStakingContract(true);
    contract.on('Staked', callback);
    contract.on('Unstaked', callback);
    contract.on('RewardsClaimed', callback);
    console.log('Subscribed to Staking events');
  }

  async subscribeToAirdropEvents(callback: (event: any) => void) {
    const contract = await this.getAirdropContract(true);
    contract.on('TokensClaimed', callback);
    contract.on('TaskCompleted', callback);
    console.log('Subscribed to Airdrop events');
  }

  // Enhanced real-time data fetching methods
  async getStakingInfo(address: string) {
    const contract = await this.getStakingContract();
    try {
      const [stakedBalance, rewards, totalStaked, apy] = await Promise.all([
        contract.getStakedBalance(address),
        contract.getRewards(address),
        contract.getTotalStaked(),
        contract.getAPY()
      ]);
      
      console.log('Fetched staking info:', {
        stakedBalance: ethers.utils.formatEther(stakedBalance),
        rewards: ethers.utils.formatEther(rewards),
        totalStaked: ethers.utils.formatEther(totalStaked),
        apy: apy.toString()
      });

      return {
        stakedBalance,
        rewards,
        totalStaked,
        apy
      };
    } catch (error) {
      console.error('Error fetching staking info:', error);
      throw error;
    }
  }

  // Cleanup method
  cleanup() {
    this.eventSubscriptions.forEach(contract => {
      contract.removeAllListeners();
    });
    this.eventSubscriptions.clear();
    console.log('Cleaned up all contract event subscriptions');
  }
}

export const contractService = new ContractService();
