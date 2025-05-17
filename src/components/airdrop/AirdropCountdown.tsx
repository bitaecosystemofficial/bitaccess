
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface CountdownProps {
  endTimeInSeconds: number;
}

const AirdropCountdown = ({ endTimeInSeconds }: CountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
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
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, [endTimeInSeconds]);

  return (
    <Card className="bg-gradient-to-br from-bitaccess-black-light to-bitaccess-black rounded-xl border border-bitaccess-gold/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-bitaccess-gold" />
          <h4 className="font-medium text-white">Airdrop Ends In</h4>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <CountdownUnit value={timeRemaining.days} label="Days" />
          <CountdownUnit value={timeRemaining.hours} label="Hours" />
          <CountdownUnit value={timeRemaining.minutes} label="Minutes" />
          <CountdownUnit value={timeRemaining.seconds} label="Seconds" />
        </div>
      </CardContent>
    </Card>
  );
};

interface CountdownUnitProps {
  value: number;
  label: string;
}

const CountdownUnit = ({ value, label }: CountdownUnitProps) => (
  <div className="bg-bitaccess-black p-3 rounded-lg border border-bitaccess-gold/10 text-center">
    <span className="block text-xl font-bold text-bitaccess-gold">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs text-gray-400">{label}</span>
  </div>
);

export default AirdropCountdown;
