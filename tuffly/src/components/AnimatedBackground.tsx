'use client';

import { useEffect, useState } from 'react';

const PASTEL_COLORS = [
  'bg-blue-100',
  'bg-pink-100',
  'bg-teal-100',
  'bg-yellow-100',
  'bg-cyan-100',
  'bg-orange-100',
];

type Particle = { x: number; y: number; size: number; speed: number; color: string; type: 'sparkle' | 'blob' };

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = Array.from({ length: 32 }, (_, i) => {
        if (i < 16) {
          // Sparkles
          return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 2 + 1,
            color: 'bg-white',
            type: 'sparkle' as const,
          };
        } else {
          // Floating blobs
          return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 32 + 16,
            speed: Math.random() * 8 + 6,
            color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
            type: 'blob' as const,
          };
        }
      });
      setParticles(newParticles);
    };
    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50 opacity-30" />
      {particles.map((particle, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${particle.color} ${particle.type === 'sparkle' ? 'animate-twinkle' : 'animate-float'}`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.type === 'sparkle' ? 0.7 : 0.18,
            filter: particle.type === 'sparkle' ? 'blur(0.5px)' : 'blur(2px)',
            animationDuration: `${particle.speed}s`,
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
} 
