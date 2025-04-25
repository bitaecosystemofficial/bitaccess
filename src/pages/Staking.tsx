
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Staking = () => {
  const stakingPlans = [
    {
      name: "Flexible Staking",
      duration: "No lock period",
      apy: "8%",
      minStake: "100 BIT",
      description: "Stake and unstake anytime with lower returns"
    },
    {
      name: "30-Day Lock",
      duration: "30 days",
      apy: "12%",
      minStake: "500 BIT",
      description: "Short-term commitment with moderate returns"
    },
    {
      name: "90-Day Lock",
      duration: "90 days",
      apy: "18%",
      minStake: "1,000 BIT",
      description: "Medium-term commitment with higher returns",
      featured: true
    },
    {
      name: "180-Day Lock",
      duration: "180 days",
      apy: "25%",
      minStake: "2,500 BIT",
      description: "Long-term commitment with premium returns"
    }
  ];

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
                        Total Value Locked: 12.5M BIT | Stakers: 4,230 | Average APY: 16.8%
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
                      <p className="text-gray-400 text-sm mb-1">Your Staked Balance</p>
                      <p className="text-2xl font-bold text-bitaccess-gold">0 BIT</p>
                    </div>
                    
                    <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
                      <p className="text-gray-400 text-sm mb-1">Current Rewards</p>
                      <p className="text-2xl font-bold text-bitaccess-gold">0 BIT</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stakingPlans.map((plan, index) => (
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
                </div>
                
                <div className="text-center">
                  <Button size="lg" className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                    Connect Wallet to Stake
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="rewards">
                <div className="bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20 text-center">
                  <p className="text-gray-300 mb-4">Please connect your wallet to view your staking rewards.</p>
                  <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                    Connect Wallet
                  </Button>
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
