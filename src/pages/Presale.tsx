
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import PresaleStats from "@/components/presale/PresaleStats";
import PresaleTimer from "@/components/presale/PresaleTimer";
import PresaleForm from "@/components/presale/PresaleForm";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { usePresaleData } from "@/utils/presale/presaleHooks";
import { useWallet } from "@/contexts/WalletContext";

const Presale = () => {
  const presaleData = usePresaleData();
  const { isConnected } = useWallet();
  
  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Presale Access Required"
          description="Please connect your wallet to participate in the token presale"
        />
      </Layout>
    );
  }
  
  // Format bonus tiers for display
  const renderBonusTiers = () => {
    const bnbTiers = presaleData.bonusTiers.bnb;
    
    if (bnbTiers.length === 0) {
      return (
        <ul className="space-y-1 text-sm">
          <li className="text-gray-300">Loading bonus tiers...</li>
        </ul>
      );
    }

    return (
      <ul className="space-y-1 text-sm">
        {bnbTiers.map((tier, index) => (
          <li key={index} className="flex justify-between">
            <span className="text-gray-300">
              {index === 0 
                ? `Purchase ${tier.minAmount}+ BNB:`
                : `Purchase ${tier.minAmount}+ BNB:`}
            </span>
            <span className="text-bitaccess-gold">+{tier.bonusPercent}% Bonus</span>
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Token Presale"
            subtitle="Secure your BIT tokens using BNB or USDT before public listing"
            centered
          />
          
          <div className="max-w-3xl mx-auto bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
            <PresaleStats />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <PresaleTimer />
              
              <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
                <p className="text-gray-400 text-sm mb-1">Bonus Structure</p>
                {renderBonusTiers()}
              </div>
            </div>
            
            <PresaleForm />

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Running on Binance Smart Chain (BSC) | View contract on <a href={`https://bscscan.com/address/${presaleData.address}`} target="_blank" rel="noopener noreferrer" className="text-bitaccess-gold hover:underline">BscScan</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Presale;
