
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TokenInfoProps {
  tokenInfo: {
    name: string;
    symbol: string;
    contractAddress: string;
    network: string;
    decimal: number;
    standard: string;
    totalSupply: string;
    holders: number;
  };
}

const TokenInfoCard = ({ tokenInfo }: TokenInfoProps) => {
  const { toast } = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenInfo.contractAddress);
    toast({
      title: "Address Copied",
      description: "Contract address copied to clipboard",
    });
  };

  const openInBscscan = () => {
    window.open(`https://bscscan.com/token/${tokenInfo.contractAddress}`, '_blank');
  };

  return (
    <Card className="border-bitaccess-gold/20 bg-bitaccess-black-light">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-bitaccess-gold">
            {tokenInfo.name} ({tokenInfo.symbol})
          </CardTitle>
          <Badge variant="outline" className="border-bitaccess-gold text-bitaccess-gold">
            {tokenInfo.standard}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-bitaccess-black rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Network</h3>
            <p className="text-white font-semibold">{tokenInfo.network}</p>
          </div>
          
          <div className="bg-bitaccess-black rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Supply</h3>
            <p className="text-white font-semibold">
              {parseFloat(tokenInfo.totalSupply).toLocaleString()} {tokenInfo.symbol}
            </p>
          </div>
          
          <div className="bg-bitaccess-black rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Holders</h3>
            <p className="text-bitaccess-gold font-semibold text-xl">
              {tokenInfo.holders.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-bitaccess-black rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Decimals</h3>
            <p className="text-white font-semibold">{tokenInfo.decimal}</p>
          </div>
        </div>
        
        <div className="mt-6 bg-bitaccess-black rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-sm mb-2">Contract Address</h3>
              <p className="text-white font-mono text-sm">{tokenInfo.contractAddress}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyAddress}
                className="text-gray-400 hover:text-bitaccess-gold transition-colors p-2"
                title="Copy Address"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={openInBscscan}
                className="text-gray-400 hover:text-bitaccess-gold transition-colors p-2"
                title="View on BSCScan"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenInfoCard;
