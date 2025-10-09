import SectionHeading from "@/components/ui/section-heading";

const CrossChainSection = () => {
  const networks = [
    {
      name: "BNB Chain",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
      description: "Fast, low-cost transactions on BNB Smart Chain"
    },
    {
      name: "Polygon",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
      description: "Scalable Ethereum Layer 2 solution"
    },
    {
      name: "Base",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/27716.png",
      description: "Coinbase's Ethereum L2 network"
    },
    {
      name: "Arbitrum",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png",
      description: "Optimistic rollup for Ethereum scaling"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="Cross-Chain Network Support"
          subtitle="BIT Token is available across multiple blockchain networks for maximum accessibility"
          centered
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {networks.map((network) => (
            <div
              key={network.name}
              className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all hover:shadow-lg hover:shadow-bitaccess-gold/10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img
                    src={network.logo}
                    alt={`${network.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{network.name}</h3>
                <p className="text-sm text-gray-400">{network.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CrossChainSection;
