
"use client";

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { useIntroContext } from '@/contexts/IntroContext';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollMomentumBar from '@/components/ScrollMomentumBar'; 
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from 'framer-motion';

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    x: '8vw', // Slide in from right 8vw
    filter: 'blur(0px)', // Start sharp
  },
  animate: {
    opacity: 1,
    x: '0vw',
    filter: 'blur(0px)',
    transition: {
      duration: 0.4, // Total duration
      ease: [0.6, 0.04, 0.2, 1] // Custom acceleration curve (approx)
      // For more precise two-part timing, would need GSAP or chained animations
    }
  },
  exit: {
    opacity: 0,
    x: '-8vw', // Slide out to left 8vw
    filter: 'blur(4px)',
    transition: { 
      duration: 0.3, // Slightly faster exit
      ease: [0.42, 0, 1, 1] 
    }
  }
};


export default function AppClientLayout({ children }: { children: ReactNode }) {
  const { introCompleted } = useIntroContext();
  const pathname = usePathname(); // Get current pathname for AnimatePresence key

  return (
    <>
      <AnimatePresence>
        {!introCompleted && <IntroAnimation />}
      </AnimatePresence>
      
      {/* Main content with AnimatePresence for page transitions */}
      <AnimatePresence mode="wait"> 
        {introCompleted && (
          <motion.div
            key={pathname} // Key by pathname to trigger transitions on route change
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransitionVariants}
            className="flex flex-col min-h-screen" // Ensures content takes full height
          >
            <ScrollMomentumBar /> 
            <Navbar />
            <main className="flex-grow pt-20"> 
              {children}
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster />
    </>
  );
}

