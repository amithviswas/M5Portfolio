"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import Section from '@/components/Section';

const MGrillePattern = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mGrille" patternUnits="userSpaceOnUse" width="60" height="120" patternTransform="scale(1) rotate(0)">
          <rect x="0" y="0" width="3" height="120" fill="hsl(var(--foreground))" />
          <rect x="30" y="0" width="3" height="120" fill="hsl(var(--foreground))" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mGrille)" />
    </svg>
  </div>
);


export default function HeroSection() {
  const name = "Amith Viswas Reddy";
  const tagline = "Data Scientist | AI/ML Enthusiast | Problem Solver";

  const nameVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08 + 0.5, // Stagger + overall delay
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
    },
  };
  
  const headlightVariants = {
    initial: { opacity: 0, scaleX: 0 },
    animate: (custom: number) => ({
      opacity: [0, 0.3, 0.1, 0.3, 0],
      scaleX: [0, 1, 0.8, 1, 0],
      transition: {
        delay: custom * 0.2 + 1.5, // Staggered delay for headlights
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "easeInOut"
      }
    })
  };


  return (
    <Section id="home" className="relative !pt-0 !pb-0 overflow-hidden" fullHeight noPadding>
      <MGrillePattern />
      {/* Headlight Beams */}
      <motion.div 
        className="absolute left-0 top-1/2 w-1/2 h-64 bg-gradient-to-r from-[hsl(var(--primary-foreground)/0.1)] to-transparent rounded-r-full blur-2xl transform -translate-y-1/2"
        variants={headlightVariants}
        initial="initial"
        animate="animate"
        custom={1}
      />
      <motion.div 
        className="absolute right-0 top-1/2 w-1/2 h-64 bg-gradient-to-l from-[hsl(var(--primary-foreground)/0.1)] to-transparent rounded-l-full blur-2xl transform -translate-y-1/2"
        variants={headlightVariants}
        initial="initial"
        animate="animate"
        custom={2}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-primary-foreground drop-shadow-[0_2px_10px_hsl(var(--primary)/0.5)]">
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={nameVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
              style={{ transform: 'translateY(50px)' }} // Initial position for spring animation
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p 
          className="mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl uppercase tracking-wider"
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
        >
          {tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
          className="mt-12"
        >
          <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-lg hover:shadow-[0_0_20px_hsl(var(--primary)/0.7)] transition-all duration-300 transform hover:scale-105">
            <Link href="/#about">
              Explore My Work <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
