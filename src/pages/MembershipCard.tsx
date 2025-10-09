
import React, { useState, useEffect } from 'react';
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, BarChart2 } from "lucide-react";
import WalletConnectPrompt from '@/components/ui/wallet-connect-prompt';
import { format } from "date-fns";
import { networkInfo } from '@/constants/contracts';
import { switchNetwork } from '@/utils/blockchainUtils';
import { toast } from '@/hooks/use-toast';
import "../components/ui/card-flip.css";

const MembershipCard = () => {
  const { isConnected, address } = useWallet();
  const { membershipData } = useMembership();
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Check for correct network on component mount
  useEffect(() => {
    if (isConnected) {
      const checkAndSwitchNetwork = async () => {
        const isCorrectNetwork = await switchNetwork();
        if (!isCorrectNetwork) {
          toast({
            title: "Network Required",
            description: `Please switch to ${networkInfo.name} to view your membership card`,
            variant: "destructive",
          });
        }
      };
      
      checkAndSwitchNetwork();
    }
  }, [isConnected]);

  const toggleFlip = () => setIsFlipped(!isFlipped);
  
  // 3D effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return; // Disable tilt effect when card is flipped
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate rotation (limited to +/- 10 degrees)
    const rotateY = ((mouseX - centerX) / rect.width) * 10;
    const rotateX = ((centerY - mouseY) / rect.height) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotation({ x: 0, y: 0 });
  };

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

  // Show card even if inactive, but display inactive status
  const cardStatus = membershipData?.isActive ? "Active" : "Inactive";

  // Format dates from actual membership data
  const startDate = membershipData?.startDate 
    ? format(new Date(membershipData.startDate), "MM/dd/yy") 
    : format(new Date(), "MM/dd/yy");
  const endDate = membershipData?.endDate 
    ? format(membershipData.endDate, "MM/dd/yy") 
    : format(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), "MM/dd/yy");

  // Format card number from wallet address
  const formatCardNumber = (address: string) => {
    if (!address) return "1234 5678 9012 3456";
    
    const cleaned = address.replace("0x", "");
    const chunks = [];
    
    for (let i = 0; i < 16; i += 4) {
      chunks.push(cleaned.substring(i, i + 4));
    }
    
    return chunks.join(" ");
  };

  // Format ID number: BIT-[first 4 chars]-[last 4 chars]
  const formatIdNumber = (address: string) => {
    if (!address) return "BIT-0000-0000";
    const cleaned = address.replace("0x", "");
    const first4 = cleaned.substring(0, 4).toUpperCase();
    const last4 = cleaned.slice(-4).toUpperCase();
    return `BIT-${first4}-${last4}`;
  };

  return (
    <Layout>
      <div className="container px-4 py-12 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 bg-gold-gradient text-transparent bg-clip-text">
            BitAccess Membership Card
          </h1>
          <p className="text-gray-400 mb-8">
            Your digital membership card grants you access to exclusive benefits on {networkInfo.name}
          </p>

          <div className="flex justify-center mb-8">
            <Button onClick={toggleFlip} className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
              {isFlipped ? "View Front" : "View Back"}
            </Button>
          </div>

          {/* Card Container with 3D flip effect */}
          <div className="perspective-1000 w-full max-w-md mx-auto h-64 cursor-pointer">
            <div 
              className={`relative w-full h-full transition-transform duration-700 transform-style-3d card-flip-animation ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ 
                transform: isFlipped 
                  ? `rotateY(180deg)` 
                  : `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`
              }}
            >
              {/* Front Side */}
              <Card 
                className={`absolute w-full h-full backface-hidden card-3d card-depth ${
                  isFlipped ? "invisible" : ""
                } bg-gradient-to-br from-bitaccess-black to-black text-white border border-bitaccess-gold/30 rounded-xl overflow-hidden`}
              >
                <CardContent className="p-0 h-full relative">
                  {/* Golden border decoration at top */}
                  <div className="w-full h-4 bg-gradient-to-r from-bitaccess-gold/80 via-bitaccess-gold to-bitaccess-gold/80 border-b border-bitaccess-gold/30"></div>
                  
                  {/* Card content */}
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 flex items-center justify-center">
                        {/* Custom QR Code image with gold border */}
                        <div className="p-1 rounded-lg border-2 border-bitaccess-gold">
                          <img src="/lovable-uploads/2083e9af-3de5-412c-94dc-88cde90c0b33.png" 
                               alt="QR Code" 
                               className="h-12 w-12 rounded-md" />
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <h3 className="font-bold text-xl text-bitaccess-gold card-emboss">BIT ACCESS</h3>
                        <p className="text-bitaccess-gold/80 text-sm">BIT</p>
                      </div>
                    </div>
                    
                    <div className="my-4 text-center">
                      <p className="text-xl font-mono tracking-widest text-gray-200 card-number">
                        {formatCardNumber(address || "")}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-400">ID NUMBER</p>
                        <p className="text-sm font-mono">{formatIdNumber(address || "")}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-gray-400">STATUS</p>
                        <p className={`text-sm font-bold ${cardStatus === "Active" ? "text-green-500" : "text-red-500"}`}>
                          {cardStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Holographic effect overlay */}
                  <div className="holographic-effect"></div>
                  <div className="card-shine"></div>
                </CardContent>
              </Card>
              
              {/* Back Side */}
              <Card 
                className={`absolute w-full h-full backface-hidden rotate-y-180 card-3d card-depth ${
                  !isFlipped ? "invisible" : ""
                } bg-gradient-to-br from-black to-bitaccess-black-light text-white border border-bitaccess-gold/30 rounded-xl overflow-hidden`}
              >
                <CardContent className="p-0 h-full relative">
                  {/* Golden border decoration at top */}
                  <div className="w-full h-4 bg-gradient-to-r from-bitaccess-gold/80 via-bitaccess-gold to-bitaccess-gold/80"></div>
                  
                  {/* Card content */}
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="text-center mb-2">
                      <p className="text-xs text-gray-400">SMART CONTRACT ADDRESS</p>
                      <p className="text-sm font-mono text-gray-300">0xd3bde17ebd27739cf5505cd58ecf31cb628e469c</p>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      {/* Enhanced QR code with gold border */}
                      <div className="p-2 bg-white rounded-xl border-2 border-bitaccess-gold shadow-lg">
                        <img src="/lovable-uploads/2083e9af-3de5-412c-94dc-88cde90c0b33.png" 
                             alt="QR Code" 
                             className="h-20 w-20 rounded-lg" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-400">MEMBER SINCE</p>
                        <p className="text-sm font-medium text-gray-200">{startDate}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 text-right">EXPIRATION DATE</p>
                        <p className="text-sm font-medium text-gray-200">{endDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Holographic effect overlay */}
                  <div className="holographic-effect"></div>
                  <div className="card-shine"></div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Add Dashboard Component */}
          <Dashboard />

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Membership Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-bitaccess-black-light border-bitaccess-gold/10">
                <CardContent className="p-4 flex items-start">
                  <div className="mr-4 mt-1">
                    <BarChart2 className="h-5 w-5 text-bitaccess-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Token Rewards</h3>
                    <p className="text-sm text-gray-400">
                      Earn BTCB, USDT, BNB, and BIT tokens as part of your membership rewards
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-bitaccess-black-light border-bitaccess-gold/10">
                <CardContent className="p-4 flex items-start">
                  <div className="mr-4 mt-1">
                    {/* Custom QR code as icon with gold border */}
                    <div className="p-0.5 border border-bitaccess-gold/50 rounded">
                      <img 
                        src="/lovable-uploads/2083e9af-3de5-412c-94dc-88cde90c0b33.png" 
                        alt="QR Code" 
                        className="h-4 w-4" 
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Cross Border Payments</h3>
                    <p className="text-sm text-gray-400">
                      Access special rates for cross-border transactions with your membership
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MembershipCard;
