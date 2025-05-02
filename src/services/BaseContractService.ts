
import { ethers } from 'ethers';

export class BaseContractService {
  protected provider: ethers.providers.Provider;
  protected signer: ethers.Signer;
  protected eventSubscriptions: Map<string, ethers.Contract>;

  constructor() {
    this.eventSubscriptions = new Map();
    
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.initializeProviderEvents();
      } catch (error) {
        console.error('Error initializing Ethereum provider:', error);
        // Create fallback provider for read-only operations
        this.provider = new ethers.providers.JsonRpcProvider(
          'https://data-seed-prebsc-1-s1.binance.org:8545/'
        );
        this.signer = new ethers.VoidSigner("0x0000000000000000000000000000000000000000", this.provider);
      }
    } else {
      // Fallback for environments without ethereum
      this.provider = new ethers.providers.JsonRpcProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545/'
      );
      this.signer = new ethers.VoidSigner("0x0000000000000000000000000000000000000000", this.provider);
    }
  }

  private initializeProviderEvents() {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      window.ethereum.on('chainChanged', () => {
        // Reload only if we're in a browser environment
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      });

      window.ethereum.on('accountsChanged', () => {
        // Reload only if we're in a browser environment
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      });
    }
  }

  // Method to ensure signer is ready
  protected async ensureSigner(): Promise<ethers.Signer> {
    if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
      throw new Error('No Ethereum provider found');
    }

    try {
      const web3Provider = this.provider as ethers.providers.Web3Provider;
      // Check if we already have accounts
      const accounts = await web3Provider.listAccounts();
      
      if (!accounts || accounts.length === 0) {
        // If no accounts, request them
        await web3Provider.send('eth_requestAccounts', []);
        // Get the signer again to ensure it's updated
        this.signer = web3Provider.getSigner();
      }
      
      return this.signer;
    } catch (error) {
      console.error('Error ensuring signer:', error);
      throw new Error('Failed to get signer. Please connect your wallet.');
    }
  }

  // Cleanup method for event subscriptions
  cleanup(serviceName?: string) {
    if (serviceName) {
      const contract = this.eventSubscriptions.get(serviceName);
      if (contract) {
        contract.removeAllListeners();
        this.eventSubscriptions.delete(serviceName);
        console.log(`Cleaned up ${serviceName} contract event subscriptions`);
      }
    } else {
      this.eventSubscriptions.forEach(contract => {
        contract.removeAllListeners();
      });
      this.eventSubscriptions.clear();
      console.log('Cleaned up all contract event subscriptions');
    }
  }
}
