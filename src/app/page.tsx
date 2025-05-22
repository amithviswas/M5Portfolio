
"use client";

import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
// RpmWidget was removed in a previous step.
// ContentBurstSection was removed in a previous step.
// NeuralDriftTimeline was removed in a previous step.
import SentientConsole from '@/components/SentientConsole'; // This was part of the "Aggressive Elegance" theme
import { motion } from 'framer-motion';
// import { useTheme } from '@/contexts/ThemeContext'; // Removed

export default function HomePage() {
  // const { theme } = useTheme(); // Removed

  // const backgroundImage = theme === 'light'
  //   ? 'https://i.ibb.co/TqtL0ksP/generated-image-6-1-1-1.png' // Light theme image
  //   : 'https://i.ibb.co/ycZTCm2n/generated-image-2-1-1.png'; // New dark theme image

  return (
    <>
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat bg-[url('https://i.ibb.co/ycZTCm2n/generated-image-2-1-1.png')]"
        aria-hidden="true"
      />
      <div className="flex flex-col relative z-0"> {/* Ensure content stays above background */}
        <HeroSection />
        {/* Animated value statement - was part of "Content Burst", can be re-added if desired */}
        {/* <motion.p 
          className="text-center text-lg md:text-xl text-foreground/80 mt-[-2rem] mb-12 md:mb-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          End-to-end AI craftsmanship for velocity brands.
        </motion.p> */}
        <AboutMeSection />
        <SkillsSection />
        <ProjectsSection />
        {/* ContactSection was moved to its own page */}
        {/* RpmWidget was removed */}
        {/* SentientConsole is kept as it's part of the M5 theme */}
        <SentientConsole /> 
      </div>
    </>
  );
}
