
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const CartIndicator: React.FC = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const itemCount = getTotalItems();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative border-gray-700 hover:border-bitaccess-gold mr-2"
      onClick={() => navigate('/marketplace/cart')}
    >
      <ShoppingCart className="h-5 w-5 text-gray-300" />
      {itemCount > 0 && (
        <Badge className="absolute -top-2 -right-2 px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full bg-bitaccess-gold text-black text-xs">
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};

export default CartIndicator;
