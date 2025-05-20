
"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Section from '@/components/Section'; // Ensure Section is imported correctly
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function HeroSection() {
  const { setIntroCompleted } = useIntroContext();
  const [isScrolledPastHeroThreshold, setIsScrolledPastHeroThreshold] = useState(false);
  const [headlineBeamFrozen, setHeadlineBeamFrozen] = useState(false);
  const [scrollPercentForTachometer, setScrollPercentForTachometer] = useState(0);
  const [taglineUnderlineVisible, setTaglineUnderlineVisible] = useState(false);
  const [gantryLightsVisible, setGantryLightsVisible] = useState(false);


  const prefersReducedMotion = useReducedMotion();
  const heroControls = useAnimation();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax for light streaks
  const parallaxYLight1 = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);
  const parallaxYLight2 = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"]);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      const currentScrollY = window.scrollY;

      // Dim hero backdrop & freeze headline beam
      const dimThreshold = heroHeight * 0.2;
      setIsScrolledPastHeroThreshold(currentScrollY > dimThreshold);

      const freezeBeamThreshold = heroHeight * 0.15;
      setHeadlineBeamFrozen(currentScrollY >= freezeBeamThreshold);

      // HUD Tachometer for Hero Section height
      // Calculate percentage of hero section scrolled out of view
      let heroScrollPercent = 0;
      if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          // When top is negative, it means we've scrolled past the top of the hero
          if (rect.top < 0) {
              heroScrollPercent = (Math.abs(rect.top) / heroHeight) * 100;
          }
          heroScrollPercent = Math.min(100, Math.max(0, heroScrollPercent));
      }
      setScrollPercentForTachometer(heroScrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const underlineTimer = setTimeout(() => setTaglineUnderlineVisible(true), 1200); // Sync with tagline animation

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

  const cinematicEase = [0.36,1.08,0.33,1];
  const easeOutExpo = [0.16, 1, 0.3, 1];

  const medallionVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: cinematicEase, delay: 0.2 } },
  };
  const headlineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cinematicEase, delay: 0.4 } },
  };
  const taglineVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cinematicEase, delay: 0.55 } },
  };
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo, delay: 0.8 } },
  };
  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 1.0 } }, // easeOutBack for rebound
  };


  const getTachometerGradient = () => {
    // Gradient for the "Empire Tachometer"
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
        "relative !pt-0 !pb-0 hero-empire-bg",
        !prefersReducedMotion && "animate-ambient-pulse"
      )}
      fullHeight
      noPadding
    >
      {/* Dynamic Headlight Sweep Background */}
      {!prefersReducedMotion && (
        <div className="hero-headlight-sweep-bg"></div>
      )}

      {/* Gantry Lights */}
      {!prefersReducedMotion && (
        <>
         <motion.div
            className="hero-gantry-light top"
            initial={{ opacity: 0, width: 0 }}
            animate={gantryLightsVisible ? { opacity: 1, width: '100%', transition: { duration: 0.7, ease: 'easeOut', delay: 0.1 } } : {}}
            onViewportEnter={() => setGantryLightsVisible(true)} // Trigger when section itself is visible
          />
        </>
      )}

      {/* Parallax Streaks */}
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
       <div className="hero-bloom-extra -z-10"></div>


      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-12 md:py-20"
      >
        <motion.div
          className="relative mb-6 md:mb-8 hero-medallion-empire"
          variants={medallionVariants}
          whileHover={!prefersReducedMotion ? {
            scale: 1.05,
            filter: "saturate(1.4) brightness(1.3)",
            transition: { duration: 0.25, ease: "easeInOut" }
          } : {}}
          whileFocusWithin={!prefersReducedMotion ? {
             scale: 1.05,
             filter: "saturate(1.4) brightness(1.3)",
             transition: { duration: 0.25, ease: "easeInOut" }
          } : {}}
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
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl hero-headline-empire hero-text-lift",
            !prefersReducedMotion && headlineBeamFrozen && "beam-frozen"
          )}
           variants={headlineVariants}
           whileHover={!prefersReducedMotion ? {
             filter: "saturate(1.4) brightness(1.3)",
             transition: { duration: 0.25, ease: "easeInOut" }
           } : {}}
        >
          Crafting Digital Excellence.
        </motion.h1>

        <motion.p
          className={cn(
            "text-lg md:text-xl mt-1 md:mt-2 hero-tagline-empire hero-text-lift",
             taglineUnderlineVisible && "animate-underline"
          )}
          variants={taglineVariants}
        >
          Innovate. Create. Inspire.
        </motion.p>

        <motion.p
          className="mt-4 md:mt-6 max-w-[44ch] mx-auto text-sm text-foreground/80 sm:text-base hero-text-lift"
          variants={paragraphVariants}
        >
          Welcome to my digital space. I transform ideas into powerful, elegant, and user-centric web experiences. Explore my work and let&apos;s build something amazing together.
        </motion.p>

        <motion.div
          variants={buttonVariants}
          className="mt-8 md:mt-10"
        >
          <MStartStopButton onClick={handleStartDriveClick} className="transition-m-blip">
            <PlayCircle size={32} className="mb-1 text-primary group-hover:text-blood-red transition-colors" />
            <span className="text-xs uppercase">Start</span>
            <span className="text-xs uppercase">Drive</span>
          </MStartStopButton>
        </motion.div>

         {!prefersReducedMotion && (
          <div
            className="hero-empire-tachometer"
            style={{
              width: `${scrollPercentForTachometer}%`,
              background: getTachometerGradient(),
            }}
          />
        )}
      </motion.div>
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
