
import React from "react";
import Layout from "@/components/layout/Layout";
import { useMembership } from "@/contexts/MembershipContext";
import { useWallet } from "@/contexts/WalletContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import DashboardMembershipCard from "@/components/dashboard/DashboardMembershipCard";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardReferrals from "@/components/dashboard/DashboardReferrals";
import DashboardRewards from "@/components/dashboard/DashboardRewards";

const Dashboard = () => {
  const { isConnected } = useWallet();
  const { isLoading } = useMembership();

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Dashboard Access Required"
          description="Please connect your wallet to access your membership dashboard"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-8 bg-gold-gradient text-transparent bg-clip-text">
          Membership Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStats />
        </div>
        
        <Tabs defaultValue="membership" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="membership">
            <DashboardMembershipCard />
          </TabsContent>
          
          <TabsContent value="rewards">
            <DashboardRewards />
          </TabsContent>
          
          <TabsContent value="referrals">
            <DashboardReferrals />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
