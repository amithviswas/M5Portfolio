
"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react'; // Changed icon
import Section from '@/components/Section';

// Removed MGrillePattern for now to simplify, can be re-added if a subtle carbon/metal pattern is desired
// const MGrillePattern = () => ( ... );

export default function HeroSection() {
  // Updated content as per "Launch Control"
  const title = "Data Scientist | AI Engineer | ML Enthusiast";
  const name = "Amith Viswas Reddy. D"; // Kept for intro animation reference if needed, but title is primary
  const buttonText = "Start the Drive →";

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5, // Adjusted delay
        duration: 0.8,
        ease: [0.6, 0.01, 0.0, 0.95],
      },
    },
  };

  // Headlight beam effects (subtle for now, complex parallax deferred)
  const headlightVariants = {
    initial: { opacity: 0, scaleX: 0 },
    animate: (custom: number) => ({
      opacity: [0, 0.05, 0.02, 0.05, 0], // More subtle opacity
      scaleX: [0, 1, 0.8, 1, 0],
      transition: {
        delay: custom * 0.3 + 1.0,
        duration: 2.5, // Slower, more ambient
        repeat: Infinity,
        repeatDelay: 7,
        ease: "easeInOut"
      }
    })
  };

  return (
    <Section id="home" className="relative !pt-0 !pb-0 overflow-hidden" fullHeight noPadding>
      {/* <MGrillePattern /> */}
      
      {/* Subtle Headlight Beams */}
      <motion.div 
        className="absolute left-0 top-1/2 w-2/5 h-1/2 bg-gradient-to-r from-[hsl(var(--foreground)/0.03)] to-transparent rounded-r-full blur-3xl transform -translate-y-1/2 pointer-events-none"
        variants={headlightVariants}
        initial="initial"
        animate="animate"
        custom={1}
      />
      <motion.div 
        className="absolute right-0 top-1/2 w-2/5 h-1/2 bg-gradient-to-l from-[hsl(var(--foreground)/0.03)] to-transparent rounded-l-full blur-3xl transform -translate-y-1/2 pointer-events-none"
        variants={headlightVariants}
        initial="initial"
        animate="animate"
        custom={2}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-primary-foreground drop-shadow-[0_2px_10px_hsl(var(--primary)/0.3)]"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>
        {/* Name can be displayed here if desired, or kept in IntroAnimation */}
         <motion.p 
          className="mt-4 text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tighter text-primary-foreground drop-shadow-[0_2px_10px_hsl(var(--primary)/0.5)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.6, 0.01, 0.0, 0.95]}}
        >
          {name}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.6, 0.01, 0.0, 0.95] }}
          className="mt-12"
        >
          <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-md button-m-glow px-8 py-3">
            <Link href="/#about">
              {buttonText} <PlayCircle className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
