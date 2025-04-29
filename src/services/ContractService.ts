
// This file now serves as an aggregation of all individual services
// to maintain backward compatibility with existing code

import { BaseContractService } from './BaseContractService';
import { tokenService } from './TokenService';
import { airdropService } from './AirdropService';
import { stakingService } from './StakingService';
import { presaleService } from './PresaleService';
import { swapService } from './SwapService';
import { merchantService } from './MerchantService';
import { spinWheelService } from './SpinWheelService';
import { educationService } from './EducationService';

// Create a combined service that delegates to the individual services
export class ContractService extends BaseContractService {
  // Token methods
  async getTokenContract(withEvents = false) {
    return tokenService.getTokenContract(withEvents);
  }

  async getBalance(address: string) {
    return tokenService.getBalance(address);
  }

  // Airdrop methods
  async getAirdropContract(withEvents = false) {
    return airdropService.getAirdropContract(withEvents);
  }

  async claimAirdrop() {
    return airdropService.claimAirdrop();
  }

  async checkAirdropEligibility(address: string) {
    return airdropService.checkAirdropEligibility(address);
  }

  async verifyAirdropTask(address: string, taskId: number) {
    return airdropService.verifyAirdropTask(address, taskId);
  }

  // Staking methods
  async getStakingContract(withEvents = false) {
    return stakingService.getStakingContract(withEvents);
  }

  async stake(amount: string) {
    return stakingService.stake(amount);
  }

  async unstake(amount: string) {
    return stakingService.unstake(amount);
  }

  async getStakingInfo(address: string) {
    return stakingService.getStakingInfo(address);
  }

  // Presale methods
  async getPresaleContract() {
    return presaleService.getPresaleContract();
  }

  async buyPresaleTokens(amount: number) {
    return presaleService.buyPresaleTokens(amount);
  }

  async getPresaleInfo() {
    return presaleService.getPresaleInfo();
  }

  // Swap methods
  async getSwapContract() {
    return swapService.getSwapContract();
  }

  async getSwapQuote(tokenIn: string, tokenOut: string, amountIn: string) {
    return swapService.getSwapQuote(tokenIn, tokenOut, amountIn);
  }

  async executeSwap(tokenIn: string, tokenOut: string, amountIn: string, minAmountOut: string) {
    return swapService.executeSwap(tokenIn, tokenOut, amountIn, minAmountOut);
  }

  // Merchant methods
  async getMerchantContract() {
    return merchantService.getMerchantContract();
  }

  async subscribeMerchant(planId: number, duration: number) {
    return merchantService.subscribeMerchant(planId, duration);
  }

  async getMerchantStatus(address: string) {
    return merchantService.getMerchantStatus(address);
  }

  // SpinWheel methods
  async getSpinWheelContract() {
    return spinWheelService.getSpinWheelContract();
  }

  async spin() {
    return spinWheelService.spin();
  }

  async getSpinCooldown(address: string) {
    return spinWheelService.getSpinCooldown(address);
  }

  // Education methods
  async getEducationContract() {
    return educationService.getEducationContract();
  }

  async enrollInCourse(courseId: string) {
    return educationService.enrollInCourse(courseId);
  }

  async getCourseStatus(courseId: string, address: string) {
    return educationService.getCourseStatus(courseId, address);
  }

  // Event subscription methods
  async subscribeToTokenTransfers(callback: (from: string, to: string, amount: any) => void) {
    return tokenService.subscribeToTokenTransfers(callback);
  }

  async subscribeToStakingEvents(callback: (event: any) => void) {
    return stakingService.subscribeToStakingEvents(callback);
  }

  async subscribeToAirdropEvents(callback: (event: any) => void) {
    return airdropService.subscribeToAirdropEvents(callback);
  }

  // Override cleanup to clean up all services
  cleanup() {
    tokenService.cleanup();
    airdropService.cleanup();
    stakingService.cleanup();
    merchantService.cleanup();
    spinWheelService.cleanup();
    educationService.cleanup();
    presaleService.cleanup();
    swapService.cleanup();
    super.cleanup();
    console.log('Cleaned up all contract event subscriptions');
  }
}

export const contractService = new ContractService();
