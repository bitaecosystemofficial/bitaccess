
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { MerchantABI } from '@/contracts/abis/MerchantABI';
import { BaseContractService } from './BaseContractService';
import { tokenService } from './TokenService';
import { toast } from '@/hooks/use-toast';

export class StoreService extends BaseContractService {
  async getStoreContract() {
    await this.ensureSigner();
    return new ethers.Contract(contractAddresses.merchants, MerchantABI, this.signer);
  }

  async getReadOnlyStoreContract() {
    return new ethers.Contract(contractAddresses.merchants, MerchantABI, this.provider);
  }

  async subscribeToStore(planId: number, duration: number) {
    try {
      await this.ensureSigner();
      const contract = await this.getStoreContract();
      const tx = await contract.subscribe(planId, duration);
      return tx.wait();
    } catch (error) {
      console.error("Error subscribing to store:", error);
      throw error;
    }
  }

  async getStoreStatus(address: string) {
    try {
      const contract = await this.getReadOnlyStoreContract();
      return contract.getMerchantStatus(address);
    } catch (error) {
      console.error("Error getting store status:", error);
      return 0;
    }
  }

  async getSubscriptionEnd(address: string) {
    try {
      const contract = await this.getReadOnlyStoreContract();
      return contract.getSubscriptionEnd(address);
    } catch (error) {
      console.error("Error getting subscription end:", error);
      return 0;
    }
  }

  async getTotalStores() {
    try {
      const contract = await this.getReadOnlyStoreContract();
      return contract.getTotalMerchants();
    } catch (error) {
      console.error("Error getting total stores:", error);
      return 385;
    }
  }

  async getActiveStores() {
    try {
      const contract = await this.getReadOnlyStoreContract();
      return contract.getActiveMerchants();
    } catch (error) {
      console.error("Error getting active stores:", error);
      return 312;
    }
  }

  async getStoresByCategory(category: string) {
    try {
      const contract = await this.getReadOnlyStoreContract();
      return contract.getMerchantsByCategory(category);
    } catch (error) {
      console.error(`Error getting stores by category ${category}:`, error);
      return [];
    }
  }

  async getRecentStores() {
    try {
      const contract = await this.getReadOnlyStoreContract();
      return contract.getRecentStores();
    } catch (error) {
      console.error("Error getting recent stores:", error);
      return [];
    }
  }

  async payWithToken(planName: string, duration: number, tokenType: 'BIT' | 'USDT') {
    try {
      // Ensure we have a connected wallet
      await this.ensureSigner();
      
      // Convert plan name to ID
      const planMap: Record<string, number> = {
        "Membership": 1,
        "Merchant": 2
      };
      const planId = planMap[planName] || 1;
      
      // Get store contract
      const storeContract = await this.getStoreContract();
      
      // Calculate price based on plan name
      const planPrice = ethers.utils.parseUnits(
        planName === "Membership" ? "20" : "100",
        6 // USDT has 6 decimals
      );
      
      // Calculate total price based on duration in days
      // Assuming the price is for 365 days as specified
      const daysInYear = 365;
      const priceFactor = duration / daysInYear;
      const totalPrice = planPrice.mul(Math.floor(priceFactor * 100)).div(100);
      
      // Get token contract address
      const tokenAddress = tokenType === 'BIT' ? 
        contractAddresses.token : 
        '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT address on BSC
      
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
      
      const tx = await storeContract.subscribe(planId, duration);
      const receipt = await tx.wait();
      
      return {
        success: true,
        hash: receipt.transactionHash
      };
    } catch (error: any) {
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
  
  // Alias method to ensure compatibility with ContractService
  async subscribeMerchant(planId: number, duration: number) {
    return this.subscribeToStore(planId, duration);
  }

  // Alias method to ensure compatibility with ContractService
  async getMerchantContract() {
    return this.getStoreContract();
  }
}

export const storeService = new StoreService();
