
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Using shadcn Button
import { Geist } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'Resume', href: '/resume' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${geistSans.variable} font-sans`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      style={{
        backgroundColor: isScrolled || mobileMenuOpen ? 'hsl(var(--background))' : 'transparent',
        boxShadow: isScrolled || mobileMenuOpen ? '0 4px 12px hsla(var(--primary)/0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/#home" className="flex items-center group" onClick={() => {
            closeMobileMenu();
            if (pathname === '/') {
              document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
            }
            // If not on home, Link will navigate to /#home
          }}>
            <Car className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
            <span className="ml-3 text-xl font-bold uppercase tracking-wider text-primary-foreground group-hover:text-accent transition-colors duration-300">
              Amith V. Reddy
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} legacyBehavior passHref>
                <a
                  className={`relative px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider
                    ${pathname === link.href || (link.href.startsWith('/#') && pathname === '/' && typeof window !== 'undefined' && window.location.hash === link.href.substring(1)) 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary-foreground'} 
                    transition-colors duration-300 group`}
                  onClick={(e) => {
                    if (link.href.startsWith('/#')) {
                      if (pathname === '/') {
                        e.preventDefault();
                        const targetSelector = link.href.substring(1); // #about
                        document.querySelector(targetSelector)?.scrollIntoView({ behavior: 'smooth' });
                      }
                      // If not on home page, Link's default behavior will navigate to /#hash
                    }
                    // For non-hash links, Link's default behavior handles it.
                  }}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out
                    ${pathname === link.href || (link.href.startsWith('/#') && pathname === '/' && typeof window !== 'undefined' && window.location.hash === link.href.substring(1)) ? 'scale-x-100' : ''}`}>
                  </span>
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-primary-foreground hover:text-primary"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background border-t border-[hsl(var(--border)/0.5)]"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} legacyBehavior passHref>
                  <a
                    className={`block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider
                      ${pathname === link.href || (link.href.startsWith('/#') && pathname === '/' && typeof window !== 'undefined' && window.location.hash === link.href.substring(1)) 
                        ? 'text-primary bg-accent/10' 
                        : 'text-muted-foreground hover:text-primary-foreground hover:bg-accent/5'}`}
                    onClick={(e) => {
                      closeMobileMenu();
                      if (link.href.startsWith('/#')) {
                        if (pathname === '/') {
                          e.preventDefault();
                          const targetSelector = link.href.substring(1); // #about
                          document.querySelector(targetSelector)?.scrollIntoView({ behavior: 'smooth' });
                        }
                        // If not on home page, Link's default behavior will navigate to /#hash
                      }
                      // For non-hash links, Link's default behavior handles it.
                    }}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
