
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRealTimeTokenData } from "@/hooks/useRealTimeTokenData";

const HeroSection = () => {
  const { tokenInfo, activity, isLoading } = useRealTimeTokenData();
  
  const handleAffiliateRedirect = () => {
    window.open("https://portal.bitaecosystem.org/login", "_blank");
  };

  return (
    <section className="relative bg-hero-pattern pt-24 md:pt-32 pb-20 md:pb-32 overflow-hidden">
      {/* Background overlay image */}
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/lovable-uploads/ba7e959b-f7ce-4b86-9bfb-98f756ae25e2.png)` }}
      ></div>
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-bitaccess-gold/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-bitaccess-gold/15 rounded-full filter blur-[80px] animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bitaccess-gold/5 rounded-full filter blur-[100px] animate-spin-slow"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-bitaccess-gold/10 rounded-full filter blur-[60px] animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-bitaccess-gold/8 rounded-full filter blur-[90px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-bitaccess-gold/25 rounded-full filter blur-[40px] animate-ping"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-bitaccess-gold rounded-full animate-bounce animation-delay-200"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-bitaccess-gold rounded-full animate-ping animation-delay-300"></div>
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-bitaccess-gold/60 rounded-full animate-pulse animation-delay-400"></div>
      </div>
      
      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-3 py-1 px-3 bg-bitaccess-gold/10 border border-bitaccess-gold/20 rounded-full animate-fade-in">
            <span className="text-sm text-bitaccess-gold">Bit Access Ecosystem - Powering the future of digital transactions</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-fade-in">
            Welcome to the <span className="bg-gold-gradient text-transparent bg-clip-text animate-pulse">Bit Access</span> Ecosystem
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Empowering blockchain education and merchant adoption through our comprehensive ecosystem and BIT utility token.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-300">
            <Button 
              size="lg" 
              className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium hover-scale"
              onClick={handleAffiliateRedirect}
            >
              Bit Access Affiliates
            </Button>
            <Button size="lg" variant="outline" className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 hover-scale">
              Explore Ecosystem <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in animation-delay-400">
          <div className="text-center p-4 rounded-lg bg-bitaccess-black-light bg-opacity-50 backdrop-blur-sm border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover-scale">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1 animate-pulse">500K+</p>
            <p className="text-sm text-gray-400">Community Members</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-bitaccess-black-light bg-opacity-50 backdrop-blur-sm border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover-scale">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1 animate-pulse">100B</p>
            <p className="text-sm text-gray-400">BIT Tokens</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-bitaccess-black-light bg-opacity-50 backdrop-blur-sm border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover-scale">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1 animate-pulse">
              {isLoading ? "..." : "3,198"}
            </p>
            <p className="text-sm text-gray-400">Token Holders</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-bitaccess-black-light bg-opacity-50 backdrop-blur-sm border border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover-scale">
            <p className="text-3xl font-bold text-bitaccess-gold mb-1 animate-pulse">
              {isLoading ? "..." : (activity?.transfers24h?.toLocaleString() || "Live")}
            </p>
            <p className="text-sm text-gray-400">Token Transfers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
