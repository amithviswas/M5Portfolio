
"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Section from '@/components/Section';
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function HeroSection() {
  const { setIntroCompleted } = useIntroContext();
  const [isScrolledPastThreshold, setIsScrolledPastThreshold] = useState(false);
  const [headlineBeamFrozen, setHeadlineBeamFrozen] = useState(false);
  const [scrollPercentForTachometer, setScrollPercentForTachometer] = useState(0);
  const [taglineUnderlineVisible, setTaglineUnderlineVisible] = useState(false);
  const [gantryLightsVisible, setGantryLightsVisible] = useState(false);


  const prefersReducedMotion = useReducedMotion();
  const heroControls = useAnimation(); // For overall hero section effects like dimming
  
  // For parallax light tunnel
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const parallaxYLight1 = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]); // Slower parallax
  const parallaxYLight2 = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]); // Slightly faster

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      const currentScrollY = window.scrollY;
      
      // Dim hero backdrop
      const dimThreshold = heroHeight * 0.2;
      setIsScrolledPastThreshold(currentScrollY > dimThreshold);

      // Freeze headline beam
      const freezeBeamThreshold = heroHeight * 0.15;
      setHeadlineBeamFrozen(currentScrollY >= freezeBeamThreshold);
      
      // HUD Tachometer
      const heroScrollableHeight = heroHeight - window.innerHeight; // How much of hero is scrollable
      let percent = 0;
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        // Calculate scroll percentage specifically within the hero section's visible part on screen
        // Consider hero fully scrolled when its bottom is at viewport bottom
        const visibleHeroHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (rect.top < 0 && rect.bottom > 0) { // Hero is partially in view from top
            percent = (Math.abs(rect.top) / (heroHeight - window.innerHeight)) * 100;
        } else if (rect.top >= window.innerHeight) { // Hero is below viewport
            percent = 0;
        } else if (rect.bottom <=0) { // Hero is above viewport
            percent = 100;
        }
        percent = Math.min(100, Math.max(0, percent));

      }
      setScrollPercentForTachometer(percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Trigger tagline underline animation after a delay
    const underlineTimer = setTimeout(() => setTaglineUnderlineVisible(true), 1200); // After main text appears

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(underlineTimer);
    };
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion) {
      heroControls.start({
        filter: isScrolledPastThreshold ? "brightness(0.85)" : "brightness(1)",
        transition: { duration: 0.3, ease: "easeInOut" }
      });
    }
  }, [isScrolledPastThreshold, heroControls, prefersReducedMotion]);


  const handleStartDriveClick = () => {
    setIntroCompleted(true); 
    requestAnimationFrame(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  // Framer Motion Variants for Cinematic Scroll-In
  const cinematicEase = [0.16, 1, 0.3, 1]; // easeOutExpo

  const slideInLeft = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: cinematicEase } },
  };
  const slideInRight = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: cinematicEase } },
  };
   const fadeIn = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: cinematicEase } },
  };


  const getTachometerGradient = () => {
    if (scrollPercentForTachometer <= 40) {
      const t = scrollPercentForTachometer / 40;
      return `linear-gradient(to right, hsl(var(--silver-hsl)) ${100 - t*100}%, hsl(var(--royal-blue-hsl)) 100%)`;
    } else if (scrollPercentForTachometer <= 80) {
      const t = (scrollPercentForTachometer - 40) / 40;
      return `linear-gradient(to right, hsl(var(--royal-blue-hsl)) ${100 - t*100}%, hsl(var(--crimson-hsl)) 100%)`;
    } else {
      const t = (scrollPercentForTachometer - 80) / 20;
      return `linear-gradient(to right, hsl(var(--crimson-hsl)) ${100 - t*100}%, hsl(var(--gold-hsl)) 100%)`;
    }
  };
  
  return (
    <Section
      ref={heroRef}
      animate={heroControls}
      id="home" 
      className={cn(
        "relative !pt-0 !pb-0 hero-empire-bg", // New background class
        !prefersReducedMotion && "animate-ambient-pulse"
      )} 
      fullHeight 
      noPadding
    >
      {/* Gantry Lights */}
      {!prefersReducedMotion && (
        <>
         <motion.div 
            className="hero-gantry-light top"
            initial={{ opacity: 0, width: 0 }}
            animate={gantryLightsVisible ? { opacity: 1, width: '100%', transition: { duration: 0.7, ease: 'easeOut', delay: 0.1 } } : {}}
            onViewportEnter={() => setGantryLightsVisible(true)}
          />
        </>
      )}
      
      {/* Parallax Light Tunnel Streaks */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-[-10%] w-3/4 h-1/2 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-50 blur-3xl rounded-full pointer-events-none -z-[5]"
            style={{ y: parallaxYLight1, rotate: '-20deg', willChange: 'transform' }}
          />
          <motion.div
            className="absolute top-1/3 right-[-10%] w-3/4 h-1/2 bg-gradient-to-tl from-red-500/10 via-transparent to-transparent opacity-50 blur-3xl rounded-full pointer-events-none -z-[5]"
            style={{ y: parallaxYLight2, rotate: '20deg', willChange: 'transform' }}
          />
        </>
      )}
      {/* Background Halo Glows (Extra div for one of them) */}
       <div className="hero-bloom-extra -z-10"></div>


      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-12 md:py-20">
        
        <motion.div
          className="relative mb-6 md:mb-8 hero-medallion-empire"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
          whileHover={!prefersReducedMotion ? { scale: 1.05, transition: { type: 'spring', stiffness: 300} } : {}}
          whileFocusWithin={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
        >
          <div className="hero-medallion-empire-inner">
             <Image
                src="https://i.ibb.co/cKgh0560/1701fc1e-7948-4d92-b440-ffb24258652b.png"
                alt="Amith Viswas Reddy"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
                priority
                sizes="120px"
                data-ai-hint="profile photo"
            />
            <div className="hero-spec-highlight-empire"></div>
          </div>
        </motion.div>

        <motion.h1
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-display-serif hero-headline-empire",
            "transition-m-blip relative hero-headline-beam", // For neon sweep
             headlineBeamFrozen && !prefersReducedMotion && "beam-frozen" // Freeze beam on scroll
          )}
           style={{ color: '#E5E5E5'}} // Ensure this is applied directly
           variants={slideInLeft} initial="hidden" animate="visible" custom={1}
           whileHover={!prefersReducedMotion ? { filter: "brightness(1.2)", transition: { duration: 0.25 } } : {}}
        >
          Crafting Digital Excellence.
        </motion.h1>
        
        <motion.p
          className={cn(
            "text-lg md:text-xl font-sans-condensed mt-1 md:mt-2 hero-tagline-empire",
             taglineUnderlineVisible && "animate-underline" // Trigger underline animation
          )}
          style={{ letterSpacing: '1px' }}
          variants={slideInRight} initial="hidden" animate="visible" custom={2}
          whileHover={!prefersReducedMotion ? { filter: "brightness(1.2)", transition: { duration: 0.25 } } : {}}
        >
          Innovate. Create. Inspire.
        </motion.p>

        <motion.p
          className="mt-4 md:mt-6 max-w-[44ch] mx-auto text-sm text-foreground/80 sm:text-base hero-text-lift"
          variants={fadeIn} initial="hidden" animate="visible" custom={3}
        >
          Welcome to my digital space. I transform ideas into powerful, elegant, and user-centric web experiences. Explore my work and let&apos;s build something amazing together.
        </motion.p>

        <motion.div
          variants={fadeIn} initial="hidden" animate="visible" custom={4}
          className="mt-8 md:mt-10"
        >
          <MStartStopButton onClick={handleStartDriveClick} className="transition-m-blip">
            <PlayCircle size={32} className="mb-1 text-primary group-hover:text-blood-red transition-colors" />
            <span className="text-xs uppercase">Start</span>
            <span className="text-xs uppercase">Drive</span>
          </MStartStopButton>
        </motion.div>

        {/* Empire Tachometer */}
         {!prefersReducedMotion && (
          <div
            className="hero-empire-tachometer"
            style={{
              width: `${scrollPercentForTachometer}%`,
              background: getTachometerGradient(),
            }}
          />
        )}
      </div>
      {!prefersReducedMotion && (
        <>
          <motion.div 
            className="hero-gantry-light bottom"
            initial={{ opacity: 0, width: 0 }}
            animate={gantryLightsVisible ? { opacity: 1, width: '100%', transition: { duration: 0.7, ease: 'easeOut', delay: 0.3 } } : {}}
          />
        </>
      )}
    </Section>
  );
}
