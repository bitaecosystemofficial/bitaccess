
import React, { useState, useEffect } from 'react';
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import Layout from '@/components/layout/Layout';
import WalletConnectPrompt from '@/components/ui/wallet-connect-prompt';
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import CardFront from '@/components/membershipCard/CardFront';
import CardBack from '@/components/membershipCard/CardBack';
import FlipCard from '@/components/membershipCard/FlipCard';
import MembershipBenefits from '@/components/membershipCard/MembershipBenefits';

const MembershipCard = () => {
  const { isConnected, address } = useWallet();
  const { membershipData } = useMembership();
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Membership Card Access Required"
          description="Please connect your wallet to view your membership card"
        />
      </Layout>
    );
  }

  if (!membershipData?.isActive) {
    return (
      <Layout>
        <div className="container px-4 py-24 mt-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Membership Required</h1>
            <p className="mb-8 text-gray-400">
              You need an active membership to access your BitAccess card.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
            >
              Get Membership
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Format dates
  const startDate = membershipData ? format(membershipData.startDate, "MM-dd-yy") : "05-23-25";
  const endDate = membershipData ? format(membershipData.endDate, "MM-dd-yy") : "06-23-25";

  return (
    <Layout>
      <div className="container px-4 py-12 mt-10 mb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 bg-gold-gradient text-transparent bg-clip-text animate-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            BitAccess Membership Card
          </h1>
          <p className={`text-gray-400 mb-8 animate-fade-in animation-delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            Your digital membership card grants you access to exclusive benefits and cross-border payments
          </p>

          <FlipCard 
            frontSide={<CardFront address={address || ""} membershipType={membershipData?.type || "Regular"} />} 
            backSide={<CardBack startDate={startDate} endDate={endDate} />}
          />

          <MembershipBenefits />
        </div>
      </div>
    </Layout>
  );
};

export default MembershipCard;
