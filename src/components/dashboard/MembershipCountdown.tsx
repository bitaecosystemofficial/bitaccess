
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useMembership } from "@/contexts/MembershipContext";
import { Clock } from "lucide-react";

const MembershipCountdown = () => {
  const { membershipData } = useMembership();
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!membershipData?.expiryDate) return;

    const calculateTimeLeft = () => {
      const expiryDate = new Date(membershipData.expiryDate);
      const difference = expiryDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [membershipData?.expiryDate]);

  return (
    <Card className="border bg-bitaccess-black-light border-bitaccess-gold/20 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock size={20} className="text-bitaccess-gold" />
          <h3 className="text-xl font-bold text-white">Membership Expiration</h3>
        </div>
        
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          <div className="bg-bitaccess-black rounded-lg p-3 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</div>
            <div className="text-xs md:text-sm text-gray-400">Days</div>
          </div>
          
          <div className="bg-bitaccess-black rounded-lg p-3 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.hours}</div>
            <div className="text-xs md:text-sm text-gray-400">Hours</div>
          </div>
          
          <div className="bg-bitaccess-black rounded-lg p-3 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</div>
            <div className="text-xs md:text-sm text-gray-400">Minutes</div>
          </div>
          
          <div className="bg-bitaccess-black rounded-lg p-3 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.seconds}</div>
            <div className="text-xs md:text-sm text-gray-400">Seconds</div>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mt-4 text-center">
          Your membership will expire on {membershipData?.expiryDate}
        </p>
      </CardContent>
    </Card>
  );
};

export default MembershipCountdown;
