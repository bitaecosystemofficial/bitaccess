
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { contractAddresses } from "@/constants/contracts";
import { useContractEvents } from "@/hooks/useContractEvents";
import { useToast } from "@/components/ui/use-toast";
import TokenInfoCard from "./TokenInfoCard";
import TokenActivityCard from "./TokenActivityCard";
import TransferTransactionsCard from "./TransferTransactionsCard";
import { useRealTimeTokenData } from "@/hooks/useRealTimeTokenData";

const DexChartAnalytics = () => {
  const { latestTransfer } = useContractEvents();
  const { toast } = useToast();
  const { tokenInfo, topHolders, activity, isLoading, lastUpdate, refreshData } = useRealTimeTokenData();
  
  // React to transfer events
  useState(() => {
    if (latestTransfer) {
      console.log("New transfer detected:", latestTransfer);
      
      toast({
        title: "New Transaction Detected",
        description: `${latestTransfer.from.substring(0, 6)}...${latestTransfer.from.substring(latestTransfer.from.length - 4)} → ${latestTransfer.to.substring(0, 6)}...${latestTransfer.to.substring(latestTransfer.to.length - 4)}: ${Number(latestTransfer.amount).toFixed(2)} BIT`,
        duration: 5000,
      });
    }
  });
  
  const tokenInfoData = {
    name: "BIT ACCESS",
    symbol: "BIT",
    contractAddress: contractAddresses.token,
    network: "Binance Smart Chain (BSC)",
    decimal: 9,
    standard: "BEP20",
    totalSupply: "100 Billion BIT",
    holders: 3194
  };
  
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gold-gradient text-transparent bg-clip-text">
            Bit Access Token Analytics
          </h1>
          <p className="text-gray-400">
            Real-time token holders, transactions and transfer data from BSCScan
            <span className="ml-2 text-xs">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </p>
          <button 
            onClick={refreshData}
            className="mt-2 bg-bitaccess-gold text-black px-4 py-2 rounded-lg hover:bg-bitaccess-gold/80 transition-colors"
          >
            Refresh Data
          </button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-[200px] rounded-xl" />
            <Skeleton className="h-[200px] rounded-xl" />
            <Skeleton className="h-[200px] rounded-xl" />
          </div>
        ) : (
          <>
            <TokenInfoCard tokenInfo={tokenInfoData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <TokenActivityCard />
            </div>
            
            <TransferTransactionsCard />
          </>
        )}
      </div>
    </section>
  );
};

export default DexChartAnalytics;
