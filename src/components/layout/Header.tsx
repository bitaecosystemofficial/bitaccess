
import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/ui/logo";
import WalletDisplay from "./WalletDisplay";
import NavigationItems from "./NavigationItems";
import MobileMenu from "./MobileMenu";
import CartIndicator from "../marketplace/CartIndicator";
import { NAVIGATION_ITEMS } from "./navigationConstants";

const Header = () => {
  const { address, isConnected, connectWallet, disconnectWallet } = useWallet();
  const { membershipData } = useMembership();
  const isMobile = useIsMobile();
  
  // Filter navigation items based on merchant status
  const navItems = [...NAVIGATION_ITEMS].filter(item => {
    // Hide "Become A Merchant" if user is already a merchant
    if (item.href === "/become-merchant" && membershipData?.type === "Merchant") {
      return false;
    }
    return true;
  });
  
  // Add marketplace to navigation if wallet is connected
  if (isConnected) {
    if (!navItems.some(item => item.href === "/marketplace")) {
      navItems.push({
        label: "Marketplace",
        href: "/marketplace",
        requiresWallet: true,
        hideWhenConnected: false,
      });
    }
    
    // Add Merchant Dashboard link if user is a merchant
    if (membershipData?.type === "Merchant" && !navItems.some(item => item.href === "/marketplace/merchant/dashboard")) {
      navItems.push({
        label: "Merchant Dashboard",
        href: "/marketplace/merchant/dashboard",
        requiresWallet: true,
        hideWhenConnected: false,
      });
    }
  }

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

  return (
    <header className="bg-bitaccess-black fixed top-0 left-0 w-full z-50 border-b border-bitaccess-gold/10">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center font-bold text-xl text-white">
          <Logo />
        </Link>

        {!isMobile ? (
          <NavigationItems 
            items={navItems} 
            isConnected={isConnected} 
            className="flex items-center space-x-6 mx-4"
          />
        ) : (
          <MobileMenu 
            navigationItems={navItems} 
            isConnected={isConnected} 
          />
        )}

        <div className="flex items-center">
          {isConnected && <CartIndicator />}
          
          {isConnected ? (
            <WalletDisplay 
              address={address} 
              handleDisconnectWallet={handleDisconnectWallet} 
            />
          ) : (
            <Button onClick={handleConnectWallet} className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
