
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { contractAddresses } from "@/constants/contracts";
import { useContractEvents } from "@/hooks/useContractEvents";
import { useToast } from "@/components/ui/use-toast";
import { TokenTransaction } from "@/services/BscscanService";
import { getMockData } from "@/services/MockDataService";
import TokenInfoCard from "./TokenInfoCard";
import TokenMetricsCard from "./TokenMetricsCard";
import TokenHoldersCard from "./TokenHoldersCard";
import TopHoldersCard from "./TopHoldersCard";
import TokenActivityCard from "./TokenActivityCard";
import AnalyticsTabs from "./AnalyticsTabs";
import { useTokenMetrics } from "@/hooks/useTokenMetrics";

const DexChartAnalytics = () => {
  const [tokenHolders, setTokenHolders] = useState(4872);
  const [recentTransactions, setRecentTransactions] = useState<TokenTransaction[]>(
    getMockData().transactions
  );
  
  const { latestTransfer } = useContractEvents();
  const { toast } = useToast();
  const { metrics, isLoading, lastUpdate } = useTokenMetrics();
  
  // React to transfer events (simulated)
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
  
  const tokenInfo = {
    name: "BIT ACCESS",
    symbol: "BIT",
    contractAddress: contractAddresses.token,
    network: "Binance Smart Chain (BSC)",
    decimal: 9,
    standard: "BEP20",
    marketSupply: "100,000,000,000",
    buyTax: "3%",
    sellTax: "3%"
  };
  
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gold-gradient text-transparent bg-clip-text">
            Bit Access DEX Analytics
          </h1>
          <p className="text-gray-400">
            Real-time token analytics and market insights from BSCScan
            <span className="ml-2 text-xs">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-[200px] rounded-xl" />
            <Skeleton className="h-[200px] rounded-xl" />
            <Skeleton className="h-[200px] rounded-xl" />
          </div>
        ) : (
          <>
            <TokenInfoCard tokenInfo={tokenInfo} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <TokenMetricsCard metrics={metrics} />
              <TokenActivityCard />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <TokenHoldersCard holdersCount={tokenHolders} />
              <TopHoldersCard />
            </div>
            
            <AnalyticsTabs transactions={recentTransactions} />
          </>
        )}
      </div>
    </section>
  );
};

export default DexChartAnalytics;
