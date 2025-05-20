"use client";

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { IntroProvider, useIntroContext } from '@/contexts/IntroContext';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from 'framer-motion';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Amith's M-Powered Portfolio",
  description: 'Personal portfolio of Amith Viswas Reddy, Data Scientist and AI/ML Enthusiast.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Apply dark theme by default */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <IntroProvider>
          <LayoutContent>{children}</LayoutContent>
          <Toaster />
        </IntroProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
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
    </>
  );
}
