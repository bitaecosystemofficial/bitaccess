
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-hero-pattern pt-24 md:pt-32 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-bitaccess-gold/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-bitaccess-gold/15 rounded-full filter blur-[80px] animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bitaccess-gold/5 rounded-full filter blur-[100px] animate-spin-slow"></div>
      </div>
      
      <div className={`container relative z-10 px-4 md:px-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-3 py-1 px-3 bg-bitaccess-gold/10 border border-bitaccess-gold/20 rounded-full animate-fade-in">
            <span className="text-sm text-bitaccess-gold">BitAccess Ecosystem - Powering the future of digital transactions</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-fade-in">
            Welcome to the <span className="bg-gold-gradient text-transparent bg-clip-text">BitAccess</span> Ecosystem
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Empowering blockchain education and merchant adoption through our comprehensive ecosystem and BIT utility token.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-300">
            <Button 
              size="lg" 
              className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium transition-transform duration-300 hover:scale-105"
            >
              Join Presale
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 transition-transform duration-300 hover:scale-105"
            >
              Explore Ecosystem <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in animation-delay-400">
          <div className="text-center p-4 rounded-lg bg-bitaccess-black-light bg-opacity-50 backdrop-blur-sm border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover:-translate-y-1">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1">500K+</p>
            <p className="text-sm text-gray-400">Community Members</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-bitaccess-black-light bg-opacity-50 backdrop-blur-sm border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover:-translate-y-1">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1">1.2M</p>
            <p className="text-sm text-gray-400">BIT Tokens</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-bitaccess-black-light bg-opacity-50 backdrop-blur-sm border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover:-translate-y-1">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1">120+</p>
            <p className="text-sm text-gray-400">Merchant Partners</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-bitaccess-black-light bg-opacity-50 backdrop-blur-sm border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover:-translate-y-1">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1">24/7</p>
            <p className="text-sm text-gray-400">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
