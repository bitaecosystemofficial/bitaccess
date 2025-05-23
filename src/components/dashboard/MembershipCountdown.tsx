
import React from "react";
import { useMembership } from "@/contexts/MembershipContext";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const MembershipCountdown = () => {
  const { membershipData } = useMembership();
  const [timeLeft, setTimeLeft] = React.useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    if (!membershipData?.isActive) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const endDate = membershipData.endDate;
      
      const days = differenceInDays(endDate, now);
      const hours = differenceInHours(endDate, now) % 24;
      const minutes = differenceInMinutes(endDate, now) % 60;
      const seconds = differenceInSeconds(endDate, now) % 60;
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [membershipData]);

  if (!membershipData?.isActive) {
    return null;
  }

  return (
    <Card className="border border-bitaccess-gold/30 bg-bitaccess-black">
      <CardContent className="pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-bitaccess-gold" />
            <h3 className="text-lg font-medium text-white">Membership Expires In</h3>
          </div>
          <Badge className="bg-bitaccess-gold text-bitaccess-black">Active</Badge>
        </div>
        
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-bitaccess-black-light rounded-md p-2">
            <div className="text-2xl font-bold text-bitaccess-gold">{timeLeft.days}</div>
            <div className="text-xs text-gray-400">Days</div>
          </div>
          <div className="bg-bitaccess-black-light rounded-md p-2">
            <div className="text-2xl font-bold text-bitaccess-gold">{timeLeft.hours}</div>
            <div className="text-xs text-gray-400">Hours</div>
          </div>
          <div className="bg-bitaccess-black-light rounded-md p-2">
            <div className="text-2xl font-bold text-bitaccess-gold">{timeLeft.minutes}</div>
            <div className="text-xs text-gray-400">Minutes</div>
          </div>
          <div className="bg-bitaccess-black-light rounded-md p-2">
            <div className="text-2xl font-bold text-bitaccess-gold">{timeLeft.seconds}</div>
            <div className="text-xs text-gray-400">Seconds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipCountdown;
