
"use client";

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useIntroContext } from '@/contexts/IntroContext';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from 'framer-motion';

// Basic page transition variants
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    // x: '8vw', // Original "Torque-Ramp"
  },
  animate: {
    opacity: 1,
    // x: '0vw', // Original "Torque-Ramp"
    transition: {
      duration: 0.4, // Simpler duration
      ease: [0.42, 0, 0.58, 1], // Standard ease-in-out
    }
  },
  exit: {
    opacity: 0,
    // x: '-8vw', // Original "Torque-Ramp"
    // filter: 'blur(4px)', // Removed blur for simplicity
    transition: {
      duration: 0.3, // Simpler duration
      ease: [0.42, 0, 0.58, 1], // Standard ease-in-out
    }
  }
};

export default function AppClientLayout({ children }: { children: ReactNode }) {
  const { introCompleted } = useIntroContext();
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence>
        {!introCompleted && <IntroAnimation />}
      </AnimatePresence>

      {/* Static elements that appear after intro, but don't participate in page-to-page transitions */}
      {introCompleted && (
        <>
          {/* ScrollMomentumBar removed for rollback */}
          <Navbar />
        </>
      )}

      {/* Page content that transitions */}
      <AnimatePresence mode="wait">
        {introCompleted && (
          <motion.div
            key={pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransitionVariants}
            className="flex flex-col min-h-screen" // Ensuring structure
          >
            <main className="flex-grow pt-20"> {/* Padding for Navbar height */}
              {children}
            </main>
            <Footer /> {/* Footer will animate with the page content */}
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </>
  );
}
