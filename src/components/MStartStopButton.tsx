
"use client";

import * as React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const MStartStopButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { children: React.ReactNode }
>(({ children, className, asChild, ...props }, ref) => {
  
  const obsidianClasses = cn(
    "group relative inline-flex items-center justify-center text-lg font-bold uppercase tracking-wider",
    "text-primary-foreground rounded-md",
    "w-28 h-16 md:w-32 md:h-20", 
    "bg-gradient-to-b from-neutral-800 to-black", 
    "border-2 border-neutral-700",
    "focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
    "transition-m-throttle overflow-hidden",
    // Aggressive default shadow
    "shadow-[0_0_35px_2px_hsl(var(--primary)/0.65),_0_0_22px_1px_hsl(var(--bmw-m-blue)/0.55),inset_1px_1px_5px_hsl(0_0%_100%/0.35),inset_-2px_-2px_7px_hsl(0_0%_0%/0.9)]",
    // Aggressive hover shadow
    "hover:shadow-[0_0_50px_5px_hsl(var(--primary)/1),_0_0_35px_3px_hsl(var(--bmw-m-blue)/0.75),inset_1px_1px_4px_hsl(0_0%_100%/0.3),inset_-1px_-1px_6px_hsl(0_0%_0%/0.8)]",
    "before:content-[''] before:absolute before:inset-[-2px] before:rounded-[calc(var(--radius)-2px)] before:opacity-0 before:transition-opacity before:duration-300", 
    "before:bg-transparent", 
    // The ::before element gets the MStartStopButton-hover-ring styles on hover (from globals.css)
    "hover:before:opacity-100 MStartStopButton-base-style", 
    className
  );

  const contentWrapper = (content: React.ReactNode) => (
    <>
      <span className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' 
            }}>
      </span>
      <span className={cn(
        "relative z-10 flex flex-col items-center text-center",
        "group-hover:[&>span]:opacity-70 group-hover:[&>svg]:opacity-70", 
        "transition-opacity duration-300"
        )}>
        {content}
      </span>
      <span className={cn(
        "absolute z-0 flex flex-col items-center text-center opacity-0 group-hover:opacity-20",
        "transform scale-y-[-1] translate-y-[calc(100%+4px)] blur-[1px]", 
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
      <motion.button
        className={cn(obsidianClasses, "p-0 m-0 w-full h-full !bg-transparent !border-none !shadow-none !ring-0")}
        ref={ref}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96, filter: 'brightness(0.9)' }}
        {...(props as any)} 
      >
        <Button asChild className="w-full h-full !bg-transparent !border-none !shadow-none !ring-0 p-0">
            {clonedChild}
        </Button>
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={ref}
      className={obsidianClasses}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96, filter: 'brightness(0.9)' }}
      {...(props as any)} 
    >
      {contentWrapper(children)}
    </motion.button>
  );
});

MStartStopButton.displayName = "MStartStopButton";

export { MStartStopButton };
