import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { IntroProvider } from '@/contexts/IntroContext';
import { UserInteractionProvider } from '@/contexts/UserInteractionContext';
import AppClientLayout from '@/components/AppClientLayout';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Amith Viswas Reddy – Software Engineer · AI & Automation',
  description:
    'Portfolio of Amith Viswas Reddy, Associate Software Engineer at Accenture building AI apps, agents and automation.',
};

export const viewport: Viewport = {
  themeColor: '#f1f2ee',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} ${mono.variable} font-sans antialiased`} suppressHydrationWarning>
        <UserInteractionProvider>
          <IntroProvider>
            <AppClientLayout>{children}</AppClientLayout>
          </IntroProvider>
        </UserInteractionProvider>
      </body>
    </html>
  );
}
