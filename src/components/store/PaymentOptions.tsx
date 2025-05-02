
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, CreditCard } from "lucide-react";

interface PaymentOptionsProps {
  selectedToken: 'BIT' | 'USDT';
  setSelectedToken: (token: 'BIT' | 'USDT') => void;
}

const PaymentOptions = ({ selectedToken, setSelectedToken }: PaymentOptionsProps) => {
  return (
    <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20 w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Wallet className="text-bitaccess-gold h-6 w-6" />
          <span>Payment Options</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">Select your preferred payment token:</p>
        <div className="flex items-center space-x-4">
          <Button 
            variant={selectedToken === 'BIT' ? "default" : "outline"}
            onClick={() => setSelectedToken('BIT')}
            className={selectedToken === 'BIT' ? "bg-bitaccess-gold text-black" : "border-bitaccess-gold/50 text-gray-300"}
          >
            <Wallet className="mr-2 h-4 w-4" />
            BIT Token
          </Button>
          <Button 
            variant={selectedToken === 'USDT' ? "default" : "outline"}
            onClick={() => setSelectedToken('USDT')}
            className={selectedToken === 'USDT' ? "bg-bitaccess-gold text-black" : "border-bitaccess-gold/50 text-gray-300"}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            USDT
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentOptions;
