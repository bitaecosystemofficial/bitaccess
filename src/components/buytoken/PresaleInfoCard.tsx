
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertCircle } from 'lucide-react';
import { BonusTier } from '@/utils/presale/types';
import { formatNumber } from '@/utils/formatUtils';

interface PresaleInfoCardProps {
  currentPhase: number;
  totalPhases: number;
  bnbRate: number;
  usdtRate: number;
  soldTokens: number;
  totalSupply: number;
  progress: number;
  bonusTiers: {
    bnb: BonusTier[];
    usdt: BonusTier[];
  };
  paymentMethods: {
    bnb: { min: number; max: number };
    usdt: { min: number; max: number };
  };
}

export const PresaleInfoCard = ({
  currentPhase,
  totalPhases,
  bnbRate,
  usdtRate,
  soldTokens,
  totalSupply,
  progress,
  bonusTiers,
  paymentMethods
}: PresaleInfoCardProps) => {
  return (
    <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20 h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-bitaccess-gold" />
          Presale Info
        </CardTitle>
        <CardDescription>Phase {currentPhase} of {totalPhases}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">Token Sale Progress</p>
          <Progress value={progress} className="h-2 bg-bitaccess-black" />
          <div className="flex justify-between text-xs mt-1">
            <span>{formatNumber(soldTokens)} BIT sold</span>
            <span>{formatNumber(totalSupply)} BIT total</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-bitaccess-black rounded border border-bitaccess-gold/20">
            <p className="text-xs text-gray-400">BNB Rate</p>
            <p className="font-medium">{bnbRate.toLocaleString()} BIT</p>
          </div>
          <div className="p-3 bg-bitaccess-black rounded border border-bitaccess-gold/20">
            <p className="text-xs text-gray-400">USDT Rate</p>
            <p className="font-medium">{usdtRate.toLocaleString()} BIT</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Bonus Tiers</h4>
          <div className="space-y-1">
            {bonusTiers.bnb.map((tier, i) => (
              <div key={`bnb-${i}`} className="flex justify-between text-xs">
                <span>≥ {tier.minAmount} BNB</span>
                <span className="text-bitaccess-gold">+{tier.bonusPercent}% Bonus</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-1 mt-2">
            {bonusTiers.usdt.map((tier, i) => (
              <div key={`usdt-${i}`} className="flex justify-between text-xs">
                <span>≥ {tier.minAmount} USDT</span>
                <span className="text-bitaccess-gold">+{tier.bonusPercent}% Bonus</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-3 bg-bitaccess-black rounded border border-bitaccess-gold/20">
          <div className="flex items-center mb-1">
            <AlertCircle className="h-4 w-4 mr-1 text-yellow-500" />
            <p className="text-sm font-medium">Presale Limits</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <p>Min BNB: {paymentMethods.bnb.min}</p>
            <p>Max BNB: {paymentMethods.bnb.max}</p>
            <p>Min USDT: {paymentMethods.usdt.min}</p>
            <p>Max USDT: {paymentMethods.usdt.max}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
