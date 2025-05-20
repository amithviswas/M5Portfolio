
"use client";

import * as React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MStartStopButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { children: React.ReactNode }
>(({ children, className, asChild, ...props }, ref) => {
  
  // Obsidian Crown Mode Styling
  const obsidianClasses = cn(
    "group relative inline-flex items-center justify-center text-lg font-bold uppercase tracking-wider",
    "text-primary-foreground rounded-md shadow-lg", // Inset-rounded rectangle (adjust border-radius if more hexagonal)
    "w-28 h-16 md:w-32 md:h-20", // Adjusted size for a more rectangular feel
    "bg-gradient-to-b from-neutral-800 to-black", // Obsidian glass base
    "border-2 border-neutral-700",
    "focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
    "transition-all duration-300 ease-in-out overflow-hidden",
    // Metallic chamfer and obsidian depth
    "shadow-[0_0_15px_hsl(var(--primary)/0.3),inset_1px_1px_2px_hsl(0_0%_100%/0.1),inset_-1px_-1px_2px_hsl(0_0%_0%/0.5)]",
    "hover:shadow-[0_0_25px_hsl(var(--primary)/0.6),inset_1px_1px_2px_hsl(0_0%_100%/0.1),inset_-1px_-1px_2px_hsl(0_0%_0%/0.5)]",
    // For triple glow ring container and reflection
    "before:content-[''] before:absolute before:inset-[-2px] before:rounded-[calc(var(--radius)-2px)] before:opacity-0 before:transition-opacity before:duration-300",
    "before:bg-transparent", // Placeholder, actual glow by box-shadow
    "hover:before:opacity-100",
    // Triple glow rings on hover (applied to ::before for layering)
    "hover:before:shadow-[0_0_0_2px_hsl(var(--background)),_0_0_0_4px_hsl(var(--m-red-hsl)),_0_0_0_6px_hsl(var(--bmw-m-blue)/0.7),_0_0_15px_hsl(var(--m-red-hsl)/0.5)]",
    className
  );

  const contentWrapper = (content: React.ReactNode) => (
    <>
      {/* Glass reflection overlay */}
      <span className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' // Top half reflection
            }}>
      </span>
      <span className={cn(
        "relative z-10 flex flex-col items-center text-center",
        "group-hover:[&>span]:opacity-70 group-hover:[&>svg]:opacity-70", // Dim original content for reflection
        "transition-opacity duration-300"
        )}>
        {content}
      </span>
      {/* Text reflection on hover */}
      <span className={cn(
        "absolute z-0 flex flex-col items-center text-center opacity-0 group-hover:opacity-20",
        "transform scale-y-[-1] translate-y-[calc(100%+4px)] blur-[1px]", // Positioned below, flipped, blurred
        "transition-opacity duration-300"
      )}>
        {content}
      </span>
    </>
  );

  if (asChild) {
    const childElement = React.Children.only(children) as React.ReactElement;
    const clonedChild = React.cloneElement(childElement, {
      className: cn(childElement.props.className, "flex flex-col items-center justify-center"),
      children: contentWrapper(childElement.props.children),
    });
    return (
      <Button
        ref={ref}
        className={obsidianClasses}
        asChild
        {...props}
      >
        {clonedChild}
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      className={obsidianClasses}
      {...props}
    >
      {contentWrapper(children)}
    </Button>
  );
});
MStartStopButton.displayName = "MStartStopButton";

export { MStartStopButton };
