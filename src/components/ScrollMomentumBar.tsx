"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Adjusted tick mark positions for a more "gauge-like" feel if desired
const TICK_MARK_POSITIONS = [10, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95]; // More ticks towards end

export default function ScrollMomentumBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isRedline, setIsRedline] = useState(false);
  const [redlineTimeout, setRedlineTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercentage(Math.min(100, Math.max(0, scrolled)));

      if (scrolled >= 90 && !isRedline) {
        setIsRedline(true);
        if (redlineTimeout) clearTimeout(redlineTimeout);
        const timeoutId = setTimeout(() => {
          setIsRedline(false);
          setRedlineTimeout(null);
        }, 300); // Duration of the redline LED pulse
        setRedlineTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (redlineTimeout) clearTimeout(redlineTimeout);
    };
  }, [isRedline, redlineTimeout]);

  const getBarColorClass = () => {
    if (isRedline) return 'm-rpm-gauge-fill-redline'; // Intense red for redline
    if (scrollPercentage > 80) return 'm-rpm-gauge-fill-high'; // Warning color (e.g., orange/yellow)
    if (scrollPercentage > 50) return 'm-rpm-gauge-fill-mid'; // Mid-range color
    return 'm-rpm-gauge-fill-low'; // Normal operating color (e.g., ice blue)
  };

  return (
    <div 
        className={cn(
            "fixed top-4 left-4 w-48 h-4 bg-transparent rounded-sm overflow-visible z-50", // Increased width slightly, height for visual presence
            "m-chrono-scroll-gauge-container", // Main container style for background, glow
            "transform-gpu" 
        )}
        // Clip-path for angular design is in globals.css under .m-chrono-scroll-gauge-container
    >
      <div className="relative w-full h-full">
        {/* Digital Needle / Bar Fill */}
        <motion.div
          className={cn(
            "h-full rounded-sm transition-colors duration-150", 
            getBarColorClass(),
            isRedline && "m-rpm-led-pulse" // Animation class for redline
          )}
          style={{ width: `${scrollPercentage}%` }}
          initial={{ width: '0%' }}
          animate={{ width: `${scrollPercentage}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
        
        {/* Tick Marks */}
        {TICK_MARK_POSITIONS.map((pos) => {
          const isRedZoneTick = pos >= 85; // Example threshold for red tick highlights
          return (
            <motion.div
              key={pos}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 h-[140%] w-[1.5px]", // Taller ticks that extend beyond bar
                "m-rpm-tick-base",
                pos % 20 === 0 && "m-rpm-tick-major", // Style for major ticks (e.g., 20, 40, 60, 80)
                isRedZoneTick && "m-rpm-tick-redzone-highlight", // Red highlight for ticks in red zone
                scrollPercentage >= pos ? "opacity-90" : "opacity-50" // Glow brighter when passed
              )}
              style={{ left: `${pos}%` }}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: scrollPercentage >= pos ? 0.9 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
         {/* End Cap / Final Tick (if needed, or rely on last tick mark) */}
        <div 
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-0 h-[140%] w-[1.5px]",
              "m-rpm-tick-base m-rpm-tick-major m-rpm-tick-redzone-highlight" // Style as a major red tick
            )}
        />
      </div>
    </div>
  );
}