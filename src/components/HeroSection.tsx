
"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Section from '@/components/Section'; // Default import
import { MStartStopButton } from '@/components/MStartStopButton';
import { useIntroContext } from '@/contexts/IntroContext';
import Image from 'next/image'; // For the profile picture

const easeOutExpo = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const { introCompleted, setIntroCompleted } = useIntroContext(); // Get setIntroCompleted
  const prefersReducedMotion = useReducedMotion();

  const handleStartDriveClick = () => {
    setIntroCompleted(true); // Mark intro as completed
    requestAnimationFrame(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  // Variants for staggered animation of content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger child animations
        delayChildren: 0.3,   // Delay start of children relative to parent
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
  };

  return (
    <Section
      id="home"
      className="relative bg-background" // Simplified background
      fullHeight
      noPadding
    >
      <motion.div
        initial="hidden"
        animate={introCompleted ? "visible" : "hidden"} // Animate in after intro
        variants={containerVariants}
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-12 md:py-20"
      >
        {/* Profile Picture */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <Image
            src="https://i.ibb.co/cKgh0560/1701fc1e-7948-4d92-b440-ffb24258652b.png"
            alt="Amith Viswas Reddy"
            width={100} // Smaller size
            height={100} // Smaller size
            className="rounded-full object-cover border-2 border-primary shadow-lg"
            priority
            data-ai-hint="profile photo"
          />
        </motion.div>

        {/* Text Content */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-heading text-primary-foreground"
        >
          Crafting Digital Excellence.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl mt-2 md:mt-3 text-accent font-semibold tracking-wider"
        >
          Innovate. Create. Inspire.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-4 md:mt-6 max-w-[44ch] mx-auto text-sm text-foreground/80 sm:text-base"
        >
          Welcome to my digital space. I transform ideas into powerful, elegant, and user-centric web experiences. Explore my work and let&apos;s build something amazing together.
        </motion.p>

        {/* Start Drive Button */}
        <motion.div
          variants={itemVariants}
          className="mt-8 md:mt-10"
        >
          <MStartStopButton onClick={handleStartDriveClick}>
            <PlayCircle size={32} className="mb-1 text-primary group-hover:text-blood-red transition-colors" />
            <span className="text-xs uppercase">Start</span>
            <span className="text-xs uppercase">Drive</span>
          </MStartStopButton>
        </motion.div>
      </motion.div>
    </Section>
  );
}
