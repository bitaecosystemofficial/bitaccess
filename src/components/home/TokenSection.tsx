
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import TokenFeatures from "./tokenSection/TokenFeatures";
import TokenUsage from "./tokenSection/TokenUsage";
import TokenStats from "./tokenSection/TokenStats";
import TokenDistributionChart from "./tokenSection/TokenDistributionChart";
import FundingAllocation from "./tokenSection/FundingAllocation";

const TokenSection = () => {
  return (
    <section className="py-16 md:py-24 bg-bitaccess-black-dark">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="BIT Access Token"
          subtitle="BIT is the utility token powering our entire ecosystem, enabling transactions, rewards, and governance."
          centered
        />
        
        <TokenStats />
        
        <div className="bg-bitaccess-black-light border border-bitaccess-gold/20 rounded-xl p-6 md:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold mb-4 text-bitaccess-gold">Token Distribution & Allocation</h3>
              <p className="text-gray-400 mb-6">
                The BIT Token Distribution and Allocation outlines the planned distribution of the BIT tokens to ensure a balanced, fair, and sustainable ecosystem.
              </p>
              <p className="text-gray-400 mb-6">
                <span className="text-bitaccess-gold font-semibold">Main Applications:</span> Business, E-commerce, Education & Merchant Services
              </p>
              
              <TokenUsage />
              <TokenFeatures />
              
              <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                View Whitepaper
              </Button>
            </div>
            
            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold mb-4 text-white">Token Distribution</h4>
              <TokenDistributionChart />
              
              <h4 className="text-lg font-bold mb-4 text-white">Funding Allocation</h4>
              <FundingAllocation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenSection;
