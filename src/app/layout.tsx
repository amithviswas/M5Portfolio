
import type { Metadata } from 'next';
import { Rajdhani } from 'next/font/google'; // Changed from Geist
import './globals.css';
import { IntroProvider } from '@/contexts/IntroContext';
import AppClientLayout from '@/components/AppClientLayout';

const rajdhani = Rajdhani({ // Changed from Geist
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Rajdhani weights
  variable: '--font-rajdhani', // CSS variable for Rajdhani
});

export const metadata: Metadata = {
  title: "Amith's M5-Inspired Portfolio", // Updated title
  description: 'High-performance portfolio of Amith Viswas Reddy, AI/ML Engineer & Data Scientist.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Assuming dark theme is default as per new design */}
      <body className={`${rajdhani.variable} font-sans antialiased bg-background text-foreground`}>
        <IntroProvider>
          <AppClientLayout>{children}</AppClientLayout>
        </IntroProvider>
      </body>
    </html>
  );
}
