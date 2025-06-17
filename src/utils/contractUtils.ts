
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useWallet } from "@/contexts/WalletContext";
// Fix imports for the hooks
import { useEducation } from "@/hooks/useEducation";
import { useStaking } from "@/hooks/useStaking";

// Helper function to calculate something based on blockchain data
export const calculateSomething = (value: number) => {
  return value * 1.5;
};

// Example of a React Query hook that fetches data from a contract
export const useContractData = (contractAddress: string, functionName: string) => {
  const { isConnected, provider } = useWallet();

  return useQuery({
    queryKey: [functionName, contractAddress],
    queryFn: async () => {
      if (!provider || !isConnected) {
        throw new Error("Wallet not connected");
      }

      // Implementation would depend on the specific contract and function
      console.log(`Fetching data from ${contractAddress}.${functionName}`);
      return "Mock Contract Data";
    },
    enabled: isConnected && !!provider
  });
};

// Example of a hook that combines data from multiple sources
export const useCombinedData = () => {
  const { courseProgress } = useEducation();
  const { stakingData } = useStaking();

  return useQuery({
    queryKey: ["combinedData"],
    queryFn: async () => {
      // Process and combine data from different sources
      return {
        stakingInfo: stakingData || "No staking data",
        educationInfo: courseProgress.length > 0 ? courseProgress : "No education data"
      };
    },
    enabled: !!stakingData || (courseProgress && courseProgress.length > 0)
  });
};

// Function to format ethers BigNumber to user-friendly string
export const formatBigNumber = (value: ethers.BigNumber, decimals = 18): string => {
  try {
    return ethers.utils.formatUnits(value, decimals);
  } catch (error) {
    console.error("Error formatting BigNumber:", error);
    return "0";
  }
};

// Function to parse user input string to ethers BigNumber
export const parseBigNumber = (value: string, decimals = 18): ethers.BigNumber => {
  try {
    // Remove any non-numeric characters except decimal point
    const sanitized = value.replace(/[^\d.]/g, "");
    return ethers.utils.parseUnits(sanitized || "0", decimals);
  } catch (error) {
    console.error("Error parsing to BigNumber:", error);
    return ethers.BigNumber.from(0);
  }
};
