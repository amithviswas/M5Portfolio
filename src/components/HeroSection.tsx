
"use client";
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useAnimation, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Section from '@/components/Section';
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Easing curve for "throttle blip" or snappy M-Series transitions
const easeOutExpo = [0.16, 1, 0.3, 1]; // Standard easeOutExpo
const easeMThrottle = [0.36,1.08,0.33,1]; // Custom "throttle blip"

const heroTextAnimation = (delay = 0, duration = 0.7) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(3px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration, ease: easeMThrottle as any, delay }
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
      const timer = setTimeout(() => setIsTaglineUnderlineVisible(true), 800); 
      return () => clearTimeout(timer);
    }
  }, [introCompleted]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const heroSectionElement = document.getElementById('home'); 
      const heroSectionHeight = heroSectionElement?.offsetHeight || viewportHeight;

      const scrollThreshold = viewportHeight * 0.15; 
      const newIsScrolledPast = currentScrollY > scrollThreshold;
      if (newIsScrolledPast !== isScrolledPastHeroThreshold) {
        setIsScrolledPastHeroThreshold(newIsScrolledPast);
        setHeadlineBeamFrozen(newIsScrolledPast); 
        heroControls.start({ 
          filter: newIsScrolledPast ? 'brightness(0.85)' : 'brightness(1)', 
          transition: { duration: 0.5 } 
        });
      }

      const streak1Val = Math.max(-50, Math.min(50, currentScrollY * -0.05));
      const streak2Val = Math.max(-50, Math.min(50, currentScrollY * 0.04));
      setParallaxStreaks({ streak1Y: streak1Val, streak2Y: streak2Val });
      
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
      handleScroll(); 
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [introCompleted, heroControls, isScrolledPastHeroThreshold]);


  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: introCompleted ? 0.2 : 0.2 }
    },
  };

  const itemVariants = {
    medallion: {
      initial: { opacity: 0, scale: 0.5, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: easeMThrottle, delay: introCompleted ? 0.2 : 0.2 } }
    },
    headline: {
      initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: easeMThrottle, delay: introCompleted ? 0.4 : 0.4 } }
    },
    tagline: {
      initial: { opacity: 0, y: 15, filter: 'blur(3px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: easeMThrottle, delay: introCompleted ? 0.55 : 0.55 } }
    },
    paragraph: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo, delay: introCompleted ? 0.8 : 0.8 } }
    },
    button: {
      initial: { opacity: 0, y: 10, scale: 0.8 },
      animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeMThrottle, delay: introCompleted ? 1.0 : 1.0 } }
    },
  };
  
  const getTachometerBarGradient = (percentage: number) => {
    if (percentage <= 40) return 'linear-gradient(to right, hsl(var(--empire-i-blue-fog-start-hsl)), hsl(var(--empire-royal-blue-hsl)))';
    if (percentage <= 80) return 'linear-gradient(to right, hsl(var(--empire-royal-blue-hsl)), hsl(var(--empire-crimson-hsl)))';
    return 'linear-gradient(to right, hsl(var(--empire-crimson-hsl)), hsl(var(--empire-gold-hsl)))';
  };


  return (
    <Section
      animate={heroControls}
      id="home"
      className={cn(
        "relative hero-empire-bg", 
        "min-h-[calc(100vh)] !py-0 overflow-hidden" 
      )}
      fullHeight={false} 
      noPadding 
    >
      <div className="hero-headlight-sweep-bg" /> 
      
      {!prefersReducedMotion && (
        <>
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
          <div className="halo-glow" style={{ width: '400px', height: '400px', top: '10%', left: '20%', background: 'radial-gradient(circle, hsla(var(--empire-i-blue-fog-start-hsl),0.15) 0%, transparent 70%)', animationDelay: '0s' }} />
          <div className="halo-glow" style={{ width: '500px', height: '500px', top: '50%', left: '60%', background: 'radial-gradient(circle, hsla(var(--primary),0.08) 0%, transparent 70%)', animationDelay: '3s' }} />
          <div className="hero-bloom-extra" />

          <div className="nano-particle-shimmer" aria-hidden="true">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`nano-${i}`}
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


      <motion.div
        variants={containerVariants}
        initial="initial" // Changed from "hidden" to match variants definition
        animate={introCompleted ? "animate" : "initial"}
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-16 md:py-20 lg:py-24"
      >
        <motion.div
          variants={itemVariants.medallion}
          className={cn(
            "mb-6 group hero-medallion-empire", 
            isHeadlineHovered && !prefersReducedMotion && "animate-cameraShutterFlash" 
          )}
          onMouseEnter={() => setIsHeadlineHovered(true)}
          onMouseLeave={() => setIsHeadlineHovered(false)}
        >
          <div className="hero-medallion-nightfall-inner"> 
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

        <motion.h1
          ref={headlineRef}
          variants={itemVariants.headline}
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl text-primary-foreground hero-headline-empire relative font-fraunces", 
            headlineBeamFrozen && !prefersReducedMotion && "beam-frozen", 
            isHeadlineHovered && !prefersReducedMotion && "animate-cameraShutterFlash"
          )}
          style={{ opacity: headlineOpacity }}
          onMouseEnter={() => setIsHeadlineHovered(true)}
          onMouseLeave={() => setIsHeadlineHovered(false)}
        >
          Coded Precision.
        </motion.h1>

        <motion.h2
          variants={itemVariants.tagline}
          className={cn(
            "hero-tagline-empire text-xl md:text-2xl mt-2 md:mt-3 font-semibold uppercase tracking-wider md:tracking-widest font-inter", 
            isTaglineUnderlineVisible && "underline-visible"
          )}
          style={{ opacity: taglineOpacity }}
        >
          DESIGNED FOR THE FAST LANE.
        </motion.h2>

        <motion.p
          variants={itemVariants.paragraph}
          className="mt-6 md:mt-8 max-w-xl mx-auto text-base text-foreground/80 sm:text-lg font-inter"
        >
          Welcome to my digital space. I transform ideas into powerful, elegant, and user-centric web experiences. Explore my work and let&apos;s build something amazing together.
        </motion.p>

        <motion.div
          variants={itemVariants.button}
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
