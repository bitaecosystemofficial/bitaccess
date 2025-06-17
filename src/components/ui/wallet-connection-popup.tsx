
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Shield, AlertTriangle } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";

const WalletConnectionPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, connectWallet, chainId } = useWallet();
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // Show popup when user first visits if wallet is not connected
  useEffect(() => {
    const hasSeenWalletPopup = localStorage.getItem('hasSeenWalletPopup');
    
    if (!hasSeenWalletPopup && !isConnected && !hasShownPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShownPopup(true);
        localStorage.setItem('hasSeenWalletPopup', 'true');
      }, 2000); // Show after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [isConnected, hasShownPopup]);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      
      // Check if connected to BSC Mainnet (chainId 56)
      if (chainId && chainId !== 56) {
        toast({
          title: "Switch to BSC Mainnet",
          description: "Please switch to Binance Smart Chain Mainnet (BSC) for full functionality.",
          variant: "destructive",
        });
      }
      
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWalletPopup', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-bitaccess-black border-bitaccess-gold/20 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-bitaccess-gold text-2xl mb-2">
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Connect your wallet to access all features of the Bit Access ecosystem
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span className="text-yellow-500 font-medium">Important Network Information</span>
            </div>
            <p className="text-sm text-yellow-200">
              Please ensure you're connected to <strong>BSC Mainnet (Binance Smart Chain)</strong> for full functionality.
            </p>
          </div>

          <div className="grid gap-4">
            <Card className="border-bitaccess-gold/20 bg-bitaccess-black-light">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">MetaMask</h3>
                    <p className="text-sm text-gray-400">Recommended browser wallet</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Most popular and secure wallet for DeFi interactions
                </p>
              </CardContent>
            </Card>

            <Card className="border-bitaccess-gold/20 bg-bitaccess-black-light">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Trust Wallet</h3>
                    <p className="text-sm text-gray-400">Mobile-first secure wallet</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Perfect for mobile users with built-in BSC support
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleConnectWallet}
              className="flex-1 bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-bitaccess-black font-medium"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
            <Button 
              onClick={handleSkip}
              variant="outline" 
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Skip for Now
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectionPopup;
