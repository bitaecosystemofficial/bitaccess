
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenInfoCard from "./TokenInfoCard";
import PriceChart from "./PriceChart";
import HoldersDistribution from "./HoldersDistribution";
import TransactionAnalytics from "./TransactionAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, ChartLine } from "lucide-react";

const DexChartAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simulate hourly updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setLastUpdate(new Date());
      console.log("Updating analytics data...");
      // Would fetch new data here in a real implementation
    }, 3600000); // 1 hour in milliseconds
    
    return () => clearInterval(updateInterval);
  }, []);

  const tokenInfo = {
    name: "BIT ACCESS",
    symbol: "BIT",
    contractAddress: "0xd3bde17ebd27739cf5505cd58ecf31cb628e469c",
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
                    <p className="font-bold text-green-500 flex items-center">
                      +2.14% <ArrowUp size={16} className="ml-1" />
                    </p>
                  </div>
                  <div className="p-3 bg-bitaccess-black rounded-lg">
                    <p className="text-gray-400 text-sm">7d Change</p>
                    <p className="font-bold text-red-500 flex items-center">
                      -1.27% <ArrowDown size={16} className="ml-1" />
                    </p>
                  </div>
                  <div className="p-3 bg-bitaccess-black rounded-lg">
                    <p className="text-gray-400 text-sm">Volume 24h</p>
                    <p className="font-bold text-white">$124,357</p>
                  </div>
                  <div className="p-3 bg-bitaccess-black rounded-lg">
                    <p className="text-gray-400 text-sm">Market Cap</p>
                    <p className="font-bold text-white">$2.75M</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Token Holders</h3>
                  <div className="bg-bitaccess-gold/20 rounded-full px-3 py-1 text-sm text-bitaccess-gold">
                    4,872 holders
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
                <TransactionAnalytics />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </section>
  );
};

export default DexChartAnalytics;
