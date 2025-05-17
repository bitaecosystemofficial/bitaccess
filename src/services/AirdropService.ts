
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { AirdropABI } from '@/contracts/abis/AirdropABI';
import { BaseContractService } from './BaseContractService';

export class AirdropService extends BaseContractService {
  async getAirdropContract(withEvents = false) {
    const contract = new ethers.Contract(contractAddresses.airdrop, AirdropABI, this.signer);
    if (withEvents && !this.eventSubscriptions.has('airdrop')) {
      this.eventSubscriptions.set('airdrop', contract);
      console.log('Subscribed to Airdrop events');
    }
    return contract;
  }

  async claimAirdrop() {
    const contract = await this.getAirdropContract();
    const tx = await contract.claim();
    return tx.wait();
  }

  async checkAirdropEligibility(address: string) {
    const contract = await this.getAirdropContract();
    return contract.isEligible(address);
  }

  async verifyAirdropTask(address: string, taskId: number) {
    const contract = await this.getAirdropContract();
    const tx = await contract.verifyTasks(address, taskId);
    return tx.wait();
  }

  async subscribeToAirdropEvents(callback: (event: any) => void) {
    const contract = await this.getAirdropContract(true);
    contract.on('TokensClaimed', callback);
    contract.on('TaskCompleted', callback);
    console.log('Subscribed to Airdrop events');
  }
}

export const airdropService = new AirdropService();
