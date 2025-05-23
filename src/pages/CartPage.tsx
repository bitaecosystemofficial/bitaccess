
import React from 'react';
import Layout from '@/components/layout/Layout';
import ShoppingCart from '@/components/marketplace/ShoppingCart';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import WalletConnectPrompt from '@/components/ui/wallet-connect-prompt';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Connect Wallet to View Cart"
          description="Please connect your wallet to access your shopping cart"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mt-16">
        <div className="mb-6">
          <Link to="/marketplace" className="inline-flex items-center text-bitaccess-gold hover:text-bitaccess-gold/80 mb-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </Link>
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ShoppingCart />
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
