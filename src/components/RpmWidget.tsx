
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RpmWidget() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust multiplier for rotation speed if needed
      const newRotation = (scrollY * 0.5) % 360; 
      setRotation(newRotation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call to set rotation based on current scroll

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 w-16 h-16 md:w-20 md:h-20 rpm-widget-dial">
      {/* Dial Background */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="hsla(var(--card), 0.7)" stroke="hsla(var(--border), 0.5)" strokeWidth="3" />
        {/* Example tick marks - can be expanded */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2="15"
            stroke="hsla(var(--muted-foreground), 0.5)"
            strokeWidth="2"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
         <circle cx="50" cy="50" r="5" fill="hsl(var(--primary))" /> {/* Needle pivot */}
      </svg>
      {/* Needle */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1/2 origin-bottom-center rpm-widget-needle"
        style={{ 
          transform: `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`,
          background: 'hsl(var(--primary))',
          borderRadius: '2px 2px 0 0',
          boxShadow: '0 0 5px hsl(var(--primary))'
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }} // Smooth transition for rotation changes
      />
    </div>
  );
}

