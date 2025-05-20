
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
  { name: 'Contact', href: '/#contact', id: 'contact' }, // Added Contact link
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
    
    const matchingNavLink = navLinks.find(link => link.href === newActive || (link.href === pathname && !link.href.includes('#')));

    if (matchingNavLink) {
      setActiveLink(matchingNavLink.href);
    } else if (pathname === '/' && !currentHash) {
      setActiveLink('/#home'); 
    } else {
       const directPageMatch = navLinks.find(link => link.href === pathname);
       if (directPageMatch) {
        setActiveLink(directPageMatch.href);
       } else {
        setActiveLink(pathname === '/' ? '/#home' : pathname);
       }
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    
    determineActiveLink(); 

    window.addEventListener('hashchange', determineActiveLink, { passive: true });

    let observer: IntersectionObserver | null = null;
    if (pathname === '/') {
      const sections = navLinks
        .filter(link => link.href.startsWith('/#'))
        .map(link => document.getElementById(link.id))
        .filter(section => section !== null) as HTMLElement[]; // Ensure only non-null elements
      
      if (sections.length > 0) {
        const observerOptions = {
          root: null, 
          rootMargin: "-30% 0px -60% 0px", 
          threshold: 0.01, 
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveLink(`/#${entry.target.id}`);
            }
          });
          if (!entries.some(entry => entry.isIntersecting) && window.scrollY < window.innerHeight * 0.3) {
             if (pathname === '/') setActiveLink('/#home');
          }
        };
        observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => {
          if (section) observer!.observe(section);
        });
      }
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
    
    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.substring(2); 
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Manually update hash if not already set, or force activeLink update
        if (window.location.hash !== `#${targetId}`) {
          // history.pushState(null, '', `#${targetId}`); // Avoids full page reload, updates hash
        }
        setActiveLink(href); // Force active link update
      }
    } else if (href.startsWith('/#')) {
       // Handled by Next.js Link for cross-page hash navigation
       // Active link will be set by determineActiveLink on route change
    } else {
      // Navigating to a different page
      // Active link will be set by determineActiveLink on route change
    }
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
