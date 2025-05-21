
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { TrendingUp, Briefcase, Award } from 'lucide-react';

// Helper for animated counters (simplified)
const AnimatedCounter = ({ value, label, icon }: { value: string | number, label: string, icon: React.ReactNode }) => {
  // Full counter animation deferred, showing static value for now
  return (
    <div className="flex flex-col items-center p-4 bg-card/50 rounded-lg border border-border/30 backdrop-blur-sm">
      <div className="text-accent mb-2">{icon}</div>
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default function AboutMeSection() {
  return (
    <Section id="about" className="bg-background/70 backdrop-blur-md">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-heading text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Performance <span className="text-primary">Specs</span>
        </motion.h2>
        <motion.div 
          className="w-48 h-1 bg-gradient-to-r from-bmw-m-blue via-primary-foreground to-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Column 1: Profile Image */}
        <motion.div 
          className="md:col-span-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden p-1 bg-gradient-to-br from-primary via-accent to-bmw-m-blue shadow-xl card-m-glow">
            <div className="absolute inset-0 rounded-full border-4 border-card opacity-50"></div>
            <Image
              src="https://i.ibb.co/PGgTrngH/d2d27295-61a5-43fa-bd33-5f44c25e813a.png"
              alt="Amith Viswas Reddy"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full transition-transform duration-500 hover:scale-105"
              data-ai-hint="professional portrait"
              priority 
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </motion.div>
        
        {/* Column 2: Bio */}
        <motion.div 
          className="md:col-span-2 p-6 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-bold text-primary-foreground mb-4 font-heading">D. Amith Viswas Reddy</h3>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            A dynamic AI/ML Engineer and Data Scientist, architecting intelligent solutions that drive innovation and real-world impact. My expertise lies in leveraging cutting-edge AI to transform data into actionable insights and build high-performance systems.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-3">
            With a robust foundation in Computer Science from Lovely Professional University, my technical arsenal is built for versatility and power. I specialize in AI model training, sophisticated prompt engineering, and developing scalable, data-driven applications. My technical vision is to push the boundaries of AI to create intuitive, efficient, and impactful technologies.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-8">
            Explore my <Link href="/#projects" passHref><span className="text-primary hover:text-accent transition-colors duration-300 underline underline-offset-4 cursor-pointer">Track History</span></Link> or download my full <Link href="/resume" passHref><span className="text-primary hover:text-accent transition-colors duration-300 underline underline-offset-4 cursor-pointer">Spec Sheet</span></Link>.
          </p>
        </motion.div>
      </div>

      {/* "Digital Gauge" counters - simplified */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 md:mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.4 } }}
        viewport={{ once: true }}
      >
        <AnimatedCounter value="3+" label="Years Experience" icon={<Briefcase size={32} />} />
        <AnimatedCounter value="10+" label="Projects Completed" icon={<TrendingUp size={32} />} />
        <AnimatedCounter value="5+" label="Certifications" icon={<Award size={32} />} />
      </motion.div>
    </Section>
  );
}
