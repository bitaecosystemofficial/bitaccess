
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, ExternalLink, RefreshCw } from "lucide-react";
import { bscscanService, TokenHolder } from "@/services/BscscanService";
import { useToast } from "@/hooks/use-toast";

const TopHoldersCard = () => {
  const [holders, setHolders] = useState<TokenHolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [totalHolders, setTotalHolders] = useState<number>(3193);
  const { toast } = useToast();

  const fetchRealTimeHolders = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching real-time top 10 holders data...');
      
      // Get top 10 holders specifically
      const top10Holders = await bscscanService.getTop10Holders();
      const realTimeData = await bscscanService.getRealTimeTokenData();
      
      setHolders(top10Holders);
      setTotalHolders(realTimeData.tokenInfo?.holders || 3193);
      setLastUpdate(realTimeData.timestamp);
      
      console.log(`Fetched top 10 holders, total holders: ${realTimeData.tokenInfo?.holders}`);
    } catch (error) {
      console.error('Error fetching real-time top 10 holders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch real-time top 10 holders data from BSCScan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchRealTimeHolders();
    
    // Set up real-time updates every 5 minutes
    const interval = setInterval(fetchRealTimeHolders, 300000);
    
    return () => clearInterval(interval);
  }, []);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const openInBscscan = (address: string) => {
    window.open(`https://bscscan.com/address/${address}`, '_blank');
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  if (isLoading) {
    return (
      <Card className="border-bitaccess-gold/20 bg-bitaccess-black-light">
        <CardHeader>
          <CardTitle className="text-bitaccess-gold flex items-center justify-between">
            <span>Top 10 Token Holders</span>
            <Skeleton className="h-8 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-bitaccess-gold/20 bg-bitaccess-black-light">
      <CardHeader>
        <CardTitle className="text-bitaccess-gold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Top 10 Token Holders</span>
            <button
              onClick={fetchRealTimeHolders}
              className="text-gray-400 hover:text-bitaccess-gold transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {totalHolders.toLocaleString()} total holders
          </div>
        </CardTitle>
        <p className="text-xs text-gray-500">
          Top 10 BIT token holders from contract 0xd3bde17ebd27739cf5505cd58ecf31cb628e469c - Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-400">Rank</TableHead>
              <TableHead className="text-gray-400">Wallet Address</TableHead>
              <TableHead className="text-gray-400">BIT Balance</TableHead>
              <TableHead className="text-gray-400">Percentage</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holders.slice(0, 10).map((holder, index) => (
              <TableRow key={holder.address} className="border-gray-700 hover:bg-gray-800/50">
                <TableCell className="text-white font-medium">#{holder.rank}</TableCell>
                <TableCell className="text-blue-400 font-mono hover:text-blue-300">
                  <button
                    onClick={() => openInBscscan(holder.address)}
                    className="hover:underline"
                    title={holder.address}
                  >
                    {formatAddress(holder.address)}
                  </button>
                </TableCell>
                <TableCell className="text-white font-semibold">
                  {formatBalance(holder.balance)} BIT
                </TableCell>
                <TableCell className="text-bitaccess-gold font-semibold">
                  {holder.percentage.toFixed(5)}%
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyAddress(holder.address)}
                      className="text-gray-400 hover:text-bitaccess-gold transition-colors"
                      title="Copy Address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openInBscscan(holder.address)}
                      className="text-gray-400 hover:text-bitaccess-gold transition-colors"
                      title="View on BSCScan"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopHoldersCard;
