
"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TICK_COUNT = 10; // For 0% to 100% in 10% increments

export default function ScrollMomentumBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isRedline, setIsRedline] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const redlineTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScrollPercentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercentage(Math.min(100, Math.max(0, currentScrollPercentage)));

      if (currentScrollPercentage >= 90 && !isRedline) {
        setIsRedline(true);
        if (redlineTimeoutRef.current) clearTimeout(redlineTimeoutRef.current);
        redlineTimeoutRef.current = setTimeout(() => setIsRedline(false), 200); // Redline flare duration
      } else if (currentScrollPercentage < 90 && isRedline && !redlineTimeoutRef.current) {
        // This case is tricky, ensure redline stops if scroll drops below 90 quickly after timeout
        // setIsRedline(false); // Or let timeout handle it
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (redlineTimeoutRef.current) clearTimeout(redlineTimeoutRef.current);
    };
  }, [isRedline]);

  const getBarGradientClass = (percentage: number) => {
    // Apex Meter: iBlue -> Hyper Violet -> Voltage Gold
    if (percentage <= 33) return 'bg-gradient-to-r from-bmw-m-blue to-m-violet';
    if (percentage <= 66) return 'bg-gradient-to-r from-m-violet to-primary'; // Using primary as "Voltage Gold"
    return 'bg-gradient-to-r from-primary to-blood-red'; // More intense red for >66%
  };
  
  // Simplified for bar styling, more specific in globals.css
  const barFillClass = scrollPercentage > 80 
    ? 'm-rpm-gauge-fill-xenoflame' // Specific gradient class for Apex Meter
    : getBarGradientClass(scrollPercentage);


  return (
    <div className={cn(
      "m-chrono-scroll-gauge-container", // Main Apex Meter container style from globals
      isRedline && !prefersReducedMotion && "chrono-gauge-redline" // Redline flare effect
    )}>
      <motion.div
        className={cn("m-rpm-gauge-fill", barFillClass)} // Base fill + dynamic gradient
        style={{ width: `${scrollPercentage}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />
      <div className="m-chrono-tick-container">
        {Array.from({ length: TICK_COUNT + 1 }).map((_, i) => {
          const tickPercentage = i * (100 / TICK_COUNT);
          const isActive = scrollPercentage >= tickPercentage;
          const isRedzoneTick = tickPercentage >= 80;
          const isMajorTick = i % 2 === 0; // Example: Major ticks every 20%

          return (
            <motion.div
              key={`tick-${i}`}
              className={cn(
                isMajorTick ? "m-rpm-tick-major" : "m-rpm-tick-minor",
                isRedzoneTick && "m-rpm-tick-redzone",
                isActive && !prefersReducedMotion && "m-rpm-tick-active"
              )}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: isActive ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </div>
    </div>
  );
}
