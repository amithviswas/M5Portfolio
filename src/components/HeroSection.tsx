
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
  const heroContainerRef = useRef<HTMLDivElement>(null); // Ref for hero content dimensions

  // Parallax for Nightfall/Atelier light streaks
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"] // Track scroll through entire hero section
  });
  const parallaxYLight1 = useTransform(heroScrollProgress, [0, 1], ["-50px", "50px"]); // Increased parallax effect
  const parallaxYLight2 = useTransform(heroScrollProgress, [0, 1], ["-70px", "70px"]); // Increased parallax effect


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Dim hero backdrop if scrolled past 20vh
      const dimThreshold = viewportHeight * 0.2;
      setIsScrolledPastHeroThreshold(currentScrollY > dimThreshold);
      
      // Freeze headline beam if scrolled past 15vh
      const freezeBeamThreshold = viewportHeight * 0.15;
      setHeadlineBeamFrozen(currentScrollY >= freezeBeamThreshold);

      // HUD Tachometer
      let heroSectionScrollPercent = 0;
      if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          // Calculate percentage of HERO SECTION scrolled out of view
          // Ensure heroHeight is positive to avoid division by zero or negative numbers
          const heroHeight = Math.max(1, heroRef.current.offsetHeight); 
          if (rect.top < 0) { // Hero section is above the viewport top
              heroSectionScrollPercent = Math.min(100, (Math.abs(rect.top) / heroHeight) * 100);
          } else if (rect.bottom < viewportHeight) { // Hero section is fully scrolled past
              heroSectionScrollPercent = 100;
          } else {
              heroSectionScrollPercent = 0; // Hero section is at the top or partially visible from top
          }
      }
      setScrollPercentForTachometer(heroSectionScrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Tagline underline animation trigger
    const underlineTimer = setTimeout(() => {
        if (!prefersReducedMotion) {
            setTaglineUnderlineVisible(true);
        }
    }, 1200); // Delay to sync with other animations

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(underlineTimer);
    };
  }, [prefersReducedMotion]); // Added prefersReducedMotion

  useEffect(() => {
    if (!prefersReducedMotion) {
      heroControls.start({
        filter: isScrolledPastHeroThreshold ? "brightness(0.85)" : "brightness(1)",
        transition: { duration: 0.3, ease: "easeInOut" }
      });
    } else {
        heroControls.start({ filter: "brightness(1)" }); // No dimming if reduced motion
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

  // Staggered animation variants
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

  const getTachometerGradient = () => {
    // For Quantum Edition (Nightfall Atelier) Tachometer
    const colorStops = [
      `hsl(var(--bmw-i-blue-hsl)) ${Math.max(0, 100 - (scrollPercentForTachometer / 0.33))}%`,
      `hsl(var(--hyper-violet-hsl)) ${Math.max(0, 100 - ((scrollPercentForTachometer - 33) / 0.33))}%`,
      `hsl(var(--voltage-gold-hsl)) ${Math.max(0, 100 - ((scrollPercentForTachometer - 66) / 0.34))}%`,
      `hsl(var(--voltage-gold-hsl)) 100%`
    ];
    return `linear-gradient(to right, ${colorStops.join(', ')})`;
  };

  return (
    <Section
      ref={heroRef}
      animate={heroControls}
      id="home"
      className={cn(
        "relative hero-atelier-bg", // Using Atelier BG as base for Nightfall
        !prefersReducedMotion && "animate-ambient-pulse" 
      )}
      fullHeight
      noPadding
    >
      {/* Dynamic Headlight Sweep Background (Apex Finish) */}
      {!prefersReducedMotion && (
        <div className="hero-headlight-sweep-bg"></div>
      )}

      {/* Parallax Light Streaks (Nightfall Atelier) */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-[-15%] w-3/4 h-1/2 hero-lens-flare" // Using hero-lens-flare class
            style={{ y: parallaxYLight1, x: "-20%", rotate: '-25deg', background: 'linear-gradient(to bottom, hsla(var(--bmw-i-blue-hsl),0.1) 0%, transparent 70%)', willChange: 'transform' }}
          />
          <motion.div
            className="absolute top-1/3 right-[-15%] w-3/4 h-1/2 hero-lens-flare" // Using hero-lens-flare class
            style={{ y: parallaxYLight2, x: "20%", rotate: '25deg', background: 'linear-gradient(to bottom, hsla(var(--hyper-violet-hsl),0.08) 0%, transparent 70%)', willChange: 'transform' }}
          />
        </>
      )}


      <motion.div
        ref={heroContainerRef}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-12 md:py-20"
      >
        {/* Profile Medallion - Nightfall Atelier Style */}
        <motion.div
          className={cn(
            "mb-6 md:mb-8 hero-medallion-nightfall hero-medallion-m-stripe", // M-stripe for border pulse
            showCameraFlash && !prefersReducedMotion && "animate-camera-flash"
          )}
          variants={medallionVariants}
          onHoverStart={playCameraFlash}
          onFocus={playCameraFlash}
        >
          <div className="hero-medallion-nightfall-inner">
             <Image
                src="https://i.ibb.co/cKgh0560/1701fc1e-7948-4d92-b440-ffb24258652b.png" 
                alt="Amith Viswas Reddy"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full p-1" // Small padding for inset feel
                priority
                sizes="120px"
                data-ai-hint="profile photo"
            />
            {/* Removed hero-spec-highlight-empire as it's Empire specific */}
          </div>
        </motion.div>

        {/* Headline Stack - Nightfall Atelier Style */}
        <motion.h1
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl hero-headline-nightfall",
            "hero-headline-beam", 
            headlineBeamFrozen && "beam-frozen", 
            showCameraFlash && !prefersReducedMotion && "animate-camera-flash"
          )}
           variants={headlineMainVariants}
           onHoverStart={playCameraFlash}
           onFocus={playCameraFlash}
        >
          {"Crafting Digital Excellence.".split(" ").map((word, i) => (
            <motion.span key={i} className="inline-block word-pulse mr-2 md:mr-3 lg:mr-4"> {/* Added margin for spacing */}
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className={cn(
            "text-lg md:text-xl mt-2 md:mt-3 hero-tagline-nightfall font-inter", // Switched to inter as per Nightfall
             taglineUnderlineVisible && "animate-underline" // This underline might need Nightfall specific styling
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

        {/* Start/Stop Button - Nightfall Atelier Jet Crystal Spec */}
        <motion.div
          variants={buttonVariants}
          className="mt-8 md:mt-10"
        >
          <MStartStopButton onClick={handleStartDriveClick} className="button-turbo-hover button-jet-crystal"> {/* Added button-jet-crystal */}
            <PlayCircle size={32} className="mb-1 text-primary group-hover:text-blood-red transition-colors" />
            <span className="text-xs uppercase">Start</span>
            <span className="text-xs uppercase">Drive</span>
          </MStartStopButton>
        </motion.div>

        {/* HUD Tachometer - Quantum Edition for Nightfall */}
         {!prefersReducedMotion && (
          <div
            className="hero-rpm-quantum" // Using Nightfall style for tachometer
            style={{
              width: `${scrollPercentForTachometer}%`,
              // CSS variables set in globals.css will be used for gradient stops
            }}
          />
        )}
      </motion.div>
      
    </Section>
  );
}
