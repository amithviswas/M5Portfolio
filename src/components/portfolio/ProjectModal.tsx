
"use client";

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types';
import { ExternalLink, Github, X } from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0 bg-card border-border shadow-2xl rounded-lg overflow-hidden">
        {/* Image container with fixed height */}
        <div className="relative w-full h-48 md:h-56 flex-shrink-0 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
            data-ai-hint={project.dataAiHint || "project showcase"}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 33vw"
          />
           <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 bg-background/50 hover:bg-background/80 text-foreground rounded-full z-10"
              aria-label="Close dialog"
          >
              <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable area for project details */}
        <ScrollArea className="flex-grow min-h-0"> {/* Crucial for flex child to scroll */}
          <div className="p-6 md:p-8 space-y-6">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl md:text-3xl font-bold text-primary font-heading">{project.title}</DialogTitle>
            </DialogHeader>
            
            <DialogDescription className="text-base md:text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {project.longDescription}
            </DialogDescription>

            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary-foreground font-heading">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm px-3 py-1 bg-accent/20 text-accent">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary-foreground font-heading">Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm px-3 py-1 border-primary/50 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Footer with action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 md:p-8 border-t border-border/50 bg-card/50 rounded-b-lg flex-shrink-0">
          {project.projectUrl && project.projectUrl !== '#' && (
            <Button asChild size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-primary/50 transition-m-throttle">
              <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" /> Visit Project
              </Link>
            </Button>
          )}
          {project.repoUrl && project.repoUrl !== '#' && (
            <Button variant="outline" asChild size="lg" className="flex-1 hover:border-accent hover:text-accent transition-m-throttle">
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> View Source
              </Link>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
