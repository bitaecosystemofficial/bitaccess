
import { Card, CardContent } from "@/components/ui/card";
import { Coins, TrendingUp, DollarSign, BarChart3, Users, Activity } from "lucide-react";

const TokenStats = () => {
  const stats = [
    {
      label: "Total Supply",
      value: "1,000,000,000",
      suffix: "BIT",
      description: "Maximum token supply",
      icon: <Coins className="w-8 h-8" />
    },
    {
      label: "Circulating Supply",
      value: "750,000,000",
      suffix: "BIT",
      description: "Currently in circulation",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      label: "Current Price",
      value: "$0.025",
      suffix: "USD",
      description: "Live market price",
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      label: "Market Cap",
      value: "$18.75M",
      suffix: "USD",
      description: "Total market value",
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      label: "Total Holders",
      value: "3,198",
      suffix: "",
      description: "Unique wallet addresses",
      icon: <Users className="w-8 h-8" />
    },
    {
      label: "24h Volume",
      value: "$2.4M",
      suffix: "USD",
      description: "Trading volume",
      icon: <Activity className="w-8 h-8" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-bitaccess-gold opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {stat.icon}
              </div>
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-bold text-bitaccess-gold group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                  {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
                </div>
              </div>
            </div>
            <div className="text-left">
              <div className="text-lg font-medium text-white mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.description}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TokenStats;
