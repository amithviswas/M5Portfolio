
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);

  const determineActiveLink = useCallback(() => {
    let newActive = pathname;
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

    if (pathname === '/') {
      if (currentHash) {
        newActive = `/${currentHash}`;
      } else {
         // Default to home if no hash and on root path
        newActive = '/#home';
      }
    }
    
    const matchingNavLink = navLinks.find(link => link.href === newActive || (link.href.startsWith('/#') && `/${currentHash}` === link.href));
    
    if (matchingNavLink) {
      setActiveLink(matchingNavLink.href);
    } else if (pathname === '/') {
      setActiveLink('/#home'); // Fallback for root if no other match
    } else {
      setActiveLink(pathname); // For non-hash paths
    }
  }, [pathname]);

  useEffect(() => {
    navLinkRefs.current = navLinkRefs.current.slice(0, navLinks.length);
  }, [navLinks.length]);

  const handleNavLinkMouseMove = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const linkElement = navLinkRefs.current[index];
    if (!linkElement) return;

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
    if (!linkElement) return;
    linkElement.style.removeProperty('--grille-blue-stop-percentage-hover');
    linkElement.style.removeProperty('--grille-red-start-percentage-hover');
  };

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    determineActiveLink(); // Initial active link check

    // Listen to hash changes
    window.addEventListener('hashchange', determineActiveLink, { passive: true });

    // Disconnect previous observer if it exists
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
          rootMargin: "-30% 0px -60% 0px", // When top 30% or bottom 60% of section is in view
          threshold: 0.01, // As soon as 1% of the target is visible
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Prioritize sections that are more fully in view if multiple are intersecting
              // This simple version just takes the first one that's intersecting
              setActiveLink(`/#${entry.target.id}`);
            }
          });
           // If after checking all entries, none are "active" but we are at the top, set to home
           if (window.scrollY < window.innerHeight * 0.3 && !entries.some(e => e.isIntersecting)) {
            if (pathname === '/') setActiveLink('/#home');
          }
        };
        
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => {
          if (section) observer.observe(section);
        });
        sectionObserverRef.current = observer;
      }
    } else {
        // For non-homepage routes, set active link based on pathname directly
        determineActiveLink();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', determineActiveLink);
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect();
      }
    };
  }, [pathname, determineActiveLink]); // Rerun when pathname changes or determineActiveLink reference changes

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleNavLinkClick = (href: string) => {
    closeMobileMenu();
    setActiveLink(href); // Set active link immediately on click for better UX
    
    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.substring(2); 
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Update hash without causing a full page reload if already on the page
        if (window.location.hash !== `#${targetId}`) {
           history.pushState(null, '', `#${targetId}`);
        }
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('/#')) {
      // If on a different page and clicking a hash link, navigate to home then let browser handle hash.
      // Next/link will handle this naturally by navigating to `/#hash`.
    }
    // For non-hash links, Next/link handles navigation.
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-sans nav-grille-underline-container"
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
                    'relative px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider nav-grille-underline group transition-m-blip',
                    isActive ? 'text-primary active-link' : 'text-muted-foreground hover:text-primary-foreground'
                  )}
                  onClick={(e) => {
                    if (link.href.startsWith('/#') && pathname === '/') {
                      // Prevent default only if it's a hash link on the same page
                      e.preventDefault(); 
                    }
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
                      'block px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider transition-m-blip',
                      isActive ? 'text-primary bg-card' : 'text-muted-foreground hover:text-primary-foreground hover:bg-card/50'
                    )}
                    onClick={(e) => {
                      if (link.href.startsWith('/#') && pathname === '/') {
                         e.preventDefault(); 
                      }
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

    