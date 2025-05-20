
"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react'; // Changed icon
import Section from '@/components/Section';
import { MStartStopButton } from '@/components/MStartStopButton'; // Import the new button

export default function HeroSection() {
  const title = "Data Scientist | AI Engineer | ML Enthusiast";
  const name = "Amith Viswas Reddy. D";

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: [0.6, 0.01, 0.0, 0.95],
      },
    },
  };

  const headlightVariants = {
    initial: { opacity: 0, scaleX: 0 },
    animate: (custom: number) => ({
      opacity: [0, 0.05, 0.02, 0.05, 0],
      scaleX: [0, 1, 0.8, 1, 0],
      transition: {
        delay: custom * 0.3 + 1.0,
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 7,
        ease: "easeInOut"
      }
    })
  };

  return (
    <Section id="home" className="relative !pt-0 !pb-0 overflow-hidden" fullHeight noPadding>
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
          <MStartStopButton asChild>
            <Link href="/#about">
              <PlayCircle size={32} className="mb-1 text-primary group-hover:text-blood-red transition-colors" />
              <span className="text-xs uppercase">Start</span>
              <span className="text-xs uppercase">Drive</span>
            </Link>
          </MStartStopButton>
        </motion.div>
      </div>
    </Section>
  );
}
