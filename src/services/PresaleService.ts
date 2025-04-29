
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { PresaleABI } from '@/contracts/abis/PresaleABI';
import { BaseContractService } from './BaseContractService';

export class PresaleService extends BaseContractService {
  async getPresaleContract() {
    return new ethers.Contract(contractAddresses.presale, PresaleABI, this.signer);
  }

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
}

export const presaleService = new PresaleService();
