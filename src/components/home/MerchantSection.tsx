
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";
import PremiumCheckmark from "@/components/ui/premium-checkmark";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ExternalLink, Globe } from "lucide-react";

const MerchantSection = () => {
  const plans = [
    {
      name: "Membership",
      price: "50",
      currency: "USDT",
      duration: "365 days",
      description: "Access exclusive benefits and education",
      externalUrl: "https://portal.bitaecosystem.org/login",
      features: [
        "Access to Blockchain Education & Technical Training",
        "$1 USDT worth of BTCB Reward",
        "$1 USDT worth of USDT Reward",
        "$1 USDT worth of BNB Reward",
        "$5 USDT worth of BIT Token Rewards",
        "Discounts from all our Products & Services"
      ],
      referralCommission: [
        "15% - Direct",
        "10% - 2nd Level", 
        "5% - 3rd Level",
        "2% - 4th to 6th Level",
        "1% - 7th to 10th Level"
      ]
    },
    {
      name: "Merchant",
      price: "100",
      currency: "USDT",
      duration: "365 days",
      description: "Full business solution with promotional benefits",
      externalUrl: "https://portal.bitaecosystem.org/login",
      features: [
        "Blockchain Education and Technical Training",
        "$1 USDT worth of BTCB Reward",
        "$1 USDT worth of USDT Reward",
        "$1 USDT worth of BNB Reward",
        "$10 USDT worth of BIT Token Rewards",
        "Bit Merchant Stickers with QR Codes",
        "Promotions and Advertisements on BIT Community"
      ],
      referralCommission: [
        "15% - Direct",
        "10% - 2nd Level",
        "5% - 3rd Level", 
        "2.5% - 4th to 6th Level",
        "1% - 7th to 10th Level"
      ],
      highlighted: true
    }
  ];

  const handleSubscribe = (externalUrl: string) => {
    window.open(externalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 md:py-24 bg-bitaccess-black-light">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="Exclusive Membership"
          subtitle="Join our ecosystem and access powerful tools, education and rewards through our membership program"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border ${plan.highlighted ? 'border-bitaccess-gold' : 'border-gray-700'} bg-bitaccess-black`}
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
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <PremiumCheckmark size="sm" className="mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                  
                  {/* Earn Referral Commission Section */}
                  <li className="flex items-start gap-3">
                    <PremiumCheckmark size="sm" className="mt-0.5 flex-shrink-0" />
                    <div className="text-gray-300 text-sm">
                      <div className="mb-2">Earn Referral Commission:</div>
                      <div className="ml-4 space-y-1">
                        {plan.referralCommission.map((commission, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 border border-gray-400 rounded-full flex-shrink-0 mt-1.5"></div>
                            <span className="tabular-nums">{commission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  className={`w-full ${plan.highlighted 
                    ? 'bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black' 
                    : 'bg-transparent border border-gray-600 hover:border-bitaccess-gold text-gray-300 hover:text-bitaccess-gold'}`}
                  onClick={() => handleSubscribe(plan.externalUrl)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" />
            Secure payments powered by Bit Access Ecosystem
          </p>
        </div>
      </div>
    </section>
  );
};

export default MerchantSection;
