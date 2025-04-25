
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coins } from "lucide-react";

const Presale = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Token Presale"
            subtitle="Secure your BIT tokens at the most advantageous price before public listing"
            centered
          />
          
          <div className="max-w-3xl mx-auto bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                <Coins size={40} className="text-bitaccess-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Presale Phase: 2 of 3</h3>
                <p className="text-gray-400">
                  Current Price: $0.042 | Next Phase: $0.056 | Launch Price: $0.07
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-bitaccess-gold">68% (3,400,000 / 5,000,000 BIT)</span>
              </div>
              <Progress value={68} className="h-3 bg-gray-700" indicatorClassName="bg-bitaccess-gold" />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-400">Soft Cap: 2M BIT</span>
                <span className="text-xs text-gray-400">Hard Cap: 5M BIT</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
                <p className="text-gray-400 text-sm mb-1">Presale Ends In</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-bitaccess-black-dark p-2 text-center rounded">
                    <span className="block text-xl font-bold text-bitaccess-gold">07</span>
                    <span className="text-xs text-gray-500">Days</span>
                  </div>
                  <div className="bg-bitaccess-black-dark p-2 text-center rounded">
                    <span className="block text-xl font-bold text-bitaccess-gold">18</span>
                    <span className="text-xs text-gray-500">Hours</span>
                  </div>
                  <div className="bg-bitaccess-black-dark p-2 text-center rounded">
                    <span className="block text-xl font-bold text-bitaccess-gold">45</span>
                    <span className="text-xs text-gray-500">Minutes</span>
                  </div>
                  <div className="bg-bitaccess-black-dark p-2 text-center rounded">
                    <span className="block text-xl font-bold text-bitaccess-gold">32</span>
                    <span className="text-xs text-gray-500">Seconds</span>
                  </div>
                </div>
              </div>
              
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
            
            <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10 mb-8">
              <h4 className="font-medium text-white mb-4">Purchase BIT Tokens</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Amount in USD</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter USD amount"
                      className="w-full p-3 bg-bitaccess-black-dark border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">USD</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">You will receive</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="w-full p-3 bg-bitaccess-black-dark border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none pr-12"
                      readOnly
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">BIT</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button size="lg" className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                Connect Wallet to Purchase
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Presale;
