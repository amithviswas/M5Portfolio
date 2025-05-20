
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUserInteraction } from '@/contexts/UserInteractionContext';

const navLinks = [
  { name: 'Home', href: '/#home', id: 'home' },
  { name: 'About', href: '/#about', id: 'about' },
  { name: 'Skills', href: '/#skills', id: 'skills' },
  { name: 'Projects', href: '/#projects', id: 'projects' },
  { name: 'Certifications', href: '/certifications', id: 'certifications' },
  { name: 'Achievements', href: '/achievements', id: 'achievements' },
  { name: 'Resume', href: '/resume', id: 'resume' },
  { name: 'Contact', href: '/contact', id: 'contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  const { incrementSectionVisit } = useUserInteraction();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setActiveLinkAndTrack = useCallback((href: string, sectionId?: string) => {
    setActiveLink(prevActiveLink => {
      if (prevActiveLink !== href) {
        if (sectionId) {
          incrementSectionVisit(sectionId);
        } else {
          // Fallback to derive sectionId from href if it's a homepage hash link
          const matchingNavLink = navLinks.find(nl => nl.href === href && nl.href.startsWith('/#'));
          if (matchingNavLink) {
            incrementSectionVisit(matchingNavLink.id);
          }
        }
      }
      return href;
    });
  }, [incrementSectionVisit]);

  // Effect for setting active link based on pathname and hash, and for IntersectionObserver
  useEffect(() => {
    if (!isMounted) return;

    const currentHash = window.location.hash;

    if (pathname !== '/') {
      setActiveLinkAndTrack(pathname);
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect();
      }
      return;
    }

    // Homepage specific logic
    let initialActiveHref = '/#home';
    if (currentHash) {
      const matchedNavLink = navLinks.find(link => link.href === `/${currentHash}`);
      if (matchedNavLink) {
        initialActiveHref = matchedNavLink.href;
      }
    }
    setActiveLinkAndTrack(initialActiveHref, initialActiveHref.substring(2));
    
    // Setup IntersectionObserver for homepage sections
    if (sectionObserverRef.current) {
      sectionObserverRef.current.disconnect();
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (pathname !== '/') return; // Only run on homepage

      let currentHighestVisibleSectionId: string | null = null;
      let highestVisibleSectionTop = Infinity;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rect = entry.target.getBoundingClientRect();
           // Consider sections whose top is within the top 60% of the viewport
          if (rect.top < window.innerHeight * 0.6 && rect.top < highestVisibleSectionTop) {
            highestVisibleSectionTop = rect.top;
            currentHighestVisibleSectionId = entry.target.id;
          }
        }
      });
      
      if (currentHighestVisibleSectionId) {
        const activeNavLinK = navLinks.find(link => link.id === currentHighestVisibleSectionId);
        if (activeNavLinK) {
          setActiveLinkAndTrack(activeNavLinK.href, activeNavLinK.id);
        }
      } else if (window.scrollY < window.innerHeight * 0.2) { // Very top of the page
        setActiveLinkAndTrack('/#home', 'home');
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px", // Section active if top enters this zone
      threshold: 0.01, // Small threshold
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionObserverRef.current = observer;

    navLinks.forEach(link => {
      if (link.href.startsWith('/#')) {
        const sectionElement = document.getElementById(link.id);
        if (sectionElement) {
          observer.observe(sectionElement);
        }
      }
    });

    const handleHashChange = () => {
      if (pathname === '/') {
        const newHash = window.location.hash;
        const matchedNavLink = navLinks.find(link => link.href === `/${newHash}`);
        if (matchedNavLink) {
          setActiveLinkAndTrack(matchedNavLink.href, matchedNavLink.id);
        } else if (!newHash) {
           setActiveLinkAndTrack('/#home', 'home');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect();
      }
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isMounted, pathname, setActiveLinkAndTrack]);


  const handleNavLinkMouseMove = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-laser-crest')) return;

    const rect = linkElement.getBoundingClientRect();
    const cursorXPercent = ((event.clientX - rect.left) / rect.width) * 100;

    let blueStopPercentage = 55; 
    const driftAmount = 15; 

    if (cursorXPercent < 50) { 
      blueStopPercentage = 55 + ((50 - cursorXPercent) / 50) * driftAmount;
    } else { 
      blueStopPercentage = 55 - ((cursorXPercent - 50) / 50) * driftAmount;
    }
    blueStopPercentage = Math.max(40, Math.min(70, blueStopPercentage));

    linkElement.style.setProperty('--grille-blue-stop-percentage-hover', `${blueStopPercentage}%`);
    linkElement.style.setProperty('--grille-red-start-percentage-hover', `${blueStopPercentage}%`);
  };

  const handleNavLinkMouseLeave = (index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-laser-crest')) return;
    linkElement.style.removeProperty('--grille-blue-stop-percentage-hover');
    linkElement.style.removeProperty('--grille-red-start-percentage-hover');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (href: string, sectionId: string) => {
    closeMobileMenu();
    setActiveLinkAndTrack(href, sectionId); // Set active link and track visit immediately

    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        if (window.location.hash !== `#${targetId}`) {
           history.pushState(null, '', `#${targetId}`);
        }
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // For links to other pages or hash links from other pages, Next.js Link handles navigation.
    // The useEffect will then pick up the new pathname or hash to set the active link.
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out font-sans"
      style={{
        backgroundColor: 'hsl(var(--background))',
        boxShadow: '0 4px 12px hsla(var(--primary)/0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/#home" className="flex items-center group" onClick={() => handleNavLinkClick('/#home', 'home')}>
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
            {navLinks.map((link, index) => {
              const isActive = activeLink === link.href || (pathname === '/' && activeLink === '' && link.href === '/#home');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  ref={el => navLinkRefs.current[index] = el}
                  onMouseMove={(e) => handleNavLinkMouseMove(e, index)}
                  onMouseLeave={() => handleNavLinkMouseLeave(index)}
                  className={cn(
                    'relative px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider nav-laser-crest group transition-m-blip',
                    isActive ? 'text-primary active-link' : 'text-muted-foreground hover:text-primary-foreground'
                  )}
                  onClick={(e) => {
                    if (link.href.startsWith('/#') && pathname === '/') e.preventDefault();
                    handleNavLinkClick(link.href, link.id);
                  }}
                >
                  {link.name}
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
            style={{
              boxShadow: '0 4px 12px hsla(var(--primary)/0.2)',
            }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                 const isActive = activeLink === link.href || (pathname === '/' && activeLink === '' && link.href === '/#home');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider transition-m-blip nav-laser-crest',
                      isActive ? 'text-primary bg-card active-link' : 'text-muted-foreground hover:text-primary-foreground hover:bg-card/50'
                    )}
                    onClick={(e) => {
                      if (link.href.startsWith('/#') && pathname === '/') e.preventDefault();
                      handleNavLinkClick(link.href, link.id);
                    }}
                  >
                    {link.name}
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

    