
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BnbPaymentFormProps {
  bnbAmount: string;
  handleBnbChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBuyTokens: () => Promise<void>;
  isLoading: boolean;
  isValidAmount: boolean;
  minPurchaseAmount: number;
}

export const BnbPaymentForm = ({
  bnbAmount,
  handleBnbChange,
  handleBuyTokens,
  isLoading,
  isValidAmount,
  minPurchaseAmount
}: BnbPaymentFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">BNB Amount</label>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={bnbAmount}
            onChange={handleBnbChange}
            placeholder="Enter BNB amount"
            className="bg-bitaccess-black border-bitaccess-gold/30"
          />
          <span className="text-sm font-medium">BNB</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Minimum purchase: {minPurchaseAmount} BNB
        </p>
      </div>
      
      <Button 
        onClick={handleBuyTokens} 
        disabled={isLoading || !isValidAmount}
        className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
      >
        {isLoading ? "Processing..." : "Buy with BNB"}
      </Button>
    </div>
  );
};
