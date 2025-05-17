
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/components/ui/logo";

const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Education", href: "/education" },
  { label: "Videos", href: "/videos" },
  { label: "Airdrop", href: "/airdrop" },
  { label: "Presale", href: "/presale" },
  { label: "Staking", href: "/staking" },
  { label: "Swap", href: "/swap" },
  { label: "Spin Wheel", href: "/spin-wheel" },
  { label: "Docs", href: "/docs" },
  { label: "Community", href: "/community" },
  { label: "Governance", href: "/governance" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const { address, isConnected, connectWallet, disconnectWallet } = useWallet();
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

        {isDesktop ? (
          <nav className="flex items-center space-x-6">
            {NAVIGATION_ITEMS.map((item) => (
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
                {NAVIGATION_ITEMS.map((item) => (
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
