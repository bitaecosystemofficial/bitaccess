
import { ethers } from 'ethers';
import { useWallet } from '@/contexts/WalletContext';
import { useStaking } from '@/hooks/useStaking';
import { useSwap } from '@/hooks/useSwap';
import { useMarketplace } from '@/hooks/useMarketplace';
import { useEducation } from '@/hooks/useEducation';
import { useGovernance } from '@/hooks/useGovernance';
import { useSmartContract } from '@/hooks/useSmartContract';
import { contractAddresses } from '@/constants/contracts';

// Get currently selected network
export const getNetworkName = async (provider: ethers.providers.Web3Provider) => {
  const network = await provider.getNetwork();
  return network.name;
};

// Check if user is on Binance Smart Chain
export const isBinanceSmartChain = async (provider: ethers.providers.Web3Provider) => {
  const network = await provider.getNetwork();
  // BSC mainnet chainId = 56, BSC testnet chainId = 97
  return network.chainId === 56 || network.chainId === 97;
};

// Switch to Binance Smart Chain
export const switchToBSC = async (provider: ethers.providers.Web3Provider) => {
  try {
    await provider.send('wallet_switchEthereumChain', [{ chainId: '0x38' }]); // BSC mainnet chainId
    return true;
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await provider.send('wallet_addEthereumChain', [
          {
            chainId: '0x38',
            chainName: 'Binance Smart Chain',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: ['https://bsc-dataseed1.binance.org'],
            blockExplorerUrls: ['https://bscscan.com'],
          },
        ]);
        return true;
      } catch (addError) {
        console.error('Failed to add BSC network:', addError);
        return false;
      }
    }
    console.error('Failed to switch to BSC network:', error);
    return false;
  }
};

// Initialize hooks
export const initializeContractHooks = () => {
  const { provider } = useWallet();
  
  // Initialize all contract hooks 
  useStaking();
  useSwap();
  useMarketplace();
  useEducation();
  useGovernance();
  useSmartContract("token", contractAddresses.token);
};

// Format contract event date
export const formatEventDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};
