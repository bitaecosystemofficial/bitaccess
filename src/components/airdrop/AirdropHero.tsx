
import { TokenStatCard } from "@/components/ui/token-stat-card";
import { Users, Gift, Coins } from "lucide-react";

interface AirdropHeroProps {
  allocation: number;
  participants: number;
  remainingTokens: number;
  phase: number;
  totalPhases: number;
}

const AirdropHero = ({ 
  allocation, 
  participants, 
  remainingTokens,
  phase,
  totalPhases
}: AirdropHeroProps) => {
  return (
    <div className="mb-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gold-gradient text-transparent bg-clip-text">
          Bit Access Airdrop Program
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Complete social media tasks and receive free BIT tokens. Join our community and participate in the token distribution event.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TokenStatCard 
          title="Total Allocation"
          value={`${allocation.toLocaleString()} BIT`}
          icon={<Gift className="h-5 w-5" />}
        />
        <TokenStatCard 
          title="Total Participants"
          value={participants.toLocaleString()}
          icon={<Users className="h-5 w-5" />}
        />
        <TokenStatCard 
          title="Remaining Tokens"
          value={`${remainingTokens.toLocaleString()} BIT`}
          icon={<Coins className="h-5 w-5" />}
        />
      </div>

      <div className="mt-4 text-center">
        <div className="inline-block bg-bitaccess-black-light px-4 py-1 rounded-full border border-bitaccess-gold/20">
          <span className="text-bitaccess-gold">Current Phase: {phase}/{totalPhases}</span>
        </div>
      </div>
    </div>
  );
};

export default AirdropHero;
