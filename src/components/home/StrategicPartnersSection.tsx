
import SectionHeading from "@/components/ui/section-heading";
import { AspectRatio } from "../ui/aspect-ratio";
import { ExternalLink } from "lucide-react";

const partners = [
  {
    name: "BIT Corp",
    logo: "/placeholder.svg",
    description: "Blockchain Innovation and Technology Corporation specializing in comprehensive blockchain education and development.",
    website: "#"
  },
  {
    name: "APCPI, Inc.",
    logo: "/placeholder.svg",
    description: "Association of Professional Competencies and Performance Improvement, delivering advanced professional education programs.",
    website: "#"
  },
  {
    name: "BIT Merchant",
    logo: "/placeholder.svg",
    description: "Specialized platform for merchants integrating blockchain payment solutions across various industries.",
    website: "#"
  },
  {
    name: "CITFEE",
    logo: "/placeholder.svg",
    description: "Center for Innovative Technology in Financial and Educational Excellence, focusing on financial education and literacy.",
    website: "#"
  },
  {
    name: "Bscscan",
    logo: "/placeholder.svg",
    description: "Official block explorer for Binance Smart Chain, providing comprehensive transaction validation and verification.",
    website: "https://bscscan.com"
  },
  {
    name: "Solscan",
    logo: "/placeholder.svg",
    description: "Leading block explorer for Solana blockchain, offering detailed transaction data and verification services.",
    website: "https://solscan.io"
  },
  {
    name: "Suiscan",
    logo: "/placeholder.svg",
    description: "Primary block explorer for the SUI blockchain network, providing transaction verification and validation.",
    website: "#"
  },
  {
    name: "Dexscreener",
    logo: "/placeholder.svg",
    description: "Advanced token analytics platform offering real-time market data across multiple blockchain networks.",
    website: "https://dexscreener.com"
  },
  {
    name: "Dextools",
    logo: "/placeholder.svg",
    description: "Comprehensive trading platform with advanced analytics and real-time data for decentralized exchanges.",
    website: "https://www.dextools.io"
  },
  {
    name: "Pancakeswap",
    logo: "/placeholder.svg",
    description: "Leading decentralized exchange platform on Binance Smart Chain with extensive trading and liquidity features.",
    website: "https://pancakeswap.finance"
  },
  {
    name: "Raydium",
    logo: "/placeholder.svg",
    description: "Premier automated market maker and liquidity provider on the Solana blockchain ecosystem.",
    website: "https://raydium.io"
  },
  {
    name: "Orca",
    logo: "/placeholder.svg",
    description: "User-friendly decentralized exchange focused on simplifying trading experience on Solana network.",
    website: "https://www.orca.so"
  },
  {
    name: "Cetus",
    logo: "/placeholder.svg",
    description: "Innovative decentralized exchange platform built for the SUI blockchain ecosystem.",
    website: "#"
  },
  {
    name: "CoinmarketCap",
    logo: "/placeholder.svg",
    description: "World's leading cryptocurrency price-tracking website with comprehensive market data and analytics.",
    website: "https://coinmarketcap.com"
  },
  {
    name: "Coingecko",
    logo: "/placeholder.svg",
    description: "Trusted source for cryptocurrency rankings and market data with extensive coin information.",
    website: "https://www.coingecko.com"
  }
];

const StrategicPartnersSection = () => {
  return (
    <section className="py-16 px-4 md:py-24 bg-bitaccess-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-[radial-gradient(ellipse_at_center,_rgba(245,204,127,0.05)_0%,rgba(13,13,13,0)_70%)]"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <SectionHeading
          title="Strategic Partners"
          subtitle="Collaborating with industry leaders to build a sustainable blockchain ecosystem"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="bg-bitaccess-black-light border border-bitaccess-gold/20 rounded-xl p-6 hover:border-bitaccess-gold/50 transition-all duration-300 group"
            >
              <div className="mb-6 h-16 flex items-center justify-center">
                <div className="w-16 h-16 relative">
                  <AspectRatio ratio={1/1} className="bg-bitaccess-black/50 rounded-full overflow-hidden p-2">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`} 
                      className="object-contain w-full h-full"
                    />
                  </AspectRatio>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-white mb-3">{partner.name}</h3>
              <p className="text-gray-400 text-center mb-4">{partner.description}</p>
              <div className="text-center">
                <a 
                  href={partner.website}
                  className="inline-flex items-center text-sm text-bitaccess-gold hover:text-bitaccess-gold-light transition-colors"
                >
                  Visit Website <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicPartnersSection;
