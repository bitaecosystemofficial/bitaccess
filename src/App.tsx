import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { MembershipProvider } from "@/contexts/MembershipContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Airdrop from "./pages/Airdrop";
import Presale from "./pages/Presale";
import Staking from "./pages/Staking";
import Swap from "./pages/Swap";
import Settings from "./pages/Settings";
import Docs from "./pages/Docs";
import GuideDetails from "./pages/GuideDetails";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Education from "./pages/Education";
import Community from "./pages/Community";
import Governance from "./pages/Governance";
import CourseDetails from "./pages/CourseDetails";
import DexAnalyticsPage from "./pages/DexAnalytics";
import WhitepaperDetails from "./pages/WhitepaperDetails";
import VideoPortal from "./pages/VideoPortal";
import VideoDetails from "./pages/VideoDetails";
import Marketplace from "./pages/Marketplace";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import MerchantDashboard from "./pages/MerchantDashboard";
import MerchantStore from "./pages/MerchantStore";
import MerchantListing from "./pages/MerchantListing";
import BecomeAMerchant from "./pages/BecomeAMerchant";
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

// Merchant route guard for merchant-only content
const MerchantRoute = ({ element }: { element: React.ReactNode }) => {
  const { isConnected } = useWallet();
  const { membershipData, isLoading } = useMembership();

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!isConnected || !membershipData?.isActive || membershipData?.type !== "Merchant") {
    return <Navigate to="/become-merchant" />;
  }

  return <>{element}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/airdrop" element={<Airdrop />} />
      <Route path="/presale" element={<Presale />} />
      <Route path="/staking" element={<Staking />} />
      <Route path="/swap" element={<Swap />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/guides/:guideId" element={<GuideDetails />} />
      <Route path="/whitepaper" element={<WhitepaperDetails />} />
      <Route path="/education" element={<Education />} />
      <Route path="/education/:courseId" element={<CourseDetails />} />
      <Route path="/videos" element={<VideoPortal />} />
      <Route path="/video/:videoId" element={<VideoDetails />} />
      <Route path="/community" element={<Community />} />
      <Route path="/governance" element={<Governance />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dex-analytics" element={<DexAnalyticsPage />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace/cart" element={<CartPage />} />
      <Route path="/marketplace/checkout" element={<CheckoutPage />} />
      <Route path="/marketplace/orders" element={<OrdersPage />} />
      <Route path="/become-merchant" element={<BecomeAMerchant />} />
      <Route path="/membership-card" element={<MembershipCard />} />
      <Route path="/marketplace/merchant/dashboard" element={<MerchantRoute element={<MerchantDashboard />} />} />
      <Route path="/marketplace/merchant/:merchantId" element={<MerchantStore />} />
      <Route path="/marketplace/merchants" element={<MerchantListing />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <MembershipProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </CartProvider>
        </MembershipProvider>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
