
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TokenSection from "@/components/home/TokenSection";
import MerchantSection from "@/components/home/MerchantSection";
import CommunitySection from "@/components/home/CommunitySection";
import CtaSection from "@/components/home/CtaSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <TokenSection />
      <MerchantSection />
      <CommunitySection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
