
import { contractAddresses, networkInfo } from "@/constants/contracts";

// Mock transaction function - in a real app, this would use web3.js or ethers.js
export const mockTransaction = async (): Promise<string> => {
  // Simulate network delay (0.5-2 seconds)
  const delay = 500 + Math.random() * 1500;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Generate a random transaction hash
  const txHash = '0x' + Array(64).fill(0).map(() => 
    Math.floor(Math.random() * 16).toString(16)).join('');
  
  console.log(`Transaction submitted: ${txHash}`);
  return txHash;
};

// Check if the network is correct
export const checkNetwork = async (): Promise<boolean> => {
  if (typeof window.ethereum === 'undefined') {
    console.error("No Ethereum provider detected");
    return false;
  }
  
  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(chainId, 16);
    
    if (currentChainId !== networkInfo.chainId) {
      console.warn(`Wrong network detected. Expected ${networkInfo.chainId}, got ${currentChainId}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error checking network:", error);
    return false;
  }
};

// Switch to the correct network
export const switchNetwork = async (): Promise<boolean> => {
  if (typeof window.ethereum === 'undefined') {
    console.error("No Ethereum provider detected");
    return false;
  }
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${networkInfo.chainId.toString(16)}` }],
    });
    return true;
  } catch (error) {
    console.error("Error switching network:", error);
    return false;
  }
};

// Get contract addresses for the current network
export const getContractAddresses = () => {
  return contractAddresses;
};
