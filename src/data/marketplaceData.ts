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
    productCount: 21
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
    name: 'Bit Access Premium Pen Set',
    description: 'Elegant black and gold premium pens featuring the official Bit Access logo. Perfect for professional meetings and blockchain conferences.',
    price: 850.00,
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
    name: 'Bit Access Travel Tumbler',
    description: 'Premium black and gold travel tumbler with thermal insulation. Features the official Bit Access branding. Perfect for crypto enthusiasts on the go.',
    price: 1200.00,
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
    name: 'Official Bit Access T-Shirt',
    description: 'Premium quality cotton t-shirt featuring the official Bit Access logo. Available in white with gold accents. Comfortable fit for blockchain enthusiasts.',
    price: 680.00,
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
    name: 'Bit Access Premium Notebook',
    description: 'High-quality leather-bound notebook with gold accents and the official Bit Access logo. Perfect for taking notes during blockchain meetings.',
    price: 950.00,
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
    name: 'Bit Access Gold Executive Pen',
    description: 'Luxury gold-accent pen with Bit Access branding. Features smooth writing mechanism and elegant design.',
    price: 550.00,
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
    id: '6',
    name: 'Bit Access Silver Professional Pen',
    description: 'Professional silver-accent pen featuring Bit Access logo. Sleek design with comfortable grip. Ideal for business meetings.',
    price: 480.00,
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
    id: '7',
    name: 'Bit Access Premium Card Holder',
    description: 'Premium metallic card holder with Bit Access branding. Compact design perfect for business cards and crypto wallet cards.',
    price: 750.00,
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
    id: '8',
    name: 'Bit Access Sports Water Bottle Set',
    description: 'Durable sports water bottle set featuring Bit Access branding. Includes black and red bottles with premium build quality.',
    price: 1450.00,
    currency: 'PHP',
    image: '/lovable-uploads/e1b38030-e551-4c33-a7b1-30c59822dc9a.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 80,
    tags: ['water bottle', 'sports', 'set', 'durable'],
    createdAt: '2025-06-10T12:00:00Z'
  },
  {
    id: '9',
    name: 'Bit Access Premium Coffee Mug',
    description: 'Premium ceramic coffee mug with Bit Access logo in black and gold. Perfect for morning coffee while checking crypto markets.',
    price: 450.00,
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
    id: '10',
    name: 'Bit Access Designer Wall Clock',
    description: 'Stylish wall clock featuring the Bit Access logo design. Perfect for home or office decoration with silent quartz movement.',
    price: 1850.00,
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
    id: '11',
    name: 'Bit Access Classic Baseball Cap',
    description: 'Premium baseball cap featuring Bit Access branding. Available in black/red color combination with adjustable fit.',
    price: 780.00,
    currency: 'PHP',
    image: '/lovable-uploads/3ca52171-1bba-481b-b2f4-157c6099e941.png',
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
    id: '12',
    name: 'Bit Access Premium Coffee Mug Set',
    description: 'Set of white and black ceramic coffee mugs with gold Bit Access circular logo. Features premium finish and dishwasher-safe design.',
    price: 890.00,
    currency: 'PHP',
    image: '/lovable-uploads/2ec2c6ec-6ae3-4659-bae5-82fc210ce558.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 85,
    tags: ['mug', 'set', 'ceramic', 'gold logo'],
    createdAt: '2025-05-30T12:00:00Z'
  },
  {
    id: '13',
    name: 'Bit Access Gold Circle Mug',
    description: 'Elegant white ceramic mug with gold circular Bit Access logo. Features "BLOCKCHAIN EMPOWERING COMMUNITIES" text around the emblem.',
    price: 520.00,
    currency: 'PHP',
    image: '/lovable-uploads/c14f25f7-6426-4ff9-803a-dc79d12046e1.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 110,
    featured: true,
    tags: ['mug', 'gold', 'circular', 'empowering'],
    createdAt: '2025-05-29T12:00:00Z'
  },
  {
    id: '14',
    name: 'Bit Access Professional Umbrella Set',
    description: 'Set of premium umbrellas featuring Bit Access branding. Includes classic black umbrella and colorful multi-panel design.',
    price: 1650.00,
    currency: 'PHP',
    image: '/lovable-uploads/61e907d9-1912-4716-8e0c-9b569789406d.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 55,
    tags: ['umbrella', 'set', 'waterproof', 'windproof'],
    createdAt: '2025-05-28T12:00:00Z'
  },
  {
    id: '15',
    name: 'Bit Access Eco Tote Bag Collection',
    description: 'Eco-friendly canvas tote bags featuring Bit Access branding. Available in black and white designs for shopping or conferences.',
    price: 890.00,
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
    createdAt: '2025-05-27T12:00:00Z'
  },
  {
    id: '16',
    name: 'Bit Access Colorful Blockchain Umbrella',
    description: 'Vibrant blockchain-themed umbrella with Bit Access branding. Water-resistant and windproof design in colorful pattern.',
    price: 1350.00,
    currency: 'PHP',
    image: '/lovable-uploads/f27edfa1-1383-4480-802d-27134936b020.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 55,
    tags: ['umbrella', 'blockchain', 'waterproof', 'colorful'],
    createdAt: '2025-05-26T12:00:00Z'
  },
  {
    id: '17',
    name: 'Bit Access Luxury Perfume for Men',
    description: 'Exclusive masculine fragrance with sophisticated blend. Features elegant packaging with Bit Access branding. 50ml luxury perfume.',
    price: 2850.00,
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
    createdAt: '2025-05-25T12:00:00Z'
  },
  {
    id: '18',
    name: 'Bit Access Professional Polo Shirt',
    description: 'Professional black polo shirt with stunning Bit Access design. Features blockchain education graphics and cryptocurrency elements.',
    price: 1250.00,
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
    createdAt: '2025-05-24T12:00:00Z'
  },
  {
    id: '19',
    name: 'Bit Access Crypto Wall Clock',
    description: 'Premium wall clock featuring multiple cryptocurrency logos around Bit Access branding. Perfect for crypto enthusiasts with LED backlighting.',
    price: 2450.00,
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
    createdAt: '2025-05-23T12:00:00Z'
  },
  {
    id: '20',
    name: 'Bit Access Banner Stand',
    description: 'Professional retractable banner stand featuring Bit Access branding. Perfect for events, conferences, and promotional activities.',
    price: 3500.00,
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
    id: '21',
    name: 'Bit Access Double Banner Display',
    description: 'Professional double banner set for major events and conferences. Features high-quality printing with vibrant Bit Access branding.',
    price: 6200.00,
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
    id: '22',
    name: 'Bit Access Premium Lanyards Set',
    description: 'Professional lanyards featuring Bit Access branding. Available in white and black designs. Perfect for conferences, events, and daily use.',
    price: 650.00,
    currency: 'PHP',
    image: '/lovable-uploads/e8b6b9eb-9bd3-4fbe-a65b-443d3452427a.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 120,
    tags: ['lanyard', 'professional', 'conference', 'branding'],
    createdAt: '2025-06-03T12:00:00Z'
  },
  {
    id: '23',
    name: 'Bit Access Luxury Watch Collection',
    description: 'Premium watches featuring the official Bit Access gold logo. Available in black leather and sports band options. Precise quartz movement.',
    price: 3850.00,
    currency: 'PHP',
    image: '/lovable-uploads/88bb3010-4a6b-48ce-bfe4-c722d590ddc4.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 25,
    featured: true,
    discountPercentage: 8,
    tags: ['watch', 'luxury', 'leather', 'quartz'],
    createdAt: '2025-06-02T12:00:00Z'
  },
  {
    id: '24',
    name: 'Bit Access Ecosystem Wall Clock',
    description: 'Beautiful wall clock featuring the Bit Access ecosystem design with blockchain empowering communities theme. Silent operation with elegant styling.',
    price: 2250.00,
    currency: 'PHP',
    image: '/lovable-uploads/c16e2201-ffd7-4815-a0aa-ee106a8000a4.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 40,
    featured: true,
    tags: ['clock', 'ecosystem', 'wall', 'silent'],
    createdAt: '2025-06-01T12:00:00Z'
  },
  {
    id: '25',
    name: 'Bit Access Premium Shopping Bags',
    description: 'High-quality shopping bags featuring Bit Access branding. Available in white and black designs. Durable and eco-friendly materials.',
    price: 420.00,
    currency: 'PHP',
    image: '/lovable-uploads/16a32a65-0503-488d-aece-83bc0ec3de93.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 150,
    tags: ['shopping bag', 'eco-friendly', 'durable', 'branding'],
    createdAt: '2025-05-31T12:00:00Z'
  },
  {
    id: '26',
    name: 'Bit Access Multi-Panel Umbrella',
    description: 'Stylish multi-panel umbrella featuring various cryptocurrency logos and Bit Access branding. Water-resistant and windproof design.',
    price: 1650.00,
    currency: 'PHP',
    image: '/lovable-uploads/b4185a49-d1f1-4e9d-9392-82fa93a355cd.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 60,
    discountPercentage: 12,
    tags: ['umbrella', 'multi-panel', 'waterproof', 'crypto'],
    createdAt: '2025-05-30T12:00:00Z'
  },
  {
    id: '27',
    name: 'Bit Access Executive Business Cards',
    description: 'Professional business cards featuring the Bit Access ecosystem design. High-quality printing with premium card stock.',
    price: 850.00,
    currency: 'PHP',
    image: '/lovable-uploads/9b31b746-44dc-4dda-aa9b-04f1f416c356.png',
    category: 'stationery',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 200,
    tags: ['business cards', 'executive', 'premium', 'professional'],
    createdAt: '2025-05-29T12:00:00Z'
  },
  {
    id: '28',
    name: 'Bit Access Classic Black Umbrella',
    description: 'Classic black umbrella with Bit Access ecosystem branding. Durable construction with automatic open mechanism.',
    price: 1350.00,
    currency: 'PHP',
    image: '/lovable-uploads/e77d650e-f15c-441b-9686-d72351db307a.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 70,
    tags: ['umbrella', 'classic', 'automatic', 'durable'],
    createdAt: '2025-05-28T12:00:00Z'
  },
  {
    id: '29',
    name: 'Bit Access Crypto Wall Clock',
    description: 'Premium wall clock featuring multiple cryptocurrency logos around Bit Access branding. Perfect for crypto enthusiasts with LED backlighting.',
    price: 2450.00,
    currency: 'PHP',
    image: '/lovable-uploads/51a23efb-1ba1-486e-9ead-0fc35a6920cf.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 35,
    discountPercentage: 15,
    featured: true,
    tags: ['clock', 'crypto', 'LED', 'silent'],
    createdAt: '2025-05-27T12:00:00Z'
  },
  {
    id: '30',
    name: 'Bit Access Elite Coffee Mug - White',
    description: 'Premium white ceramic coffee mug with black interior featuring the official Bit Access ecosystem logo. Dishwasher and microwave safe.',
    price: 520.00,
    currency: 'PHP',
    image: '/lovable-uploads/e822f1ac-96b4-4cd8-8b87-d24d6a836e63.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 110,
    tags: ['mug', 'ceramic', 'white', 'dishwasher safe'],
    createdAt: '2025-05-26T12:00:00Z'
  },
  {
    id: '31',
    name: 'Bit Access Elite Coffee Mug - Black',
    description: 'Premium black ceramic coffee mug featuring the official Bit Access ecosystem logo. Elegant design with comfortable handle.',
    price: 520.00,
    currency: 'PHP',
    image: '/lovable-uploads/4a369845-e3fe-4834-a836-6afd0b0ae213.png',
    category: 'accessories',
    seller: {
      id: 's1',
      name: 'Bit Access Official Store',
      rating: 4.9
    },
    stock: 110,
    tags: ['mug', 'ceramic', 'black', 'elegant'],
    createdAt: '2025-05-25T12:00:00Z'
  }
];
