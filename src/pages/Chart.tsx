import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { contractAddresses } from "@/constants/contracts";

const BINPLORER_API_KEY = "EK-tLJmD-TV5Qqjd-hQhSS";
const TOKEN_ADDRESS = contractAddresses.token;
const API_BASE_URL = "https://api.binplorer.com";

interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  decimals: string;
  holdersCount: number;
  transfersCount: number;
  issuancesCount?: number;
  price?: {
    rate: number;
    currency: string;
    marketCapUsd: number;
  };
  owner?: string;
  contractInfo?: {
    creatorAddress: string;
    creationTimestamp: number;
  };
}

interface HolderData {
  rank: number;
  address: string;
  balance: string;
  share: number;
}

interface TokenOperation {
  timestamp: number;
  transactionHash: string;
  type: string;
  from?: string;
  to?: string;
  value: string;
}

const Chart = () => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [holders, setHolders] = useState<HolderData[]>([]);
  const [operations, setOperations] = useState<TokenOperation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    fetchTokenData();
  }, []);

  const fetchTokenData = async () => {
    try {
      setLoading(true);
      
      // Fetch token info using Binplorer API
      const tokenResponse = await fetch(
        `${API_BASE_URL}/getTokenInfo/${TOKEN_ADDRESS}?apiKey=${BINPLORER_API_KEY}`
      );
      const tokenData = await tokenResponse.json();
      
      if (tokenData && !tokenData.error) {
        setTokenInfo(tokenData);
      }

      // Fetch top 20 holders
      const holdersResponse = await fetch(
        `${API_BASE_URL}/getTopTokenHolders/${TOKEN_ADDRESS}?apiKey=${BINPLORER_API_KEY}&limit=20`
      );
      const holdersData = await holdersResponse.json();
      
      if (holdersData && holdersData.holders) {
        const formattedHolders = holdersData.holders.map((holder: any, index: number) => ({
          rank: index + 1,
          address: holder.address,
          balance: parseFloat(holder.balance).toFixed(2),
          share: holder.share
        }));
        setHolders(formattedHolders);
      }

      // Fetch recent operations (transfers, mints, burns)
      const operationsResponse = await fetch(
        `${API_BASE_URL}/getTokenHistory/${TOKEN_ADDRESS}?apiKey=${BINPLORER_API_KEY}&limit=50`
      );
      const operationsData = await operationsResponse.json();
      
      if (operationsData && operationsData.operations) {
        setOperations(operationsData.operations);
      }
    } catch (error) {
      console.error("Error fetching token data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatSupply = (supply: string) => {
    const num = parseFloat(supply);
    const value = num / Math.pow(10, parseInt(tokenInfo?.decimals || "18"));
    return (value / 1000000000).toFixed(2) + " Billion";
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getOperationColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'mint':
        return 'text-green-400';
      case 'burn':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
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
            Bit Access Token Analytics
          </h1>
          <p className="text-gray-400 mb-8">
            Real-time token data and analytics powered by Binplorer
          </p>

          <Tabs defaultValue="info" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 lg:w-[450px]">
              <TabsTrigger value="info">Overview</TabsTrigger>
              <TabsTrigger value="holders">Top 20 Holders</TabsTrigger>
              <TabsTrigger value="operations">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-bitaccess-gold/10 to-transparent border-bitaccess-gold/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Total Supply</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-bitaccess-gold">
                      {tokenInfo ? formatSupply(tokenInfo.totalSupply) : "0"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{tokenInfo?.symbol || "BIT"}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Total Holders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-blue-400">
                      {tokenInfo?.holdersCount?.toLocaleString() || "0"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Unique addresses</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Total Transfers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-green-400">
                      {tokenInfo?.transfersCount?.toLocaleString() || "0"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">All time</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contract Information</CardTitle>
                    <CardDescription>Detailed token and contract data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Token Name</p>
                        <p className="text-lg font-semibold text-white">{tokenInfo?.name || "Bit Access Token"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Symbol</p>
                        <p className="text-lg font-semibold text-white">{tokenInfo?.symbol || "BIT"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Decimals</p>
                        <p className="text-lg font-semibold text-white">{tokenInfo?.decimals || "18"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Contract Address</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-mono text-bitaccess-gold break-all">
                            {tokenInfo?.address || TOKEN_ADDRESS}
                          </p>
                        </div>
                      </div>
                      {tokenInfo?.owner && (
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Owner</p>
                          <p className="text-sm font-mono text-white break-all">{tokenInfo.owner}</p>
                        </div>
                      )}
                      {tokenInfo?.contractInfo && (
                        <>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Creator</p>
                            <p className="text-sm font-mono text-white break-all">
                              {tokenInfo.contractInfo.creatorAddress}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Created</p>
                            <p className="text-sm text-white">
                              {formatDate(tokenInfo.contractInfo.creationTimestamp)}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top 15 Holders Distribution</CardTitle>
                    <CardDescription>Token distribution among largest holders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center">
                      {holders.length > 0 ? (
                        <div className="w-full space-y-4">
                          <div className="relative w-full h-64">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                              {(() => {
                                const top15 = holders.slice(0, 15);
                                const colors = [
                                  '#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#FF4500',
                                  '#DC143C', '#C71585', '#9370DB', '#4169E1', '#1E90FF',
                                  '#00CED1', '#20B2AA', '#3CB371', '#32CD32', '#ADFF2F'
                                ];
                                let currentAngle = -90;
                                
                                return top15.map((holder, index) => {
                                  const angle = (holder.share / 100) * 360;
                                  const startAngle = currentAngle;
                                  const endAngle = currentAngle + angle;
                                  currentAngle = endAngle;
                                  
                                  const startRad = (startAngle * Math.PI) / 180;
                                  const endRad = (endAngle * Math.PI) / 180;
                                  
                                  const x1 = 100 + 80 * Math.cos(startRad);
                                  const y1 = 100 + 80 * Math.sin(startRad);
                                  const x2 = 100 + 80 * Math.cos(endRad);
                                  const y2 = 100 + 80 * Math.sin(endRad);
                                  
                                  const largeArc = angle > 180 ? 1 : 0;
                                  
                                  return (
                                    <path
                                      key={holder.address}
                                      d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                      fill={colors[index]}
                                      stroke="#000"
                                      strokeWidth="0.5"
                                    />
                                  );
                                });
                              })()}
                            </svg>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {holders.slice(0, 15).map((holder, index) => {
                              const colors = [
                                '#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#FF4500',
                                '#DC143C', '#C71585', '#9370DB', '#4169E1', '#1E90FF',
                                '#00CED1', '#20B2AA', '#3CB371', '#32CD32', '#ADFF2F'
                              ];
                              return (
                                <div key={holder.address} className="flex items-center gap-2">
                                  <div 
                                    className="w-3 h-3 rounded-sm flex-shrink-0" 
                                    style={{ backgroundColor: colors[index] }}
                                  />
                                  <span className="text-gray-400 truncate">
                                    Rank {holder.rank}: {holder.share.toFixed(2)}%
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-400">Loading chart data...</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="holders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top 20 Token Holders</CardTitle>
                  <CardDescription>Largest token holders ranked by balance and ownership percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-bitaccess-gold/30">
                          <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300">Rank</th>
                          <th className="text-left py-4 px-4 text-sm font-semibold text-gray-300">Address</th>
                          <th className="text-right py-4 px-4 text-sm font-semibold text-gray-300">Balance (BIT)</th>
                          <th className="text-right py-4 px-4 text-sm font-semibold text-gray-300">Share</th>
                        </tr>
                      </thead>
                      <tbody>
                        {holders.map((holder) => (
                          <tr 
                            key={holder.address} 
                            className="border-b border-bitaccess-gold/10 hover:bg-bitaccess-gold/5 transition-colors"
                          >
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-bitaccess-gold/20 text-bitaccess-gold font-semibold text-sm">
                                {holder.rank}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <a
                                href={`https://binplorer.com/address/${holder.address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-bitaccess-gold hover:text-bitaccess-gold/80 font-mono text-sm transition-colors"
                              >
                                {holder.address.slice(0, 8)}...{holder.address.slice(-6)}
                              </a>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-white font-semibold">
                                {(parseFloat(holder.balance) / 1000000000).toFixed(2)} Billion
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <div className="w-24 h-2 bg-bitaccess-black-dark rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-bitaccess-gold to-yellow-400"
                                    style={{ width: `${Math.min(holder.share, 100)}%` }}
                                  />
                                </div>
                                <span className="text-gray-300 font-medium min-w-[60px]">
                                  {holder.share.toFixed(2)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Token Activity</CardTitle>
                  <CardDescription>Latest transfers, mints, and burns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {operations.length > 0 ? (
                      operations.map((op, index) => (
                        <div 
                          key={`${op.transactionHash}-${index}`}
                          className="p-4 rounded-lg bg-bitaccess-black-dark border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getOperationColor(op.type)} bg-current/10`}>
                                  {op.type}
                                </span>
                                <span className="text-sm text-gray-400">
                                  {formatDate(op.timestamp)}
                                </span>
                              </div>
                              
                              <div className="space-y-1">
                                {op.from && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-400">From:</span>
                                    <a
                                      href={`https://binplorer.com/address/${op.from}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-bitaccess-gold hover:text-bitaccess-gold/80 font-mono"
                                    >
                                      {op.from.slice(0, 8)}...{op.from.slice(-6)}
                                    </a>
                                  </div>
                                )}
                                {op.to && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-400">To:</span>
                                    <a
                                      href={`https://binplorer.com/address/${op.to}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-bitaccess-gold hover:text-bitaccess-gold/80 font-mono"
                                    >
                                      {op.to.slice(0, 8)}...{op.to.slice(-6)}
                                    </a>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-400">Value:</span>
                                  <span className="text-white font-semibold">
                                    {(parseFloat(op.value) / 1000000000).toFixed(4)} Billion BIT
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <a
                              href={`https://binplorer.com/tx/${op.transactionHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-bitaccess-gold hover:text-bitaccess-gold/80 font-mono whitespace-nowrap"
                            >
                              {op.transactionHash.slice(0, 8)}...
                            </a>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-400 mb-4">
                          No recent operations available
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-bitaccess-gold/10 text-center">
                    <a
                      href={`https://binplorer.com/address/${TOKEN_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-bitaccess-gold text-bitaccess-black font-semibold rounded-lg hover:bg-bitaccess-gold/90 transition-colors"
                    >
                      View All Activity on Binplorer
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
