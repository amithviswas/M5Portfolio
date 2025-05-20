
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

  const determineActiveLink = useCallback(() => {
    const currentPath = pathname;
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

    if (currentPath !== '/') {
      // For separate pages
      const matchedNavLink = navLinks.find(link => link.href === currentPath);
      if (matchedNavLink) {
        setActiveLink(matchedNavLink.href);
      } else {
        setActiveLink(currentPath); // Fallback for unlisted paths
      }
      return;
    }

    // For homepage sections with hash
    if (currentHash) {
      const matchedByHash = navLinks.find(link => link.href === `/${currentHash}`);
      if (matchedByHash) {
        setActiveLink(matchedByHash.href);
        return;
      }
    }
    
    // Fallback to observer or default to home if at top
    // The observer will take precedence if it finds an intersecting section.
    // If no section is intersecting (e.g., at the very top or between sections),
    // and no hash is present, default to home.
    if (window.scrollY < window.innerHeight * 0.3 && currentPath === '/') {
        setActiveLink('/#home');
    }

  }, [pathname]);


  useEffect(() => {
    navLinkRefs.current = navLinkRefs.current.slice(0, navLinks.length);
  }, []);

  const handleNavLinkMouseMove = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-laser-crest')) return;

    const rect = linkElement.getBoundingClientRect();
    const cursorXPercent = ((event.clientX - rect.left) / rect.width) * 100;

    let blueStopPercentage = 55;
    if (cursorXPercent < 50) {
      blueStopPercentage = 50 + ((50 - cursorXPercent) / 50) * 10;
    } else {
      blueStopPercentage = 50 - ((cursorXPercent - 50) / 50) * 10;
    }
    blueStopPercentage = Math.max(40, Math.min(60, blueStopPercentage));

    linkElement.style.setProperty('--grille-blue-stop-percentage-hover', `${blueStopPercentage}%`);
    linkElement.style.setProperty('--grille-red-start-percentage-hover', `${blueStopPercentage}%`);
  };

  const handleNavLinkMouseLeave = (index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-laser-crest')) return;
    linkElement.style.removeProperty('--grille-blue-stop-percentage-hover');
    linkElement.style.removeProperty('--grille-red-start-percentage-hover');
  };

  useEffect(() => {
    determineActiveLink(); // Initial call
    window.addEventListener('hashchange', determineActiveLink, { passive: true });
    window.addEventListener('scroll', determineActiveLink, { passive: true }); // Also re-evaluate on scroll for robustness

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
        rootMargin: "-40% 0px -55% 0px", // Adjusted rootMargin to be more sensitive around viewport center
        threshold: 0.01, // A small part of the section needs to be visible
      };

      const observerCallback: IntersectionObserverCallback = (entries) => {
        let foundActive = false;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = `/#${entry.target.id}`;
            setActiveLink(sectionId);
            incrementSectionVisit(entry.target.id);
            foundActive = true;
          }
        });
        if (!foundActive && window.scrollY < window.innerHeight * 0.3 && pathname ==='/') {
           setActiveLink('/#home');
        }
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      sections.forEach(section => {
        if (section) observer.observe(section);
      });
      sectionObserverRef.current = observer;

      // Initial check for homepage sections
      const currentHash = window.location.hash;
      if (currentHash) {
        const initialActiveLink = navLinks.find(link => link.href.endsWith(currentHash));
        if (initialActiveLink) {
          setActiveLink(initialActiveLink.href);
          incrementSectionVisit(initialActiveLink.id);
        }
      } else if (window.scrollY < 50) {
        setActiveLink('/#home');
        incrementSectionVisit('home');
      }

    } else if (pathname !== '/') {
      // For non-homepage paths, set active link based on pathname and increment visit
      const currentPathId = pathname.startsWith('/') ? pathname.substring(1) : pathname;
      const matchedNavLink = navLinks.find(link => link.href === pathname);
      if (matchedNavLink) {
        setActiveLink(matchedNavLink.href);
        incrementSectionVisit(matchedNavLink.id || currentPathId);
      } else {
         // Fallback for paths not explicitly in navLinks, e.g. dynamic routes
         setActiveLink(pathname);
         incrementSectionVisit(currentPathId);
      }
    }


    return () => {
      window.removeEventListener('hashchange', determineActiveLink);
      window.removeEventListener('scroll', determineActiveLink);
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect();
      }
    };
  }, [pathname, determineActiveLink, incrementSectionVisit]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (href: string, id: string) => {
    closeMobileMenu();
    setActiveLink(href);
    incrementSectionVisit(id);

    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Update hash without triggering full page reload if possible
        if (window.location.hash !== `#${targetId}`) {
           history.pushState(null, '', `#${targetId}`);
        }
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
              const isActive = activeLink === link.href;
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
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                 const isActive = activeLink === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider transition-m-blip nav-laser-crest',
                      isActive ? 'text-primary bg-card active-link' : 'text-muted-foreground hover:text-primary-foreground hover:bg-card/50'
                    )}
                    onClick={(e) => {
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
