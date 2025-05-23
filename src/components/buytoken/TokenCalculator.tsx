
import { formatNumber } from '@/utils/formatUtils';

interface TokenCalculatorProps {
  tokenAmount: string;
  bonusAmount: string;
  totalTokens: string;
}

export const TokenCalculator = ({ tokenAmount, bonusAmount, totalTokens }: TokenCalculatorProps) => {
  return (
    <div className="p-4 bg-bitaccess-black rounded-lg border border-bitaccess-gold/20">
      <h4 className="font-medium mb-3">Token Calculation</h4>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Base Tokens:</span>
          <span>{formatNumber(tokenAmount)} BIT</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Bonus Tokens:</span>
          <span className="text-bitaccess-gold">+{formatNumber(bonusAmount)} BIT</span>
        </div>
        <div className="border-t border-bitaccess-gold/20 pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total Tokens:</span>
            <span>{formatNumber(totalTokens)} BIT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
