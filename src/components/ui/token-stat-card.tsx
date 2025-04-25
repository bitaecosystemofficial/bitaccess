
import { cn } from "@/lib/utils";

interface TokenStatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}

const TokenStatCard = ({ title, value, icon, className }: TokenStatCardProps) => {
  return (
    <div 
      className={cn(
        "bg-gradient-to-br from-bitaccess-black-light to-bitaccess-black rounded-xl p-6 border border-bitaccess-gold/20",
        "hover:border-bitaccess-gold/40 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-xl md:text-2xl font-bold text-bitaccess-gold">{value}</p>
        </div>
        {icon && (
          <div className="text-bitaccess-gold opacity-70">{icon}</div>
        )}
      </div>
    </div>
  );
};

export default TokenStatCard;
