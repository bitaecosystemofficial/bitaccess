
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  ChevronLeft, 
  Store, 
  ArrowRight, 
  Star, 
  Filter, 
  SortAsc,
  ArrowUpDown
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { storeService } from '@/services/StoreService';

interface Merchant {
  id: string;
  name: string;
  logo?: string;
  category: string;
  description: string;
  rating: number;
  productsCount: number;
  joinedDate: Date;
}

const MerchantListing = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [filteredMerchants, setFilteredMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'digital', name: 'Digital Goods' },
    { id: 'services', name: 'Services' },
    { id: 'collectibles', name: 'NFTs & Collectibles' }
  ];

  // Mock fetch merchants
  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        // In a real app, this would use storeService.getRecentStores() or similar
        // For now, we'll use mock data
        const mockMerchants: Merchant[] = [
          {
            id: '0x1234...5678',
            name: 'Crypto Gadget Store',
            category: 'electronics',
            description: 'Premium crypto gadgets and hardware wallets',
            rating: 4.7,
            productsCount: 12,
            joinedDate: new Date(2023, 5, 15)
          },
          {
            id: '0x2345...6789',
            name: 'Blockchain Apparel',
            category: 'clothing',
            description: 'Stylish crypto-themed clothing and accessories',
            rating: 4.2,
            productsCount: 28,
            joinedDate: new Date(2023, 8, 22)
          },
          {
            id: '0x3456...7890',
            name: 'NFT Marketplace',
            category: 'collectibles',
            description: 'Unique digital collectibles and NFTs',
            rating: 4.5,
            productsCount: 150,
            joinedDate: new Date(2023, 3, 10)
          },
          {
            id: '0x4567...8901',
            name: 'DeFi Academy',
            category: 'services',
            description: 'Educational courses on DeFi and blockchain',
            rating: 4.9,
            productsCount: 8,
            joinedDate: new Date(2023, 7, 5)
          },
          {
            id: '0x5678...9012',
            name: 'Crypto Art Gallery',
            category: 'digital',
            description: 'Digital art from top blockchain artists',
            rating: 4.3,
            productsCount: 42,
            joinedDate: new Date(2023, 9, 18)
          }
        ];
        
        setMerchants(mockMerchants);
        setFilteredMerchants(mockMerchants);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching merchants:", error);
        toast({
          title: "Error",
          description: "Failed to load merchant listings.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    fetchMerchants();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let results = [...merchants];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      results = results.filter(merchant => merchant.category === selectedCategory);
    }
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(merchant => 
        merchant.name.toLowerCase().includes(query) || 
        merchant.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        results.sort((a, b) => b.joinedDate.getTime() - a.joinedDate.getTime());
        break;
      case 'products':
        results.sort((a, b) => b.productsCount - a.productsCount);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    setFilteredMerchants(results);
  }, [merchants, searchQuery, selectedCategory, sortBy]);

  return (
    <Layout>
      <div className="container px-4 py-12">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            className="mr-4"
            onClick={() => navigate('/marketplace')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Verified Merchants</h1>
            <p className="text-gray-400">Discover trusted stores in the BitAccess marketplace</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Search and Filters */}
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search merchants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-bitaccess-black border-bitaccess-gold/20"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full bg-bitaccess-black border-bitaccess-gold/20">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-bitaccess-black border-bitaccess-gold/20">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('rating')}>
                  Highest Rating
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('newest')}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('products')}>
                  Most Products
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name')}>
                  Alphabetical
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Merchants List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="bg-bitaccess-black-light animate-pulse h-32"></Card>
            ))}
          </div>
        ) : filteredMerchants.length > 0 ? (
          <div className="space-y-4">
            {filteredMerchants.map(merchant => (
              <Card 
                key={merchant.id} 
                className="bg-bitaccess-black-light hover:border-bitaccess-gold/30 transition-colors cursor-pointer"
                onClick={() => navigate(`/marketplace/merchant/${merchant.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarFallback className="bg-bitaccess-gold text-black text-xl">
                        {merchant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-lg font-semibold text-white">{merchant.name}</h2>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="mr-2">{merchant.rating}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-bitaccess-gold/20 text-bitaccess-gold">
                              {merchant.category.charAt(0).toUpperCase() + merchant.category.slice(1)}
                            </span>
                            <span className="mx-2 text-gray-500">•</span>
                            <span className="text-sm text-gray-400">
                              {merchant.productsCount} products
                            </span>
                            <span className="mx-2 text-gray-500">•</span>
                            <span className="text-sm text-gray-400">
                              Joined {merchant.joinedDate.toLocaleDateString(undefined, {
                                year: 'numeric', month: 'short'
                              })}
                            </span>
                          </div>
                          <p className="text-gray-400 mt-2">{merchant.description}</p>
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="ml-4 bg-bitaccess-gold/20 text-bitaccess-gold hover:bg-bitaccess-gold/30"
                        >
                          Visit Store <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-bitaccess-black-light">
            <CardContent className="py-12 flex flex-col items-center">
              <Store className="h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No merchants found</h3>
              <p className="text-gray-400 mb-6 text-center">
                Try changing your search criteria or check back later for new merchants.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MerchantListing;
