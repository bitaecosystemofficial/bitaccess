
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

export interface FilterOptions {
  type: string;
  timeRange: string;
  minAmount: string;
}

interface TransactionFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const TransactionFilters = ({ onFilterChange }: TransactionFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    type: "all",
    timeRange: "24h",
    minAmount: "",
  });
  
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-bitaccess-black p-4 rounded-lg border border-bitaccess-gold/20 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-white">Transaction Filters</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white border-bitaccess-gold/20"
        >
          <SlidersHorizontal size={16} className="mr-2" />
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Transaction Type</label>
              <Select 
                value={filters.type} 
                onValueChange={(value) => handleFilterChange("type", value)}
              >
                <SelectTrigger className="bg-bitaccess-black-light border-bitaccess-gold/20">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-bitaccess-black border-bitaccess-gold/20">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Time Range</label>
              <Select 
                value={filters.timeRange} 
                onValueChange={(value) => handleFilterChange("timeRange", value)}
              >
                <SelectTrigger className="bg-bitaccess-black-light border-bitaccess-gold/20">
                  <SelectValue placeholder="Last 24 hours" />
                </SelectTrigger>
                <SelectContent className="bg-bitaccess-black border-bitaccess-gold/20">
                  <SelectItem value="1h">Last 1 hour</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Min Amount</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.minAmount}
                  onChange={(e) => handleFilterChange("minAmount", e.target.value)}
                  className="bg-bitaccess-black-light border-bitaccess-gold/20 pl-8"
                />
                <Search size={16} className="absolute left-2.5 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;
