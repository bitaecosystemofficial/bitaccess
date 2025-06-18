
const TokenHoldersCard = ({ holdersCount }: { holdersCount: number }) => {
  return (
    <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Token Holders</h3>
        <div className="bg-bitaccess-gold/20 rounded-full px-3 py-1 text-sm text-bitaccess-gold">
          3,198 holders
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Top 10 holders</span>
          <span className="text-white">68.5%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-bitaccess-gold h-2.5 rounded-full" style={{ width: "68.5%" }}></div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Top 50 holders</span>
          <span className="text-white">84.3%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-bitaccess-gold h-2.5 rounded-full" style={{ width: "84.3%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default TokenHoldersCard;
