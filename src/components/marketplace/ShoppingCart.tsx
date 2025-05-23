
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShoppingCart: React.FC = () => {
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  if (cart.length === 0) {
    return (
      <div className="py-12 text-center">
        <ShoppingCart className="h-16 w-16 mx-auto text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Start shopping to add items to your cart</p>
        <Button 
          onClick={() => navigate('/marketplace')}
          className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">
          Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
        </h2>
        <Button
          variant="outline"
          className="text-gray-400 border-gray-700 hover:text-white flex items-center space-x-1"
          onClick={clearCart}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear Cart
        </Button>
      </div>

      <div className="space-y-1">
        {cart.map((item) => (
          <CartItem 
            key={item.product.id} 
            product={item.product} 
            quantity={item.quantity} 
          />
        ))}
      </div>

      <div className="mt-8 bg-bitaccess-black-light p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Subtotal:</span>
          <span className="text-white font-medium">{getTotalPrice()} USDT</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-400">Transaction Fee:</span>
          <span className="text-white font-medium">0.01 BNB</span>
        </div>
        <div className="border-t border-gray-700 my-2 pt-2 flex justify-between">
          <span className="text-white font-bold">Total:</span>
          <span className="text-bitaccess-gold font-bold text-lg">{getTotalPrice()} USDT + 0.01 BNB</span>
        </div>
        <Button 
          className="w-full mt-4 bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
          onClick={() => navigate('/marketplace/checkout')}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
