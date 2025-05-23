
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';

const CheckoutForm: React.FC = () => {
  const { cart, getTotalPrice, checkout } = useCart();
  const { address } = useWallet();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const success = await checkout();
      
      if (success) {
        setIsCompleted(true);
        setTimeout(() => {
          navigate('/marketplace/orders');
        }, 3000);
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsProcessing(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="py-12 text-center">
        <div className="bg-green-900/20 rounded-full p-4 inline-flex mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Order Completed!</h2>
        <p className="text-gray-400 mb-6">Your purchase has been processed successfully.</p>
        <p className="text-gray-400 mb-8">You will be redirected to your orders page shortly.</p>
        <Button 
          onClick={() => navigate('/marketplace/orders')}
          className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
        >
          View Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Shipping Information</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              className="bg-bitaccess-black-light border-gray-700"
              value={shippingInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="bg-bitaccess-black-light border-gray-700"
              value={shippingInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="address">Shipping Address</Label>
            <Textarea
              id="address"
              name="address"
              className="bg-bitaccess-black-light border-gray-700"
              value={shippingInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              className="bg-bitaccess-black-light border-gray-700"
              value={shippingInfo.notes}
              onChange={handleInputChange}
              placeholder="Additional information for delivery"
            />
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
              disabled={isProcessing || cart.length === 0}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Complete Purchase (${getTotalPrice()} USDT)`
              )}
            </Button>
          </div>
        </form>
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
        
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div key={item.product.id} className="flex border-b border-gray-700 pb-4">
              <img 
                src={item.product.image} 
                alt={item.product.name} 
                className="h-16 w-16 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-white font-medium">{item.product.name}</h3>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-400">Qty: {item.quantity}</span>
                  <span className="text-bitaccess-gold">
                    {item.product.price * item.quantity} {item.product.currency}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-bitaccess-black-light rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Subtotal:</span>
            <span className="text-white">{getTotalPrice()} USDT</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Transaction Fee:</span>
            <span className="text-white">0.01 BNB</span>
          </div>
          <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between">
            <span className="text-white font-bold">Total:</span>
            <span className="text-bitaccess-gold font-bold">
              {getTotalPrice()} USDT + 0.01 BNB
            </span>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
          <h3 className="font-medium text-white mb-2">Payment Information</h3>
          <p className="text-sm text-gray-400 mb-2">
            Payment will be processed securely through your connected wallet.
          </p>
          <div className="flex items-center text-gray-300 text-sm">
            <span className="bg-gray-700 rounded px-2 py-1 font-mono">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '0x0000...0000'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
