
import React from "react";
import { NavLink } from "react-router-dom";
import { useMembership } from "@/contexts/MembershipContext";

export interface NavItem {
  label: string;
  href: string;
  requiresWallet: boolean;
  hideWhenConnected: boolean;
  requiresSubscription?: boolean;
}

interface NavigationItemsProps {
  items: NavItem[];
  isConnected: boolean;
  className?: string;
}

const NavigationItems = ({ items, isConnected, className = "" }: NavigationItemsProps) => {
  const { membershipData } = useMembership();

  // Filter navigation items based on wallet connection and subscription
  const visibleNavItems = items.filter(item => {
    // Hide items that require wallet if not connected
    if (item.requiresWallet && !isConnected) return false;
    
    // Hide items marked to hide when connected
    if (isConnected && item.hideWhenConnected) return false;
    
    // Hide items that require subscription if not subscribed
    if (item.requiresSubscription && (!membershipData?.isActive)) return false;
    
    return true;
  });

  return (
    <nav className={className}>
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
  );
};

export default NavigationItems;
