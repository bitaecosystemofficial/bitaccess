
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TokenSection from "@/components/home/TokenSection";
import CommunitySection from "@/components/home/CommunitySection";
import CtaSection from "@/components/home/CtaSection";
import RoadmapSection from "@/components/home/RoadmapSection";
import StrategicPartnersSection from "@/components/home/StrategicPartnersSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <TokenSection />
      <StrategicPartnersSection />
      <RoadmapSection />
      <CommunitySection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
