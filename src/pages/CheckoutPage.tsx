
import React from 'react';
import Layout from '@/components/layout/Layout';
import CheckoutForm from '@/components/marketplace/CheckoutForm';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import WalletConnectPrompt from '@/components/ui/wallet-connect-prompt';
import { useCart } from '@/contexts/CartContext';

const CheckoutPage: React.FC = () => {
  const { isConnected } = useWallet();
  const { cart } = useCart();

  if (!isConnected) {
    return (
      <Layout>
        <WalletConnectPrompt 
          title="Connect Wallet to Checkout"
          description="Please connect your wallet to complete your purchase"
        />
      </Layout>
    );
  }

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container px-4 py-8 mt-16">
          <div className="mb-6">
            <Link to="/marketplace" className="inline-flex items-center text-bitaccess-gold hover:text-bitaccess-gold/80 mb-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Marketplace
            </Link>
            <h1 className="text-3xl font-bold text-white">Checkout</h1>
          </div>
          
          <div className="max-w-4xl mx-auto py-12 text-center">
            <h2 className="text-xl text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Add some products to your cart before proceeding to checkout.</p>
            <Link to="/marketplace">
              <button className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black px-4 py-2 rounded">
                Go to Marketplace
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mt-16">
        <div className="mb-6">
          <Link to="/marketplace/cart" className="inline-flex items-center text-bitaccess-gold hover:text-bitaccess-gold/80 mb-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <CheckoutForm />
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
