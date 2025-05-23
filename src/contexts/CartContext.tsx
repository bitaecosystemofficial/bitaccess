
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "@/types/marketplace";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartOrder {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'completed' | 'processing' | 'canceled';
}

interface CartContextType {
  cart: CartItem[];
  orders: CartOrder[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  checkout: () => Promise<boolean>;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  orders: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  checkout: async () => false,
});

const CART_STORAGE_KEY = "bitaccess-cart";
const ORDERS_STORAGE_KEY = "bitaccess-orders";

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<CartOrder[]>([]);
  const { address } = useWallet();
  const { toast } = useToast();

  // Load cart from localStorage when component mounts and wallet changes
  useEffect(() => {
    if (address) {
      const savedCart = localStorage.getItem(`${CART_STORAGE_KEY}-${address}`);
      const savedOrders = localStorage.getItem(`${ORDERS_STORAGE_KEY}-${address}`);
      
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage:", e);
        }
      }
      
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (e) {
          console.error("Failed to parse orders from localStorage:", e);
        }
      }
    } else {
      // Clear cart when wallet disconnects
      setCart([]);
      setOrders([]);
    }
  }, [address]);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (address) {
      localStorage.setItem(`${CART_STORAGE_KEY}-${address}`, JSON.stringify(cart));
    }
  }, [cart, address]);

  // Save orders to localStorage when they change
  useEffect(() => {
    if (address) {
      localStorage.setItem(`${ORDERS_STORAGE_KEY}-${address}`, JSON.stringify(orders));
    }
  }, [orders, address]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product already in cart, increase quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        // Add new product to cart
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discountPercentage 
        ? item.product.price * (1 - item.product.discountPercentage / 100) 
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const checkout = async () => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to checkout",
        variant: "destructive",
      });
      return false;
    }
    
    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // In a real app, this would make blockchain transactions
      // For now, we'll simulate a successful checkout
      const newOrder: CartOrder = {
        id: `order-${Date.now()}`,
        items: [...cart],
        total: getTotalPrice(),
        date: new Date(),
        status: 'completed'
      };
      
      setOrders((prevOrders) => [...prevOrders, newOrder]);
      clearCart();
      
      toast({
        title: "Order completed!",
        description: `Your order #${newOrder.id} has been placed successfully`,
      });
      
      return true;
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
