
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { networkInfo } from "@/constants/contracts";

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
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isConnecting: false,
  balance: 0,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const isConnected = !!address;

  // Check for saved wallet on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setAddress(savedAddress);
      // Mock balance for demo purposes
      setBalance(Math.floor(Math.random() * 10000) / 100);
    }
  }, []);

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
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      setAddress(walletAddress);
      // Mock balance for demo purposes
      const mockBalance = Math.floor(Math.random() * 10000) / 100;
      setBalance(mockBalance);
      localStorage.setItem('walletAddress', walletAddress);
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletAddress}`,
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
      disconnectWallet 
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
