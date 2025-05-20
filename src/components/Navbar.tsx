
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  const { incrementSectionVisit } = useUserInteraction(); 

  const determineActiveLinkBasedOnScrollAndPath = useCallback(() => {
    // Logic for separate pages
    if (pathname !== '/') {
      const matchedNavLink = navLinks.find(link => link.href === pathname);
      if (matchedNavLink) {
        setActiveLink(matchedNavLink.href);
      } else {
         setActiveLink(pathname); // Fallback for unlisted paths
      }
      return;
    }

    // Logic for homepage sections via IntersectionObserver (will be set by observer)
    // For initial load or when no section is actively intersecting at the top:
    let currentHash = typeof window !== 'undefined' ? window.location.hash : '';
    if (!currentHash && window.scrollY < window.innerHeight * 0.3) {
        setActiveLink('/#home');
        return;
    }
    if (currentHash) {
        const matchedByHash = navLinks.find(link => link.href === `/${currentHash}`);
        if (matchedByHash) {
            setActiveLink(matchedByHash.href);
            return;
        }
    }
    // If observer hasn't fired and not at top, keep current or default to home
    if (!activeLink && pathname ==='/') setActiveLink('/#home');

  }, [pathname, activeLink]);


  useEffect(() => {
    navLinkRefs.current = navLinkRefs.current.slice(0, navLinks.length);
  }, []);

  const handleNavLinkMouseMove = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-grille-underline')) return; // Check if it's the old style

    const rect = linkElement.getBoundingClientRect();
    const cursorXPercent = ((event.clientX - rect.left) / rect.width) * 100;

    let blueStopPercentage = 55; 
    if (cursorXPercent < 50) { 
      blueStopPercentage = 50 + ( (50 - cursorXPercent) / 50) * 10; 
    } else { 
      blueStopPercentage = 50 - ( (cursorXPercent - 50) / 50) * 10; 
    }
    blueStopPercentage = Math.max(40, Math.min(60, blueStopPercentage)); 

    linkElement.style.setProperty('--grille-blue-stop-percentage-hover', `${blueStopPercentage}%`);
    linkElement.style.setProperty('--grille-red-start-percentage-hover', `${blueStopPercentage}%`);
  };

  const handleNavLinkMouseLeave = (index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement || !linkElement.classList.contains('nav-grille-underline')) return;
    linkElement.style.removeProperty('--grille-blue-stop-percentage-hover');
    linkElement.style.removeProperty('--grille-red-start-percentage-hover');
  };

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    
    // Determine initial active link
    determineActiveLinkBasedOnScrollAndPath();
    window.addEventListener('hashchange', determineActiveLinkBasedOnScrollAndPath, { passive: true });


    if (sectionObserverRef.current) {
      sectionObserverRef.current.disconnect();
    }

    if (pathname === '/') {
      const sections = navLinks
        .filter(link => link.href.startsWith('/#'))
        .map(link => document.getElementById(link.id))
        .filter(section => section !== null) as HTMLElement[];
      
      if (sections.length > 0) {
        const observerOptions = {
          root: null, 
          rootMargin: "-30% 0px -60% 0px", 
          threshold: 0.01, 
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
           if (!foundActive && window.scrollY < window.innerHeight * 0.3) {
             if (pathname === '/') { // Double check we are on homepage
                setActiveLink('/#home');
             }
          }
        };
        
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => {
          if (section) observer.observe(section);
        });
        sectionObserverRef.current = observer;

        if (window.scrollY < 50 && window.location.hash === '') {
            setActiveLink('/#home');
            incrementSectionVisit('home');
        } else if (window.location.hash) {
            const initialHashLink = `/${window.location.hash}`;
            const matchedLink = navLinks.find(link => link.href === initialHashLink);
            if (matchedLink) {
                setActiveLink(initialHashLink);
                incrementSectionVisit(matchedLink.id);
            }
        }

      }
    } else {
        const currentPathId = pathname.startsWith('/') ? pathname.substring(1) : pathname;
        if (currentPathId) {
            incrementSectionVisit(currentPathId);
        }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', determineActiveLinkBasedOnScrollAndPath);
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect();
      }
    };
  }, [pathname, determineActiveLinkBasedOnScrollAndPath, incrementSectionVisit]);

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
        // Smooth scroll
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('/#')) {
      // For navigating to a hash on the homepage from another page
      // Next.js Link component will handle navigation to '/' then browser handles hash
    }
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-sans"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      style={{
        backgroundColor: isScrolled || mobileMenuOpen ? 'hsl(var(--background))' : 'transparent',
        boxShadow: isScrolled || mobileMenuOpen ? '0 4px 12px hsla(var(--primary)/0.2)' : 'none',
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
                  // Removed mousemove/mouseleave as new underline is CSS only hover
                  className={cn(
                    'relative px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider nav-laser-crest group transition-m-blip', // Use nav-laser-crest
                    isActive ? 'text-primary active-link' : 'text-muted-foreground hover:text-primary-foreground'
                  )}
                  onClick={(e) => {
                    if (link.href.startsWith('/#') && pathname === '/') {
                      // e.preventDefault(); // Prevent default if already on page and it's a hash link
                    }
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
                      'block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider transition-m-blip nav-laser-crest', // Use nav-laser-crest
                      isActive ? 'text-primary bg-card active-link' : 'text-muted-foreground hover:text-primary-foreground hover:bg-card/50'
                    )}
                    onClick={(e) => {
                      if (link.href.startsWith('/#') && pathname === '/') {
                         // e.preventDefault(); 
                      }
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

