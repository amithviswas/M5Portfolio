
"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Section from '@/components/Section';
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function HeroSection() {
  const { introCompleted, setIntroCompleted } = useIntroContext(); // Ensure introCompleted is used if needed, or remove
  const [isScrolledPastThreshold, setIsScrolledPastThreshold] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();
  const heroControls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.2; // 20vh
      if (window.scrollY > threshold) {
        setIsScrolledPastThreshold(true);
      } else {
        setIsScrolledPastThreshold(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
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

  const customThrottleCurve = [0.36,1.08,.33,1];

  const medallionVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.4, ease: customThrottleCurve, delay: 0.2 } 
    },
  };

  const headline1Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: customThrottleCurve, delay: 0.4 } 
    },
  };

  const headline2Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: customThrottleCurve, delay: 0.55 } 
    },
  };
  
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut", delay: 0.8 } 
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: customThrottleCurve, 
        delay: 1.0,
        y: { type: "spring", stiffness: 100, damping: 10, mass: 0.5, restDelta: 0.001 } 
      } 
    },
  };
  
  const shutterFlashAnimation = prefersReducedMotion ? {} : {
    filter: "saturate(1.4) brightness(1.3)",
    transition: { duration: 0.125, ease: "linear", repeat: 1, repeatType: "reverse" as const, delay: 0 }
  };


  return (
    <Section
      animate={heroControls}
      id="home" 
      className={cn(
        "relative !pt-0 !pb-0 overflow-hidden hero-satin-mesh-bg",
        !prefersReducedMotion && "animate-ambient-pulse"
      )} 
      fullHeight 
      noPadding
    >
      {/* Headlight Gobo Beams */}
      {!prefersReducedMotion && (
        <>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <motion.div
              className="absolute w-1/2 h-full bg-gradient-to-r from-[hsla(var(--m-light-blue-hsl),0.03)] to-transparent opacity-50"
              style={{
                clipPath: 'polygon(0 0, 40% 0, 60% 100%, 0% 100%)',
                filter: 'blur(10px)',
                transform: 'skewX(-15deg) translateX(-30%)',
                opacity: 0.15,
              }}
              initial={{ x: "-50%", opacity: 0 }}
              animate={{ x: "-30%", opacity: 0.15, transition: {duration: 1, delay: 0.5} }}
            />
            <motion.div
              className="absolute w-1/2 h-full bg-gradient-to-l from-[hsla(var(--m-light-blue-hsl),0.03)] to-transparent opacity-50"
              style={{
                clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)',
                filter: 'blur(10px)',
                transform: 'skewX(15deg) translateX(30%)',
                opacity: 0.15,
              }}
               initial={{ x: "50%", opacity: 0 }}
               animate={{ x: "30%", opacity: 0.15, transition: {duration: 1, delay: 0.5} }}
            />
          </div>
        </>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-12 md:py-20">
        
        <motion.div
          className="relative mb-6 md:mb-8"
          variants={medallionVariants}
          initial="hidden"
          animate="visible"
          whileHover={!prefersReducedMotion ? shutterFlashAnimation : {}}
        >
          <div 
            className="w-[120px] h-[120px] hero-carbon-ring p-1"
            style={{ boxShadow: '0 0 35px 0 hsla(var(--m-light-blue-hsl), .25)'}}
          >
             <div className="w-full h-full rounded-full hero-tricolor-stroke-outer relative overflow-hidden">
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
                <div className="hero-spec-highlight"></div>
             </div>
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight transition-m-blip font-rajdhani"
          style={{ color: '#E5E5E5', textShadow: '0 1px 2px #000, 0 0 8px rgba(0,0,0,.25)'}}
          variants={headline1Variants}
          initial="hidden"
          animate="visible"
          whileHover={!prefersReducedMotion ? shutterFlashAnimation : {}}
        >
          Crafting Digital Excellence.
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl font-semibold mt-1 md:mt-2 hero-tagline-gradient hero-tagline-underline font-rajdhani"
          style={{ letterSpacing: '1px' }}
          variants={headline2Variants}
          initial="hidden"
          animate="visible"
          whileHover={!prefersReducedMotion ? shutterFlashAnimation : {}}
        >
          Innovate. Create. Inspire.
        </motion.p>

        <motion.p
          className="mt-4 md:mt-6 max-w-[44ch] mx-auto text-sm text-foreground/80 sm:text-base"
          variants={paragraphVariants}
          initial="hidden"
          animate="visible"
        >
          Welcome to my digital space. I transform ideas into powerful, elegant, and user-centric web experiences. Explore my work and let&apos;s build something amazing together.
        </motion.p>

        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 md:mt-10"
        >
          <MStartStopButton onClick={handleStartDriveClick} className="transition-m-blip">
            <PlayCircle size={32} className="mb-1 text-primary group-hover:text-blood-red transition-colors" />
            <span className="text-xs uppercase">Start</span>
            <span className="text-xs uppercase">Drive</span>
          </MStartStopButton>
        </motion.div>
      </div>
    </Section>
  );
}
