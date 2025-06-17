
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, ExternalLink } from "lucide-react";
import { bscscanService, TokenHolder } from "@/services/BscscanService";
import { useToast } from "@/hooks/use-toast";

const TopHoldersCard = () => {
  const [holders, setHolders] = useState<TokenHolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHolders = async () => {
      try {
        setIsLoading(true);
        const topHolders = await bscscanService.getTop10Holders();
        setHolders(topHolders);
      } catch (error) {
        console.error('Error fetching top holders:', error);
        toast({
          title: "Error",
          description: "Failed to fetch top holders data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHolders();
  }, [toast]);

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
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <Card className="border-bitaccess-gold/20 bg-bitaccess-black-light">
        <CardHeader>
          <CardTitle className="text-bitaccess-gold">Top 10 Holders</CardTitle>
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
        <CardTitle className="text-bitaccess-gold">Top 10 Holders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-400">Rank</TableHead>
              <TableHead className="text-gray-400">Address</TableHead>
              <TableHead className="text-gray-400">Balance</TableHead>
              <TableHead className="text-gray-400">%</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holders.map((holder, index) => (
              <TableRow key={holder.address} className="border-gray-700">
                <TableCell className="text-white">{index + 1}</TableCell>
                <TableCell className="text-white font-mono">
                  {formatAddress(holder.address)}
                </TableCell>
                <TableCell className="text-white">
                  {parseFloat(holder.balance).toLocaleString()} BIT
                </TableCell>
                <TableCell className="text-bitaccess-gold">
                  {holder.percentage.toFixed(2)}%
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
