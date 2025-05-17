
import React from "react";
import { NavLink } from "react-router-dom";
import { useMembership } from "@/contexts/MembershipContext";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavItem } from "./NavigationItems";

interface MobileMenuProps {
  navigationItems: NavItem[];
  isConnected: boolean;
}

const MobileMenu = ({ navigationItems, isConnected }: MobileMenuProps) => {
  const { membershipData } = useMembership();

  // Non-wallet required items for basic navigation - also filter out items that should be hidden when connected
  const baseNavItems = navigationItems.filter(item => {
    // Basic items that don't require wallet
    if (!item.requiresWallet && !(isConnected && item.hideWhenConnected)) {
      // Check subscription requirement
      if (item.requiresSubscription) {
        return membershipData?.isActive;
      }
      return true;
    }
    return false;
  });

  return (
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
          {baseNavItems.map((item) => (
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
          
          {isConnected && (
            <>
              <div className="border-t border-bitaccess-gold/10 mt-2 pt-2">
                <h3 className="px-4 text-sm font-medium text-bitaccess-gold mb-2">Wallet Features</h3>
              </div>
              {navigationItems.filter(item => 
                item.requiresWallet && !item.hideWhenConnected && 
                (!item.requiresSubscription || membershipData?.isActive)
              ).map((item) => (
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
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
