
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { contractAddresses } from "@/constants/contracts";
import { useContractEvents } from "@/hooks/useContractEvents";
import { useToast } from "@/components/ui/use-toast";
import { TokenTransaction } from "@/services/BscscanService";
import { getMockData, mockTokenTransactions } from "@/services/MockDataService";
import TokenInfoCard from "./TokenInfoCard";
import TokenMetricsCard from "./TokenMetricsCard";
import TokenHoldersCard from "./TokenHoldersCard";
import AnalyticsTabs from "./AnalyticsTabs";
import { TokenMetrics } from "@/types/analytics";

const DexChartAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [tokenMetrics, setTokenMetrics] = useState<TokenMetrics>({
    price: 0.00000275,
    priceChange24h: 2.14,
    priceChange7d: -1.27,
    volume24h: 124357,
    marketCap: 2750000,
  });
  const [tokenHolders, setTokenHolders] = useState(4872);
  const [recentTransactions, setRecentTransactions] = useState<TokenTransaction[]>(mockTokenTransactions);
  const { latestTransfer } = useContractEvents();
  const { toast } = useToast();
  
  // Fetch data from mock service
  useEffect(() => {
    const fetchMockData = async () => {
      try {
        console.log("Fetching mock data...");
        setIsLoading(true);
        
        // Use mock data directly
        const mockData = getMockData();
        
        setTokenMetrics({
          price: mockData.tokenInfo.price,
          priceChange24h: mockData.tokenInfo.priceChange24h,
          priceChange7d: mockData.tokenInfo.priceChange7d,
          volume24h: mockData.tokenInfo.volume24h,
          marketCap: mockData.tokenInfo.marketCap,
        });
        
        setRecentTransactions(mockData.transactions);
        setTokenHolders(mockData.tokenInfo.holders);
        
        console.log("Mock data loaded successfully");
        setIsLoading(false);
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Failed to fetch mock data:", error);
        setIsLoading(false);
      }
    };
    
    fetchMockData();
  }, []);
  
  // Simulate real-time updates (run every 30 seconds for demo purposes)
  useEffect(() => {
    const updateInterval = setInterval(() => {
      console.log("Updating token data with mock data...");
      
      // Simulate price changes
      setTokenMetrics(prev => ({
        ...prev,
        price: prev.price * (1 + (Math.random() * 0.04 - 0.02)), // ±2% price change
        priceChange24h: prev.priceChange24h + (Math.random() * 2 - 1), // ±1% fluctuation
        volume24h: prev.volume24h * (1 + (Math.random() * 0.1 - 0.05)), // ±5% volume change
      }));
      
      // Simulate new transaction
      const mockData = getMockData();
      const newTransaction = {
        ...mockData.transactions[0],
        timeStamp: (Math.floor(Date.now() / 1000)).toString(),
        hash: "0x" + Math.random().toString(16).substring(2, 34),
        value: (Math.floor(Math.random() * 10000000000) + 1000000000).toString(),
      };
      
      setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 4)]);
      setLastUpdate(new Date());
      
    }, 30000); // 30 seconds for demo purposes
    
    return () => clearInterval(updateInterval);
  }, []);
  
  // React to transfer events (simulated)
  useEffect(() => {
    if (latestTransfer) {
      console.log("New transfer detected:", latestTransfer);
      
      toast({
        title: "New Transaction Detected",
        description: `${latestTransfer.from.substring(0, 6)}...${latestTransfer.from.substring(latestTransfer.from.length - 4)} → ${latestTransfer.to.substring(0, 6)}...${latestTransfer.to.substring(latestTransfer.to.length - 4)}: ${Number(latestTransfer.amount).toFixed(2)} BIT`,
        duration: 5000,
      });
    }
  }, [latestTransfer, toast]);
  
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
            BitAccess DEX Analytics
          </h1>
          <p className="text-gray-400">
            Real-time token analytics and market insights
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
              <TokenMetricsCard metrics={tokenMetrics} />
              <TokenHoldersCard holdersCount={tokenHolders} />
            </div>
            
            <AnalyticsTabs transactions={recentTransactions} />
          </>
        )}
      </div>
    </section>
  );
};

export default DexChartAnalytics;
