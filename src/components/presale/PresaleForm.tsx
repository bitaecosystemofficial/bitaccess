
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { usePresaleData, useBuyTokens } from "@/utils/presale/presaleHooks";

const PresaleForm = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'bnb' | 'usdt'>('bnb');
  const [isLoading, setIsLoading] = useState(false);
  const presaleData = usePresaleData();
  const buyTokens = useBuyTokens();

  const handlePurchase = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    const minAmount = presaleData.paymentMethods[paymentMethod].min;
    const maxAmount = presaleData.paymentMethods[paymentMethod].max;
    
    if (parseFloat(amount) < minAmount || parseFloat(amount) > maxAmount) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be between ${minAmount} and ${maxAmount} ${paymentMethod.toUpperCase()}`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await buyTokens(parseFloat(amount));
      setAmount("");
      toast({
        title: "Success",
        description: "Purchase successful!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Purchase failed",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-bitaccess-black p-6 border border-bitaccess-gold/10">
      <CardContent className="space-y-4 p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Payment Method</label>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setPaymentMethod('bnb')}
                className={paymentMethod === 'bnb' ? 'bg-bitaccess-gold/20 text-bitaccess-gold' : ''}
              >
                BNB
              </Button>
              <Button
                variant="outline"
                onClick={() => setPaymentMethod('usdt')}
                className={paymentMethod === 'usdt' ? 'bg-bitaccess-gold/20 text-bitaccess-gold' : ''}
              >
                USDT
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount in ${paymentMethod.toUpperCase()}`}
              className="bg-bitaccess-black-dark"
            />
            <p className="text-sm text-gray-400 mt-1">
              Min: {presaleData.paymentMethods[paymentMethod].min} {paymentMethod.toUpperCase()} |
              Max: {presaleData.paymentMethods[paymentMethod].max} {paymentMethod.toUpperCase()}
            </p>
          </div>
        </div>

        <Button
          onClick={handlePurchase}
          disabled={isLoading}
          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black mt-4"
        >
          {isLoading ? "Processing..." : "Purchase Tokens"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PresaleForm;
