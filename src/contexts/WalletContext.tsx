
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ethers } from "ethers";
import { useWalletConnection } from "@/hooks/useWalletConnection";

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
  const {
    connect,
    disconnect,
    isConnecting,
    isConnected,
    address,
    chainId,
    provider,
    signer
  } = useWalletConnection();
  
  const [balance, setBalance] = useState<number>(0);
  
  // Fetch token balance when address changes
  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (!address || !provider) return;
      
      try {
        // This is a mock implementation for now
        // In a real app, you'd call the actual token contract
        const mockBalance = Math.floor(Math.random() * 10000) / 100;
        setBalance(mockBalance);
      } catch (error) {
        console.error("Error fetching token balance:", error);
        setBalance(0);
      }
    };
    
    if (isConnected) {
      fetchTokenBalance();
    } else {
      setBalance(0);
    }
  }, [address, isConnected, provider]);

  const connectWallet = async () => {
    await connect();
  };

  const disconnectWallet = () => {
    disconnect();
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
