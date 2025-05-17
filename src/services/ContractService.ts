
import { ethers } from "ethers";
import { contractAddresses } from "../constants/contracts";
import { SpinWheelABI } from "../contracts/abis/SpinWheelABI";
import { MARKETPLACE_ABI } from "../contracts/abis/MarketplaceABI";
import { GOVERNANCE_ABI } from "../contracts/abis/GovernanceABI";
import { BaseContractService } from "./BaseContractService";

class ContractServiceClass extends BaseContractService {
  // Method to check if provider and signer are available
  async ensureConnected() {
    if (!this.provider) {
      throw new Error("Provider not initialized. Please connect to a wallet.");
    }
    
    if (!this.signer) {
      throw new Error("Signer not initialized. Please connect to a wallet.");
    }
  }

  async getSpinWheelContract(withSigner = true) {
    try {
      if (withSigner) {
        await this.ensureConnected();
        return new ethers.Contract(contractAddresses.spinWheel, SpinWheelABI, this.signer);
      } else {
        return new ethers.Contract(contractAddresses.spinWheel, SpinWheelABI, this.provider);
      }
    } catch (error) {
      console.error("Error getting SpinWheel contract:", error);
      throw error;
    }
  }
  
  async getMarketplaceContract(withSigner = true) {
    try {
      if (withSigner) {
        await this.ensureConnected();
        return new ethers.Contract(contractAddresses.marketplace, MARKETPLACE_ABI, this.signer);
      } else {
        return new ethers.Contract(contractAddresses.marketplace, MARKETPLACE_ABI, this.provider);
      }
    } catch (error) {
      console.error("Error getting Marketplace contract:", error);
      throw error;
    }
  }
  
  async getGovernanceContract(withSigner = true) {
    try {
      if (withSigner) {
        await this.ensureConnected();
        return new ethers.Contract(contractAddresses.governance, GOVERNANCE_ABI, this.signer);
      } else {
        return new ethers.Contract(contractAddresses.governance, GOVERNANCE_ABI, this.provider);
      }
    } catch (error) {
      console.error("Error getting Governance contract:", error);
      throw error;
    }
  }
}

export const contractService = new ContractServiceClass();
