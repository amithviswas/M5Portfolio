
"use client";
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useAnimation, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Section from '@/components/Section';
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const easeOutExpo = [0.16, 1, 0.3, 1];

const heroTextAnimation = (delay = 0, duration = 0.7) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(3px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration, ease: [0.36,1.08,0.33,1] as any, delay }
  }
});

export default function HeroSection() {
  const { introCompleted, setIntroCompleted } = useIntroContext();
  const prefersReducedMotion = useReducedMotion();
  const heroControls = useAnimation();
  
  const [isScrolledPastHeroThreshold, setIsScrolledPastHeroThreshold] = useState(false);
  const [parallaxStreaks, setParallaxStreaks] = useState({ streak1Y: 0, streak2Y: 0 });
  const [scrollPercentForTachometer, setScrollPercentForTachometer] = useState(0);
  const [isHeadlineHovered, setIsHeadlineHovered] = useState(false);
  const [isTaglineUnderlineVisible, setIsTaglineUnderlineVisible] = useState(false);
  const [headlineBeamFrozen, setHeadlineBeamFrozen] = useState(false);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();

  const headlineOpacity = useTransform(scrollY, [0, 100], [1, 0.5]);
  const taglineOpacity = useTransform(scrollY, [50, 150], [1, 0.3]);


  const handleStartDriveClick = useCallback(() => {
    setIntroCompleted(true);
    requestAnimationFrame(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, [setIntroCompleted]);

  useEffect(() => {
    if (introCompleted) {
      const timer = setTimeout(() => setIsTaglineUnderlineVisible(true), 800); // Delay for tagline underline
      return () => clearTimeout(timer);
    }
  }, [introCompleted]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const heroSectionElement = document.getElementById('home'); // Ensure 'home' is the ID of your HeroSection
      const heroSectionHeight = heroSectionElement?.offsetHeight || viewportHeight;

      const scrollThreshold = viewportHeight * 0.15;
      const newIsScrolledPast = currentScrollY > scrollThreshold;
      if (newIsScrolledPast !== isScrolledPastHeroThreshold) {
        setIsScrolledPastHeroThreshold(newIsScrolledPast);
        setHeadlineBeamFrozen(newIsScrolledPast); // Freeze beam when scrolled past
        heroControls.start({ 
          filter: newIsScrolledPast ? 'brightness(0.85)' : 'brightness(1)', 
          transition: { duration: 0.5 } 
        });
      }

      // Parallax for background streaks
      const streak1Val = Math.max(-50, Math.min(50, currentScrollY * -0.05));
      const streak2Val = Math.max(-50, Math.min(50, currentScrollY * 0.04));
      setParallaxStreaks({ streak1Y: streak1Val, streak2Y: streak2Val });
      
      // Tachometer scroll percentage
      let scrollPercent = 0;
      if (heroSectionHeight > viewportHeight) {
         scrollPercent = Math.min(100, (currentScrollY / (heroSectionHeight - viewportHeight)) * 100);
      } else if (currentScrollY > 0) {
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


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: introCompleted ? 0.2 : 0.2 } // Consistent delay
    },
  };

  const itemVariants = {
    medallion: heroTextAnimation(introCompleted ? 0.2 : 0.2, 0.7), // delay, duration
    headline: heroTextAnimation(introCompleted ? 0.4 : 0.4, 0.7),
    tagline: heroTextAnimation(introCompleted ? 0.55 : 0.55, 0.7),
    paragraph: heroTextAnimation(introCompleted ? 0.7 : 0.7, 0.6),
    button: heroTextAnimation(introCompleted ? 0.85 : 0.85, 0.5),
  };
  
  const getTachometerBarGradient = (percentage: number) => {
    if (percentage <= 33) return 'linear-gradient(to right, hsl(var(--empire-i-blue-fog-start-hsl)), hsl(var(--empire-royal-blue-hsl)))';
    if (percentage <= 66) return 'linear-gradient(to right, hsl(var(--empire-royal-blue-hsl)), hsl(var(--empire-crimson-hsl)))';
    return 'linear-gradient(to right, hsl(var(--empire-crimson-hsl)), hsl(var(--empire-gold-hsl)))';
  };


  return (
    <Section
      animate={heroControls}
      id="home"
      className={cn(
        "relative hero-empire-bg", // Keep empire bg for now
        "min-h-[calc(100vh-0rem)] !py-0 overflow-hidden" // Added overflow-hidden
      )}
      fullHeight={false} // Already false by default from Section.tsx
      noPadding // Already true by default from Section.tsx
    >
      {/* Gantry Lights */}
      {!prefersReducedMotion && (
        <>
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
        </>
      )}
      
      {/* Dynamic Backgrounds from Empire/Nightfall (Simplified) */}
      {!prefersReducedMotion && (
        <>
           {/* Parallax Streaks from Empire */}
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] opacity-[0.04] bg-gradient-radial from-bmw-m-blue/30 via-transparent to-transparent blur-3xl transform rotate-[20deg] pointer-events-none -z-10"
            style={{ y: parallaxStreaks.streak1Y, willChange: 'transform' }}
            animate={{ x: ['-5%', '5%', '-5%'], transition: { duration: 20, repeat: Infinity, repeatType: "mirror", ease: "linear" } }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-[150vw] h-[150vh] opacity-[0.03] bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl transform rotate-[-25deg] pointer-events-none -z-10"
            style={{ y: parallaxStreaks.streak2Y, willChange: 'transform' }}
            animate={{ x: ['5%', '-5%', '5%'], transition: { duration: 22, repeat: Infinity, repeatType: "mirror", ease: "linear" } }}
          />
          {/* Halo Glows from Empire */}
          <div className="halo-glow" style={{ width: '400px', height: '400px', top: '10%', left: '20%', background: 'radial-gradient(circle, hsla(var(--empire-i-blue-fog-start-hsl),0.15) 0%, transparent 70%)', animationDelay: '0s' }} />
          <div className="halo-glow" style={{ width: '500px', height: '500px', top: '50%', left: '60%', background: 'radial-gradient(circle, hsla(var(--primary),0.08) 0%, transparent 70%)', animationDelay: '3s' }} />
          <div className="hero-bloom-extra" /> {/* Extra bloom from Empire */}

          {/* Nano Particles & Lens Flare from Nightfall */}
          <div className="nano-particle-shimmer" aria-hidden="true">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="nano-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  animationDelay: `${Math.random() * 8}s`,
                  // @ts-ignore
                  '--drift-x': (Math.random() - 0.5) * 100,
                  '--drift-y': (Math.random() - 0.5) * 100,
                }}
              />
            ))}
          </div>
          <div className="vertical-lens-flare" style={{ left: '10%', animationDelay: '0s', '--flare-y-offset': -10 } as React.CSSProperties} />
          <div className="vertical-lens-flare" style={{ left: '85%', animationDelay: '5s', '--flare-y-offset': 10 } as React.CSSProperties} />
        </>
      )}


      <motion.div
        initial="initial"
        animate={introCompleted ? "animate" : "initial"} // Control via introCompleted
        variants={containerVariants}
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-16 md:py-20 lg:py-24"
      >
        <motion.div
          variants={itemVariants.medallion.initial} // Use initial part of variant object
          animate={introCompleted ? itemVariants.medallion.animate : itemVariants.medallion.initial}
          className={cn(
            "mb-6 group hero-medallion-empire", // Use Empire styling
            isHeadlineHovered && !prefersReducedMotion && "animate-cameraShutterFlash" // Existing shutter flash
          )}
          onMouseEnter={() => setIsHeadlineHovered(true)}
          onMouseLeave={() => setIsHeadlineHovered(false)}
        >
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
        </motion.div>

        <motion.h1
          ref={headlineRef}
          variants={itemVariants.headline.initial}
          animate={introCompleted ? itemVariants.headline.animate : itemVariants.headline.initial}
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl text-primary-foreground hero-headline-empire hero-text-lift relative font-serif-display", // Font from Empire
            headlineBeamFrozen && !prefersReducedMotion && "beam-frozen",
            isHeadlineHovered && !prefersReducedMotion && "animate-cameraShutterFlash"
          )}
          style={{ opacity: headlineOpacity }}
          onMouseEnter={() => setIsHeadlineHovered(true)}
          onMouseLeave={() => setIsHeadlineHovered(false)}
        >
          Crafting Digital Excellence.
        </motion.h1>

        <motion.h2
          variants={itemVariants.tagline.initial}
          animate={introCompleted ? itemVariants.tagline.animate : itemVariants.tagline.initial}
          className={cn(
            "hero-tagline-empire text-xl md:text-2xl mt-2 md:mt-3 font-semibold uppercase tracking-wider md:tracking-widest hero-text-lift font-sans-condensed", // Font from Empire
            isTaglineUnderlineVisible && "underline-visible"
          )}
          style={{ opacity: taglineOpacity }}
        >
          Innovate. Create. Inspire.
        </motion.h2>

        <motion.p
          variants={itemVariants.paragraph.initial}
          animate={introCompleted ? itemVariants.paragraph.animate : itemVariants.paragraph.initial}
          className="mt-6 md:mt-8 max-w-xl mx-auto text-base text-foreground/80 sm:text-lg hero-text-lift"
        >
          Welcome to my digital space. I transform ideas into powerful, elegant, and user-centric web experiences. Explore my work and let&apos;s build something amazing together.
        </motion.p>

        <motion.div
          variants={itemVariants.button.initial}
          animate={introCompleted ? itemVariants.button.animate : itemVariants.button.initial}
          className="mt-10 md:mt-12"
        >
          <MStartStopButton
            onClick={handleStartDriveClick}
          >
            <PlayCircle size={32} className="mb-0.5 text-primary-foreground group-hover:text-accent transition-colors duration-150" />
            <div className="flex flex-col items-center">
              <span className="block font-bold uppercase tracking-wider">Start</span>
              <span className="block font-bold uppercase tracking-wider">Drive</span>
            </div>
          </MStartStopButton>
        </motion.div>
      </motion.div>

      {/* HUD Tachometer from Empire Edition */}
      {!prefersReducedMotion && introCompleted && (
        <motion.div
          className="hero-empire-tachometer"
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0, transition: {delay: 0.5, duration:0.5}}}
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
