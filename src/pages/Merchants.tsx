
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart } from "lucide-react";
import MerchantSection from "@/components/home/MerchantSection";

const Merchants = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24 bg-hero-pattern">
        <div className="container px-4 md:px-8">
          <SectionHeading
            title="BitAccess Merchant Ecosystem"
            subtitle="Join our growing network of merchants and service providers accepting BIT tokens"
            centered
          />
          
          <Tabs defaultValue="subscriptions" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="subscriptions" className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-bitaccess-black">
                Merchant Subscriptions
              </TabsTrigger>
              <TabsTrigger value="directory" className="data-[state=active]:bg-bitaccess-gold data-[state=active]:text-bitaccess-black">
                Merchant Directory
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="subscriptions">
              <MerchantSection />
            </TabsContent>
            
            <TabsContent value="directory">
              <div className="bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
                <div className="flex flex-col md:flex-row items-center mb-8">
                  <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                    <ShoppingCart size={40} className="text-bitaccess-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Merchant Directory</h3>
                    <p className="text-gray-400">
                      Find businesses and services that accept BIT tokens for payment
                    </p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search merchants by name, category, or location"
                      className="w-full p-3 pl-10 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none"
                    />
                    <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button variant="outline" size="sm" className="bg-transparent border border-bitaccess-gold/30 text-bitaccess-gold">
                      All Categories
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent border border-gray-700 text-gray-400 hover:border-bitaccess-gold hover:text-bitaccess-gold">
                      Retail
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent border border-gray-700 text-gray-400 hover:border-bitaccess-gold hover:text-bitaccess-gold">
                      Services
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent border border-gray-700 text-gray-400 hover:border-bitaccess-gold hover:text-bitaccess-gold">
                      Food & Dining
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent border border-gray-700 text-gray-400 hover:border-bitaccess-gold hover:text-bitaccess-gold">
                      Travel
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-center text-gray-400 py-8">No merchants found. Please connect your wallet to view the merchant directory.</p>
                </div>
                
                <div className="text-center mt-8">
                  <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium">
                    Connect Wallet to View Merchants
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Merchants;
