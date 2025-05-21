
"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { PlayCircle, Activity, Thermometer, Gauge } from 'lucide-react'; // Added new icons for console
import Section from '@/components/Section'; 
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import Image from 'next/image'; 
import { cn } from '@/lib/utils';

const easeOutExpo = [0.16, 1, 0.3, 1];

// Staggered animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.15 * i, delayChildren: 0.1 * i },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const heroTextAnimation = {
  initial: { opacity: 0, y: 20, filter: 'blur(3px)' },
  animate: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.36,1.08,0.33,1], delay } // Custom M-throttle ease
  })
};


export default function HeroSection() {
  const { introCompleted, setIntroCompleted } = useIntroContext();
  const prefersReducedMotion = useReducedMotion();
  const heroControls = useAnimation(); // For scroll-based animations on hero itself
  const [isScrolledPastHeroThreshold, setIsScrolledPastHeroThreshold] = useState(false);

  // Parallax light streaks
  const [parallaxStreaks, setParallaxStreaks] = useState({ streak1Y: 0, streak2Y: 0 });


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Dim hero backdrop
      if (scrollY > viewportHeight * 0.15) { // 15vh
        if (!isScrolledPastHeroThreshold) {
          heroControls.start({ filter: 'brightness(0.85)', transition: { duration: 0.5 } });
          setIsScrolledPastHeroThreshold(true);
        }
      } else {
        if (isScrolledPastHeroThreshold) {
          heroControls.start({ filter: 'brightness(1)', transition: { duration: 0.5 } });
          setIsScrolledPastHeroThreshold(false);
        }
      }

      // Parallax for light streaks (subtle effect)
      const streak1Val = Math.max(-50, Math.min(50, scrollY * -0.05)); // Inverted direction for one
      const streak2Val = Math.max(-50, Math.min(50, scrollY * 0.04));
      setParallaxStreaks({ streak1Y: streak1Val, streak2Y: streak2Val });

    };

    if (introCompleted) {
      window.addEventListener('scroll', handleScroll);
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
  
  const easeOutBack = [0.34, 1.56, 0.64, 1]; // For "Studio Glide"

  const slideInLeft = {
    hidden: { opacity: 0, x: -50, rotateY:15 },
    visible: (delay = 0) => ({
      opacity: 1, x: 0, rotateY: 0,
      transition: { duration: 0.8, ease: easeOutBack, delay }
    })
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 50, rotateY: -15 },
    visible: (delay = 0) => ({
      opacity: 1, x: 0, rotateY: 0,
      transition: { duration: 0.8, ease: easeOutBack, delay }
    })
  };
   const fadeIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (delay = 0) => ({
      opacity: 1, scale: 1,
      transition: { duration: 0.7, ease: easeOutBack, delay }
    })
  };


  return (
    <Section
      animate={heroControls}
      id="home"
      className={cn(
        "relative hero-empire-bg bg-gradient-to-b from-background to-neutral-900/60", // Darkening gradient, new empire bg
        "min-h-[calc(100vh-0rem)]" // Adjusted to be slightly less than full VH to avoid scroll issues with fixed nav
      )} 
      fullHeight={false} // We manage height specifically
      noPadding // Padding will be handled by inner container
    >
      {/* Gantry Lights */}
      <motion.div 
        className="hero-gantry-light top-0"
        initial={{ scaleX:0, opacity:0}}
        animate={introCompleted ? { scaleX:1, opacity:1, transition: {duration: 0.5, delay:0.1, ease: "easeOut"}} : {}}
        exit={{scaleX:0, opacity:0}}
      />

      {/* Dynamic Headlight Sweep Background */}
      {!prefersReducedMotion && (
        <motion.div 
          className="hero-headlight-sweep-bg"
          animate={{ 
            translateX: ["-6vw", "6vw"],
            rotate: [-15, -13, -17, -15], // Subtle rotation wobble
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
        />
      )}

      {/* Parallax Light Streaks (Nightfall Atelier) */}
       {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] opacity-[0.04] bg-gradient-radial from-bmw-m-blue/30 via-transparent to-transparent blur-3xl transform rotate-[20deg] pointer-events-none -z-10"
            style={{ y: parallaxStreaks.streak1Y, willChange: 'transform' }}
            animate={{
                x: ['-5%', '5%', '-5%'],
                transition: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }
            }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-[150vw] h-[150vh] opacity-[0.03] bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl transform rotate-[-25deg] pointer-events-none -z-10"
            style={{ y: parallaxStreaks.streak2Y, willChange: 'transform' }}
             animate={{
                x: ['5%', '-5%', '5%'],
                transition: { duration: 22, repeat: Infinity, repeatType: "reverse", ease: "linear" }
            }}
          />
        </>
      )}

      {/* Halo Glows for Empire BG */}
      {!prefersReducedMotion && (
        <>
          <div className="halo-glow" style={{ width: '400px', height: '400px', top: '10%', left: '20%', background: 'radial-gradient(circle, hsla(var(--empire-i-blue-fog-start-hsl),0.2) 0%, transparent 70%)', animationDelay: '0s' }} />
          <div className="halo-glow" style={{ width: '500px', height: '500px', top: '50%', left: '60%', background: 'radial-gradient(circle, hsla(var(--primary),0.1) 0%, transparent 70%)', animationDelay: '3s' }} />
           <div className="halo-glow hero-bloom-extra" /> {/* Additional bloom from globals */}
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
          variants={fadeIn} custom={0.2}
          className="mb-8 group hero-text-lift" // Added hero-text-lift
        >
          <div className="hero-medallion-empire hover:scale-105 transition-transform duration-300 ease-[var(--ease-m-throttle)]"
             style={{boxShadow: '0 0 35px 0 hsla(var(--bmw-m-blue),.25)'}} > {/* Icy blue spotlight */}
            <div className="spec-highlight-arc" /> {/* Lacquered finish */}
            <Image
              src="https://i.ibb.co/cKgh0560/1701fc1e-7948-4d92-b440-ffb24258652b.png"
              alt="Amith Viswas Reddy"
              width={120} 
              height={120} 
              className="rounded-full object-cover"
              priority
              data-ai-hint="profile photo"
            />
          </div>
        </motion.div>

        {/* Headline Stack - Empire Edition */}
        <motion.h1
          custom={0.4}
          variants={heroTextAnimation} // Use new variant
          className="text-5xl sm:text-6xl md:text-7xl font-heading text-primary-foreground hero-headline-empire hero-text-lift" // Empire font, hero-text-lift
          style={{ textShadow: '0 1px 1px rgba(0,0,0,0.6), 0 0 5px rgba(0,0,0,0.2), 0 1px 2px rgba(255,255,255,0.1) inset' }} // Engraved chrome
        >
          Coded Precision.
        </motion.h1>
        <motion.h2
          custom={0.55}
          variants={heroTextAnimation} // Use new variant
          className="hero-tagline-empire text-xl md:text-2xl mt-2 md:mt-3 font-semibold uppercase tracking-wider md:tracking-widest hero-text-lift" // Empire font, M-blue/red split, hero-text-lift
        >
          Designed for the Fast Lane.
        </motion.h2>


        {/* Intro Paragraph */}
        <motion.p
          custom={0.8}
          variants={heroTextAnimation} // Use new variant
          className="mt-6 md:mt-8 max-w-xl mx-auto text-base text-foreground/80 sm:text-lg hero-text-lift"
        >
          Welcome to my digital space. I transform ideas into powerful, elegant, and user-centric web experiences. Explore my work and let&apos;s build something amazing together.
        </motion.p>

        {/* MStartStopButton - Obsidian Crown / Jet Crystal Spec */}
        <motion.div
          custom={1.0}
          variants={heroTextAnimation} // Use new variant
          className="mt-10 md:mt-12"
        >
          <MStartStopButton 
            onClick={handleStartDriveClick}
            className="transition-m-throttle" // Ensure throttle transition
          >
            <PlayCircle size={28} className="mb-0.5 text-primary group-hover:text-blood-red transition-colors duration-150" />
            <span className="text-[10px] uppercase font-bold">Start</span>
            <span className="text-[10px] uppercase font-bold">Drive</span>
          </MStartStopButton>
        </motion.div>
      </motion.div>
      
      {/* Bottom Gantry Light */}
       <motion.div 
        className="hero-gantry-light bottom-0"
        initial={{ scaleX:0, opacity:0}}
        animate={introCompleted ? { scaleX:1, opacity:1, transition: {duration: 0.5, delay:0.3, ease: "easeOut"}} : {}}
        exit={{scaleX:0, opacity:0}}
      />

      {/* RPM Tachometer Strip - Empire Edition / Quantum */}
      <motion.div 
        className="hero-empire-tachometer"
        initial={{opacity:0, y:20}}
        animate={introCompleted ? {opacity:1, y:0, transition: {delay: 1.2, duration:0.5}} : {}}
      >
        <motion.div 
            className="hero-empire-tachometer-bar" 
            /* Style for width and background gradient will be applied by scroll effect in useEffect */
        />
         {/* Ghost trail for tachometer - needs JS to set width and opacity based on bar's width */}
        <motion.div className="hero-empire-tachometer-trail" />
      </motion.div>

    </Section>
  );
}

