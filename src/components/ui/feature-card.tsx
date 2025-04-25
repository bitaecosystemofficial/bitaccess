
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "bg-bitaccess-black-light rounded-xl p-6 border border-bitaccess-gold/10",
        "hover:border-bitaccess-gold/30 transition-all duration-300",
        "flex flex-col",
        className
      )}
    >
      <div className="bg-bitaccess-gold/10 p-3 rounded-full w-fit mb-4">
        <div className="text-bitaccess-gold">{icon}</div>
      </div>
      <h3 className="font-semibold text-xl mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
