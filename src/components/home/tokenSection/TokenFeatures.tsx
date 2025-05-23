
import FeatureCard from "@/components/ui/feature-card";
import { 
  Trophy,
  Users,
  BookOpen,
  Link,
  MessageCircle,
  Globe
} from "lucide-react";
import { tokenFeatures } from "./tokenDistributionData";

const getIconComponent = (iconName: string) => {
  const iconMap = {
    Trophy: <Trophy size={24} />,
    Users: <Users size={24} />,
    BookOpen: <BookOpen size={24} />,
    Link: <Link size={24} />,
    MessageCircle: <MessageCircle size={24} />,
    Globe: <Globe size={24} />
  };
  
  return iconMap[iconName as keyof typeof iconMap];
};

const TokenFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {tokenFeatures.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={getIconComponent(feature.icon)}
          className="h-full"
        />
      ))}
    </div>
  );
};

export default TokenFeatures;
