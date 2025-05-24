
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Copy, CheckCircle2, Settings } from "lucide-react";
import { useTokenData } from "@/hooks/useTokenData";
import { toast } from "@/hooks/use-toast";
import { useTokenBalance } from "@/hooks/useSwap";
import { tokenAddresses } from "@/constants/contracts";

interface WalletDisplayProps {
  address: string | null;
  handleDisconnectWallet: () => void;
}

const WalletDisplay = ({ address, handleDisconnectWallet }: WalletDisplayProps) => {
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const { tokenData } = useTokenData();
  const { balance: usdtBalance, isLoading: usdtLoading } = useTokenBalance(tokenAddresses.usdt);

  const copyToClipboard = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleWalletInfo = () => {
    setShowWalletInfo(!showWalletInfo);
  };

  // Shortened to 6 digits at start and 4 at end as requested
  const shortenedAddress = address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "";

  return (
    <div className="flex items-center">
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 flex items-center space-x-2"
          onClick={toggleWalletInfo}
        >
          <span>{shortenedAddress}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }} 
            className="ml-2 p-1 hover:bg-bitaccess-gold/20 rounded"
          >
            {copied ? 
              <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
              <Copy className="h-4 w-4 text-bitaccess-gold" />
            }
          </button>
        </Button>
        
        {showWalletInfo && (
          <div className="absolute right-0 mt-2 w-64 bg-bitaccess-black border border-bitaccess-gold/20 rounded-lg shadow-lg p-4 z-50">
            <div className="mb-3 pb-2 border-b border-bitaccess-gold/10">
              <p className="text-xs text-gray-400">Wallet Address</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-white break-all">{address}</p>
                <button 
                  onClick={copyToClipboard} 
                  className="ml-2 p-1 hover:bg-bitaccess-gold/20 rounded"
                >
                  {copied ? 
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
                    <Copy className="h-4 w-4 text-bitaccess-gold" />
                  }
                </button>
              </div>
            </div>
            <div className="flex justify-between mb-3 pb-2 border-b border-bitaccess-gold/10">
              <div>
                <p className="text-xs text-gray-400">BIT Balance</p>
                <p className="text-sm text-bitaccess-gold">{parseFloat(tokenData.balance).toLocaleString()} BIT</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">BNB Balance</p>
                <p className="text-sm text-white">0.125 BNB</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <NavLink 
                to="/settings"
                className="text-sm text-bitaccess-gold hover:underline flex items-center gap-1"
              >
                <Settings className="h-3 w-3" /> Settings
              </NavLink>
              <div>
                <p className="text-xs text-gray-400">USDT Balance</p>
                <p className="text-sm text-green-500">
                  {usdtLoading ? "Loading..." : `${parseFloat(usdtBalance).toFixed(2)} USDT`}
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDisconnectWallet}
              className="w-full mt-3"
            >
              Disconnect
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletDisplay;
