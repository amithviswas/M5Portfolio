
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Eye } from 'lucide-react';

import { projectsData } from '@/lib/data'; // Import centralized project data
import type { Project } from '@/lib/types'; // Import Project type
import { ProjectCard } from '@/components/portfolio/ProjectCard'; // Import ProjectCard component
import { ProjectModal } from '@/components/portfolio/ProjectModal'; // Import ProjectModal component

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optional: Delay clearing selectedProject if modal has fade-out animation
    // setTimeout(() => setSelectedProject(null), 300); 
  };

  return (
    <Section id="projects" className="bg-background">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-primary-foreground font-heading"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Featured <span className="text-primary">Projects</span>
        </motion.h2>
        <motion.div 
          className="w-28 h-1 bg-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {projectsData.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onViewDetails={handleViewDetails} 
          />
        ))}
      </motion.div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </Section>
  );
}
