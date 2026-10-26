"use client";

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

// The old full-screen intro is gone: content renders immediately (and without JS).
export default function AppClientLayout({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-mark focus:px-4 focus:py-3 focus:font-semibold"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-grow">
        {children}
      </main>
      <Footer />
      {hasMounted && <Toaster />}
    </>
  );
}
