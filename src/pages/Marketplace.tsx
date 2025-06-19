
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { useMembership } from '@/contexts/MembershipContext';
import { Store } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/marketplace/ProductCard';
import { products, categories, categoryIcons, featuredStores } from '@/data/marketplaceData';
import { Search, Filter, ShoppingBag, Tag, TrendingUp } from 'lucide-react';

const Marketplace = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const { membershipData } = useMembership();
  
  const isMerchant = isConnected && membershipData?.isActive && membershipData.type === 'Merchant';

  // Function to navigate to the merchant page
  const goToBecomeMerchant = () => {
    navigate('/become-merchant');
  };
  
  // Function to navigate to merchant dashboard
  const goToMerchantDashboard = () => {
    navigate('/marketplace/merchant/dashboard');
  };

  return (
    <Layout>
      <div className="container px-4 py-12 mt-16">
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gold-gradient text-transparent bg-clip-text">
              Bit Access Marketplace
            </h1>
            <p className="text-gray-400">
              Discover products and services from our community members
            </p>
          </div>
          
          {isConnected && (
            <div className="mt-4 md:mt-0">
              {isMerchant ? (
                <Button 
                  className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black flex items-center"
                  onClick={goToMerchantDashboard}
                >
                  <Store className="mr-2 h-4 w-4" />
                  Merchant Dashboard
                </Button>
              ) : (
                <Button 
                  className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black flex items-center"
                  onClick={goToBecomeMerchant}
                >
                  <Store className="mr-2 h-4 w-4" />
                  Become a Merchant
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              placeholder="Search products, categories, or merchants..." 
              className="pl-10 bg-bitaccess-black-light border-gray-700"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Featured Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="bg-bitaccess-black-light border-gray-700 hover:border-bitaccess-gold transition-colors cursor-pointer"
                onClick={() => navigate(`/marketplace?category=${category.id}`)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-bitaccess-black flex items-center justify-center mb-3">
                    {categoryIcons[category.id]}
                  </div>
                  <h3 className="font-medium text-sm">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="trending" className="mb-12">
          <TabsList>
            <TabsTrigger value="trending" className="flex gap-2">
              <TrendingUp className="h-4 w-4" /> Trending
            </TabsTrigger>
            <TabsTrigger value="new" className="flex gap-2">
              <Tag className="h-4 w-4" /> New Arrivals
            </TabsTrigger>
            <TabsTrigger value="deals" className="flex gap-2">
              <ShoppingBag className="h-4 w-4" /> Best Deals
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {products.slice(0, 6).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {products.slice(6, 12).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="deals" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {products.filter(p => p.discountPercentage > 0).slice(0, 6).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Merchants */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Featured Merchants</h2>
            <Button 
              variant="link" 
              className="text-bitaccess-gold"
              onClick={() => navigate('/marketplace/merchants')}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredStores.map((store, index) => (
              <Card 
                key={index} 
                className="bg-bitaccess-black-light border-gray-700 hover:border-bitaccess-gold transition-colors cursor-pointer overflow-hidden"
                onClick={() => navigate(`/marketplace/merchant/${store.id}`)}
              >
                <div 
                  className="h-32 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${store.coverImage})` }}
                />
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-bitaccess-gold flex items-center justify-center text-black font-bold mr-3">
                      {store.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{store.name}</h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="flex items-center">
                          ⭐ {store.rating}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{store.productCount} products</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-bitaccess-black text-gray-300 hover:bg-bitaccess-black">{store.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Become a Merchant CTA */}
        {isConnected && !isMerchant && (
          <Card className="border-bitaccess-gold/30 bg-gradient-to-r from-bitaccess-black to-bitaccess-black-light mb-12">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-bitaccess-gold mb-2">Become a Merchant</h3>
                <p className="text-gray-300 max-w-lg">
                  Start selling your products or services on the BitAccess Marketplace. 
                  Reach crypto enthusiasts and accept cryptocurrency payments.
                </p>
              </div>
              <Button 
                className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                onClick={goToBecomeMerchant}
              >
                <Store className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Marketplace;
