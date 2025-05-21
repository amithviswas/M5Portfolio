
"use client";

import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';

export default function HomePage() {
  return (
    <>
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat bg-[url('https://i.ibb.co/qY8g9702/generated-image-2-1.png')]"
        aria-hidden="true"
      />
      <div className="flex flex-col relative z-0"> {/* Added relative z-0 to ensure content stays above new background */}
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <ProjectsSection />
        {/* RpmWidget removed */}
      </div>
    </>
  );
}
