
import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/ui/logo";
import WalletDisplay from "./WalletDisplay";
import NavigationItems from "./NavigationItems";
import MobileMenu from "./MobileMenu";
import { NAVIGATION_ITEMS } from "./navigationConstants";

const Header = () => {
  const { address, isConnected, connectWallet, disconnectWallet } = useWallet();
  const isMobile = useIsMobile();

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
            items={NAVIGATION_ITEMS} 
            isConnected={isConnected} 
            className="flex items-center space-x-6 mx-4"
          />
        ) : (
          <MobileMenu 
            navigationItems={NAVIGATION_ITEMS} 
            isConnected={isConnected} 
          />
        )}

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
    </header>
  );
};

export default Header;
