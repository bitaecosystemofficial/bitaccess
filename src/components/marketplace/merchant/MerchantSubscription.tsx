
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar } from 'lucide-react';

const MerchantSubscription = () => {
  // Mock data - in a real app would come from a contract or API
  const subscriptionData = {
    plan: "Merchant",
    status: "Active",
    startDate: "2025-01-15",
    endDate: "2026-01-15",
    daysRemaining: 240
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Subscription Status</h2>
      
      <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20 mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Current Plan: {subscriptionData.plan}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-500">{subscriptionData.status}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Start Date:</span>
              <span>{subscriptionData.startDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">End Date:</span>
              <span>{subscriptionData.endDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Days Remaining:</span>
              <span>{subscriptionData.daysRemaining}</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
              <div 
                className="bg-bitaccess-gold h-2 rounded-full" 
                style={{ width: `${(subscriptionData.daysRemaining / 365) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex gap-4">
        <Button className="flex-1 bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90">
          <CreditCard className="mr-2 h-4 w-4" /> Extend Subscription
        </Button>
        <Button className="flex-1" variant="outline">
          <Calendar className="mr-2 h-4 w-4" /> View Payment History
        </Button>
      </div>
    </div>
  );
};

export default MerchantSubscription;
