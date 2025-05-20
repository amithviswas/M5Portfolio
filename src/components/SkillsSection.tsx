"use client";
import { motion } from 'framer-motion';
import {
  Brain, Database, BarChart3, Cog, Cpu, Code2, Bot, Palette, Terminal, Server, Group
} from 'lucide-react';
import Section from '@/components/Section';

const skills = [
  { name: 'Data Analysis', icon: <BarChart3 size={32} /> },
  { name: 'R Programming', icon: <Code2 size={32} /> },
  { name: 'Machine Learning', icon: <Brain size={32} /> },
  { name: 'AI Model Training', icon: <Cpu size={32} /> },
  { name: 'Statistical Modeling', icon: <BarChart3 size={32} /> },
  { name: 'Prompt Engineering', icon: <Bot size={32} /> },
  { name: 'Python Programming', icon: <Code2 size={32} /> },
  { name: 'Web Development', icon: <Code2 size={32} /> },
  { name: 'AI Chatbot Development', icon: <Bot size={32} /> },
  { name: 'Data Visualization', icon: <Palette size={32} /> },
  { name: 'Unix/Linux Environments', icon: <Terminal size={32} /> },
  { name: 'SQL & Database Management', icon: <Database size={32} /> },
  { name: 'Big Data Technologies (Hadoop, Spark)', icon: <Server size={32} /> },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: [0.42, 0, 0.58, 1], // "performance pop"
    },
  }),
  hover: {
    scale: 1.08,
    boxShadow: "0px 0px 25px 0px hsl(var(--primary)/0.7)",
    transition: { type: 'spring', stiffness: 300, damping: 10 }
  }
};

const textVariants = {
  hover: {
    y: -2,
    color: "hsl(var(--primary-foreground))",
    transition: { type: 'spring', stiffness: 400, damping: 10, duration: 0.1 }
  }
}

const iconVariants = {
  hover: {
    rotate: [0, -10, 10, 0],
    scale: 1.1,
    color: "hsl(var(--primary))",
    transition: { duration: 0.3 }
  }
}

export default function SkillsSection() {
  return (
    <Section id="skills" className="bg-card/30">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Core <span className="text-primary">Competencies</span>
        </motion.h2>
        <motion.div 
          className="w-32 h-1 bg-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="bg-card/70 border border-border/30 rounded-lg p-4 md:p-6 text-center cursor-default shadow-md hover:border-primary/70"
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
              {skill.name}
            </motion.h3>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
