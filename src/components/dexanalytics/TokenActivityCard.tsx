
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, TrendingUp, Users, ArrowUpDown } from "lucide-react";
import { bscscanService, TokenActivity } from "@/services/BscscanService";
import { useToast } from "@/hooks/use-toast";

const TokenActivityCard = () => {
  const [activity, setActivity] = useState<TokenActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setIsLoading(true);
        const activityData = await bscscanService.getTokenActivity();
        setActivity(activityData);
      } catch (error) {
        console.error('Error fetching token activity:', error);
        toast({
          title: "Error",
          description: "Failed to fetch token activity data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchActivity, 30000);
    return () => clearInterval(interval);
  }, [toast]);

  if (isLoading) {
    return (
      <Card className="border-bitaccess-gold/20 bg-bitaccess-black-light">
        <CardHeader>
          <CardTitle className="text-bitaccess-gold">24h Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activity) return null;

  return (
    <Card className="border-bitaccess-gold/20 bg-bitaccess-black-light">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-bitaccess-gold">
          <Activity className="w-5 h-5" />
          24h Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-bitaccess-black rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpDown className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400 text-sm">Transfers</span>
            </div>
            <p className="text-xl font-bold text-white">
              {activity.transfers24h.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-bitaccess-black rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-gray-400 text-sm">Volume</span>
            </div>
            <p className="text-xl font-bold text-white">
              {parseFloat(activity.volume24h).toLocaleString()} BIT
            </p>
          </div>
          
          <div className="bg-bitaccess-black rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400 text-sm">Unique Addresses</span>
            </div>
            <p className="text-xl font-bold text-white">
              {activity.uniqueAddresses24h.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-bitaccess-black rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-orange-400" />
              <span className="text-gray-400 text-sm">Avg per Hour</span>
            </div>
            <p className="text-xl font-bold text-white">
              {Math.round(activity.transfers24h / 24)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenActivityCard;
