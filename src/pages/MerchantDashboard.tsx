
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/layout/Layout';
import { useWallet } from '@/contexts/WalletContext';
import { useMembership } from '@/contexts/MembershipContext';
import WalletConnectPrompt from '@/components/ui/wallet-connect-prompt';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  MerchantProducts, 
  MerchantOrders, 
  MerchantInbox, 
  MerchantCoupons, 
  MerchantSubscription 
} from '@/components/marketplace/merchant';
import { PackageOpen, ShoppingBag, MessageSquare, Tag, CreditCard } from 'lucide-react';

const MerchantDashboard = () => {
  const { isConnected } = useWallet();
  const { membershipData } = useMembership();
  const [activeTab, setActiveTab] = useState("products");
  
  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Merchant Dashboard Access Required"
          description="Please connect your wallet to access the merchant dashboard"
        />
      </Layout>
    );
  }
  
  if (!membershipData?.isActive || membershipData?.type !== "Merchant") {
    return (
      <Layout>
        <div className="container px-4 py-24 mt-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Merchant Access Required</h1>
            <p className="mb-8 text-gray-400">
              You need an active merchant membership to access the dashboard.
            </p>
            <a 
              href="/become-merchant"
              className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90 px-6 py-3 rounded-md font-medium"
            >
              Become a Merchant
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-12 mt-16">
        <h1 className="text-3xl font-bold mb-2">Merchant Dashboard</h1>
        <p className="text-gray-400 mb-8">
          Manage your store, products and orders
        </p>

        <Tabs 
          defaultValue="products" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <PackageOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Coupons</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Subscription</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <MerchantProducts />
          </TabsContent>
          
          <TabsContent value="orders">
            <MerchantOrders />
          </TabsContent>
          
          <TabsContent value="messages">
            <MerchantInbox />
          </TabsContent>
          
          <TabsContent value="coupons">
            <MerchantCoupons />
          </TabsContent>
          
          <TabsContent value="subscription">
            <MerchantSubscription />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MerchantDashboard;
