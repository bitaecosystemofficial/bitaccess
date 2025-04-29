
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { TokenABI } from '@/contracts/abis/TokenABI';
import { BaseContractService } from './BaseContractService';

export class TokenService extends BaseContractService {
  async getTokenContract(withEvents = false) {
    const contract = new ethers.Contract(contractAddresses.token, TokenABI, this.signer);
    if (withEvents && !this.eventSubscriptions.has('token')) {
      this.eventSubscriptions.set('token', contract);
      console.log('Subscribed to Token events');
    }
    return contract;
  }

  async getBalance(address: string) {
    const contract = await this.getTokenContract();
    return contract.balanceOf(address);
  }

  async subscribeToTokenTransfers(callback: (from: string, to: string, amount: ethers.BigNumber) => void) {
    const contract = await this.getTokenContract(true);
    contract.on('Transfer', callback);
    console.log('Subscribed to Token transfers');
  }
}

export const tokenService = new TokenService();
