
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/components/ui/logo";

// Navigation items with wallet requirement flag
const NAVIGATION_ITEMS = [
  { label: "Home", href: "/", requiresWallet: false },
  { label: "Dashboard", href: "/dashboard", requiresWallet: true },
  { label: "Education", href: "/education", requiresWallet: false },
  { label: "Videos", href: "/videos", requiresWallet: false },
  { label: "Marketplace", href: "/marketplace", requiresWallet: false },
  { label: "Airdrop", href: "/airdrop", requiresWallet: true },
  { label: "Presale", href: "/presale", requiresWallet: true },
  { label: "Staking", href: "/staking", requiresWallet: true },
  { label: "Swap", href: "/swap", requiresWallet: true },
  { label: "Spin Wheel", href: "/spin-wheel", requiresWallet: true },
  { label: "Docs", href: "/docs", requiresWallet: false },
  { label: "Community", href: "/community", requiresWallet: false },
  { label: "Governance", href: "/governance", requiresWallet: false },
  { label: "Contact", href: "/contact", requiresWallet: false },
];

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

  // Filter navigation items based on wallet connection for desktop view
  const visibleNavItems = NAVIGATION_ITEMS.filter(item => 
    !item.requiresWallet || (item.requiresWallet && isConnected)
  );

  return (
    <header className="bg-bitaccess-black fixed top-0 left-0 w-full z-50 border-b border-bitaccess-gold/10">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center font-bold text-xl text-white">
          <Logo />
        </Link>

        {!isMobile ? (
          <nav className="flex items-center space-x-6">
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
                {visibleNavItems.map((item) => (
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
              </nav>
            </SheetContent>
          </Sheet>
        )}

        {isConnected ? (
          <div className="flex items-center">
            <span className="text-gray-400 mr-3 hidden md:block">
              {address?.substring(0, 6) + "..." + address?.substring(address.length - 4)}
            </span>
            <Button variant="outline" size="sm" className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10" onClick={handleDisconnectWallet}>
              Disconnect
            </Button>
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
