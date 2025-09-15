
"use client";
import * as React from 'react'; 
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Power } from 'lucide-react';
import { MStartStopButton } from '@/components/MStartStopButton';

const resumeImageUrl = "https://i.ibb.co/kg7LrMfW/SPECmain-page-0001.jpg";
const resumeDownloadUrl = "https://drive.google.com/file/d/1KGfnTG-dXnwmolefmNbpA7a5DrxeI0Le/view?usp=drive_link";

export default function ResumeSection() {
  return (
    <Section id="resume" className="min-h-screen flex flex-col items-center justify-center text-center">
      <motion.h1 
        className="text-4xl md:text-5xl font-heading text-primary-foreground mb-6 md:mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Spec <span className="text-primary">Sheet</span>
      </motion.h1>
      <motion.div 
        className="w-48 h-1 bg-gradient-to-r from-bmw-m-blue via-primary-foreground to-primary mx-auto mb-10 md:mb-12 rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      />

      <motion.div 
        className="w-full max-w-3xl mb-10 md:mb-12 rounded-lg overflow-hidden shadow-2xl border-2 border-primary/50 hover:border-primary transition-all duration-300 bg-card"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <Image
          src={resumeImageUrl}
          alt="Amith Viswas Reddy Resume Preview"
          width={1200}
          height={1697} 
          style={{ objectFit: "contain", layout:"responsive" }}
          className="bg-card"
          data-ai-hint="resume document"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <MStartStopButton asChild>
          <Link href={resumeDownloadUrl} target="_blank" rel="noopener noreferrer">
            <Power size={32} className="mb-1 text-primary group-hover:text-blood-red transition-colors" />
            <span className="block">Download</span>
            <span className="block">PDF</span>
          </Link>
        </MStartStopButton>
      </motion.div>
      <p className="mt-8 text-sm text-muted-foreground">
        Download the full specification sheet (resume).
      </p>
    </Section>
  );
}
