
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenInfoCard from "./TokenInfoCard";
import PriceChart from "./PriceChart";
import HoldersDistribution from "./HoldersDistribution";
import TransactionAnalytics from "./TransactionAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, ChartLine } from "lucide-react";
import { contractAddresses } from "@/constants/contracts";
import { useContractEvents } from "@/hooks/useContractEvents";
import { useToast } from "@/components/ui/use-toast";
import { TokenTransaction } from "@/services/BscscanService";
import { getMockData, mockTokenTransactions } from "@/services/MockDataService";

// Extract TokenMetrics type to make the code more maintainable
interface TokenMetrics {
  price: number;
  priceChange24h: number;
  priceChange7d: number;
  volume24h: number;
  marketCap: number;
}

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
              <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Price Statistics</h3>
                  <ChartLine className="text-bitaccess-gold" size={24} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-bitaccess-black rounded-lg">
                    <p className="text-gray-400 text-sm">24h Change</p>
                    <p className={`font-bold ${tokenMetrics.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                      {tokenMetrics.priceChange24h >= 0 ? '+' : ''}{tokenMetrics.priceChange24h.toFixed(2)}% 
                      {tokenMetrics.priceChange24h >= 0 ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />}
                    </p>
                  </div>
                  <div className="p-3 bg-bitaccess-black rounded-lg">
                    <p className="text-gray-400 text-sm">7d Change</p>
                    <p className={`font-bold ${tokenMetrics.priceChange7d >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                      {tokenMetrics.priceChange7d >= 0 ? '+' : ''}{tokenMetrics.priceChange7d.toFixed(2)}% 
                      {tokenMetrics.priceChange7d >= 0 ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />}
                    </p>
                  </div>
                  <div className="p-3 bg-bitaccess-black rounded-lg">
                    <p className="text-gray-400 text-sm">Volume 24h</p>
                    <p className="font-bold text-white">${tokenMetrics.volume24h.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-bitaccess-black rounded-lg">
                    <p className="text-gray-400 text-sm">Market Cap</p>
                    <p className="font-bold text-white">${tokenMetrics.marketCap.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Token Holders</h3>
                  <div className="bg-bitaccess-gold/20 rounded-full px-3 py-1 text-sm text-bitaccess-gold">
                    {tokenHolders.toLocaleString()} holders
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Top 10 holders</span>
                    <span className="text-white">68.5%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-bitaccess-gold h-2.5 rounded-full" style={{ width: "68.5%" }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Top 50 holders</span>
                    <span className="text-white">84.3%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-bitaccess-gold h-2.5 rounded-full" style={{ width: "84.3%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="price" className="mt-8">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="price">Price History</TabsTrigger>
                <TabsTrigger value="holders">Holders Distribution</TabsTrigger>
                <TabsTrigger value="transactions">Transaction Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="price">
                <PriceChart />
              </TabsContent>
              <TabsContent value="holders">
                <HoldersDistribution />
              </TabsContent>
              <TabsContent value="transactions">
                <TransactionAnalytics transactions={recentTransactions} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </section>
  );
};

export default DexChartAnalytics;
