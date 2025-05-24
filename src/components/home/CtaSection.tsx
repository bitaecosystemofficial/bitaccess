
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  const handleAffiliateRedirect = () => {
    window.open("https://bitaccess.io/affiliates", "_blank");
  };

  return (
    <section className="py-16 md:py-24 bg-bitaccess-black-dark border-t border-bitaccess-gold/20">
      <div className="container px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-bitaccess-black to-bitaccess-black-light rounded-2xl p-8 md:p-12 border border-bitaccess-gold/30 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-bitaccess-gold/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-bitaccess-gold/5 blur-2xl"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gold-gradient text-transparent bg-clip-text">
              Ready to Join the BitAccess Ecosystem?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't miss out on exclusive presale opportunities, airdrops, and early access to our complete ecosystem of blockchain tools and services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                onClick={handleAffiliateRedirect}
              >
                Bit Access Affiliates
              </Button>
              <Button size="lg" variant="outline" className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10">
                Explore Documentation <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
