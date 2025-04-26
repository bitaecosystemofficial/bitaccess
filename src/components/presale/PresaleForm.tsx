
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { usePresaleData, useBuyTokens } from "@/utils/presale/presaleHooks";
import { toast } from "@/hooks/use-toast";

const PresaleForm = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const presaleData = usePresaleData();
  const buyTokens = useBuyTokens();
  
  const [paymentMethod, setPaymentMethod] = useState<'bnb' | 'usdt'>('bnb');
  const [usdAmount, setUsdAmount] = useState<number>(0);
  const [tokenAmount, setTokenAmount] = useState<number>(0);

  const handleBuyTokens = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    if (usdAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    const minAmount = presaleData.paymentMethods[paymentMethod].min;
    const maxAmount = presaleData.paymentMethods[paymentMethod].max;
    
    if (usdAmount < minAmount || usdAmount > maxAmount) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be between ${minAmount} and ${maxAmount} ${paymentMethod.toUpperCase()}`,
        variant: "destructive"
      });
      return;
    }

    await buyTokens(tokenAmount, paymentMethod);
    setUsdAmount(0);
    setTokenAmount(0);
  };

  return (
    <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10 mb-8">
      <h4 className="font-medium text-white mb-4">Purchase BIT Tokens</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Payment Method</label>
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod('bnb')}
              className={`flex-1 p-3 rounded border ${
                paymentMethod === 'bnb'
                  ? 'bg-bitaccess-gold/20 border-bitaccess-gold text-bitaccess-gold'
                  : 'border-gray-600 text-gray-400'
              }`}
            >
              BNB
            </button>
            <button
              onClick={() => setPaymentMethod('usdt')}
              className={`flex-1 p-3 rounded border ${
                paymentMethod === 'usdt'
                  ? 'bg-bitaccess-gold/20 border-bitaccess-gold text-bitaccess-gold'
                  : 'border-gray-600 text-gray-400'
              }`}
            >
              USDT
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Min: {presaleData.paymentMethods[paymentMethod].min} {paymentMethod.toUpperCase()} |
            Max: {presaleData.paymentMethods[paymentMethod].max} {paymentMethod.toUpperCase()}
          </p>
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-2">Amount in {paymentMethod.toUpperCase()}</label>
          <div className="relative">
            <input
              type="number"
              placeholder={`Enter ${paymentMethod.toUpperCase()} amount`}
              value={usdAmount || ''}
              onChange={(e) => setUsdAmount(parseFloat(e.target.value) || 0)}
              className="w-full p-3 bg-bitaccess-black-dark border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none pr-20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {paymentMethod.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-2">You will receive</label>
          <div className="relative">
            <input
              type="number"
              placeholder="0.0"
              value={tokenAmount || ''}
              className="w-full p-3 bg-bitaccess-black-dark border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none pr-12"
              readOnly
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">BIT</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <Button 
          size="lg" 
          className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
          onClick={handleBuyTokens}
        >
          {isConnected ? 'Buy BIT Tokens' : 'Connect Wallet to Purchase'}
        </Button>
      </div>
    </div>
  );
};

export default PresaleForm;
