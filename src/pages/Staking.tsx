import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, ChevronsUpDown, Clock, TrendingUp } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { contractAddresses } from "@/constants/contracts";

const Staking = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("30");

  const handleStake = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (!stakeAmount) {
      toast({
        title: "Error",
        description: "Please enter the amount to stake.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Stake Initiated",
      description: `Staking ${stakeAmount} BIT for ${selectedDuration} days.`,
    });
  };

  const handleUnstake = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (!unstakeAmount) {
      toast({
        title: "Error",
        description: "Please enter the amount to unstake.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Unstake Initiated",
      description: `Unstaking ${unstakeAmount} BIT.`,
    });
  };

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
            <Tabs defaultValue="stake" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stake">Stake</TabsTrigger>
                <TabsTrigger value="unstake">Unstake</TabsTrigger>
              </TabsList>
              <TabsContent value="stake" className="space-y-4">
                <Card className="bg-bitaccess-black p-4 border border-bitaccess-gold/10">
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-bitaccess-gold" />
                      <p className="text-sm text-gray-400">
                        Earn up to 15% APY on your staked BIT tokens.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400 mb-2">
                        Amount to Stake
                      </p>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="bg-bitaccess-black border-bitaccess-gold/20 text-white"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400 mb-2">
                        Staking Duration
                      </p>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          className={`border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 ${
                            selectedDuration === "30" ? "bg-bitaccess-gold/10" : ""
                          }`}
                          onClick={() => setSelectedDuration("30")}
                        >
                          30 Days
                        </Button>
                        <Button
                          variant="outline"
                          className={`border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 ${
                            selectedDuration === "90" ? "bg-bitaccess-gold/10" : ""
                          }`}
                          onClick={() => setSelectedDuration("90")}
                        >
                          90 Days
                        </Button>
                        <Button
                          variant="outline"
                          className={`border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 ${
                            selectedDuration === "180" ? "bg-bitaccess-gold/10" : ""
                          }`}
                          onClick={() => setSelectedDuration("180")}
                        >
                          180 Days
                        </Button>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                      onClick={handleStake}
                    >
                      Stake BIT
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="unstake" className="space-y-4">
                <Card className="bg-bitaccess-black p-4 border border-bitaccess-gold/10">
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-bitaccess-gold" />
                      <p className="text-sm text-gray-400">
                        Unstake your BIT tokens at any time. A small fee may
                        apply.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400 mb-2">
                        Amount to Unstake
                      </p>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={unstakeAmount}
                        onChange={(e) => setUnstakeAmount(e.target.value)}
                        className="bg-bitaccess-black border-bitaccess-gold/20 text-white"
                      />
                    </div>

                    <Button
                      className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                      onClick={handleUnstake}
                    >
                      Unstake BIT
                    </Button>
                  </CardContent>
                </Card>
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
