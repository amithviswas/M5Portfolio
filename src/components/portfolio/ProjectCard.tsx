
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types';
import { Eye, Github } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <Card className={cn(
      "flex flex-col h-full overflow-hidden shadow-lg hover:shadow-primary/30",
      "transition-all duration-300 ease-in-out transform hover:scale-[1.02]",
      "border border-border/50 hover:border-primary group bg-card" 
    )}>
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full overflow-hidden">
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
        <CardTitle className="text-xl md:text-2xl font-bold mb-2 text-primary-foreground group-hover:text-primary transition-colors font-heading">{project.title}</CardTitle>
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
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-primary/50"
        >
          <Eye className="mr-2 h-4 w-4" /> View Details
        </Button>
        {project.repoUrl && project.repoUrl !== '#' && (
          <Button variant="outline" asChild className="w-full sm:w-auto hover:border-accent hover:text-accent">
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> Source
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
