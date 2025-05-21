
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
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setActiveLinkAndTrack = useCallback((href: string) => {
    setActiveLink(href);
    // Basic tracking can be added here if UserInteractionContext is kept, otherwise remove
  }, []);

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

    let initialActiveHref = '/#home';
    if (currentHash) {
      const matchedNavLink = navLinks.find(link => link.href === `/${currentHash}`);
      if (matchedNavLink) initialActiveHref = matchedNavLink.href;
    }
    setActiveLinkAndTrack(initialActiveHref);

    if (sectionObserverRef.current) sectionObserverRef.current.disconnect();

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (pathname !== '/') return;
      let currentHighestVisibleSectionId: string | null = null;
      let highestVisibleSectionTop = Infinity;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rect = entry.target.getBoundingClientRect();
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
      } else if (window.scrollY < window.innerHeight * 0.2 && activeLink !== '/#home') {
        setActiveLinkAndTrack('/#home');
      }
    };

    const observerOptions = { root: null, rootMargin: "-20% 0px -50% 0px", threshold: 0.01 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionObserverRef.current = observer;

    navLinks.forEach(link => {
      if (link.href.startsWith('/#')) {
        const sectionElement = document.getElementById(link.id);
        if (sectionElement) observer.observe(sectionElement);
      }
    });
    
    if(pathname === '/' && (activeLink === '' || activeLink ==='/') && currentHash === ''){
      setTimeout(() => {
        if(activeLink === '' || activeLink ==='/') setActiveLinkAndTrack('/#home');
      }, 100)
    }

    const handleHashChange = () => {
      if (pathname === '/') {
        const newHash = window.location.hash;
        const matchedNavLink = navLinks.find(link => link.href === `/${newHash}`);
        if (matchedNavLink) {
          setActiveLinkAndTrack(matchedNavLink.href);
        } else if (!newHash && activeLink !== '/#home') {
           setActiveLinkAndTrack('/#home');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      if (sectionObserverRef.current) sectionObserverRef.current.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isMounted, pathname, activeLink, setActiveLinkAndTrack]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (href: string) => {
    closeMobileMenu();
    setActiveLinkAndTrack(href);
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
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out font-sans",
        "bg-background shadow-md" // Always fixed style
      )}
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
              const isActive = activeLink === link.href || (pathname === '/' && activeLink === '' && link.href === '/#home');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider nav-link-basic-underline', // Use basic underline
                    isActive ? 'active-link' : ''
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
                      'block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider nav-link-basic-underline', // Use basic underline
                      isActive ? 'active-link bg-card' : 'hover:bg-card/50'
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
    </nav>
  );
}
