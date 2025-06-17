
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
  { name: 'Achievements', href: '/#achievements', id: 'achievements' },
  { name: 'Certifications', href: '/#certifications', id: 'certifications' },
  { name: 'Resume', href: '/#resume', id: 'resume' },
  { name: 'Contact', href: '/#contact', id: 'contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement | null>>(new Map());
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { incrementSectionVisit } = useUserInteraction();
  const [currentSectionIdToTrack, setCurrentSectionIdToTrack] = useState<string | undefined>();

  useEffect(() => {
    setIsMounted(true);
    navLinks.forEach(link => {
      if (link.href.startsWith('/#')) {
        const element = document.getElementById(link.id);
        if (element) {
          sectionRefs.current.set(link.id, element);
        }
      }
    });
  }, []);

  const setActiveLinkAndTrack = useCallback((newHref: string, sectionId?: string) => {
    setActiveLink(currentActiveLink => {
      if (currentActiveLink !== newHref) {
        return newHref;
      }
      return currentActiveLink;
    });

    if (sectionId && pathname === '/' && isMounted) {
      setCurrentSectionIdToTrack(currentTrackedId => {
        // Only update if different to trigger the effect for incrementing visit
        if (currentTrackedId !== sectionId) {
          return sectionId;
        }
        return currentTrackedId;
      });
    } else if (pathname !== '/') { // If not on homepage, clear section tracking state
        setCurrentSectionIdToTrack(undefined);
    }
  }, [pathname, isMounted, setActiveLink, setCurrentSectionIdToTrack]);

  // Effect to call incrementSectionVisit when currentSectionIdToTrack changes
  useEffect(() => {
    if (currentSectionIdToTrack && isMounted && pathname === '/') {
      incrementSectionVisit(currentSectionIdToTrack);
    }
  }, [currentSectionIdToTrack, isMounted, pathname, incrementSectionVisit]);


  useEffect(() => {
    if (!isMounted) return;

    const handleScrollOrLoad = () => {
      if (pathname !== '/') {
        setActiveLinkAndTrack(pathname); 
        observerRef.current?.disconnect();
        return;
      }

      if (!observerRef.current && sectionRefs.current.size > 0) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            let bestMatch: IntersectionObserverEntry | null = null;
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                if (!bestMatch || entry.boundingClientRect.top < bestMatch.boundingClientRect.top) {
                  bestMatch = entry;
                }
              }
            });

            if (window.scrollY < 100) { 
              setActiveLinkAndTrack('/#home', 'home');
            } else if (bestMatch) {
              const activeNav = navLinks.find(link => link.id === bestMatch!.target.id);
              if (activeNav) {
                setActiveLinkAndTrack(activeNav.href, activeNav.id);
              }
            }
          },
          { rootMargin: "-25% 0px -25% 0px", threshold: 0.01 } 
        );
        sectionRefs.current.forEach(sectionEl => {
          if (sectionEl) observerRef.current?.observe(sectionEl);
        });
      }
      
      const currentHash = window.location.hash;
      if (currentHash) {
        const matchedLink = navLinks.find(link => link.href === `/${currentHash}`);
        if (matchedLink) setActiveLinkAndTrack(matchedLink.href, matchedLink.id);
      } else if (window.scrollY < 100 && pathname === '/') {
        setActiveLinkAndTrack('/#home', 'home');
      }
    };

    handleScrollOrLoad();
    window.addEventListener('hashchange', handleScrollOrLoad);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      window.removeEventListener('hashchange', handleScrollOrLoad);
    };
  }, [isMounted, pathname, setActiveLinkAndTrack]);


  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkMouseMove = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement) return;

    const rect = linkElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    linkElement.style.setProperty('--grille-blue-stop-percentage', `${Math.max(20, Math.min(80, percentage - 5))}%`);
    linkElement.style.setProperty('--grille-red-start-percentage', `${Math.max(20, Math.min(80, percentage + 5))}%`);
  };

  const handleNavLinkMouseLeave = (index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement) return;
    linkElement.style.setProperty('--grille-blue-stop-percentage', '50%');
    linkElement.style.setProperty('--grille-red-start-percentage', '50%');
  };
  
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId?: string) => {
    closeMobileMenu();
    setActiveLinkAndTrack(href, sectionId); 

    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const targetId = sectionId || href.substring(2); 
      if (window.location.hash !== `#${targetId}`) {
         history.pushState(null, '', `#${targetId}`);
      }
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 font-sans bg-background shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/#home" className="flex items-center group" onClick={(e) => handleNavLinkClick(e as any, '/#home', 'home')}>
             <Image
              src="https://i.ibb.co/N2v0V2R8/Amith-Viswas-Reddy.png" 
              alt="Amith Viswas Reddy Logo"
              width={160} 
              height={36} 
              className="object-contain group-hover:opacity-80 transition-opacity duration-300"
              priority
            />
          </Link>

          <div className="hidden md:flex space-x-1">
            {navLinks.map((link, index) => {
              const isActive = activeLink === link.href || (pathname === '/' && activeLink === '' && link.href === '/#home' && (!window.location.hash || window.location.hash === '#home'));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  ref={el => navLinkRefs.current[index] = el}
                  onMouseMove={(e) => handleNavLinkMouseMove(e, index)}
                  onMouseLeave={() => handleNavLinkMouseLeave(index)}
                  className={cn(
                    'px-3 py-2 rounded-sm text-sm font-medium uppercase tracking-wider nav-laser-crest',
                    isActive ? 'active-link text-primary' : 'text-muted-foreground hover:text-primary-foreground'
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
            className="md:hidden border-t border-border/50 bg-background shadow-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href || (pathname === '/' && activeLink === '' && link.href === '/#home' && (!window.location.hash || window.location.hash === '#home'));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'block px-3 py-3 rounded-sm text-base font-medium uppercase tracking-wider nav-laser-crest', 
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

