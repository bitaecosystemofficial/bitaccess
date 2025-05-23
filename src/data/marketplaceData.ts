
import { Product, Category } from '@/types/marketplace';
import { ShoppingBag, HeadphonesIcon, Home, FileCode, HeartHandshake, Gift } from 'lucide-react';
import React from 'react';

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', count: 24, image: '/placeholder.svg' },
  { id: 'clothing', name: 'Clothing', count: 18, image: '/placeholder.svg' },
  { id: 'home', name: 'Home & Garden', count: 16, image: '/placeholder.svg' },
  { id: 'digital', name: 'Digital Products', count: 12, image: '/placeholder.svg' },
  { id: 'services', name: 'Services', count: 10, image: '/placeholder.svg' },
  { id: 'collectibles', name: 'Collectibles', count: 8, image: '/placeholder.svg' },
];

export const categoryIcons: Record<string, React.ReactNode> = {
  'electronics': <HeadphonesIcon className="h-5 w-5 text-gray-300" />,
  'clothing': <ShoppingBag className="h-5 w-5 text-gray-300" />,
  'home': <Home className="h-5 w-5 text-gray-300" />,
  'digital': <FileCode className="h-5 w-5 text-gray-300" />,
  'services': <HeartHandshake className="h-5 w-5 text-gray-300" />,
  'collectibles': <Gift className="h-5 w-5 text-gray-300" />
};

export const featuredStores = [
  {
    id: 's1',
    name: 'Blockchain Academy',
    coverImage: '/placeholder.svg',
    category: 'digital',
    rating: 4.8,
    productCount: 12
  },
  {
    id: 's2',
    name: 'CryptoSecure',
    coverImage: '/placeholder.svg',
    category: 'electronics',
    rating: 4.9,
    productCount: 15
  },
  {
    id: 's3',
    name: 'BitConsult Pro',
    coverImage: '/placeholder.svg',
    category: 'services',
    rating: 4.7,
    productCount: 8
  },
  {
    id: 's4',
    name: 'CryptoWear',
    coverImage: '/placeholder.svg',
    category: 'clothing',
    rating: 4.3,
    productCount: 24
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Blockchain Development Course',
    description: 'Complete course on blockchain development with practical examples and projects.',
    price: 125,
    currency: 'USDT',
    image: '/placeholder.svg',
    category: 'digital',
    seller: {
      id: 's1',
      name: 'Blockchain Academy',
      rating: 4.8
    },
    stock: 999,
    featured: true,
    tags: ['course', 'blockchain', 'development'],
    createdAt: '2025-04-10T12:00:00Z'
  },
  {
    id: '2',
    name: 'Hardware Wallet',
    description: 'Secure your cryptocurrencies with this state-of-the-art hardware wallet.',
    price: 79,
    currency: 'USDT',
    image: '/placeholder.svg',
    category: 'electronics',
    seller: {
      id: 's2',
      name: 'CryptoSecure',
      rating: 4.9
    },
    stock: 45,
    discountPercentage: 10,
    tags: ['wallet', 'security', 'hardware'],
    createdAt: '2025-04-12T12:00:00Z'
  },
  {
    id: '3',
    name: 'Blockchain Consulting - 1 Hour',
    description: 'Get expert advice on your blockchain project from our experienced consultants.',
    price: 150,
    currency: 'USDT',
    image: '/placeholder.svg',
    category: 'services',
    seller: {
      id: 's3',
      name: 'BitConsult Pro',
      rating: 4.7
    },
    stock: 10,
    tags: ['consulting', 'expert', 'blockchain'],
    createdAt: '2025-04-13T12:00:00Z'
  },
  {
    id: '4',
    name: 'Crypto Trading Blueprint',
    description: 'Comprehensive guide to cryptocurrency trading strategies and market analysis.',
    price: 49,
    currency: 'USDT',
    image: '/placeholder.svg',
    category: 'digital',
    seller: {
      id: 's4',
      name: 'CryptoTrader Experts',
      rating: 4.5
    },
    stock: 999,
    featured: true,
    tags: ['trading', 'guide', 'crypto'],
    createdAt: '2025-04-14T12:00:00Z'
  },
  {
    id: '5',
    name: 'Blockchain Conference Ticket',
    description: 'Access to the annual blockchain technology conference with networking opportunities.',
    price: 299,
    currency: 'USDT',
    image: '/placeholder.svg',
    category: 'services',
    seller: {
      id: 's5',
      name: 'BlockConf',
      rating: 4.6
    },
    stock: 75,
    discountPercentage: 15,
    tags: ['conference', 'networking', 'event'],
    createdAt: '2025-04-15T12:00:00Z'
  },
  {
    id: '6',
    name: 'Crypto Themed T-shirt',
    description: 'Premium quality t-shirt with unique blockchain-inspired designs.',
    price: 29,
    currency: 'USDT',
    image: '/placeholder.svg',
    category: 'clothing',
    seller: {
      id: 's6',
      name: 'CryptoWear',
      rating: 4.3
    },
    stock: 120,
    tags: ['clothing', 'merch', 'fashion'],
    createdAt: '2025-04-16T12:00:00Z'
  },
  {
    id: '7',
    name: 'Mining Rig Components',
    description: 'High-performance components for building your own mining setup.',
    price: 1299,
    currency: 'USDT',
    image: '/placeholder.svg',
    category: 'electronics',
    seller: {
      id: 's7',
      name: 'MiningTech',
      rating: 4.7
    },
    stock: 8,
    featured: true,
    tags: ['mining', 'hardware', 'components'],
    createdAt: '2025-04-17T12:00:00Z'
  },
  {
    id: '8',
    name: 'Blockchain Art NFT',
    description: 'Limited edition digital artwork certified on the blockchain as an NFT.',
    price: 199,
    currency: 'USDT',
    image: '/placeholder.svg',
    category: 'collectibles',
    seller: {
      id: 's8',
      name: 'CryptoArtist',
      rating: 4.9
    },
    stock: 1,
    tags: ['nft', 'art', 'collectible'],
    createdAt: '2025-04-18T12:00:00Z'
  }
];
