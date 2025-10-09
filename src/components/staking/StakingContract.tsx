
import { contractAddresses } from "@/constants/contracts";
import { useStaking } from "@/hooks/useStaking";
import { formatDistanceToNow } from "date-fns";

const StakingContract = () => {
  const { stakingData } = useStaking();

  return (
    <div className="mt-8 border-t border-bitaccess-gold/10 pt-6 space-y-4">
      <h3 className="text-xl font-bold text-white">Contract Information</h3>
      
      <div className="p-5 bg-bitaccess-black-light rounded-lg border border-bitaccess-gold/10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 mb-1">Staking Contract Address</p>
            <a
              href={`https://binplorer.com/address/${contractAddresses.staking}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bitaccess-gold hover:underline break-all"
            >
              {contractAddresses.staking}
            </a>
          </div>
          
          <div>
            <p className="text-gray-400 mb-1">BIT Token Contract</p>
            <a
              href={`https://binplorer.com/address/${contractAddresses.token}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bitaccess-gold hover:underline break-all"
            >
              {contractAddresses.token}
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-bitaccess-gold/10">
          <div>
            <p className="text-gray-400">Network</p>
            <p className="text-white">Binance Smart Chain (BSC)</p>
          </div>
          
          <div>
            <p className="text-gray-400">Minimum Stake</p>
            <p className="text-white">{stakingData.minStakeAmount} BIT</p>
          </div>
          
          <div>
            <p className="text-gray-400">Early Withdrawal Fee</p>
            <p className="text-white">{stakingData.earlyWithdrawalFee}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingContract;
