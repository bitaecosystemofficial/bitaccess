
import { ethers } from 'ethers';

export class BaseContractService {
  protected provider: ethers.providers.Web3Provider;
  protected signer: ethers.Signer;
  protected eventSubscriptions: Map<string, ethers.Contract>;

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      this.eventSubscriptions = new Map();
      this.initializeProviderEvents();
    } else {
      throw new Error('No Ethereum provider found');
    }
  }

  private initializeProviderEvents() {
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });
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
