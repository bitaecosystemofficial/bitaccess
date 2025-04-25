
import SectionHeading from "@/components/ui/section-heading";
import FeatureCard from "@/components/ui/feature-card";
import { Gift, Coins, TrendingUp, Exchange, ShoppingCart, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Airdrops & Rewards",
      description: "Participate in regular token airdrops and earn rewards through community engagement and referrals.",
      icon: <Gift size={24} />
    },
    {
      title: "Token Presale",
      description: "Early access to BIT tokens with bonus allocations and exclusive benefits for early supporters.",
      icon: <Coins size={24} />
    },
    {
      title: "Staking Rewards",
      description: "Stake your BIT tokens to earn passive income while supporting network security and governance.",
      icon: <TrendingUp size={24} />
    },
    {
      title: "Token Swap",
      description: "Seamlessly swap BIT tokens with other cryptocurrencies through our integrated decentralized exchange.",
      icon: <Exchange size={24} />
    },
    {
      title: "Merchant Network",
      description: "Join our growing network of merchants accepting BIT tokens with special subscription packages.",
      icon: <ShoppingCart size={24} />
    },
    {
      title: "Education Portal",
      description: "Access comprehensive blockchain education resources and certification programs for all skill levels.",
      icon: <Users size={24} />
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="Ecosystem Features"
          subtitle="Discover the full range of features and services available within the BitAccess ecosystem"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
