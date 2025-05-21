
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
    
    const button = e.currentTarget as HTMLElement;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple-span"); 

    const existingRipple = button.querySelector(".ripple-span");
    if (existingRipple) {
      existingRipple.remove();
    }
    button.appendChild(ripple);
    
    setIsClicked(true);
    setTimeout(() => {
        setIsClicked(false);
        ripple.remove(); 
    }, 600); 
  };


  return (
    <motion.div
      style={{ rotateY: prefersReducedMotion ? 0 : rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        isClicked && !prefersReducedMotion && "filter blur-[1px] brightness-90", 
        "transition-m-throttle h-full card-with-glowing-seal" 
      )} 
      whileHover={{ y: -8, scale: 1.03 }} // Kept for basic lift, more complex in globals.css
    >
      <Card className={cn(
        "flex flex-col h-full overflow-hidden card-m-glow carbon-texture-panel", // Ensures CSL card styling
        "group transition-m-throttle" 
      )}>
        <CardHeader className="p-0">
          <div className="aspect-video relative w-full overflow-hidden"> {/* Adjusted to standard aspect-video */}
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
        <CardContent className="p-4 md:p-5 flex-grow card-text-skew transition-transform duration-100 ease-m-throttle"> {/* card-text-skew for hover */}
          <CardTitle className="text-lg md:text-xl font-bold mb-1.5 text-primary-foreground group-hover:text-primary transition-colors font-heading uppercase tracking-wider">{project.title}</CardTitle> {/* Adjusted size */}
          <CardDescription className="text-muted-foreground mb-3 line-clamp-3 text-xs md:text-sm">{project.description}</CardDescription> {/* Adjusted size */}
          <div className="flex flex-wrap gap-1.5 mb-3"> {/* Smaller gaps for badges */}
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] md:text-xs px-1.5 py-0.5 font-normal bg-accent/15 text-accent group-hover:bg-accent/25 transition-colors"> {/* Smaller badges */}
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 md:p-5 pt-0 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2"> {/* Adjusted padding/spacing */}
          <Button 
            onClick={(e) => { onViewDetails(project); handleClickEffect(e); }} 
            variant="outline"
            size="sm" // Smaller button
            className="w-full sm:w-auto hover:bg-accent hover:text-accent-foreground hover:border-accent transition-m-throttle click-ripple-effect neon-edge-accent"
          >
            <Eye className="mr-1.5 h-3.5 w-3.5" /> View Specs {/* Smaller Icon */}
          </Button>
          {project.projectUrl && project.projectUrl !== '#' && (
            <Button 
              asChild 
              size="sm" // Smaller button
              className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground transition-m-throttle click-ripple-effect neon-edge-primary"
            >
              <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer" onClick={handleClickEffect}>
                <Zap className="mr-1.5 h-3.5 w-3.5 group-hover:animate-ping" /> LAUNCH {/* Smaller Icon */}
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
