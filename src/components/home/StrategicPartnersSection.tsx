
import SectionHeading from "@/components/ui/section-heading";
import { AspectRatio } from "../ui/aspect-ratio";
import { ExternalLink } from "lucide-react";

const partners = [
  {
    name: "FitTracker",
    logo: "/placeholder.svg",
    description: "Fitness tracking ecosystem partner for health-oriented blockchain applications.",
    website: "#"
  },
  {
    name: "CryptoSphere",
    logo: "/placeholder.svg",
    description: "Leading crypto payment solution provider for enterprise and retail integration.",
    website: "#"
  },
  {
    name: "CITFEE",
    logo: "/placeholder.svg",
    description: "Center for Innovative Technology in Financial and Educational Excellence, focusing on money training and education.",
    website: "#"
  },
  {
    name: "BITCORP",
    logo: "/placeholder.svg",
    description: "Blockchain Innovation and Technology Corporation specializing in blockchain education and development.",
    website: "#"
  },
  {
    name: "APCPI",
    logo: "/placeholder.svg",
    description: "Association of Professional Competencies and Performance Improvement, delivering professional training competencies.",
    website: "#"
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
