
import { NavItem } from "./NavigationItems";

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Home", href: "/", requiresWallet: false, hideWhenConnected: false },
  { label: "About", href: "/about", requiresWallet: false, hideWhenConnected: true },
  { label: "Education", href: "/education", requiresWallet: false, hideWhenConnected: true },
  { label: "Videos", href: "/videos", requiresWallet: false, hideWhenConnected: true, requiresSubscription: true },
  { label: "Marketplace", href: "/marketplace", requiresWallet: false, hideWhenConnected: true },
  { label: "Become A Merchant", href: "/become-merchant", requiresWallet: true, hideWhenConnected: false },
  { label: "Airdrop", href: "/airdrop", requiresWallet: true, hideWhenConnected: false },
  { label: "Presale", href: "/presale", requiresWallet: true, hideWhenConnected: false },
  { label: "Staking", href: "/staking", requiresWallet: true, hideWhenConnected: false },
  { label: "Swap", href: "/swap", requiresWallet: true, hideWhenConnected: false },
  { label: "Settings", href: "/settings", requiresWallet: true, hideWhenConnected: false },
  { label: "Membership Card", href: "/membership-card", requiresWallet: true, hideWhenConnected: false },
  { label: "Docs", href: "/docs", requiresWallet: false, hideWhenConnected: true },
  { label: "Community", href: "/community", requiresWallet: false, hideWhenConnected: true },
  { label: "Governance", href: "/governance", requiresWallet: false, hideWhenConnected: true },
  { label: "Contact", href: "/contact", requiresWallet: false, hideWhenConnected: true },
];
