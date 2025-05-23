
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MerchantOrders = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Customer Orders</h2>
      
      <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20 mb-4">
        <CardContent className="p-6">
          <p className="text-center py-8 text-gray-400">
            No orders received yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantOrders;
