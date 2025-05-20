"use client";

import type { ReactNode } from 'react';
import { useIntroContext } from '@/contexts/IntroContext';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
            transition={{ duration: 0.5, delay: 0.1 }} // Delay slightly after intro fades
            className="flex flex-col min-h-screen"
          >
            <Navbar />
            <main className="flex-grow pt-20"> {/* Add padding-top for fixed navbar */}
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
