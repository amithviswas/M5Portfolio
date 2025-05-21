
"use client";
import { motion, useReducedMotion } from 'framer-motion';
import {
  Brain, Database, BarChart3, Code2, Bot, Palette, Terminal, Server, Zap, Gauge, Activity,
  Languages, Cloud, Webhook
} from 'lucide-react';
import Section from '@/components/Section'; 
import { cn } from '@/lib/utils';
// import { useUserInteraction } from '@/contexts/UserInteractionContext'; // Removed as context was cleared
// import soundService from '@/services/soundService'; // Removed

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
  // const { interactionData, incrementSkillHover } = useUserInteraction(); // Removed

  // const handleSkillHover = (skillName: string) => { // Removed
  //   if (incrementSkillHover) incrementSkillHover(skillName);
  //   if (interactionData?.isSoundEnabled && soundService) {
  //     soundService.playSound('hoverChime');
  //   }
  // };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 }, // Slightly adjusted initial state
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1, 
      transition: {
        delay: i * 0.05, // Faster stagger
        duration: prefersReducedMotion ? 0.3 : 0.25, 
        ease: prefersReducedMotion ? [0.42, 0, 0.58, 1] : "circOut" as any, 
      },
    }),
    hover: { // "Drive-Mode Engage" hover from CSL prompt
      scale: 1.05, 
      y: -8, 
      // Twin-shadow neon glow and text skew will be handled by .card-m-glow:hover in globals.css
      transition: { type: 'spring', stiffness: 280, damping: 12, duration: 0.1 } // Snappier spring
    }
  };

  const textVariants = { // For text skew on hover
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
    <Section id="skills" className="bg-card/20"> {/* Slightly lighter card background for skills section */}
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-heading text-primary-foreground" // Adjusted size
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Engine <span className="text-primary">Modes</span>
        </motion.h2>
        <motion.div 
          className="w-40 h-0.5 bg-gradient-to-r from-bmw-m-blue via-primary-foreground to-primary mx-auto mt-3 rounded-full" // Thinner underline
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4"> {/* Smaller gaps */}
        {skills.map((skill, index) => {
          // const hoverCount = interactionData?.skillHoverCounts?.[skill.name]?.count || 0; // Removed
          // const isSkillOverclocked = hoverCount >= 3; // Removed
          const isSkillOverclocked = false; // Placeholder, logic removed
          
          return (
            <motion.div
              key={skill.id}
              className={cn(
                "skill-card-trail-container carbon-texture-panel card-m-glow", // Apply carbon texture and glow
                "p-3 md:p-4 text-center cursor-default", // Adjusted padding
                "transition-m-throttle", // Apply throttle transition
                isSkillOverclocked && "skill-overclocked animate-skill-jitter", // Apply overclocked and jitter
                "hover:animate-skill-jitter" 
              )}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              // onHoverStart={() => handleSkillHover(skill.name)} // Removed
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className={cn(
                "skill-card-trail",
                isSkillOverclocked && "electric-trail" 
              )}/>
              <motion.div 
                className="mb-2 md:mb-3 text-primary-foreground/80 inline-block"
                variants={iconVariants}
              >
                {skill.icon}
              </motion.div>
              {/* Wrapper for text skew effect */}
              <div className="card-text-skew transition-transform duration-100 ease-m-throttle">
                <motion.h3 
                  className="text-xs md:text-sm font-semibold text-muted-foreground" // Adjusted text size
                  variants={textVariants}
                >
                  {skill.modeName}
                </motion.h3>
                <motion.p
                  className="text-[10px] md:text-xs text-muted-foreground/60 mt-0.5" // Adjusted text size and opacity
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
