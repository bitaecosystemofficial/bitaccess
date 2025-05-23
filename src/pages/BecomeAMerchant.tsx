
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { useMembership } from '@/contexts/MembershipContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertCircle, Store, ShieldCheck, Clock, Coins } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MembershipType } from '@/contexts/MembershipContext';
import WalletConnectPrompt from '@/components/ui/wallet-connect-prompt';

const BecomeAMerchant = () => {
  const navigate = useNavigate();
  const { isConnected, address } = useWallet();
  const { membershipData, isLoading, subscribe } = useMembership();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [referrer, setReferrer] = useState('');
  const { toast } = useToast();
  
  // Redirect to merchant dashboard if already a merchant
  useEffect(() => {
    if (membershipData?.isActive && membershipData.type === MembershipType.Merchant) {
      navigate('/marketplace/merchant/dashboard');
    }
  }, [membershipData, navigate]);

  const handleOpenSubscriptionDialog = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to become a merchant",
        variant: "destructive",
      });
      return;
    }
    
    setIsDialogOpen(true);
  };

  const handleSubscribe = async () => {
    try {
      setIsProcessing(true);
      const success = await subscribe(MembershipType.Merchant, referrer || undefined);
      
      if (success) {
        toast({
          title: "Subscription Successful",
          description: "You are now a merchant! Redirecting to merchant dashboard.",
        });
        setTimeout(() => navigate('/marketplace/merchant/dashboard'), 2000);
      } else {
        toast({
          title: "Subscription Failed",
          description: "There was an error processing your subscription.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setIsDialogOpen(false);
    }
  };

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Merchant Access Required"
          description="Please connect your wallet to become a merchant"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-12 mt-16">
        <h1 className="text-3xl font-bold mb-2 bg-gold-gradient text-transparent bg-clip-text">
          Become a Merchant
        </h1>
        <p className="text-gray-400 mb-8">
          Join the BitAccess Marketplace and start selling your products to our community.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-gray-700 bg-bitaccess-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5 text-bitaccess-gold" />
                Merchant Membership
              </CardTitle>
              <CardDescription>
                Everything you need to start selling on our marketplace
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-bitaccess-gold">
                  0.02 BNB
                </span>
                <span className="text-gray-400 ml-1">/6 months</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center p-3 bg-yellow-900/20 text-yellow-500 rounded-md mb-4">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p className="text-sm">Requires minimum 1,000,000 BIT tokens in your wallet</p>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5 text-bitaccess-gold" />
                    <span className="text-gray-300 text-sm">10 Product Listing Credits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5 text-bitaccess-gold" />
                    <span className="text-gray-300 text-sm">Customizable Merchant Store</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5 text-bitaccess-gold" />
                    <span className="text-gray-300 text-sm">Merchant Dashboard with Order Management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5 text-bitaccess-gold" />
                    <span className="text-gray-300 text-sm">Customer Messaging System</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5 text-bitaccess-gold" />
                    <span className="text-gray-300 text-sm">Promotional Tools and Coupons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5 text-bitaccess-gold" />
                    <span className="text-gray-300 text-sm">NFT Minting Capability for Products</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-bitaccess-black"
                onClick={handleOpenSubscriptionDialog}
                disabled={isLoading || membershipData?.type === MembershipType.Merchant}
              >
                {membershipData?.type === MembershipType.Merchant
                  ? "Already a Merchant"
                  : isLoading
                  ? "Loading..."
                  : "Subscribe as Merchant"}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <Card className="border-gray-700 bg-bitaccess-black">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-bitaccess-gold" />
                  Why Become a Merchant?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  As a BitAccess Merchant, you'll gain access to our growing community of crypto enthusiasts
                  and blockchain users. Sell physical products, digital goods, or services directly to our users.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-bitaccess-black-light p-4 rounded-md">
                    <h3 className="font-medium text-bitaccess-gold mb-2">Global Reach</h3>
                    <p className="text-sm text-gray-400">Access customers worldwide with cryptocurrency payments</p>
                  </div>
                  
                  <div className="bg-bitaccess-black-light p-4 rounded-md">
                    <h3 className="font-medium text-bitaccess-gold mb-2">Low Fees</h3>
                    <p className="text-sm text-gray-400">Competitive marketplace fees compared to traditional platforms</p>
                  </div>
                  
                  <div className="bg-bitaccess-black-light p-4 rounded-md">
                    <h3 className="font-medium text-bitaccess-gold mb-2">Community Promotion</h3>
                    <p className="text-sm text-gray-400">Featured merchants get additional visibility in our ecosystem</p>
                  </div>
                  
                  <div className="bg-bitaccess-black-light p-4 rounded-md">
                    <h3 className="font-medium text-bitaccess-gold mb-2">Blockchain Benefits</h3>
                    <p className="text-sm text-gray-400">Leverage NFTs for product authenticity and ownership verification</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-700 bg-bitaccess-black">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-bitaccess-gold" />
                  Merchant Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Coins className="w-5 h-5 mt-0.5 text-bitaccess-gold" />
                    <div>
                      <p className="text-gray-300">Hold at least 1,000,000 BIT Tokens</p>
                      <p className="text-xs text-gray-500">Tokens must remain in your wallet during your subscription period</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5 text-bitaccess-gold" />
                    <div>
                      <p className="text-gray-300">Pay 0.02 BNB subscription fee</p>
                      <p className="text-xs text-gray-500">For a 6-month merchant membership period</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5 text-bitaccess-gold" />
                    <div>
                      <p className="text-gray-300">Complete merchant verification</p>
                      <p className="text-xs text-gray-500">Basic verification happens automatically with subscription</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Subscription Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-bitaccess-black border-gray-700 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subscribe as Merchant</DialogTitle>
            <DialogDescription>
              Complete your merchant subscription to start selling on our marketplace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center p-3 bg-yellow-900/20 text-yellow-500 rounded-md mb-2">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">Please ensure you have at least 1,000,000 BIT tokens and 0.02 BNB in your wallet.</p>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-4">
                <Label htmlFor="referrer" className="text-gray-400">Referrer Address (Optional)</Label>
                <Input
                  id="referrer"
                  placeholder="0x..."
                  className="bg-bitaccess-black-light border-gray-700"
                  value={referrer}
                  onChange={(e) => setReferrer(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-sm text-gray-400">
                By subscribing, you agree to our marketplace terms and conditions. Your subscription will be active for 6 months.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button 
              className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-bitaccess-black"
              onClick={handleSubscribe}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Subscribe Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default BecomeAMerchant;
