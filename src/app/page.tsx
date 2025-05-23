"use client";

import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import AchievementsSection from '@/components/AchievementsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ResumeSection from '@/components/ResumeSection';
import ContactFormSection from '@/components/ContactFormSection';

export default function HomePage() {
  return (
    <>
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat bg-[url('https://i.ibb.co/ycZTCm2n/generated-image-2-1-1.png')]"
        aria-hidden="true"
      />
      <div className="flex flex-col relative z-0">
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <CertificationsSection />
        <ResumeSection />
        <ContactFormSection />
      </div>
    </>
  );
}
