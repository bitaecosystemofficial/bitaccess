
import { contractAddresses } from "@/constants/contracts";

const StakingContract = () => {
  return (
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
  );
};

export default StakingContract;
