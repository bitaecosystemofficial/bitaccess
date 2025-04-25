
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/contexts/WalletContext";
import { useStakingData, stakeTokens } from "@/utils/contractUtils";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const Staking = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const stakingData = useStakingData();
  
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleStake = async (planIndex: number) => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    setSelectedPlan(planIndex);
  };
  
  const handleConfirmStake = async () => {
    if (selectedPlan === null || stakeAmount <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid amount to stake.",
        variant: "destructive"
      });
      return;
    }
    
    const selectedPlanData = stakingData.plans[selectedPlan];
    const minStakeAmount = parseInt(selectedPlanData.minStake.split(' ')[0].replace(/,/g, ''));
    
    if (stakeAmount < minStakeAmount) {
      toast({
        title: "Below Minimum",
        description: `Minimum stake amount is ${minStakeAmount} BIT for this plan.`,
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const durationDays = selectedPlanData.duration === "No lock period" ? 0 : 
        parseInt(selectedPlanData.duration.split(' ')[0]);
      
      const result = await stakeTokens(stakeAmount, durationDays, address!);
      
      if (result.success) {
        toast({
          title: "Staking Successful",
          description: `You have successfully staked ${stakeAmount} BIT tokens!`
        });
        setSelectedPlan(null);
        setStakeAmount(0);
      } else {
        toast({
          title: "Staking Failed",
          description: result.error || "Transaction failed. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancelStake = () => {
    setSelectedPlan(null);
    setStakeAmount(0);
  };

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Staking"
            subtitle="Earn passive income by staking your BIT tokens and supporting network security"
            centered
          />
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="stake" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="stake" className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-bitaccess-black">Stake Tokens</TabsTrigger>
                <TabsTrigger value="rewards" className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-bitaccess-black">My Rewards</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stake">
                <div className="bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20 mb-8">
                  <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                      <TrendingUp size={40} className="text-bitaccess-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Staking Pool Statistics</h3>
                      <p className="text-gray-400">
                        Total Value Locked: {(stakingData.tvl / 1000000).toFixed(1)}M BIT | 
                        Stakers: {stakingData.stakers.toLocaleString()} | 
                        Average APY: {stakingData.averageApy}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
                      <p className="text-gray-400 text-sm mb-1">Your Staked Balance</p>
                      <p className="text-2xl font-bold text-bitaccess-gold">
                        {isConnected ? `${stakingData.userStaked.toLocaleString()} BIT` : '0 BIT'}
                      </p>
                    </div>
                    
                    <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
                      <p className="text-gray-400 text-sm mb-1">Current Rewards</p>
                      <p className="text-2xl font-bold text-bitaccess-gold">
                        {isConnected ? `${stakingData.userRewards.toLocaleString()} BIT` : '0 BIT'}
                      </p>
                    </div>
                  </div>
                  
                  {selectedPlan !== null ? (
                    <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10 mb-8">
                      <h4 className="font-medium text-white mb-4">
                        Stake in {stakingData.plans[selectedPlan].name}
                      </h4>
                      
                      <div className="mb-4">
                        <label className="block text-gray-400 text-sm mb-2">Amount to Stake (BIT)</label>
                        <Input
                          type="number"
                          value={stakeAmount || ''}
                          onChange={(e) => setStakeAmount(parseFloat(e.target.value) || 0)}
                          className="w-full p-3 bg-bitaccess-black-dark border border-bitaccess-gold/20 text-white focus:border-bitaccess-gold"
                          placeholder={`Minimum ${stakingData.plans[selectedPlan].minStake}`}
                        />
                      </div>
                      
                      <div className="mb-6">
                        <p className="text-sm text-gray-400">
                          Expected APY: <span className="text-bitaccess-gold">{stakingData.plans[selectedPlan].apy}</span>
                        </p>
                        <p className="text-sm text-gray-400">
                          Lock Period: <span className="text-bitaccess-gold">{stakingData.plans[selectedPlan].duration}</span>
                        </p>
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button 
                          onClick={handleConfirmStake}
                          disabled={isLoading || stakeAmount <= 0} 
                          className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black"
                        >
                          {isLoading ? 'Processing...' : 'Confirm Stake'}
                        </Button>
                        
                        <Button 
                          onClick={handleCancelStake}
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {stakingData.plans.map((plan, index) => (
                        <Card key={index} className={`bg-bitaccess-black border ${plan.featured ? 'border-bitaccess-gold' : 'border-gray-700'}`}>
                          <CardHeader className="pb-2">
                            <CardTitle className={`text-lg ${plan.featured ? 'text-bitaccess-gold' : 'text-white'}`}>
                              {plan.name}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                              {plan.duration}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-2">
                              <p className={`text-2xl font-bold ${plan.featured ? 'text-bitaccess-gold' : 'text-white'}`}>
                                {plan.apy}
                              </p>
                              <p className="text-xs text-gray-400">Annual Percentage Yield</p>
                            </div>
                            <p className="text-xs text-gray-400 mb-3">Min. {plan.minStake}</p>
                            <Button 
                              onClick={() => handleStake(index)}
                              className={`w-full ${plan.featured 
                                ? 'bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black'
                                : 'bg-transparent border border-gray-600 hover:border-bitaccess-gold text-gray-300 hover:text-bitaccess-gold'}`}
                              size="sm"
                            >
                              Stake Now
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                
                {!isConnected && (
                  <div className="text-center">
                    <Button 
                      onClick={connectWallet}
                      size="lg" 
                      className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                    >
                      Connect Wallet to Stake
                    </Button>
                  </div>
                )}
                
                <div className="mt-6 text-center text-sm text-gray-400">
                  <p>Running on Binance Smart Chain (BSC) | View contract on <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer" className="text-bitaccess-gold hover:underline">BscScan</a></p>
                </div>
              </TabsContent>
              
              <TabsContent value="rewards">
                <div className="bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20 text-center">
                  {isConnected ? (
                    <div>
                      <div className="mb-6">
                        <h4 className="text-xl font-bold text-white mb-2">Your Staking Rewards</h4>
                        <p className="text-3xl font-bold text-bitaccess-gold mb-4">{stakingData.userRewards.toLocaleString()} BIT</p>
                        <Button 
                          className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                          disabled={stakingData.userRewards <= 0}
                        >
                          Claim Rewards
                        </Button>
                      </div>
                      
                      {stakingData.userStaked > 0 ? (
                        <div className="mt-8">
                          <h5 className="text-lg font-medium text-white mb-4">Active Stakes</h5>
                          <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  <th className="py-3 px-4 text-gray-400">Amount</th>
                                  <th className="py-3 px-4 text-gray-400">Plan</th>
                                  <th className="py-3 px-4 text-gray-400">APY</th>
                                  <th className="py-3 px-4 text-gray-400">Locked Until</th>
                                  <th className="py-3 px-4 text-gray-400">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="py-3 px-4 text-white">{stakingData.userStaked.toLocaleString()} BIT</td>
                                  <td className="py-3 px-4 text-white">90-Day Lock</td>
                                  <td className="py-3 px-4 text-bitaccess-gold">18%</td>
                                  <td className="py-3 px-4 text-white">Feb 15, 2025</td>
                                  <td className="py-3 px-4">
                                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 mr-2">
                                      Details
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-400 mt-4">You have no active stakes. Start staking to earn rewards!</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-300 mb-4">Please connect your wallet to view your staking rewards.</p>
                      <Button 
                        onClick={connectWallet}
                        className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                      >
                        Connect Wallet
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Staking;
