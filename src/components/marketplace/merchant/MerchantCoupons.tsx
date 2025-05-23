
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const MerchantCoupons = () => {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Discount Coupons</h2>
        <Button className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90">
          <Plus className="mr-2 h-4 w-4" /> Create Coupon
        </Button>
      </div>
      
      <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20 mb-4">
        <CardContent className="p-6">
          <p className="text-center py-8 text-gray-400">
            No coupons created yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantCoupons;
