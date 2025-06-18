
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";

const EnhancedWalletPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const { isConnected, connectWallet, chainId } = useWallet();
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const hasSeenWalletPopup = localStorage.getItem('hasSeenWalletPopup');
    
    if (!hasSeenWalletPopup && !isConnected && !hasShownPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShownPopup(true);
        localStorage.setItem('hasSeenWalletPopup', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isConnected, hasShownPopup]);

  const handleWalletSelect = async (walletType: string) => {
    setSelectedWallet(walletType);
    setIsConnecting(true);
    
    try {
      await connectWallet();
      
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
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWalletPopup', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gradient-to-br from-bitaccess-black via-bitaccess-black-light to-bitaccess-black border-2 border-bitaccess-gold/30 sm:max-w-[600px] relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-bitaccess-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-bitaccess-gold/3 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-bitaccess-gold/10 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <DialogHeader className="relative z-10">
          <DialogTitle className="text-center text-bitaccess-gold text-3xl mb-4 font-bold">
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300 text-lg">
            Choose your preferred wallet to access the Bit Access ecosystem
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8 py-6 relative z-10">
          <div className="bg-gradient-to-r from-yellow-900/20 via-yellow-800/20 to-yellow-900/20 border border-yellow-500/40 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <span className="text-yellow-400 font-semibold text-lg">Network Information</span>
            </div>
            <p className="text-yellow-200 leading-relaxed">
              Please ensure you're connected to <strong className="text-yellow-100">BSC Mainnet (Binance Smart Chain)</strong> for full functionality and access to all features.
            </p>
          </div>

          <div className="grid gap-6">
            {/* MetaMask Wallet Card */}
            <Card className={`border-2 transition-all duration-300 cursor-pointer hover:scale-105 transform ${
              selectedWallet === 'metamask' 
                ? 'border-bitaccess-gold bg-bitaccess-gold/10' 
                : 'border-bitaccess-gold/30 bg-bitaccess-black-light hover:border-bitaccess-gold/50'
            }`}
            onClick={() => handleWalletSelect('metamask')}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <img 
                      src="https://metamask.io/favicons/default/apple-touch-icon.png" 
                      alt="MetaMask" 
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-white">MetaMask</h3>
                    <p className="text-bitaccess-gold font-medium">Browser Extension Wallet</p>
                  </div>
                  {selectedWallet === 'metamask' && isConnecting && (
                    <div className="animate-spin w-6 h-6 border-2 border-bitaccess-gold border-t-transparent rounded-full"></div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Most popular and secure DeFi wallet</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Built-in BSC Mainnet support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Advanced security features</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Wallet Card */}
            <Card className={`border-2 transition-all duration-300 cursor-pointer hover:scale-105 transform ${
              selectedWallet === 'trustwallet' 
                ? 'border-bitaccess-gold bg-bitaccess-gold/10' 
                : 'border-bitaccess-gold/30 bg-bitaccess-black-light hover:border-bitaccess-gold/50'
            }`}
            onClick={() => handleWalletSelect('trustwallet')}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <img 
                      src="https://vectorseek.com/wp-content/uploads/2024/07/Trust-Wallet-Shield-Logo-Vector-Logo-Vector.svg-.png" 
                      alt="Trust Wallet" 
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-white">Trust Wallet</h3>
                    <p className="text-bitaccess-gold font-medium">Mobile-First Secure Wallet</p>
                  </div>
                  {selectedWallet === 'trustwallet' && isConnecting && (
                    <div className="animate-spin w-6 h-6 border-2 border-bitaccess-gold border-t-transparent rounded-full"></div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Perfect for mobile users</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Native BSC support built-in</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Multi-chain wallet support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Button 
              onClick={handleSkip}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 py-3 text-lg font-medium"
              disabled={isConnecting}
            >
              Skip for Now
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-bitaccess-gold/20">
            <p className="text-xs text-gray-500 leading-relaxed">
              By connecting your wallet, you agree to our <span className="text-bitaccess-gold">Terms of Service</span> and <span className="text-bitaccess-gold">Privacy Policy</span>. 
              Your wallet information is secure and never stored on our servers.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedWalletPopup;
