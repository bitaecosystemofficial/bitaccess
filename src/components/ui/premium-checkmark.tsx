
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumCheckmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const PremiumCheckmark = ({ className, size = "md" }: PremiumCheckmarkProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div className={cn(
      "rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center",
      "shadow-lg shadow-green-500/25 border border-green-300/50",
      "relative overflow-hidden group",
      sizeClasses[size],
      className
    )}>
      {/* 3D Effect Highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
      
      {/* Inner glow */}
      <div className="absolute inset-0.5 bg-gradient-to-br from-green-300/40 to-green-600/40 rounded-full blur-sm"></div>
      
      {/* Check icon */}
      <Check className={cn("text-white relative z-10 stroke-[3]", iconSizes[size])} />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
    </div>
  );
};

export default PremiumCheckmark;
