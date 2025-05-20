
"use client";

import { motion } from 'framer-motion';
import Section from './Section';
import { Briefcase, GraduationCap, AwardIcon } from 'lucide-react'; // Using a generic AwardIcon
import { useUserInteraction } from '@/contexts/UserInteractionContext';
import soundService from '@/services/soundService';

const timelineData = [
  { year: '2020', title: 'Started B.Tech CSE', description: 'Lovely Professional University', icon: <GraduationCap /> , type: 'education'},
  { year: '2022', title: 'Full Stack Python Cert.', description: 'CipherSchools', icon: <AwardIcon />, type: 'certification' },
  { year: '2023', title: 'NPTEL Software Testing', description: 'IIT Kharagpur', icon: <AwardIcon />, type: 'certification' },
  { year: '2023', title: 'Event Manager - UNYC', description: 'Managed Vitharkh, Samvaad etc.', icon: <Briefcase />, type: 'experience' },
  { year: '2024', title: 'Internship @ Academor', description: 'Data-driven web projects', icon: <Briefcase />, type: 'experience' },
  { year: '2024', title: 'Outstanding Performer', description: 'Academor - 40% client boost', icon: <AwardIcon />, type: 'award' },
  { year: 'Ongoing', title: 'CareerCompass AI Mentor', description: 'Personal Project', icon: <Briefcase />, type: 'project' },
];

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i:number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

export default function NeuralDriftTimeline() {
  const { interactionData } = useUserInteraction();
  const { isSoundEnabled } = interactionData;

  const handleViewportEnter = () => {
    if (isSoundEnabled) {
      soundService.playSound('timelineRumble');
    }
  };

  return (
    <Section id="timeline" className="bg-background/50 backdrop-blur-sm">
      <motion.div 
        onViewportEnter={handleViewportEnter} 
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-heading text-primary-foreground"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Neural Drift <span className="text-primary">Timeline</span>
          </motion.h2>
          <motion.div 
            className="w-48 h-1 bg-primary mx-auto mt-4 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          />
        </div>

        <div className="relative overflow-x-auto pb-8 no-scrollbar neural-drift-timeline">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-border/30 -translate-y-1/2"></div>
          <div className="flex space-x-8 md:space-x-16 min-w-max px-4">
            {timelineData.map((item, index) => (
              <motion.div 
                key={item.year + item.title} 
                className="relative flex flex-col items-center pt-8 group timeline-milestone"
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={itemVariants}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background shadow-md z-10 group-hover:scale-125 transition-transform"></div>
                <div className="bg-card p-4 rounded-lg shadow-xl border border-border/50 w-64 text-center min-h-[150px] flex flex-col justify-between timeline-milestone-content hover:shadow-primary/30">
                  <div>
                    <div className="text-accent text-2xl mb-2 group-hover:text-primary transition-colors">{item.icon}</div>
                    <h3 className="font-semibold text-primary-foreground text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <p className="text-xs text-primary font-rajdhani uppercase tracking-wider mt-3 pt-3 border-t border-border/20">{item.year}</p>
                </div>
                {/* Simple highlight for "current" year example */}
                {item.year === 'Ongoing' && (
                  <div className="absolute inset-0 rounded-lg border-2 border-primary/70 animate-pulse timeline-milestone-highlight pointer-events-none"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
