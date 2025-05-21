
"use client";

import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
// Removed ContactSection as it's a separate page
// Removed ContentBurstSection, RpmWidget, NeuralDriftTimeline, SentientConsole for rollback

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      {/* Removed animated value statement */}
      <AboutMeSection />
      <SkillsSection />
      <ProjectsSection />
      {/* RpmWidget removed */}
    </div>
  );
}
