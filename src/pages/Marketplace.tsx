
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/marketplace/ProductCard';
import CategoryCard from '@/components/marketplace/CategoryCard';
import MarketplaceFilters from '@/components/marketplace/MarketplaceFilters';
import { products, categories } from '@/data/marketplaceData';
import { FilterOptions, Product } from '@/types/marketplace';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Package } from 'lucide-react';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [filters, setFilters] = useState<FilterOptions>({
    category: initialCategory,
    minPrice: 0,
    maxPrice: 1500, // This should be dynamic based on your product range
    sortBy: 'newest',
    searchQuery: ''
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Update URL when category changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) {
      params.set('category', filters.category);
    }
    setSearchParams(params);
  }, [filters.category, setSearchParams]);

  // Filter products based on current filters
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Filter by price range
    result = result.filter(product => 
      product.price >= filters.minPrice && 
      product.price <= filters.maxPrice
    );

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort products
    switch(filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.seller.rating - a.seller.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredProducts(result);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleCategoryClick = (categoryId: string | null) => {
    setFilters({ ...filters, category: categoryId });
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <Layout>
      <div className="container px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
            <p className="text-gray-400">Browse and purchase products with cryptocurrency</p>
          </div>
          
          {/* Mobile search and filter buttons */}
          <div className="flex space-x-2 md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              className="border-bitaccess-gold/30"
              onClick={toggleMobileFilters}
            >
              <Package className="h-4 w-4 text-bitaccess-gold" />
            </Button>
            <div className="relative w-full">
              <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange({...filters, searchQuery: e.target.value})}
                className="pl-9 bg-bitaccess-black border-bitaccess-gold/20"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div 
              className={`
                p-4 border rounded-lg text-center cursor-pointer transition-colors
                ${filters.category === null
                  ? 'border-bitaccess-gold bg-bitaccess-gold/10' 
                  : 'border-bitaccess-gold/10 hover:bg-bitaccess-black-light'}
              `}
              onClick={() => handleCategoryClick(null)}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-bitaccess-gold/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-bitaccess-gold/80" />
              </div>
              <h3 className={filters.category === null ? 'text-bitaccess-gold' : 'text-white'}>All Items</h3>
              <p className="text-sm text-gray-400 mt-1">{products.length} items</p>
            </div>

            {categories.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                isActive={filters.category === category.id}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-72 shrink-0">
            <MarketplaceFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              maxPriceLimit={1500}
            />
          </div>

          {/* Filters - Mobile (collapsible) */}
          <div className={`
            md:hidden w-full 
            ${mobileFiltersOpen ? 'block' : 'hidden'}
          `}>
            <MarketplaceFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              maxPriceLimit={1500}
            />
          </div>

          {/* Products */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl text-white">No products found</h3>
                <p className="text-gray-400 mt-2">Try adjusting your filters</p>
                <Button 
                  onClick={() => handleFilterChange({
                    category: null,
                    minPrice: 0,
                    maxPrice: 1500,
                    sortBy: 'newest',
                    searchQuery: ''
                  })}
                  className="mt-4 bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;
