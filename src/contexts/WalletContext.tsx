import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { networkInfo } from "@/constants/contracts";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const isConnected = !!address;

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "No Wallet Extension Detected",
        description: "Please install Metamask or another Web3 wallet extension to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      setAddress(walletAddress);
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
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    localStorage.removeItem('walletAddress');
    toast({
      title: "Wallet Disconnected",
      description: "Wallet disconnected successfully.",
    });
  };

  return (
    <WalletContext.Provider value={{ address, isConnected, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
