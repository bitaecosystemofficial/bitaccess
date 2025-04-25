
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { networkInfo } from '@/utils/contractUtils';

export interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  balance: string;
  networkName: string;
  chainId: number;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  addBscNetwork: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState('0');
  const [networkName, setNetworkName] = useState(networkInfo.name);
  const [chainId, setChainId] = useState(networkInfo.chainId);

  // Check for previous wallet connection
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setAddress(savedAddress);
      // In a real app, we would verify the connection is still active
    }
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection - in a real app, you would use a provider like ethers.js
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock connection successful
      const mockAddress = '0x' + Array(40).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)).join('');
      
      setAddress(mockAddress);
      localStorage.setItem('walletAddress', mockAddress);
      
      // Mock balance
      setBalance('1.245');
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${mockAddress.substring(0, 6)}...${mockAddress.substring(38)} on ${networkName}`,
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setBalance('0');
    localStorage.removeItem('walletAddress');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const addBscNetwork = async () => {
    try {
      // In a real app, this would interact with the actual browser wallet
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Network Added",
        description: `${networkInfo.name} has been added to your wallet.`,
      });
    } catch (error) {
      console.error("Error adding network:", error);
      toast({
        title: "Network Addition Failed",
        description: `Could not add ${networkInfo.name} to your wallet.`,
        variant: "destructive",
      });
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        isConnecting,
        balance,
        networkName,
        chainId,
        connectWallet,
        disconnectWallet,
        addBscNetwork
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
