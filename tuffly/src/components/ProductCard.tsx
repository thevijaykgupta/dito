'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEmotion } from '@/context/EmotionContext';
import { FaShoppingCart, FaHeart, FaEye, FaStar } from 'react-icons/fa';
import { useData } from '@/context/DataContext';
import type { Product } from '@/app/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onViewDetails?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ 
  product, 
  onAddToCart, 
  onViewDetails 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { themeColors, currentEmotion } = useEmotion();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleViewDetails = () => {
    onViewDetails?.(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative w-64 h-80 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-tuffly-blue/80 to-tuffly-purple/80 border-2 border-tuffly-gold/60 shadow-glow"
    >
      {/* Shimmer effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-tuffly-gold/20 to-transparent"
        animate={{
          x: isHovered ? ['-100%', '100%'] : '-100%',
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
        style={{ zIndex: 1 }}
      />

      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.images[0] || '/images/products/placeholder.png'}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-tuffly-blue/60 via-transparent to-transparent" />
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <motion.button
            onClick={handleLike}
            className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              border: '1px solid #FFD700',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart 
              className={`text-sm ${isLiked ? 'text-red-500' : 'text-tuffly-gold'}`}
              style={{ fill: isLiked ? '#ef4444' : 'currentColor' }}
            />
          </motion.button>
          
          <motion.button
            onClick={handleViewDetails}
            className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(30, 60, 114, 0.2)',
              border: '1px solid #1e3c72',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEye className="text-sm text-white" />
          </motion.button>
        </div>

        {/* Rating badge */}
        {/* Removed rating badge as product.rating no longer exists */}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-32">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-tuffly-gold group-hover:to-yellow-300 transition-all duration-300">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tuffly-gold to-yellow-300">
              ₹{product.price}
              {product.listingType === 'rent' && <span className="text-sm">/day</span>}
            </p>
            {product.mrp && product.mrp > product.price && (
              <p className="text-sm text-white/60 line-through">
                MRP: ₹{product.mrp}
              </p>
            )}
            {product.securityDeposit && (
              <p className="text-xs text-yellow-300">
                Deposit: ₹{product.securityDeposit}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-xs px-2 py-1 rounded-full ${
              product.listingType === 'rent' 
                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' 
                : 'bg-green-500/20 text-green-300 border border-green-400/30'
            }`}>
              {product.listingType === 'rent' ? 'Rent' : 'Sell'}
            </span>
            <p className="text-sm text-white/80 flex items-center gap-1 mt-1">
              Campus-wide
            </p>
          </div>
        </div>

        {/* Additional Materials Badge */}
        {product.additionalMaterials && product.additionalMaterials.length > 0 && (
          <div className="mb-2">
            <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
              +{product.additionalMaterials.length} Materials
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          className="w-full py-3 rounded-xl font-bold text-tuffly-slate flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-tuffly-gold to-yellow-300 hover:scale-105 hover:brightness-110"
          style={{
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 8px 25px rgba(255, 215, 0, 0.6)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          <FaShoppingCart className="text-sm" />
          {product.listingType === 'rent' ? 'Rent Now' : 'Add to Cart'}
        </motion.button>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: isHovered 
            ? '0 0 30px rgba(255, 215, 0, 0.4)'
            : '0 0 10px rgba(255, 215, 0, 0.2)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard; 