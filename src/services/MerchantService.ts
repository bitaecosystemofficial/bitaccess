
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { MerchantABI } from '@/contracts/abis/MerchantABI';
import { BaseContractService } from './BaseContractService';
import { tokenService } from './TokenService';
import { toast } from '@/hooks/use-toast';

export class MerchantService extends BaseContractService {
  async getMerchantContract() {
    return new ethers.Contract(contractAddresses.merchants, MerchantABI, this.signer);
  }

  async subscribeMerchant(planId: number, duration: number) {
    const contract = await this.getMerchantContract();
    const tx = await contract.subscribe(planId, duration);
    return tx.wait();
  }

  async getMerchantStatus(address: string) {
    const contract = await this.getMerchantContract();
    return contract.getMerchantStatus(address);
  }

  async getSubscriptionEnd(address: string) {
    const contract = await this.getMerchantContract();
    return contract.getSubscriptionEnd(address);
  }

  async payWithToken(planName: string, duration: number, tokenType: 'BIT' | 'USDT') {
    try {
      // Convert plan name to ID
      const planMap: Record<string, number> = {
        "Basic": 1,
        "Premium": 2,
        "Enterprise": 3
      };
      const planId = planMap[planName] || 1;
      
      // Get merchant contract
      const merchantContract = await this.getMerchantContract();
      
      // Get plan details to determine price
      const planDetails = await merchantContract.getPlanDetails(planId);
      const planPrice = planDetails.price;
      
      // Calculate total price based on duration
      const totalPrice = planPrice.mul(duration);
      
      // Get token contract
      const tokenAddress = tokenType === 'BIT' ? 
        contractAddresses.token : 
        '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT address
      
      // Approve tokens for spending
      const tokenContract = await tokenService.getTokenContract();
      const approveTx = await tokenContract.approve(contractAddresses.merchants, totalPrice);
      await approveTx.wait();
      
      // Subscribe to the plan
      const tx = await merchantContract.subscribe(planId, duration);
      const receipt = await tx.wait();
      
      return {
        success: true,
        hash: receipt.transactionHash
      };
    } catch (error) {
      console.error("Payment error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const merchantService = new MerchantService();
