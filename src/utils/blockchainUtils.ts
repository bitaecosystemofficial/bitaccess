
import { toast } from "@/hooks/use-toast";
import { contractAddresses, networkInfo } from "@/constants/contracts";

// Enhanced transaction function with better error handling
export const mockTransaction = async (): Promise<string> => {
  try {
    // Simulate network delay (0.5-2 seconds)
    const delay = 500 + Math.random() * 1500;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Generate a random transaction hash
    const txHash = '0x' + Array(64).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)).join('');
    
    console.log(`Transaction submitted: ${txHash}`);
    return txHash;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
};

// Check if the network is correct with enhanced error handling
export const checkNetwork = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
    console.error("No Ethereum provider detected");
    return false;
  }
  
  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(chainId, 16);
    
    if (currentChainId !== networkInfo.chainId) {
      console.warn(`Wrong network detected. Connected to ${currentChainId}, but need ${networkInfo.chainId} (${networkInfo.name})`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error checking network:", error);
    return false;
  }
};

// Switch to the correct network with enhanced user feedback
export const switchNetwork = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
    toast({
      title: "Wallet Not Found",
      description: "No Ethereum provider detected. Please install a wallet extension like MetaMask.",
      variant: "destructive",
    });
    return false;
  }
  
  try {
    // Format chainId as hex
    const chainIdHex = `0x${networkInfo.chainId.toString(16)}`;
    
    try {
      // First try to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
      
      toast({
        title: "Network Changed",
        description: `Successfully connected to ${networkInfo.name}.`,
      });
      
      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdHex,
                chainName: networkInfo.name,
                nativeCurrency: {
                  name: networkInfo.currency,
                  symbol: networkInfo.currency,
                  decimals: 18,
                },
                rpcUrls: [networkInfo.rpcUrl],
                blockExplorerUrls: [networkInfo.blockExplorerUrl],
              },
            ],
          });
          
          toast({
            title: "BSC Testnet Added",
            description: `${networkInfo.name} has been added to your wallet.`,
          });
          
          return true;
        } catch (addError) {
          console.error("Error adding chain:", addError);
          toast({
            title: "Network Addition Failed",
            description: "Failed to add BSC Testnet to your wallet.",
            variant: "destructive",
          });
          return false;
        }
      }
      
      // User rejected the request
      if (switchError.code === 4001) {
        toast({
          title: "Network Switch Rejected",
          description: "You rejected the request to switch networks.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Network Switch Failed",
          description: "Failed to switch to BSC Testnet in your wallet.",
          variant: "destructive",
        });
      }
      
      console.error("Error switching network:", switchError);
      return false;
    }
  } catch (error) {
    console.error("General error switching network:", error);
    toast({
      title: "Network Error",
      description: "An unexpected error occurred while switching networks.",
      variant: "destructive",
    });
    return false;
  }
};

// Get contract addresses for the current network
export const getContractAddresses = () => {
  return contractAddresses;
};
