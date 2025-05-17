
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Copy, CheckCircle2 } from "lucide-react";
import { useTokenData } from "@/hooks/useTokenData";
import Logo from "@/components/ui/logo";
import { toast } from "@/hooks/use-toast";
import { useMembership } from "@/contexts/MembershipContext";

// Navigation items with wallet requirement flag
const NAVIGATION_ITEMS = [
  { label: "Home", href: "/", requiresWallet: false, hideWhenConnected: false },
  { label: "Dashboard", href: "/dashboard", requiresWallet: true, hideWhenConnected: false },
  { label: "About", href: "/about", requiresWallet: false, hideWhenConnected: true },
  { label: "Education", href: "/education", requiresWallet: false, hideWhenConnected: true },
  { label: "Videos", href: "/videos", requiresWallet: false, hideWhenConnected: true, requiresSubscription: true },
  { label: "Marketplace", href: "/marketplace", requiresWallet: false, hideWhenConnected: true },
  { label: "Airdrop", href: "/airdrop", requiresWallet: true, hideWhenConnected: false },
  { label: "Presale", href: "/presale", requiresWallet: true, hideWhenConnected: false },
  { label: "Staking", href: "/staking", requiresWallet: true, hideWhenConnected: false },
  { label: "Swap", href: "/swap", requiresWallet: true, hideWhenConnected: false },
  { label: "Spin Wheel", href: "/spin-wheel", requiresWallet: true, hideWhenConnected: false },
  { label: "Docs", href: "/docs", requiresWallet: false, hideWhenConnected: true },
  { label: "Community", href: "/community", requiresWallet: false, hideWhenConnected: true },
  { label: "Governance", href: "/governance", requiresWallet: false, hideWhenConnected: true },
  { label: "Contact", href: "/contact", requiresWallet: false, hideWhenConnected: true },
];

const Header = () => {
  const { address, isConnected, connectWallet, disconnectWallet } = useWallet();
  const isMobile = useIsMobile();
  const { tokenData } = useTokenData();
  const { membershipData } = useMembership();
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConnectWallet = async () => {
    if (!isConnected) {
      await connectWallet();
    }
  };

  const handleDisconnectWallet = () => {
    if (isConnected) {
      disconnectWallet();
    }
  };

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

  // Filter navigation items based on wallet connection and subscription
  const visibleNavItems = NAVIGATION_ITEMS.filter(item => {
    // Hide items that require wallet if not connected
    if (item.requiresWallet && !isConnected) return false;
    
    // Hide items marked to hide when connected
    if (isConnected && item.hideWhenConnected) return false;
    
    // Hide items that require subscription if not subscribed
    if (item.requiresSubscription && (!membershipData?.isActive)) return false;
    
    return true;
  });

  // Non-wallet required items for basic navigation - also filter out items that should be hidden when connected
  const baseNavItems = NAVIGATION_ITEMS.filter(item => {
    // Basic items that don't require wallet
    if (!item.requiresWallet && !(isConnected && item.hideWhenConnected)) {
      // Check subscription requirement
      if (item.requiresSubscription) {
        return membershipData?.isActive;
      }
      return true;
    }
    return false;
  });

  const toggleWalletInfo = () => {
    setShowWalletInfo(!showWalletInfo);
  };

  return (
    <header className="bg-bitaccess-black fixed top-0 left-0 w-full z-50 border-b border-bitaccess-gold/10">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center font-bold text-xl text-white">
          <Logo />
        </Link>

        {!isMobile ? (
          <nav className="flex items-center space-x-6 mx-4">
            {visibleNavItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `text-gray-400 hover:text-bitaccess-gold transition-colors ${isActive ? "text-bitaccess-gold" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-bitaccess-black border-r border-bitaccess-gold/10">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>
                  Explore the BitAccess Ecosystem
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-4 mt-8">
                {baseNavItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-gray-400 hover:text-bitaccess-gold transition-colors ${isActive ? "text-bitaccess-gold" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                
                {isConnected && (
                  <>
                    <div className="border-t border-bitaccess-gold/10 mt-2 pt-2">
                      <h3 className="px-4 text-sm font-medium text-bitaccess-gold mb-2">Wallet Features</h3>
                    </div>
                    {NAVIGATION_ITEMS.filter(item => 
                      item.requiresWallet && !item.hideWhenConnected && 
                      (!item.requiresSubscription || membershipData?.isActive)
                    ).map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.href}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-gray-400 hover:text-bitaccess-gold transition-colors ${isActive ? "text-bitaccess-gold" : ""}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        )}

        {isConnected ? (
          <div className="flex items-center">
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 flex items-center space-x-2"
                onClick={toggleWalletInfo}
              >
                <span>{address?.substring(0, 6)}...{address?.substring(address.length - 4)}</span>
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
                      to="/spin-wheel"
                      className="text-sm text-bitaccess-gold hover:underline"
                    >
                      Spin Wheel
                    </NavLink>
                    <NavLink 
                      to="/swap"
                      className="text-sm text-bitaccess-gold hover:underline"
                    >
                      Swap
                    </NavLink>
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
        ) : (
          <Button onClick={handleConnectWallet} className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
