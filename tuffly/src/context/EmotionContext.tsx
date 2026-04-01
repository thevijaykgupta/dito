'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Emotion = 'happy' | 'calm' | 'energetic' | 'focused' | 'neutral';

interface EmotionContextType {
  currentEmotion: Emotion;
  setEmotion: (emotion: Emotion) => void;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  suggestions: string[];
  animations: {
    background: string;
    intensity: number;
  };
}

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

const emotionConfig = {
  happy: {
    colors: {
      primary: '#FCD34D',
      secondary: '#FCA500',
      accent: '#FF6B6B',
      background: 'linear-gradient(135deg, #FCD34D 0%, #FCA500 50%, #FF6B6B 100%)',
    },
    suggestions: [
      "🎉 Time to celebrate! Check out our trending products!",
      "😊 Spread joy by sharing something with your campus!",
      "🌟 Your positive energy is contagious!",
      "🎵 Maybe some upbeat music while browsing?"
    ],
    animations: {
      background: 'animate-pulse-glow',
      intensity: 0.8,
    },
  },
  calm: {
    colors: {
      primary: '#4F46E5',
      secondary: '#7C3AED',
      accent: '#06B6D4',
      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%)',
    },
    suggestions: [
      "🧘 Perfect time for mindful shopping",
      "📚 Maybe some study materials?",
      "☕ Relax and browse at your own pace",
      "🌿 Take deep breaths while exploring"
    ],
    animations: {
      background: 'animate-float',
      intensity: 0.3,
    },
  },
  energetic: {
    colors: {
      primary: '#EF4444',
      secondary: '#F97316',
      accent: '#EAB308',
      background: 'linear-gradient(135deg, #EF4444 0%, #F97316 50%, #EAB308 100%)',
    },
    suggestions: [
      "⚡ Channel that energy into finding great deals!",
      "🏃‍♂️ Quick shopping spree? We've got you!",
      "🔥 Hot deals waiting for your energy!",
      "🎯 Focus that energy on what you need!"
    ],
    animations: {
      background: 'animate-bounce-gentle',
      intensity: 1.0,
    },
  },
  focused: {
    colors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#3B82F6',
      background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #3B82F6 100%)',
    },
    suggestions: [
      "🎯 Perfect focus! What are you looking for?",
      "📝 Make a list and stick to it",
      "💡 Smart shopping with clear goals",
      "✅ Check off items as you find them"
    ],
    animations: {
      background: 'animate-glow',
      intensity: 0.5,
    },
  },
  neutral: {
    colors: {
      primary: '#6B7280',
      secondary: '#9CA3AF',
      accent: '#D1D5DB',
      background: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 50%, #D1D5DB 100%)',
    },
    suggestions: [
      "🤔 What's on your mind today?",
      "🔍 Explore different categories",
      "💭 Take your time to browse",
      "🌟 Maybe something will catch your eye!"
    ],
    animations: {
      background: '',
      intensity: 0.1,
    },
  },
};

export function EmotionProvider({ children }: { children: React.ReactNode }) {
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('neutral');

  const setEmotion = (emotion: Emotion) => {
    setCurrentEmotion(emotion);
    // Store in localStorage for persistence
    localStorage.setItem('userEmotion', emotion);
    
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  useEffect(() => {
    // Load saved emotion on mount
    const savedEmotion = localStorage.getItem('userEmotion') as Emotion;
    if (savedEmotion && emotionConfig[savedEmotion]) {
      setCurrentEmotion(savedEmotion);
    }
  }, []);

  const config = emotionConfig[currentEmotion];

  const value: EmotionContextType = {
    currentEmotion,
    setEmotion,
    themeColors: config.colors,
    suggestions: config.suggestions,
    animations: config.animations,
  };

  return (
    <EmotionContext.Provider value={value}>
      {children}
    </EmotionContext.Provider>
  );
}

export function useEmotion() {
  const context = useContext(EmotionContext);
  if (context === undefined) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
} 