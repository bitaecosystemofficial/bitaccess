import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@/contexts/WalletContext";
import { storeService } from "@/services/StoreService";
import { SwapDataType } from "@/hooks/useSwap";
import { tokenService } from "@/services/TokenService";
import { useEducationData } from "@/hooks/useEducation";

export const useTokenAllowance = (tokenAddress: string, spenderAddress: string) => {
  const { address, provider } = useWallet();

  return useQuery(
    ["tokenAllowance", tokenAddress, spenderAddress, address],
    async () => {
      if (!address || !provider || !tokenAddress || !spenderAddress) {
        return 0n;
      }

      const tokenContract = new ethers.Contract(
        tokenAddress,
        ["function allowance(address owner, address spender) view returns (uint256)"],
        provider
      );

      const allowance = await tokenContract.allowance(address, spenderAddress);
      return BigInt(allowance.toString());
    },
    {
      enabled: !!address && !!provider && !!tokenAddress && !!spenderAddress,
      refetchInterval: 60000, // Refetch every 60 seconds
    }
  );
};

export const formatAddress = (address: string | null | undefined): string => {
  if (!address) return "Connect Wallet";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const shortenAddress = (address: string, chars = 4, separator = "...") => {
  if (!address) return "";
  const start = address.substring(0, chars);
  const end = address.substring(address.length - chars);
  return `${start}${separator}${end}`;
};

export const useEthPrice = () => {
  return useQuery(
    ["ethPrice"],
    async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      return data.ethereum.usd;
    },
    {
      refetchInterval: 300000, // Refetch every 5 minutes
    }
  );
};

export const useBnbPrice = () => {
  return useQuery(
    ["bnbPrice"],
    async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
      );
      const data = await response.json();
      return data.binancecoin.usd;
    },
    {
      refetchInterval: 300000, // Refetch every 5 minutes
    }
  );
};

// Fixed function with issue on line 67 - adjusting parameter count
export const calculateSomething = (param1: string) => {
  // Single parameter function instead of two parameters
  return param1;
};
