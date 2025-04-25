
import SectionHeading from "@/components/ui/section-heading";

const RoadmapSection = () => {
  const roadmapItems = [
    {
      quarter: "Q2 2025",
      title: "Platform Launch",
      items: [
        "Token Presale Launch",
        "Smart Contract Audit",
        "Community Building",
        "Airdrop Campaign"
      ]
    },
    {
      quarter: "Q3 2025",
      title: "Ecosystem Growth",
      items: [
        "DEX Integration",
        "Staking Platform Launch",
        "Merchant Network Beta",
        "Mobile App Development"
      ]
    },
    {
      quarter: "Q4 2025",
      title: "Market Expansion",
      items: [
        "CEX Listings",
        "Cross-chain Bridge",
        "Merchant Network Launch",
        "Educational Portal Beta"
      ]
    },
    {
      quarter: "Q1 2026",
      title: "Platform Evolution",
      items: [
        "NFT Marketplace",
        "Governance System",
        "DeFi Products Launch",
        "Enhanced Security Features"
      ]
    },
    {
      quarter: "Q2 2026",
      title: "Global Integration",
      items: [
        "Global Merchant Expansion",
        "Advanced DeFi Features",
        "Mobile App Release",
        "Enterprise Solutions"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="Platform Roadmap"
          subtitle="Our strategic vision and development milestones from Q2 2025 to Q2 2026"
          centered
        />
        
        <div className="relative mt-12">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-bitaccess-gold/20" />
          
          <div className="space-y-16">
            {roadmapItems.map((item, index) => (
              <div key={item.quarter} className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-1/2" />
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2">
                  <div className="w-4 h-4 rounded-full bg-bitaccess-gold" />
                </div>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                  <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
                    <span className="text-bitaccess-gold font-semibold">{item.quarter}</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-4">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.items.map((listItem, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <span className="w-1.5 h-1.5 bg-bitaccess-gold/60 rounded-full mr-2" />
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
