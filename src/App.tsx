
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/contexts/WalletContext";
import Index from "./pages/Index";
import Airdrop from "./pages/Airdrop";
import Presale from "./pages/Presale";
import Staking from "./pages/Staking";
import Swap from "./pages/Swap";
import Docs from "./pages/Docs";
import Contact from "./pages/Contact";
import SpinWheel from "./pages/SpinWheel";
import NotFound from "./pages/NotFound";
import Education from "./pages/Education";
import Community from "./pages/Community";
import CourseDetails from "./pages/CourseDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/airdrop" element={<Airdrop />} />
            <Route path="/presale" element={<Presale />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/spin-wheel" element={<SpinWheel />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/education" element={<Education />} />
            <Route path="/education/:courseId" element={<CourseDetails />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
