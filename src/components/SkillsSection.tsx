
"use client";
import { motion, useReducedMotion } from 'framer-motion';
import {
  Brain, Database, BarChart3, Code2, Bot, Terminal, Server, Zap, Gauge, Activity,
  Languages, Cloud, Webhook
} from 'lucide-react';
import Section from '@/components/Section'; 
import { cn } from '@/lib/utils';
// import { useUserInteraction } from '@/contexts/UserInteractionContext'; // Re-added
// import soundService from '@/services/soundService'; // Re-added

const skills = [
  { name: 'Python', icon: <Code2 size={28} />, modeName: 'Language', id: 'skill-python' },
  { name: 'TypeScript & JavaScript', icon: <Code2 size={28} />, modeName: 'Language', id: 'skill-ts' },
  { name: 'Next.js & React', icon: <Activity size={28} />, modeName: 'Frontend', id: 'skill-next' },
  { name: 'FastAPI & Django', icon: <Server size={28} />, modeName: 'Backend', id: 'skill-backend' },
  { name: 'AI Agents & LLM APIs', icon: <Brain size={28} />, modeName: 'AI', id: 'skill-agents' },
  { name: 'Prompt Engineering', icon: <Bot size={28} />, modeName: 'AI', id: 'skill-prompt-eng' },
  { name: 'UiPath RPA', icon: <Zap size={28} />, modeName: 'Automation (certified)', id: 'skill-rpa' },
  { name: 'Telegram Bots', icon: <Bot size={28} />, modeName: 'Automation', id: 'skill-bots' },
  { name: 'SQL & PostgreSQL', icon: <Database size={28} />, modeName: 'Data', id: 'skill-sql' },
  { name: 'Tableau', icon: <BarChart3 size={28} />, modeName: 'Data visualization', id: 'skill-tableau' },
  { name: 'Docker & Linux', icon: <Terminal size={28} />, modeName: 'DevOps', id: 'skill-docker' },
  { name: 'Git & GitHub Actions', icon: <Webhook size={28} />, modeName: 'DevOps', id: 'skill-git' },
  { name: 'Vercel, Netlify & Render', icon: <Cloud size={28} />, modeName: 'Deployment', id: 'skill-deploy' },
  { name: 'Salesforce', icon: <Cloud size={28} />, modeName: 'CRM (trained)', id: 'skill-sf' },
  { name: 'Software Testing', icon: <Gauge size={28} />, modeName: 'NPTEL certified', id: 'skill-testing' },
  { name: 'English, Hindi, Telugu, Japanese', icon: <Languages size={28} />, modeName: 'Languages', id: 'skill-langs' },
];

export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();
  // const { interactionData, incrementSkillHover } = useUserInteraction();
  
  // const handleSkillHover = (skillName: string) => {
  //   if (incrementSkillHover) incrementSkillHover(skillName);
  //   if (interactionData?.isSoundEnabled && soundService) {
  //     // soundService.playSound('hoverChime'); // Example
  //   }
  // };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1, 
      transition: {
        delay: i * 0.05, 
        duration: prefersReducedMotion ? 0.3 : 0.25, 
        ease: prefersReducedMotion ? [0.42, 0, 0.58, 1] as any : "circOut" as any, 
      },
    }),
    hover: {
      scale: 1.07, 
      y: -5, 
      transition: { type: 'spring', stiffness: 280, damping: 12, duration: 0.1 }
    }
  };

  const textVariants = {
    hover: {
      skewX: "1deg",
      color: "hsl(var(--primary-foreground))",
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      color: "hsl(var(--primary))", 
      transition: { duration: 0.1 }
    }
  };
  
  return (
    <Section id="skills" className="bg-card/20">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-heading text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-primary">Skills</span>
        </motion.h2>
        <motion.div 
          className="w-48 h-1 bg-gradient-to-r from-bmw-m-blue via-primary-foreground to-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
        {skills.map((skill, index) => {
          // const hoverCount = interactionData?.skillHoverCounts?.[skill.name]?.count || 0;
          // const isSkillOverclocked = hoverCount >= 3; // Example logic
          const isSkillOverclocked = false; // Placeholder
          
          return (
            <motion.div
              key={skill.id}
              className={cn(
                "skill-card-trail-container carbon-texture-panel card-m-glow", 
                "p-4 text-center cursor-default", 
                "transition-m-throttle", 
                isSkillOverclocked && "skill-overclocked animate-skill-jitter", 
                "hover:animate-skill-jitter" 
              )}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              // onHoverStart={() => handleSkillHover(skill.name)}
              viewport={{ once: false, amount: 0.1 }}
            >
              <div className={cn(
                "skill-card-trail",
                isSkillOverclocked && "electric-trail" 
              )}/>
              <motion.div 
                className="mb-3 text-primary-foreground/80 inline-block"
                variants={iconVariants}
              >
                {skill.icon}
              </motion.div>
              <div className="card-text-skew transition-transform duration-100 ease-m-throttle">
                <motion.h3 
                  className="text-sm font-semibold text-primary-foreground/90"
                  variants={textVariants}
                >
                  {skill.name}
                </motion.h3>
                <motion.p
                  className="text-xs text-muted-foreground/60 mt-0.5"
                  variants={{ hover: { opacity: 1} }} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1, transition: {delay: index * 0.05 + 0.3} }} 
                  whileHover={{opacity: 1}} 
                >
                  {skill.modeName}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
