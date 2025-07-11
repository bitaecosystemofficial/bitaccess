
import { useState } from "react";
import { ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

// Enhanced mock price data with more data points for a smoother chart
const mockPriceData = [
  { date: "2023-01-01", price: 0.000020 },
  { date: "2023-01-15", price: 0.000022 },
  { date: "2023-02-01", price: 0.000025 },
  { date: "2023-02-15", price: 0.000024 },
  { date: "2023-03-01", price: 0.000022 },
  { date: "2023-03-15", price: 0.000025 },
  { date: "2023-04-01", price: 0.000027 },
  { date: "2023-04-15", price: 0.000030 },
  { date: "2023-05-01", price: 0.000034 },
  { date: "2023-05-15", price: 0.000032 },
  { date: "2023-06-01", price: 0.000030 },
  { date: "2023-06-15", price: 0.000028 },
  { date: "2023-07-01", price: 0.000029 },
  { date: "2023-07-15", price: 0.000030 },
  { date: "2023-08-01", price: 0.000032 },
  { date: "2023-08-15", price: 0.000034 },
  { date: "2023-09-01", price: 0.000035 },
  { date: "2023-09-15", price: 0.000037 },
  { date: "2023-10-01", price: 0.000039 },
  { date: "2023-10-15", price: 0.000041 },
  { date: "2023-11-01", price: 0.000042 },
  { date: "2023-11-15", price: 0.000040 },
  { date: "2023-12-01", price: 0.000038 },
  { date: "2023-12-15", price: 0.000041 },
  { date: "2024-01-01", price: 0.000041 },
  { date: "2024-01-15", price: 0.000043 },
  { date: "2024-02-01", price: 0.000045 },
  { date: "2024-02-15", price: 0.000047 },
  { date: "2024-03-01", price: 0.000049 },
  { date: "2024-03-15", price: 0.000051 },
  { date: "2024-04-01", price: 0.000053 },
  { date: "2024-04-15", price: 0.000051 },
  { date: "2024-05-01", price: 0.000050 },
  { date: "2024-05-14", price: 0.000053 }
];

type TimeRange = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "All";

const PriceChart = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("3M");
  
  // Filter data based on selected range with more precise calculations
  const getFilteredData = () => {
    const now = new Date();
    let filterDate = new Date();
    
    switch(selectedRange) {
      case "1D":
        filterDate.setDate(now.getDate() - 1);
        break;
      case "1W":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "1M":
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case "3M":
        filterDate.setMonth(now.getMonth() - 3);
        break;
      case "6M":
        filterDate.setMonth(now.getMonth() - 6);
        break;
      case "1Y":
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      case "All":
      default:
        return mockPriceData;
    }
    
    return mockPriceData.filter(item => new Date(item.date) >= filterDate);
  };
  
  const filteredData = getFilteredData();
  
  // Calculate current price and percentage change more accurately
  const currentPrice = mockPriceData[mockPriceData.length - 1].price;
  const previousPrice = mockPriceData[mockPriceData.length - 2].price;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isPriceUp = priceChange >= 0;

  // Enhanced custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
      return (
        <div className="bg-bitaccess-black p-3 border border-bitaccess-gold/30 rounded-lg shadow-lg">
          <p className="text-gray-400 text-xs mb-1">{formattedDate}</p>
          <p className="text-white font-medium text-sm">${payload[0].value.toFixed(9)}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Price Chart</h3>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold text-white mr-2">
              ${currentPrice.toFixed(9)}
            </span>
            <span className={`text-sm font-medium ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
              {isPriceUp ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {(['1D', '1W', '1M', '3M', '6M', '1Y', 'All'] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={selectedRange === range ? "default" : "outline"}
              size="sm"
              className={selectedRange === range 
                ? "bg-bitaccess-gold text-bitaccess-black hover:bg-bitaccess-gold-dark" 
                : "border-gray-600 text-gray-400 hover:bg-bitaccess-gold/10 hover:text-bitaccess-gold"
              }
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Full width container with increased height */}
      <div className="w-full -mx-6">
        <div className="px-6">
          <ChartContainer
            className="h-96"
            config={{
              price: {
                theme: {
                  light: "#F9D975",
                  dark: "#F9D975"
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }} 
                  tick={{ fill: "#A0AEC0" }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => `$${value.toFixed(9)}`} 
                  tick={{ fill: "#A0AEC0" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  name="price"
                  stroke="url(#goldGradient)" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 8, stroke: "#F9D975", fill: "#F9D975" }} 
                />
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F9D975" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#F9D975" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
