
import SectionHeading from "@/components/ui/section-heading";
import { Building, Handshake, Users } from "lucide-react";

const StrategicPartnersSection = () => {
  const partners = [
    {
      name: "BitPay Solutions",
      description: "Leading crypto payment processor enabling seamless transactions for businesses worldwide",
      icon: <Building className="h-6 w-6" />
    },
    {
      name: "Blockchain Education Alliance",
      description: "Consortium of educational institutions promoting blockchain technology learning",
      icon: <Users className="h-6 w-6" />
    },
    {
      name: "Global Merchant Network",
      description: "Worldwide network of 10,000+ merchants accepting cryptocurrency payments",
      icon: <Handshake className="h-6 w-6" />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-bitaccess-black">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="Strategic Partners"
          subtitle="We've partnered with industry leaders to accelerate adoption and create value within the ecosystem"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="bg-bitaccess-black-light rounded-xl p-6 border border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-bitaccess-gold/10 rounded-full mr-4">
                  {partner.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{partner.name}</h3>
              </div>
              <p className="text-gray-400">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicPartnersSection;
