
"use client";

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useIntroContext } from '@/contexts/IntroContext';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollMomentumBar from '@/components/ScrollMomentumBar';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from 'framer-motion';
import { useUserInteraction } from '@/contexts/UserInteractionContext';
import { useEffect } from 'react';
import soundService from '@/services/soundService';

// Torque-Ramp Page Transition Variants
// cubic-bezier(0.6, 0.04, 0.98, 0.335) // "acceleration curve in" (slow start, fast mid)
// cubic-bezier(0.42, 0, 1, 1) // Fast out
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    x: '8vw',
    filter: 'blur(0px)',
  },
  animate: {
    opacity: 1,
    x: '0vw',
    filter: 'blur(0px)',
    transition: {
      duration: 0.4, // Total duration 400ms for entry
      ease: [0.6, 0.04, 0.98, 0.335],
    }
  },
  exit: {
    opacity: 0,
    x: '-8vw',
    filter: 'blur(4px)',
    transition: {
      duration: 0.3, // Total duration 300ms for exit
      ease: [0.42, 0, 1, 1],
    }
  }
};


export default function AppClientLayout({ children }: { children: ReactNode }) {
  const { introCompleted } = useIntroContext();
  const pathname = usePathname();
  const { interactionData, logFastScroll } = useUserInteraction();

  useEffect(() => {
    const rareSections = ['/achievements', '/certifications', '/resume'];
    if (rareSections.includes(pathname)) {
      document.body.classList.add('rare-section-pulse-active');
      if (interactionData.isSoundEnabled && soundService.isAudioContextStarted()) {
         soundService.playSound('timelineRumble', { duration: '0.5s', note: 'C2' }); // Example: A brief, deep pulse
      }
      setTimeout(() => {
        document.body.classList.remove('rare-section-pulse-active');
      }, 300); // Duration of pulse animation
    }
  }, [pathname, interactionData.isSoundEnabled]);


  // Scroll handler for fast scroll detection
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let lastScrollTime = Date.now();
    const fastScrollThreshold = 300; // Pixels scrolled
    const timeThreshold = 100; // Milliseconds

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = currentTime - lastScrollTime;

      if (deltaTime < timeThreshold && deltaY > fastScrollThreshold) {
        logFastScroll(); // This will update context and trigger console log in SentientConsole
        document.body.classList.add('hyperactive-scroll-feedback');
        setTimeout(() => document.body.classList.remove('hyperactive-scroll-feedback'), 200);
      }
      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', handleScroll);
        }
    };
  }, [logFastScroll]);


  return (
    <>
      <AnimatePresence>
        {!introCompleted && <IntroAnimation />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {introCompleted && (
          <motion.div
            key={pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransitionVariants}
            className="flex flex-col min-h-screen"
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
