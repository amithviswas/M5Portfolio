
"use client";

import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
// Removed ContactSection import

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <ProjectsSection />
      {/* Removed ContactSection component */}
      <style jsx global>{`
        .perspective { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
