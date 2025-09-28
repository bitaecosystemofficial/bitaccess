import React from "react";
import { Link } from "react-router-dom";
import { useMembership } from "@/contexts/MembershipContext";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/ui/logo";
import NavigationItems from "./NavigationItems";
import MobileMenu from "./MobileMenu";
import CartIndicator from "../marketplace/CartIndicator";
import { NAVIGATION_ITEMS } from "./navigationConstants";
import { Web3WalletButton } from "@/components/ui/web3-wallet-button";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";

const Header = () => {
  const { address, isConnected } = useWeb3Wallet();
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

        <div className="flex items-center space-x-4">
          {isConnected && <CartIndicator />}
          <Web3WalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;