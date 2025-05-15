
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, FileText, Link } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const WhitepaperDetails = () => {
  const sections = [
    {
      title: "The History",
      content: "The foundation of how Bit Access was created, tracing our origins and development journey."
    },
    {
      title: "1.0 Introduction",
      subsections: [
        { title: "1.1 Overview of BIT Access", content: "Comprehensive introduction to the BIT Access ecosystem and its core components." },
        { title: "1.2 Industry Challenges and Opportunities", content: "Analysis of the current blockchain industry landscape and the opportunities BIT Access addresses." },
        { title: "1.3 The BIT Access Solution", content: "How BIT Access offers innovative solutions to existing market challenges." }
      ]
    },
    {
      title: "2.0 Mission, Vision, and Values",
      subsections: [
        { title: "2.1 Mission Statement", content: "Our core mission and purpose in the blockchain ecosystem." },
        { title: "2.2 Vision Statement", content: "The long-term vision and aspirations of the BIT Access project." },
        { title: "2.3 Core Values", content: "The fundamental principles and values that guide our operations and development." }
      ]
    },
    {
      title: "3.0 The BIT Access Ecosystem",
      subsections: [
        { title: "3.1 Decentralized E-Commerce Integration", content: "How BIT Access revolutionizes e-commerce through blockchain technology." },
        { title: "3.2 Education and Professional Development", content: "Our approach to blockchain education and professional skill development." },
        { title: "3.3 Tokenized Incentive and Rewards System", content: "The innovative reward mechanisms built into the BIT Access ecosystem." },
        { title: "3.4 Cross-Industry Innovation", content: "How BIT Access bridges multiple industries through blockchain technology." }
      ]
    },
    {
      title: "4.0 The BIT Token",
      subsections: [
        { title: "4.1 Overview of BIT Token", content: "Technical specifications and features of the BIT token." },
        { title: "4.2 Token Use Cases and Utility", content: "The practical applications and utility of BIT tokens within the ecosystem." }
      ]
    },
    {
      title: "5.0 Roadmap and Milestones",
      subsections: [
        { title: "5.1 Phases of Ecosystem Development", content: "Detailed timeline of BIT Access development phases and milestones." },
        { title: "5.2 Key Partnerships and Strategic Alliances", content: "Overview of critical partnerships advancing the BIT Access ecosystem." }
      ]
    },
    {
      title: "6.0 Technology Infrastructure",
      subsections: [
        { title: "6.1 Blockchain Platform and Security", content: "Technical details of the underlying blockchain technology and security measures." },
        { title: "6.2 Smart Contracts and Decentralized Applications (DApps)", content: "Overview of smart contract implementation and DApp architecture." },
        { title: "6.3 Scalability and Performance", content: "How BIT Access addresses scalability challenges for widespread adoption." }
      ]
    },
    {
      title: "7.0 Market Strategy and Growth",
      subsections: [
        { title: "7.1 Marketing and User Acquisition", content: "Strategies for market penetration and user acquisition." },
        { title: "7.2 Global Expansion and Strategic Partnerships", content: "Plans for international expansion and key strategic partnerships." },
        { title: "7.3 Community Engagement and Incentives", content: "Approach to building and maintaining an active community." }
      ]
    },
    {
      title: "8.0 Token Distribution and Fund Allocation",
      subsections: [
        { title: "8.1 Token Distribution Overview", content: "Breakdown of token distribution across various stakeholders and purposes." },
        { title: "8.2 Fund Allocation for Ecosystem Development", content: "How raised funds are allocated for different aspects of development." },
        { title: "8.3 Governance and Community Participation", content: "Mechanisms for community governance and participation in decision-making." }
      ]
    },
    {
      title: "9.0 Legal Considerations and Regulatory Compliance",
      subsections: [
        { title: "9.1 Legal Framework", content: "Overview of the legal framework governing BIT Access operations." },
        { title: "9.2 Regulatory Compliance", content: "Strategies for ensuring compliance with relevant regulations across jurisdictions." }
      ]
    },
    {
      title: "10.0 Team and Advisors",
      subsections: [
        { title: "10.1 Executive Team", content: "Profiles of the core team leading BIT Access development." },
        { title: "10.2 Advisory Board", content: "Overview of expert advisors guiding strategic decisions." },
        { title: "10.3 Strategic Partners", content: "Key strategic partnerships advancing the BIT Access ecosystem." }
      ]
    },
    {
      title: "11.0 Final Statements",
      subsections: [
        { title: "11.1 Summary of Benefits", content: "Recap of the key advantages offered by the BIT Access ecosystem." },
        { title: "11.2 Call to Action", content: "Invitation for users, investors, and partners to join the BIT Access journey." }
      ]
    }
  ];

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-bitaccess-gold" />
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((section, index) => (
                    <a 
                      key={index}
                      href={`#section-${index}`}
                      className="block py-1.5 text-sm text-gray-300 hover:text-bitaccess-gold transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="bg-bitaccess-black-light p-6 md:p-8 rounded-xl border border-bitaccess-gold/20">
                {sections.map((section, index) => (
                  <div key={index} id={`section-${index}`} className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                    {section.content && <p className="text-gray-300 mb-4">{section.content}</p>}
                    
                    {section.subsections && (
                      <div className="space-y-6 mt-4 pl-4 border-l-2 border-bitaccess-gold/20">
                        {section.subsections.map((subsection, subIndex) => (
                          <div key={subIndex}>
                            <h3 className="text-xl font-semibold text-white mb-2">{subsection.title}</h3>
                            <p className="text-gray-300">{subsection.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhitepaperDetails;
