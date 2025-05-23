
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PlanFeatures from './PlanFeatures';
import { SubscriptionPlan as PlanType } from "@/hooks/useMemberSubscription";

interface SubscriptionPlanProps {
  plan: {
    name: PlanType;
    price: string;
    currency: string;
    duration: string;
    description: string;
    features: string[];
    highlighted?: boolean;
  };
  isProcessing: boolean;
  isSubscribed: boolean;
  showReferrer: boolean;
  toggleReferrerInput: () => void;
  onSubscribe: (plan: PlanType) => void;
}

const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({
  plan,
  isProcessing,
  isSubscribed,
  showReferrer,
  toggleReferrerInput,
  onSubscribe
}) => {
  const hasCard = plan.features.includes("Cross Border Payments Card");

  return (
    <Card 
      className={`border ${plan.highlighted ? 'border-bitaccess-gold' : 'border-gray-700'} bg-bitaccess-black hover:shadow-lg hover:shadow-bitaccess-gold/10 transition-all duration-300 animate-fade-in`}
    >
      <CardHeader>
        <CardTitle className={`text-xl ${plan.highlighted ? 'text-bitaccess-gold' : 'text-white'}`}>
          {plan.name} Subscription
        </CardTitle>
        <CardDescription className="text-gray-400">
          {plan.description}
        </CardDescription>
        <div className="mt-4">
          <span className={`text-3xl font-bold ${plan.highlighted ? 'text-bitaccess-gold' : 'text-white'}`}>
            {plan.price} {plan.currency}
          </span>
          <span className="text-gray-400 ml-1">/{plan.duration}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <PlanFeatures 
          features={plan.features} 
          highlighted={plan.highlighted} 
          showCardPreview={hasCard}
        />
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2">
        <Button 
          className={`w-full ${plan.highlighted 
            ? 'bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black' 
            : 'bg-transparent border border-gray-600 hover:border-bitaccess-gold text-gray-300 hover:text-bitaccess-gold'} transition-transform duration-300 hover:scale-102`}
          onClick={() => onSubscribe(plan.name)}
          disabled={isProcessing || isSubscribed}
        >
          {isProcessing ? "Processing..." : isSubscribed ? "Already Subscribed" : "Subscribe Now"}
        </Button>
        
        {!showReferrer && (
          <Button 
            variant="link" 
            onClick={toggleReferrerInput} 
            className="text-sm text-gray-400 hover:text-bitaccess-gold"
          >
            Have a referrer? Click here
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlan;
