
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MerchantInbox = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Messages</h2>
      
      <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20 mb-4">
        <CardContent className="p-6">
          <p className="text-center py-8 text-gray-400">
            No messages in your inbox.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantInbox;
