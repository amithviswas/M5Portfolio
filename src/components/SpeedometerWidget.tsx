
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SpeedometerWidget() {
  const [rotation, setRotation] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      // Map 0-100% scroll to a 270-degree rotation range (e.g., -135deg to 135deg)
      const newRotation = (scrollPercent / 100) * 270 - 135;
      setRotation(newRotation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    // Optionally render a static version or null for reduced motion
    return (
        <div className="speedometer-widget static-speedo">
            <div className="speedometer-dial">
                 <div className="static-speedo-needle"></div>
                 <div className="speedometer-center-hub"></div>
            </div>
        </div>
    );
  }

  return (
    <motion.div 
      className="speedometer-widget"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <div className="speedometer-dial">
        <motion.div
          className="speedometer-needle"
          animate={{ rotate: rotation }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
        <div className="speedometer-center-hub" />
      </div>
      {/* Optional: Add tick marks or numbers around the dial */}
    </motion.div>
  );
}
