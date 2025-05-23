
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UsdtPaymentFormProps {
  usdtAmount: string;
  handleUsdtChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleApprove: () => Promise<void>;
  handleBuyTokens: () => Promise<void>;
  isLoading: boolean;
  isValidAmount: boolean;
  approved: boolean;
  minPurchaseAmount: number;
}

export const UsdtPaymentForm = ({
  usdtAmount,
  handleUsdtChange,
  handleApprove,
  handleBuyTokens,
  isLoading,
  isValidAmount,
  approved,
  minPurchaseAmount
}: UsdtPaymentFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">USDT Amount</label>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={usdtAmount}
            onChange={handleUsdtChange}
            placeholder="Enter USDT amount"
            className="bg-bitaccess-black border-bitaccess-gold/30"
          />
          <span className="text-sm font-medium">USDT</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Minimum purchase: {minPurchaseAmount} USDT
        </p>
      </div>
      
      {!approved ? (
        <Button 
          onClick={handleApprove} 
          disabled={isLoading || !isValidAmount}
          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
        >
          {isLoading ? "Approving..." : "Approve USDT"}
        </Button>
      ) : (
        <Button 
          onClick={handleBuyTokens} 
          disabled={isLoading || !isValidAmount}
          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
        >
          {isLoading ? "Processing..." : "Buy with USDT"}
        </Button>
      )}
    </div>
  );
};
