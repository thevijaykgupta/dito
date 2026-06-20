'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { useEmotion } from '@/context/EmotionContext';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { Product } from '@/app/types';

interface ProductShowcaseProps {
  category: {
    name: string;
    slug: string;
    color: string;
  };
}

export default function ProductShowcase({ category }: ProductShowcaseProps) {
  const { products } = useData();
  const { themeColors } = useEmotion();
  const categoryProducts = products.filter(p => p.category === category.slug);

  const handleAddToCart = (productId: string) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', productId);
  };

  const handleViewDetails = (productId: string) => {
    // TODO: Navigate to product details
    console.log('Viewing details:', productId);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          className="text-3xl font-bold tracking-tight"
          style={{ 
            background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {category.name}
        </motion.h2>
        <Link 
          href={`/categories/${category.slug}`} 
          className="text-sm font-semibold hover:text-white transition-all duration-300 px-4 py-2 rounded-full backdrop-blur-md"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: `1px solid ${themeColors.accent}30`,
            color: themeColors.accent,
          }}
        >
            View All &rarr;
        </Link>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 text-center py-12"
          >
            <div className="p-8 rounded-2xl backdrop-blur-md mx-auto max-w-md"
                 style={{
                   background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                   border: `1px solid ${themeColors.primary}30`,
                 }}>
              <p className="text-gray-300 text-lg mb-4">No products in this category yet.</p>
              <p className="text-gray-400 text-sm">Be the first to sell something amazing!</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
} 
