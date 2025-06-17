
import { ethers } from 'ethers';
import { BaseContractService } from './BaseContractService';
import { StakingABI } from '../contracts/abis/StakingABI';
import { AirdropABI } from '../contracts/abis/AirdropABI';

// Contract addresses
const STAKING_CONTRACT_ADDRESS = '0x742d35Cc6609690d3E8855A4CC8faa9b0E37c8aa';
const AIRDROP_CONTRACT_ADDRESS = '0x3b2c9a6dE0F4Ff60fCA3C25e13e77e05FffFf444';

export class ContractService extends BaseContractService {
  private stakingContract: ethers.Contract | null = null;
  private airdropContract: ethers.Contract | null = null;

  async initializeContracts() {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    this.stakingContract = new ethers.Contract(
      STAKING_CONTRACT_ADDRESS,
      StakingABI,
      this.signer
    );

    this.airdropContract = new ethers.Contract(
      AIRDROP_CONTRACT_ADDRESS,
      AirdropABI,
      this.signer
    );
  }

  getStakingContract(): ethers.Contract {
    if (!this.stakingContract) {
      throw new Error('Staking contract not initialized');
    }
    return this.stakingContract;
  }

  getAirdropContract(): ethers.Contract {
    if (!this.airdropContract) {
      throw new Error('Airdrop contract not initialized');
    }
    return this.airdropContract;
  }
}

export const contractService = new ContractService();
