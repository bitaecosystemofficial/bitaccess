
import React, { useState } from 'react';
import { useWallet } from "@/contexts/WalletContext";
import { useMembership } from "@/contexts/MembershipContext";
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, CreditCard, BarChart2 } from "lucide-react";
import WalletConnectPrompt from '@/components/ui/wallet-connect-prompt';
import { format } from "date-fns";

const MembershipCard = () => {
  const { isConnected, address } = useWallet();
  const { membershipData } = useMembership();
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

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

  // Format ID number
  const formatIdNumber = (address: string) => {
    if (!address) return "BIT-0000-0001";
    const last4 = address.slice(-4);
    return `BIT-${last4}-0001`;
  };

  return (
    <Layout>
      <div className="container px-4 py-12 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 bg-gold-gradient text-transparent bg-clip-text">
            BitAccess Membership Card
          </h1>
          <p className="text-gray-400 mb-8">
            Your digital membership card grants you access to exclusive benefits
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
                  <div className="w-full h-8 bg-gradient-to-r from-bitaccess-gold/80 via-bitaccess-gold to-bitaccess-gold/80 border-b border-bitaccess-gold/30"></div>
                  
                  {/* Card content */}
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <QrCode className="h-10 w-10 text-bitaccess-gold/80" />
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
                      
                      <div>
                        {membershipData?.type === "Merchant" ? (
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-900/30 border border-green-600/50">
                            <span className="text-xs font-bold text-green-500">VIP</span>
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-bitaccess-gold/20 border border-bitaccess-gold/50 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-bitaccess-gold/80" />
                          </div>
                        )}
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
                  <div className="w-full h-8 bg-gradient-to-r from-bitaccess-gold/80 via-bitaccess-gold to-bitaccess-gold/80"></div>
                  
                  {/* Card content */}
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="text-center mb-2">
                      <p className="text-xs text-gray-400">SMART CONTRACT ADDRESS</p>
                      <p className="text-sm font-mono text-gray-300">0x0002...</p>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <div className="w-24 h-24 bg-white p-2 rounded-md flex items-center justify-center shadow-lg">
                        <QrCode className="h-20 w-20 text-black" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
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
                    <QrCode className="h-5 w-5 text-bitaccess-gold" />
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
