
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { toast } from "@/hooks/use-toast";
import { networkInfo } from "@/constants/contracts";
import { checkNetwork, switchNetwork } from "@/utils/blockchainUtils";

export interface WalletConnectionResult {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
}

export const useWalletConnection = (): WalletConnectionResult => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  
  // Check for saved wallet on mount
  useEffect(() => {
    const checkSavedConnection = async () => {
      const savedAddress = localStorage.getItem('walletAddress');
      
      if (savedAddress && typeof window.ethereum !== 'undefined') {
        try {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await web3Provider.listAccounts();
          
          if (accounts.length > 0 && accounts[0].toLowerCase() === savedAddress.toLowerCase()) {
            const web3Signer = web3Provider.getSigner();
            setAddress(accounts[0]);
            setProvider(web3Provider);
            setSigner(web3Signer);
            
            // Get chain ID
            const network = await web3Provider.getNetwork();
            setChainId(network.chainId);
            
            // Check if we're on BSC network
            if (network.chainId !== networkInfo.chainId) {
              toast({
                title: "Wrong Network Detected",
                description: `Please switch to ${networkInfo.name} to use all features.`,
                variant: "warning",
              });
            }
          } else {
            // Clear saved address if we can't match it
            localStorage.removeItem('walletAddress');
          }
        } catch (error) {
          console.error("Error restoring wallet connection:", error);
          localStorage.removeItem('walletAddress');
        }
      }
    };
    
    checkSavedConnection();
  }, []);

  // Setup event listeners for wallet events
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;
    
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnect();
      } else if (accounts[0] !== address) {
        // User switched accounts
        setAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
        
        toast({
          title: "Account Changed",
          description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
        });
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
  }, [address]);

  const connect = useCallback(async (): Promise<boolean> => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "No Wallet Extension Detected",
        description: "Please install Metamask or another Web3 wallet extension to continue.",
        variant: "destructive",
      });
      return false;
    }

    setIsConnecting(true);
    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Request accounts first to ensure user interaction
      const accounts = await web3Provider.send('eth_requestAccounts', []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned from wallet");
      }
      
      const walletAddress = accounts[0];
      const web3Signer = web3Provider.getSigner();
      
      // Check network after connection
      const network = await web3Provider.getNetwork();
      setChainId(network.chainId);
      
      if (network.chainId !== networkInfo.chainId) {
        toast({
          title: "Wrong Network",
          description: `Please switch to ${networkInfo.name} (BSC Mainnet) to continue.`,
          variant: "destructive",
        });
        
        const switched = await switchNetwork();
        if (!switched) {
          toast({
            title: "Network Switch Required",
            description: `Please switch to ${networkInfo.name} manually in your wallet.`,
            variant: "destructive",
          });
        }
      }
      
      // Set wallet details
      setAddress(walletAddress);
      setProvider(web3Provider);
      setSigner(web3Signer);
      
      localStorage.setItem('walletAddress', walletAddress);
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`,
      });
      
      return true;
    } catch (error: any) {
      console.error("Wallet Connection Error:", error);
      
      let errorMessage = "Failed to connect to wallet.";
      
      if (error.code === 4001) {
        errorMessage = "You rejected the connection request.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Connection Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    localStorage.removeItem('walletAddress');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully.",
    });
  }, []);

  return {
    connect,
    disconnect,
    isConnecting,
    isConnected: !!address,
    address,
    chainId,
    provider,
    signer
  };
};
