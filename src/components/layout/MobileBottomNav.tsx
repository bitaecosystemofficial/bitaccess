
import React from "react";
import { NavLink } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { 
  Wallet,
  Home,
  BarChart3,
  Gift,
  Coins,
  RefreshCw,
  Shuffle
} from "lucide-react";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  requiresWallet: boolean;
};

const MobileBottomNav = () => {
  const { isConnected, connectWallet } = useWallet();
  
  const navItems: NavItem[] = [
    { label: "Home", icon: <Home className="h-6 w-6" />, href: "/", requiresWallet: false },
    { label: "Dashboard", icon: <BarChart3 className="h-6 w-6" />, href: "/dashboard", requiresWallet: true },
    { label: "Airdrop", icon: <Gift className="h-6 w-6" />, href: "/airdrop", requiresWallet: true },
    { label: "Presale", icon: <Coins className="h-6 w-6" />, href: "/presale", requiresWallet: true },
    { label: "Staking", icon: <RefreshCw className="h-6 w-6" />, href: "/staking", requiresWallet: true },
    { label: "Swap", icon: <Shuffle className="h-6 w-6" />, href: "/swap", requiresWallet: true },
    { label: "Wallet", icon: <Wallet className="h-6 w-6" />, href: "#", requiresWallet: false },
  ];
  
  // Filter items based on wallet connection
  const visibleItems = navItems.filter(item => !item.requiresWallet || isConnected);
  
  const handleWalletClick = () => {
    if (!isConnected) {
      connectWallet();
    }
  };
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bitaccess-black border-t border-bitaccess-gold/10 z-40">
      <div className="grid grid-cols-5 h-16">
        {visibleItems.slice(0, 5).map((item) => (
          item.href === "#" ? (
            <button
              key={item.label}
              className="flex flex-col items-center justify-center text-gray-400 hover:text-bitaccess-gold"
              onClick={handleWalletClick}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ) : (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center ${
                  isActive 
                    ? "text-bitaccess-gold" 
                    : "text-gray-400 hover:text-bitaccess-gold"
                }`
              }
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          )
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
