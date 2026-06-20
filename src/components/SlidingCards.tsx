import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Card {
  id: string;
  title: string;
  description?: string;
  image?: string;
  price?: number;
  icon?: string;
}

interface SlidingCardsProps {
  cards: Card[];
  onCardClick?: (card: Card) => void;
  autoSlide?: boolean;
  slideInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const SlidingCards: React.FC<SlidingCardsProps> = React.memo(({
  cards,
  onCardClick,
  autoSlide = true,
  slideInterval = 5000,
  showDots = true,
  showArrows = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
      }
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, slideInterval, cards.length, isDragging]);

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }
  };

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      {/* Cards Container */}
      <div className="relative h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={() => onCardClick?.(cards[currentIndex])}
            className="absolute w-full h-full cursor-pointer"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 h-full transform transition-transform hover:scale-[1.02]">
              {cards[currentIndex].image ? (
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={cards[currentIndex].image || '/images/products/logo_new.jpg'}
                    alt={cards[currentIndex].title}
                    fill
                    className="w-full h-full object-cover"
                    onError={e => (e.currentTarget.src = '/images/products/logo_new.jpg')}
                  />
                </div>
              ) : cards[currentIndex].icon ? (
                <div className="text-6xl mb-4 text-center text-yellow-600">
                  {cards[currentIndex].icon}
                </div>
              ) : null}
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {cards[currentIndex].title}
              </h3>
              
              {cards[currentIndex].description && (
                <p className="text-gray-600 mb-4">
                  {cards[currentIndex].description}
                </p>
              )}
              
              {cards[currentIndex].price && (
                <div className="text-lg font-bold text-yellow-600">
                  ₹{cards[currentIndex].price}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={() => handleArrowClick('prev')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => handleArrowClick('next')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-yellow-600 w-4'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

SlidingCards.displayName = 'SlidingCards';
export default SlidingCards; 
