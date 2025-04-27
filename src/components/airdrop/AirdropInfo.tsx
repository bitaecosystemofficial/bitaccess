
import { Gift } from "lucide-react";
import { AirdropData } from "@/utils/airdrop/airdropHooks";

interface AirdropInfoProps {
  airdropData: AirdropData;
}

const AirdropInfo = ({ airdropData }: AirdropInfoProps) => {
  // Calculate time remaining
  const calculateTimeRemaining = () => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = airdropData.endTimeInSeconds - now;
    
    if (timeLeft <= 0) return "Ended";
    
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    return `${days} days`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center mb-8">
      <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
        <Gift size={40} className="text-bitaccess-gold" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">
          Current Airdrop Phase: {airdropData.phase} of {airdropData.totalPhases}
        </h3>
        <p className="text-gray-400">
          Total allocation: {(airdropData.allocation).toLocaleString()} BIT tokens | Ends in: {calculateTimeRemaining()}
        </p>
      </div>
    </div>
  );
};

export default AirdropInfo;
