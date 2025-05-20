
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
  animate?: AnimationControls | TargetAndTransition | VariantLabels; // Added animate prop
}

export default function Section({ id, className, children, fullHeight = false, noPadding = false, animate }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(
        "w-full",
        !noPadding && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28",
        fullHeight && "min-h-[calc(100vh-5rem)] flex flex-col justify-center", // 5rem is approx navbar height
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.6, 0.01, 0.0, 0.95] }}
      animate={animate} // Pass animate prop here
    >
      {children}
    </motion.section>
  );
}
