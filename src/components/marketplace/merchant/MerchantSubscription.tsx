
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useMemberSubscription } from '@/hooks/useMemberSubscription';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

interface MerchantSubscriptionProps {
  onSubscriptionComplete?: () => void;
}

const MerchantSubscription: React.FC<MerchantSubscriptionProps> = ({
  onSubscriptionComplete
}) => {
  const { toast } = useToast();
  const { balance } = useWallet();
  const { subscribeToMembership, isProcessing } = useMemberSubscription();
  const [showDialog, setShowDialog] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  
  // Mock token balance check (in a real app, this would check the actual token balance)
  const hasEnoughTokens = balance >= 1000000;
  
  const handleSubscribe = async () => {
    setShowDialog(true);
    setProcessingStatus('processing');
    
    try {
      const result = await subscribeToMembership('Merchant');
      
      if (result.success) {
        setProcessingStatus('success');
        toast({
          title: "Subscription Successful",
          description: "Your merchant account has been activated.",
        });
        
        setTimeout(() => {
          setShowDialog(false);
          if (onSubscriptionComplete) {
            onSubscriptionComplete();
          }
        }, 3000);
      } else {
        setProcessingStatus('error');
        toast({
          title: "Subscription Failed",
          description: result.error || "Failed to complete your subscription. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setProcessingStatus('error');
      toast({
        title: "Subscription Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setProcessingStatus('idle');
  };

  return (
    <div>
      <Card className="overflow-hidden border border-bitaccess-gold/30">
        <CardHeader className="bg-gradient-to-r from-bitaccess-gold/20 to-bitaccess-black-light">
          <CardTitle className="text-center text-xl">Merchant Subscription</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold mr-2 text-bitaccess-gold">0.02 BNB</span>
              <span className="text-gray-400">/ 6 months</span>
            </div>
            <p className="text-center text-gray-400 mt-1">Plus 1,000,000 BIT tokens minimum hold</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              <span>6 Months Subscription</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              <span>10 Product Listings Credits</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              <span>Customer Messaging System</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              <span>Discount Coupon Creation</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              <span>Product NFT Minting Option</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              <span>Order Management System</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              <span>Public Store Profile</span>
            </div>
          </div>
          
          {/* Token requirement status */}
          <div className={`p-3 rounded-lg mb-4 flex items-center ${hasEnoughTokens ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            {hasEnoughTokens ? (
              <>
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                <span className="text-sm">You have the required 1,000,000 BIT tokens</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                <span className="text-sm text-red-500">
                  You need 1,000,000 BIT tokens (current balance: {balance.toLocaleString()})
                </span>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-bitaccess-black-light p-6 flex flex-col">
          <Button 
            className="w-full bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
            disabled={isProcessing || !hasEnoughTokens}
            onClick={handleSubscribe}
          >
            {isProcessing ? "Processing..." : "Subscribe Now"}
          </Button>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Subscription fee: 0.02 BNB (~$10 USD)
          </p>
        </CardFooter>
      </Card>
      
      {/* Processing Dialog */}
      <Dialog open={showDialog} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {processingStatus === 'processing' && 'Processing Subscription'}
              {processingStatus === 'success' && 'Subscription Complete'}
              {processingStatus === 'error' && 'Subscription Failed'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-6 text-center">
            {processingStatus === 'processing' && (
              <>
                <div className="h-16 w-16 rounded-full border-4 border-t-bitaccess-gold border-bitaccess-black animate-spin mb-4"></div>
                <DialogDescription>
                  Please confirm the transaction in your wallet and wait for it to be processed...
                </DialogDescription>
              </>
            )}
            
            {processingStatus === 'success' && (
              <>
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <DialogDescription>
                  Your merchant subscription has been activated successfully! You can now access the merchant dashboard.
                </DialogDescription>
              </>
            )}
            
            {processingStatus === 'error' && (
              <>
                <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                  <X className="h-10 w-10 text-red-500" />
                </div>
                <DialogDescription>
                  There was an error processing your subscription. Please try again or contact support.
                </DialogDescription>
              </>
            )}
          </div>
          
          <DialogFooter>
            {processingStatus !== 'processing' && (
              <Button onClick={closeDialog}>
                {processingStatus === 'success' ? 'Continue' : 'Close'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MerchantSubscription;
