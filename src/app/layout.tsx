import type { Metadata } from 'next';
import { Rajdhani, Playfair_Display, Space_Grotesk, Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { IntroProvider } from '@/contexts/IntroContext';
import { UserInteractionProvider } from '@/contexts/UserInteractionContext';
import AppClientLayout from '@/components/AppClientLayout';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-space-grotesk',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT', 'WONK'], // 'wght' removed from here
  variable: '--font-fraunces',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className={`${rajdhani.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`} 
        suppressHydrationWarning
      >
          <UserInteractionProvider>
            <IntroProvider>
              <AppClientLayout>{children}</AppClientLayout>
            </IntroProvider>
          </UserInteractionProvider>
      </body>
    </html>
  );
}
