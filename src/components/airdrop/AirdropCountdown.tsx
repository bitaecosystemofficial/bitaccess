
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface AirdropCountdownProps {
  endTimeInSeconds: number;
}

const AirdropCountdown = ({ endTimeInSeconds }: AirdropCountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 100,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = Math.max(0, endTimeInSeconds - now);
      
      const days = Math.floor(diff / (24 * 60 * 60));
      const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((diff % (60 * 60)) / 60);
      const seconds = Math.floor(diff % 60);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, [endTimeInSeconds]);

  return (
    <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/10">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-4 w-4 text-bitaccess-gold" />
        <h4 className="font-medium text-white">Airdrop Ends In</h4>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-bitaccess-black-dark p-2 text-center rounded">
          <span className="block text-xl font-bold text-bitaccess-gold">
            {String(timeRemaining.days).padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-500">Days</span>
        </div>
        <div className="bg-bitaccess-black-dark p-2 text-center rounded">
          <span className="block text-xl font-bold text-bitaccess-gold">
            {String(timeRemaining.hours).padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-500">Hours</span>
        </div>
        <div className="bg-bitaccess-black-dark p-2 text-center rounded">
          <span className="block text-xl font-bold text-bitaccess-gold">
            {String(timeRemaining.minutes).padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-500">Minutes</span>
        </div>
        <div className="bg-bitaccess-black-dark p-2 text-center rounded">
          <span className="block text-xl font-bold text-bitaccess-gold">
            {String(timeRemaining.seconds).padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-500">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default AirdropCountdown;
