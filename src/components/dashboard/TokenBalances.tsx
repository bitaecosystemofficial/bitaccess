import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { CryptoCompareService } from "@/services/CryptoCompareService";

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  price: number;
  logo: string;
}

const TokenBalances = () => {
  const [tokens, setTokens] = useState<TokenBalance[]>([
    {
      symbol: "BNB",
      name: "Binance Coin",
      balance: "0.00",
      price: 0,
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
    },
    {
      symbol: "USDT",
      name: "Tether",
      balance: "0.00",
      price: 0,
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: "0.00",
      price: 0,
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
    },
    {
      symbol: "BIT",
      name: "Bit Access Token",
      balance: "0.00",
      price: 0,
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" // Using Bitcoin logo as placeholder
    }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const prices = await CryptoCompareService.getAllPrices();
        
        setTokens(prevTokens => prevTokens.map(token => ({
          ...token,
          price: prices[token.symbol] || 0
        })));
      } catch (error) {
        console.error("Error fetching token prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    // Refresh prices every 5 minutes
    const interval = setInterval(fetchPrices, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-bitaccess-black-light border-bitaccess-gold/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">Token Balances</CardTitle>
        <Wallet className="h-4 w-4 text-bitaccess-gold" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tokens.map((token) => (
            <div key={token.symbol} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img 
                  src={token.logo} 
                  alt={token.name}
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-300">{token.symbol}</span>
                  {loading ? (
                    <span className="text-xs text-gray-500">Loading...</span>
                  ) : (
                    <span className="text-xs text-gray-500">${token.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <span className="text-sm font-semibold text-white">{token.balance}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenBalances;
