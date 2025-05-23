
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import Link from 'next/link';
import { TrendingUp, Briefcase, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper for animated counters (simplified)
const AnimatedCounter = ({ value, label, icon }: { value: string | number, label: string, icon: React.ReactNode }) => {
  return (
    <motion.div 
      className="flex flex-col items-center p-4 bg-card/70 rounded-lg border border-border/40 backdrop-blur-sm shadow-md card-m-glow"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-accent mb-2">{icon}</div>
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider font-monospace-subheader">{label}</div>
    </motion.div>
  );
};

export default function AboutMeSection() {
  return (
    <Section id="about" className="bg-background/80 backdrop-blur-md">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-heading text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Performance <span className="text-primary">Specs</span>
        </motion.h2>
        <motion.div 
          className="w-48 h-1 bg-gradient-to-r from-bmw-m-blue via-primary-foreground to-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Column 1: Profile Image */}
        <motion.div 
          className="md:col-span-5 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={cn(
            "relative group hero-medallion-empire w-64 h-64 md:w-72 md:h-72",
            "p-1" 
          )}>
            <div className="spec-highlight-arc" /> 
            <Image
              src="https://i.ibb.co/PGgTrngH/d2d27295-61a5-43fa-bd33-5f44c25e813a.png"
              alt="Amith Viswas Reddy"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="professional portrait"
              priority 
              sizes="(max-width: 768px) 16rem, 18rem"
            />
          </div>
        </motion.div>
        
        {/* Column 2: Bio */}
        <motion.div 
          className="md:col-span-7 p-6 md:p-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-xl carbon-texture-panel card-m-glow"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 font-heading">D. AMITH VISWAS REDDY</h3>
          <p className="text-lg text-foreground/90 leading-relaxed mb-6">
            A dynamic AI/ML Engineer and Data Scientist, architecting intelligent solutions that drive innovation and real-world impact. My expertise lies in leveraging cutting-edge AI to transform data into actionable insights and build <strong className="text-primary/90">high-octane, high-performance</strong> systems.
          </p>
          <p className="text-lg text-foreground/90 leading-relaxed mb-8">
            With a robust foundation in Computer Science from Lovely Professional University, my technical arsenal is built for versatility and power. I specialize in AI model training, sophisticated prompt engineering, and developing <strong className="text-primary/90">precision-engineered, scalable, data-driven applications.</strong> My technical vision is to push the boundaries of AI to create intuitive, efficient, and impactful technologies.
          </p>
          <p className="text-md text-muted-foreground">
            Explore my <Link href="/#projects" passHref><span className="text-primary hover:text-accent transition-colors duration-300 underline underline-offset-4 cursor-pointer font-semibold">Track History</span></Link> or download my full <Link href="/#resume" passHref><span className="text-primary hover:text-accent transition-colors duration-300 underline underline-offset-4 cursor-pointer font-semibold">Spec Sheet</span></Link>.
          </p>
        </motion.div>
      </div>

      {/* "Digital Gauge" counters */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.4 } }
        }}
      >
        <AnimatedCounter value="3+" label="Years Experience" icon={<Briefcase size={36} className="text-accent group-hover:text-primary transition-colors" />} />
        <AnimatedCounter value="10+" label="Projects Launched" icon={<TrendingUp size={36} className="text-accent group-hover:text-primary transition-colors"/>} />
        <AnimatedCounter value="5+" label="Key Certifications" icon={<Award size={36} className="text-accent group-hover:text-primary transition-colors"/>} />
      </motion.div>
    </Section>
  );
}
