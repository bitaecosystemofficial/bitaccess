
import { useState, useEffect } from 'react';
import { usePresaleData } from './usePresaleData';
import { TimeRemaining } from './types';

export const usePresaleTimer = (): TimeRemaining => {
  const presaleData = usePresaleData();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = Math.max(0, presaleData.endTimeInSeconds - now);
      
      const days = Math.floor(diff / (24 * 60 * 60));
      const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((diff % (60 * 60)) / 60);
      const seconds = Math.floor(diff % 60);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, [presaleData.endTimeInSeconds]);
  
  return timeRemaining;
};
