
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";

interface Category {
  name: string;
  count: number;
}

interface StoreStatsProps {
  totalStores: number;
  activeStores: number;
  categories: Category[];
}

const StoreStats = ({ totalStores, activeStores, categories }: StoreStatsProps) => {
  return (
    <Card className="bg-bitaccess-black-light border border-bitaccess-gold/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="text-bitaccess-gold" />
          <span>E-commerce Statistics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Total Stores</p>
            <p className="text-2xl font-semibold text-white">{totalStores}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Active Stores</p>
            <p className="text-2xl font-semibold text-white">{activeStores}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-400">Store Categories</p>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.name} className="flex justify-between text-gray-300">
                <span>{category.name}</span>
                <span>{category.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreStats;
