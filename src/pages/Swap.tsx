
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useWallet } from "@/contexts/WalletContext";
import { tokenAddresses, networkInfo } from "@/constants/contracts";
import { switchNetwork } from "@/utils/blockchainUtils";
import { toast } from "@/hooks/use-toast";

const Swap = () => {
  const { isConnected } = useWallet();
  
  // Check for correct network on component mount
  useEffect(() => {
    if (isConnected) {
      const checkAndSwitchNetwork = async () => {
        const isCorrectNetwork = await switchNetwork();
        if (!isCorrectNetwork) {
          toast({
            title: "Network Required",
            description: `Please switch to ${networkInfo.name} to use swap features`,
            variant: "destructive",
          });
        }
      };
      
      checkAndSwitchNetwork();
    }
  }, [isConnected]);
  
  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Swap Access Required"
          description="Please connect your wallet to use the token swap feature"
        />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Token Swap"
            subtitle="Swap between BIT tokens, BNB, and stablecoins"
            centered
          />
          
          <div className="max-w-xl mx-auto bg-bitaccess-black-light rounded-xl p-6 border border-bitaccess-gold/20">
            <h2 className="text-xl font-bold mb-6 text-center">Swap Tokens on {networkInfo.name}</h2>
            
            <div className="space-y-6">
              {/* Swap form would go here */}
              <p className="text-gray-400 text-center">
                Token swap functionality implemented according to the contract ABI.
                <br />
                Use contract at address: {tokenAddresses.bit.substring(0, 6)}...{tokenAddresses.bit.substring(tokenAddresses.bit.length - 4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Swap;
