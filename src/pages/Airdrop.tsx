
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const Airdrop = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Airdrop"
            subtitle="Participate in our token airdrop program and receive free BIT tokens"
            centered
          />
          
          <div className="max-w-3xl mx-auto bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                <Gift size={40} className="text-bitaccess-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Current Airdrop Phase: 1 of 3</h3>
                <p className="text-gray-400">
                  Total allocation: 2,000,000 BIT tokens | Ends in: 14 days
                </p>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              <div>
                <h4 className="font-medium text-bitaccess-gold mb-2">How to Participate:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Connect your wallet using the button below</li>
                  <li>Complete the required social tasks (Twitter, Telegram, etc.)</li>
                  <li>Refer friends to earn bonus tokens (10% of their allocation)</li>
                  <li>Verify your participation and submit your wallet address</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium text-bitaccess-gold mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Follow BitAccess on Twitter</li>
                  <li>Join our Telegram community</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Share the airdrop announcement (with proof)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10 mb-8">
              <h4 className="font-medium text-white mb-4">Your Airdrop Status</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Twitter Task</span>
                    <span className="text-sm text-red-500">Not Completed</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Telegram Task</span>
                    <span className="text-sm text-red-500">Not Completed</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Newsletter</span>
                    <span className="text-sm text-red-500">Not Completed</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Share Proof</span>
                    <span className="text-sm text-red-500">Not Completed</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button size="lg" className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                Connect Wallet to Participate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Airdrop;
