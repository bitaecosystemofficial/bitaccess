
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { SpinWheelABI } from '@/contracts/abis/SpinWheelABI';
import { BaseContractService } from './BaseContractService';

export class SpinWheelService extends BaseContractService {
  async getSpinWheelContract() {
    return new ethers.Contract(contractAddresses.spinWheel, SpinWheelABI, this.signer);
  }

  async spin() {
    const contract = await this.getSpinWheelContract();
    const tx = await contract.spin();
    return tx.wait();
  }

  async getSpinCooldown(address: string) {
    const contract = await this.getSpinWheelContract();
    return contract.getUserLastSpin(address);
  }
}

export const spinWheelService = new SpinWheelService();
