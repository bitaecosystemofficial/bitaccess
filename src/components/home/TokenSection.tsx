
import SectionHeading from "@/components/ui/section-heading";
import TokenStatCard from "@/components/ui/token-stat-card";
import { Button } from "@/components/ui/button";
import { 
  Coins, 
  TrendingUp, 
  ArrowLeftRight,
  ChartPie,
  Bitcoin,
  DollarSign,
  Percent
} from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";

const TokenSection = () => {
  return (
    <section className="py-16 md:py-24 bg-bitaccess-black-dark">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="BIT Access Token"
          subtitle="BIT is the utility token powering our entire ecosystem, enabling transactions, rewards, and governance."
          centered
        />
        
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
              value="100,000,000,000"
              icon={<Coins size={24} />}
            />
            <TokenStatCard
              title="Token Symbol"
              value="BIT"
              icon={<Bitcoin size={24} />}
            />
            <TokenStatCard
              title="Network"
              value="Smart Chain (BSC)"
              icon={<ArrowLeftRight size={24} />}
            />
            <TokenStatCard
              title="Token Standard"
              value="BEP20"
              icon={<TrendingUp size={24} />}
            />
            <TokenStatCard
              title="Tax"
              value="3% Buy / 3% Sell"
              icon={<Percent size={24} />}
            />
            <TokenStatCard
              title="Decimals"
              value="9"
              icon={<DollarSign size={24} />}
            />
          </div>
        </div>
        
        <div className="bg-bitaccess-black-light border border-bitaccess-gold/20 rounded-xl p-6 md:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-bitaccess-gold">Token Distribution & Allocation</h3>
              <p className="text-gray-400 mb-6">
                The BIT Token Distribution and Allocation outlines the planned distribution of the BIT tokens to ensure a balanced, fair, and sustainable ecosystem.
              </p>
              <p className="text-gray-400 mb-6">
                <span className="text-bitaccess-gold font-semibold">Main Applications:</span> Business, E-commerce, Education & Merchant Services
              </p>
              
              <div className="bg-bitaccess-black-dark p-4 rounded-lg border border-bitaccess-gold/10 mb-6">
                <h4 className="text-lg font-semibold text-bitaccess-gold mb-2">Token Usage</h4>
                <ul className="list-disc pl-5 text-gray-400 space-y-2">
                  <li><span className="text-white font-medium">Financial Services:</span> Decentralized payments, cross-border transactions, and rewards</li>
                  <li><span className="text-white font-medium">Educational Platform:</span> Access to courses, certifications, and learning materials</li>
                  <li><span className="text-white font-medium">Merchant Solutions:</span> Integration with retail and e-commerce businesses</li>
                  <li><span className="text-white font-medium">Governance:</span> Participation in ecosystem decisions and development</li>
                </ul>
              </div>
              
              <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                View Whitepaper
              </Button>
            </div>
            
            <div className="lg:col-span-3">
              <h4 className="text-lg font-bold mb-4 text-white">Token Distribution</h4>
              <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10 mb-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Project Development</span>
                      <span className="text-sm text-bitaccess-gold">35.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Company Reserved</span>
                      <span className="text-sm text-bitaccess-gold">5.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Token Burned</span>
                      <span className="text-sm text-bitaccess-gold">10.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">P2P</span>
                      <span className="text-sm text-bitaccess-gold">10.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Marketing</span>
                      <span className="text-sm text-bitaccess-gold">10.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Liquidity CEX</span>
                      <span className="text-sm text-bitaccess-gold">10.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Presale</span>
                      <span className="text-sm text-bitaccess-gold">5.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Liquidity DEX</span>
                      <span className="text-sm text-bitaccess-gold">5.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Management Team</span>
                      <span className="text-sm text-bitaccess-gold">3.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '3%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Foundation</span>
                      <span className="text-sm text-bitaccess-gold">2.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Emergency Fund</span>
                      <span className="text-sm text-bitaccess-gold">2.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Staking</span>
                      <span className="text-sm text-bitaccess-gold">1.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Airdrops, Rewards & Bounty</span>
                      <span className="text-sm text-bitaccess-gold">1.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Creator Dev</span>
                      <span className="text-sm text-bitaccess-gold">1.0%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-bitaccess-gold h-2 rounded-full" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-lg font-bold mb-4 text-white">Funding Allocation</h4>
              <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Product Development</span>
                    <p className="text-lg font-bold text-bitaccess-gold">17%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Marketing</span>
                    <p className="text-lg font-bold text-bitaccess-gold">14%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Company Funds</span>
                    <p className="text-lg font-bold text-bitaccess-gold">10%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Team</span>
                    <p className="text-lg font-bold text-bitaccess-gold">9%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Business Operations</span>
                    <p className="text-lg font-bold text-bitaccess-gold">9%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Community Rewards</span>
                    <p className="text-lg font-bold text-bitaccess-gold">8%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Legal & Regulation</span>
                    <p className="text-lg font-bold text-bitaccess-gold">6%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Taxes</span>
                    <p className="text-lg font-bold text-bitaccess-gold">5%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Contingency</span>
                    <p className="text-lg font-bold text-bitaccess-gold">5%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Sponsors & Partnerships</span>
                    <p className="text-lg font-bold text-bitaccess-gold">5%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Advisors</span>
                    <p className="text-lg font-bold text-bitaccess-gold">4%</p>
                  </div>
                  <div className="bg-bitaccess-black-light rounded p-3 text-center">
                    <span className="text-sm text-gray-400">Charity Works</span>
                    <p className="text-lg font-bold text-bitaccess-gold">4%</p>
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
