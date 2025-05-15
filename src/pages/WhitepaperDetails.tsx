
import { useMemo } from "react";
import Layout from "@/components/layout/Layout";
import WhitepaperHeader from "@/components/whitepaper/WhitepaperHeader";
import WhitepaperSidebar from "@/components/whitepaper/WhitepaperSidebar";
import WhitepaperSection from "@/components/whitepaper/WhitepaperSection";
import WhitepaperContact from "@/components/whitepaper/WhitepaperContact";
import { whitepaperSections } from "@/data/whitepaperSections";

const WhitepaperDetails = () => {
  // Create a simplified list for the sidebar navigation
  const sidebarSections = useMemo(() => {
    return whitepaperSections.map(section => ({
      title: section.title,
      id: section.id
    }));
  }, []);

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <WhitepaperHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Sidebar */}
            <div className="lg:col-span-3">
              <WhitepaperSidebar sections={sidebarSections} />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="bg-bitaccess-black-light p-6 md:p-8 rounded-xl border border-bitaccess-gold/20">
                {whitepaperSections.map((section) => (
                  <WhitepaperSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    content={section.content}
                    subsections={section.subsections}
                  />
                ))}
                
                <WhitepaperContact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhitepaperDetails;
