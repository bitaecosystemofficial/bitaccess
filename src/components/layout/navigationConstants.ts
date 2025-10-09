import { NavItem } from "./NavigationItems";

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "About", href: "/about", requiresWallet: false, hideWhenConnected: true },
  { label: "Ecosystem", href: "/ecosystem", requiresWallet: false, hideWhenConnected: true },
  { label: "Tokenomics", href: "/tokenomics", requiresWallet: false, hideWhenConnected: true },
  { label: "Audit", href: "/audit", requiresWallet: false, hideWhenConnected: true },
  { label: "Chart", href: "/chart", requiresWallet: false, hideWhenConnected: true },
  { label: "Roadmap", href: "/roadmap", requiresWallet: false, hideWhenConnected: true },
  { label: "Airdrop", href: "/airdrop", requiresWallet: true, hideWhenConnected: false },
  { label: "Presale", href: "/presale", requiresWallet: true, hideWhenConnected: false },
  { label: "Staking", href: "/staking", requiresWallet: true, hideWhenConnected: false },
  { label: "Swap", href: "/swap", requiresWallet: true, hideWhenConnected: false },
  { label: "Chart", href: "/chart", requiresWallet: true, hideWhenConnected: false },
  { label: "Membership Card", href: "/membership-card", requiresWallet: true, hideWhenConnected: false },
  { label: "Docs", href: "/docs", requiresWallet: false, hideWhenConnected: true },
  { label: "FAQ", href: "/faq", requiresWallet: false, hideWhenConnected: true },
  { label: "Contact", href: "/contact", requiresWallet: false, hideWhenConnected: true },
];
