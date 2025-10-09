import React from "react";
import { Link } from "react-router-dom";
import { useMembership } from "@/contexts/MembershipContext";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/ui/logo";
import NavigationItems from "./NavigationItems";
import MobileMenu from "./MobileMenu";

import { NAVIGATION_ITEMS } from "./navigationConstants";
import { Web3WalletButton } from "@/components/ui/web3-wallet-button";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";

const Header = () => {
  const { address, isConnected } = useWeb3Wallet();
  const { membershipData } = useMembership();
  const isMobile = useIsMobile();
  
  // Filter navigation items - remove merchant, charts, and marketplace
  const navItems = [...NAVIGATION_ITEMS].filter(item => {
    // Remove merchant, marketplace, and charts navigation
    if (item.href === "/become-merchant" || 
        item.href === "/marketplace" || 
        item.href === "/dex-analytics") {
      return false;
    }
    return true;
  });

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
          <Web3WalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;