
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "@/components/layout/Logo";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Airdrop", path: "/airdrop" },
  { label: "Presale", path: "/presale" },
  { label: "Staking", path: "/staking" },
  { label: "Swap", path: "/swap" },
  { label: "Merchants", path: "/merchants" },
  { label: "Docs", path: "/docs" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-bitaccess-gold/30">
      <div className="container flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl md:text-2xl font-bold bg-gold-gradient text-transparent bg-clip-text">BitAccess</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="px-3 py-2 text-sm rounded-md hover:bg-bitaccess-gold/10 transition-colors text-bitaccess-gold-light"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10">
            Connect Wallet
          </Button>
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
                className="px-2 py-2 text-sm rounded-md hover:bg-bitaccess-gold/10 transition-colors text-bitaccess-gold-light"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="outline" 
              className="mt-3 border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10"
            >
              Connect Wallet
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
