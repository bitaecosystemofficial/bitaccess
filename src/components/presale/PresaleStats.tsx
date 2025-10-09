
import { Progress } from "@/components/ui/progress";
import { Coins, TrendingUp, Clock } from "lucide-react";
import { usePresaleData } from "@/utils/presale/presaleHooks";
import { Card, CardContent } from "@/components/ui/card";

const PresaleStats = () => {
  const presaleData = usePresaleData();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center mb-8 bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
        <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
          <Coins size={40} className="text-bitaccess-gold" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Buy BIT ACCESS</h3>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <p className="text-gray-400 flex items-center">
              <TrendingUp size={16} className="mr-2 text-bitaccess-gold" />
              Current Price: <span className="ml-2 text-white font-medium">${presaleData.bnbRate.toFixed(6)}</span>
            </p>
            <p className="text-gray-400 flex items-center mt-2 md:mt-0">
              <Clock size={16} className="mr-2 text-bitaccess-gold" />
              Target Price: <span className="ml-2 text-white font-medium">${(0.00030).toFixed(5)}</span>
            </p>
          </div>
        </div>
      </div>
            
      <div className="bg-bitaccess-black p-6 rounded-xl border border-bitaccess-gold/10">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-bitaccess-gold font-medium">
            {presaleData.progress}% ({presaleData.soldTokens.toLocaleString()} / {presaleData.totalSupply.toLocaleString()} BIT)
          </span>
        </div>
        <Progress 
          value={presaleData.progress} 
          className="h-3 bg-gray-700 [&>div]:bg-gradient-to-r [&>div]:from-bitaccess-gold [&>div]:to-bitaccess-gold/80"
        />
        <div className="flex justify-between mt-4 text-sm">
          <span className="text-gray-400">Soft Cap: <span className="text-white">{(presaleData.softCap / 1000000).toFixed(1)}M BIT</span></span>
          <span className="text-gray-400">Hard Cap: <span className="text-white">{(presaleData.hardCap / 1000000).toFixed(1)}M BIT</span></span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-bitaccess-black border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all">
          <CardContent className="p-5">
            <h4 className="text-gray-400 mb-2">Remaining Tokens</h4>
            <p className="text-xl font-bold text-bitaccess-gold">
              {(presaleData.totalSupply - presaleData.soldTokens).toLocaleString()} BIT
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-bitaccess-black border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all">
          <CardContent className="p-5">
            <h4 className="text-gray-400 mb-2">Total Raised</h4>
            <p className="text-xl font-bold text-bitaccess-gold">
              ${((presaleData.soldTokens * presaleData.bnbRate) / 1000000).toFixed(2)}K
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-bitaccess-black border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all">
          <CardContent className="p-5">
            <h4 className="text-gray-400 mb-2">Bonus</h4>
            <p className="text-xl font-bold text-bitaccess-gold">
              5%
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PresaleStats;
