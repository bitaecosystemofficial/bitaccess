
import { ethers } from 'ethers';
import { contractAddresses } from '@/constants/contracts';
import { PresaleABI } from '@/contracts/abis/PresaleABI';
import { BaseContractService } from './BaseContractService';

export class PresaleService extends BaseContractService {
  async getPresaleContract() {
    return new ethers.Contract(contractAddresses.presale, PresaleABI, this.signer);
  }

  async buyWithBNB(amount: ethers.BigNumber) {
    const contract = await this.getPresaleContract();
    const tx = await contract.buyWithBNB({ value: amount });
    return tx.wait();
  }

  async buyWithUSDT(amount: ethers.BigNumber) {
    const contract = await this.getPresaleContract();
    const tx = await contract.buyWithUSDT(amount);
    return tx.wait();
  }

  async getPresaleInfo() {
    const contract = await this.getPresaleContract();
    const [
      phase,
      bnbRate,
      usdtRate,
      availableTokens,
      totalSupply,
      softCap,
      hardCap,
      endTime,
      soldTokens
    ] = await Promise.all([
      contract.getCurrentPhase(),
      contract.getBNBRate(),
      contract.getUSDTRate(),
      contract.getAvailableTokens(),
      contract.getTotalSupply(),
      contract.getSoftCap(),
      contract.getHardCap(),
      contract.getEndTime(),
      contract.getSoldTokens()
    ]);
    
    return { phase, bnbRate, usdtRate, availableTokens, totalSupply, softCap, hardCap, endTime, soldTokens };
  }

  async getBonusTiers() {
    const contract = await this.getPresaleContract();
    const [bnbTiers, usdtTiers] = await Promise.all([
      contract.getBNBBonusTiers(),
      contract.getUSDTBonusTiers()
    ]);
    
    return { bnbTiers, usdtTiers };
  }
}

export const presaleService = new PresaleService();
