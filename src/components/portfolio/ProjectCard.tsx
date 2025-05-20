
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types';
import { Eye, Github, Zap } from 'lucide-react'; // Added Zap for LAUNCH button
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <Card className={cn(
      "flex flex-col h-full overflow-hidden shadow-xl hover:shadow-primary/40 card-m-glow", // M-Glow
      "transition-all duration-300 ease-in-out transform hover:scale-[1.03]", // Slightly more pop
      "border border-border/50 hover:border-primary group bg-card rounded-lg" 
    )}>
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full overflow-hidden rounded-t-lg">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 ease-in-out group-hover:scale-105"
            data-ai-hint={project.dataAiHint || "project image"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
           {/* Optional: Add a subtle overlay like brushed aluminum or glassmorphism hint later */}
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
          onClick={() => onViewDetails(project)} 
          variant="outline" // Changed for contrast with LAUNCH
          className="w-full sm:w-auto hover:bg-accent hover:text-accent-foreground hover:border-accent button-m-glow"
        >
          <Eye className="mr-2 h-4 w-4" /> View Specs
        </Button>
        {project.projectUrl && project.projectUrl !== '#' && ( // Changed from repoUrl to projectUrl for LAUNCH
          <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground button-m-glow">
            <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
              <Zap className="mr-2 h-4 w-4 group-hover:animate-ping" /> LAUNCH {/* M-red LAUNCH button */}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
