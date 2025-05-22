
"use client";
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useAnimation, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Section from '@/components/Section'; // Ensure Section is imported correctly
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const easeMThrottle = [0.36,1.08,0.33,1] as any; // Custom "throttle blip"

// Variants for Framer Motion
const heroTextAnimation = (delay = 0, duration = 0.7, yOffset = 20) => ({
  initial: { opacity: 0, y: yOffset, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration, ease: easeMThrottle, delay },
  },
});

export default function HeroSection() {
  const { introCompleted, setIntroCompleted } = useIntroContext();
  const prefersReducedMotion = useReducedMotion();
  const heroControls = useAnimation();
  
  const [isScrolledPastHeroThreshold, setIsScrolledPastHeroThreshold] = useState(false);
  const [isHeadlineHovered, setIsHeadlineHovered] = useState(false);
  const [isTaglineUnderlineVisible, setIsTaglineUnderlineVisible] = useState(false);
  const [headlineBeamFrozen, setHeadlineBeamFrozen] = useState(false);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();

  const [parallaxStreaks, setParallaxStreaks] = useState({ streak1X: 0, streak2X: 0 });
  const [scrollPercentForTachometer, setScrollPercentForTachometer] = useState(0);
  const heroSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"]
  });

  const parallaxX1 = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const parallaxX2 = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);


  useEffect(() => {
    if (introCompleted) {
      const timer = setTimeout(() => setIsTaglineUnderlineVisible(true), 800); 
      return () => clearTimeout(timer);
    }
  }, [introCompleted]);

  useEffect(() => {
    const heroElement = heroSectionRef.current;
    if (!heroElement || !introCompleted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const heroSectionHeight = heroElement.offsetHeight || viewportHeight;
      const heroTopOffset = heroElement.offsetTop;
      
      const scrollThresholdForDim = viewportHeight * 0.15; 
      const newIsScrolledPast = currentScrollY > scrollThresholdForDim;
      
      if (newIsScrolledPast !== isScrolledPastHeroThreshold) {
        setIsScrolledPastHeroThreshold(newIsScrolledPast);
        setHeadlineBeamFrozen(newIsScrolledPast);
      }

      let scrollPercent = 0;
      if (currentScrollY >= heroTopOffset && currentScrollY <= heroTopOffset + heroSectionHeight - viewportHeight) {
        scrollPercent = Math.min(100, ((currentScrollY - heroTopOffset) / (heroSectionHeight - viewportHeight)) * 100);
      } else if (currentScrollY > heroTopOffset + heroSectionHeight - viewportHeight) {
        scrollPercent = 100;
      } else if (currentScrollY < heroTopOffset) {
        scrollPercent = 0;
      }
      setScrollPercentForTachometer(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [introCompleted, isScrolledPastHeroThreshold]);


  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: introCompleted ? 0.2 : 0.2 }
    },
  };

  const itemVariants = {
    medallion: heroTextAnimation(0.2, 0.7, 20),
    headline: heroTextAnimation(0.4, 0.7, 20),
    tagline: heroTextAnimation(0.55, 0.7, 20),
    paragraph: heroTextAnimation(0.8, 0.6, 10),
    // button variant was here, removed as button is removed
  };
  
  const getTachometerBarGradient = () => {
    const iBlue = `hsl(var(--bmw-m-blue))`;
    const hyperViolet = `hsl(var(--m-violet-hsl))`;
    const voltageGold = `hsl(var(--primary))`;

    if (scrollPercentForTachometer <= 33) return `linear-gradient(to right, ${iBlue} 0%, ${hyperViolet} 100%)`;
    if (scrollPercentForTachometer <= 66) return `linear-gradient(to right, ${iBlue} 0%, ${hyperViolet} 50%, ${voltageGold} 100%)`;
    return `linear-gradient(to right, ${hyperViolet} 0%, ${voltageGold} 100%)`;
  };


  const handleStartDriveClick = useCallback(() => {
    setIntroCompleted(true);
    requestAnimationFrame(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, [setIntroCompleted]);


  return (
    <Section
      ref={heroSectionRef}
      id="home"
      className={cn(
        "hero-empire-bg min-h-screen !py-0 overflow-hidden flex flex-col items-center justify-center",
        isScrolledPastHeroThreshold && "hero-backdrop-dimmed"
      )}
      fullHeight
      noPadding
    >
      {/* Background Effects (Static and Parallax) */}
      <div className="hero-headlight-sweep-bg" /> 

      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] opacity-[0.03] bg-gradient-radial from-bmw-m-blue/30 via-transparent to-transparent blur-3xl transform rotate-[20deg] pointer-events-none -z-10"
            style={{ x: parallaxX1, willChange: 'transform' }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-[150vw] h-[150vh] opacity-[0.02] bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl transform rotate-[-25deg] pointer-events-none -z-10"
            style={{ x: parallaxX2, willChange: 'transform' }}
          />
           {/* Nano Particle Shimmer & Lens Flares */}
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
                    '--drift-x': `${(Math.random() - 0.5) * 100}px`,
                    '--drift-y': `${(Math.random() - 0.5) * 100}px`,
                  }}
                />
              ))}
            </div>
            <div className="vertical-lens-flare" style={{ left: '10%', animationDelay: '0s' }} />
            <div className="vertical-lens-flare" style={{ left: '85%', animationDelay: '5s' }} />
        </>
      )}
      
      {/* Halo Glows & Bloom Effects */}
      {!prefersReducedMotion && (
        <>
          <div className="halo-glow" style={{ width: '400px', height: '400px', top: '10%', left: '20%', background: 'radial-gradient(circle, hsla(var(--bmw-m-blue),0.06) 0%, transparent 70%)', animationDelay: '0s' }} />
          <div className="halo-glow" style={{ width: '500px', height: '500px', top: '50%', left: '60%', background: 'radial-gradient(circle, hsla(var(--primary),0.04) 0%, transparent 70%)', animationDelay: '3s' }} />
          <div className="hero-bloom-extra" />
        </>
      )}


      {/* Gantry Lights */}
      {!prefersReducedMotion && introCompleted && (
        <>
           <motion.div
            className="hero-gantry-light top-0"
            initial={{ scaleX:0, opacity:0}}
            animate={{ scaleX:1, opacity:1, transition: {duration: 0.5, delay:0.1, ease: "easeOut"}} }
            exit={{scaleX:0, opacity:0}}
          />
          <motion.div
            className="hero-gantry-light bottom-0"
            initial={{ scaleX:0, opacity:0}}
            animate={{ scaleX:1, opacity:1, transition: {duration: 0.5, delay:0.3, ease: "easeOut"}} }
            exit={{scaleX:0, opacity:0}}
          />
        </>
      )}

      {/* Main Content Container */}
      <motion.div
        variants={containerVariants}
        initial="initial" 
        animate={introCompleted ? "animate" : "initial"}
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-16 md:py-20 lg:py-24"
      >
        {/* Profile Medallion */}
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

        {/* Headline */}
        <motion.h1
          ref={headlineRef}
          variants={itemVariants.headline}
          className={cn(
            "relative hero-headline-empire text-5xl sm:text-6xl md:text-7xl text-primary-foreground font-fraunces",
            headlineBeamFrozen && !prefersReducedMotion && "beam-frozen", 
            isHeadlineHovered && !prefersReducedMotion && "animate-cameraShutterFlash"
          )}
          
          onMouseEnter={() => setIsHeadlineHovered(true)}
          onMouseLeave={() => setIsHeadlineHovered(false)}
        >
          Coded Precision.
          {/* Dynamic Headline Beam */}
          {!prefersReducedMotion && (
             <span className={cn("hero-headline-beam", headlineBeamFrozen && "beam-frozen")} />
          )}
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          variants={itemVariants.tagline}
          className={cn(
            "hero-tagline-empire mt-2 md:mt-3 text-xl font-semibold uppercase tracking-wider text-transparent md:text-2xl md:tracking-widest font-inter", 
            isTaglineUnderlineVisible && "underline-visible"
          )}
        >
          DESIGNED FOR THE FAST LANE.
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          variants={itemVariants.paragraph}
          className="font-inter mt-6 max-w-[44ch] mx-auto text-base text-foreground/80 sm:text-lg md:mt-8 hero-text-lift"
        >
          Welcome to my digital command center. I engineer solutions that fuse <strong className="text-primary/90 font-semibold">power</strong> with <strong className="text-primary/90 font-semibold">elegance</strong>, creating impactful, user-centric web experiences. Explore my work and let&apos;s accelerate your vision.
        </motion.p>
        
        {/* MStartStopButton was here, removed as per user request to leave the space empty */}

      </motion.div>

      {/* Tachometer Indicator (conditionally rendered) */}
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
                backgroundImage: getTachometerBarGradient()
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

