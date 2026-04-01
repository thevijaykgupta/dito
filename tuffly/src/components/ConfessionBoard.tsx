'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ConfessionBoard: React.FC = React.memo(() => {
  const [confession, setConfession] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle confession submission logic here
    setConfession('');
  };

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    // If swiped left more than 50px, minimize
    if (diff > 50 && !minimized) {
      setMinimized(true);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = startX - e.clientX;
    
    // If dragged left more than 50px, minimize
    if (diff > 50 && !minimized) {
      setMinimized(true);
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startX, minimized]);

  if (minimized) {
    return (
      <button
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-l-2xl px-4 py-3 shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 group confession-minimize-slide-in"
        onClick={() => setMinimized(false)}
        title="Show Confession Board"
      >
        <div className="flex items-center space-x-2">
          <FaChevronLeft className="text-sm group-hover:animate-bounce" />
          <span className="font-semibold">Confessions</span>
        </div>
      </button>
    );
  }

  return (
    <div 
      ref={boardRef}
      className="fixed right-0 top-1/2 transform -translate-y-1/2 w-80 bg-gradient-to-br from-blue-50 via-yellow-50 to-white border-l-4 border-blue-200 p-5 shadow-2xl rounded-l-2xl z-50 max-h-[90vh] overflow-y-auto cursor-grab active:cursor-grabbing confession-slide-in"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {/* Minimize Button */}
      <button
        className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-2 hover:bg-blue-600 hover:scale-110 transition-all duration-300 shadow-lg z-10 group nav-button-hover"
        onClick={() => setMinimized(true)}
        title="Minimize"
      >
        <FaChevronRight className="text-sm group-hover:animate-pulse" />
      </button>

      {/* Animated sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-8 w-2 h-2 bg-yellow-200 rounded-full animate-twinkle" />
        <div className="absolute bottom-8 right-8 w-3 h-3 bg-blue-100 rounded-full animate-float" />
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-pink-100 rounded-full animate-twinkle" />
      </div>

      <h3 className="font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-yellow-500 to-blue-600 text-center text-lg drop-shadow-glow mt-8">
        🤐 RVCE_confessions
      </h3>
      
      <h2 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
        🤐 RVCE_confessions
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          className="border border-blue-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={3}
          placeholder="Type your confession..."
          value={confession}
          onChange={e => setConfession(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Submit
        </button>
      </form>
      
      <div className="text-xs text-gray-700 text-center mb-3 font-semibold">
        RVCE's Confessions Hub<br/>(Confess/Gossip/inner thoughts) here 👇
      </div>
      
      <div className="h-40 overflow-y-auto mb-2 p-2 bg-white/90 rounded-lg shadow-inner border border-blue-100">
        <p className="text-xs text-yellow-600 font-semibold">No confessions yet. Be the first!</p>
      </div>

      {/* Swipe hint */}
      <div className="text-xs text-gray-500 text-center mt-2 opacity-60">
        ← Swipe left to minimize
      </div>
    </div>
  );
});

ConfessionBoard.displayName = 'ConfessionBoard';
export default ConfessionBoard; 