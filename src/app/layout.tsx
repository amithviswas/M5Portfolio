// REMOVE "use client"; directive from here

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { IntroProvider } from '@/contexts/IntroContext'; // Only need IntroProvider
import AppClientLayout from '@/components/AppClientLayout'; // Import the new client layout component

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = { // This is NOW VALID
  title: "Amith's M-Powered Portfolio",
  description: 'Personal portfolio of Amith Viswas Reddy, Data Scientist and AI/ML Enthusiast.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <IntroProvider>
          <AppClientLayout>{children}</AppClientLayout>
        </IntroProvider>
      </body>
    </html>
  );
}
