
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const Docs = () => {
  const guides = [
    {
      title: "Getting Started with BitAccess",
      description: "Learn the basics of the BitAccess ecosystem and how to get started.",
      icon: <FileText size={24} />
    },
    {
      title: "How to Participate in Airdrops",
      description: "Step-by-step guide to participating in BitAccess token airdrops.",
      icon: <FileText size={24} />
    },
    {
      title: "Staking Guide for Beginners",
      description: "Everything you need to know about staking BIT tokens.",
      icon: <FileText size={24} />
    },
    {
      title: "Using the BIT Token Swap",
      description: "How to exchange BIT tokens for other cryptocurrencies.",
      icon: <FileText size={24} />
    },
    {
      title: "Setting Up a Merchant Account",
      description: "Guide for businesses looking to accept BIT token payments.",
      icon: <FileText size={24} />
    },
    {
      title: "BIT Token Security Best Practices",
      description: "How to secure your BIT tokens and wallet.",
      icon: <FileText size={24} />
    }
  ];

  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="Documentation"
            subtitle="Comprehensive guides, tutorials and technical documentation for the BitAccess ecosystem"
            centered
          />
          
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="guides" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="guides" className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-bitaccess-black">
                  Guides
                </TabsTrigger>
                <TabsTrigger value="whitepaper" className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-bitaccess-black">
                  Whitepaper
                </TabsTrigger>
                <TabsTrigger value="api" className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-bitaccess-black">
                  API Reference
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="guides">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {guides.map((guide, index) => (
                    <Card key={index} className="bg-bitaccess-black-light border border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all">
                      <CardHeader className="flex flex-row items-start gap-4 pb-2">
                        <div className="bg-bitaccess-gold/10 p-2 rounded-full mt-1">
                          <div className="text-bitaccess-gold">
                            {guide.icon}
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{guide.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 text-sm mb-4">{guide.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-bitaccess-gold/30 text-bitaccess-gold hover:bg-bitaccess-gold/10"
                        >
                          Read Guide <ArrowRight size={14} className="ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="whitepaper">
                <div className="bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-bitaccess-gold/10 p-3 rounded-full">
                      <FileText size={32} className="text-bitaccess-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">BitAccess Whitepaper</h3>
                      <p className="text-gray-400">Version 1.6 | Last updated: May 14, 2025</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 mb-8">
                    <p className="text-gray-300">
                      The BitAccess Whitepaper outlines the vision, technology, tokenomics, and roadmap for the BitAccess ecosystem. It provides a comprehensive overview of how BitAccess is revolutionizing blockchain education and merchant adoption.
                    </p>
                    
                    <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
                      <h4 className="font-medium text-white mb-3">Table of Contents:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-gray-400">
                        <li>Introduction</li>
                        <li>Mission, Vision, and Core Values</li>
                        <li>The BitAccess Ecosystem</li>
                        <li>BIT Token</li>
                        <li>Roadmap and Milestones</li>
                        <li>Technology Infrastructure</li>
                        <li>Market Strategy and Growth</li>
                        <li>Token Distribution</li>
                        <li>Legal & Compliance</li>
                        <li>Team & Advisors</li>
                        <li>Final Statements</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                      Download PDF
                    </Button>
                    <RouterLink to="/whitepaper">
                      <Button variant="outline" className="border-bitaccess-gold text-bitaccess-gold hover:bg-bitaccess-gold/10 w-full sm:w-auto">
                        View Complete Whitepaper
                      </Button>
                    </RouterLink>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="api">
                <div className="bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
                  <h3 className="text-xl font-bold text-white mb-6">API Reference</h3>
                  
                  <div className="bg-bitaccess-black p-6 rounded-lg border border-bitaccess-gold/10 mb-8">
                    <p className="text-gray-300 mb-6">
                      The BitAccess API allows developers to integrate with our ecosystem and build applications that leverage our services. This documentation provides a comprehensive guide to all available endpoints.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-bitaccess-gold mb-2">Authentication</h4>
                      <pre className="bg-bitaccess-black-dark p-4 rounded text-gray-300 overflow-x-auto">
                        <code>{`// Example request with API key
const response = await fetch('https://api.bitaccess.com/v1/market/price', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});`}</code>
                      </pre>
                    </div>
                    
                    <p className="text-gray-400 text-center py-4">
                      Please connect your wallet and subscribe to access the full API documentation.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                      Connect Wallet to Access
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Docs;
