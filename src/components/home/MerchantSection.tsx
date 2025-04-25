
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Check } from "lucide-react";

const MerchantSection = () => {
  const plans = [
    {
      name: "Basic",
      price: "99",
      description: "Perfect for small businesses new to crypto",
      features: [
        "Accept BIT Token payments",
        "Basic customer analytics",
        "Email support",
        "Transaction dashboard",
        "Basic API access"
      ]
    },
    {
      name: "Premium",
      price: "299",
      description: "For established businesses seeking growth",
      features: [
        "All Basic features",
        "Priority transaction processing",
        "Advanced analytics and reports",
        "Priority customer support",
        "Custom integration assistance",
        "Marketing promotion in ecosystem"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "599",
      description: "Comprehensive solution for large businesses",
      features: [
        "All Premium features",
        "Dedicated account manager",
        "Custom development solutions",
        "Branded payment portal",
        "Advanced API capabilities",
        "Exclusive networking events",
        "Strategic partnership opportunities"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-bitaccess-black-light">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="Merchant Subscriptions"
          subtitle="Join our merchant network and access powerful tools to grow your business with blockchain technology"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border ${plan.highlighted ? 'border-bitaccess-gold' : 'border-gray-700'} bg-bitaccess-black`}
            >
              <CardHeader>
                <CardTitle className={`text-xl ${plan.highlighted ? 'text-bitaccess-gold' : 'text-white'}`}>
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className={`text-3xl font-bold ${plan.highlighted ? 'text-bitaccess-gold' : 'text-white'}`}>
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={`w-5 h-5 mt-0.5 ${plan.highlighted ? 'text-bitaccess-gold' : 'text-gray-400'}`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.highlighted 
                    ? 'bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black' 
                    : 'bg-transparent border border-gray-600 hover:border-bitaccess-gold text-gray-300 hover:text-bitaccess-gold'}`}
                >
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchantSection;
