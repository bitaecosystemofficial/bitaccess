
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-hero-pattern pt-24 md:pt-32 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-bitaccess-gold/20 rounded-full filter blur-[120px] animate-pulse-gold" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-bitaccess-gold/15 rounded-full filter blur-[80px] animate-pulse-gold animation-delay-1000" />
      </div>
      
      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Welcome to the <span className="bg-gold-gradient text-transparent bg-clip-text">BitAccess</span> Ecosystem
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Empowering blockchain education and merchant adoption through our comprehensive ecosystem and BIT utility token.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
              Join Presale
            </Button>
            <Button size="lg" variant="outline" className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10">
              Explore Ecosystem <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1">500K+</p>
            <p className="text-sm text-gray-400">Community Members</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1">1.2M</p>
            <p className="text-sm text-gray-400">BIT Tokens</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1">120+</p>
            <p className="text-sm text-gray-400">Merchant Partners</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1">24/7</p>
            <p className="text-sm text-gray-400">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
