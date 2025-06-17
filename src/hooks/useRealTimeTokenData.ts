
import { useState, useEffect } from 'react';
import { bscscanService, TokenInfo, TokenHolder, TokenActivity } from '@/services/BscscanService';
import { useToast } from '@/hooks/use-toast';

export const useRealTimeTokenData = () => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [topHolders, setTopHolders] = useState<TokenHolder[]>([]);
  const [activity, setActivity] = useState<TokenActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const { toast } = useToast();

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching real-time data from BSCScan...');
      
      const [info, holders, activityData] = await Promise.all([
        bscscanService.getTokenInfo(),
        bscscanService.getTop10Holders(),
        bscscanService.getTokenActivity()
      ]);

      setTokenInfo(info);
      setTopHolders(holders);
      setActivity(activityData);
      setLastUpdate(new Date());
      
      console.log('Real-time data updated:', { info, holders: holders.length, activityData });
    } catch (error) {
      console.error('Error fetching real-time token data:', error);
      toast({
        title: "Data Fetch Error",
        description: "Failed to fetch real-time data from BSCScan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchAllData();
    
    // Set up polling every 4 hours (14400000 ms)
    const interval = setInterval(fetchAllData, 14400000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    await fetchAllData();
    toast({
      title: "Data Refreshed",
      description: "Token data has been updated with latest information",
    });
  };

  return {
    tokenInfo,
    topHolders,
    activity,
    isLoading,
    lastUpdate,
    refreshData
  };
};
