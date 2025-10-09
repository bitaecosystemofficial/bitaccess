import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { MembershipProvider } from "@/contexts/MembershipContext";
import { Web3ModalProvider } from "@/contexts/Web3ModalProvider";
import PwaInstallPrompt from "@/components/pwa/PwaInstallPrompt";
import Index from "./pages/Index";
import About from "./pages/About";
import Ecosystem from "./pages/Ecosystem";
import Roadmap from "./pages/Roadmap";
import FAQ from "./pages/FAQ";
import Airdrop from "./pages/Airdrop";
import Presale from "./pages/Presale";
import Staking from "./pages/Staking";
import Swap from "./pages/Swap";
import Settings from "./pages/Settings";
import Docs from "./pages/Docs";
import GuideDetails from "./pages/GuideDetails";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import WhitepaperDetails from "./pages/WhitepaperDetails";
import MembershipCard from "./pages/MembershipCard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

// Route guard for subscription-required content
const SubscriptionRoute = ({ element }: { element: React.ReactNode }) => {
  const { isConnected } = useWallet();
  const { membershipData, isLoading } = useMembership();

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!isConnected || !membershipData?.isActive) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
};


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/ecosystem" element={<Ecosystem />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/airdrop" element={<Airdrop />} />
      <Route path="/presale" element={<Presale />} />
      <Route path="/staking" element={<Staking />} />
      <Route path="/swap" element={<Swap />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/guides/:guideId" element={<GuideDetails />} />
      <Route path="/whitepaper" element={<WhitepaperDetails />} />
      <Route path="/community" element={<Community />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/membership-card" element={<MembershipCard />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Web3ModalProvider>
      <TooltipProvider>
        <WalletProvider>
          <MembershipProvider>
            <Toaster />
            <Sonner />
            <PwaInstallPrompt />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </MembershipProvider>
        </WalletProvider>
      </TooltipProvider>
    </Web3ModalProvider>
  </QueryClientProvider>
);

export default App;
