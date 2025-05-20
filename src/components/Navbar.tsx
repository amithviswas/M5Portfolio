
"use client";

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Geist } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const navLinks = [
  { name: 'Home', href: '/#home', id: 'home' },
  { name: 'About', href: '/#about', id: 'about' },
  { name: 'Skills', href: '/#skills', id: 'skills' },
  { name: 'Projects', href: '/#projects', id: 'projects' },
  { name: 'Certifications', href: '/certifications', id: 'certifications' },
  { name: 'Achievements', href: '/achievements', id: 'achievements' },
  { name: 'Resume', href: '/resume', id: 'resume' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');

  const determineActiveLink = useCallback(() => {
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';
    let newActive = pathname;

    if (pathname === '/') { // On the homepage
      if (currentHash) {
        newActive = `/${currentHash}`; // e.g. /#about
      } else {
        newActive = '/#home'; // Default to home if no hash
      }
    }
    // For other pages like /certifications, newActive is already pathname
    
    // Ensure it matches a navLink href for styling
    const matchingNavLink = navLinks.find(link => 
        link.href === newActive || // For /#hash links
        (link.href === pathname && pathname !== '/') // For direct page links not on root
    );

    if (matchingNavLink) {
      setActiveLink(matchingNavLink.href);
    } else if (pathname === '/' && !currentHash) {
      setActiveLink('/#home'); // Fallback for root path without hash
    } else {
      setActiveLink(pathname); // Fallback for other pages not exactly matching
    }

  }, [pathname]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    determineActiveLink(); // Initial determination
    window.addEventListener('hashchange', determineActiveLink, { passive: true });

    // Intersection Observer for homepage sections
    const sections = navLinks
      .filter(link => link.href.startsWith('/#'))
      .map(link => document.getElementById(link.id));

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Section active when its top is in the upper ~30% of viewport
      threshold: 0.01, // Small threshold
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (pathname !== '/') return; // Only run on homepage

      let newActiveSectionId = '';
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          newActiveSectionId = entry.target.id;
        }
      });
      
      if (newActiveSectionId) {
        setActiveLink(`/#${newActiveSectionId}`);
      } else if (window.scrollY < window.innerHeight * 0.2 && pathname === '/') { 
        // If scrolled near top and no specific section found, set to home
        setActiveLink('/#home');
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', determineActiveLink);
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, [pathname, determineActiveLink]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (href: string) => {
    closeMobileMenu();
    setActiveLink(href); // Set active link immediately on click

    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      if (pathname === '/') { // If on homepage, smooth scroll
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If on another page, Next.js Link will navigate to '/'
        // and the hash will be handled by the browser & useEffect/hashchange listener.
        // No explicit scrollIntoView needed here as Link handles the navigation.
      }
    }
  };

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
          <Link href="/#home" className="flex items-center group" onClick={() => handleNavLinkClick('/#home')}>
            <Car className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
            <span className="ml-3 text-xl font-bold uppercase tracking-wider text-primary-foreground group-hover:text-accent transition-colors duration-300">
              Amith V. Reddy
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <Link key={link.name} href={link.href} legacyBehavior passHref>
                  <a
                    className={`relative px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider
                      ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary-foreground'} 
                      transition-colors duration-300 group`}
                    onClick={(e) => {
                      if (link.href.startsWith('/#') && pathname === '/') {
                         e.preventDefault(); // Prevent default only for same-page hash links to allow our scroll
                      }
                      handleNavLinkClick(link.href);
                    }}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out
                      ${isActive ? 'scale-x-100' : ''}`}>
                    </span>
                  </a>
                </Link>
              );
            })}
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
              {navLinks.map((link) => {
                 const isActive = activeLink === link.href;
                return (
                  <Link key={link.name} href={link.href} legacyBehavior passHref>
                    <a
                      className={`block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider
                        ${isActive ? 'text-primary bg-accent/10' : 'text-muted-foreground hover:text-primary-foreground hover:bg-accent/5'}`}
                      onClick={(e) => {
                        if (link.href.startsWith('/#') && pathname === '/') {
                           e.preventDefault();
                        }
                        handleNavLinkClick(link.href);
                      }}
                    >
                      {link.name}
                    </a>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
