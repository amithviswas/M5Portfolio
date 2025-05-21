
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
      variants={{ // Basic fade-in variant
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.6, 0.01, 0.0, 0.95] } }
      }}
      animate={animate}
    >
      {children}
    </motion.section>
  );
}
