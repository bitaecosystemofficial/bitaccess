
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Package } from 'lucide-react';

const OrderHistory: React.FC = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="py-12 text-center">
        <Package className="h-16 w-16 mx-auto text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">No orders yet</h2>
        <p className="text-gray-400">
          You haven't made any purchases yet. Browse our marketplace to find products.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Your Order History</h2>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-bitaccess-black-light rounded-lg overflow-hidden border border-gray-700/50">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <ShoppingBag className="h-4 w-4 text-bitaccess-gold mr-2" />
                  <span className="font-medium text-white">Order #{order.id.slice(-6)}</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Placed {formatDistanceToNow(new Date(order.date), { addSuffix: true })}
                </div>
              </div>
              <Badge 
                className={
                  order.status === 'completed' 
                    ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30'
                }
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            
            <div className="divide-y divide-gray-700">
              {order.items.map((item) => (
                <div key={item.product.id} className="p-4 flex items-center">
                  <div className="h-12 w-12 flex-shrink-0 mr-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="h-full w-full object-cover rounded" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-white font-medium">{item.product.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {item.quantity} x {item.product.price} {item.product.currency}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-bitaccess-gold font-medium">
                      {item.product.price * item.quantity} {item.product.currency}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-bitaccess-black/50 text-right">
              <span className="text-gray-400 mr-2">Total:</span>
              <span className="text-bitaccess-gold font-bold">
                {order.total.toFixed(2)} USDT
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
