
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types/marketplace';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  category: Category;
  isActive?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isActive = false }) => {
  return (
    <Link to={`/marketplace?category=${category.id}`}>
      <Card 
        className={`
          flex flex-col items-center p-4 h-full cursor-pointer transition-all duration-200
          ${isActive 
            ? 'border-bitaccess-gold bg-bitaccess-gold/10' 
            : 'hover:bg-bitaccess-black-light'}
        `}
      >
        <div className="w-12 h-12 mb-3 rounded-full bg-bitaccess-gold/10 flex items-center justify-center">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-6 h-6 opacity-80"
          />
        </div>
        <CardContent className="p-0 text-center">
          <h3 className={`font-medium ${isActive ? 'text-bitaccess-gold' : 'text-white'}`}>
            {category.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {category.count} {category.count === 1 ? 'item' : 'items'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
