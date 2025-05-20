
"use client";
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Users, Zap } from 'lucide-react';

const achievements = [
  {
    title: 'Event Manager at UNYC Events',
    organization: 'Vitharkh, Samvaad, Vachan, Clash of Words',
    icon: <Users size={40} className="text-primary" />,
    description: "Successfully managed and coordinated multiple large-scale events, each with 150-200 participants. Responsibilities included planning, execution, and post-event analysis, ensuring smooth operations and high attendee satisfaction.",
    details: "Handled logistics, team coordination, and crisis management.",
    impact: "Enhanced event engagement and participation significantly."
  },
  {
    title: 'Outstanding Performance Award',
    organization: 'Academor',
    icon: <Zap size={40} className="text-primary" />,
    description: "Recognized for exceptional performance and leadership in data-driven projects. Spearheaded initiatives that directly contributed to a 40% boost in client satisfaction metrics through innovative data analysis and solution implementation.",
    details: "Led project teams, developed analytical models, presented findings to stakeholders.",
    impact: "40% increase in client satisfaction."
  },
];

const cardVariants = {
  initial: { opacity: 0, x: -50, filter: "blur(8px)" },
  animate: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: [0.6, 0.01, 0.0, 0.95], // "engineered" feel - corrected
    },
  }),
   hover: {
    transform: "translateY(-10px) rotateZ(1deg)",
    boxShadow: "0px 12px 30px -8px hsl(var(--primary)/0.6), 0px 8px 20px -10px hsl(var(--bmw-m-blue)/0.4)",
    transition: { type: "spring", stiffness: 200, damping: 12 }
  }
};

export default function AchievementsPage() {
  return (
    <Section id="achievements" className="min-h-screen">
      <div className="text-center mb-12 md:mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Key <span className="text-primary">Achievements</span>
        </motion.h1>
        <motion.div 
          className="w-40 h-1 bg-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="space-y-8 md:space-y-12">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            custom={index}
            variants={cardVariants}
            initial="initial"
            animate="animate" // Changed from whileInView to animate for page load
            whileHover="hover"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden group">
              <CardHeader className="flex flex-row items-start gap-4 p-6 md:p-8">
                <div className="p-3 bg-primary/10 rounded-md">
                  {achievement.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-primary-foreground group-hover:text-primary transition-colors duration-300">{achievement.title}</CardTitle>
                  <CardDescription className="text-accent font-medium mt-1 uppercase tracking-wide">{achievement.organization}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0">
                <p className="text-muted-foreground leading-relaxed mb-4 text-lg">{achievement.description}</p>
                <div className="mt-4 border-t border-border/30 pt-4">
                  <h4 className="font-semibold text-primary-foreground/90 mb-1">Impact:</h4>
                  <p className="text-primary text-lg font-medium">{achievement.impact}</p>
                </div>
                <Trophy className="mt-6 h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:rotate-[360deg] group-hover:scale-125 ml-auto" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
