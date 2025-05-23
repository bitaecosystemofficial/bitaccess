
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, CheckCheck, ShieldCheck, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

// Import the existing SubscriptionPlan component instead of redefining it
import SubscriptionPlan from "@/components/membership/SubscriptionPlan";
import PlanFeatures from "@/components/membership/PlanFeatures";

const MerchantSection = () => {
  const navigate = useNavigate();
  
  // Sample basic merchant features
  const basicFeatures = [
    "List up to 10 products",
    "Basic analytics",
    "Standard customer support",
    "Basic customization options"
  ];

  // Sample pro merchant features
  const proFeatures = [
    "Unlimited product listings",
    "Advanced analytics dashboard",
    "Priority customer support",
    "Full store customization",
    "Promotional tools"
  ];

  const handleBecomeMerchant = () => {
    navigate('/become-merchant');
  };
  
  return (
    <section className="py-16 px-4 relative overflow-hidden" id="merchant">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a <span className="text-bitaccess-gold">Merchant</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Join our merchant network and start accepting crypto payments for your products or services. Get access to a global customer base and enjoy reduced transaction fees.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-bitaccess-black border-bitaccess-gold/10 hover:border-bitaccess-gold/30 p-6 transform transition duration-300 hover:-translate-y-1 h-full">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-bitaccess-gold/10 mb-4">
                  <ShieldCheck className="h-6 w-6 text-bitaccess-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Basic Merchant</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold">0.25</span>
                  <span className="text-bitaccess-gold ml-1 font-medium">BNB</span>
                  <span className="text-gray-400 ml-2 text-sm">/ month</span>
                </div>
                <div className="mb-8">
                  <PlanFeatures features={basicFeatures} />
                </div>
              </div>
              
              <div className="mt-auto">
                <Button 
                  onClick={handleBecomeMerchant}
                  className="w-full bg-transparent border border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
                >
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-bitaccess-black border-bitaccess-gold p-6 transform transition duration-300 hover:-translate-y-1 h-full relative">
            <div className="absolute top-0 right-0 bg-bitaccess-gold text-black text-xs px-3 py-1 uppercase font-semibold">
              Popular
            </div>
            
            <CardContent className="p-0 h-full flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-bitaccess-gold/20 mb-4">
                  <BarChart2 className="h-6 w-6 text-bitaccess-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pro Merchant</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold">0.5</span>
                  <span className="text-bitaccess-gold ml-1 font-medium">BNB</span>
                  <span className="text-gray-400 ml-2 text-sm">/ month</span>
                </div>
                <div className="mb-8">
                  <PlanFeatures features={proFeatures} highlighted={true} />
                </div>
              </div>
              
              <div className="mt-auto">
                <Button
                  onClick={handleBecomeMerchant}
                  className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                >
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/marketplace/merchants" className="text-bitaccess-gold hover:text-bitaccess-gold/80 underline text-sm">
            View all merchants in our marketplace →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MerchantSection;
