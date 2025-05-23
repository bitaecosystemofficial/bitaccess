
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterOptions, SortOption, Category } from '@/types/marketplace';

interface MarketplaceFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  maxPriceLimit: number;
  allCategories: Category[];
}

const MarketplaceFilters: React.FC<MarketplaceFiltersProps> = ({
  filters,
  onFilterChange,
  maxPriceLimit,
  allCategories
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleSortChange = (value: SortOption) => {
    onFilterChange({ ...filters, sortBy: value });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filters, category: value === "all" ? null : value });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1] || maxPriceLimit
    });
  };

  const handleReset = () => {
    onFilterChange({
      category: null,
      minPrice: 0,
      maxPrice: maxPriceLimit,
      sortBy: 'newest',
      searchQuery: ''
    });
  };

  return (
    <div className="space-y-6 p-4 bg-bitaccess-black-light rounded-lg border border-bitaccess-gold/10">
      <div>
        <Label htmlFor="search" className="text-white mb-2 block">Search</Label>
        <Input
          id="search"
          placeholder="Search products..."
          value={filters.searchQuery}
          onChange={handleSearchChange}
          className="bg-bitaccess-black border-bitaccess-gold/20"
        />
      </div>

      <div>
        <Label htmlFor="category" className="text-white mb-2 block">Category</Label>
        <Select
          value={filters.category || "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger id="category" className="bg-bitaccess-black border-bitaccess-gold/20">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {allCategories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="sort" className="text-white mb-2 block">Sort By</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleSortChange(value as SortOption)}
        >
          <SelectTrigger id="sort" className="bg-bitaccess-black border-bitaccess-gold/20">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <Label htmlFor="price-range" className="text-white">Price Range</Label>
          <span className="text-sm text-gray-400">
            {filters.minPrice} - {filters.maxPrice} USDT
          </span>
        </div>
        <Slider
          id="price-range"
          defaultValue={[filters.minPrice, filters.maxPrice]}
          max={maxPriceLimit}
          step={5}
          onValueChange={handlePriceChange}
          className="my-6"
        />
      </div>

      <Button 
        onClick={handleReset} 
        variant="outline" 
        className="w-full border-bitaccess-gold/30 text-bitaccess-gold"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default MarketplaceFilters;
