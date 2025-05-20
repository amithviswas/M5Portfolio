
"use client";
import { motion, useReducedMotion } from 'framer-motion';
import {
  Brain, Database, BarChart3, Cpu, Code2, Bot, Palette, Terminal, Server, Zap, Wind, Gauge 
} from 'lucide-react';
import Section from '@/components/Section';

const skills = [
  { name: 'AI Model Training', icon: <Zap size={32} />, modeName: 'Turbo Boost' },
  { name: 'Prompt Engineering', icon: <Bot size={32} />, modeName: 'Drive Logic' },
  { name: 'Data Visualization', icon: <Palette size={32} />, modeName: 'Heads-Up Display' },
  { name: 'Machine Learning', icon: <Brain size={32} />, modeName: 'Intelligent Traction' },
  { name: 'Python Programming', icon: <Code2 size={32} />, modeName: 'Core Engine (Python)' },
  { name: 'Data Analysis', icon: <BarChart3 size={32} />, modeName: 'Performance Analytics' },
  { name: 'Web Development', icon: <Code2 size={32} />, modeName: 'Chassis & Aero (Web)' },
  { name: 'SQL & Databases', icon: <Database size={32} />, modeName: 'Fuel System (Data)' },
  { name: 'Unix/Linux', icon: <Terminal size={32} />, modeName: 'ECU (Unix/Linux)' },
  { name: 'Statistical Modeling', icon: <Gauge size={32} />, modeName: 'Precision Tuning' },
  { name: 'AI Chatbot Dev', icon: <Bot size={32} />, modeName: 'Co-Pilot AI' },
  { name: 'Big Data (Hadoop, Spark)', icon: <Server size={32} />, modeName: 'Powertrain (Big Data)' },
  { name: 'R Programming', icon: <Code2 size={32} />, modeName: 'Auxiliary Engine (R)' },
];

export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: prefersReducedMotion ? 1 : [1, 1.06, 1],
      boxShadow: prefersReducedMotion 
        ? "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" // Default shadow from Tailwind's shadow-lg
        : ["0 0 0px hsla(var(--primary)/0)", "0 0 12px hsla(var(--primary)/0.4)", "0 0 0px hsla(var(--primary)/0)"],
      transition: {
        delay: i * 0.06,
        duration: prefersReducedMotion ? 0.4 : 0.2, // Faster for blip, normal for fade-in
        ease: prefersReducedMotion ? [0.42, 0, 0.58, 1] : "easeInOut",
        times: prefersReducedMotion ? undefined : [0, 0.5, 1], // For scale and boxShadow sequence
      },
    }),
    hover: prefersReducedMotion ? { scale: 1.02 } : {
      scale: 1.05, 
      boxShadow: "0px 0px 20px 0px hsl(var(--primary)/0.6)", 
      borderColor: "hsl(var(--primary))", 
      transition: { type: 'spring', stiffness: 250, damping: 10 }
    }
  };

  const textVariants = {
    hover: {
      color: "hsl(var(--primary-foreground))",
      transition: { type: 'spring', stiffness: 300, damping: 10, duration: 0.1 }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.15,
      color: "hsl(var(--primary))", 
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <Section id="skills" className="bg-card/30">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-heading text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Engine <span className="text-primary">Modes</span>
        </motion.h2>
        <motion.div 
          className="w-36 h-1 bg-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.modeName}
            className="bg-card/70 border border-border/30 rounded-lg p-4 md:p-6 text-center cursor-default shadow-lg hover:shadow-primary/40 transition-m-blip"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="mb-3 md:mb-4 text-primary-foreground/80 inline-block"
              variants={iconVariants}
            >
              {skill.icon}
            </motion.div>
            <motion.h3 
              className="text-sm md:text-base font-semibold text-muted-foreground"
              variants={textVariants}
            >
              {skill.modeName}
            </motion.h3>
            <motion.p
              className="text-xs text-muted-foreground/70 mt-1"
              variants={{ hover: { opacity: 1} }}
              initial={{ opacity: 0 }} 
            >
              ({skill.name})
            </motion.p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
