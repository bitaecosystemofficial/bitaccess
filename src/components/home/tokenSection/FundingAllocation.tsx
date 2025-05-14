
import { fundingAllocation } from "./tokenDistributionData";

const FundingAllocation = () => {
  return (
    <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {fundingAllocation.map((item) => (
          <div key={item.name} className="bg-bitaccess-black-light rounded p-3 text-center">
            <span className="text-sm text-gray-400">{item.name}</span>
            <p className="text-lg font-bold text-bitaccess-gold">{item.percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundingAllocation;
