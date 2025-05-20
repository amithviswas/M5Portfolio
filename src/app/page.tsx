
"use client";

import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContentBurstSection from '@/components/ContentBurstSection'; // New Import
import RpmWidget from '@/components/RpmWidget'; // New Import
import { motion } from 'framer-motion'; // New Import

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Animated Value Statement */}
      <motion.p
        className="text-center text-lg md:text-xl text-foreground/90 py-8 md:py-12 font-rajdhani tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.36,1.08,0.33,1] }} // 600ms after hero headline approx (hero animations take about 0.6s base + stagger)
      >
        End-to-end AI craftsmanship for velocity brands.
      </motion.p>

      <ContentBurstSection /> {/* New Section */}
      
      <AboutMeSection />
      <SkillsSection />
      <ProjectsSection />
      
      <RpmWidget /> {/* New Widget */}

      <style jsx global>{`
        .perspective { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
