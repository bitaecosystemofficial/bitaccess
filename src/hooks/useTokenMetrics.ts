
import { useState, useEffect } from 'react';
import { TokenMetrics } from '@/types/analytics';
import { tokenService } from '@/services/TokenService';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/components/ui/use-toast';

export const useTokenMetrics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [metrics, setMetrics] = useState<TokenMetrics>({
    price: 0.00000275,
    priceChange24h: 2.14,
    priceChange7d: -1.27,
    volume24h: 124357,
    marketCap: 2750000,
  });
  const { isConnected } = useWallet();
  const { toast } = useToast();

  // Fetch token metrics data
  useEffect(() => {
    const fetchTokenMetrics = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching token metrics data...");

        if (isConnected) {
          // In a real implementation, we would fetch this data from a price feed or API
          // For now, we'll use the tokenService to get some basic token data
          const tokenDetails = await tokenService.getTokenDetails();
          
          // We would normally calculate these values based on the token details
          // and current market data, but for now we'll just simulate
          setMetrics(prevMetrics => ({
            ...prevMetrics,
            marketCap: Number(tokenDetails.totalSupply) * prevMetrics.price / 10**9, // Assuming 9 decimals
          }));
        }
        
        setIsLoading(false);
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Error fetching token metrics:", error);
        toast({
          title: "Failed to load metrics",
          description: "Could not fetch the latest token metrics data",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchTokenMetrics();

    // Set up periodic refresh (every 60 seconds)
    const interval = setInterval(() => {
      // Simulate price changes for demo purposes
      setMetrics(prev => ({
        ...prev,
        price: prev.price * (1 + (Math.random() * 0.04 - 0.02)), // ±2% price change
        priceChange24h: prev.priceChange24h + (Math.random() * 2 - 1), // ±1% fluctuation
        volume24h: prev.volume24h * (1 + (Math.random() * 0.1 - 0.05)), // ±5% volume change
      }));
      setLastUpdate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [isConnected, toast]);

  return {
    metrics,
    isLoading,
    lastUpdate,
  };
};
