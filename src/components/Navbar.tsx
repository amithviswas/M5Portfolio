
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/#home', id: 'home' },
  { name: 'About', href: '/#about', id: 'about' },
  { name: 'Skills', href: '/#skills', id: 'skills' },
  { name: 'Projects', href: '/#projects', id: 'projects' },
  { name: 'Certifications', href: '/certifications', id: 'certifications' },
  { name: 'Achievements', href: '/achievements', id: 'achievements' },
  { name: 'Resume', href: '/resume', id: 'resume' },
  { name: 'Contact', href: '/contact', id: 'contact' }, // Changed to direct page link
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');

  const determineActiveLink = useCallback(() => {
    let newActive = pathname;
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

    if (pathname === '/') { // Homepage logic
      if (currentHash) {
        newActive = `/${currentHash}`; // e.g., /#about
      } else {
        newActive = '/#home'; // Default to home section if no hash
      }
    }
    // For other pages, newActive is already pathname (e.g., /resume, /contact)

    const matchingNavLink = navLinks.find(link => link.href === newActive);
    if (matchingNavLink) {
      setActiveLink(matchingNavLink.href);
    } else {
      // Fallback if no exact match (e.g. dynamic routes not in navLinks, though not applicable here yet)
      setActiveLink(pathname === '/' ? '/#home' : pathname);
    }
  }, [pathname]);


  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
        if (pathname === '/') { // Only run IntersectionObserver logic on homepage
            // If user scrolls to top and no specific section is "active", highlight "Home"
            if (window.scrollY < window.innerHeight * 0.3 && !document.querySelector('.active-section-observed')) {
                 setActiveLink('/#home');
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    determineActiveLink(); 

    window.addEventListener('hashchange', determineActiveLink, { passive: true });

    let observer: IntersectionObserver | null = null;
    if (pathname === '/') { // Only setup observer for homepage sections
      const sections = navLinks
        .filter(link => link.href.startsWith('/#'))
        .map(link => document.getElementById(link.id))
        .filter(section => section !== null) as HTMLElement[];
      
      if (sections.length > 0) {
        const observerOptions = {
          root: null, 
          rootMargin: "-30% 0px -60% 0px", // Adjust based on when you want link to activate
          threshold: 0.01, // Small part of section visible
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
          let activeSectionFound = false;
          entries.forEach(entry => {
            // Add a class to observed elements to track them for the top-of-page home link logic
            if (entry.isIntersecting) entry.target.classList.add('active-section-observed');
            else entry.target.classList.remove('active-section-observed');

            if (entry.isIntersecting) {
              setActiveLink(`/#${entry.target.id}`);
              activeSectionFound = true;
            }
          });
          // If scrolled but no section is actively intersecting (e.g. in-between sections),
          // and we are not at the very top, don't change activeLink.
          // If at top and no section is active, handleScroll will set it to /#home.
        };
        observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => {
          if (section) observer!.observe(section);
        });
      }
    } else {
        // For non-homepage paths, ensure activeLink reflects the current page
        determineActiveLink();
    }


    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', determineActiveLink);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname, determineActiveLink]);


  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (href: string) => {
    closeMobileMenu();
    
    // For hash links on the same page (homepage), scroll smoothly
    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.substring(2); 
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Manually update hash and active link.
        // Using history.pushState to avoid triggering a full hashchange event loop if not needed.
        if (window.location.hash !== `#${targetId}`) {
           history.pushState(null, '', `#${targetId}`);
        }
        setActiveLink(href); 
      }
    }
    // For direct page links or hash links from other pages, Next.js Link handles navigation.
    // activeLink will be updated by determineActiveLink via useEffect on pathname change.
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-sans nav-grille-underline-container" // Added container for context
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
          <Link href="/#home" className="flex items-center group" onClick={() => handleNavLinkClick('/#home')}>
            <Image
              src="https://i.ibb.co/N2v0V2R8/Amith-Viswas-Reddy.png"
              alt="Amith Viswas Reddy Logo"
              width={180} 
              height={40} 
              className="object-contain group-hover:opacity-80 transition-opacity duration-300"
              priority
            />
          </Link>

          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <Link key={link.name} href={link.href} legacyBehavior passHref>
                  <a
                    className={cn(
                      'relative px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider nav-grille-underline group',
                      isActive ? 'text-primary active-link' : 'text-muted-foreground hover:text-primary-foreground'
                    )}
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
