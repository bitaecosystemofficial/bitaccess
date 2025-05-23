
import { ethers } from "ethers";
import { PresaleABI } from "../contracts/abis/PresaleABI";
import { StakingABI } from "../contracts/abis/StakingABI";
import { MarketplaceABI } from "../contracts/abis/MarketplaceABI";
import { TokenABI } from "../contracts/abis/TokenABI";
import { AirdropABI } from "../contracts/abis/AirdropABI";
import { SwapABI } from "../contracts/abis/SwapABI";
import { GovernanceABI } from "../contracts/abis/GovernanceABI";
import { contractAddresses } from "../constants/contracts";

export type ContractType = 
  'presale' | 'staking' | 'marketplace' | 'token' | 
  'airdrop' | 'swap' | 'governance' | 'merchant' | 'membership';

export const getContractABI = (contractType: ContractType) => {
  switch(contractType) {
    case 'presale':
      return PresaleABI;
    case 'staking':
      return StakingABI;
    case 'marketplace':
      return MarketplaceABI;
    case 'token':
      return TokenABI;
    case 'airdrop':
      return AirdropABI;
    case 'swap':
      return SwapABI;
    case 'governance':
      return GovernanceABI;
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
    case 'merchant':
      return contractAddresses.merchant;
    case 'membership':
      return contractAddresses.membership;
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

