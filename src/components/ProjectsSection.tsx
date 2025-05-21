
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react'; 

import { projectsData } from '@/lib/data'; 
import type { Project } from '@/lib/types'; 
import { ProjectCard } from '@/components/portfolio/ProjectCard'; 
import { ProjectModal } from '@/components/portfolio/ProjectModal'; 

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); 
  };

  return (
    <Section id="projects" className="bg-background/70 backdrop-blur-md"> 
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-heading text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Track <span className="text-primary">History</span>
        </motion.h2>
        <motion.div 
          className="w-48 h-1 bg-gradient-to-r from-bmw-m-blue via-primary-foreground to-primary mx-auto mt-4 rounded-full"
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
            className="group bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-primary-foreground rounded-md shadow-lg hover:shadow-[0_0_20px_hsl(var(--accent)/0.5)] transition-all duration-300 transform hover:scale-105 px-8 py-4 border-2 border-gray-600 hover:border-accent"
          >
            VIEW TRACK HISTORY <Zap className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:text-yellow-400 group-hover:animate-pulse" />
          </Button>
        </motion.div>
      )}

      {projectsVisible && (
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12 perspective" 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, staggerChildren: 0.1 }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateY: -30, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="transform-style-3d"
            >
              <ProjectCard 
                project={project} 
                onViewDetails={handleViewDetails} 
              />
            </motion.div>
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
