
import type { Metadata } from 'next';
import { Rajdhani, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { IntroProvider } from '@/contexts/IntroContext';
import AppClientLayout from '@/components/AppClientLayout';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'], // Adjust weights as needed
  variable: '--font-playfair-display',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'], // Adjust weights as needed
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Amith's M-Powered Portfolio",
  description: 'High-performance portfolio of Amith Viswas Reddy, AI/ML Engineer & Data Scientist.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${rajdhani.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}>
        <IntroProvider>
          <AppClientLayout>{children}</AppClientLayout>
        </IntroProvider>
      </body>
    </html>
  );
}
