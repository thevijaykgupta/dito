'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmotion } from '@/context/EmotionContext';
import { 
  FaPlus, 
  FaShoppingCart, 
  FaHeart, 
  FaComments, 
  FaUser,
  FaHome,
  FaCog,
  FaBell
} from 'react-icons/fa';

interface FloatingActionButtonProps {
  onAction?: (action: string) => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { themeColors, currentEmotion } = useEmotion();

  const actions = [
    { icon: FaHome, label: 'Home', action: 'home', color: themeColors.primary },
    { icon: FaShoppingCart, label: 'Cart', action: 'cart', color: themeColors.secondary },
    { icon: FaHeart, label: 'Wishlist', action: 'wishlist', color: themeColors.accent },
    { icon: FaComments, label: 'Chat', action: 'chat', color: themeColors.primary },
    { icon: FaBell, label: 'Notifications', action: 'notifications', color: themeColors.secondary },
    { icon: FaUser, label: 'Profile', action: 'profile', color: themeColors.accent },
  ];

  const handleAction = (action: string) => {
    onAction?.(action);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((item, index) => (
              <motion.div
                key={item.action}
                initial={{ opacity: 0, x: 50, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ opacity: 0, x: 50, y: 20 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex items-center justify-end"
              >
                <motion.div
                  className="bg-glass-white backdrop-blur-md rounded-full px-4 py-2 mr-3 shadow-glass"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    border: `1px solid ${item.color}40`,
                    boxShadow: `0 0 20px ${item.color}30`
                  }}
                >
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </motion.div>
                <motion.button
                  onClick={() => handleAction(item.action)}
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-glass backdrop-blur-md"
                  style={{
                    backgroundColor: `${item.color}20`,
                    border: `2px solid ${item.color}`,
                    boxShadow: `0 0 20px ${item.color}40`
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: `0 0 30px ${item.color}60`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="text-white text-lg" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-glass backdrop-blur-md relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.secondary}20)`,
          border: `2px solid ${themeColors.accent}`,
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: `0 0 30px ${themeColors.accent}60`
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen 
            ? `0 0 40px ${themeColors.accent}80`
            : `0 0 20px ${themeColors.accent}40`
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaPlus className="text-white text-2xl" />
        </motion.div>
        
        {/* Emotion indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
          style={{ backgroundColor: themeColors.accent }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>
    </div>
  );
};

export default FloatingActionButton; 
