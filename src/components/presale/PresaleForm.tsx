
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
  const presaleData = usePresaleData();
  const { buyWithBNB, buyWithUSDT, isProcessing } = useBuyTokens();

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
    const amountValue = parseFloat(amount);
    
    if (amountValue < minAmount || amountValue > maxAmount) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be between ${minAmount} and ${maxAmount} ${paymentMethod.toUpperCase()}`,
        variant: "destructive"
      });
      return;
    }

    try {
      let success = false;
      if (paymentMethod === 'bnb') {
        success = await buyWithBNB(amountValue);
      } else {
        success = await buyWithUSDT(amountValue);
      }
      
      if (success) {
        setAmount("");
      }
    } catch (error) {
      console.error("Error in purchase:", error);
    }
  };

  // Calculate estimated tokens based on current rates
  const calculateEstimatedTokens = () => {
    if (!amount || isNaN(parseFloat(amount))) return "0";
    
    const amountValue = parseFloat(amount);
    
    // For BNB, convert to USDT first using current BNB price
    let usdtValue = amountValue;
    if (paymentMethod === 'bnb') {
      usdtValue = amountValue * (presaleData.bnbPrice || 600);
    }
    
    // Calculate tokens: 108 USDT = 1,000,000 BIT, so rate is 0.000108 USDT per BIT
    const rate = 0.000108;
    let baseTokens = usdtValue / rate;
    
    // Apply bonus if applicable
    const tiers = paymentMethod === 'bnb' ? presaleData.bonusTiers.bnb : presaleData.bonusTiers.usdt;
    let bonusPercent = 0;
    
    for (const tier of tiers) {
      if (amountValue >= tier.minAmount) {
        bonusPercent = tier.bonusPercent;
        break;
      }
    }
    
    const bonusTokens = baseTokens * (bonusPercent / 100);
    const totalTokens = baseTokens + bonusTokens;
    
    return totalTokens.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  // Calculate display price based on payment method
  const getDisplayPrice = () => {
    if (paymentMethod === 'usdt') {
      return "$0.000108";
    } else {
      // Calculate BNB price per BIT
      const bnbPrice = presaleData.bnbPrice || 600;
      const bnbPerBit = 0.000108 / bnbPrice;
      return bnbPerBit.toFixed(10);
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

        <div className="bg-bitaccess-black-dark p-4 rounded-md">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Estimated tokens:</span>
            <span className="text-bitaccess-gold font-semibold">{calculateEstimatedTokens()} BIT</span>
          </div>
          
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Current price:</span>
            <span className="text-white">
              {getDisplayPrice()} {paymentMethod.toUpperCase()} per BIT
            </span>
          </div>
          
          {paymentMethod === 'bnb' && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">BNB Price:</span>
              <span className="text-white">${presaleData.bnbPrice?.toFixed(2) || "600.00"} USDT</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Max per wallet:</span>
            <span className="text-white">10,000,000 BIT</span>
          </div>
        </div>

        <Button
          onClick={handlePurchase}
          disabled={isProcessing}
          className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black mt-4"
        >
          {isProcessing ? "Processing..." : "Purchase Tokens"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PresaleForm;
