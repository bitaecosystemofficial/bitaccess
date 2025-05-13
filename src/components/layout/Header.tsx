
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { useWallet } from "@/contexts/WalletContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Airdrop", path: "/airdrop" },
  { label: "Presale", path: "/presale" },
  { label: "Staking", path: "/staking" },
  { label: "Swap", path: "/swap" },
  { label: "Spin Wheel", path: "/spin-wheel" },
  { label: "Education", path: "/education" },
  { label: "Analytics", path: "/dex-analytics" },
  { label: "Docs", path: "/docs" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address, isConnected, isConnecting, balance, connectWallet, disconnectWallet } = useWallet();
  const location = useLocation();

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-bitaccess-gold/30">
      <div className="container flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl md:text-2xl font-bold bg-gold-gradient text-transparent bg-clip-text">Bit Access Ecosystem</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 text-sm rounded-md hover:bg-bitaccess-gold/10 transition-colors ${
                location.pathname === item.path 
                  ? "text-bitaccess-gold border-b-2 border-bitaccess-gold" 
                  : "text-bitaccess-gold-light"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isConnected ? (
            <div className="flex items-center gap-3">
              <div className="bg-bitaccess-black-light px-3 py-1 rounded-full border border-bitaccess-gold/20">
                <span className="text-bitaccess-gold text-sm font-medium">{balance} BIT</span>
              </div>
              <Button 
                variant="outline" 
                className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
                onClick={disconnectWallet}
              >
                <Wallet size={16} className="mr-2" />
                {truncateAddress(address as string)}
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-bitaccess-gold"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-bitaccess-black py-4 px-6 border-b border-bitaccess-gold/20">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 py-2 text-sm rounded-md hover:bg-bitaccess-gold/10 transition-colors ${
                  location.pathname === item.path 
                    ? "text-bitaccess-gold font-medium" 
                    : "text-bitaccess-gold-light"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isConnected ? (
              <>
                <div className="px-2 py-2">
                  <div className="bg-bitaccess-black-light px-3 py-1 rounded-full border border-bitaccess-gold/20 inline-block">
                    <span className="text-bitaccess-gold text-sm font-medium">{balance} BIT</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-3 border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
                  onClick={() => {
                    disconnectWallet();
                    setIsMenuOpen(false);
                  }}
                >
                  <Wallet size={16} className="mr-2" />
                  {truncateAddress(address as string)}
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                className="mt-3 border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
                onClick={() => {
                  connectWallet();
                  setIsMenuOpen(false);
                }}
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
