
import React, { useState, useEffect, useRef } from 'react';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  const CONTRACT_ADDRESS = "0xd3bde17ebd27739cf5505cd58ecf31cb628e469c";
  const CONTRACT_ADDRESS_SHORT = "0xd3bd...469c";

  // Effect for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        setMousePosition({ x, y });
        
        // Only apply tilt effect when not flipped
        if (!isFlipped) {
          const tiltX = (y - 0.5) * 10; // -5 to 5 degrees
          const tiltY = (0.5 - x) * 10; // -5 to 5 degrees
          
          cardRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        } else {
          cardRef.current.style.transform = 'rotateY(180deg)';
        }
      }
    };
    
    const handleMouseLeave = () => {
      if (cardRef.current) {
        if (!isFlipped) {
          cardRef.current.style.transform = 'rotateX(0) rotateY(0)';
        } else {
          cardRef.current.style.transform = 'rotateY(180deg)';
        }
      }
    };
    
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isFlipped]);
  
  const toggleFlip = () => setIsFlipped(!isFlipped);

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

  // QR code URL for the contract
  const contractQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://bscscan.com/token/${CONTRACT_ADDRESS}`;

  return (
    <Layout>
      <div className="container px-4 py-12 mt-10 mb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gold-gradient text-transparent bg-clip-text animate-fade-in">
            BitAccess Membership Card
          </h1>
          <p className="text-gray-400 mb-8 animate-fade-in animation-delay-200">
            Your digital membership card grants you access to exclusive benefits and cross-border payments
          </p>

          <div className="flex justify-center mb-8 animate-fade-in animation-delay-300">
            <Button 
              onClick={toggleFlip} 
              className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black transition-all duration-300 hover:scale-105"
            >
              {isFlipped ? "View Front" : "View Back"}
            </Button>
          </div>

          {/* Card Container with 3D flip effect */}
          <div className="perspective-1000 w-full max-w-lg mx-auto h-72 cursor-pointer mb-10 animate-fade-in animation-delay-400">
            <div 
              ref={cardRef}
              className={`relative w-full h-full transition-transform duration-700 transform-style-3d card-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              onClick={toggleFlip}
            >
              {/* Front Side */}
              <Card 
                className={`absolute w-full h-full backface-hidden ${
                  isFlipped ? "invisible" : ""
                } bg-gradient-to-br from-bitaccess-black to-black text-white border border-bitaccess-gold/30 rounded-xl overflow-hidden`}
              >
                <CardContent className="p-0 h-full relative">
                  {/* Golden border decoration at top */}
                  <div className="w-full h-10 bg-gradient-to-r from-bitaccess-gold/80 via-bitaccess-gold to-bitaccess-gold/80 border-b border-bitaccess-gold/30"></div>
                  <div className="card-shine"></div>
                  
                  {/* Card content */}
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-16 h-16 flex items-center justify-center">
                          <QrCode className="h-10 w-10 text-bitaccess-gold/80" />
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <h3 className="font-bold text-xl gold-text">BIT ACCESS</h3>
                        <p className="text-bitaccess-gold/80 text-sm">BIT</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className="chip-effect"></div>
                      <div className="hologram"></div>
                    </div>
                    
                    <div className="my-4 text-center">
                      <p className="text-xl card-number-format embossed-text text-gray-200">
                        {formatCardNumber(address || "")}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-400">ID NUMBER</p>
                        <p className="text-sm font-mono embossed-text">{formatIdNumber(address || "")}</p>
                      </div>
                      
                      <div>
                        {membershipData?.type === "Merchant" ? (
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-900/30 border border-green-600/50">
                            <span className="text-sm font-bold text-green-500">VIP</span>
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-bitaccess-gold/20 border border-bitaccess-gold/50 flex items-center justify-center">
                            <CreditCard className="h-8 w-8 text-bitaccess-gold/80" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Back Side */}
              <Card 
                className={`absolute w-full h-full backface-hidden rotate-y-180 ${
                  !isFlipped ? "invisible" : ""
                } bg-gradient-to-br from-black to-bitaccess-black-light text-white border border-bitaccess-gold/30 rounded-xl overflow-hidden`}
              >
                <CardContent className="p-0 h-full relative">
                  {/* Magnetic stripe */}
                  <div className="magnetic-stripe w-full"></div>
                  <div className="card-shine"></div>
                  
                  {/* Card content */}
                  <div className="px-6 py-4 h-full flex flex-col justify-between">
                    <div className="text-center mb-2">
                      <p className="text-xs text-gray-400">SMART CONTRACT ADDRESS</p>
                      <p className="text-sm font-mono text-bitaccess-gold">{CONTRACT_ADDRESS_SHORT}</p>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <div className="w-28 h-28 bg-white p-2 rounded-md flex items-center justify-center">
                        <img
                          src={contractQrUrl}
                          alt="Contract QR Code"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div>
                        <p className="text-xs text-gray-400">MEMBER SINCE</p>
                        <p className="text-sm font-medium text-bitaccess-gold">{startDate}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 text-right">EXPIRATION DATE</p>
                        <p className="text-sm font-medium text-bitaccess-gold">{endDate}</p>
                      </div>
                    </div>
                    
                    <div className="text-center text-xs text-gray-500 mt-4">
                      <p>This card represents your digital membership in the BitAccess ecosystem</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 animate-fade-in animation-delay-500">
            <h2 className="text-xl font-bold mb-4 gold-text">Membership Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Card className="bg-bitaccess-black-light border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover:-translate-y-1">
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
              
              <Card className="bg-bitaccess-black-light border-bitaccess-gold/10 hover:border-bitaccess-gold/30 transition-all duration-300 hover:-translate-y-1">
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
