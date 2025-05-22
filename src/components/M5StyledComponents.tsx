
"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// Headlight Pulse Component – mimics BMW M5 Laser DRLs
export const M5HeadlightGlow = () => {
  return (
    <motion.div
      className="w-12 h-1.5 bg-accent rounded-full shadow-lg shadow-accent/50" // Use theme accent color
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 0.8, 0.3] }} // Slightly more visible pulse
      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
    />
  );
};

// Grille Slice UI – mimics vertical kidney grille lines
export const M5GrilleLine = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="w-1 h-10 bg-neutral-700 rounded-sm mx-0.5 shadow-inner" // Darker, more metallic
    initial={{ scaleY: 0.8, opacity: 0.7 }}
    animate={{ scaleY: [0.8, 1.1, 0.8], opacity: [0.7, 1, 0.7] }}
    transition={{ delay, duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
  />
);

export const M5GrilleCluster = () => {
  return (
    <div className="flex items-end justify-center gap-0.5 p-3 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700">
      {Array.from({ length: 5 }).map((_, i) => (
        <M5GrilleLine key={i} delay={i * 0.18} />
      ))}
    </div>
  );
};

// Gear Button Toggle – inspired by M5 Drive Mode Selectors
interface M5DriveToggleProps {
  enabled: boolean;
  toggle: () => void;
  children: ReactNode;
  className?: string;
}

export const M5DriveToggle = ({ enabled, toggle, children, className }: M5DriveToggleProps) => {
  return (
    <motion.button
      onClick={toggle}
      className={cn(
        'w-full h-8 px-3 rounded-sm flex items-center justify-center border font-medium text-xs tracking-wider transition-all duration-200 ease-m-throttle',
        enabled
          ? 'bg-primary border-primary/70 text-primary-foreground shadow-[0_0_8px_hsl(var(--primary)/0.5)] hover:bg-primary/90'
          : 'bg-neutral-700/50 border-neutral-600 text-neutral-300 hover:bg-neutral-700/70 hover:border-neutral-500',
        className
      )}
      whileTap={{ scale: 0.95, filter: 'brightness(0.9)' }}
      whileHover={{ scale: 1.03, filter: enabled ? 'brightness(1.1)' : 'brightness(1.05)'}}
    >
      {children}
    </motion.button>
  );
};
