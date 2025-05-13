
import SectionHeading from "@/components/ui/section-heading";
import { AspectRatio } from "../ui/aspect-ratio";

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
    <section className="py-16 px-4 md:py-24 bg-bitaccess-black">
      <div className="container mx-auto">
        <SectionHeading
          title="Strategic Partners"
          subtitle="Collaborating with industry leaders to build a sustainable blockchain ecosystem"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="bg-bitaccess-black-light border border-bitaccess-gold/20 rounded-xl p-6 hover:border-bitaccess-gold/50 transition-colors"
            >
              <div className="mb-4 h-16 flex items-center justify-center">
                <div className="w-14 h-14">
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`} 
                      className="object-contain rounded-md"
                    />
                  </AspectRatio>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-white mb-3">{partner.name}</h3>
              <p className="text-gray-400 text-center">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicPartnersSection;
