
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StakeForm from "@/components/staking/StakeForm";
import UnstakeForm from "@/components/staking/UnstakeForm";
import StakingInfo from "@/components/staking/StakingInfo";
import StakingContract from "@/components/staking/StakingContract";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import { useWallet } from "@/contexts/WalletContext";

const Staking = () => {
  const { isConnected, connectWallet } = useWallet();
  
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

            <StakingContract />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Staking;
