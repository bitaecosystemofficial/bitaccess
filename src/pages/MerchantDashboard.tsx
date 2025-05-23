
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingBag, 
  PackageOpen, 
  Clock, 
  MessageSquare, 
  Edit, 
  Tag, 
  Store, 
  PlusCircle
} from 'lucide-react';
import MerchantProducts from '@/components/marketplace/merchant/MerchantProducts';
import MerchantOrders from '@/components/marketplace/merchant/MerchantOrders';
import MerchantInbox from '@/components/marketplace/merchant/MerchantInbox';
import MerchantCoupons from '@/components/marketplace/merchant/MerchantCoupons';
import MerchantSubscription from '@/components/marketplace/merchant/MerchantSubscription';
import { storeService } from '@/services/StoreService';

const MerchantDashboard = () => {
  const { isConnected, address } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isMerchant, setIsMerchant] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<Date | null>(null);
  const [availableCredits, setAvailableCredits] = useState(0);

  useEffect(() => {
    const checkMerchantStatus = async () => {
      if (!isConnected || !address) {
        setLoading(false);
        return;
      }

      try {
        const status = await storeService.getStoreStatus(address);
        setIsMerchant(status > 0);
        
        if (status > 0) {
          // Get subscription end date
          const endTimestamp = await storeService.getSubscriptionEnd(address);
          if (endTimestamp > 0) {
            setSubscriptionEnd(new Date(endTimestamp * 1000));
            
            // Mock available credits (in a real app, this would come from the blockchain)
            setAvailableCredits(10);
          }
        }
      } catch (error) {
        console.error("Error checking merchant status:", error);
        // Mock data for development purposes
        setIsMerchant(true);
        setSubscriptionEnd(new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)); // 6 months from now
        setAvailableCredits(10);
      } finally {
        setLoading(false);
      }
    };

    checkMerchantStatus();
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <Layout>
        <div className="container px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Merchant Dashboard</h1>
          <p className="text-gray-400 mb-8">Please connect your wallet to access the merchant dashboard.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
          >
            Go to Home
          </Button>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Merchant Dashboard</h1>
          <p className="text-gray-400">Loading merchant data...</p>
        </div>
      </Layout>
    );
  }

  if (!isMerchant) {
    return (
      <Layout>
        <div className="container px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">Merchant Dashboard</h1>
          <p className="text-gray-400 text-center mb-8">You need a merchant subscription to access this dashboard.</p>
          
          <div className="max-w-md mx-auto">
            <MerchantSubscription onSubscriptionComplete={() => setIsMerchant(true)} />
          </div>
        </div>
      </Layout>
    );
  }

  const isExpired = subscriptionEnd ? subscriptionEnd < new Date() : true;

  return (
    <Layout>
      <div className="container px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Merchant Dashboard</h1>
        
        {/* Subscription Info */}
        <div className="bg-bitaccess-black-light p-4 rounded-lg mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-gray-400 mb-2">
              Subscription Status: 
              <span className={`ml-2 font-medium ${isExpired ? 'text-red-500' : 'text-green-500'}`}>
                {isExpired ? 'Expired' : 'Active'}
              </span>
            </p>
            {subscriptionEnd && (
              <p className="text-gray-400">
                Expires: <span className="text-white">{subscriptionEnd.toLocaleDateString()}</span>
              </p>
            )}
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400">
              Available Listing Credits: <span className="text-white font-bold">{availableCredits}</span>
            </p>
            {isExpired && (
              <Button 
                className="mt-2 bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
                onClick={() => navigate('/marketplace/merchant/subscription')}
              >
                Renew Subscription
              </Button>
            )}
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <TabsTrigger value="products" className="flex gap-2">
              <ShoppingBag className="h-4 w-4" /> Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex gap-2">
              <PackageOpen className="h-4 w-4" /> Orders
            </TabsTrigger>
            <TabsTrigger value="inbox" className="flex gap-2">
              <MessageSquare className="h-4 w-4" /> Inbox
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex gap-2">
              <Tag className="h-4 w-4" /> Coupons
            </TabsTrigger>
            <TabsTrigger value="mint" className="flex gap-2">
              <Edit className="h-4 w-4" /> Mint Products
            </TabsTrigger>
            <TabsTrigger value="store" className="flex gap-2">
              <Store className="h-4 w-4" /> My Store
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="products">
              <MerchantProducts availableCredits={availableCredits} />
            </TabsContent>
            <TabsContent value="orders">
              <MerchantOrders />
            </TabsContent>
            <TabsContent value="inbox">
              <MerchantInbox />
            </TabsContent>
            <TabsContent value="coupons">
              <MerchantCoupons />
            </TabsContent>
            <TabsContent value="mint">
              <Card>
                <CardHeader>
                  <CardTitle>Mint Products for Ownership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Transform your products into NFTs for verified ownership and easier transfers.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20">
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Minting Fee</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-bitaccess-gold">0.01 BNB</p>
                        <p className="text-xs text-gray-400 mt-1">Per product</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20">
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Benefits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Verified ownership</li>
                          <li>• Royalty on transfers</li>
                          <li>• Enhanced security</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  <Button className="mt-4 bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90">
                    <PlusCircle className="mr-2 h-4 w-4" /> Select Products to Mint
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="store">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>My Store</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => navigate('/marketplace/merchant/store')}
                      className="border-bitaccess-gold/30 text-bitaccess-gold"
                    >
                      View Public Store
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-bitaccess-black-light p-4 rounded-lg">
                        <h3 className="font-medium text-gray-400 mb-1">Total Products</h3>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <div className="bg-bitaccess-black-light p-4 rounded-lg">
                        <h3 className="font-medium text-gray-400 mb-1">Active Listings</h3>
                        <p className="text-2xl font-bold">8</p>
                      </div>
                      <div className="bg-bitaccess-black-light p-4 rounded-lg">
                        <h3 className="font-medium text-gray-400 mb-1">Total Sales</h3>
                        <p className="text-2xl font-bold">24</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Store Settings</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between items-center p-4 bg-bitaccess-black-light rounded-lg">
                          <div>
                            <h4 className="font-medium">Store Name</h4>
                            <p className="text-sm text-gray-400">Crypto Gadgets Shop</p>
                          </div>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-4 bg-bitaccess-black-light rounded-lg">
                          <div>
                            <h4 className="font-medium">Store Description</h4>
                            <p className="text-sm text-gray-400">Best crypto-related gadgets and accessories</p>
                          </div>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-4 bg-bitaccess-black-light rounded-lg">
                          <div>
                            <h4 className="font-medium">Store Banner</h4>
                            <p className="text-sm text-gray-400">banner-image.jpg</p>
                          </div>
                          <Button size="sm" variant="outline">Change</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MerchantDashboard;
