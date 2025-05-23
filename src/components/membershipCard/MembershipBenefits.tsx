
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, QrCode } from "lucide-react";

const MembershipBenefits: React.FC = () => {
  return (
    <div className="mt-12 animate-fade-in animation-delay-500">
      <h2 className="text-xl font-bold mb-4 gold-text">Membership Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="bg-bitaccess-black-light border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-4 flex items-start">
            <div className="mr-4 mt-1">
              <BarChart2 className="h-5 w-5 text-bitaccess-gold" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Token Rewards</h3>
              <p className="text-sm text-gray-400">
                Earn BTCB, USDT, BNB, and BIT tokens as part of your membership rewards
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-bitaccess-black-light border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-4 flex items-start">
            <div className="mr-4 mt-1">
              <QrCode className="h-5 w-5 text-bitaccess-gold" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Cross Border Payments</h3>
              <p className="text-sm text-gray-400">
                Access special rates for cross-border transactions with your membership
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MembershipBenefits;
