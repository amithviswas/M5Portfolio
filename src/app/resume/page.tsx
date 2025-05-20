
"use client";
import * as React from 'react'; 
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button'; 
import Section from '@/components/Section';
import { DownloadCloud, Power } from 'lucide-react'; // Changed to Power for Start/Stop button

const resumeImageUrl = "https://i.ibb.co/3Yv1RD0B/Screenshot-2025-04-21-224721.png";
const resumeDownloadUrl = "https://pdfhost.io/v/QegTWTDJ58_General_CV_Template";

// M5 Start/Stop Button Style
const MStartStopButton = ({ children, asChild, ...props }: ButtonProps & { children: React.ReactNode }) => {
  const buttonBaseClasses = "group relative inline-flex items-center justify-center text-lg font-bold uppercase tracking-wider text-primary-foreground rounded-full shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.8)] transition-all duration-300 ease-in-out overflow-hidden focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background";
  
  // Specific Start/Stop styling
  const startStopClasses = `${buttonBaseClasses} w-24 h-24 md:w-28 md:h-28 bg-card border-4 border-primary hover:border-blood-red`; // Metallic look with red ring

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
    // Assuming children of Link is text or simple elements
    const enhancedChildChildren = contentWrapper(childElement.props.children);
    const clonedChild = React.cloneElement(childElement, {
      ...childElement.props,
      children: enhancedChildChildren,
      className: `${childElement.props.className || ''} flex flex-col items-center justify-center` // Ensure Link content is centered
    });

    return (
      <Button
        size="lg" // Size prop won't directly control w/h here due to custom classes
        className={startStopClasses}
        asChild
        {...props}
      >
        {clonedChild}
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className={startStopClasses}
      {...props}
    >
      {contentWrapper(children)}
    </Button>
  );
};


export default function ResumePage() {
  return (
    <Section id="resume" className="min-h-screen flex flex-col items-center justify-center text-center">
      <motion.h1 
        className="text-4xl md:text-5xl font-heading text-primary-foreground mb-6 md:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Spec <span className="text-primary">Sheet</span> {/* Updated Title */}
      </motion.h1>
      <motion.div 
        className="w-28 h-1 bg-primary mx-auto mb-10 md:mb-12 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      />

      <motion.div 
        className="w-full max-w-3xl mb-10 md:mb-12 rounded-lg overflow-hidden shadow-2xl border-2 border-primary/50 hover:border-primary transition-all duration-300 bg-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <Image
          src={resumeImageUrl}
          alt="Amith Viswas Reddy Resume Preview"
          width={1200}
          height={1697} 
          layout="responsive"
          objectFit="contain"
          className="bg-card" // Keep card background for image frame
          data-ai-hint="resume document"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <MStartStopButton asChild>
          <Link href={resumeDownloadUrl} target="_blank" rel="noopener noreferrer">
            <Power size={32} className="mb-1 text-primary group-hover:text-blood-red" /> {/* Start/Stop Icon */}
            <span className="text-xs">Download</span>
            <span className="text-xs">PDF</span>
          </Link>
        </MStartStopButton>
      </motion.div>
      <p className="mt-8 text-sm text-muted-foreground">
        Download the full specification sheet (resume).
      </p>
    </Section>
  );
}
