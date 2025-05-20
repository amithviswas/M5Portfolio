
"use client";

import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

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

    if (pathname === '/') {
      if (currentHash) newActive = `/${currentHash}`;
      else newActive = '/#home';
    }
    
    const matchingNavLink = navLinks.find(link => link.href === newActive || (link.href === pathname && pathname !== '/'));

    if (matchingNavLink) setActiveLink(matchingNavLink.href);
    else if (pathname === '/' && !currentHash) setActiveLink('/#home');
    else setActiveLink(pathname);

  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    determineActiveLink(); // Determine active link on initial load and path change

    // Listener for hash changes (e.g., clicking a link that only changes the hash)
    window.addEventListener('hashchange', determineActiveLink, { passive: true });

    // Intersection Observer for homepage sections
    const sections = navLinks
      .filter(link => link.href.startsWith('/#'))
      .map(link => document.getElementById(link.id));
    
    const observerOptions = {
      root: null, // relative to document viewport
      rootMargin: "-30% 0px -60% 0px", // Triggers when section top is 30% from viewport top, or bottom is 60% from viewport bottom
      threshold: 0.01, // As soon as 1% of the target is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (pathname !== '/') return; // Only observe scrolling on the homepage

      let newActiveSectionId = '';
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          newActiveSectionId = entry.target.id;
        }
      });
      
      if (newActiveSectionId) {
        setActiveLink(`/#${newActiveSectionId}`);
      } else if (window.scrollY < window.innerHeight * 0.3 && pathname === '/') {
        // If scrolled near the top of the page and no other section is active, set to #home
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
    setActiveLink(href); // Immediately set active link for responsiveness
    if (href.startsWith('/#') && pathname === '/') {
      // If on the same page and it's a hash link, scroll smoothly
      const targetId = href.substring(2); // Remove '/#'
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
    // For cross-page hash links or direct page links, Next.js Link component handles navigation.
    // The hash will be appended, and the browser should scroll after navigation.
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-sans"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      style={{
        backgroundColor: isScrolled || mobileMenuOpen ? 'hsl(var(--background))' : 'transparent',
        boxShadow: isScrolled || mobileMenuOpen ? '0 4px 12px hsla(var(--primary)/0.2)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Image Logo */}
          <Link href="/#home" className="flex items-center group" onClick={() => handleNavLinkClick('/#home')}>
            <Image
              src="https://i.ibb.co/N2v0V2R8/Amith-Viswas-Reddy.png"
              alt="Amith Viswas Reddy Logo"
              width={180} // Adjust width as needed, maintaining aspect ratio with height
              height={40} // Desired height for the logo in the navbar
              className="object-contain group-hover:opacity-80 transition-opacity duration-300" // object-contain ensures the image scales down to fit
              priority // Good for LCP elements like logos
            />
          </Link>

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
                        e.preventDefault(); // Prevent default if on same page for smooth scroll
                      }
                      handleNavLinkClick(link.href);
                    }}
                  >
                    {link.name}
                    <span className={`absolute bottom-1 left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out
                      ${isActive ? 'scale-x-100' : ''}`}>
                    </span>
                  </a>
                </Link>
              );
            })}
          </div>

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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background border-t border-border/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                 const isActive = activeLink === link.href;
                return (
                  <Link key={link.name} href={link.href} legacyBehavior passHref>
                    <a
                      className={`block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider
                        ${isActive ? 'text-primary bg-card' : 'text-muted-foreground hover:text-primary-foreground hover:bg-card/50'}`}
                      onClick={(e) => {
                        if (link.href.startsWith('/#') && pathname === '/') {
                           e.preventDefault(); // Prevent default if on same page for smooth scroll
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
