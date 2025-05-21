
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
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement | null>>(new Map());

  useEffect(() => {
    setIsMounted(true);
    navLinks.forEach(link => {
      if (link.id) {
        sectionRefs.current.set(link.id, document.getElementById(link.id));
      }
    });
  }, []);

  const setActiveLinkAndTrack = useCallback((href: string, sectionId?: string) => {
    if (activeLink !== href) {
      setActiveLink(href);
      // Placeholder for incrementSectionVisit if context were re-added
      // if (sectionId && pathname === '/') {
      //   console.log("Section visited (placeholder):", sectionId);
      // }
    }
  }, [activeLink, pathname]);

  useEffect(() => {
    if (!isMounted) return;

    if (pathname === '/') {
      const currentHash = window.location.hash;
      if (currentHash) {
        const matchedLink = navLinks.find(link => link.href === `/${currentHash}`);
        if (matchedLink) {
          setActiveLinkAndTrack(matchedLink.href, matchedLink.id);
        }
      } else if (window.scrollY < 100) {
        setActiveLinkAndTrack('/#home', 'home');
      }

      const observerCallback: IntersectionObserverCallback = (entries) => {
        if (window.scrollY < 100 && !window.location.hash) {
            setActiveLinkAndTrack('/#home', 'home');
            return;
        }

        let highestVisibleSection: IntersectionObserverEntry | null = null;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const entryTop = entry.boundingClientRect.top;
            // Prioritize sections whose top is closer to the top of the viewport (within the -30% margin)
            if (!highestVisibleSection || entryTop < highestVisibleSection.boundingClientRect.top) {
                 // Check if it's within the "active" part of the rootMargin
                const viewportHeight = window.innerHeight;
                if (entryTop < viewportHeight * 0.7) { // Roughly top 70% consider, adjust as needed
                    highestVisibleSection = entry;
                }
            }
          }
        });
        
        if (highestVisibleSection) {
          const activeNav = navLinks.find(link => link.id === highestVisibleSection!.target.id);
          if (activeNav) {
            setActiveLinkAndTrack(activeNav.href, activeNav.id);
          }
        }
      };
      
      observerRef.current = new IntersectionObserver(observerCallback, { 
        rootMargin: "-30% 0px -45% 0px", // Active when section is in the upper-middle of viewport
        threshold: 0.01 
      });

      navLinks.forEach(link => {
        if (link.href.startsWith('/#')) {
          const sectionElement = sectionRefs.current.get(link.id);
          if (sectionElement) {
            observerRef.current?.observe(sectionElement);
          }
        }
      });

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
  
  const handleNavLinkMouseMove = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-rpm-underline')) return;

    const rect = linkElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const percent = mouseX / rect.width;

    let blueStop = 55; 
    if (percent < 0.3) blueStop = 60; 
    else if (percent > 0.7) blueStop = 50; 
    
    linkElement.style.setProperty('--grille-blue-stop-percentage', `${blueStop}%`);
    linkElement.style.setProperty('--grille-red-start-percentage', `${blueStop}%`);
  };

  const handleNavLinkMouseLeave = (index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (linkElement && linkElement.classList.contains('nav-rpm-underline')) {
      linkElement.style.setProperty('--grille-blue-stop-percentage', `55%`); 
      linkElement.style.setProperty('--grille-red-start-percentage', `55%`);
    }
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
          <Link href="/" className="flex items-center group" onClick={(e) => handleNavLinkClick(e, '/#home', 'home')}>
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
                    'px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider nav-rpm-underline', 
                    isActive ? 'active-link nav-rpm-active-glow' : 'text-muted-foreground hover:text-primary-foreground'
                  )}
                  onClick={(e) => handleNavLinkClick(e, link.href, link.id)}
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
                      'block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider nav-rpm-underline',
                      isActive ? 'active-link nav-rpm-active-glow' : 'text-muted-foreground hover:text-primary-foreground hover:bg-card/50'
                    )}
                    onClick={(e) => handleNavLinkClick(e, link.href, link.id)}
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

    