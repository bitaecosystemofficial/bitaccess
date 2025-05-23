
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useMarketplace } from '@/hooks/useMarketplace';

interface MerchantProductsProps {
  availableCredits: number;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  image: string;
}

const MerchantProducts: React.FC<MerchantProductsProps> = ({ availableCredits }) => {
  const { toast } = useToast();
  const { listProduct, categories } = useMarketplace();
  
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '1',
    image: 'https://via.placeholder.com/300x200'
  });

  // Mock products for demo
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Crypto Hardware Wallet',
      category: 'hardware',
      price: '99.99',
      stock: 15,
      active: true,
      createdAt: new Date(2023, 6, 15)
    },
    {
      id: '2',
      name: 'Bitcoin T-Shirt',
      category: 'clothing',
      price: '24.99',
      stock: 50,
      active: true,
      createdAt: new Date(2023, 8, 22)
    },
    {
      id: '3',
      name: 'Blockchain Book',
      category: 'education',
      price: '34.99',
      stock: 8,
      active: false,
      createdAt: new Date(2023, 9, 5)
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    if (availableCredits <= 0) {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough listing credits. Please renew your subscription.",
        variant: "destructive"
      });
      return;
    }

    // Form validation
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, we'd call the blockchain to list a product
      // await listProduct(formData.name, formData.description, formData.price, parseInt(formData.category), parseInt(formData.stock));
      
      // Mock success for demo
      setTimeout(() => {
        // Add the product to our local state
        const newProduct = {
          id: Date.now().toString(),
          name: formData.name,
          category: formData.category,
          price: formData.price,
          stock: parseInt(formData.stock),
          active: true,
          createdAt: new Date()
        };
        
        setProducts(prev => [newProduct, ...prev]);
        
        toast({
          title: "Product Listed",
          description: "Your product has been added to the marketplace.",
        });

        setShowAddProductDialog(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '1',
          image: 'https://via.placeholder.com/300x200'
        });
      }, 1000);
    } catch (error) {
      console.error("Error listing product:", error);
      toast({
        title: "Error",
        description: "Failed to list your product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProductStatus = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, active: !product.active } 
        : product
    ));
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "Product Deleted",
      description: "The product has been removed from your listings.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Products</h2>
        <Dialog open={showAddProductDialog} onOpenChange={setShowAddProductDialog}>
          <DialogTrigger asChild>
            <Button className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
              {availableCredits > 0 && (
                <span className="ml-2 text-xs bg-black/20 px-2 py-0.5 rounded-full">
                  Credits: {availableCredits}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Product name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">
                  Description
                </label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3 min-h-[100px]"
                  placeholder="Product description"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right">
                  Price (USDT)
                </label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={formData.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right">
                  Category
                </label>
                <Select 
                  name="category"
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="digital">Digital Goods</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="stock" className="text-right">
                  Stock
                </label>
                <Input 
                  id="stock" 
                  name="stock" 
                  type="number" 
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="1"
                  min="1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="image" className="text-right">
                  Image URL
                </label>
                <Input 
                  id="image" 
                  name="image" 
                  value={formData.image}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowAddProductDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddProduct}
                className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
                disabled={isSubmitting || availableCredits <= 0}
              >
                {isSubmitting ? "Adding..." : "Add Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {products.length === 0 ? (
        <Card className="bg-bitaccess-black-light">
          <CardContent className="py-12 flex flex-col items-center">
            <ShoppingBag className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No products yet</h3>
            <p className="text-gray-400 mb-6 text-center">
              Start adding products to your store to grow your business.
            </p>
            <Button 
              onClick={() => setShowAddProductDialog(true)}
              className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add First Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Created</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">{product.price} USDT</TableCell>
                    <TableCell className="text-center">{product.stock}</TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.active 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {product.active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {product.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => toggleProductStatus(product.id)}
                          title={product.active ? "Hide product" : "Show product"}
                        >
                          {product.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          title="Edit product"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => deleteProduct(product.id)}
                          title="Delete product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between py-4">
            <p className="text-sm text-gray-400">Showing {products.length} products</p>
            <p className="text-sm text-gray-400">
              Listing Credits Remaining: <span className="font-bold">{availableCredits}</span>
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

// Import this at the beginning of the file
import { ShoppingBag } from 'lucide-react';

export default MerchantProducts;
