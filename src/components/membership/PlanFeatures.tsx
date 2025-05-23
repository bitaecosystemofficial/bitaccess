
import React from 'react';
import { Check } from "lucide-react";
import { CreditCard } from "lucide-react";

interface PlanFeaturesProps {
  features: string[];
  highlighted?: boolean;
  showCardPreview?: boolean;
}

const PlanFeatures: React.FC<PlanFeaturesProps> = ({ 
  features, 
  highlighted = false, 
  showCardPreview = false 
}) => {
  return (
    <>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className={`w-5 h-5 mt-0.5 ${highlighted ? 'text-bitaccess-gold' : 'text-gray-400'}`} />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      {showCardPreview && (
        <div className="mt-6 flex justify-center">
          <div className="relative w-16 h-10 bg-gradient-to-br from-black to-gray-800 rounded-md border border-bitaccess-gold/30 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 w-full h-2 bg-bitaccess-gold/50"></div>
            <CreditCard className="h-5 w-5 text-bitaccess-gold/80" />
          </div>
        </div>
      )}
    </>
  );
};

export default PlanFeatures;
