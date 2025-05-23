
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Pencil, Trash2, Tag } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  startDate: Date;
  endDate: Date;
  minPurchase: number;
  maxUses: number;
  currentUses: number;
  active: boolean;
}

const MerchantCoupons: React.FC = () => {
  const { toast } = useToast();

  // Mock coupons for demonstration
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 'coupon-1',
      code: 'WELCOME20',
      discount: 20,
      discountType: 'percentage',
      startDate: new Date(2023, 10, 1),
      endDate: new Date(2023, 11, 31),
      minPurchase: 50,
      maxUses: 100,
      currentUses: 45,
      active: true
    },
    {
      id: 'coupon-2',
      code: 'SAVE10USD',
      discount: 10,
      discountType: 'fixed',
      startDate: new Date(2023, 10, 15),
      endDate: new Date(2023, 11, 15),
      minPurchase: 25,
      maxUses: 50,
      currentUses: 12,
      active: true
    }
  ]);

  const [showCouponDialog, setShowCouponDialog] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    discountType: 'percentage',
    startDate: '',
    endDate: '',
    minPurchase: '',
    maxUses: '',
    active: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCoupon = () => {
    // Validate form data
    if (!formData.code || !formData.discount || !formData.startDate || !formData.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new coupon
    const newCoupon: Coupon = {
      id: `coupon-${Date.now()}`,
      code: formData.code.toUpperCase(),
      discount: parseFloat(formData.discount),
      discountType: formData.discountType as 'percentage' | 'fixed',
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      minPurchase: parseFloat(formData.minPurchase) || 0,
      maxUses: parseInt(formData.maxUses) || 0,
      currentUses: 0,
      active: formData.active
    };

    // Add coupon to the list
    setCoupons([...coupons, newCoupon]);
    
    // Reset form and close dialog
    setFormData({
      code: '',
      discount: '',
      discountType: 'percentage',
      startDate: '',
      endDate: '',
      minPurchase: '',
      maxUses: '',
      active: true
    });
    setShowCouponDialog(false);
    
    toast({
      title: "Coupon Added",
      description: `Coupon ${newCoupon.code} has been created successfully.`,
    });
  };

  const toggleCouponStatus = (couponId: string) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === couponId 
        ? { ...coupon, active: !coupon.active } 
        : coupon
    ));
    
    const coupon = coupons.find(c => c.id === couponId);
    if (coupon) {
      toast({
        title: "Coupon Status Updated",
        description: `Coupon ${coupon.code} is now ${!coupon.active ? 'active' : 'inactive'}.`,
      });
    }
  };

  const deleteCoupon = (couponId: string) => {
    const couponToDelete = coupons.find(c => c.id === couponId);
    setCoupons(coupons.filter(coupon => coupon.id !== couponId));
    
    if (couponToDelete) {
      toast({
        title: "Coupon Deleted",
        description: `Coupon ${couponToDelete.code} has been removed.`,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Coupons</h2>
        <Dialog open={showCouponDialog} onOpenChange={setShowCouponDialog}>
          <DialogTrigger asChild>
            <Button className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Coupon Code
                </Label>
                <Input 
                  id="code" 
                  name="code" 
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="EXAMPLE20"
                  className="col-span-3 uppercase"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discountType" className="text-right">
                  Discount Type
                </Label>
                <Select
                  value={formData.discountType}
                  onValueChange={(value) => handleSelectChange("discountType", value)}
                >
                  <SelectTrigger id="discountType" className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (USDT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount" className="text-right">
                  Discount Value
                </Label>
                <Input 
                  id="discount" 
                  name="discount" 
                  type="number"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder={formData.discountType === 'percentage' ? "10" : "5.00"}
                  className="col-span-3"
                  min="0"
                  max={formData.discountType === 'percentage' ? "100" : undefined}
                  step={formData.discountType === 'percentage' ? "1" : "0.01"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input 
                  id="startDate" 
                  name="startDate" 
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <Input 
                  id="endDate" 
                  name="endDate" 
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minPurchase" className="text-right">
                  Min. Purchase
                </Label>
                <Input 
                  id="minPurchase" 
                  name="minPurchase" 
                  type="number"
                  value={formData.minPurchase}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="col-span-3"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="maxUses" className="text-right">
                  Max. Uses
                </Label>
                <Input 
                  id="maxUses" 
                  name="maxUses" 
                  type="number"
                  value={formData.maxUses}
                  onChange={handleInputChange}
                  placeholder="Unlimited"
                  className="col-span-3"
                  min="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowCouponDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddCoupon}
                className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
              >
                Create Coupon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {coupons.length === 0 ? (
        <Card className="bg-bitaccess-black-light">
          <CardContent className="py-12 flex flex-col items-center">
            <Tag className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No coupons yet</h3>
            <p className="text-gray-400 mb-6 text-center">
              Create discount coupons to attract more customers to your store.
            </p>
            <Button 
              onClick={() => setShowCouponDialog(true)}
              className="bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Create First Coupon
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Valid Period</TableHead>
                  <TableHead>Min. Purchase</TableHead>
                  <TableHead className="text-center">Usage</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map(coupon => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-mono font-bold">{coupon.code}</TableCell>
                    <TableCell>
                      {coupon.discountType === 'percentage' 
                        ? `${coupon.discount}%` 
                        : `${coupon.discount} USDT`
                      }
                    </TableCell>
                    <TableCell>
                      {coupon.startDate.toLocaleDateString()} - {coupon.endDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {coupon.minPurchase > 0 ? `${coupon.minPurchase} USDT` : '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {coupon.currentUses} / {coupon.maxUses > 0 ? coupon.maxUses : '∞'}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        coupon.active 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {coupon.active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-1">
                        <Button 
                          size="icon" 
                          variant="ghost"
                          title="Edit coupon"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          title={coupon.active ? "Deactivate coupon" : "Activate coupon"}
                          onClick={() => toggleCouponStatus(coupon.id)}
                        >
                          <Tag className={`h-4 w-4 ${coupon.active ? 'text-green-500' : 'text-red-500'}`} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          title="Delete coupon"
                          onClick={() => deleteCoupon(coupon.id)}
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
        </Card>
      )}
    </div>
  );
};

export default MerchantCoupons;
