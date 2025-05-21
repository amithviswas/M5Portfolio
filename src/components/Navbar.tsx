
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react'; // Added Zap
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

  const setActiveLinkAndTrack = useCallback((href: string, sectionIdToTrack?: string) => {
    setActiveLink(href);
    if (sectionIdToTrack) {
      incrementSectionVisit(sectionIdToTrack);
    }
  }, [incrementSectionVisit]);
  
  // Effect for setting active link based on pathname and hash, and for IntersectionObserver
  useEffect(() => {
    if (!isMounted) return;

    const currentHash = window.location.hash;

    if (pathname !== '/') { // For non-homepage routes
      setActiveLinkAndTrack(pathname, pathname.substring(1));
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect();
      }
      return;
    }

    // Homepage specific logic
    let initialActiveHref = '/#home';
    let initialSectionId = 'home';

    if (currentHash) {
      const matchedNavLink = navLinks.find(link => link.href === `/${currentHash}`);
      if (matchedNavLink) {
        initialActiveHref = matchedNavLink.href;
        initialSectionId = matchedNavLink.id;
      }
    }
    // Set initial active link but delay tracking to avoid race condition if observer fires immediately
    setActiveLink(initialActiveHref);
    // Initial tracking can happen after a slight delay or be tied to observer's first fire

    
    // Setup IntersectionObserver for homepage sections
    if (sectionObserverRef.current) {
      sectionObserverRef.current.disconnect();
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (pathname !== '/') return;

      let currentHighestVisibleSectionId: string | null = null;
      let highestVisibleSectionTop = Infinity;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rect = entry.target.getBoundingClientRect();
          // Prioritize section whose top is higher in the viewport, within a certain "active zone"
          // This threshold (0.6 * window.innerHeight) means the top 60% of the viewport
          if (rect.top < window.innerHeight * 0.6 && rect.top < highestVisibleSectionTop) { 
            highestVisibleSectionTop = rect.top;
            currentHighestVisibleSectionId = entry.target.id;
          }
        }
      });
      
      if (currentHighestVisibleSectionId) {
        const activeNav = navLinks.find(link => link.id === currentHighestVisibleSectionId);
        if (activeNav && activeNav.href !== activeLink) {
          setActiveLinkAndTrack(activeNav.href, activeNav.id);
        }
      } else if (window.scrollY < window.innerHeight * 0.2 && activeLink !== '/#home') {
        // If scrolled near top and no specific section is "highest", default to home
        setActiveLinkAndTrack('/#home', 'home');
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -45% 0px", 
      threshold: 0.01, // Fire even if only a tiny bit is visible within the rootMargin
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

    // Initial tracking for home page if observer hasn't fired yet
    if(pathname === '/' && !activeLink.startsWith('/#') && currentHash === ''){ // Only if no hash and observer hasn't set one
        setTimeout(() => {
            if(activeLink === '' || activeLink ==='/') setActiveLinkAndTrack('/#home', 'home');
        }, 100)
    }


    const handleHashChange = () => {
      if (pathname === '/') {
        const newHash = window.location.hash;
        const matchedNavLink = navLinks.find(link => link.href === `/${newHash}`);
        if (matchedNavLink) {
          setActiveLinkAndTrack(matchedNavLink.href, matchedNavLink.id);
        } else if (!newHash && activeLink !== '/#home') {
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
  }, [isMounted, pathname, activeLink, setActiveLinkAndTrack]); // Added activeLink


  const handleNavLinkMouseMove = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-rpm-underline')) return;

    const rect = linkElement.getBoundingClientRect();
    const cursorXPercent = ((event.clientX - rect.left) / rect.width) * 100;
    
    const baseSplit = 55; 
    const driftAmount = 15; 

    let blueStopPercentage = baseSplit;
    if (cursorXPercent < 50) { 
      blueStopPercentage = baseSplit + ((50 - cursorXPercent) / 50) * driftAmount;
    } else { 
      blueStopPercentage = baseSplit - ((cursorXPercent - 50) / 50) * driftAmount;
    }
    blueStopPercentage = Math.max(40, Math.min(70, blueStopPercentage)); 

    linkElement.style.setProperty('--grille-blue-stop-percentage', `${blueStopPercentage}%`);
    linkElement.style.setProperty('--grille-red-start-percentage', `${blueStopPercentage}%`);
  };

  const handleNavLinkMouseLeave = (index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-rpm-underline')) return;
    linkElement.style.setProperty('--grille-blue-stop-percentage', `55%`);
    linkElement.style.setProperty('--grille-red-start-percentage', `55%`);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (href: string, sectionId: string) => {
    closeMobileMenu();
    // Visual update immediate, tracking handled by useEffect on activeLink change
    setActiveLink(href); // Set active link for immediate visual feedback

    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.substring(2); // Remove '/#'
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Update URL hash without full page reload for smooth scroll + observer to catch
        if (window.location.hash !== `#${targetId}`) {
           history.pushState(null, '', `#${targetId}`);
        }
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // For links to different pages, Next.js Link component handles navigation
  };

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out font-sans",
        "bg-background shadow-[0_4px_12px_hsla(var(--primary)/0.2)]" // Always fixed style
      )}
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
                    'relative px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider group transition-m-throttle',
                    'nav-rpm-underline', // Apply RPM underline style
                    isActive ? 'text-primary nav-rpm-active-glow active-link' : 'text-muted-foreground hover:text-primary-foreground'
                  )}
                  onClick={(e) => {
                    if (link.href.startsWith('/#') && pathname === '/') e.preventDefault();
                    handleNavLinkClick(link.href, link.id);
                  }}
                >
                  {link.name}
                  {/* RPM underline is now handled by .nav-rpm-underline::after */}
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
            className={cn(
              "md:hidden border-t border-border/50",
              "bg-background shadow-[0_4px_12px_hsla(var(--primary)/0.2)]" // Consistent background for mobile
            )}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                 const isActive = activeLink === link.href || (pathname === '/' && activeLink === '' && link.href === '/#home');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider transition-m-throttle',
                      'nav-rpm-underline', // Apply RPM underline style to mobile links
                      isActive ? 'text-primary bg-card nav-rpm-active-glow active-link' : 'text-muted-foreground hover:text-primary-foreground hover:bg-card/50'
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
    
