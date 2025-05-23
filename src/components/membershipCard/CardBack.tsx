
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode } from "lucide-react";

interface CardBackProps {
  startDate: string;
  endDate: string;
}

const CardBack: React.FC<CardBackProps> = ({ startDate, endDate }) => {
  const CONTRACT_ADDRESS = "0xd3bde17ebd27739cf5505cd58ecf31cb628e469c";
  const CONTRACT_ADDRESS_SHORT = "0x0002...";
  
  // QR code URL for the contract
  const contractQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://bscscan.com/token/${CONTRACT_ADDRESS}`;

  return (
    <Card 
      className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-black to-bitaccess-black-light text-white border border-bitaccess-gold/30 rounded-xl overflow-hidden"
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
          
          <div className="flex justify-center my-4">
            <div className="w-28 h-28 bg-white p-2 rounded-md flex items-center justify-center">
              <img
                src={contractQrUrl}
                alt="Contract QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-auto">
            <div>
              <p className="text-xs text-gray-400">MEMBER SINCE</p>
              <p className="text-sm font-medium text-bitaccess-gold">{startDate}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 text-right">EXPIRATION DATE</p>
              <p className="text-sm font-medium text-bitaccess-gold">{endDate}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardBack;
