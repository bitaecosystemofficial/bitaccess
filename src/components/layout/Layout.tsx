
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import WelcomeLandingModal from "@/components/welcome/WelcomeLandingModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Show welcome modal on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBitAccess');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 1000); // Show after 1 second
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleWelcomeClose = () => {
    setShowWelcomeModal(false);
    localStorage.setItem('hasVisitedBitAccess', 'true');
  };

  const handleGetStarted = () => {
    // Scroll to features or redirect to presale
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    localStorage.setItem('hasVisitedBitAccess', 'true');
  };

  return (
    <div className="min-h-screen bg-bitaccess-black text-white flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <Toaster />
      
      <WelcomeLandingModal
        isOpen={showWelcomeModal}
        onClose={handleWelcomeClose}
        onGetStarted={handleGetStarted}
      />
    </div>
  );
};

export default Layout;
