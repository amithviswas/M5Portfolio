
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types';
import { Eye, Github, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import React, { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const rotateY = useMotionValue(0);
  const [isClicked, setIsClicked] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const cardElement = event.currentTarget;
    const rect = cardElement.getBoundingClientRect();
    const cursorX = event.clientX - rect.left;
    const normalizedX = cursorX / rect.width; 
    const newRotateY = (normalizedX - 0.5) * 6; 
    rotateY.set(newRotateY);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    rotateY.set(0);
  };

  const handleClickEffect = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    
    // Ripple effect
    const button = e.currentTarget as HTMLElement;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple-span"); // For specific ripple styling if needed beyond .click-ripple-effect

    // Check if a ripple already exists and remove it
    const existingRipple = button.querySelector(".ripple-span");
    if (existingRipple) {
      existingRipple.remove();
    }
    button.appendChild(ripple);
    
    // Click blur effect
    setIsClicked(true);
    setTimeout(() => {
        setIsClicked(false);
        ripple.remove(); // Clean up ripple after animation
    }, 600); // Match ripple animation duration
  };


  return (
    <motion.div
      style={{ rotateY: prefersReducedMotion ? 0 : rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        isClicked && !prefersReducedMotion && "filter blur-[1px] brightness-90", 
        "transition-m-throttle h-full card-with-glowing-seal" // Add glowing seal class
      )} 
      whileHover={{ y: -8, scale: 1.03 }} 
    >
      <Card className={cn(
        "flex flex-col h-full overflow-hidden card-m-glow carbon-texture-panel", 
        "group transition-m-throttle" // Removed hover:border-primary, border is on carbon-texture-panel
      )}>
        <CardHeader className="p-0">
          <div className="aspect-video relative w-full overflow-hidden rounded-t-sm"> {/* Sharper radius from global */}
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint={project.dataAiHint || "project image"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="text-xl md:text-2xl font-bold mb-2 text-primary-foreground group-hover:text-primary transition-colors font-heading uppercase tracking-wider">{project.title}</CardTitle>
          <CardDescription className="text-muted-foreground mb-4 line-clamp-3 text-sm md:text-base">{project.description}</CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal bg-accent/20 text-accent group-hover:bg-accent/30 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Button 
            onClick={(e) => { onViewDetails(project); handleClickEffect(e); }} 
            variant="outline"
            className="w-full sm:w-auto hover:bg-accent hover:text-accent-foreground hover:border-accent transition-m-throttle click-ripple-effect neon-edge-accent"
          >
            <Eye className="mr-2 h-4 w-4" /> View Specs
          </Button>
          {project.projectUrl && project.projectUrl !== '#' && (
            <Button 
              asChild 
              className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground transition-m-throttle click-ripple-effect neon-edge-primary"
            >
              <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer" onClick={handleClickEffect}>
                <Zap className="mr-2 h-4 w-4 group-hover:animate-ping" /> LAUNCH
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
