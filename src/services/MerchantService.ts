
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { MerchantABI } from '@/contracts/abis/MerchantABI';
import { BaseContractService } from './BaseContractService';

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
}

export const merchantService = new MerchantService();
