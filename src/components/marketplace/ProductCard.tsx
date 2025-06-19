
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/marketplace';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to add items to cart",
        variant: "destructive",
      });
      return;
    }

    addToCart(product);
  };

  const calculateFinalPrice = () => {
    if (product.discountPercentage) {
      const discount = product.price * (product.discountPercentage / 100);
      return product.price - discount;
    }
    return product.price;
  };

  const calculateFinalUsdtPrice = () => {
    if (product.discountPercentage) {
      const discount = product.usdtPrice * (product.discountPercentage / 100);
      return product.usdtPrice - discount;
    }
    return product.usdtPrice;
  };

  const formatPrice = (price: number) => {
    return `${product.currency} ${price.toFixed(2)}`;
  };

  const formatUsdtPrice = (price: number) => {
    return `${price.toFixed(2)} USDT`;
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:border-bitaccess-gold/30 transition-colors duration-200">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-bitaccess-gold text-black">
            Featured
          </Badge>
        )}
        {product.discountPercentage && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            {product.discountPercentage}% OFF
          </Badge>
        )}
      </div>
      
      <CardContent className="pt-4 pb-2 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <Badge variant="outline" className="ml-2 shrink-0">
            {product.category}
          </Badge>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2 mb-2">
          {product.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" />
            <span>{product.seller.rating}</span>
          </div>
          <span className="mx-2">•</span>
          <span>{product.seller.name}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 flex justify-between items-center">
        <div className="flex flex-col">
          {product.discountPercentage ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-bitaccess-gold">
                  {formatPrice(calculateFinalPrice())}
                </span>
                <span className="text-sm font-medium text-green-400">
                  {formatUsdtPrice(calculateFinalUsdtPrice())}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  {formatUsdtPrice(product.usdtPrice)}
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-bitaccess-gold">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm font-medium text-green-400">
                {formatUsdtPrice(product.usdtPrice)}
              </span>
            </div>
          )}
        </div>
        
        <Button 
          size="sm"
          onClick={handleAddToCart}
          className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
