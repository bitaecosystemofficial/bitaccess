
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useStoreData, subscribeStore } from "@/hooks/useStores";

// Import the new components
import PaymentOptions from "@/components/store/PaymentOptions";
import StoreStats from "@/components/store/StoreStats";
import PlanCard from "@/components/store/PlanCard";
import WalletDialog from "@/components/store/WalletDialog";

const StorePage = () => {
  const { isConnected, address, connectWallet, isConnecting } = useWallet();
  const storeData = useStoreData();
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

      const result = await subscribeStore(plan, 30, address as string, selectedToken);
      
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
            <PaymentOptions
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StoreStats
              totalStores={storeData.totalStores}
              activeStores={storeData.activeStores}
              categories={storeData.categories}
            />

            {storeData.plans.map((plan) => (
              <PlanCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                highlighted={plan.highlighted}
                selectedToken={selectedToken}
                selectedPlan={selectedPlan}
                isProcessing={isProcessing}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>
        </div>
      </div>

      <WalletDialog
        open={showWalletDialog}
        onOpenChange={setShowWalletDialog}
        isConnecting={isConnecting}
        onConnectWallet={handleWalletConnect}
      />
    </Layout>
  );
};

export default StorePage;
