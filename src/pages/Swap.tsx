
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Exchange } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Swap = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Token Swap"
            subtitle="Swap BIT tokens with other cryptocurrencies quickly and securely"
            centered
          />
          
          <div className="max-w-lg mx-auto">
            <div className="bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-bitaccess-gold/10 p-3 rounded-full">
                  <Exchange size={32} className="text-bitaccess-gold" />
                </div>
              </div>
              
              {/* From Token */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2">From</label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="bg-bitaccess-black border border-bitaccess-gold/20 focus:border-bitaccess-gold focus:ring-bitaccess-gold w-32">
                      <SelectValue placeholder="ETH" />
                    </SelectTrigger>
                    <SelectContent className="bg-bitaccess-black border border-bitaccess-gold/20">
                      <SelectItem value="eth">ETH</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="bnb">BNB</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <input
                    type="number"
                    placeholder="0.0"
                    className="flex-1 p-3 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Balance: 0 ETH</span>
                  <button className="text-xs text-bitaccess-gold">Max</button>
                </div>
              </div>
              
              {/* Swap Icon */}
              <div className="flex justify-center my-4">
                <button className="bg-bitaccess-black p-2 rounded-full border border-bitaccess-gold/20 hover:border-bitaccess-gold transition-colors">
                  <Exchange size={20} className="text-bitaccess-gold" />
                </button>
              </div>
              
              {/* To Token */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2">To</label>
                <div className="flex gap-3">
                  <Select defaultValue="bit">
                    <SelectTrigger className="bg-bitaccess-black border border-bitaccess-gold/20 focus:border-bitaccess-gold focus:ring-bitaccess-gold w-32">
                      <SelectValue placeholder="BIT" />
                    </SelectTrigger>
                    <SelectContent className="bg-bitaccess-black border border-bitaccess-gold/20">
                      <SelectItem value="bit">BIT</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <input
                    type="number"
                    placeholder="0.0"
                    className="flex-1 p-3 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none"
                    readOnly
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Balance: 0 BIT</span>
                </div>
              </div>
              
              {/* Exchange Rate */}
              <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Exchange Rate</span>
                  <span className="text-white">1 ETH = 12,500 BIT</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-400">Slippage Tolerance</span>
                  <span className="text-white">0.5%</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-400">Network Fee</span>
                  <span className="text-white">~0.005 ETH</span>
                </div>
              </div>
              
              <Button className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                Connect Wallet
              </Button>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-400">
              <p>Powered by BitAccess DEX | <a href="#" className="text-bitaccess-gold hover:underline">View Chart</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Swap;
