
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ScrollMomentumBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getBarColor = () => {
    if (scrollPercentage > 80) return 'bg-m-red'; // M Red from globals
    if (scrollPercentage > 40) return 'bg-hyper-violet'; // Hyper Violet from globals
    return 'bg-bmw-m-blue'; // BMW M Blue from globals
  };

  return (
    <div className="fixed top-4 left-4 w-32 h-2 bg-neutral-700 rounded-full overflow-hidden z-50 shadow-lg border border-neutral-600">
      <motion.div
        className={cn("h-full rounded-full transition-colors duration-300", getBarColor())}
        style={{ width: `${scrollPercentage}%` }}
        initial={{ width: '0%' }}
        animate={{ width: `${scrollPercentage}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />
    </div>
  );
}
