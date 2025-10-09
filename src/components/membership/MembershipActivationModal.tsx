
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Wallet, X } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { ethers } from "ethers";
import { CryptoCompareService } from "@/services/CryptoCompareService";

interface MembershipActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivated: () => void;
}

const MembershipActivationModal = ({ isOpen, onClose, onActivated }: MembershipActivationModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [bnbAmount, setBnbAmount] = useState("0.0");
  const [loadingPrice, setLoadingPrice] = useState(true);
  const { provider, signer, address } = useWallet();

  // Fetch BNB price and calculate equivalent for 5 USDT
  useEffect(() => {
    const fetchBnbPrice = async () => {
      try {
        setLoadingPrice(true);
        const prices = await CryptoCompareService.getAllPrices();
        const bnbPrice = prices.BNB || 600; // Fallback to $600 if API fails
        
        // Calculate BNB equivalent of 5 USDT
        const bnbEquivalent = 5 / bnbPrice;
        setBnbAmount(bnbEquivalent.toFixed(6));
      } catch (error) {
        console.error("Error fetching BNB price:", error);
        // Fallback calculation with $600 BNB
        setBnbAmount((5 / 600).toFixed(6));
      } finally {
        setLoadingPrice(false);
      }
    };

    if (isOpen) {
      fetchBnbPrice();
    }
  }, [isOpen]);

  const handlePayment = async () => {
    if (!provider || !signer || !address) {
      toast({
        title: "Wallet Error",
        description: "Please ensure your wallet is connected",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Send BNB equivalent of 5 USDT for membership activation
      const transaction = {
        to: "0x7a42F1196271B5A68A36FA0D6A61F85A6cFA7E12", // Payment address
        value: ethers.utils.parseEther(bnbAmount),
      };

      const tx = await signer.sendTransaction(transaction);
      
      toast({
        title: "Payment Processing",
        description: "Your membership activation payment is being processed...",
      });

      await tx.wait();
      
      toast({
        title: "Membership Activated!",
        description: "Your membership card has been successfully activated.",
      });

      onActivated();
      onClose();
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSkip = () => {
    toast({
      title: "Activation Skipped",
      description: "You can activate your membership card later",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-bitaccess-black border-bitaccess-gold/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-bitaccess-gold flex items-center">
            <CreditCard className="mr-2" />
            Activate Membership Card
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Activate your membership card to unlock exclusive benefits and features
          </DialogDescription>
        </DialogHeader>

        <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-bitaccess-gold/20 rounded-full flex items-center justify-center">
                <Wallet className="w-8 h-8 text-bitaccess-gold" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Membership Card Activation
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Pay a one-time activation fee to unlock your digital membership card
              </p>
              
              <div className="bg-bitaccess-black rounded-lg p-4 mb-4">
                <div className="text-2xl font-bold text-bitaccess-gold">
                  {loadingPrice ? "Loading..." : `${bnbAmount} BNB`}
                </div>
                <div className="text-sm text-gray-400">Activation Fee (≈ $5 USDT)</div>
              </div>

              <div className="text-xs text-gray-500 mb-6">
                This one-time payment activates your membership card and grants access to exclusive features
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handlePayment}
                disabled={isProcessing || loadingPrice}
                className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
              >
                {isProcessing ? "Processing Payment..." : loadingPrice ? "Loading..." : `Pay ${bnbAmount} BNB to Activate`}
              </Button>
              
              <Button 
                onClick={handleSkip}
                variant="outline"
                className="w-full border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                Skip for Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipActivationModal;
