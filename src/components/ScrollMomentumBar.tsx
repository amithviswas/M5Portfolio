
"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TICK_COUNT = 10; 

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
        redlineTimeoutRef.current = setTimeout(() => {
          setIsRedline(false);
          redlineTimeoutRef.current = null; 
        }, 200); 
      } else if (currentScrollPercentage < 90 && isRedline && !redlineTimeoutRef.current) {
         // Handled by timeout clearing or natural state change
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (redlineTimeoutRef.current) clearTimeout(redlineTimeoutRef.current);
    };
  }, [isRedline]); // isRedline dependency is important here

  // Apex Meter: iBlue -> Hyper Violet -> M Red (CSL Theme)
  const getBarGradientClass = (percentage: number) => {
    if (percentage <= 33) return 'bg-gradient-to-r from-bmw-m-blue to-m-violet';
    if (percentage <= 66) return 'bg-gradient-to-r from-m-violet to-primary'; 
    return 'bg-gradient-to-r from-primary to-blood-red'; 
  };
  
  const barFillClass = scrollPercentage > 80 
    ? 'm-rpm-gauge-fill-xenoflame' 
    : getBarGradientClass(scrollPercentage);


  return (
    <div className={cn(
      "m-chrono-scroll-gauge-container", 
      isRedline && !prefersReducedMotion && "chrono-gauge-redline" 
    )}>
      <motion.div
        className={cn("m-rpm-gauge-fill", barFillClass)} 
        style={{ width: `${scrollPercentage}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 25 }} // Slightly adjusted spring
      />
      <div className="m-chrono-tick-container">
        {Array.from({ length: TICK_COUNT + 1 }).map((_, i) => {
          const tickPercentage = i * (100 / TICK_COUNT);
          const isActive = scrollPercentage >= tickPercentage;
          const isRedzoneTick = tickPercentage >= 80;
          const isMajorTick = i % 2 === 0; 

          return (
            <motion.div
              key={`tick-${i}`}
              className={cn(
                isMajorTick ? "m-rpm-tick-major" : "m-rpm-tick-minor",
                isRedzoneTick && "m-rpm-tick-redzone",
                isActive && !prefersReducedMotion && "m-rpm-tick-active"
              )}
              initial={{ opacity: 0.4 }} // Slightly more visible initially
              animate={{ opacity: isActive ? 0.9 : 0.6 }} // Active ticks brighter
              transition={{ duration: 0.2 }}
            />
          );
        })}
      </div>
    </div>
  );
}
