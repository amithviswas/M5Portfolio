
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// Assuming UserInteractionContext is still used for tracking visits or other interactions
// If not, this import and related logic can be removed.
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement | null>>(new Map());
  const { incrementSectionVisit } = useUserInteraction(); // Keep if still used

  useEffect(() => {
    setIsMounted(true);
    navLinks.forEach(link => {
      if (link.id) {
        const element = document.getElementById(link.id);
        if (element) {
          sectionRefs.current.set(link.id, element);
        }
      }
    });
  }, []);

  const setActiveLinkAndTrack = useCallback((href: string, sectionId?: string) => {
    if (activeLink !== href) {
      setActiveLink(href);
      if (sectionId && pathname === '/' && isMounted) { // Ensure isMounted before calling context
         incrementSectionVisit(sectionId);
      }
    }
  }, [activeLink, pathname, incrementSectionVisit, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
        let currentBestMatch: IntersectionObserverEntry | null = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!currentBestMatch || entry.boundingClientRect.top < currentBestMatch.boundingClientRect.top) {
                    currentBestMatch = entry;
                }
            }
        });

        if (window.scrollY < 100 && pathname === '/') {
            setActiveLinkAndTrack('/#home', 'home');
        } else if (currentBestMatch) {
            const activeNav = navLinks.find(link => link.id === currentBestMatch!.target.id);
            if (activeNav) {
                setActiveLinkAndTrack(activeNav.href, activeNav.id);
            }
        }
    };

    if (pathname === '/') {
        observerRef.current = new IntersectionObserver(observerCallback, {
            rootMargin: "-40% 0px -40% 0px", // Middle 20% of the viewport
            threshold: 0.01,
        });

        sectionRefs.current.forEach(sectionEl => {
            if (sectionEl) observerRef.current?.observe(sectionEl);
        });

        // Initial check
        const currentHash = window.location.hash;
        if (currentHash) {
            const matchedLink = navLinks.find(link => link.href === `/${currentHash}`);
            if (matchedLink) setActiveLinkAndTrack(matchedLink.href, matchedLink.id);
        } else if (window.scrollY < 100) {
            setActiveLinkAndTrack('/#home', 'home');
        }

    } else {
        setActiveLinkAndTrack(pathname);
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
    }

    const handleHashChange = () => {
      if (pathname === '/') {
        const newHash = window.location.hash;
        const matchedNavLink = navLinks.find(link => link.href === `/${newHash}`);
        if (matchedNavLink) {
          setActiveLinkAndTrack(matchedNavLink.href, matchedNavLink.id);
        } else if (!newHash && window.scrollY < 100) {
           setActiveLinkAndTrack('/#home', 'home');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isMounted, pathname, setActiveLinkAndTrack]);


  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId?: string) => {
    closeMobileMenu();
    setActiveLinkAndTrack(href, sectionId); 

    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const targetId = sectionId || href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        if (window.location.hash !== `#${targetId}`) {
           history.pushState(null, '', `#${targetId}`);
        }
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  return (
    <nav // Changed from motion.nav to nav for simplicity as animations are on links
      className={cn(
        "fixed top-0 left-0 right-0 z-50 font-sans",
        "bg-background shadow-md" 
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group" onClick={(e) => handleNavLinkClick(e as any, '/#home', 'home')}>
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
              const isActive = activeLink === link.href || (pathname === '/' && activeLink === '' && link.href === '/#home');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider nav-m-stripe-underline', // Updated class for new M-stripe underline
                    isActive ? 'active-link text-primary' : 'text-muted-foreground hover:text-primary-foreground' // Ensure active link text color
                  )}
                  onClick={(e) => handleNavLinkClick(e, link.href, link.id)}
                  aria-current={isActive ? 'page' : undefined}
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
              "bg-background shadow-md"
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
                      'block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider nav-m-stripe-underline', // Updated class
                      isActive ? 'active-link text-primary' : 'text-muted-foreground hover:text-primary-foreground hover:bg-card/50'
                    )}
                    onClick={(e) => handleNavLinkClick(e, link.href, link.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
