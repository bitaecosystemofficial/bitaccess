
import { Card, CardContent } from "@/components/ui/card";

const TokenStats = () => {
  const stats = [
    {
      label: "Total Supply",
      value: "1,000,000,000",
      suffix: "BIT",
      description: "Maximum token supply"
    },
    {
      label: "Circulating Supply",
      value: "750,000,000",
      suffix: "BIT",
      description: "Currently in circulation"
    },
    {
      label: "Current Price",
      value: "$0.025",
      suffix: "USD",
      description: "Live market price"
    },
    {
      label: "Market Cap",
      value: "$18.75M",
      suffix: "USD",
      description: "Total market value"
    },
    {
      label: "Total Holders",
      value: "3,198",
      suffix: "",
      description: "Unique wallet addresses"
    },
    {
      label: "24h Volume",
      value: "$2.4M",
      suffix: "USD",
      description: "Trading volume"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-bitaccess-black-light border-bitaccess-gold/20 hover:border-bitaccess-gold/40 transition-all duration-300 group">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-bitaccess-gold mb-2 group-hover:scale-110 transition-transform duration-300">
              {stat.value}
              {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
            </div>
            <div className="text-lg font-medium text-white mb-1">{stat.label}</div>
            <div className="text-sm text-gray-400">{stat.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TokenStats;
