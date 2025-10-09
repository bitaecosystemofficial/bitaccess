
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StakeForm from "@/components/staking/StakeForm";
import UnstakeForm from "@/components/staking/UnstakeForm";
import StakingInfo from "@/components/staking/StakingInfo";
import StakingContract from "@/components/staking/StakingContract";
import StakingTiers from "@/components/staking/StakingTiers";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useWallet } from "@/contexts/WalletContext";
import { networkInfo } from "@/constants/contracts";
import { switchNetwork } from "@/utils/blockchainUtils";
import { toast } from "@/hooks/use-toast";

const Staking = () => {
  const { isConnected, connectWallet } = useWallet();
  
  // Check for correct network on component mount
  useEffect(() => {
    if (isConnected) {
      const checkAndSwitchNetwork = async () => {
        const isCorrectNetwork = await switchNetwork();
        if (!isCorrectNetwork) {
          toast({
            title: "Network Required",
            description: `Please switch to ${networkInfo.name} to access staking features`,
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
          title="Staking Access Required"
          description="Please connect your wallet to access the staking platform"
        />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BIT Stake Token Program"
            subtitle="Stake your BIT tokens and earn rewards up to 30% APY"
            centered
          />

          <div className="max-w-5xl mx-auto bg-bitaccess-black-light rounded-xl p-6 md:p-8 border border-bitaccess-gold/20">
            <StakingInfo />
            
            <Tabs defaultValue="stake" className="w-full mt-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="stake">Stake</TabsTrigger>
                <TabsTrigger value="unstake">Unstake</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stake" className="space-y-6">
                <StakeForm isConnected={isConnected} connectWallet={connectWallet} />
              </TabsContent>

              <TabsContent value="unstake" className="space-y-6">
                <UnstakeForm isConnected={isConnected} connectWallet={connectWallet} />
              </TabsContent>
            </Tabs>
            
            <div className="mt-12">
              <StakingTiers />
            </div>

            <StakingContract />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Staking;
