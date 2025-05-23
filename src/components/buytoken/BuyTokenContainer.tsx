
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet, CreditCard } from "lucide-react";
import { TokenCalculator } from "./TokenCalculator";
import { PresaleInfoCard } from "./PresaleInfoCard";
import { BnbPaymentForm } from "./BnbPaymentForm";
import { UsdtPaymentForm } from "./UsdtPaymentForm";
import { usePresaleData } from '@/utils/presale';
import useBuyTokenForm from "@/hooks/useBuyTokenForm";

export const BuyTokenContainer = () => {
  const presaleData = usePresaleData();
  const { 
    paymentMethod, setPaymentMethod,
    bnbAmount, handleBnbChange,
    usdtAmount, handleUsdtChange,
    tokenAmount, bonusAmount, totalTokens,
    isLoading, approved,
    handleApprove, handleBuyTokens,
    isValidAmount
  } = useBuyTokenForm(presaleData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Presale Info Card */}
      <div className="md:col-span-1">
        <PresaleInfoCard 
          currentPhase={presaleData.currentPhase}
          totalPhases={presaleData.totalPhases}
          bnbRate={presaleData.bnbRate}
          usdtRate={presaleData.usdtRate}
          soldTokens={presaleData.soldTokens}
          totalSupply={presaleData.totalSupply}
          progress={presaleData.progress}
          bonusTiers={presaleData.bonusTiers}
          paymentMethods={presaleData.paymentMethods}
        />
      </div>
      
      {/* Purchase Card */}
      <div className="md:col-span-2">
        <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20">
          <CardHeader>
            <CardTitle>Token Purchase</CardTitle>
            <CardDescription>
              Select payment method and amount to purchase BIT tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Tabs 
                defaultValue="bnb" 
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as "bnb" | "usdt")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bnb" className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    Pay with BNB
                  </TabsTrigger>
                  <TabsTrigger value="usdt" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay with USDT
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="bnb" className="mt-4">
                  <BnbPaymentForm 
                    bnbAmount={bnbAmount}
                    handleBnbChange={handleBnbChange}
                    handleBuyTokens={handleBuyTokens}
                    isLoading={isLoading}
                    isValidAmount={isValidAmount}
                    minPurchaseAmount={presaleData.paymentMethods.bnb.min}
                  />
                </TabsContent>
                
                <TabsContent value="usdt" className="mt-4">
                  <UsdtPaymentForm 
                    usdtAmount={usdtAmount}
                    handleUsdtChange={handleUsdtChange}
                    handleApprove={handleApprove}
                    handleBuyTokens={handleBuyTokens}
                    isLoading={isLoading}
                    isValidAmount={isValidAmount}
                    approved={approved}
                    minPurchaseAmount={presaleData.paymentMethods.usdt.min}
                  />
                </TabsContent>
              </Tabs>
              
              {/* Token calculation box */}
              <TokenCalculator 
                tokenAmount={tokenAmount}
                bonusAmount={bonusAmount}
                totalTokens={totalTokens}
              />
              
              {!isValidAmount && (
                <Alert variant="destructive" className="bg-red-900/20 border-red-900">
                  <AlertDescription>
                    Amount is below minimum requirement
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="text-center text-xs text-gray-400">
                <p>Transaction processing may take a few minutes.</p>
                <p>Tokens will be delivered to your wallet after the presale ends.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
