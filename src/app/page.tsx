
"use client";

import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
// SpeedometerWidget import removed
// ContentBurstSection was removed in a previous step.
// NeuralDriftTimeline was removed in a previous step.
// SentientConsole was removed as per user request
import { motion } from 'framer-motion';


export default function HomePage() {


  return (
    <>
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat bg-[url('https://i.ibb.co/ycZTCm2n/generated-image-2-1-1.png')]"
        aria-hidden="true"
      />
      <div className="flex flex-col relative z-0"> {/* Ensure content stays above background */}
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <ProjectsSection />
        {/* SpeedometerWidget instance removed */}
      </div>
    </>
  );
}

