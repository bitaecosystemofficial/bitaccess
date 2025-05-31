
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Users, Gift, ExternalLink, Sparkles } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

interface WelcomeLandingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

const WelcomeLandingModal: React.FC<WelcomeLandingModalProps> = ({
  isOpen,
  onClose,
  onGetStarted
}) => {
  const { isConnected } = useWallet();
  const [currentStep, setCurrentStep] = useState(0);

  const welcomeSteps = [
    {
      title: "Welcome to Bit Access Ecosystem",
      subtitle: "Your Gateway to Blockchain Innovation",
      content: "Join thousands of users in the revolutionary Bit Access ecosystem. Experience seamless blockchain education, merchant services, and exclusive rewards.",
      icon: <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-bitaccess-gold" />
    },
    {
      title: "Exclusive Membership Benefits",
      subtitle: "Unlock Premium Features",
      content: "Get access to blockchain education, cross-border payment cards, referral commissions, and exclusive merchant discounts.",
      icon: <Star className="w-8 h-8 md:w-12 md:h-12 text-bitaccess-gold" />
    },
    {
      title: "Merchant Ecosystem",
      subtitle: "Grow Your Business",
      content: "Join our merchant network to promote your business, accept crypto payments, and reach a global audience of crypto enthusiasts.",
      icon: <Users className="w-8 h-8 md:w-12 md:h-12 text-bitaccess-gold" />
    }
  ];

  const features = [
    "🎓 Blockchain Education & Training",
    "💳 Cross-Border Payment Cards",
    "💰 Earn Referral Commissions",
    "🛍️ Exclusive Merchant Discounts",
    "🎁 Welcome Bonus Rewards",
    "📈 Staking & Investment Opportunities"
  ];

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAffiliateRedirect = () => {
    window.open("https://portal.bitaecosystem.org/login", "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] bg-bitaccess-black border-bitaccess-gold/20 text-white overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle>
            <div className="flex items-center justify-center mb-2 md:mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-bitaccess-gold/10 rounded-full flex items-center justify-center mb-2 md:mb-4">
                {welcomeSteps[currentStep].icon}
              </div>
            </div>
            <h1 className="text-xl md:text-3xl font-bold bg-gold-gradient text-transparent bg-clip-text">
              {welcomeSteps[currentStep].title}
            </h1>
            <p className="text-sm md:text-lg text-gray-400 mt-2">
              {welcomeSteps[currentStep].subtitle}
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6">
          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2">
            {welcomeSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                  index === currentStep ? 'bg-bitaccess-gold' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Main Content */}
          <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
            <CardContent className="p-4 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
                {/* Left Side - Content */}
                <div className="space-y-4 md:space-y-6 order-2 md:order-1">
                  <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
                    {welcomeSteps[currentStep].content}
                  </p>

                  {currentStep === 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg md:text-xl font-semibold text-bitaccess-gold">
                        What You Get:
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center text-gray-300 text-sm md:text-base">
                            <span className="mr-2">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        {features.slice(3).map((feature, index) => (
                          <div key={index} className="flex items-center text-gray-300 text-sm md:text-base">
                            <span className="mr-2">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <Badge className="bg-bitaccess-gold text-black text-xs md:text-sm">
                        <Gift className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        Welcome Bonus Available
                      </Badge>
                      <p className="text-gray-300 text-sm md:text-base">
                        Start your journey today and receive exclusive welcome rewards!
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Side - Visual */}
                <div className="flex flex-col items-center space-y-4 order-1 md:order-2">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-bitaccess-gold/20 to-bitaccess-gold/5 rounded-full flex items-center justify-center">
                    {welcomeSteps[currentStep].icon}
                  </div>
                  
                  {currentStep === 2 && (
                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-bitaccess-gold">500K+</p>
                      <p className="text-gray-400 text-sm md:text-base">Active Members</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-gray-600 text-gray-400 hover:border-bitaccess-gold hover:text-bitaccess-gold text-xs md:text-sm px-2 md:px-4"
            >
              Previous
            </Button>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4">
              {currentStep < welcomeSteps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black text-xs md:text-sm px-2 md:px-4"
                >
                  Next <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleAffiliateRedirect}
                    variant="outline"
                    className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 text-xs md:text-sm px-2 md:px-4"
                  >
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    Bit Access Affiliates
                  </Button>
                  <Button
                    onClick={() => {
                      onGetStarted();
                      onClose();
                    }}
                    className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black text-xs md:text-sm px-2 md:px-4"
                  >
                    Get Started <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-700">
            <p className="text-xs md:text-sm text-gray-400">
              Join the future of blockchain technology with Bit Access
            </p>
            {!isConnected && (
              <p className="text-xs text-gray-500 mt-2">
                Connect your wallet to access all features
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeLandingModal;
