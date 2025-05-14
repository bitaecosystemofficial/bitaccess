
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { toast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";

interface UseSmartContractOptions {
  contractAddress: string;
  contractABI: ethers.ContractInterface;
  onError?: (error: Error) => void;
}

export const useSmartContract = <T extends ethers.Contract>({
  contractAddress,
  contractABI,
  onError,
}: UseSmartContractOptions) => {
  const { isConnected, signer, provider } = useWallet();
  const [contract, setContract] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Initialize contract when wallet is connected
  useEffect(() => {
    const initContract = async () => {
      try {
        if (!isConnected || !signer || !provider) {
          setContract(null);
          setError(new Error("Wallet not connected"));
          return;
        }

        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        ) as unknown as T;
        
        setContract(contractInstance);
        setError(null);
      } catch (err) {
        console.error("Error initializing contract:", err);
        const error = err instanceof Error ? err : new Error("Unknown error initializing contract");
        setError(error);
        if (onError) onError(error);
      } finally {
        setIsLoading(false);
      }
    };

    initContract();
  }, [contractAddress, contractABI, isConnected, signer, provider, onError]);

  // Execute contract call with error handling
  const executeContractCall = useCallback(
    async <R>(
      method: string,
      ...args: unknown[]
    ): Promise<{ success: boolean; result?: R; error?: string }> => {
      if (!contract) {
        return {
          success: false,
          error: "Contract not initialized or wallet not connected",
        };
      }

      try {
        setIsLoading(true);
        
        // @ts-ignore
        const result = await contract[method](...args);
        
        // If the result is a transaction, wait for it
        if (result.wait && typeof result.wait === "function") {
          await result.wait();
        }
        
        return {
          success: true,
          result: result as R,
        };
      } catch (err) {
        console.error(`Error executing ${method}:`, err);
        
        const errorMsg = err instanceof Error ? err.message : "Unknown error executing contract call";
        
        if (errorMsg.includes("user rejected") || errorMsg.includes("User denied")) {
          toast({
            title: "Transaction Cancelled",
            description: "You cancelled the transaction.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Transaction Failed",
            description: errorMsg.substring(0, 100),
            variant: "destructive",
          });
        }
        
        return {
          success: false,
          error: errorMsg,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [contract]
  );

  return {
    contract,
    isLoading,
    error,
    executeContractCall,
    isConnected,
  };
};
