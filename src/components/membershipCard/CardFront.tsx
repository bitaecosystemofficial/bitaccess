
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, CreditCard } from "lucide-react";

interface CardFrontProps {
  address: string;
  membershipType: string;
}

const CardFront: React.FC<CardFrontProps> = ({ address, membershipType }) => {
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
    <Card 
      className="absolute w-full h-full bg-gradient-to-br from-bitaccess-black to-black text-white border border-bitaccess-gold/30 rounded-xl overflow-hidden"
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
              {membershipType === "Merchant" ? (
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
  );
};

export default CardFront;
