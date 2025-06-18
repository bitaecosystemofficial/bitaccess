
import { Product, Category } from '@/types/marketplace';
import { ShoppingBag, HeadphonesIcon, Home, FileCode, HeartHandshake, Gift } from 'lucide-react';
import React from 'react';

export const categories: Category[] = [
  { id: 'merchandise', name: 'Merchandise', count: 24, image: '/placeholder.svg' },
  { id: 'stationery', name: 'Stationery', count: 18, image: '/placeholder.svg' },
  { id: 'apparel', name: 'Apparel', count: 16, image: '/placeholder.svg' },
  { id: 'accessories', name: 'Accessories', count: 12, image: '/placeholder.svg' },
  { id: 'promotional', name: 'Promotional', count: 10, image: '/placeholder.svg' },
  { id: 'digital', name: 'Digital Products', count: 8, image: '/placeholder.svg' },
];

export const categoryIcons: Record<string, React.ReactNode> = {
  'merchandise': React.createElement(Gift, { className: "h-5 w-5 text-gray-300" }),
  'stationery': React.createElement(FileCode, { className: "h-5 w-5 text-gray-300" }),
  'apparel': React.createElement(ShoppingBag, { className: "h-5 w-5 text-gray-300" }),
  'accessories': React.createElement(HeadphonesIcon, { className: "h-5 w-5 text-gray-300" }),
  'promotional': React.createElement(HeartHandshake, { className: "h-5 w-5 text-gray-300" }),
  'digital': React.createElement(FileCode, { className: "h-5 w-5 text-gray-300" })
};

export const featuredStores = [
  {
    id: 's1',
    name: 'Bit Access Official Store',
    coverImage: '/lovable-uploads/c6a8cfd9-7105-4aeb-a399-d35487c22dbc.png',
    category: 'merchandise',
    rating: 4.9,
    productCount: 15
  },
  {
    id: 's2',
    name: 'Crypto Merchandise Hub',
    coverImage: '/lovable-uploads/a33dea2f-e135-4e04-8278-6fee786990e3.png',
    category: 'promotional',
    rating: 4.8,
    productCount: 12
  },
  {
    id: 's3',
    name: 'Blockchain Essentials',
    coverImage: '/lovable-uploads/9efc7a53-92a4-4ca1-82f7-648abc492421.png',
    category: 'accessories',
    rating: 4.7,
    productCount: 18
  },
  {
    id: 's4',
    name: 'Digital Assets Store',
    coverImage: '/placeholder.svg',
    category: 'digital',
    rating: 4.6,
    productCount: 8
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Bit Access Ecosystem Premium Pen Set',
    description: 'Elegant black and gold premium pens featuring the official Bit Access Ecosystem logo. Perfect for professional meetings and blockchain conferences.',
    price: 850,
    currency: 'PHP',
    image: '/lovable-uploads/409d97ff-d06a-4806-baef-83807032cfff.png',
    category: 'stationery',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 50,
    featured: true,
    tags: ['pen', 'stationery', 'premium', 'logo'],
    createdAt: '2025-06-15T12:00:00Z'
  },
  {
    id: '2',
    name: 'Bit Access Ecosystem Travel Tumbler',
    description: 'Premium black and gold travel tumbler with thermal insulation. Features the official Bit Access Ecosystem branding. Perfect for crypto enthusiasts on the go.',
    price: 1200,
    currency: 'PHP',
    image: '/lovable-uploads/9efc7a53-92a4-4ca1-82f7-648abc492421.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 75,
    discountPercentage: 10,
    featured: true,
    tags: ['tumbler', 'travel', 'accessories', 'thermal'],
    createdAt: '2025-06-14T12:00:00Z'
  },
  {
    id: '3',
    name: 'Official Bit Access Ecosystem T-Shirt',
    description: 'Premium quality cotton t-shirt featuring the official Bit Access Ecosystem logo. Available in white with gold accents. Comfortable fit for blockchain enthusiasts.',
    price: 680,
    currency: 'PHP',
    image: '/lovable-uploads/f5f0aae9-121e-4354-809a-3559eda73429.png',
    category: 'apparel',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 120,
    tags: ['t-shirt', 'apparel', 'cotton', 'logo'],
    createdAt: '2025-06-13T12:00:00Z'
  },
  {
    id: '4',
    name: 'Bit Access Ecosystem Premium Notebook',
    description: 'High-quality leather-bound notebook with gold accents and the official Bit Access Ecosystem logo. Perfect for taking notes during blockchain meetings and conferences.',
    price: 950,
    currency: 'PHP',
    image: '/lovable-uploads/3e9b91af-909f-499b-8334-80519d77a8fc.png',
    category: 'stationery',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 60,
    featured: true,
    tags: ['notebook', 'leather', 'premium', 'stationery'],
    createdAt: '2025-06-12T12:00:00Z'
  },
  {
    id: '5',
    name: 'Bit Access Ecosystem Banner Stand',
    description: 'Professional retractable banner stand featuring Bit Access Ecosystem branding. Perfect for events, conferences, and promotional activities. High-quality print with vibrant colors.',
    price: 3500,
    currency: 'PHP',
    image: '/lovable-uploads/c6a8cfd9-7105-4aeb-a399-d35487c22dbc.png',
    category: 'promotional',
    seller: {
      id: 's2',
      name: 'Crypto Merchandise Hub',
      rating: 4.8
    },
    stock: 25,
    discountPercentage: 15,
    tags: ['banner', 'promotional', 'event', 'retractable'],
    createdAt: '2025-06-11T12:00:00Z'
  },
  {
    id: '6',
    name: 'Bit Access Sports Water Bottle Set',
    description: 'Durable sports water bottle set featuring Bit Access Ecosystem branding. Includes black and red bottles with premium build quality. Perfect for active crypto enthusiasts.',
    price: 1450,
    currency: 'PHP',
    image: '/lovable-uploads/e1b38030-e551-4c33-a7b1-30c59822dc9a.png',
    category: 'accessories',
    seller: {
      id: 's3',
      name: 'Blockchain Essentials',
      rating: 4.7
    },
    stock: 80,
    tags: ['water bottle', 'sports', 'set', 'durable'],
    createdAt: '2025-06-10T12:00:00Z'
  },
  {
    id: '7',
    name: 'Bit Access Gold Premium Pen',
    description: 'Luxury gold-accent pen with Bit Access Ecosystem branding. Features smooth writing mechanism and elegant design. Perfect for signing important blockchain documents.',
    price: 550,
    currency: 'PHP',
    image: '/lovable-uploads/ddd59a58-b3f7-4276-b10b-a97a35408562.png',
    category: 'stationery',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 40,
    featured: true,
    tags: ['pen', 'gold', 'luxury', 'premium'],
    createdAt: '2025-06-09T12:00:00Z'
  },
  {
    id: '8',
    name: 'Bit Access Silver Executive Pen',
    description: 'Professional silver-accent pen featuring Bit Access Ecosystem logo. Sleek design with comfortable grip. Ideal for business meetings and professional use.',
    price: 480,
    currency: 'PHP',
    image: '/lovable-uploads/9421cf4c-903e-4396-9423-6317a3db7ab9.png',
    category: 'stationery',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 65,
    tags: ['pen', 'silver', 'executive', 'professional'],
    createdAt: '2025-06-08T12:00:00Z'
  },
  {
    id: '9',
    name: 'Bit Access Ecosystem Card Holder',
    description: 'Premium metallic card holder with Bit Access Ecosystem branding. Compact design perfect for business cards and crypto wallet cards. Elegant black and gold finish.',
    price: 750,
    currency: 'PHP',
    image: '/lovable-uploads/5076f3bb-d96f-4238-804d-dd91949f83c7.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 90,
    discountPercentage: 12,
    tags: ['card holder', 'metallic', 'business', 'compact'],
    createdAt: '2025-06-07T12:00:00Z'
  },
  {
    id: '10',
    name: 'Bit Access Double Banner Set',
    description: 'Professional double banner set for major events and conferences. Features high-quality printing with vibrant Bit Access Ecosystem branding. Perfect for trade shows and blockchain events.',
    price: 6200,
    currency: 'PHP',
    image: '/lovable-uploads/a33dea2f-e135-4e04-8278-6fee786990e3.png',
    category: 'promotional',
    seller: {
      id: 's2',
      name: 'Crypto Merchandise Hub',
      rating: 4.8
    },
    stock: 15,
    featured: true,
    tags: ['banner', 'double', 'event', 'trade show'],
    createdAt: '2025-06-06T12:00:00Z'
  }
];
