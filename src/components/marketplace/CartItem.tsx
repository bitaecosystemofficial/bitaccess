
import React from 'react';
import { Product } from '@/types/marketplace';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const calculatePrice = () => {
    if (product.discountPercentage) {
      const discount = product.price * (product.discountPercentage / 100);
      return (product.price - discount) * quantity;
    }
    return product.price * quantity;
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-700">
      <div className="flex-shrink-0 h-16 w-16 mr-3">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-sm font-medium text-white">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-1">
          {product.discountPercentage ? (
            <span>
              <span className="text-bitaccess-gold">
                {product.price * (1 - product.discountPercentage / 100)} {product.currency}
              </span>
              {' '}
              <span className="line-through">
                {product.price} {product.currency}
              </span>
            </span>
          ) : (
            <span className="text-bitaccess-gold">{product.price} {product.currency}</span>
          )}
        </p>
      </div>
      
      <div className="flex items-center mr-3">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 text-gray-400 border-gray-700 hover:text-white"
          onClick={() => updateQuantity(product.id, quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-8 text-center text-sm">{quantity}</span>
        
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 text-gray-400 border-gray-700 hover:text-white"
          onClick={() => updateQuantity(product.id, quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="text-right w-24">
        <div className="font-medium text-white">
          {calculatePrice()} {product.currency}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-400 hover:text-red-400 -mr-2"
          onClick={() => removeFromCart(product.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
