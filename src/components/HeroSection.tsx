
"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Section from '@/components/Section';
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const easeOutExpo = [0.16, 1, 0.3, 1];

const heroTextAnimation = {
  initial: { opacity: 0, y: 20, filter: 'blur(3px)' },
  animate: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'm-throttle' as any, delay }
  })
};

const fadeIn = {
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
  const [isHeadlineHovered, setIsHeadlineHovered] = useState(false);
  const [isTaglineUnderlineVisible, setIsTaglineUnderlineVisible] = useState(false);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();

  const headlineOpacity = useTransform(scrollY, [0, 100], [1, 0.5]);
  const taglineOpacity = useTransform(scrollY, [50, 150], [1, 0.3]);

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

  const handleStartDriveClick = () => {
    setIntroCompleted(true);
    requestAnimationFrame(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: introCompleted ? 0.2 : 0 }
    },
  };

  const itemVariants = {
    medallion: fadeIn.visible(introCompleted ? 0.2 : 0),
    headline: heroTextAnimation.animate(introCompleted ? 0.4 : 0.15),
    tagline: heroTextAnimation.animate(introCompleted ? 0.55 : 0.3),
    paragraph: heroTextAnimation.animate(introCompleted ? 0.7 : 0.45),
    button: heroTextAnimation.animate(introCompleted ? 0.85 : 0.6),
  };

  const getTachometerBarGradient = (percentage: number) => {
    if (percentage <= 40) return 'linear-gradient(to right, hsl(var(--empire-i-blue-fog-start-hsl)), hsl(var(--empire-royal-blue-hsl)))';
    if (percentage <= 80) return `linear-gradient(to right, hsl(var(--empire-royal-blue-hsl)), hsl(var(--empire-crimson-hsl)))`;
    return `linear-gradient(to right, hsl(var(--empire-crimson-hsl)), hsl(var(--empire-gold-hsl)))`;
  };

  return (
    <Section
      animate={heroControls}
      id="home"
      className={cn(
        "relative hero-empire-bg",
        "min-h-[calc(100vh-0rem)] !py-0"
      )}
      fullHeight={false}
      noPadding
    >
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
          <div className="hero-headlight-sweep-bg" />
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
        </>
      )}

      <motion.div
        initial="hidden"
        animate={introCompleted ? "visible" : "hidden"}
        variants={containerVariants}
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
          style={{ boxShadow: '0 0 35px 0 hsla(var(--uv-blue),.25)' }}
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
          variants={itemVariants.headline}
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl font-heading text-primary-foreground hero-headline-empire hero-text-lift relative",
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
          variants={itemVariants.tagline}
          className={cn(
            "hero-tagline-empire text-xl md:text-2xl mt-2 md:mt-3 font-semibold uppercase tracking-wider md:tracking-widest hero-text-lift",
            isTaglineUnderlineVisible && "underline-visible"
          )}
          style={{ opacity: taglineOpacity }}
        >
          Innovate. Create. Inspire.
        </motion.h2>

        <motion.p
          variants={itemVariants.paragraph}
          className="mt-6 md:mt-8 max-w-xl mx-auto text-base text-foreground/80 sm:text-lg hero-text-lift"
        >
          Welcome to my digital space. I transform ideas into powerful, elegant, and user-centric web experiences. Explore my work and let&apos;s build something amazing together.
        </motion.p>

        <motion.div
          variants={itemVariants.button}
          className="mt-10 md:mt-12"
        >
          <MStartStopButton
            onClick={handleStartDriveClick}
            className="transition-m-throttle"
          >
            <PlayCircle size={32} className="mb-0.5 text-primary group-hover:text-blood-red transition-colors duration-150" />
            <span className="text-[10px] uppercase font-bold">Start</span>
            <span className="text-[10px] uppercase font-bold">Drive</span>
          </MStartStopButton>
        </motion.div>
      </motion.div>

      {!prefersReducedMotion && introCompleted && (
        <motion.div
          className="hero-empire-tachometer"
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0, transition: {delay: 0.5, duration:0.5}}} // Ensure this animates in after main content
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

    