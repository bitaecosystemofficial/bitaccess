
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Award } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { contractService } from "@/services/ContractService";
import { useContractEvents } from "@/hooks/useContractEvents";
import { ethers } from "ethers";
import { toast } from "@/hooks/use-toast";

const StakingInfo = () => {
  const { isConnected, address } = useWallet();
  const { latestStakingEvent } = useContractEvents();
  const [stakingInfo, setStakingInfo] = useState({
    totalStaked: "0",
    userStaked: "0",
    rewards: "0",
    apy: 15
  });

  // Define fetchStakingInfo as a useCallback so it can be used in multiple useEffect hooks
  const fetchStakingInfo = useCallback(async () => {
    if (!isConnected || !address) return;
    
    try {
      const info = await contractService.getStakingInfo(address);
      setStakingInfo(prev => ({
        ...prev,
        userStaked: ethers.utils.formatEther(info.stakedBalance),
        rewards: ethers.utils.formatEther(info.rewards),
        apy: info.apy.toNumber()
      }));
    } catch (error) {
      console.error("Error fetching staking info:", error);
      toast({
        title: "Error",
        description: "Failed to fetch staking information",
        variant: "destructive"
      });
    }
  }, [isConnected, address]);

  useEffect(() => {
    fetchStakingInfo();
    const interval = setInterval(fetchStakingInfo, 30000);
    
    return () => clearInterval(interval);
  }, [fetchStakingInfo]);

  // Update UI when new staking events are received
  useEffect(() => {
    if (latestStakingEvent) {
      fetchStakingInfo();
      toast({
        title: "Staking Update",
        description: `New ${latestStakingEvent.type} event received`,
      });
    }
  }, [latestStakingEvent, fetchStakingInfo]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card className="bg-bitaccess-black p-4 border border-bitaccess-gold/10">
        <CardContent className="p-0">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-bitaccess-gold" />
            <h4 className="font-medium text-white">APY</h4>
          </div>
          <p className="text-2xl font-bold text-bitaccess-gold">{stakingInfo.apy}%</p>
          <p className="text-sm text-gray-400 mt-1">Annual Percentage Yield</p>
        </CardContent>
      </Card>
      
      <Card className="bg-bitaccess-black p-4 border border-bitaccess-gold/10">
        <CardContent className="p-0">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-bitaccess-gold" />
            <h4 className="font-medium text-white">Your Rewards</h4>
          </div>
          <p className="text-2xl font-bold text-bitaccess-gold">
            {parseFloat(stakingInfo.rewards).toFixed(4)} BIT
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Staked: {parseFloat(stakingInfo.userStaked).toFixed(2)} BIT
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StakingInfo;
