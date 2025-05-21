
"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Section from '@/components/Section'; 
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import Image from 'next/image'; 
import { cn } from '@/lib/utils';

const easeOutExpo = [0.16, 1, 0.3, 1]; // For "Studio Glide"

const heroTextAnimation = {
  initial: { opacity: 0, y: 20, filter: 'blur(3px)' },
  animate: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'm-throttle' as any, delay } 
  })
};

// Staggered animation variants for Empire Edition cinematic scroll-in
const slideInLeft = {
  hidden: { opacity: 0, x: -50, rotateY: 15 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0, rotateY: 0,
    transition: { duration: 0.8, ease: easeOutExpo, delay }
  })
};
const slideInRight = {
  hidden: { opacity: 0, x: 50, rotateY: -15 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0, rotateY: 0,
    transition: { duration: 0.8, ease: easeOutExpo, delay }
  })
};
const fadeIn = { // Used for medallion
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.7, ease: easeOutExpo, delay }
  })
};


export default function HeroSection() {
  const { introCompleted, setIntroCompleted } = useIntroContext();
  const prefersReducedMotion = useReducedMotion();
  const heroControls = useAnimation(); 
  const [isScrolledPastHeroThreshold, setIsScrolledPastHeroThreshold] = useState(false);
  const [parallaxStreaks, setParallaxStreaks] = useState({ streak1Y: 0, streak2Y: 0 });
  const [scrollPercentForTachometer, setScrollPercentForTachometer] = useState(0);
  const [headlineBeamFrozen, setHeadlineBeamFrozen] = useState(false);

  const { scrollY } = useScroll();

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [isHeadlineHovered, setIsHeadlineHovered] = useState(false);
  
  // Tagline underline visibility based on intro completion
  const [isTaglineUnderlineVisible, setIsTaglineUnderlineVisible] = useState(false);
  useEffect(() => {
    if (introCompleted) {
      const timer = setTimeout(() => setIsTaglineUnderlineVisible(true), 800); // Delay after hero text animates in
      return () => clearTimeout(timer);
    }
  }, [introCompleted]);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const heroSectionHeight = document.getElementById('home')?.offsetHeight || viewportHeight;

      // Dim hero backdrop & freeze headline beam
      const scrollThreshold = viewportHeight * 0.15; // 15vh
      if (currentScrollY > scrollThreshold) {
        if (!isScrolledPastHeroThreshold) {
          heroControls.start({ filter: 'brightness(0.85)', transition: { duration: 0.5 } });
          setIsScrolledPastHeroThreshold(true);
          setHeadlineBeamFrozen(true);
        }
      } else {
        if (isScrolledPastHeroThreshold) {
          heroControls.start({ filter: 'brightness(1)', transition: { duration: 0.5 } });
          setIsScrolledPastHeroThreshold(false);
          setHeadlineBeamFrozen(false);
        }
      }

      // Parallax for light streaks
      const streak1Val = Math.max(-50, Math.min(50, currentScrollY * -0.05));
      const streak2Val = Math.max(-50, Math.min(50, currentScrollY * 0.04));
      setParallaxStreaks({ streak1Y: streak1Val, streak2Y: streak2Val });

      // HUD Tachometer
      let scrollPercent = 0;
      if (heroSectionHeight > viewportHeight) { // Only calculate if hero is taller than viewport
        scrollPercent = Math.min(100, (currentScrollY / (heroSectionHeight - viewportHeight)) * 100);
      } else if (currentScrollY > 0) { // If hero is shorter, but scrolled, show 100%
        scrollPercent = 100;
      }
      setScrollPercentForTachometer(scrollPercent);
    };

    if (introCompleted) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [introCompleted, heroControls, isScrolledPastHeroThreshold]);


  const handleStartDriveClick = () => {
    setIntroCompleted(true); 
    requestAnimationFrame(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: introCompleted ? 0.3 : 0 } // Delay children if intro just completed
    },
  };
  
  // Motion variants for Empire Edition cinematic scroll-in
  const empireItemVariants = {
    medallion: fadeIn.visible(introCompleted ? 0.3 : 0), // Timing for Empire
    headline: heroTextAnimation.animate(introCompleted ? 0.5 : 0.2), // M-throttle variant
    tagline: heroTextAnimation.animate(introCompleted ? 0.65 : 0.35),
    paragraph: heroTextAnimation.animate(introCompleted ? 0.9 : 0.5),
    button: heroTextAnimation.animate(introCompleted ? 1.1 : 0.6),
  };

  // Tachometer bar gradient
  const getTachometerBarGradient = (percentage: number) => {
    if (percentage <= 40) return 'linear-gradient(to right, #A8A8A8, hsl(var(--empire-royal-blue-hsl)))'; // Silver to Royal Blue
    if (percentage <= 80) return `linear-gradient(to right, hsl(var(--empire-royal-blue-hsl)), hsl(var(--empire-crimson-hsl)))`; // Royal Blue to Crimson
    return `linear-gradient(to right, hsl(var(--empire-crimson-hsl)), hsl(var(--empire-gold-hsl)))`; // Crimson to Gold
  };
  
  return (
    <Section
      animate={heroControls}
      id="home"
      className={cn(
        "relative hero-empire-bg", 
        "min-h-[calc(100vh-0rem)]" 
      )} 
      fullHeight={false} 
      noPadding 
    >
      {/* Gantry Lights (Top and Bottom) */}
      <motion.div 
        className="hero-gantry-light top-0"
        initial={{ scaleX:0, opacity:0}}
        animate={introCompleted ? { scaleX:1, opacity:1, transition: {duration: 0.5, delay:0.1, ease: "easeOut"}} : {}}
        exit={{scaleX:0, opacity:0}}
      />
       <motion.div 
        className="hero-gantry-light bottom-0"
        initial={{ scaleX:0, opacity:0}}
        animate={introCompleted ? { scaleX:1, opacity:1, transition: {duration: 0.5, delay:0.3, ease: "easeOut"}} : {}}
        exit={{scaleX:0, opacity:0}}
      />

      {/* Dynamic Headlight Sweep Background (Apex Finish) */}
      {!prefersReducedMotion && (
        <div className="hero-headlight-sweep-bg" />
      )}

      {/* Parallax Light Tunnel Streaks (Nightfall Atelier) */}
       {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] opacity-[0.04] bg-gradient-radial from-bmw-m-blue/30 via-transparent to-transparent blur-3xl transform rotate-[20deg] pointer-events-none -z-10"
            style={{ y: parallaxStreaks.streak1Y, willChange: 'transform' }}
            animate={{ x: ['-5%', '5%', '-5%'], transition: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" } }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-[150vw] h-[150vh] opacity-[0.03] bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl transform rotate-[-25deg] pointer-events-none -z-10"
            style={{ y: parallaxStreaks.streak2Y, willChange: 'transform' }}
            animate={{ x: ['5%', '-5%', '5%'], transition: { duration: 22, repeat: Infinity, repeatType: "reverse", ease: "linear" } }}
          />
        </>
      )}

      {/* Halo Glows for Empire BG & Nightfall Bloom */}
      {!prefersReducedMotion && (
        <>
          <div className="halo-glow" style={{ width: '400px', height: '400px', top: '10%', left: '20%', background: 'radial-gradient(circle, hsla(var(--empire-i-blue-fog-start-hsl),0.2) 0%, transparent 70%)', animationDelay: '0s' }} />
          <div className="halo-glow" style={{ width: '500px', height: '500px', top: '50%', left: '60%', background: 'radial-gradient(circle, hsla(var(--primary),0.1) 0%, transparent 70%)', animationDelay: '3s' }} />
          <div className="hero-bloom-extra" />
        </>
      )}

      <motion.div
        initial="hidden"
        animate={introCompleted ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-16 md:py-20 lg:py-28"
      >
        {/* Profile Medallion - Empire Edition */}
        <motion.div 
          variants={fadeIn} custom={introCompleted ? 0.2 : 0} // Timing from empireItemVariants
          className={cn(
            "mb-8 group hero-text-lift",
            isHeadlineHovered && !prefersReducedMotion && "animate-cameraShutterFlash" // camera-shutter flash
          )}
          onMouseEnter={() => setIsHeadlineHovered(true)}
          onMouseLeave={() => setIsHeadlineHovered(false)}
        >
          <div className="hero-medallion-empire hover:scale-105 transition-transform duration-300 ease-m-throttle"
             style={{boxShadow: '0 0 35px 0 hsla(var(--bmw-m-blue),.25)'}} > 
            <div className="spec-highlight-arc" /> 
            <Image
              src="https://i.ibb.co/cKgh0560/1701fc1e-7948-4d92-b440-ffb24258652b.png"
              alt="Amith Viswas Reddy"
              width={128} 
              height={128} 
              className="rounded-full object-cover"
              priority
              data-ai-hint="profile photo"
            />
          </div>
        </motion.div>

        {/* Headline Stack - Empire/Nightfall Edition */}
        <motion.h1
          ref={headlineRef}
          custom={introCompleted ? 0.4 : 0.2} // Timing from empireItemVariants
          variants={heroTextAnimation} 
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl font-heading text-primary-foreground hero-headline-empire hero-text-lift",
            "hero-headline-nightfall relative", // For Nightfall beam
            headlineBeamFrozen && !prefersReducedMotion && "beam-frozen",
            isHeadlineHovered && !prefersReducedMotion && "animate-cameraShutterFlash" // camera-shutter flash
          )}
          onMouseEnter={() => setIsHeadlineHovered(true)}
          onMouseLeave={() => setIsHeadlineHovered(false)}
        >
          Crafting Digital Excellence.
        </motion.h1>
        <motion.h2
          custom={introCompleted ? 0.55 : 0.35}
          variants={heroTextAnimation} 
          className={cn(
            "hero-tagline-empire text-xl md:text-2xl mt-2 md:mt-3 font-semibold uppercase tracking-wider md:tracking-widest hero-text-lift hero-subtext-nightfall",
            isTaglineUnderlineVisible && "underline-visible"
          )}
        >
          Innovate. Create. Inspire.
        </motion.h2>

        <motion.p
          custom={introCompleted ? 0.8 : 0.5}
          variants={heroTextAnimation} 
          className="mt-6 md:mt-8 max-w-xl mx-auto text-base text-foreground/80 sm:text-lg hero-text-lift"
        >
          Welcome to my digital space. I transform ideas into powerful, elegant, and user-centric web experiences. Explore my work and let&apos;s build something amazing together.
        </motion.p>

        <motion.div
          custom={introCompleted ? 1.0 : 0.6}
          variants={heroTextAnimation} 
          className="mt-10 md:mt-12"
        >
          <MStartStopButton 
            onClick={handleStartDriveClick}
            className="transition-m-throttle" 
          >
            <PlayCircle size={28} className="mb-0.5 text-primary group-hover:text-blood-red transition-colors duration-150" />
            <span className="text-[10px] uppercase font-bold">Start</span>
            <span className="text-[10px] uppercase font-bold">Drive</span>
          </MStartStopButton>
        </motion.div>
      </motion.div>
      
      {/* HUD Tachometer Strip - Empire Edition / Quantum */}
      {!prefersReducedMotion && (
        <motion.div 
          className="hero-empire-tachometer"
          initial={{opacity:0, y:20}}
          animate={introCompleted ? {opacity:1, y:0, transition: {delay: 1.2, duration:0.5}} : {}}
        >
          <motion.div 
              className="hero-empire-tachometer-bar" 
              style={{ 
                width: `${scrollPercentForTachometer}%`,
                background: getTachometerBarGradient(scrollPercentForTachometer)
              }}
          />
          <motion.div 
            className="hero-empire-tachometer-trail"
            style={{ width: `${scrollPercentForTachometer}%`, opacity: scrollPercentForTachometer > 5 ? 0.5 : 0 }} 
          />
        </motion.div>
      )}
    </Section>
  );
}
