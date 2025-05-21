
"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle, Zap } from 'lucide-react'; // Added Zap
import Section from '@/components/Section'; // Default import
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const cinematicEase = [0.36,1.08,.33,1]; 
const easeOutExpo = [0.16, 1, 0.3, 1]; 

export default function HeroSection() {
  const { introCompleted, setIntroCompleted } = useIntroContext();
  const [isScrolledPastHeroThreshold, setIsScrolledPastHeroThreshold] = useState(false);
  const [headlineBeamFrozen, setHeadlineBeamFrozen] = useState(false);
  const [scrollPercentForTachometer, setScrollPercentForTachometer] = useState(0);
  const [taglineUnderlineVisible, setTaglineUnderlineVisible] = useState(false);
  const [gantryLightsVisible, setGantryLightsVisible] = useState(false);
  const [showCameraFlash, setShowCameraFlash] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const heroControls = useAnimation(); 
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"] 
  });
  const parallaxYLight1 = useTransform(heroScrollProgress, [0, 1], ["-70px", "70px"]);
  const parallaxYLight2 = useTransform(heroScrollProgress, [0, 1], ["-90px", "90px"]);
  const heroContentOpacity = useTransform(heroScrollProgress, [0, 0.5, 0.8], [1, 1, 0]); // Fade out content faster


  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const heroRect = heroRef.current.getBoundingClientRect();
      
      const dimThreshold = viewportHeight * 0.2;
      setIsScrolledPastHeroThreshold(currentScrollY > dimThreshold);
      
      const freezeBeamThreshold = viewportHeight * 0.15;
      setHeadlineBeamFrozen(currentScrollY >= freezeBeamThreshold);

      let heroSectionScrollPercent = 0;
      const heroHeight = Math.max(1, heroRef.current.offsetHeight); 
      if (heroRect.top < 0) { 
          heroSectionScrollPercent = Math.min(100, (Math.abs(heroRect.top) / heroHeight) * 100);
      } else if (heroRect.bottom < viewportHeight) { 
          heroSectionScrollPercent = 100;
      } else {
          heroSectionScrollPercent = 0; 
      }
      setScrollPercentForTachometer(heroSectionScrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    const underlineTimer = setTimeout(() => {
        if (!prefersReducedMotion) {
            setTaglineUnderlineVisible(true);
        }
    }, 1200); 
    
    const gantryTimer = setTimeout(() => {
      if (!prefersReducedMotion) {
        setGantryLightsVisible(true);
      }
    }, 600); // Gantry lights trigger earlier

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(underlineTimer);
      clearTimeout(gantryTimer);
    };
  }, [prefersReducedMotion]); 

  useEffect(() => {
    if (!prefersReducedMotion) {
      heroControls.start({
        filter: isScrolledPastHeroThreshold ? "brightness(0.85)" : "brightness(1)",
        transition: { duration: 0.3, ease: "easeInOut" }
      });
    } else {
        heroControls.start({ filter: "brightness(1)" }); 
    }
  }, [isScrolledPastHeroThreshold, heroControls, prefersReducedMotion]);

  const handleStartDriveClick = () => {
    setIntroCompleted(true);
    requestAnimationFrame(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };
  
  const playCameraFlash = () => {
    if (prefersReducedMotion) return;
    setShowCameraFlash(true);
    setTimeout(() => setShowCameraFlash(false), 250); 
  };

  const medallionVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -50, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: easeOutExpo, delay: 0.2 } },
  };
  const headlineMainVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 50, y:10 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: cinematicEase, delay: 0.4 } },
  };
  const headlineSubVariants = { 
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -50, y:10 },
    visible: { opacity: 1, x: 0, y:0, transition: { duration: 0.7, ease: cinematicEase, delay: 0.55 } },
  };
  const paragraphVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo, delay: 0.8 } },
  };
  const buttonVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 1.0 } }, 
  };


  const getTachometerGradient = () => {
    const blue = 'hsl(var(--bmw-m-blue))';
    const violet = 'hsl(var(--hyper-violet-hsl))';
    const gold = 'hsl(var(--voltage-gold-hsl))';

    if (scrollPercentForTachometer <= 33) {
        return `linear-gradient(to right, ${blue} ${scrollPercentForTachometer * 3}%, hsl(var(--shadow-gray)) ${scrollPercentForTachometer * 3}%)`;
    } else if (scrollPercentForTachometer <= 66) {
        const progressInSegment = (scrollPercentForTachometer - 33) * 3;
        return `linear-gradient(to right, ${blue} 100%, ${violet} ${progressInSegment}%, hsl(var(--shadow-gray)) ${progressInSegment}%)`;
    } else {
        const progressInSegment = (scrollPercentForTachometer - 66) * 3;
        return `linear-gradient(to right, ${blue} 100%, ${violet} 100%, ${gold} ${progressInSegment}%, hsl(var(--shadow-gray)) ${progressInSegment}%)`;
    }
  };
  
  // Styles for the "Empire Tachometer" based on scrollPercent
  const empireTachWidth = `${Math.min(100, scrollPercentForTachometer * 1.5)}%`; // Faster fill
  const empireTachGradient = (() => {
    const p = scrollPercentForTachometer;
    if (p < 40) return `linear-gradient(to right, hsl(var(--shadow-gray)) ${p * 2.5}%, hsl(var(--royal-blue-hsl)) ${p * 2.5}%)`;
    if (p < 80) return `linear-gradient(to right, hsl(var(--royal-blue-hsl)) 100%, hsl(var(--crimson-hsl)) ${(p-40) * 2.5}%, hsl(var(--shadow-gray)) ${(p-40) * 2.5}%)`;
    return `linear-gradient(to right, hsl(var(--royal-blue-hsl)) 100%, hsl(var(--crimson-hsl)) 100%, hsl(var(--gold-hsl)) ${(p-80) * 5}%, hsl(var(--shadow-gray)) ${(p-80) * 5}%)`;
  })();


  return (
    <Section
      ref={heroRef}
      animate={heroControls}
      id="home"
      className={cn(
        "relative hero-empire-bg", // Using Empire BG as base
        !prefersReducedMotion && "animate-ambient-pulse" 
      )}
      fullHeight
      noPadding
    >
      {/* Dynamic Headlight Sweep Background (Apex Finish) */}
      {!prefersReducedMotion && (
        <div className="hero-headlight-sweep-bg"></div>
      )}

      {/* Parallax Light Tunnel (Nightfall Atelier / Empire) */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-[-20%] w-3/4 h-1/2 hero-lens-flare opacity-15" // Adjusted opacity
            style={{ y: parallaxYLight1, x: "-25%", rotate: '-20deg', background: 'linear-gradient(to bottom, hsla(var(--i-blue-fog-hsl),0.12) 0%, transparent 70%)', willChange: 'transform' }}
          />
          <motion.div
            className="absolute top-1/3 right-[-20%] w-3/4 h-1/2 hero-lens-flare opacity-15" // Adjusted opacity
            style={{ y: parallaxYLight2, x: "25%", rotate: '20deg', background: 'linear-gradient(to bottom, hsla(var(--uv-blue),0.1) 0%, transparent 70%)', willChange: 'transform' }}
          />
           {/* Additional bloom effects for Empire Edition */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full hero-bloom-effect opacity-5" style={{ background: 'hsla(var(--uv-blue), 0.2)', '--tx-start': '-15%', '--ty-start': '10%', '--tx-end': '5%', '--ty-end': '-15%' } as React.CSSProperties}></div>
          <div className="absolute bottom-1/4 right-1/4 w-2/5 h-2/5 rounded-full hero-bloom-effect opacity-5" style={{ background: 'hsla(var(--primary), 0.15)', '--tx-start': '10%', '--ty-start': '-5%', '--tx-end': '-10%', '--ty-end': '10%' } as React.CSSProperties}></div>
        </>
      )}

      {/* Gantry Lights (Empire Edition) */}
      {gantryLightsVisible && !prefersReducedMotion && (
        <>
          <motion.div 
            className="hero-gantry-light top"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: [0, 0.7, 0.3, 0], transition: { duration: 1.2, ease: easeOutExpo, delay: 0.2} }}
          />
          <motion.div 
            className="hero-gantry-light bottom"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: [0, 0.7, 0.3, 0], transition: { duration: 1.2, ease: easeOutExpo, delay: 0.4} }}
          />
        </>
      )}

      <motion.div
        initial="hidden"
        animate={introCompleted ? "visible" : "hidden"} // Ensure hero content animates in after intro
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-12 md:py-20"
        style={{ opacity: introCompleted ? heroContentOpacity : 0 }} // Apply fade out on scroll
      >
        {/* Profile Medallion - Empire Style */}
        <motion.div
          className={cn(
            "mb-6 md:mb-8 hero-medallion-empire", 
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
                className="rounded-full p-1" 
                priority
                sizes="120px"
                data-ai-hint="profile photo"
            />
            <div className="hero-spec-highlight-empire"></div> {/* Spec highlight for Empire */}
          </div>
        </motion.div>

        {/* Headline Stack - Empire Style */}
        <motion.h1
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl hero-headline-empire hero-text-lift",
            showCameraFlash && !prefersReducedMotion && "animate-camera-flash"
          )}
           variants={headlineMainVariants}
           onHoverStart={playCameraFlash}
           onFocus={playCameraFlash}
        >
          {"Crafting Digital Excellence.".split(" ").map((word, i) => (
            <motion.span key={i} className="inline-block mr-2 md:mr-3 lg:mr-4">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className={cn(
            "text-lg md:text-xl mt-2 md:mt-3 hero-tagline-empire hero-text-lift", 
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
          Coded Precision. Designed for the Fast Lane.
        </motion.p>

        <motion.div
          variants={buttonVariants}
          className="mt-8 md:mt-10"
        >
          <MStartStopButton onClick={handleStartDriveClick}> 
            <PlayCircle size={32} className="mb-1 text-primary group-hover:text-blood-red transition-colors" />
            <span className="text-xs uppercase">Start</span>
            <span className="text-xs uppercase">Drive</span>
          </MStartStopButton>
        </motion.div>

        {/* Empire Tachometer */}
         {!prefersReducedMotion && introCompleted && (
          <div
            className="hero-empire-tachometer" 
            style={{
              width: empireTachWidth,
              background: empireTachGradient,
            }}
          />
        )}
      </motion.div>
    </Section>
  );
}

