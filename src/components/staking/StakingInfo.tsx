
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Award } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { contractService } from "@/services/ContractService";
import { ethers } from "ethers";

const StakingInfo = () => {
  const { isConnected, address } = useWallet();
  const [stakingInfo, setStakingInfo] = useState({
    totalStaked: "0",
    userStaked: "0",
    rewards: "0",
    apy: 15
  });

  useEffect(() => {
    const fetchStakingInfo = async () => {
      if (!isConnected || !address) return;
      
      try {
        const info = await contractService.getStakingInfo(address);
        setStakingInfo(prev => ({
          ...prev,
          userStaked: ethers.utils.formatEther(info.stakedBalance),
          rewards: ethers.utils.formatEther(info.rewards)
        }));
      } catch (error) {
        console.error("Error fetching staking info:", error);
      }
    };

    fetchStakingInfo();
    const interval = setInterval(fetchStakingInfo, 30000);
    
    return () => clearInterval(interval);
  }, [isConnected, address]);

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
