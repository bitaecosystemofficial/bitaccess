
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

  const fetchAllRealTimeData = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching comprehensive real-time data from BSCScan...');
      
      const realTimeData = await bscscanService.getRealTimeTokenData();

      setTokenInfo(realTimeData.tokenInfo);
      setTopHolders(realTimeData.topHolders);
      setActivity(realTimeData.activity);
      setLastUpdate(realTimeData.timestamp);
      
      console.log('Real-time data updated:', { 
        holders: realTimeData.tokenInfo?.holders,
        topHoldersCount: realTimeData.topHolders.length,
        activity: realTimeData.activity 
      });
    } catch (error) {
      console.error('Error fetching real-time token data:', error);
      toast({
        title: "Data Fetch Error",
        description: "Failed to fetch real-time data from BSCScan API",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchAllRealTimeData();
    
    // Set up polling every 4 hours (14400000 ms) as requested
    const interval = setInterval(fetchAllRealTimeData, 14400000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    await fetchAllRealTimeData();
    toast({
      title: "Data Refreshed",
      description: "Real-time token data has been updated from BSCScan",
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
