'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmotion } from '@/context/EmotionContext';
import { 
  FaSmile, 
  FaHeart, 
  FaBolt, 
  FaEye, 
  FaMeh,
  FaTimes
} from 'react-icons/fa';

const EmotionSelector: React.FC = () => {
  const { currentEmotion, setEmotion, suggestions } = useEmotion();
  const [isOpen, setIsOpen] = React.useState(false);

  const emotions = [
    { 
      id: 'happy', 
      icon: FaSmile, 
      label: 'Happy', 
      color: '#FFD700',
      emoji: '😊'
    },
    { 
      id: 'calm', 
      icon: FaHeart, 
      label: 'Calm', 
      color: '#4F46E5',
      emoji: '🧘'
    },
    { 
      id: 'energetic', 
      icon: FaBolt, 
      label: 'Energetic', 
      color: '#EF4444',
      emoji: '⚡'
    },
    { 
      id: 'focused', 
      icon: FaEye, 
      label: 'Focused', 
      color: '#10B981',
      emoji: '🎯'
    },
    { 
      id: 'neutral', 
      icon: FaMeh, 
      label: 'Neutral', 
      color: '#6B7280',
      emoji: '🤔'
    },
  ];

  const currentEmotionData = emotions.find(e => e.id === currentEmotion);

  return (
    <div className="fixed top-6 left-6 z-50">
      {/* Current Emotion Display */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-md shadow-glass"
        style={{
          background: `linear-gradient(135deg, ${currentEmotionData?.color}20, ${currentEmotionData?.color}10)`,
          border: `2px solid ${currentEmotionData?.color}40`,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: currentEmotionData?.color }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-lg">{currentEmotionData?.emoji}</span>
        </motion.div>
        <div className="text-left">
          <p className="text-white font-medium text-sm">How are you feeling?</p>
          <p className="text-white/80 text-xs">{currentEmotionData?.label}</p>
        </div>
      </motion.button>

      {/* Emotion Suggestions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-full left-0 mt-3 w-80 p-4 rounded-2xl backdrop-blur-md shadow-glass"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              border: `1px solid ${currentEmotionData?.color}30`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Choose Your Mood</h3>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-white/60 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes className="text-sm" />
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {emotions.map((emotion) => (
                <motion.button
                  key={emotion.id}
                  onClick={() => {
                    setEmotion(emotion.id as any);
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all duration-300 ${
                    currentEmotion === emotion.id 
                      ? 'ring-2 ring-offset-2 ring-offset-transparent' 
                      : 'hover:bg-white/10'
                  }`}
                  style={{
                    border: `1px solid ${emotion.color}30`,
                    background: currentEmotion === emotion.id 
                      ? `${emotion.color}20` 
                      : 'rgba(255,255,255,0.05)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">{emotion.emoji}</span>
                  <span className="text-white text-sm font-medium">{emotion.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Suggestion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-3 rounded-xl"
              style={{
                background: `${currentEmotionData?.color}20`,
                border: `1px solid ${currentEmotionData?.color}30`,
              }}
            >
              <p className="text-white text-sm">
                💡 {suggestions[Math.floor(Math.random() * suggestions.length)]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmotionSelector; 