
"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Section from '@/components/Section';
import { ExternalLink, Eye, Github } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'Landing Page',
    description: 'A responsive and modern landing page design.',
    image: 'https://i.ibb.co/7jTdqCv/Screenshot-2024-07-09-093930.png',
    dataAiHint: 'website design',
    liveLink: 'https://amithviswas.github.io/Landing-Page/',
    repoLink: '#', 
    tags: ['HTML', 'CSS', 'Responsive Design']
  },
  {
    title: 'Home Theater Experience',
    description: 'A web application simulating a home theater selection and viewing experience.',
    image: 'https://i.ibb.co/G52Sq68/Screenshot-of-Home-Theater.png',
    dataAiHint: 'web application',
    liveLink: 'https://amithviswas.github.io/Home-Theater-Experience/',
    repoLink: '#',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX']
  },
  {
    title: 'Reverse-engineered Twitch.tv UI',
    description: 'A recreation of the Twitch.tv user interface focusing on front-end details.',
    image: 'https://i.ibb.co/kqk32SP/Screenshot-of-Twitch-tv.png',
    dataAiHint: 'website interface',
    liveLink: 'https://amithviswas.github.io/Twitch.tv-UI-Reversed-Engineered-/',
    repoLink: '#',
    tags: ['UI/UX', 'HTML', 'CSS', 'Reverse Engineering']
  },
  {
    title: 'Music Player with Slider',
    description: 'A functional music player interface with playback controls and a progress slider.',
    image: 'https://i.ibb.co/tp12Hq5/Screenshot-2024-07-09-153458.png',
    dataAiHint: 'web application',
    liveLink: 'https://amithviswas.github.io/Music-Player-with-Slider/',
    repoLink: '#',
    tags: ['JavaScript', 'HTML', 'CSS', 'UI Component']
  },
  {
    title: 'Dark Run Game',
    description: 'An engaging scroll-based game named Dark Run, built with web technologies.',
    image: 'https://i.ibb.co/cNNvz48/Screenshot-2024-07-09-154834.png',
    dataAiHint: 'game interface',
    liveLink: 'https://amithviswas.github.io/Scroll-Game-Dark-Run/',
    repoLink: '#',
    tags: ['JavaScript', 'HTML5 Game', 'Canvas']
  },
  {
    title: 'Old Car Game',
    description: 'A retro-style car game developed using web technologies.',
    image: 'https://i.ibb.co/6XYKhGP/Screenshot-2024-07-09-105411.png',
    dataAiHint: 'game interface',
    liveLink: 'https://amithviswas.github.io/Old-Car-Game/',
    repoLink: '#',
    tags: ['JavaScript', 'HTML5 Game', 'Retro']
  }
];

const cardVariants = {
  initial: { opacity: 0, y: 50, rotateX: -20, scale: 0.9 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  }),
  exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  hover: { 
    y: -10, 
    rotateY: 2, 
    boxShadow: "0px 10px 30px -5px hsl(var(--primary)/0.4), 0px 5px 15px -5px hsl(var(--bmw-m-blue)/0.3)",
    transition: { type: "spring", stiffness: 200, damping: 15 }
  }
};

const launchButtonVariants = {
  initial: { y: "100%", opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20, duration: 0.2 } },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.15 } }
};


export default function ProjectsSection() {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <Section id="projects" className="bg-background">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-primary-foreground"
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

      {!showProjects && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={() => setShowProjects(true)}
            className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-lg hover:shadow-[0_0_20px_hsl(var(--primary)/0.7)] transition-all duration-300 transform hover:scale-105"
            aria-expanded={showProjects}
          >
            View My Projects <Eye className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-125" />
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {showProjects && (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12 perspective"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="relative bg-card border border-border/30 rounded-lg overflow-hidden shadow-xl group transform-style-3d"
                custom={index}
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-4 overflow-hidden"
                    variants={{ hover: {}}} // parent variant for stagger
                  >
                    <motion.div variants={launchButtonVariants} initial="initial" className="flex justify-end space-x-2">
                      {project.repoLink && project.repoLink !== '#' && (
                        <Button asChild variant="secondary" size="sm" className="bg-muted/70 hover:bg-muted text-foreground backdrop-blur-sm">
                          <Link href={project.repoLink} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} repository`}>
                            <Github size={16} className="mr-1.5" /> Repo
                          </Link>
                        </Button>
                      )}
                       {project.liveLink && project.liveLink !== '#' && (
                        <Button asChild variant="default" size="sm" className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm">
                          <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
                            <ExternalLink size={16} className="mr-1.5" /> Launch
                          </Link>
                        </Button>
                       )}
                    </motion.div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full group-hover:bg-accent/30 transition-colors duration-300">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

// Add this to your globals.css or a style tag if needed for perspective
// .perspective { perspective: 1000px; }
// .transform-style-3d { transform-style: preserve-3d; }
// This is better placed in globals.css
