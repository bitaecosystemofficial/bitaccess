
import SectionHeading from "@/components/ui/section-heading";
import biitLogo from "@/assets/biit-logo.png";
import pancakeswapLogo from "@/assets/pancakeswap-logo.png";
import dappradarLogo from "@/assets/dappradar-logo.png";
import goplusLogo from "@/assets/goplus-logo.png";
import bscscanLogo from "@/assets/bscscan-logo.png";
import cyberscopeLogo from "@/assets/cyberscope-logo.png";
import uniswapLogo from "@/assets/uniswap-logo.png";

const partners = [
  {
    name: "Biit",
    logo: biitLogo,
    description: "Blockchain Technology Platform"
  },
  {
    name: "Binexplorer",
    logo: "https://binplorer.com/favicon-32x32.png",
    description: "BSC Blockchain Explorer"
  },
  {
    name: "DappRadar",
    logo: dappradarLogo,
    description: "DApp Analytics"
  },
  {
    name: "GoPlus Security",
    logo: goplusLogo,
    description: "Security Platform"
  },
  {
    name: "BscScan",
    logo: bscscanLogo,
    description: "BSC Explorer"
  },
  {
    name: "Cyberscope",
    logo: cyberscopeLogo,
    description: "Smart Contract Audits"
  },
  {
    name: "DexTools",
    logo: "https://img.cryptorank.io/coins/dextools1629975030345.png",
    description: "Trading Analytics"
  },
  {
    name: "DexScreener",
    logo: "https://images.apifyusercontent.com/NtX7v0_NGm_nR95ljRYDySuBs9nmhWPuAg8bzinmPfY/rs:fill:250:250/cb:1/aHR0cHM6Ly9hcGlmeS1pbWFnZS11cGxvYWRzLXByb2QuczMudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vSElNQUNaaE9uN1lKNzFkVHUtYWN0b3ItZW9GNGp4SlpJdGRrUDMzcjktdlpKQ1c1NjJ2ay1kZXhwbmcucG5n.webp",
    description: "DEX Analytics"
  },
  {
    name: "PancakeSwap",
    logo: pancakeswapLogo,
    description: "BSC DEX"
  },
  {
    name: "Uniswap",
    logo: uniswapLogo,
    description: "Decentralized Exchange"
  },
  {
    name: "CoinMarketCap",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT727b-hWFvY5uCgsTPshHNg2ChZQsVO216hQ&s",
    description: "Price Tracking"
  },
  {
    name: "CoinGecko",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/CoinGecko_logo.png",
    description: "Market Data"
  }
];

const StrategicPartnersSection = () => {
  return (
    <section className="py-16 md:py-24 bg-bitaccess-black">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="Blockchain Strategic Partners"
          subtitle="Strategic partnerships across major blockchain ecosystems, exchanges, and analytics platforms"
          centered
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl p-3 mb-4 group-hover:shadow-lg group-hover:shadow-bitaccess-gold/20 transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{partner.name}</h3>
              <p className="text-gray-400 text-xs">{partner.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            Building the future through strategic blockchain integrations
          </p>
        </div>
      </div>
    </section>
  );
};

export default StrategicPartnersSection;
