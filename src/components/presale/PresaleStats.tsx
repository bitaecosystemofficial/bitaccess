
import { Progress } from "@/components/ui/progress";
import { Coins } from "lucide-react";
import { usePresaleData } from "@/utils/presale/presaleHooks";

const PresaleStats = () => {
  const presaleData = usePresaleData();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
          <Coins size={40} className="text-bitaccess-gold" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Presale Phase: {presaleData.currentPhase + 1} of {presaleData.totalPhases}</h3>
          <p className="text-gray-400">
            Current Price: ${presaleData.bnbRate.toFixed(3)} | Launch Price: ${(presaleData.bnbRate * 1.5).toFixed(3)}
          </p>
        </div>
      </div>
            
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-bitaccess-gold">
            {presaleData.progress}% ({presaleData.soldTokens.toLocaleString()} / {presaleData.totalSupply.toLocaleString()} BIT)
          </span>
        </div>
        <Progress value={presaleData.progress} className="h-3 bg-gray-700" />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">Soft Cap: {(presaleData.softCap / 1000000).toFixed(1)}M BIT</span>
          <span className="text-xs text-gray-400">Hard Cap: {(presaleData.hardCap / 1000000).toFixed(1)}M BIT</span>
        </div>
      </div>
    </div>
  );
};

export default PresaleStats;
