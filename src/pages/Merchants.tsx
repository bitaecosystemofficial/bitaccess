
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Search, MapPin, Store, Phone } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useMerchantData, subscribeMerchant } from "@/utils/contractUtils";
import { toast } from "@/hooks/use-toast";

const Merchants = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const merchantData = useMerchantData();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubscribe = async (planName: string) => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    setIsLoading(true);
    setSelectedPlan(planName);
    
    try {
      // Find the plan duration in months (for this demo we'll use 1 for simplicity)
      const duration = 1;
      
      const result = await subscribeMerchant(planName, duration, address!);
      if (result.success) {
        toast({
          title: "Subscription Successful",
          description: `You have successfully subscribed to the ${planName} plan!`
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: result.error || "Transaction failed. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };
  
  // Mock merchant list data
  const merchants = isConnected ? [
    {
      id: 1,
      name: "Crypto Cafe",
      category: "Food & Dining",
      location: "New York, USA",
      description: "Coffee shop accepting various cryptocurrencies",
      image: "https://via.placeholder.com/80"
    },
    {
      id: 2,
      name: "Digital Threads",
      category: "Retail",
      location: "London, UK",
      description: "Fashion retailer specializing in tech-inspired clothing",
      image: "https://via.placeholder.com/80"
    },
    {
      id: 3,
      name: "BlockTravel",
      category: "Travel",
      location: "Singapore",
      description: "Book flights and hotels with cryptocurrency",
      image: "https://via.placeholder.com/80"
    },
    {
      id: 4,
      name: "Web3 Services",
      category: "Services",
      location: "Berlin, Germany",
      description: "Professional blockchain and web3 development services",
      image: "https://via.placeholder.com/80"
    }
  ] : [];
  
  const filteredMerchants = merchants.filter(merchant => {
    const matchesCategory = selectedCategory === "All Categories" || merchant.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

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
              <div className="bg-bitaccess-black-light rounded-xl p-8 border border-bitaccess-gold/20">
                <div className="flex flex-col md:flex-row items-center mb-8">
                  <div className="bg-bitaccess-gold/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                    <Store size={40} className="text-bitaccess-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Become a BIT Merchant</h3>
                    <p className="text-gray-400">
                      Join our network of {merchantData.totalMerchants.toLocaleString()} merchants accepting BIT tokens worldwide
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {merchantData.plans.map((plan, index) => (
                    <div 
                      key={index} 
                      className={`border ${plan.highlighted ? 'border-bitaccess-gold' : 'border-gray-700'} bg-bitaccess-black rounded-xl p-6`}
                    >
                      <div className="mb-4">
                        <h4 className={`text-xl ${plan.highlighted ? 'text-bitaccess-gold' : 'text-white'}`}>
                          {plan.name}
                        </h4>
                        <p className="text-gray-400 text-sm">{plan.description}</p>
                      </div>
                      <div className="mb-6">
                        <span className={`text-3xl font-bold ${plan.highlighted ? 'text-bitaccess-gold' : 'text-white'}`}>
                          ${plan.price}
                        </span>
                        <span className="text-gray-400 ml-1">/month</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <svg 
                              className={`w-5 h-5 mt-0.5 ${plan.highlighted ? 'text-bitaccess-gold' : 'text-gray-400'}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        onClick={() => handleSubscribe(plan.name)}
                        disabled={isLoading && selectedPlan === plan.name} 
                        className={`w-full ${plan.highlighted 
                          ? 'bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black' 
                          : 'bg-transparent border border-gray-600 hover:border-bitaccess-gold text-gray-300 hover:text-bitaccess-gold'}`}
                      >
                        {isLoading && selectedPlan === plan.name ? 'Processing...' : 'Subscribe Now'}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-bitaccess-black rounded-lg border border-bitaccess-gold/10 text-center">
                  <p className="text-gray-300">
                    Already a merchant? <span className="text-bitaccess-gold">Log in to your merchant dashboard</span>
                  </p>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-400">
                  <p>Running on Binance Smart Chain (BSC) | View contract on <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer" className="text-bitaccess-gold hover:underline">BscScan</a></p>
                </div>
              </div>
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 pl-10 bg-bitaccess-black border border-bitaccess-gold/20 rounded text-white focus:border-bitaccess-gold focus:outline-none"
                    />
                    <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedCategory("All Categories")}
                      className={`${selectedCategory === "All Categories" 
                        ? "bg-transparent border border-bitaccess-gold text-bitaccess-gold" 
                        : "bg-transparent border border-gray-700 text-gray-400 hover:border-bitaccess-gold hover:text-bitaccess-gold"}`}
                    >
                      All Categories
                    </Button>
                    
                    {merchantData.categories.map((category, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedCategory(category.name)}
                        className={`${selectedCategory === category.name 
                          ? "bg-transparent border border-bitaccess-gold text-bitaccess-gold" 
                          : "bg-transparent border border-gray-700 text-gray-400 hover:border-bitaccess-gold hover:text-bitaccess-gold"}`}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {isConnected ? (
                  filteredMerchants.length > 0 ? (
                    <div className="space-y-4">
                      {filteredMerchants.map(merchant => (
                        <div key={merchant.id} className="bg-bitaccess-black p-4 rounded-lg border border-gray-700 hover:border-bitaccess-gold/40 transition-all">
                          <div className="flex items-center">
                            <img src={merchant.image} alt={merchant.name} className="w-16 h-16 rounded-md mr-4 object-cover" />
                            <div className="flex-1">
                              <h4 className="font-medium text-white">{merchant.name}</h4>
                              <p className="text-sm text-gray-400">{merchant.description}</p>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <MapPin size={12} className="mr-1" />
                                <span>{merchant.location}</span>
                                <span className="mx-2">•</span>
                                <span className="text-bitaccess-gold">{merchant.category}</span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="border-bitaccess-gold/30 text-bitaccess-gold">
                              <Phone size={14} className="mr-1" /> Contact
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-bitaccess-black p-6 rounded-lg border border-gray-700 text-center">
                      <p className="text-gray-400">No merchants found matching your search criteria.</p>
                    </div>
                  )
                ) : (
                  <div className="space-y-6">
                    <p className="text-center text-gray-400 py-8">Connect your wallet to view the merchant directory.</p>
                    <div className="text-center">
                      <Button 
                        onClick={connectWallet}
                        className="bg-bitaccess-gold hover:bg-bitaccess-gold-dark text-bitaccess-black font-medium"
                      >
                        Connect Wallet to View Merchants
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 text-center text-sm text-gray-400">
                  <p>Running on Binance Smart Chain (BSC) | View contract on <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer" className="text-bitaccess-gold hover:underline">BscScan</a></p>
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
