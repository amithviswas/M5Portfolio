
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Settings2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// import { useUserInteraction } from '@/contexts/UserInteractionContext'; // Rolled back

const navLinks = [
  { name: 'Home', href: '/', id: 'home' }, // Changed href to '/' for homepage consistency
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
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // const { incrementSectionVisit } = useUserInteraction(); // Rolled back

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setActiveLinkAndTrack = useCallback((href: string) => {
    setActiveLink(href);
    const sectionId = href.startsWith('/#') ? href.substring(2) : href.substring(1);
    if (sectionId) {
      // incrementSectionVisit(sectionId); // Rolled back
    }
  }, [/* incrementSectionVisit */]);

  // Effect for setting active link based on scroll and path changes
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
    
    // Homepage logic
    let initialActiveHref = '/'; // Default to home for '/'
    if (currentHash && navLinks.some(link => link.href === `/${currentHash}`)) {
      initialActiveHref = `/${currentHash}`;
    }
    setActiveLink(initialActiveHref); // Don't track visit yet, observer will handle scroll

    if (sectionObserverRef.current) sectionObserverRef.current.disconnect();

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (pathname !== '/') return; // Only run on homepage

      let currentHighestVisibleSectionId: string | null = null;
      let highestVisibleSectionTop = Infinity;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rect = entry.target.getBoundingClientRect();
          // Prioritize sections whose top is closer to the viewport's "active" zone top
          if (rect.top < window.innerHeight * 0.6 && rect.top < highestVisibleSectionTop) {
            highestVisibleSectionTop = rect.top;
            currentHighestVisibleSectionId = entry.target.id;
          }
        }
      });
      
      if (currentHighestVisibleSectionId) {
        const activeNav = navLinks.find(link => link.id === currentHighestVisibleSectionId);
        if (activeNav && activeNav.href !== activeLink) {
          setActiveLinkAndTrack(activeNav.href);
        }
      } else if (window.scrollY < window.innerHeight * 0.2 && activeLink !== '/') {
         // Fallback to home if scrolled to very top and no section is "highest"
        setActiveLinkAndTrack('/');
      }
    };

    const observerOptions = { root: null, rootMargin: "-30% 0px -45% 0px", threshold: 0.01 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionObserverRef.current = observer;

    navLinks.forEach(link => {
      if (link.href.startsWith('/#')) {
        const sectionElement = document.getElementById(link.id);
        if (sectionElement) observer.observe(sectionElement);
      }
    });
    
    // Initial check for home on load if no hash
    if(pathname === '/' && activeLink === '' && currentHash === ''){
      setTimeout(() => { // Timeout ensures DOM is ready
        if(activeLink === '') setActiveLinkAndTrack('/');
      }, 100);
    }

    const handleHashChange = () => {
      if (pathname === '/') {
        const newHash = window.location.hash;
        const matchedNavLink = navLinks.find(link => link.href === `/${newHash}`);
        if (matchedNavLink) {
          setActiveLinkAndTrack(matchedNavLink.href);
        } else if (!newHash && activeLink !== '/') {
           setActiveLinkAndTrack('/');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      if (sectionObserverRef.current) sectionObserverRef.current.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isMounted, pathname, activeLink, setActiveLinkAndTrack]);

  // Effect for tracking visits when activeLink changes
  // useEffect(() => { // Rolled back
  //   if (isMounted && activeLink) {
  //     const sectionId = activeLink.startsWith('/#') ? activeLink.substring(2) : activeLink.substring(1);
  //     if (sectionId) {
  //       // incrementSectionVisit(sectionId);
  //     }
  //   }
  // }, [activeLink, isMounted, /* incrementSectionVisit */]);


  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (href: string) => {
    closeMobileMenu();
    setActiveLinkAndTrack(href); // Set active link immediately on click

    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.substring(2); // Remove '/#'
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Update hash in URL without full page reload for smooth scroll
        if (window.location.hash !== `#${targetId}`) {
           history.pushState(null, '', `#${targetId}`);
        }
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // For links to other pages, Next.js Link component handles navigation
  };

  const handleNavLinkMouseMove = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (prefersReducedMotion) return;
    const linkElement = navLinkRefs.current[index];
    if (!linkElement) return;

    const rect = linkElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    // Shift split point: 55/45 (default) to 60/40 or 40/60
    const blueStop = Math.max(30, Math.min(70, 55 - (percentage - 50) * 0.2)); // Less aggressive shift
    const redStart = blueStop;

    linkElement.style.setProperty('--grille-blue-stop-percentage', `${blueStop}%`);
    linkElement.style.setProperty('--grille-red-start-percentage', `${redStart}%`);
  };

  const handleNavLinkMouseLeave = (index: number) => {
    if (prefersReducedMotion) return;
    const linkElement = navLinkRefs.current[index];
    if (linkElement) {
      linkElement.style.setProperty('--grille-blue-stop-percentage', `55%`);
      linkElement.style.setProperty('--grille-red-start-percentage', `55%`);
    }
  };

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 font-sans",
        "bg-background shadow-md" // Always fixed style from rollback
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> {/* Increased height for presence */}
          <Link href="/" className="flex items-center group" onClick={() => handleNavLinkClick('/')}>
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
              const isActive = activeLink === link.href || (pathname === '/' && activeLink === '' && link.href === '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  ref={el => navLinkRefs.current[index] = el}
                  onMouseMove={(e) => handleNavLinkMouseMove(e, index)}
                  onMouseLeave={() => handleNavLinkMouseLeave(index)}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider transition-m-throttle nav-rpm-underline', // Reverted to nav-rpm-underline
                    isActive ? 'active-link nav-rpm-active-glow' : 'text-muted-foreground hover:text-primary-foreground'
                  )}
                  onClick={(e) => {
                    if (link.href.startsWith('/#') && pathname === '/') e.preventDefault();
                    handleNavLinkClick(link.href);
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
            className={cn(
              "md:hidden border-t border-border/50",
              "bg-background shadow-md" // Consistent with fixed style
            )}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href || (pathname === '/' && activeLink === '' && link.href === '/');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider transition-m-throttle nav-rpm-underline', // Reverted to nav-rpm-underline
                      isActive ? 'active-link nav-rpm-active-glow bg-card' : 'text-muted-foreground hover:text-primary-foreground hover:bg-card/50'
                    )}
                    onClick={(e) => {
                      if (link.href.startsWith('/#') && pathname === '/') e.preventDefault();
                      handleNavLinkClick(link.href);
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
