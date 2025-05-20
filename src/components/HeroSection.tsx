
"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Section from '@/components/Section'; 
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// For "Empire Edition" specific styling
const cinematicEase = [0.36,1.08,.33,1]; // Snappy M-throttle curve
const easeOutExpo = [0.16, 1, 0.3, 1]; // Smooth cinematic exit

export default function HeroSection() {
  const { setIntroCompleted } = useIntroContext();
  const [isScrolledPastHeroThreshold, setIsScrolledPastHeroThreshold] = useState(false);
  const [headlineBeamFrozen, setHeadlineBeamFrozen] = useState(false);
  const [scrollPercentForTachometer, setScrollPercentForTachometer] = useState(0);
  const [taglineUnderlineVisible, setTaglineUnderlineVisible] = useState(false);
  const [gantryLightsVisible, setGantryLightsVisible] = useState(false);
  const [showCameraFlash, setShowCameraFlash] = useState(false);


  const prefersReducedMotion = useReducedMotion();
  const heroControls = useAnimation(); // For hero section dimming

  const heroRef = useRef<HTMLElement>(null);

  // Parallax for Nightfall/Atelier light streaks (can be repurposed for Empire)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"] // Track scroll through entire hero section
  });
  const parallaxYLight1 = useTransform(heroScrollProgress, [0, 1], ["-30px", "30px"]);
  const parallaxYLight2 = useTransform(heroScrollProgress, [0, 1], ["-50px", "50px"]);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const heroHeight = heroRef.current?.offsetHeight || viewportHeight;

      // Hero backdrop dimming (Empire & Nightfall)
      const dimThreshold = viewportHeight * 0.2; // 20vh
      setIsScrolledPastHeroThreshold(currentScrollY > dimThreshold);
      
      // Headline beam freeze (Nightfall)
      const freezeBeamThreshold = viewportHeight * 0.15; // 15vh
      setHeadlineBeamFrozen(currentScrollY >= freezeBeamThreshold);

      // HUD Tachometer (Empire & Nightfall)
      // Calculates percentage of HERO SECTION scrolled out of view, capped at 100%
      let heroSectionScrollPercent = 0;
      if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          if (rect.top < 0) {
              heroSectionScrollPercent = Math.min(100, (Math.abs(rect.top) / heroHeight) * 100);
          }
      }
      setScrollPercentForTachometer(heroSectionScrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    const underlineTimer = setTimeout(() => setTaglineUnderlineVisible(true), 1200); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(underlineTimer);
    };
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion) {
      heroControls.start({
        filter: isScrolledPastHeroThreshold ? "brightness(0.85)" : "brightness(1)",
        transition: { duration: 0.3, ease: "easeInOut" }
      });
    }
  }, [isScrolledPastHeroThreshold, heroControls, prefersReducedMotion]);

  const handleStartDriveClick = () => {
    setIntroCompleted(true);
    requestAnimationFrame(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };
  
  const playCameraFlash = () => {
    if (prefersReducedMotion) return;
    setShowCameraFlash(true);
    setTimeout(() => setShowCameraFlash(false), 250); // Duration of flash
  };

  // Staggered animation variants for Empire Edition "Studio Glide"
  const medallionVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -50, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: easeOutExpo, delay: 0.2 } },
  };
  const headlineMainVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 50, y:10 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: cinematicEase, delay: 0.4 } },
  };
  const headlineSubVariants = { // Tagline
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -50, y:10 },
    visible: { opacity: 1, x: 0, y:0, transition: { duration: 0.7, ease: cinematicEase, delay: 0.55 } },
  };
  const paragraphVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo, delay: 0.8 } },
  };
  const buttonVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 1.0 } }, // easeOutBack
  };

  const getTachometerGradientEmpire = () => {
    if (scrollPercentForTachometer <= 40) { // Silver to Royal Blue
      return `linear-gradient(to right, hsl(var(--silver-hsl)) ${100 - (scrollPercentForTachometer/40)*100}%, hsl(var(--royal-blue-hsl)) 100%)`;
    } else if (scrollPercentForTachometer <= 80) { // Royal Blue to Crimson
      return `linear-gradient(to right, hsl(var(--royal-blue-hsl)) ${100 - ((scrollPercentForTachometer-40)/40)*100}%, hsl(var(--crimson-hsl)) 100%)`;
    } else { // Crimson to Gold
      return `linear-gradient(to right, hsl(var(--crimson-hsl)) ${100 - ((scrollPercentForTachometer-80)/20)*100}%, hsl(var(--gold-hsl)) 100%)`;
    }
  };
  
  const getTachometerGradientNightfall = () => { // For Quantum Edition
    const stop1 = Math.max(0, 100 - (scrollPercentForTachometer / 0.33));
    const stop2 = Math.max(0, 100 - ((scrollPercentForTachometer - 33) / 0.33));
    const stop3 = Math.max(0, 100 - ((scrollPercentForTachometer - 66) / 0.34));
    return `linear-gradient(to right, 
      hsl(var(--bmw-i-blue-hsl)) ${stop1}%, 
      hsl(var(--hyper-violet-hsl)) ${stop2}%, 
      hsl(var(--voltage-gold-hsl)) ${stop3}%,
      hsl(var(--voltage-gold-hsl)) 100%
    )`;
  };


  return (
    <Section
      ref={heroRef}
      animate={heroControls}
      id="home"
      className={cn(
        "relative !pt-0 !pb-0 hero-empire-bg", // Using Empire BG as base
        !prefersReducedMotion && "animate-ambient-pulse" // Ambient pulse from Empire
      )}
      fullHeight
      noPadding
    >
      {/* Dynamic Headlight Sweep Background (Apex Finish) */}
      {!prefersReducedMotion && (
        <div className="hero-headlight-sweep-bg"></div>
      )}

      {/* Gantry Lights (Empire & Apex Finish) */}
      {!prefersReducedMotion && (
        <>
         <motion.div
            className="hero-gantry-light top"
            initial={{ opacity: 0, width: 0 }}
            animate={gantryLightsVisible ? { opacity: [0,0.7,0.3], width: '100%', transition: { duration: 0.7, ease: 'easeOut', delay: 0.1, times: [0, 0.7, 1] } } : {}}
            onViewportEnter={() => setGantryLightsVisible(true)} 
          />
        </>
      )}
      
      {/* Parallax Light Streaks (Nightfall / Could be repurposed for Empire) */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-[-10%] w-3/4 h-1/2 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-30 blur-2xl rounded-full pointer-events-none -z-[5]"
            style={{ y: parallaxYLight1, rotate: '-20deg', willChange: 'transform' }}
          />
          <motion.div
            className="absolute top-1/3 right-[-10%] w-3/4 h-1/2 bg-gradient-to-tl from-red-500/5 via-transparent to-transparent opacity-30 blur-2xl rounded-full pointer-events-none -z-[5]"
            style={{ y: parallaxYLight2, rotate: '20deg', willChange: 'transform' }}
          />
        </>
      )}
      <div className="hero-bloom-extra -z-10"></div> {/* From Empire */}


      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-12 md:py-20"
      >
        {/* Profile Medallion - Using Empire Edition Style */}
        <motion.div
          className={cn(
            "relative mb-6 md:mb-8 hero-medallion-empire hero-medallion-m-stripe",
            showCameraFlash && !prefersReducedMotion && "animate-camera-flash"
          )}
          variants={medallionVariants}
          onHoverStart={playCameraFlash}
          onFocus={playCameraFlash}
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

        {/* Headline Stack - Using Empire Edition Style & Nightfall Beam */}
        <motion.h1
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl hero-headline-empire hero-text-lift font-playfair-display", // Ensure font class is applied
            "hero-headline-beam", // For Nightfall neon sweep
            headlineBeamFrozen && "beam-frozen", // For Nightfall beam freeze
            showCameraFlash && !prefersReducedMotion && "animate-camera-flash"
          )}
           variants={headlineMainVariants}
           onHoverStart={playCameraFlash}
           onFocus={playCameraFlash}
        >
          Crafting Digital Excellence.
        </motion.h1>

        <motion.p
          className={cn(
            "text-lg md:text-xl mt-1 md:mt-2 hero-tagline-empire hero-text-lift font-space-grotesk", // Ensure font class
             taglineUnderlineVisible && "animate-underline"
          )}
          variants={headlineSubVariants}
        >
          Innovate. Create. Inspire.
        </motion.p>

        <motion.p
          className="mt-4 md:mt-6 max-w-[44ch] mx-auto text-sm text-foreground/80 sm:text-base hero-text-lift"
          variants={paragraphVariants}
        >
          Welcome to my digital space. I transform ideas into powerful, elegant, and user-centric web experiences. Explore my work and let&apos;s build something amazing together.
        </motion.p>

        {/* Start/Stop Button - Obsidian Crown from Empire, Turbo conic from Nightfall */}
        <motion.div
          variants={buttonVariants}
          className="mt-8 md:mt-10"
        >
          <MStartStopButton onClick={handleStartDriveClick} className="transition-m-blip button-turbo-hover"> {/* Added button-turbo-hover */}
            <PlayCircle size={32} className="mb-1 text-primary group-hover:text-blood-red transition-colors" />
            <span className="text-xs uppercase">Start</span>
            <span className="text-xs uppercase">Drive</span>
          </MStartStopButton>
        </motion.div>

        {/* HUD Tachometer - Using Empire Style for gradients */}
         {!prefersReducedMotion && (
          <div
            className="hero-empire-tachometer" // Using Empire for main style
            style={{
              width: `${scrollPercentForTachometer}%`,
              background: getTachometerGradientEmpire(),
            }}
          />
        )}
      </motion.div>
      
      {/* Bottom Gantry Light */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="hero-gantry-light bottom"
            initial={{ opacity: 0, width: 0 }}
            animate={gantryLightsVisible ? { opacity: [0,0.7,0.3], width: '100%', transition: { duration: 0.7, ease: 'easeOut', delay: 0.3, times: [0, 0.7, 1] } } : {}}
          />
        </>
      )}
    </Section>
  );
}

```