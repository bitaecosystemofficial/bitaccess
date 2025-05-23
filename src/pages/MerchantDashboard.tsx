
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useWallet } from '@/contexts/WalletContext';
import { useMembership } from '@/contexts/MembershipContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import MerchantOrders from '@/components/marketplace/merchant/MerchantOrders';
import { Package, Store, MessageSquare, Tag, PlusCircle, Clock } from 'lucide-react';

const MerchantDashboard = () => {
  const { isConnected } = useWallet();
  const { membershipData, isLoading } = useMembership();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  if (!isConnected || isLoading) {
    return (
      <Layout>
        <div className="container px-4 py-8 mt-16">
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">Loading your merchant dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!membershipData?.isActive || membershipData.type !== 'Merchant') {
    navigate('/become-merchant');
    return null;
  }

  // Calculate days remaining in subscription
  const daysLeft = Math.ceil((membershipData.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Layout>
      <div className="container px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-2 bg-gold-gradient text-transparent bg-clip-text">
          Merchant Dashboard
        </h1>
        <p className="text-gray-400 mb-8">
          Manage your store, products, and orders.
        </p>

        {/* Merchant Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-700 bg-bitaccess-black">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-400">Available Listing Credits</CardTitle>
              <PlusCircle className="h-5 w-5 text-bitaccess-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">10</div>
              <p className="text-sm text-muted-foreground mt-1">
                Credits used to list products on the marketplace
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-700 bg-bitaccess-black">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-400">Active Products</CardTitle>
              <Package className="h-5 w-5 text-bitaccess-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-sm text-muted-foreground mt-1">
                Products currently listed on the marketplace
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-700 bg-bitaccess-black">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-400">Subscription Expires In</CardTitle>
              <Clock className="h-5 w-5 text-bitaccess-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{daysLeft} days</div>
              <p className="text-sm text-muted-foreground mt-1">
                Your merchant subscription is active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Products</h2>
              <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
              </Button>
            </div>
            
            <Card className="border-gray-700 bg-bitaccess-black">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
                <Package className="h-16 w-16 text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No products yet</h3>
                <p className="text-gray-400 text-center max-w-md mb-6">
                  You haven't added any products to your store. Add your first product to start selling.
                </p>
                <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Product
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
              <p className="text-gray-400">Manage and track your customer orders.</p>
            </div>
            
            <MerchantOrders />
          </TabsContent>
          
          <TabsContent value="store">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Store Management</h2>
              <Button 
                variant="outline" 
                className="border-bitaccess-gold text-bitaccess-gold"
                onClick={() => navigate('/marketplace/merchant/0x123...456')}
              >
                <Store className="mr-2 h-4 w-4" /> View Your Store
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-gray-700 bg-bitaccess-black">
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                  <CardDescription>
                    Manage your store details and appearance
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Store Name</p>
                      <p className="font-medium">Crypto Gadget Store</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Store Description</p>
                      <p className="text-sm text-gray-300">Premium crypto gadgets and accessories for blockchain enthusiasts.</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Store Category</p>
                      <p>Hardware & Accessories</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Edit Store Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-gray-700 bg-bitaccess-black">
                <CardHeader>
                  <CardTitle>Store Statistics</CardTitle>
                  <CardDescription>
                    Insights and analytics for your store
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <span className="text-gray-400">Store Views</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <span className="text-gray-400">Product Views</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <span className="text-gray-400">Completed Orders</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-400">Conversion Rate</span>
                      <span className="font-medium">0%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="messages">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Customer Messages</h2>
              <p className="text-gray-400">Communicate with your customers.</p>
            </div>
            
            <Card className="border-gray-700 bg-bitaccess-black">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
                <MessageSquare className="h-16 w-16 text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
                <p className="text-gray-400 text-center max-w-md">
                  When customers send you messages, they will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="coupons">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Discount Coupons</h2>
              <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Coupon
              </Button>
            </div>
            
            <Card className="border-gray-700 bg-bitaccess-black">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
                <Tag className="h-16 w-16 text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No coupons yet</h3>
                <p className="text-gray-400 text-center max-w-md mb-6">
                  You haven't created any discount coupons. Create a coupon to offer special deals to your customers.
                </p>
                <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Coupon
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MerchantDashboard;
