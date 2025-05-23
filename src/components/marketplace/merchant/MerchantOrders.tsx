
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PackageOpen, ExternalLink, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MerchantOrders: React.FC = () => {
  const { toast } = useToast();

  // Mock orders for demonstration
  const orders = [
    {
      id: 'ORD-1234',
      customer: '0x1234...5678',
      date: new Date(2023, 10, 15),
      total: '249.99',
      status: 'completed',
      products: [
        { id: '1', name: 'Crypto Hardware Wallet', quantity: 2, price: '99.99' },
        { id: '2', name: 'Bitcoin T-Shirt', quantity: 2, price: '24.99' }
      ],
      txHash: '0xabcd1234...'
    },
    {
      id: 'ORD-5678',
      customer: '0x5678...9abc',
      date: new Date(2023, 10, 18),
      total: '34.99',
      status: 'processing',
      products: [
        { id: '3', name: 'Blockchain Book', quantity: 1, price: '34.99' }
      ],
      txHash: '0xdef5678...'
    },
    {
      id: 'ORD-9012',
      customer: '0x9abc...def0',
      date: new Date(2023, 10, 20),
      total: '124.98',
      status: 'shipped',
      products: [
        { id: '1', name: 'Crypto Hardware Wallet', quantity: 1, price: '99.99' },
        { id: '2', name: 'Bitcoin T-Shirt', quantity: 1, price: '24.99' }
      ],
      txHash: '0xfed9876...'
    }
  ];

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'processing':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'shipped':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been marked as ${newStatus}.`,
    });
  };

  if (orders.length === 0) {
    return (
      <Card className="bg-bitaccess-black-light">
        <CardContent className="py-12 flex flex-col items-center">
          <PackageOpen className="h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
          <p className="text-gray-400 text-center">
            Orders will appear here when customers purchase your products.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{order.id}</span>
                    <a 
                      href={`https://bscscan.com/tx/${order.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-bitaccess-gold flex items-center mt-1"
                    >
                      View Transaction <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">{order.customer}</span>
                </TableCell>
                <TableCell>{order.date.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">{order.total} USDT</TableCell>
                <TableCell className="text-center">
                  <Badge className={getStatusBadgeStyle(order.status)} variant="outline">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs"
                    >
                      Details
                    </Button>
                    {order.status === 'processing' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleUpdateStatus(order.id, 'shipped')}
                        className="text-xs bg-bitaccess-gold text-black hover:bg-bitaccess-gold/90"
                      >
                        Mark Shipped
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MerchantOrders;
