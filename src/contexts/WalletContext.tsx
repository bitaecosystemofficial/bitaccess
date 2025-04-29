
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { networkInfo } from "@/constants/contracts";
import { ethers } from "ethers";
import { checkNetwork, switchNetwork } from "@/utils/blockchainUtils";

// Add ethereum to Window interface
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  balance: number;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  chainId: number | null;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isConnecting: false,
  balance: 0,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  provider: null,
  signer: null,
  chainId: null,
});

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  
  const isConnected = !!address;

  // Check for saved wallet on mount
  useEffect(() => {
    const checkConnection = async () => {
      const savedAddress = localStorage.getItem('walletAddress');
      
      if (savedAddress && typeof window.ethereum !== 'undefined') {
        try {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          const web3Signer = web3Provider.getSigner();
          const accounts = await web3Provider.listAccounts();
          
          if (accounts.length > 0) {
            const currentAddress = accounts[0];
            setAddress(currentAddress);
            setProvider(web3Provider);
            setSigner(web3Signer);
            
            // Get chain ID
            const network = await web3Provider.getNetwork();
            setChainId(network.chainId);
            
            // Get token balance
            try {
              const tokenBalance = await fetchTokenBalance(currentAddress, web3Provider);
              setBalance(tokenBalance);
            } catch (error) {
              console.error("Error fetching token balance:", error);
              setBalance(Math.floor(Math.random() * 10000) / 100); // Fallback
            }
            
            // Check if network is correct
            if (!await checkNetwork()) {
              toast({
                title: "Wrong Network",
                description: `Please switch to ${networkInfo.name} to use this application.`,
                variant: "destructive",
              });
            }
          }
        } catch (error) {
          console.error("Error restoring wallet connection:", error);
          localStorage.removeItem('walletAddress');
        }
      }
    };
    
    checkConnection();
  }, []);

  // Setup event listeners for wallet
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;
    
    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else if (accounts[0] !== address) {
        // User switched accounts
        setAddress(accounts[0]);
        
        if (provider) {
          try {
            const tokenBalance = await fetchTokenBalance(accounts[0], provider);
            setBalance(tokenBalance);
          } catch (error) {
            console.error("Error fetching token balance:", error);
            setBalance(Math.floor(Math.random() * 10000) / 100); // Fallback
          }
        }
      }
    };
    
    const handleChainChanged = (chainIdHex: string) => {
      const newChainId = parseInt(chainIdHex, 16);
      setChainId(newChainId);
      
      // Check if we're on the right network
      if (newChainId !== networkInfo.chainId) {
        toast({
          title: "Network Changed",
          description: `You've switched to a different network. Please switch to ${networkInfo.name} to use all features.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Network Changed",
          description: `Successfully connected to ${networkInfo.name}.`,
        });
      }
    };
    
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [address, provider]);

  // Function to fetch token balance from contract
  const fetchTokenBalance = async (walletAddress: string, provider: ethers.providers.Web3Provider) => {
    try {
      // This will be replaced with actual contract calls in production
      // For demo, return a random balance
      return Math.floor(Math.random() * 10000) / 100;
    } catch (error) {
      console.error("Error fetching token balance:", error);
      throw error;
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "No Wallet Extension Detected",
        description: "Please install Metamask or another Web3 wallet extension to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      // Check if we're on the correct network
      const isCorrectNetwork = await checkNetwork();
      if (!isCorrectNetwork) {
        // Ask user to switch network
        toast({
          title: "Wrong Network",
          description: `Switching to ${networkInfo.name}...`,
        });
        const switched = await switchNetwork();
        if (!switched) {
          throw new Error(`Unable to switch to ${networkInfo.name}. Please switch manually.`);
        }
      }
      
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await web3Provider.send('eth_requestAccounts', []);
      const walletAddress = accounts[0];
      const web3Signer = web3Provider.getSigner();
      
      // Get network info
      const network = await web3Provider.getNetwork();
      
      setAddress(walletAddress);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setChainId(network.chainId);
      
      // Get token balance
      try {
        const tokenBalance = await fetchTokenBalance(walletAddress, web3Provider);
        setBalance(tokenBalance);
      } catch (error) {
        console.error("Error fetching token balance:", error);
        setBalance(Math.floor(Math.random() * 10000) / 100); // Fallback
      }
      
      localStorage.setItem('walletAddress', walletAddress);
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`,
      });
    } catch (error: any) {
      console.error("Wallet Connection Error:", error);
      toast({
        title: "Connection Error",
        description: error.message || "Failed to connect to wallet.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setBalance(0);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    localStorage.removeItem('walletAddress');
    toast({
      title: "Wallet Disconnected",
      description: "Wallet disconnected successfully.",
    });
  };

  return (
    <WalletContext.Provider value={{ 
      address, 
      isConnected, 
      isConnecting, 
      balance, 
      connectWallet, 
      disconnectWallet,
      provider,
      signer,
      chainId
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
