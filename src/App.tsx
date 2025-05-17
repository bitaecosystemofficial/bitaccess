
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/contexts/WalletContext";
import { MembershipProvider } from "@/contexts/MembershipContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Airdrop from "./pages/Airdrop";
import Presale from "./pages/Presale";
import Staking from "./pages/Staking";
import Swap from "./pages/Swap";
import Docs from "./pages/Docs";
import GuideDetails from "./pages/GuideDetails";
import Contact from "./pages/Contact";
import SpinWheel from "./pages/SpinWheel";
import NotFound from "./pages/NotFound";
import Education from "./pages/Education";
import Community from "./pages/Community";
import Governance from "./pages/Governance";
import CourseDetails from "./pages/CourseDetails";
import DexAnalyticsPage from "./pages/DexAnalytics";
import WhitepaperDetails from "./pages/WhitepaperDetails";
import Dashboard from "./pages/Dashboard";
import VideoPortal from "./pages/VideoPortal";
import VideoDetails from "./pages/VideoDetails";
import Marketplace from "./pages/Marketplace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <MembershipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/airdrop" element={<Airdrop />} />
              <Route path="/presale" element={<Presale />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/spin-wheel" element={<SpinWheel />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MembershipProvider>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
