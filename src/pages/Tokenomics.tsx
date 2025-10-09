import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import TokenFeatures from "@/components/home/tokenSection/TokenFeatures";
import TokenUsage from "@/components/home/tokenSection/TokenUsage";
import TokenStats from "@/components/home/tokenSection/TokenStats";
import TokenDistributionChart from "@/components/home/tokenSection/TokenDistributionChart";
import FundingAllocation from "@/components/home/tokenSection/FundingAllocation";
import { Link } from "react-router-dom";

const Tokenomics = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8 max-w-7xl">
          <SectionHeading
            title="BIT Access Token"
            subtitle="BIT is the utility token powering our entire ecosystem, enabling transactions, rewards, and governance."
            centered
          />
          
          {/* Token Stats */}
          <div className="mb-16">
            <TokenStats />
          </div>
          
          {/* Main Content Grid */}
          <div className="bg-bitaccess-black-light border border-bitaccess-gold/20 rounded-xl p-6 md:p-10 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Distribution Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-bitaccess-gold">Token Distribution & Allocation</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    The BIT Token Distribution and Allocation outlines the planned distribution of the BIT tokens to ensure a balanced, fair, and sustainable ecosystem.
                  </p>
                  <p className="text-gray-400 mb-6">
                    <span className="text-bitaccess-gold font-semibold">Main Applications:</span> Business, E-commerce & Community Services
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4 text-white">Token Usage</h4>
                  <TokenUsage />
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4 text-white">Key Features</h4>
                  <TokenFeatures />
                </div>
                
                <Link to="/whitepaper">
                  <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium w-full md:w-auto">
                    View Whitepaper
                  </Button>
                </Link>
              </div>
              
              {/* Right Column - Charts */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold mb-6 text-white">Token Distribution</h4>
                  <TokenDistributionChart />
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-6 text-white">Funding Allocation</h4>
                  <FundingAllocation />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
              <h4 className="text-lg font-bold text-bitaccess-gold mb-3">Token Standard</h4>
              <p className="text-gray-400 text-sm mb-2">BEP-20 (Binance Smart Chain)</p>
              <p className="text-gray-300 text-xs">Fully compatible with BSC ecosystem and wallets</p>
            </div>

            <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
              <h4 className="text-lg font-bold text-bitaccess-gold mb-3">Total Supply</h4>
              <p className="text-gray-400 text-sm mb-2">100,000,000,000 BIT</p>
              <p className="text-gray-300 text-xs">Fixed maximum supply with deflationary mechanisms</p>
            </div>

            <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
              <h4 className="text-lg font-bold text-bitaccess-gold mb-3">Token Burns</h4>
              <p className="text-gray-400 text-sm mb-2">10% Allocated for Burning</p>
              <p className="text-gray-300 text-xs">Regular burns to reduce supply and increase value</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-bitaccess-black-light to-bitaccess-black p-8 rounded-xl border border-bitaccess-gold/20 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-bitaccess-gold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Join the BIT Access ecosystem and start earning rewards through staking, community participation, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/presale">
                <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black font-semibold px-8 py-3 w-full sm:w-auto">
                  Buy BIT Tokens
                </Button>
              </Link>
              <Link to="/staking">
                <Button 
                  variant="outline" 
                  className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 font-semibold px-8 py-3 w-full sm:w-auto"
                >
                  Start Staking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tokenomics;
