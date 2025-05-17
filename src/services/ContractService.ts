
import { ethers } from "ethers";
import { contractAddresses } from "../constants/contracts";
import { SpinWheelABI } from "../contracts/abis/SpinWheelABI";
import { MARKETPLACE_ABI } from "../contracts/abis/MarketplaceABI";
import { GOVERNANCE_ABI } from "../contracts/abis/GovernanceABI";
import { BaseContractService } from "./BaseContractService";
import { AirdropABI } from "../contracts/abis/AirdropABI";
import { PresaleABI } from "../contracts/abis/PresaleABI";
import { EducationABI } from "../contracts/abis/EducationABI";

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

  // Adding missing methods for Airdrop functionality
  async getAirdropContract(withSigner = true) {
    try {
      if (withSigner) {
        await this.ensureConnected();
        return new ethers.Contract(contractAddresses.airdrop, AirdropABI, this.signer);
      } else {
        return new ethers.Contract(contractAddresses.airdrop, AirdropABI, this.provider);
      }
    } catch (error) {
      console.error("Error getting Airdrop contract:", error);
      throw error;
    }
  }

  async checkAirdropEligibility(address: string) {
    try {
      const contract = await this.getAirdropContract(false);
      return await contract.isEligible(address);
    } catch (error) {
      console.error("Error checking airdrop eligibility:", error);
      throw error;
    }
  }

  async claimAirdrop() {
    try {
      const contract = await this.getAirdropContract();
      const tx = await contract.claim();
      return await tx.wait();
    } catch (error) {
      console.error("Error claiming airdrop:", error);
      throw error;
    }
  }

  async verifyAirdropTask(address: string, taskId: number) {
    try {
      const contract = await this.getAirdropContract();
      const tx = await contract.verifyTasks(address, taskId);
      return await tx.wait();
    } catch (error) {
      console.error("Error verifying airdrop task:", error);
      throw error;
    }
  }

  // Adding missing methods for Presale functionality
  async getPresaleContract(withSigner = true) {
    try {
      if (withSigner) {
        await this.ensureConnected();
        return new ethers.Contract(contractAddresses.presale, PresaleABI, this.signer);
      } else {
        return new ethers.Contract(contractAddresses.presale, PresaleABI, this.provider);
      }
    } catch (error) {
      console.error("Error getting Presale contract:", error);
      throw error;
    }
  }

  async getPresaleInfo() {
    try {
      const contract = await this.getPresaleContract(false);
      const phase = await contract.getCurrentPhase();
      const price = await contract.getTokenPrice();
      const available = await contract.getAvailableTokens();
      const endTime = await contract.getEndTime();
      
      return { phase, price, available, endTime };
    } catch (error) {
      console.error("Error fetching presale info:", error);
      throw error;
    }
  }

  async buyPresaleTokens(amount: number) {
    try {
      const contract = await this.getPresaleContract();
      const tx = await contract.buyTokens(amount);
      return await tx.wait();
    } catch (error) {
      console.error("Error buying presale tokens:", error);
      throw error;
    }
  }

  // Adding missing methods for Education functionality
  async getEducationContract(withSigner = true) {
    try {
      if (withSigner) {
        await this.ensureConnected();
        return new ethers.Contract(contractAddresses.education, EducationABI, this.signer);
      } else {
        return new ethers.Contract(contractAddresses.education, EducationABI, this.provider);
      }
    } catch (error) {
      console.error("Error getting Education contract:", error);
      throw error;
    }
  }
}

export const contractService = new ContractServiceClass();
