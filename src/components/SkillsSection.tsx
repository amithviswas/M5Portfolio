
"use client";
import { motion, useReducedMotion } from 'framer-motion';
import {
  Brain, Database, BarChart3, Code2, Bot, Palette, Terminal, Server, Zap, Gauge, Activity,
  Languages, Cloud, Webhook
} from 'lucide-react';
import Section from '@/components/Section'; 
import { cn } from '@/lib/utils';
// import { useUserInteraction } from '@/contexts/UserInteractionContext'; // Re-added
// import soundService from '@/services/soundService'; // Re-added

const skills = [
  { name: 'AI Model Training', icon: <Zap size={28} />, modeName: 'Turbo Boost', id: 'skill-ai-training' }, // Icon size adjusted
  { name: 'Prompt Engineering', icon: <Bot size={28} />, modeName: 'Drive Logic', id: 'skill-prompt-eng' },
  { name: 'Data Visualization', icon: <Palette size={28} />, modeName: 'Heads-Up Display', id: 'skill-data-viz' },
  { name: 'Machine Learning', icon: <Brain size={28} />, modeName: 'Intelligent Traction', id: 'skill-ml' },
  { name: 'Python Programming', icon: <Code2 size={28} />, modeName: 'Core Engine (Python)', id: 'skill-python' },
  { name: 'Data Analysis', icon: <BarChart3 size={28} />, modeName: 'Performance Analytics', id: 'skill-data-analysis' },
  { name: 'Web Development', icon: <Activity size={28} />, modeName: 'Chassis & Aero (Web)', id: 'skill-web-dev' },
  { name: 'SQL & Databases', icon: <Database size={28} />, modeName: 'Fuel System (Data)', id: 'skill-sql' },
  { name: 'Unix/Linux', icon: <Terminal size={28} />, modeName: 'ECU (Unix/Linux)', id: 'skill-linux' },
  { name: 'Statistical Modeling', icon: <Gauge size={28} />, modeName: 'Precision Tuning', id: 'skill-stat-model' },
  { name: 'AI Chatbot Dev', icon: <Bot size={28} />, modeName: 'Co-Pilot AI', id: 'skill-chatbot' },
  { name: 'Big Data (Hadoop, Spark)', icon: <Server size={28} />, modeName: 'Powertrain (Big Data)', id: 'skill-big-data' },
  { name: 'R Programming', icon: <Code2 size={28} />, modeName: 'Auxiliary Engine (R)', id: 'skill-r-prog' },
  { name: 'Natural Language Processing', icon: <Languages size={28} />, modeName: 'Linguistic Dynamics', id: 'skill-nlp' },
  { name: 'Cloud Platforms', icon: <Cloud size={28} />, modeName: 'SkyNet Computing', id: 'skill-cloud' },
  { name: 'API Development', icon: <Webhook size={28} />, modeName: 'Interface Protocol', id: 'skill-api-dev' },
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
          Engine <span className="text-primary">Modes</span>
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
                  className="text-sm font-semibold text-muted-foreground"
                  variants={textVariants}
                >
                  {skill.modeName}
                </motion.h3>
                <motion.p
                  className="text-xs text-muted-foreground/60 mt-0.5"
                  variants={{ hover: { opacity: 1} }} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1, transition: {delay: index * 0.05 + 0.3} }} 
                  whileHover={{opacity: 1}} 
                >
                  ({skill.name})
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
