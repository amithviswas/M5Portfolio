
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button'; // Import button
import { ArrowRight } from 'lucide-react'; // For button icon

import { projectsData } from '@/lib/data'; 
import type { Project } from '@/lib/types'; 
import { ProjectCard } from '@/components/portfolio/ProjectCard'; 
import { ProjectModal } from '@/components/portfolio/ProjectModal'; 

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false); // State for visibility

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optional: Delay clearing selectedProject if modal has fade-out animation
    setTimeout(() => setSelectedProject(null), 300); 
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

      {!projectsVisible && (
        <motion.div 
          className="text-center mt-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            onClick={() => setProjectsVisible(true)} 
            size="lg" 
            className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-lg hover:shadow-[0_0_20px_hsl(var(--primary)/0.7)] transition-all duration-300 transform hover:scale-105"
          >
            View My Projects <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      )}

      {projectsVisible && (
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          exit={{ opacity: 0, y: -20 }} // Optional: exit animation if you hide it again
        >
          {projectsData.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onViewDetails={handleViewDetails} 
            />
          ))}
        </motion.div>
      )}

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </Section>
  );
}
