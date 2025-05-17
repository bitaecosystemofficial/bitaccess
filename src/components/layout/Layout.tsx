
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen bg-bitaccess-black">
      <Header />
      <main className={`flex-grow pt-16 ${isMobile ? 'pb-16' : ''}`}>
        {children}
      </main>
      {isMobile && <MobileBottomNav />}
      <Footer />
    </div>
  );
};

export default Layout;
