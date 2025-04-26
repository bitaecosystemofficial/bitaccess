
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import PresaleStats from "@/components/presale/PresaleStats";
import PresaleTimer from "@/components/presale/PresaleTimer";
import PresaleForm from "@/components/presale/PresaleForm";
import { usePresaleData } from "@/utils/presale/presaleHooks";

const Presale = () => {
  const presaleData = usePresaleData();
  
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
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-300">Purchase $500-$999:</span>
                    <span className="text-bitaccess-gold">+5% Bonus</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Purchase $1,000-$4,999:</span>
                    <span className="text-bitaccess-gold">+10% Bonus</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Purchase $5,000+:</span>
                    <span className="text-bitaccess-gold">+15% Bonus</span>
                  </li>
                </ul>
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
