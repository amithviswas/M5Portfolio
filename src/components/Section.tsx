
"use client";
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion, type AnimationControls, type TargetAndTransition, type VariantLabels } from 'framer-motion';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  fullHeight?: boolean;
  noPadding?: boolean;
  animate?: AnimationControls | TargetAndTransition | VariantLabels; 
}

const bladeVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: { 
    scaleY: 1, 
    originY: 0, 
    transition: { duration: 0.16, ease: [0.42, 0, 0.2, 1.2] } // Torque kick ease
  },
  exit: { 
    scaleY: 0, 
    originY: 0,
    transition: { duration: 0.16, ease: [0.42, 0, 0.2, 1.2] }
  }
};


export default function Section({ id, className, children, fullHeight = false, noPadding = false, animate }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(
        "w-full relative", // Added relative for pseudo-elements if needed, or for border divs
        !noPadding && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28",
        fullHeight && "min-h-[calc(100vh-5rem)] flex flex-col justify-center", 
        className
      )}
      initial="hidden" // Changed initial state for section frame animation
      whileInView="visible" // Changed to visible for section frame animation
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.6, 0.01, 0.0, 0.95] }} // Base section fade-in
      animate={animate} 
    >
      {/* Grille-Blade Section Frames */}
      <motion.div 
        className="absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-[hsl(var(--shadow-gray)/0.8)] to-[hsl(var(--border))] z-[-1]"
        variants={bladeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      ></motion.div>
      <motion.div 
        className="absolute top-0 right-0 h-full w-[3px] bg-gradient-to-b from-[hsl(var(--shadow-gray)/0.8)] to-[hsl(var(--border))] z-[-1]"
        variants={bladeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      ></motion.div>
      
      {children}
    </motion.section>
  );
}

