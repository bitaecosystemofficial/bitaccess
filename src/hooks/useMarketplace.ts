
import { useState, useEffect } from "react";
import { marketplaceService } from "@/services/MarketplaceService";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";

export const useMarketplace = () => {
  const { isConnected, address } = useWallet();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPurchases, setUserPurchases] = useState<number[]>([]);

  useEffect(() => {
    const fetchMarketplaceData = async () => {
      setIsLoading(true);
      try {
        // Get categories
        const fetchedCategories = await marketplaceService.getCategories();
        setCategories(fetchedCategories);
        
        // Fetch product IDs (this would need to be paginated in a real application)
        const productCount = await marketplaceService.getProductCount();
        const fetchedProducts = [];
        
        for (let i = 1; i <= Math.min(productCount, 20); i++) {
          try {
            const product = await marketplaceService.getProduct(i);
            fetchedProducts.push(product);
          } catch (error) {
            console.error(`Error fetching product ${i}:`, error);
          }
        }
        
        setProducts(fetchedProducts);
        
        // Get user purchases if connected
        if (isConnected && address) {
          const purchases = await marketplaceService.getUserPurchases(address);
          setUserPurchases(purchases);
        }
        
      } catch (error) {
        console.error("Error fetching marketplace data:", error);
        toast({
          title: "Error",
          description: "Failed to load marketplace data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMarketplaceData();
    
    // Subscribe to marketplace events
    const subscribeToEvents = async () => {
      await marketplaceService.subscribeToMarketplaceEvents((event) => {
        console.log("Marketplace event:", event);
        // Handle real-time updates here
        if (event.event === "ProductListed") {
          // Refresh products when a new one is listed
          fetchMarketplaceData();
        }
      });
    };
    
    subscribeToEvents();
    
    return () => {
      marketplaceService.cleanup();
    };
  }, [isConnected, address]);
  
  const purchaseProduct = async (productId: number, quantity: number) => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to make a purchase",
        variant: "destructive",
      });
      return { success: false };
    }
    
    try {
      setIsLoading(true);
      const receipt = await marketplaceService.purchaseProduct(productId, quantity);
      
      toast({
        title: "Purchase Successful",
        description: "Your purchase has been completed successfully",
      });
      
      // Update user purchases
      setUserPurchases(prev => [...prev, productId]);
      
      return { success: true, receipt };
    } catch (error: any) {
      console.error("Error purchasing product:", error);
      toast({
        title: "Purchase Failed",
        description: error.message || "Failed to complete your purchase",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  const listProduct = async (
    name: string,
    description: string,
    price: string,
    categoryId: number,
    stock: number
  ) => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to list a product",
        variant: "destructive",
      });
      return { success: false };
    }
    
    try {
      setIsLoading(true);
      const receipt = await marketplaceService.listProduct(
        name,
        description,
        price,
        categoryId,
        stock
      );
      
      toast({
        title: "Product Listed",
        description: "Your product has been listed successfully",
      });
      
      return { success: true, receipt };
    } catch (error: any) {
      console.error("Error listing product:", error);
      toast({
        title: "Listing Failed",
        description: error.message || "Failed to list your product",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    products,
    categories,
    isLoading,
    userPurchases,
    purchaseProduct,
    listProduct,
    hasPurchased: (productId: number) => userPurchases.includes(productId)
  };
};
