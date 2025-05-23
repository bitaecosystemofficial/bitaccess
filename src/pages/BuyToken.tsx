
import React from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useWallet } from "@/contexts/WalletContext";
import { BuyTokenContainer } from "@/components/buytoken/BuyTokenContainer";

const BuyToken = () => {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Buy Token Access Required"
          description="Please connect your wallet to purchase BIT tokens"
        />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="Buy BIT Tokens"
            subtitle="Purchase BIT tokens during the presale phase with special bonuses"
            centered
          />
          
          <BuyTokenContainer />
        </div>
      </div>
    </Layout>
  );
};

export default BuyToken;
