
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TICK_MARK_POSITIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90];

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
        const timeoutId = setTimeout(() => setIsRedline(false), 200); // Flare for 200ms
        setRedlineTimeout(timeoutId);
      } else if (scrolled < 90 && isRedline) {
        // If user scrolls back below 90 before flare ends, ensure it turns off.
        // This might not be strictly necessary if flare is short.
        // setIsRedline(false); 
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (redlineTimeout) clearTimeout(redlineTimeout);
    };
  }, [isRedline, redlineTimeout]);

  const getBarColor = () => {
    if (isRedline) return 'chrono-gauge-redline'; // Special class for redline flare
    if (scrollPercentage > 80) return 'bg-m-red'; 
    if (scrollPercentage > 40) return 'bg-hyper-violet'; 
    return 'bg-bmw-m-blue'; 
  };

  return (
    <div className="fixed top-4 left-4 w-40 h-3 bg-neutral-800/70 rounded-sm overflow-visible z-50 shadow-lg border border-neutral-700/50 backdrop-blur-sm">
      {/* Track for the bar */}
      <div className="relative w-full h-full">
        <motion.div
          className={cn(
            "h-full rounded-sm transition-colors duration-150",
            getBarColor()
          )}
          style={{ width: `${scrollPercentage}%` }}
          initial={{ width: '0%' }}
          animate={{ width: `${scrollPercentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
        {/* Tick Marks */}
        {TICK_MARK_POSITIONS.map((pos) => (
          <motion.div
            key={pos}
            className="absolute top-0 h-full w-[1.5px] bg-neutral-500/70"
            style={{ left: `${pos}%` }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: scrollPercentage >= pos ? 0.7 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
        ))}
         {/* End Cap / Final Tick */}
        <div 
            className="absolute top-0 right-0 h-full w-[1.5px] bg-neutral-400/80"
        />
      </div>
    </div>
  );
}

