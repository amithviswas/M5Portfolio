
"use client";
import * as React from 'react'; 
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button'; 
import Section from '@/components/Section';
import { DownloadCloud, ArrowRight } from 'lucide-react';

const resumeImageUrl = "https://i.ibb.co/3Yv1RD0B/Screenshot-2025-04-21-224721.png";
const resumeDownloadUrl = "https://pdfhost.io/v/QegTWTDJ58_General_CV_Template";

const MStartButton = ({ children, asChild, ...props }: ButtonProps & { children: React.ReactNode }) => {
  const buttonClasses = "group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold uppercase tracking-wider text-primary-foreground bg-primary rounded-lg shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:bg-primary/90 hover:shadow-[0_0_25px_hsl(var(--primary)/0.8)] transition-all duration-300 ease-in-out overflow-hidden focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background";

  if (asChild) {
    const childElement = React.Children.only(children) as React.ReactElement;
    const enhancedChildChildren = (
      <>
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse group-hover:animate-none"></span>
        <span className="relative z-10 flex items-center">
          {childElement.props.children}
        </span>
      </>
    );

    const clonedChild = React.cloneElement(childElement, {
      ...childElement.props,
      children: enhancedChildChildren,
    });

    return (
      <Button
        size="lg"
        className={buttonClasses}
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
      className={buttonClasses}
      {...props}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse group-hover:animate-none"></span>
      <span className="relative z-10 flex items-center">
        {children}
      </span>
    </Button>
  );
};


export default function ResumePage() {
  return (
    <Section id="resume" className="min-h-screen flex flex-col items-center justify-center text-center">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-primary-foreground mb-6 md:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        My <span className="text-primary">Resume</span>
      </motion.h1>
      <motion.div 
        className="w-24 h-1 bg-primary mx-auto mb-10 md:mb-12 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      />

      <motion.div 
        className="w-full max-w-3xl mb-10 md:mb-12 rounded-lg overflow-hidden shadow-2xl border-2 border-primary/50 hover:border-primary transition-all duration-300"
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
          className="bg-card"
          data-ai-hint="resume document"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <MStartButton asChild>
          <Link href={resumeDownloadUrl} target="_blank" rel="noopener noreferrer">
            <DownloadCloud size={24} className="mr-3 group-hover:animate-bounce" />
            Download PDF
            <ArrowRight size={20} className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
          </Link>
        </MStartButton>
      </motion.div>
      <p className="mt-8 text-sm text-muted-foreground">
        Click the button above to download the full version of my resume.
      </p>
    </Section>
  );
}
