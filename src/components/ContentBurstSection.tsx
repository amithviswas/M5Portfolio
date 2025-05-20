
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card'; // Corrected import
import { ArrowRight } from 'lucide-react';
import Section from './Section';

const cardInfo = [
  { title: 'About Me', href: '/#about', description: 'Discover the engineer.' },
  { title: 'My Projects', href: '/#projects', description: 'Explore the portfolio.' },
  { title: 'Contact', href: '/contact', description: 'Connect with the command center.' },
];

const cardVariants = {
  initial: { opacity: 0, y: 50, rotateX: -10, rotateY: 15 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    transition: {
      delay: i * 0.2 + 0.5, // Stagger after section comes in
      duration: 0.7,
      ease: [0.36,1.08,0.33,1],
    },
  }),
  hover: {
    translateY: -8, // Increased from -6px
    boxShadow: "0px 10px 20px hsla(var(--primary)/0.3), 0px 0px 30px hsla(var(--bmw-m-blue)/0.2)",
    transition: { duration: 0.2, ease: [0.36,1.08,0.33,1] }
  }
};

const lightSweepVariants = {
  hidden: { x: "-100%" },
  visible: { 
    x: "100%",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }
  },
};

export default function ContentBurstSection() {
  const { scrollYProgress } = useScroll();
  // For parallax: map scrollYProgress (0 to 1) to a translateY range
  // This parallax is for the spotlight image background
  const spotlightY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"]); // Image moves up as user scrolls down


  return (
    <Section id="content-burst" className="relative min-h-screen !py-0 !px-0 overflow-hidden flex flex-col" noPadding fullHeight={false}>
      {/* Featured Project Spotlight - Full Width Parallax Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full -z-10"
        style={{ y: spotlightY }}
      >
        <Image
          src="https://i.ibb.co/JWt10kzX/6555d160-0091-4b3b-841b-b85e201088c0.png"
          alt="Featured Project: CareerCompass AI Mentor"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={90}
          priority // Or loading="lazy" if it's truly below fold for LCP
          className="opacity-30 md:opacity-50" // Softer background
          data-ai-hint="AI career mentor application"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div> {/* Vignette */}
      </motion.div>
      
      {/* White caption bar for spotlight */}
      <div className="absolute bottom-8 left-8 bg-primary-foreground text-background px-4 py-2 rounded-md shadow-lg z-10">
        <p className="font-semibold text-sm md:text-base">Featured: CareerCompass AI Mentor</p>
      </div>

      {/* Tilted Cards Block - Centered Content */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8 relative z-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-5xl">
          {cardInfo.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              className="transform-style-3d perspective group" // Added group for light sweep targeting
            >
              <Link href={card.href} passHref legacyBehavior>
                <a className="block carbon-card-burst relative overflow-hidden">
                  <CardContent className="p-6 md:p-8 h-full flex flex-col justify-between items-start">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-heading text-primary-foreground mb-2">{card.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base">{card.description}</p>
                    </div>
                    <ArrowRight className="mt-4 h-6 w-6 text-accent group-hover:text-primary transition-colors" />
                  </CardContent>
                  {/* Section-teaser light sweep */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full light-sweep-overlay"
                    variants={lightSweepVariants}
                    initial="hidden"
                    whileInView="visible" // Animate when card is in view
                    viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of card is visible
                  />
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
