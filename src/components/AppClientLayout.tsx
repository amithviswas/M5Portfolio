
"use client";

import type { ReactNode } from 'react';
import { useIntroContext } from '@/contexts/IntroContext';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollMomentumBar from '@/components/ScrollMomentumBar'; // Added
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from 'framer-motion';

export default function AppClientLayout({ children }: { children: ReactNode }) {
  const { introCompleted } = useIntroContext();

  return (
    <>
      <AnimatePresence>
        {!introCompleted && <IntroAnimation />}
      </AnimatePresence>
      
      <AnimatePresence>
        {introCompleted && (
          <motion.div
            key="main-content-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }} 
            className="flex flex-col min-h-screen"
          >
            <ScrollMomentumBar /> {/* Added Bar */}
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
