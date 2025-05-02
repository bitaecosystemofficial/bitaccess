
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";

interface PlanFeature {
  name: string;
}

interface PlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  selectedToken: 'BIT' | 'USDT';
  selectedPlan: string | null;
  isProcessing: boolean;
  onSubscribe: (plan: string) => void;
}

const PlanCard = ({ 
  name, 
  price, 
  description, 
  features, 
  highlighted = false,
  selectedToken,
  selectedPlan,
  isProcessing,
  onSubscribe 
}: PlanProps) => {
  return (
    <Card className={`bg-bitaccess-black-light border border-bitaccess-gold/20 ${highlighted ? 'border-2 border-bitaccess-gold' : ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-400">{description}</p>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-gray-300">
              <Check className="h-4 w-4 text-bitaccess-gold" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="mb-2 text-bitaccess-gold font-semibold text-center">
            {selectedToken === 'BIT' ? `${price} BIT` : `${Math.round(Number(price) / 5)} USDT`} / month
          </p>
          <Button
            className={`w-full ${selectedPlan === name ? 'bg-green-500 hover:bg-green-600' : 'bg-bitaccess-gold hover:bg-bitaccess-gold/90'} text-black`}
            onClick={() => onSubscribe(name)}
            disabled={selectedPlan === name || isProcessing}
          >
            {isProcessing ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
            ) : selectedPlan === name ? (
              "Subscribed"
            ) : (
              `Pay with ${selectedToken}`
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
