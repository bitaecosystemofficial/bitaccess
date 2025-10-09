import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { contractAddresses } from "@/constants/contracts";

const BSCSCAN_API_KEY = "EK-tLJmD-TV5Qqjd-hQhSS";
const TOKEN_ADDRESS = contractAddresses.token;

interface TokenInfo {
  name: string;
  symbol: string;
  totalSupply: string;
  decimals: string;
  contractAddress: string;
}

interface HolderData {
  rank: number;
  address: string;
  balance: string;
  percentage: string;
}

const Chart = () => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [holders, setHolders] = useState<HolderData[]>([]);
  const [totalHolders, setTotalHolders] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokenData();
  }, []);

  const fetchTokenData = async () => {
    try {
      setLoading(true);
      
      // Fetch token info
      const tokenResponse = await fetch(
        `https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=${TOKEN_ADDRESS}&apikey=${BSCSCAN_API_KEY}`
      );
      const tokenData = await tokenResponse.json();
      
      if (tokenData.status === "1" && tokenData.result) {
        const token = tokenData.result[0];
        setTokenInfo({
          name: token.tokenName || "Bit Access Token",
          symbol: token.symbol || "BIT",
          totalSupply: token.totalSupply || "100000000000",
          decimals: token.divisor || "18",
          contractAddress: TOKEN_ADDRESS
        });
      }

      // Fetch holder count
      const holderCountResponse = await fetch(
        `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${TOKEN_ADDRESS}&page=1&offset=1&apikey=${BSCSCAN_API_KEY}`
      );
      const holderCountData = await holderCountResponse.json();
      if (holderCountData.status === "1") {
        setTotalHolders(parseInt(holderCountData.result?.length || "0"));
      }

      // Fetch top holders
      const holdersResponse = await fetch(
        `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${TOKEN_ADDRESS}&page=1&offset=500&apikey=${BSCSCAN_API_KEY}`
      );
      const holdersData = await holdersResponse.json();
      
      if (holdersData.status === "1" && holdersData.result) {
        const formattedHolders = holdersData.result.slice(0, 500).map((holder: any, index: number) => ({
          rank: index + 1,
          address: holder.TokenHolderAddress,
          balance: (parseInt(holder.TokenHolderQuantity) / Math.pow(10, 18)).toFixed(2),
          percentage: ((parseInt(holder.TokenHolderQuantity) / parseInt(tokenData.result[0]?.totalSupply || "1")) * 100).toFixed(4)
        }));
        setHolders(formattedHolders);
      }
    } catch (error) {
      console.error("Error fetching token data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatSupply = (supply: string) => {
    const num = parseInt(supply);
    return (num / Math.pow(10, 18)).toLocaleString();
  };

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 py-24 flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-bitaccess-gold" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gold-gradient text-transparent bg-clip-text">
            Bit Access Token Chart
          </h1>
          <p className="text-gray-400 mb-8">
            Real-time token data and holder information from BSCScan
          </p>

          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="info">Token Info</TabsTrigger>
              <TabsTrigger value="holders">Holders</TabsTrigger>
              <TabsTrigger value="transfers">Transfers</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Information</CardTitle>
                  <CardDescription>Token details and contract data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Token Name</p>
                      <p className="text-lg font-semibold text-white">{tokenInfo?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Symbol</p>
                      <p className="text-lg font-semibold text-white">{tokenInfo?.symbol}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Supply</p>
                      <p className="text-lg font-semibold text-white">
                        {tokenInfo ? formatSupply(tokenInfo.totalSupply) : "0"} BIT
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Decimals</p>
                      <p className="text-lg font-semibold text-white">{tokenInfo?.decimals}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-400">Contract Address</p>
                      <p className="text-sm font-mono text-bitaccess-gold break-all">
                        {tokenInfo?.contractAddress}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Holder Statistics</CardTitle>
                  <CardDescription>Total unique wallet addresses holding BIT tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-bitaccess-gold">{totalHolders.toLocaleString()}</p>
                  <p className="text-sm text-gray-400 mt-2">Total Holders</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="holders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top 500 Holders</CardTitle>
                  <CardDescription>Largest token holders ranked by balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-bitaccess-gold/20">
                          <th className="text-left py-3 px-2 text-sm text-gray-400">Rank</th>
                          <th className="text-left py-3 px-2 text-sm text-gray-400">Address</th>
                          <th className="text-right py-3 px-2 text-sm text-gray-400">Balance (BIT)</th>
                          <th className="text-right py-3 px-2 text-sm text-gray-400">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {holders.map((holder) => (
                          <tr key={holder.address} className="border-b border-bitaccess-gold/10 hover:bg-bitaccess-gold/5">
                            <td className="py-3 px-2 text-white">{holder.rank}</td>
                            <td className="py-3 px-2 text-bitaccess-gold font-mono text-sm">
                              {holder.address.slice(0, 6)}...{holder.address.slice(-4)}
                            </td>
                            <td className="py-3 px-2 text-right text-white">{parseFloat(holder.balance).toLocaleString()}</td>
                            <td className="py-3 px-2 text-right text-gray-400">{holder.percentage}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transfers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transfers</CardTitle>
                  <CardDescription>Latest token transfer activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">
                      View detailed transfer history on BSCScan
                    </p>
                    <a
                      href={`https://bscscan.com/token/${TOKEN_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-bitaccess-gold text-bitaccess-black font-semibold rounded-lg hover:bg-bitaccess-gold-dark transition-colors"
                    >
                      View on BSCScan
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Chart;
