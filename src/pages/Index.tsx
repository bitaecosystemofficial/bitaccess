import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CommunitySection from "@/components/home/CommunitySection";
import CtaSection from "@/components/home/CtaSection";
import RoadmapSection from "@/components/home/RoadmapSection";
import StrategicPartnersSection from "@/components/home/StrategicPartnersSection";

const Index = () => {
  return (
    <Layout>
      {/* Floating Bubble Effects for Homepage */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-3 h-3 bg-bitaccess-gold/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-5 h-5 bg-bitaccess-gold/10 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute top-60 left-1/4 w-4 h-4 bg-bitaccess-gold/15 rounded-full animate-float animation-delay-300"></div>
        <div className="absolute top-80 right-1/3 w-6 h-6 bg-bitaccess-gold/8 rounded-full animate-float animation-delay-200"></div>
        <div className="absolute top-96 left-1/2 w-2 h-2 bg-bitaccess-gold/25 rounded-full animate-float animation-delay-400"></div>
        <div className="absolute bottom-80 right-10 w-4 h-4 bg-bitaccess-gold/12 rounded-full animate-float"></div>
        <div className="absolute bottom-60 left-20 w-5 h-5 bg-bitaccess-gold/18 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-40 right-1/4 w-3 h-3 bg-bitaccess-gold/22 rounded-full animate-float animation-delay-300"></div>
        <div className="absolute bottom-20 left-1/3 w-6 h-6 bg-bitaccess-gold/6 rounded-full animate-float animation-delay-200"></div>
        <div className="absolute top-1/2 left-16 w-4 h-4 bg-bitaccess-gold/14 rounded-full animate-float animation-delay-400"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-bitaccess-gold/16 rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 left-1/5 w-5 h-5 bg-bitaccess-gold/9 rounded-full animate-float animation-delay-1000"></div>
      </div>
      
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <StrategicPartnersSection />
        <RoadmapSection />
        <CommunitySection />
        <CtaSection />
      </div>
    </Layout>
  );
};

export default Index;
