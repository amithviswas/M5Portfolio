
"use client";

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useIntroContext } from '@/contexts/IntroContext';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ScrollMomentumBar from '@/components/ScrollMomentumBar';
import { useState, useEffect } from 'react';
// import { ThemeToggle } from '@/components/ThemeToggle'; // Removed

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    x: '8vw', 
  },
  animate: {
    opacity: 1,
    x: '0vw', 
    transition: {
      duration: 0.4, 
      ease: [0.36, 1.08, 0.33, 1] as any, // M-throttle easing
    }
  },
  exit: {
    opacity: 0,
    x: '-8vw', 
    filter: 'blur(2px)', // Slight blur on exit
    transition: {
      duration: 0.3,
      ease: [0.36, 1.08, 0.33, 1] as any, // M-throttle easing
    }
  }
};

export default function AppClientLayout({ children }: { children: ReactNode }) {
  const { introCompleted } = useIntroContext();
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);
  const [canRenderMainContent, setCanRenderMainContent] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (introCompleted) {
      const timer = setTimeout(() => {
        setCanRenderMainContent(true);
      }, 500); // Delay slightly longer than intro exit animation (0.4s)
      return () => clearTimeout(timer);
    } else {
      setCanRenderMainContent(false);
    }
  }, [introCompleted]);

  return (
    <>
      <AnimatePresence>
        {!introCompleted && <IntroAnimation />}
      </AnimatePresence>

      {/* Static elements that appear after intro, but don't participate in page-to-page transitions */}
      {canRenderMainContent && (
        <>
          <Navbar />
          <ScrollMomentumBar />
          {/* <div className="fixed top-4 right-4 z-[51]"> <ThemeToggle /> </div> Removed */}
        </>
      )}

      {/* Page content that transitions */}
      <AnimatePresence mode="wait">
        {canRenderMainContent && (
          <motion.div
            key={pathname} // Key change triggers enter/exit animations
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransitionVariants}
            className="flex flex-col min-h-screen" 
          >
            <main className="flex-grow pt-20"> {/* Padding for Navbar height */}
              {children}
            </main>
            <Footer /> {/* Footer will animate with the page content */}
          </motion.div>
        )}
      </AnimatePresence>

      {hasMounted && <Toaster />}
    </>
  );
}
