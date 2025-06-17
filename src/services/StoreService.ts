
import { ethers } from 'ethers';
import { BaseContractService } from './BaseContractService';
import { MerchantABI } from '../contracts/abis/MerchantABI';
import { MARKETPLACE_ABI } from '../contracts/abis/MarketplaceABI';

const MERCHANT_CONTRACT_ADDRESS = '0x742d35Cc6609690d3E8855A4CC8faa9b0E37c8aa';
const MARKETPLACE_CONTRACT_ADDRESS = '0x3b2c9a6dE0F4Ff60fCA3C25e13e77e05FffFf444';

export class StoreService extends BaseContractService {
  private merchantContract: ethers.Contract | null = null;
  private marketplaceContract: ethers.Contract | null = null;

  async initializeContracts() {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    this.merchantContract = new ethers.Contract(
      MERCHANT_CONTRACT_ADDRESS,
      MerchantABI,
      this.signer
    );

    this.marketplaceContract = new ethers.Contract(
      MARKETPLACE_CONTRACT_ADDRESS,
      MARKETPLACE_ABI,
      this.signer
    );
  }

  async getStoreStatus(address: string): Promise<number> {
    try {
      if (!this.merchantContract) {
        await this.initializeContracts();
      }
      // Simulate merchant status check
      return Math.floor(Math.random() * 3); // 0 = not merchant, 1 = active, 2 = suspended
    } catch (error) {
      console.error('Error getting store status:', error);
      return 0;
    }
  }

  async payWithToken(planName: string, duration: number, token: string): Promise<{success: boolean, error?: string}> {
    try {
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }
      
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Payment for ${planName} plan (${duration} days) with ${token}`);
      
      return { success: true };
    } catch (error) {
      console.error('Payment error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Payment failed' 
      };
    }
  }

  async registerMerchant(name: string, email: string) {
    if (!this.merchantContract) {
      await this.initializeContracts();
    }
    
    const tx = await this.merchantContract!.registerMerchant(name, email);
    return await tx.wait();
  }

  async createProduct(name: string, price: string, description: string) {
    if (!this.merchantContract) {
      await this.initializeContracts();
    }
    
    const tx = await this.merchantContract!.createProduct(
      name,
      ethers.utils.parseEther(price),
      description
    );
    return await tx.wait();
  }

  async purchaseProduct(productId: number, amount: string) {
    if (!this.marketplaceContract) {
      await this.initializeContracts();
    }
    
    const tx = await this.marketplaceContract!.purchaseProduct(
      productId,
      { value: ethers.utils.parseEther(amount) }
    );
    return await tx.wait();
  }

  getMerchantContract(): ethers.Contract {
    if (!this.merchantContract) {
      throw new Error('Merchant contract not initialized');
    }
    return this.merchantContract;
  }

  getMarketplaceContract(): ethers.Contract {
    if (!this.marketplaceContract) {
      throw new Error('Marketplace contract not initialized');
    }
    return this.marketplaceContract;
  }
}

export const storeService = new StoreService();
