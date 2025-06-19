export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  usdtPrice: number;
  image: string;
  category: string;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  stock: number;
  featured?: boolean;
  discountPercentage?: number;
  tags?: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image?: string;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular';

export interface FilterOptions {
  category: string | null;
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
  searchQuery: string;
}
