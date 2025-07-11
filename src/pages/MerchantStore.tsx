import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWallet } from '@/contexts/WalletContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ProductCard from '@/components/marketplace/ProductCard';
import { cn } from '@/lib/utils';
import { products } from '@/data/marketplaceData';
import { ChevronLeft, Store, Grid3X3, ListFilter, MessageSquare, Star } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface StoreParams {
  [key: string]: string | undefined;
  merchantId: string;
}

interface StoreReview {
  id: string;
  reviewer: string;
  rating: number;
  comment: string;
  date: Date;
}

const MerchantStore = () => {
  const { merchantId } = useParams<string>();
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter products to show only Bit Access Official Store items
  const bitAccessProducts = products.filter(product => product.seller.id === 's1');
  const productsPerPage = 8;
  const totalPages = Math.ceil(bitAccessProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = bitAccessProducts.slice(startIndex, endIndex);
  
  const [store, setStore] = useState({
    id: merchantId || 's1',
    name: 'Bit Access Official Store',
    owner: '0x123...456',
    description: 'Official Bit Access merchandise store featuring premium products for blockchain enthusiasts. Join 2025 and discover exclusive crypto gadgets, apparel, accessories, and educational materials.',
    rating: 4.9,
    reviewCount: 156,
    joinedDate: new Date(2024, 0, 15),
    coverImage: '/lovable-uploads/3b873eb5-0c9d-4a97-a3c4-7dc0afff9498.png',
    products: bitAccessProducts
  });

  const [reviews, setReviews] = useState<StoreReview[]>([
    {
      id: '1',
      reviewer: '0xabc...123',
      rating: 5,
      comment: 'Amazing quality products! The Bit Access merchandise exceeded my expectations. Fast shipping and excellent customer service.',
      date: new Date(2024, 11, 10)
    },
    {
      id: '2',
      reviewer: '0xdef...456',
      rating: 5,
      comment: 'Love the premium quality of the Bit Access products. The designs are stunning and materials are top-notch.',
      date: new Date(2024, 10, 22)
    },
    {
      id: '3',
      reviewer: '0xghi...789',
      rating: 4,
      comment: 'Great selection of blockchain-themed products. The wall clock is beautiful and the mugs are perfect for my office.',
      date: new Date(2024, 9, 15)
    }
  ]);

  return (
    <Layout>
      <div>
        {/* Store Cover Image */}
        <div 
          className="h-64 w-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${store.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="container px-4 h-full flex items-end pb-6 relative z-10">
            <Button 
              variant="outline" 
              className="absolute top-4 left-4 bg-black/50 text-white border-white/20"
              onClick={() => navigate('/marketplace')}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
          </div>
        </div>
        
        {/* Store Info */}
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <Avatar className="h-24 w-24 border-4 border-bitaccess-black -mt-16 mr-4 relative z-20">
              <AvatarFallback className="bg-bitaccess-gold text-black text-2xl">
                B
              </AvatarFallback>
            </Avatar>
            
            <div className="mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-center">
                <h1 className="text-2xl font-bold text-white">{store.name}</h1>
                <div className="flex items-center md:ml-4 mt-2 md:mt-0">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">{store.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-400">{store.reviewCount} reviews</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-400">
                    Joined {store.joinedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-gray-400 max-w-3xl">{store.description}</p>
            </div>

            {isConnected && (
              <div className="mt-4 md:mt-0 md:ml-auto flex">
                <Button className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Store
                </Button>
              </div>
            )}
          </div>
          
          <Tabs defaultValue="products" className="mt-8">
            <TabsList>
              <TabsTrigger value="products" className="flex gap-2">
                <Grid3X3 className="h-4 w-4" /> Products
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex gap-2">
                <Star className="h-4 w-4" /> Reviews
              </TabsTrigger>
              <TabsTrigger value="about" className="flex gap-2">
                <Store className="h-4 w-4" /> About
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Store Products ({bitAccessProducts.length} items)</h2>
                <Button variant="outline" className="flex items-center space-x-2">
                  <ListFilter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Card className="bg-bitaccess-black-light">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-2">{store.rating}</div>
                        <div className="flex justify-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`h-5 w-5 ${
                                star <= Math.round(store.rating)
                                  ? 'text-yellow-500 fill-yellow-500' 
                                  : 'text-gray-500'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-400">{store.reviewCount} reviews</div>
                      </div>
                      
                      <div className="mt-6 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          // Calculate percentage - in real app would use actual data
                          const percent = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 2 : 0;
                          
                          return (
                            <div key={rating} className="flex items-center">
                              <div className="flex items-center w-12">
                                <span>{rating}</span>
                                <Star className="h-3 w-3 ml-1 text-yellow-500 fill-yellow-500" />
                              </div>
                              <div className="w-full bg-gray-700 h-2 rounded-full mx-2">
                                <div 
                                  className="bg-yellow-500 h-2 rounded-full" 
                                  style={{ width: `${percent}%` }}
                                ></div>
                              </div>
                              <div className="w-8 text-right text-xs text-gray-400">{percent}%</div>
                            </div>
                          );
                        })}
                      </div>

                      {isConnected && (
                        <Button className="w-full mt-6 bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90">
                          Write a Review
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map(review => (
                        <div key={review.id} className="bg-bitaccess-black-light p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="bg-bitaccess-gold/20 text-bitaccess-gold text-xs">
                                  {review.reviewer[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-mono text-sm">{review.reviewer}</span>
                            </div>
                            <span className="text-sm text-gray-400">{review.date.toLocaleDateString()}</span>
                          </div>
                          <div className="flex mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? 'text-yellow-500 fill-yellow-500' 
                                    : 'text-gray-500'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-300">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-bitaccess-black-light p-6 rounded-lg text-center">
                      <p className="text-gray-400">No reviews yet</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-bitaccess-black-light">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Store Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Store Owner</p>
                        <p className="font-mono">{store.owner}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Joined</p>
                        <p>{store.joinedDate.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Products</p>
                        <p>{bitAccessProducts.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Response Rate</p>
                        <p>99% (typically responds within 2 hours)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-bitaccess-black-light">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Store Policies</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Shipping Time</p>
                        <p>1-2 business days</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Return Policy</p>
                        <p>Returns accepted within 30 days</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Payment Methods</p>
                        <p>USDT, BNB, BIT</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default MerchantStore;
