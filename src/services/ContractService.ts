
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
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

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
    } else {
      throw new Error('No Ethereum provider found');
    }
  }

  // Token Contract
  private async getTokenContract() {
    return new ethers.Contract(contractAddresses.token, TokenABI, this.signer);
  }

  // Airdrop Contract
  private async getAirdropContract() {
    return new ethers.Contract(contractAddresses.airdrop, AirdropABI, this.signer);
  }

  // Presale Contract
  private async getPresaleContract() {
    return new ethers.Contract(contractAddresses.presale, PresaleABI, this.signer);
  }

  // Staking Contract
  private async getStakingContract() {
    return new ethers.Contract(contractAddresses.staking, StakingABI, this.signer);
  }

  // Swap Contract
  private async getSwapContract() {
    return new ethers.Contract(contractAddresses.swap, SwapABI, this.signer);
  }

  // Merchant Contract
  private async getMerchantContract() {
    return new ethers.Contract(contractAddresses.merchants, MerchantABI, this.signer);
  }

  // SpinWheel Contract
  private async getSpinWheelContract() {
    return new ethers.Contract(contractAddresses.spinWheel, SpinWheelABI, this.signer);
  }

  // Education Contract
  private async getEducationContract() {
    return new ethers.Contract(contractAddresses.education, EducationABI, this.signer);
  }

  // Common contract interaction methods
  async getBalance(address: string) {
    const contract = await this.getTokenContract();
    return contract.balanceOf(address);
  }

  // Add more methods for specific contract interactions...
}

export const contractService = new ContractService();
