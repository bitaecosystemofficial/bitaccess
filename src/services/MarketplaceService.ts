
import { ethers } from "ethers";
import { BaseContractService } from "./BaseContractService";
import { MARKETPLACE_ABI } from "../contracts/abis/MarketplaceABI";
import { contractAddresses } from "../constants/contracts";

class MarketplaceServiceClass extends BaseContractService {
  async getMarketplaceContract(withSigner = true) {
    try {
      if (withSigner) {
        // Ensure we have a signer first
        const signer = await this.ensureSigner();
        return new ethers.Contract(contractAddresses.marketplace, MARKETPLACE_ABI, signer);
      } else {
        // Read-only contract using provider
        return new ethers.Contract(contractAddresses.marketplace, MARKETPLACE_ABI, this.provider);
      }
    } catch (error) {
      console.error("Error getting marketplace contract:", error);
      throw error;
    }
  }

  async getProductCount() {
    const contract = await this.getMarketplaceContract(false);
    const count = await contract.getProductCount();
    return count.toNumber();
  }

  async getProduct(productId: number) {
    const contract = await this.getMarketplaceContract(false);
    const product = await contract.getProduct(productId);
    return {
      id: product.id.toNumber(),
      name: product.name,
      description: product.description,
      price: ethers.utils.formatUnits(product.price, 6), // USDT has 6 decimals
      seller: product.seller,
      stock: product.stock.toNumber(),
      active: product.active
    };
  }

  async getCategories() {
    const contract = await this.getMarketplaceContract(false);
    const categories = await contract.getCategories();
    return categories.map((category: any) => ({
      id: category.id.toNumber(),
      name: category.name,
      imageUrl: category.imageUrl
    }));
  }

  async getProductsByCategory(categoryId: number) {
    const contract = await this.getMarketplaceContract(false);
    const productIds = await contract.getProductsByCategory(categoryId);
    return productIds.map((id: ethers.BigNumber) => id.toNumber());
  }

  async listProduct(
    name: string,
    description: string,
    price: string,
    categoryId: number,
    stock: number
  ) {
    const contract = await this.getMarketplaceContract();
    const priceInWei = ethers.utils.parseUnits(price, 6); // USDT has 6 decimals
    const tx = await contract.listProduct(name, description, priceInWei, categoryId, stock, {
      value: ethers.utils.parseEther("0.01"), // Listing fee in BNB
    });
    return await tx.wait();
  }

  async purchaseProduct(productId: number, quantity: number) {
    const contract = await this.getMarketplaceContract();
    const tx = await contract.purchaseProduct(productId, quantity);
    return await tx.wait();
  }

  async updateProduct(
    productId: number,
    name: string,
    description: string,
    price: string,
    stock: number,
    active: boolean
  ) {
    const contract = await this.getMarketplaceContract();
    const priceInWei = ethers.utils.parseUnits(price, 6);
    const tx = await contract.updateProduct(productId, name, description, priceInWei, stock, active);
    return await tx.wait();
  }

  async getUserPurchases(address: string) {
    const contract = await this.getMarketplaceContract(false);
    const purchaseIds = await contract.getUserPurchases(address);
    return purchaseIds.map((id: ethers.BigNumber) => id.toNumber());
  }

  async getProductSales(productId: number) {
    const contract = await this.getMarketplaceContract(false);
    const sales = await contract.getProductSales(productId);
    return sales.map((sale: any) => ({
      buyer: sale.buyer,
      amount: ethers.utils.formatUnits(sale.amount, 6),
      date: new Date(sale.date.toNumber() * 1000)
    }));
  }

  async addProductToFavorites(productId: number) {
    const contract = await this.getMarketplaceContract();
    const tx = await contract.addProductToFavorites(productId);
    return await tx.wait();
  }

  async removeProductFromFavorites(productId: number) {
    const contract = await this.getMarketplaceContract();
    const tx = await contract.removeProductFromFavorites(productId);
    return await tx.wait();
  }

  async subscribeToMarketplaceEvents(callback: (event: any) => void) {
    const contract = await this.getMarketplaceContract(false);
    
    // Subscribe to ProductListed events
    contract.on("ProductListed", (productId, seller, price, timestamp, event) => {
      callback({
        event: "ProductListed",
        args: { 
          productId: productId.toNumber(), 
          seller, 
          price: ethers.utils.formatUnits(price, 6),
          timestamp: timestamp.toNumber()
        },
        transaction: event.transactionHash
      });
    });
    
    // Subscribe to ProductPurchased events
    contract.on("ProductPurchased", (productId, buyer, seller, quantity, amount, timestamp, event) => {
      callback({
        event: "ProductPurchased",
        args: { 
          productId: productId.toNumber(), 
          buyer, 
          seller,
          quantity: quantity.toNumber(),
          amount: ethers.utils.formatUnits(amount, 6),
          timestamp: timestamp.toNumber()
        },
        transaction: event.transactionHash
      });
    });
    
    // Store the contract in eventSubscriptions map for cleanup
    this.eventSubscriptions.set('marketplace', contract);
  }

  cleanup() {
    super.cleanup('marketplace');
  }
}

export const marketplaceService = new MarketplaceServiceClass();
