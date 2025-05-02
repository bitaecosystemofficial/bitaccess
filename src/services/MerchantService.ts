
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { MerchantABI } from '@/contracts/abis/MerchantABI';
import { BaseContractService } from './BaseContractService';
import { tokenService } from './TokenService';
import { toast } from '@/hooks/use-toast';

export class MerchantService extends BaseContractService {
  async getMerchantContract() {
    await this.ensureSigner();
    return new ethers.Contract(contractAddresses.merchants, MerchantABI, this.signer);
  }

  async getReadOnlyMerchantContract() {
    return new ethers.Contract(contractAddresses.merchants, MerchantABI, this.provider);
  }

  async subscribeMerchant(planId: number, duration: number) {
    try {
      await this.ensureSigner();
      const contract = await this.getMerchantContract();
      const tx = await contract.subscribe(planId, duration);
      return tx.wait();
    } catch (error) {
      console.error("Error subscribing merchant:", error);
      throw error;
    }
  }

  async getMerchantStatus(address: string) {
    try {
      const contract = await this.getReadOnlyMerchantContract();
      return contract.getMerchantStatus(address);
    } catch (error) {
      console.error("Error getting merchant status:", error);
      return 0; // Default to not a merchant
    }
  }

  async getSubscriptionEnd(address: string) {
    try {
      const contract = await this.getReadOnlyMerchantContract();
      return contract.getSubscriptionEnd(address);
    } catch (error) {
      console.error("Error getting subscription end:", error);
      return 0; // Default to no subscription
    }
  }

  async getTotalMerchants() {
    try {
      const contract = await this.getReadOnlyMerchantContract();
      return contract.getTotalMerchants();
    } catch (error) {
      console.error("Error getting total merchants:", error);
      return 385; // Default value
    }
  }

  async getActiveMerchants() {
    try {
      const contract = await this.getReadOnlyMerchantContract();
      return contract.getActiveMerchants();
    } catch (error) {
      console.error("Error getting active merchants:", error);
      return 312; // Default value
    }
  }

  async getMerchantsByCategory(category: string) {
    try {
      const contract = await this.getReadOnlyMerchantContract();
      return contract.getMerchantsByCategory(category);
    } catch (error) {
      console.error(`Error getting merchants by category ${category}:`, error);
      return []; // Default to empty array
    }
  }

  async getRecentStores() {
    try {
      const contract = await this.getReadOnlyMerchantContract();
      return contract.getRecentStores();
    } catch (error) {
      console.error("Error getting recent stores:", error);
      return []; // Default to empty array
    }
  }

  async payWithToken(planName: string, duration: number, tokenType: 'BIT' | 'USDT') {
    try {
      // Ensure we have a connected wallet
      await this.ensureSigner();
      
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
      
      toast({
        title: "Approving Token Spend",
        description: "Please confirm the token approval transaction in your wallet",
      });
      
      const approveTx = await tokenContract.approve(contractAddresses.merchants, totalPrice);
      await approveTx.wait();
      
      // Subscribe to the plan
      toast({
        title: "Subscription Transaction",
        description: "Please confirm the subscription transaction in your wallet",
      });
      
      const tx = await merchantContract.subscribe(planId, duration);
      const receipt = await tx.wait();
      
      return {
        success: true,
        hash: receipt.transactionHash
      };
    } catch (error) {
      console.error("Payment error:", error);
      let errorMessage = "Unknown error";
      
      if (error.code === 4001) {
        errorMessage = "Transaction rejected by user";
      } else if (error.message) {
        errorMessage = error.message;
        
        // Simplify common MetaMask errors
        if (errorMessage.includes("user rejected")) {
          errorMessage = "Transaction rejected";
        } else if (errorMessage.includes("insufficient funds")) {
          errorMessage = "Insufficient funds for transaction";
        }
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}

export const merchantService = new MerchantService();
