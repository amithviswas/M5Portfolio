
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
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
  { name: 'Contact', href: '/contact', id: 'contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement | null>>(new Map());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Consolidated function to set active link
  const updateActiveLink = useCallback((href: string) => {
    // Only update if the link has actually changed to avoid redundant re-renders
    if (activeLink !== href) {
      setActiveLink(href);
    }
  }, [activeLink]);


  useEffect(() => {
    if (!isMounted) return;

    // Clear existing observer if pathname changes
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (pathname === '/') {
      // Set initial active link for homepage
      const currentHash = window.location.hash;
      let initialActive = '/#home';
      if (currentHash) {
        const matchingLink = navLinks.find(link => link.href.endsWith(currentHash));
        if (matchingLink) {
          initialActive = matchingLink.href;
        }
      }
      updateActiveLink(initialActive);
      if (window.scrollY < 100 && !currentHash) {
        updateActiveLink('/#home');
      }


      const observerCallback: IntersectionObserverCallback = (entries) => {
        let currentHighestVisibleSectionId: string | null = null;
        let highestVisibleSectionTop = Infinity;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
             // Consider a section "active" if its top is within the top 60% of the viewport
            if (rect.top < window.innerHeight * 0.6 && rect.top < highestVisibleSectionTop) {
              highestVisibleSectionTop = rect.top;
              currentHighestVisibleSectionId = entry.target.id;
            }
          }
        });

        if (currentHighestVisibleSectionId) {
          const activeNav = navLinks.find(link => link.id === currentHighestVisibleSectionId);
          if (activeNav) {
            updateActiveLink(activeNav.href);
          }
        } else if (window.scrollY < 100) { // If scrolled to top, Home is active
          updateActiveLink('/#home');
        }
      };
      
      // More sensitive rootMargin: activates when section is in upper ~half of viewport
      const observerOptions = { root: null, rootMargin: "-30% 0px -50% 0px", threshold: 0.01 };
      observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

      navLinks.forEach(link => {
        if (link.href.startsWith('/#')) {
          const sectionElement = document.getElementById(link.id);
          if (sectionElement) {
            sectionRefs.current.set(link.id, sectionElement);
            observerRef.current?.observe(sectionElement);
          }
        }
      });

    } else {
      // For non-homepage routes, set active link based on pathname
      const matchingLink = navLinks.find(link => link.href === pathname);
      if (matchingLink) {
        updateActiveLink(matchingLink.href);
      } else {
         // Fallback or clear active link if no direct match (e.g. for nested routes not in nav)
         // setActiveLink(''); 
      }
    }

    const handleHashChange = () => {
      if (pathname === '/') {
        const newHash = window.location.hash;
        const matchedNavLink = navLinks.find(link => link.href === `/${newHash}`);
        if (matchedNavLink) {
          updateActiveLink(matchedNavLink.href);
        } else if (!newHash) {
           updateActiveLink('/#home');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('hashchange', handleHashChange);
      sectionRefs.current.clear();
    };
  }, [isMounted, pathname, updateActiveLink]);


  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (href: string, sectionId?: string) => {
    closeMobileMenu();
    updateActiveLink(href); // Immediate visual feedback

    if (href.startsWith('/#') && pathname === '/') {
      const targetId = sectionId || href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Update hash without full page reload for smooth scroll
        if (window.location.hash !== `#${targetId}`) {
           history.pushState(null, '', `#${targetId}`);
        }
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // For links to other pages, Next.js Link component handles navigation
  };

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 font-sans",
        "bg-background shadow-md" 
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group" onClick={() => handleNavLinkClick('/#home', 'home')}>
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
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider nav-laser-crest',
                    isActive ? 'active-link text-primary' : 'text-muted-foreground hover:text-primary-foreground'
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
            className={cn(
              "md:hidden border-t border-border/50",
              "bg-background shadow-md"
            )}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider nav-laser-crest',
                      isActive ? 'active-link text-primary bg-card' : 'text-muted-foreground hover:text-primary-foreground hover:bg-card/50'
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
