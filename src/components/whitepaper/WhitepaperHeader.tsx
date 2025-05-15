
import { ChevronLeft, Download, Link } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WhitepaperHeader = () => {
  return (
    <div className="mb-8">
      <RouterLink to="/docs" className="inline-flex items-center text-bitaccess-gold hover:text-bitaccess-gold-light mb-6">
        <ChevronLeft size={16} className="mr-1" />
        Back to Documentation
      </RouterLink>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">BIT Access Whitepaper</h1>
          <p className="text-gray-400">Version 1.6 | Last updated: May 14, 2025</p>
        </div>
        
        <div className="flex gap-3">
          <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium flex items-center gap-2">
            <Download size={16} />
            Download PDF
          </Button>
          <Button variant="outline" className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 flex items-center gap-2">
            <Link size={16} />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhitepaperHeader;
