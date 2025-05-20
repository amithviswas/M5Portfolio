
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TICK_MARK_POSITIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90]; // For M-Chrono Scroll Gauge

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

      // Redline flare logic
      if (scrolled >= 90 && !isRedline) {
        setIsRedline(true);
        if (redlineTimeout) clearTimeout(redlineTimeout);
        const timeoutId = setTimeout(() => {
          setIsRedline(false);
          setRedlineTimeout(null); // Clear timeout ID once it has executed
        }, 200); // Flare for 200ms
        setRedlineTimeout(timeoutId);
      } else if (scrolled < 90 && isRedline && !redlineTimeout) { 
        // This case is tricky. If it becomes false while timeout is running, it should stay true until timeout clears.
        // The current logic should mostly handle this, as isRedline turns false only after timeout.
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (redlineTimeout) clearTimeout(redlineTimeout);
    };
  }, [isRedline, redlineTimeout]); // isRedline and redlineTimeout are dependencies

  const getBarColor = () => {
    // XENOFRAME Apex Meter / M-Chrono Gauge (from previous iterations)
    if (isRedline) return 'chrono-gauge-redline'; // Special class for redline flare
    // Using XENOFRAME Apex Meter gradients
    if (scrollPercentage > 80) return 'bg-gradient-to-r from-orange-500 to-red-600'; // High RPM / Voltage Gold to M-Red
    if (scrollPercentage > 40) return 'bg-gradient-to-r from-pink-500 to-purple-600'; // Mid RPM / Hyper Violet spectrum
    return 'bg-gradient-to-r from-sky-400 to-blue-600'; // Low RPM / BMW iBlue spectrum
  };

  return (
    // Styled as an "Apex Meter" / "M-Chrono Scroll Gauge"
    <div 
        className={cn(
            "fixed top-4 left-4 w-40 h-3 bg-neutral-800/70 rounded-sm overflow-visible z-50 shadow-lg border border-neutral-700/50 backdrop-blur-sm",
            "transform-gpu" // Hint for GPU acceleration
        )}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 90% 100%, 10% 100%, 0% 70%)' }} // Apex Meter shape
    >
      <div className="relative w-full h-full">
        <motion.div
          className={cn(
            "h-full rounded-sm transition-colors duration-150", // Base bar
            getBarColor(), // Dynamic color based on scroll
            isRedline && "chrono-gauge-redline" // Redline flare class
          )}
          style={{ width: `${scrollPercentage}%` }}
          initial={{ width: '0%' }}
          animate={{ width: `${scrollPercentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
        {/* Tick Marks for M-Chrono Gauge */}
        {TICK_MARK_POSITIONS.map((pos) => (
          <motion.div
            key={pos}
            className="absolute top-0 h-full w-[1.5px] bg-neutral-500/70"
            style={{ left: `${pos}%` }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: scrollPercentage >= pos ? 0.7 : 0.3 }} // Fade in as progress passes
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
