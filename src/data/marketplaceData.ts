
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
  },
  {
    id: '11',
    name: 'Bit Access Ecosystem Coffee Mug',
    description: 'Premium ceramic coffee mug with Bit Access Ecosystem logo in black and gold. Perfect for morning coffee while checking crypto markets. Dishwasher safe with high-quality printing.',
    price: 450,
    currency: 'PHP',
    image: '/lovable-uploads/cac118fc-abac-4d1f-af2f-f756f664351e.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 100,
    tags: ['mug', 'coffee', 'ceramic', 'dishwasher safe'],
    createdAt: '2025-06-05T12:00:00Z'
  },
  {
    id: '12',
    name: 'Bit Access Ecosystem Wall Clock',
    description: 'Stylish wall clock featuring the Bit Access Ecosystem logo design. Perfect for home or office decoration. Silent quartz movement with clear number display.',
    price: 1850,
    currency: 'PHP',
    image: '/lovable-uploads/8a0bc2e7-0c93-46f8-b06b-820324742e69.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 45,
    featured: true,
    tags: ['clock', 'wall', 'decoration', 'quartz'],
    createdAt: '2025-06-04T12:00:00Z'
  },
  {
    id: '13',
    name: 'Bit Access Tote Bag Set',
    description: 'Eco-friendly canvas tote bags featuring Bit Access branding. Available in black and white designs. Perfect for shopping or carrying crypto conference materials.',
    price: 890,
    currency: 'PHP',
    image: '/lovable-uploads/0eea185a-0f0c-4409-88aa-e8dafe449674.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 85,
    tags: ['tote bag', 'canvas', 'eco-friendly', 'set'],
    createdAt: '2025-06-03T12:00:00Z'
  },
  {
    id: '14',
    name: 'Bit Access Blockchain Umbrella',
    description: 'Colorful blockchain-themed umbrella with Bit Access Ecosystem branding. Water-resistant and windproof design. Perfect protection from rain while showing your crypto passion.',
    price: 1350,
    currency: 'PHP',
    image: '/lovable-uploads/f27edfa1-1383-4480-802d-27134936b020.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 55,
    tags: ['umbrella', 'blockchain', 'waterproof', 'windproof'],
    createdAt: '2025-06-02T12:00:00Z'
  },
  {
    id: '15',
    name: 'Bit Access Cap Collection',
    description: 'Premium baseball caps featuring Bit Access Ecosystem branding. Available in multiple color combinations including orange/black and black/red. Adjustable fit with embroidered logo.',
    price: 780,
    currency: 'PHP',
    image: '/lovable-uploads/1dc8ae81-fd4c-4d4b-a6de-bbb04c6529bd.png',
    category: 'apparel',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 95,
    discountPercentage: 8,
    tags: ['cap', 'baseball', 'embroidered', 'adjustable'],
    createdAt: '2025-06-01T12:00:00Z'
  },
  {
    id: '16',
    name: 'Bit Access Premium Perfume for Men',
    description: 'Exclusive masculine fragrance with sophisticated blend. Features elegant packaging with Bit Access Ecosystem branding. 50ml luxury perfume perfect for professional occasions.',
    price: 2850,
    currency: 'PHP',
    image: '/lovable-uploads/b4e14dba-ceb2-467d-a2d9-eac5d758dabf.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 30,
    featured: true,
    tags: ['perfume', 'men', 'luxury', 'fragrance'],
    createdAt: '2025-05-31T12:00:00Z'
  },
  {
    id: '17',
    name: 'Bit Access Ecosystem Polo Shirt',
    description: 'Professional black polo shirt with stunning Bit Access Ecosystem design. Features blockchain education and cryptocurrency graphics. Premium fabric with moisture-wicking technology.',
    price: 1250,
    currency: 'PHP',
    image: '/lovable-uploads/771e7432-4244-418d-bd7e-a5b6fa0f020d.png',
    category: 'apparel',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 70,
    featured: true,
    tags: ['polo', 'shirt', 'professional', 'moisture-wicking'],
    createdAt: '2025-05-30T12:00:00Z'
  },
  {
    id: '18',
    name: 'Crypto Ecosystem Wall Clock',
    description: 'Premium wall clock featuring multiple cryptocurrency logos around Bit Access Ecosystem branding. Perfect for crypto enthusiasts and traders. Silent movement with LED backlighting.',
    price: 2450,
    currency: 'PHP',
    image: '/lovable-uploads/82078a7a-11b2-4632-8eb7-456890665185.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 35,
    discountPercentage: 15,
    tags: ['clock', 'crypto', 'LED', 'silent'],
    createdAt: '2025-05-29T12:00:00Z'
  }
];
