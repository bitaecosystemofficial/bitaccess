
import TokenStatCard from "@/components/ui/token-stat-card";
import {
  Coins,
  Bitcoin,
  ArrowLeftRight,
  TrendingUp,
  Percent,
  DollarSign
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { tokenInfo } from "./tokenDistributionData";

const TokenStats = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-12 items-center">
      <div className="w-full md:w-1/3 flex justify-center">
        <div className="w-48 h-48">
          <AspectRatio ratio={1/1} className="bg-transparent">
            <img 
              src="https://github.com/bitaecosystemofficial/BIT-Logo/blob/main/logo.png?raw=true" 
              alt="BIT Token Logo" 
              className="rounded-full object-contain"
            />
          </AspectRatio>
        </div>
      </div>
      
      <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
        <TokenStatCard
          title="Market Supply"
          value={tokenInfo.marketSupply}
          icon={<Coins size={24} />}
        />
        <TokenStatCard
          title="Token Symbol"
          value={tokenInfo.symbol}
          icon={<Bitcoin size={24} />}
        />
        <TokenStatCard
          title="Network"
          value={tokenInfo.network}
          icon={<ArrowLeftRight size={24} />}
        />
        <TokenStatCard
          title="Token Standard"
          value={tokenInfo.standard}
          icon={<TrendingUp size={24} />}
        />
        <TokenStatCard
          title="Tax"
          value={`${tokenInfo.buyTax} Buy / ${tokenInfo.sellTax} Sell`}
          icon={<Percent size={24} />}
        />
        <TokenStatCard
          title="Decimals"
          value={tokenInfo.decimal.toString()}
          icon={<DollarSign size={24} />}
        />
      </div>
    </div>
  );
};

export default TokenStats;
