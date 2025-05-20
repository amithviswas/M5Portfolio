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

// Grille-Blade Animation Variants
const bladeVariants = {
  hidden: { scaleY: 0, originY: 0 }, // Start scaled down from top
  visible: { 
    scaleY: 1, 
    transition: { duration: 0.16, ease: [0.42,0, .2,1.2] } // "Torque kick" ease
  },
};


export default function Section({ id, className, children, fullHeight = false, noPadding = false, animate }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(
        "w-full relative", 
        !noPadding && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28",
        fullHeight && "min-h-[calc(100vh-5rem)] flex flex-col justify-center", 
        className
      )}
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.6, 0.01, 0.0, 0.95] }} // Base section fade-in (can be overridden by animate prop)
      animate={animate} 
    >
      {/* Grille-Blade Section Frames */}
      <motion.div 
        className="absolute top-0 left-0 h-full section-grille-blade" // Uses CSS class for styling
        variants={bladeVariants}
        // initial, whileInView, viewport are handled by the parent motion.section for triggering
      ></motion.div>
      <motion.div 
        className="absolute top-0 right-0 h-full section-grille-blade" // Uses CSS class for styling
        variants={bladeVariants}
      ></motion.div>
      
      {children}
    </motion.section>
  );
}

```