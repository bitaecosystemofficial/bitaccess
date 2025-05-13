
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenInfoCard from "./TokenInfoCard";
import PriceChart from "./PriceChart";
import HoldersDistribution from "./HoldersDistribution";
import TransactionAnalytics from "./TransactionAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, ChartLine } from "lucide-react";
import { ethers } from "ethers";
import { TokenABI } from "@/contracts/abis/TokenABI";
import { contractAddresses } from "@/constants/contracts";
import { useContractEvents } from "@/hooks/useContractEvents";
import { useToast } from "@/components/ui/use-toast";

const DexChartAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [tokenMetrics, setTokenMetrics] = useState({
    price: 0.00000275,
    priceChange24h: 2.14,
    priceChange7d: -1.27,
    volume24h: 124357,
    marketCap: 2750000,
  });
  const [tokenHolders, setTokenHolders] = useState(4872);
  const { latestTransfer } = useContractEvents();
  const { toast } = useToast();
  
  // Initial data loading
  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, we would fetch actual data from blockchain APIs
        // For now, we'll simulate loading with a timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Try to get some basic token info
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const tokenContract = new ethers.Contract(
            contractAddresses.token,
            TokenABI,
            provider
          );
          
          try {
            // Get token symbol
            const symbol = await tokenContract.symbol();
            console.log("Token symbol:", symbol);
            
            // Get token decimals
            const decimals = await tokenContract.decimals();
            console.log("Token decimals:", decimals);
          } catch (err) {
            console.error("Error fetching token data from contract:", err);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch token data:", error);
        setIsLoading(false);
      }
    };
    
    fetchTokenData();
  }, []);
  
  // Real-time updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setLastUpdate(new Date());
      // In a real implementation, we would fetch updated data here
    }, 3600000); // 1 hour in milliseconds
    
    return () => clearInterval(updateInterval);
  }, []);
  
  // React to transfer events
  useEffect(() => {
    if (latestTransfer) {
      console.log("New transfer detected:", latestTransfer);
      
      // Update UI with a toast notification
      toast({
        title: "New Transaction Detected",
        description: `${latestTransfer.from.substring(0, 6)}...${latestTransfer.from.substring(latestTransfer.from.length - 4)} → ${latestTransfer.to.substring(0, 6)}...${latestTransfer.to.substring(latestTransfer.to.length - 4)}: ${Number(latestTransfer.amount).toFixed(2)} BIT`,
        duration: 5000,
      });
      
      // In a real implementation, we would update our data based on transfer
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
                    <p className="font-bold text-green-500 flex items-center">
                      +{tokenMetrics.priceChange24h}% <ArrowUp size={16} className="ml-1" />
                    </p>
                  </div>
                  <div className="p-3 bg-bitaccess-black rounded-lg">
                    <p className="text-gray-400 text-sm">7d Change</p>
                    <p className="font-bold text-red-500 flex items-center">
                      {tokenMetrics.priceChange7d}% <ArrowDown size={16} className="ml-1" />
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
