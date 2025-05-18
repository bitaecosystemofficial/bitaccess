
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useMembership } from "@/contexts/MembershipContext";
import { useWallet } from "@/contexts/WalletContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletConnectPrompt from "@/components/ui/wallet-connect-prompt";
import DashboardMembershipCard from "@/components/dashboard/DashboardMembershipCard";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardReferrals from "@/components/dashboard/DashboardReferrals";
import DashboardRewards from "@/components/dashboard/DashboardRewards";
import DashboardMembershipStats from "@/components/dashboard/DashboardMembershipStats";
import ReferralTree from "@/components/dashboard/ReferralTree";
import DashboardEarnings from "@/components/dashboard/DashboardEarnings";

const Dashboard = () => {
  const { isConnected } = useWallet();
  const { membershipData, isLoading, getReferralsByLevel } = useMembership();
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [levelReferrals, setLevelReferrals] = useState<string[]>([]);

  const handleLevelChange = async (level: number) => {
    setSelectedLevel(level);
    if (isConnected && membershipData?.isActive) {
      const referrals = await getReferralsByLevel(level);
      setLevelReferrals(referrals);
    }
  };

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
        
        {/* Global Membership Stats */}
        <DashboardMembershipStats />
        
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStats />
        </div>
        
        <Tabs defaultValue="membership" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
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
          
          <TabsContent value="earnings">
            <DashboardEarnings />
          </TabsContent>
          
          <TabsContent value="network">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Referral Network</h2>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleLevelChange(level)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        selectedLevel === level
                          ? "bg-bitaccess-gold text-bitaccess-black"
                          : "bg-bitaccess-black-light text-gray-400 hover:text-white"
                      }`}
                    >
                      L{level}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                View your referral network by level. Level 1 are your direct referrals, level 2 are their referrals, and so on.
              </p>
            </div>
            <ReferralTree 
              referrals={selectedLevel === 1 ? (membershipData?.referrals || []) : levelReferrals} 
              loading={isLoading} 
              level={selectedLevel}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
