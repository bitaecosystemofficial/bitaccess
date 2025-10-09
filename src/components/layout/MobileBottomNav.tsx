
import React from "react";
import { NavLink } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import { 
  Wallet,
  TrendingUp,
  BarChart3,
  Gift,
  Coins,
  RefreshCw,
  Shuffle,
  BookOpen,
  Users,
  Gavel,
  PhoneCall,
  Book,
  Info
} from "lucide-react";

// Import the navigation constants
import { NAVIGATION_ITEMS } from "./navigationConstants";

type NavItemWithIcon = {
  label: string;
  icon: React.ReactNode;
  href: string;
  requiresWallet: boolean;
  hideWhenConnected: boolean;
  requiresSubscription?: boolean;
};

const MobileBottomNav = () => {
  const { isConnected, connectWallet } = useWallet();
  const { membershipData } = useMembership();
  
  // Add icons to navigation items for mobile
  const navItems: NavItemWithIcon[] = [
    { label: "Chart", icon: <TrendingUp className="h-6 w-6" />, href: "/chart", requiresWallet: false, hideWhenConnected: false },
    { label: "About", icon: <Info className="h-6 w-6" />, href: "/about", requiresWallet: false, hideWhenConnected: true },
    { label: "Ecosystem", icon: <BarChart3 className="h-6 w-6" />, href: "/ecosystem", requiresWallet: false, hideWhenConnected: true },
    { label: "Tokenomics", icon: <Coins className="h-6 w-6" />, href: "/tokenomics", requiresWallet: false, hideWhenConnected: true },
    { label: "Roadmap", icon: <BookOpen className="h-6 w-6" />, href: "/roadmap", requiresWallet: false, hideWhenConnected: true },
    { label: "Airdrop", icon: <Gift className="h-6 w-6" />, href: "/airdrop", requiresWallet: true, hideWhenConnected: false },
    { label: "Presale", icon: <Coins className="h-6 w-6" />, href: "/presale", requiresWallet: true, hideWhenConnected: false },
    { label: "Staking", icon: <RefreshCw className="h-6 w-6" />, href: "/staking", requiresWallet: true, hideWhenConnected: false },
    { label: "Swap", icon: <Shuffle className="h-6 w-6" />, href: "/swap", requiresWallet: true, hideWhenConnected: false },
    { label: "Docs", icon: <Book className="h-6 w-6" />, href: "/docs", requiresWallet: false, hideWhenConnected: true },
    { label: "Community", icon: <Users className="h-6 w-6" />, href: "/community", requiresWallet: false, hideWhenConnected: true },
    { label: "FAQ", icon: <Gavel className="h-6 w-6" />, href: "/faq", requiresWallet: false, hideWhenConnected: true },
    { label: "Contact", icon: <PhoneCall className="h-6 w-6" />, href: "/contact", requiresWallet: false, hideWhenConnected: true },
    { label: "Wallet", icon: <Wallet className="h-6 w-6" />, href: "#", requiresWallet: false, hideWhenConnected: false },
  ];
  
  // Filter items based on wallet connection and subscription
  const visibleItems = navItems.filter(item => {
    // Hide items that require wallet if not connected
    if (item.requiresWallet && !isConnected) return false;
    
    // Hide items marked to hide when connected
    if (isConnected && item.hideWhenConnected) return false;
    
    // Hide items that require subscription if not subscribed
    if (item.requiresSubscription && (!membershipData?.isActive)) return false;
    
    return true;
  });
  
  const handleWalletClick = () => {
    if (!isConnected) {
      connectWallet();
    }
  };
  
  // Only show 5 items in the bottom bar
  const displayItems = visibleItems.slice(0, 5);
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bitaccess-black border-t border-bitaccess-gold/10 z-40">
      <div className="grid grid-cols-5 h-16">
        {displayItems.map((item) => (
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
