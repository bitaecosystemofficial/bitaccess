
import { ethers } from "ethers";
import { PresaleABI } from "../contracts/abis/PresaleABI";
import { StakingABI } from "../contracts/abis/StakingABI";
import { MARKETPLACE_ABI } from "../contracts/abis/MarketplaceABI";
import { TokenABI } from "../contracts/abis/TokenABI";
import { AirdropABI } from "../contracts/abis/AirdropABI";
import { SwapABI } from "../contracts/abis/SwapABI";
import { GOVERNANCE_ABI } from "../contracts/abis/GovernanceABI";
import { contractAddresses } from "../constants/contracts";

export type ContractType = 
  'presale' | 'staking' | 'marketplace' | 'token' | 
  'airdrop' | 'swap' | 'governance' | 'merchants' | 'membership' | 'education';

export const getContractABI = (contractType: ContractType) => {
  switch(contractType) {
    case 'presale':
      return PresaleABI;
    case 'staking':
      return StakingABI;
    case 'marketplace':
      return MARKETPLACE_ABI;
    case 'token':
      return TokenABI;
    case 'airdrop':
      return AirdropABI;
    case 'swap':
      return SwapABI;
    case 'governance':
      return GOVERNANCE_ABI;
    default:
      throw new Error(`Contract ABI not found for ${contractType}`);
  }
};

export const getContractAddress = (contractType: ContractType): string => {
  switch(contractType) {
    case 'presale':
      return contractAddresses.presale;
    case 'staking':
      return contractAddresses.staking;
    case 'marketplace':
      return contractAddresses.marketplace;
    case 'token':
      return contractAddresses.token;
    case 'airdrop':
      return contractAddresses.airdrop;
    case 'swap':
      return contractAddresses.swap;
    case 'governance':
      return contractAddresses.governance;
    case 'merchants':
      return contractAddresses.merchants;
    case 'membership':
      return contractAddresses.membership;
    case 'education':
      return contractAddresses.education;
    default:
      throw new Error(`Contract address not found for ${contractType}`);
  }
};

export const createContract = (
  contractType: ContractType,
  provider: ethers.providers.Web3Provider
): ethers.Contract => {
  const contractABI = getContractABI(contractType);
  const contractAddress = getContractAddress(contractType);
  
  return new ethers.Contract(
    contractAddress,
    contractABI,
    provider
  );
};

// Export a singleton instance of the contract service
export const contractService = {
  getContract: createContract,
  getAirdropContract: async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      return createContract('airdrop', provider);
    }
    throw new Error('Ethereum provider not available');
  },
  getEducationContract: async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      return createContract('education', provider);
    }
    throw new Error('Ethereum provider not available');
  },
  verifyAirdropTask: async (address: string, taskId: number) => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = createContract('airdrop', provider).connect(signer);
      const tx = await contract.verifyTask(address, taskId);
      return await tx.wait();
    }
    throw new Error('Ethereum provider not available');
  }
};
