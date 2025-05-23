
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWallet } from '@/contexts/WalletContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ProductCard from '@/components/marketplace/ProductCard';
import { mapRange } from '@/lib/utils';
import { products } from '@/data/marketplaceData';
import { ChevronLeft, Store, Grid3X3, ListFilter, MessageSquare, Star } from 'lucide-react';

interface StoreParams {
  merchantId?: string;
}

interface StoreReview {
  id: string;
  reviewer: string;
  rating: number;
  comment: string;
  date: Date;
}

const MerchantStore = () => {
  const { merchantId } = useParams<StoreParams>();
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  
  const [store, setStore] = useState({
    id: merchantId || '0x123...456',
    name: 'Crypto Gadget Store',
    owner: '0x123...456',
    description: 'Premium crypto gadgets and accessories for blockchain enthusiasts. We offer hardware wallets, apparel, educational materials and more.',
    rating: 4.7,
    reviewCount: 24,
    joinedDate: new Date(2023, 5, 15),
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop',
    products: products.slice(0, 8)
  });
  
  const [reviews, setReviews] = useState<StoreReview[]>([
    {
      id: '1',
      reviewer: '0xabc...123',
      rating: 5,
      comment: 'Great products and fast shipping. The hardware wallet I bought works perfectly.',
      date: new Date(2023, 9, 10)
    },
    {
      id: '2',
      reviewer: '0xdef...456',
      rating: 4,
      comment: 'Good selection of items. Shipping was a bit slow but overall satisfied with my purchase.',
      date: new Date(2023, 8, 22)
    },
    {
      id: '3',
      reviewer: '0xghi...789',
      rating: 5,
      comment: 'Excellent customer service! They helped me choose the right product for my needs.',
      date: new Date(2023, 7, 15)
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
                {store.name.charAt(0)}
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
                <h2 className="text-xl font-semibold">Store Products</h2>
                <Button variant="outline" className="flex items-center space-x-2">
                  <ListFilter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {store.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
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
                        <p>{store.products.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Response Rate</p>
                        <p>98% (typically responds within 6 hours)</p>
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
                        <p>1-3 business days</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Return Policy</p>
                        <p>Returns accepted within 14 days</p>
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
