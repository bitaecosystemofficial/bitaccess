
import SectionHeading from "@/components/ui/section-heading";
import TokenStatCard from "@/components/ui/token-stat-card";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, ArrowLeftRight } from "lucide-react";

const TokenSection = () => {
  return (
    <section className="py-16 md:py-24 bg-bitaccess-black-dark">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="BIT Access Token"
          subtitle="BIT is the utility token powering our entire ecosystem, enabling transactions, rewards, and governance."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <TokenStatCard
            title="Current Price"
            value="$0.052 USD"
            icon={<Coins size={24} />}
          />
          <TokenStatCard
            title="Market Cap"
            value="$5.2M USD"
            icon={<TrendingUp size={24} />}
          />
          <TokenStatCard
            title="Total Supply"
            value="100,000,000 BIT"
            icon={<ArrowLeftRight size={24} />}
          />
        </div>
        
        <div className="bg-bitaccess-black-light border border-bitaccess-gold/20 rounded-xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-bitaccess-gold">Token Distribution</h3>
              <p className="text-gray-400 mb-6">
                Our tokenomics are designed for long-term sustainability and growth of the ecosystem, with significant allocations for community rewards and development.
              </p>
              <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                View Whitepaper
              </Button>
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Public Sale</span>
                      <span className="text-sm text-bitaccess-gold">40%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Team & Advisors</span>
                      <span className="text-sm text-bitaccess-gold">15%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Ecosystem & Rewards</span>
                      <span className="text-sm text-bitaccess-gold">25%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Marketing</span>
                      <span className="text-sm text-bitaccess-gold">10%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Strategic Partnerships</span>
                      <span className="text-sm text-bitaccess-gold">10%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenSection;
