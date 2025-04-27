
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/contexts/WalletContext";
import StakeForm from "@/components/staking/StakeForm";
import UnstakeForm from "@/components/staking/UnstakeForm";
import StakingInfo from "@/components/staking/StakingInfo";
import { contractAddresses } from "@/constants/contracts";

const Staking = () => {
  const { isConnected, connectWallet } = useWallet();

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Staking Program"
            subtitle="Stake your BIT tokens and earn rewards"
            centered
          />

          <div className="max-w-3xl mx-auto bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
            <StakingInfo />
            
            <Tabs defaultValue="stake" className="w-full mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stake">Stake</TabsTrigger>
                <TabsTrigger value="unstake">Unstake</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stake" className="space-y-4 mt-4">
                <StakeForm isConnected={isConnected} connectWallet={connectWallet} />
              </TabsContent>

              <TabsContent value="unstake" className="space-y-4 mt-4">
                <UnstakeForm isConnected={isConnected} connectWallet={connectWallet} />
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>
                Running on Binance Smart Chain (BSC) | View contract on{" "}
                <a
                  href={`https://bscscan.com/address/${contractAddresses.staking}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bitaccess-gold hover:underline"
                >
                  BscScan
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Staking;
