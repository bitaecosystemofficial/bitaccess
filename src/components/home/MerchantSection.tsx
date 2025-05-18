
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
import { Check, AlertCircle } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import { toast } from "@/hooks/use-toast";
import { useMemberSubscription, SubscriptionPlan } from "@/hooks/useMemberSubscription";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const MerchantSection = () => {
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();
  const { membershipData } = useMembership();
  const { subscribeToMembership, isProcessing } = useMemberSubscription();
  const [referrerAddress, setReferrerAddress] = useState("");
  const [showReferrer, setShowReferrer] = useState(false);
  
  const plans = [
    {
      name: "Membership" as SubscriptionPlan,
      price: "20",
      currency: "USDT",
      duration: "365 days",
      description: "Access exclusive benefits and education",
      features: [
        "Access to Blockchain Education & Technical Training",
        "$1 USDT worth of BTCB Reward",
        "$1 USDT worth of USDT Reward",
        "$1 USDT worth of BNB Reward",
        "$2 USDT worth of BIT Token Rewards",
        "Discounts from all our Products & Services",
        "Earn Referral Commission: 15% - Direct, 10% - 2nd Level, 5% - 3rd Level, 2.5% - 4th to 7th Level"
      ]
    },
    {
      name: "Merchant" as SubscriptionPlan,
      price: "100",
      currency: "USDT",
      duration: "365 days",
      description: "Full business solution with promotional benefits",
      features: [
        "Blockchain Education and Technical Training",
        "$1 USDT worth of BTCB Reward",
        "$1 USDT worth of USDT Reward",
        "$1 USDT worth of BNB Reward",
        "$10 USDT worth of BIT Token Rewards",
        "Bit Merchant Stickers",
        "Promotions and Advertisements on BIT Community",
        "Earn Referral Commission: 15% - Direct, 10% - 2nd Level, 5% - 3rd Level, 2.5% - 4th to 7th Level"
      ],
      highlighted: true
    }
  ];

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    if (membershipData?.isActive) {
      toast({
        title: "Already Subscribed",
        description: "You already have an active membership",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const result = await subscribeToMembership(plan, referrerAddress || undefined);
      
      if (result.success) {
        toast({
          title: "Subscription Successful",
          description: `You have successfully subscribed to the ${plan} plan!`,
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: result.error || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Error",
        description: "An error occurred during subscription process",
        variant: "destructive",
      });
    }
  };

  const toggleReferrerInput = () => {
    setShowReferrer(!showReferrer);
  };

  return (
    <section className="py-16 md:py-24 bg-bitaccess-black-light">
      <div className="container px-4 md:px-8">
        <SectionHeading
          title="Exclusive Membership"
          subtitle="Join our ecosystem and access powerful tools, education and rewards through our membership program"
          centered
        />
        
        <div className="flex justify-center mb-8">
          {!isConnected ? (
            <Button 
              onClick={connectWallet}
              className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black"
            >
              Connect Wallet
            </Button>
          ) : (
            <Button 
              onClick={disconnectWallet}
              className="bg-transparent border border-bitaccess-gold hover:bg-bitaccess-gold/10 text-bitaccess-gold"
            >
              Disconnect Wallet
            </Button>
          )}
        </div>
        
        {isConnected && showReferrer && (
          <div className="max-w-md mx-auto mb-8">
            <div className="mb-2 text-sm text-gray-400">Enter Referrer Address (Optional)</div>
            <div className="flex gap-2">
              <Input 
                placeholder="0x..." 
                value={referrerAddress}
                onChange={(e) => setReferrerAddress(e.target.value)}
                className="bg-bitaccess-black border-gray-700"
              />
            </div>
            {referrerAddress && !referrerAddress.startsWith('0x') && (
              <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                <AlertCircle className="h-3 w-3" />
                <span>Address must start with 0x</span>
              </div>
            )}
          </div>
        )}
        
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
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={`w-5 h-5 mt-0.5 ${plan.highlighted ? 'text-bitaccess-gold' : 'text-gray-400'}`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  className={`w-full ${plan.highlighted 
                    ? 'bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black' 
                    : 'bg-transparent border border-gray-600 hover:border-bitaccess-gold text-gray-300 hover:text-bitaccess-gold'}`}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={isProcessing || membershipData?.isActive}
                >
                  {isProcessing ? "Processing..." : membershipData?.isActive ? "Already Subscribed" : "Subscribe Now"}
                </Button>
                
                {isConnected && !showReferrer && (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchantSection;
