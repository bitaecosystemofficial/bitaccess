
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Check, Wallet, CreditCard, Loader2, Store, ShoppingBag } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useMerchantData, subscribeMerchant } from "@/hooks/useMerchants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Merchants = () => {
  const { isConnected, address, connectWallet, isConnecting } = useWallet();
  const merchantData = useMerchantData();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<'BIT' | 'USDT'>('BIT');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showWalletDialog, setShowWalletDialog] = useState<boolean>(false);

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      setShowWalletDialog(false);
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  const handleSubscribe = async (plan: string) => {
    if (!isConnected) {
      setShowWalletDialog(true);
      return;
    }

    if (isProcessing) return;

    try {
      setIsProcessing(true);
      
      toast({
        title: "Processing Payment",
        description: `Initiating payment for ${plan} subscription with ${selectedToken}...`,
      });

      const result = await subscribeMerchant(plan, 30, address as string, selectedToken);
      
      if (result.success) {
        toast({
          title: "Subscription Successful",
          description: `You have successfully subscribed to the ${plan} plan with ${selectedToken}!`,
        });
        setSelectedPlan(plan);
      } else {
        toast({
          title: "Subscription Failed",
          description: result.error || "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="E-commerce Store Program"
            subtitle="Accept BIT tokens in your online store and join our growing ecosystem"
            centered
          />

          <div className="flex justify-center mb-8">
            <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20 w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ShoppingCart className="text-bitaccess-gold h-6 w-6" />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="text-bitaccess-gold" />
                  <span>E-commerce Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Stores</p>
                    <p className="text-2xl font-semibold text-white">{merchantData.totalMerchants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Active Stores</p>
                    <p className="text-2xl font-semibold text-white">{merchantData.activeMerchants}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-400">Store Categories</p>
                  <ul className="space-y-1">
                    {merchantData.categories.map((category) => (
                      <li key={category.name} className="flex justify-between text-gray-300">
                        <span>{category.name}</span>
                        <span>{category.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {merchantData.plans.map((plan) => (
              <Card key={plan.name} className={`bg-bitaccess-black-light border border-bitaccess-gold/20 ${plan.highlighted ? 'border-2 border-bitaccess-gold' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-400">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-300">
                        <Check className="h-4 w-4 text-bitaccess-gold" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <p className="mb-2 text-bitaccess-gold font-semibold text-center">
                      {selectedToken === 'BIT' ? `${plan.price} BIT` : `${Math.round(Number(plan.price) / 5)} USDT`} / month
                    </p>
                    <Button
                      className={`w-full ${selectedPlan === plan.name ? 'bg-green-500 hover:bg-green-600' : 'bg-bitaccess-gold hover:bg-bitaccess-gold/90'} text-black`}
                      onClick={() => handleSubscribe(plan.name)}
                      disabled={selectedPlan === plan.name || isProcessing}
                    >
                      {isProcessing ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                      ) : selectedPlan === plan.name ? (
                        "Subscribed"
                      ) : (
                        `Pay with ${selectedToken}`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
        <DialogContent className="bg-bitaccess-black border border-bitaccess-gold/20">
          <DialogHeader>
            <DialogTitle className="text-bitaccess-gold">Connect Wallet</DialogTitle>
            <DialogDescription>
              You need to connect your wallet to subscribe to an e-commerce store plan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleWalletConnect}
              className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...</>
              ) : (
                <><Wallet className="mr-2 h-4 w-4" /> Connect Wallet</>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Merchants;
