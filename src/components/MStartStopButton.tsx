
"use client";

import * as React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// M Start/Stop Button Style - Now accepts children for content
const MStartStopButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { children: React.ReactNode }
>(({ children, className, asChild, ...props }, ref) => {
  const buttonBaseClasses = "group relative inline-flex items-center justify-center text-lg font-bold uppercase tracking-wider text-primary-foreground rounded-full shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.8)] transition-all duration-300 ease-in-out overflow-hidden focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background";
  
  // Specific Start/Stop styling
  const startStopClasses = `${buttonBaseClasses} w-24 h-24 md:w-28 md:h-28 bg-card border-4 border-primary hover:border-blood-red`;

  const contentWrapper = (content: React.ReactNode) => (
    <>
      {/* Inner metallic sheen/glow (simplified) */}
      <span className="absolute inset-0.5 rounded-full bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
      {/* Red ring that pulses */}
      <span className="absolute inset-0 rounded-full border-2 border-primary opacity-70 group-hover:animate-pulse"></span>
      <span className="relative z-10 flex flex-col items-center text-center">
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
        className={cn(startStopClasses, className)}
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
      className={cn(startStopClasses, className)}
      {...props}
    >
      {contentWrapper(children)}
    </Button>
  );
});
MStartStopButton.displayName = "MStartStopButton";

export { MStartStopButton };
