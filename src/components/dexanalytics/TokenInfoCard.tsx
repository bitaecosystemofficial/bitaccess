
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface TokenInfoProps {
  tokenInfo: {
    name: string;
    symbol: string;
    contractAddress: string;
    network: string;
    decimal: number;
    standard: string;
    marketSupply: string;
    buyTax: string;
    sellTax: string;
  };
}

const TokenInfoCard = ({ tokenInfo }: TokenInfoProps) => {
  const truncateAddress = (address: string) => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  };
  
  return (
    <div className="bg-gradient-to-br from-bitaccess-black-light to-bitaccess-black rounded-xl border border-bitaccess-gold/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img 
            src="https://github.com/bitaecosystemofficial/BIT-Logo/raw/main/logo.png" 
            alt="BIT Token" 
            className="w-12 h-12 mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{tokenInfo.name}</h2>
            <p className="text-gray-400">{tokenInfo.symbol} - {tokenInfo.standard}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
          onClick={() => window.open(`https://bscscan.com/token/${tokenInfo.contractAddress}`, '_blank')}
        >
          View on BSCScan <ExternalLink size={16} className="ml-2" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-gray-400 mb-1">Contract Address</p>
          <p className="bg-bitaccess-black p-2 rounded text-sm font-mono overflow-hidden text-ellipsis">
            {truncateAddress(tokenInfo.contractAddress)}
          </p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Network</p>
          <p className="text-white">{tokenInfo.network}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Decimal</p>
          <p className="text-white">{tokenInfo.decimal}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Market Supply</p>
          <p className="text-white">{tokenInfo.marketSupply}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Buy Tax</p>
          <p className="text-white">{tokenInfo.buyTax}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Sell Tax</p>
          <p className="text-white">{tokenInfo.sellTax}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenInfoCard;
