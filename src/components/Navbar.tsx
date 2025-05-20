
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
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  const { incrementSectionVisit } = useUserInteraction();

  const handleNavLinkMouseMove = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-laser-crest')) return;

    const rect = linkElement.getBoundingClientRect();
    const cursorXPercent = ((event.clientX - rect.left) / rect.width) * 100;

    let blueStopPercentage = 55; // Default split
    const driftAmount = 15; // How much the split can drift towards cursor, max 15%

    if (cursorXPercent < 50) { // Cursor on left half
      blueStopPercentage = 55 + ((50 - cursorXPercent) / 50) * driftAmount;
    } else { // Cursor on right half
      blueStopPercentage = 55 - ((cursorXPercent - 50) / 50) * driftAmount;
    }
    // Clamp values between, for example, 40% and 70% to keep both colors visible
    blueStopPercentage = Math.max(40, Math.min(70, blueStopPercentage));

    linkElement.style.setProperty('--grille-blue-stop-percentage-hover', `${blueStopPercentage}%`);
    linkElement.style.setProperty('--grille-red-start-percentage-hover', `${blueStopPercentage}%`);
  };

  const handleNavLinkMouseLeave = (index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-laser-crest')) return;
    // Reset to default non-hover split or remove if you want it to snap back sharply
    linkElement.style.removeProperty('--grille-blue-stop-percentage-hover');
    linkElement.style.removeProperty('--grille-red-start-percentage-hover');
  };

  const setActiveLinkAndTrackVisit = useCallback((href: string, id?: string) => {
    if (activeLink !== href) {
      setActiveLink(href);
      if (id) {
        incrementSectionVisit(id);
      } else {
        // Try to find id if not provided (e.g. for path-based links)
        const foundLink = navLinks.find(nl => nl.href === href);
        if (foundLink?.id) incrementSectionVisit(foundLink.id);
      }
    }
  }, [activeLink, incrementSectionVisit]);


  useEffect(() => {
    navLinkRefs.current = navLinkRefs.current.slice(0, navLinks.length);
  }, []);

  useEffect(() => {
    // Initial active link determination based on path and hash
    const currentPath = pathname;
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';
    let initialActiveHref = '';
    let initialActiveId = '';

    if (currentPath !== '/') {
      const matchedNavLink = navLinks.find(link => link.href === currentPath);
      if (matchedNavLink) {
        initialActiveHref = matchedNavLink.href;
        initialActiveId = matchedNavLink.id;
      } else {
        initialActiveHref = currentPath; // Fallback for unlisted paths
        initialActiveId = currentPath.replace('/', '');
      }
    } else { // Homepage
      if (currentHash) {
        const matchedByHash = navLinks.find(link => link.href === `/${currentHash}`);
        if (matchedByHash) {
          initialActiveHref = matchedByHash.href;
          initialActiveId = matchedByHash.id;
        }
      }
      if (!initialActiveHref && window.scrollY < window.innerHeight * 0.1) {
        initialActiveHref = '/#home';
        initialActiveId = 'home';
      }
    }
    if (initialActiveHref) {
      setActiveLinkAndTrackVisit(initialActiveHref, initialActiveId);
    }

    // Intersection Observer setup
    if (sectionObserverRef.current) {
      sectionObserverRef.current.disconnect();
    }

    const sections = navLinks
      .filter(link => link.href.startsWith('/#'))
      .map(link => document.getElementById(link.id))
      .filter(section => section !== null) as HTMLElement[];

    if (sections.length > 0 && pathname === '/') {
      const observerOptions = {
        root: null,
        rootMargin: "-30% 0px -45% 0px", // Section active if top is within 30%-55% of viewport height
        threshold: 0, // Any part of section in rootMargin triggers
      };

      const observerCallback: IntersectionObserverCallback = (entries) => {
        if (pathname !== '/') return;

        let highestVisibleSection: { href: string; id: string; top: number } | null = null;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const matchingNavLink = navLinks.find(link => link.id === entry.target.id);
            if (matchingNavLink) {
              const rect = entry.boundingClientRect;
              if (!highestVisibleSection || rect.top < highestVisibleSection.top) {
                highestVisibleSection = { href: matchingNavLink.href, id: matchingNavLink.id, top: rect.top };
              }
            }
          }
        });

        if (highestVisibleSection) {
           setActiveLinkAndTrackVisit(highestVisibleSection.href, highestVisibleSection.id);
        } else if (window.scrollY < window.innerHeight * 0.1) { // At the very top of homepage
           setActiveLinkAndTrackVisit('/#home', 'home');
        }
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      sections.forEach(section => {
        if (section) observer.observe(section);
      });
      sectionObserverRef.current = observer;
    }

    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (pathname === '/' && newHash) {
        const matchedByHash = navLinks.find(link => link.href === `/${newHash}`);
        if (matchedByHash) {
          setActiveLinkAndTrackVisit(matchedByHash.href, matchedByHash.id);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange, { passive: true });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect();
      }
    };
  }, [pathname, setActiveLinkAndTrackVisit]);


  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (href: string, id: string) => {
    closeMobileMenu();
    setActiveLinkAndTrackVisit(href, id); // Set active link and track visit immediately

    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.substring(2); // Remove '/#'
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Update hash without triggering full page reload if possible
        // History API might not always trigger observer as expected, hence manual setActiveLink
        if (window.location.hash !== `#${targetId}`) {
           history.pushState(null, '', `#${targetId}`);
        }
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('/#') && pathname !== '/') {
      // Navigating to a homepage section from another page
      // Next.js Link component will handle navigation. The hash will be processed by useEffect.
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out font-sans"
      style={{
        backgroundColor: 'hsl(var(--background))', // Always use the dark background
        boxShadow: '0 4px 12px hsla(var(--primary)/0.2)', // Always apply shadow
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> {/* Navbar height */}
          <Link href="/#home" className="flex items-center group" onClick={() => handleNavLinkClick('/#home', 'home')}>
            <Image
              src="https://i.ibb.co/N2v0V2R8/Amith-Viswas-Reddy.png" // Your image logo
              alt="Amith Viswas Reddy Logo"
              width={180} // Adjust as needed
              height={40} // Adjust as needed
              className="object-contain group-hover:opacity-80 transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link, index) => {
              const isActive = activeLink === link.href || (activeLink === '/' && link.href === '/#home');
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
                    if (link.href.startsWith('/#') && pathname === '/') e.preventDefault(); // Prevent default for same-page hash links if Link handles scroll
                    handleNavLinkClick(link.href, link.id);
                  }}
                >
                  {link.name}
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
            className="md:hidden bg-background border-t border-border/50" // Use background for consistency
            style={{
              boxShadow: '0 4px 12px hsla(var(--primary)/0.2)', // Consistent shadow
            }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                 const isActive = activeLink === link.href || (activeLink === '/' && link.href === '/#home');
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

    