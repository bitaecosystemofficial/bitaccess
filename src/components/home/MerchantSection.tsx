
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import { toast } from "@/hooks/use-toast";
import { useMemberSubscription, SubscriptionPlan } from "@/hooks/useMemberSubscription";
import SubscriptionPlan from "@/components/membership/SubscriptionPlan";
import ReferrerInput from "@/components/membership/ReferrerInput";

const MerchantSection = () => {
  const { isConnected, connectWallet, disconnectWallet } = useWallet();
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
        "Cross Border Payments Card",
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
        "Premium Cross Border Payments Card",
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
        
        <div className="flex justify-center mb-8 animate-fade-in">
          {!isConnected ? (
            <Button 
              onClick={connectWallet}
              className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black transition-transform duration-300 hover:scale-105"
            >
              Connect Wallet
            </Button>
          ) : (
            <Button 
              onClick={disconnectWallet}
              className="bg-transparent border border-bitaccess-gold hover:bg-bitaccess-gold/10 text-bitaccess-gold transition-transform duration-300 hover:scale-105"
            >
              Disconnect Wallet
            </Button>
          )}
        </div>
        
        {isConnected && showReferrer && (
          <ReferrerInput 
            referrerAddress={referrerAddress} 
            onChange={setReferrerAddress} 
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <SubscriptionPlan
              key={index}
              plan={plan}
              isProcessing={isProcessing}
              isSubscribed={!!membershipData?.isActive}
              showReferrer={showReferrer}
              toggleReferrerInput={toggleReferrerInput}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchantSection;
