
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { bscscanService, TokenTransaction } from "@/services/BscscanService";
import { useToast } from "@/hooks/use-toast";

const TransferTransactionsCard = () => {
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const txs = await bscscanService.getTokenTransactions(1, 20);
      setTransactions(txs);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch transaction data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchTransactions, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatAmount = (value: string, decimals: string) => {
    const amount = parseFloat(value) / Math.pow(10, parseInt(decimals) || 9);
    return amount.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)}h ago`;
    } else {
      return `${Math.floor(diffMins / 1440)}d ago`;
    }
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Address copied to clipboard",
    });
  };

  const openInBscscan = (hash: string) => {
    window.open(`https://bscscan.com/tx/${hash}`, '_blank');
  };

  if (isLoading) {
    return (
      <Card className="border-bitaccess-gold/20 bg-bitaccess-black-light mt-8">
        <CardHeader>
          <CardTitle className="text-bitaccess-gold">Recent Transfer Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-bitaccess-gold/20 bg-bitaccess-black-light mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-bitaccess-gold">
            <ArrowRight className="w-5 h-5" />
            Recent Transfer Transactions
          </CardTitle>
          <button
            onClick={fetchTransactions}
            className="flex items-center gap-2 bg-bitaccess-gold/20 hover:bg-bitaccess-gold/30 text-bitaccess-gold px-3 py-1 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-400">Transaction Hash</TableHead>
                <TableHead className="text-gray-400">From</TableHead>
                <TableHead className="text-gray-400">To</TableHead>
                <TableHead className="text-gray-400">Amount (BIT)</TableHead>
                <TableHead className="text-gray-400">Time</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <TableRow key={tx.hash} className="border-gray-700">
                    <TableCell className="text-white font-mono">
                      {formatAddress(tx.hash)}
                    </TableCell>
                    <TableCell className="text-white font-mono">
                      {formatAddress(tx.from)}
                    </TableCell>
                    <TableCell className="text-white font-mono">
                      {formatAddress(tx.to)}
                    </TableCell>
                    <TableCell className="text-bitaccess-gold">
                      {formatAmount(tx.value, tx.tokenDecimal)} BIT
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {formatTime(tx.timeStamp)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyAddress(tx.hash)}
                          className="text-gray-400 hover:text-bitaccess-gold transition-colors"
                          title="Copy Hash"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openInBscscan(tx.hash)}
                          className="text-gray-400 hover:text-bitaccess-gold transition-colors"
                          title="View on BSCScan"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransferTransactionsCard;
