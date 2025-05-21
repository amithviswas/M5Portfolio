
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Users, Zap, BarChart, Award } from 'lucide-react'; // Added Award
import { cn } from '@/lib/utils';
import { useUserInteraction } from '@/contexts/UserInteractionContext'; // Added
import soundService from '@/services/soundService'; // Added

const achievements = [
  {
    title: 'Event Manager at UNYC Events',
    organization: 'Vitharkh, Samvaad, Vachan, Clash of Words',
    icon: <Users size={40} className="text-primary" />,
    description: "Successfully managed and coordinated multiple large-scale events (Vitharkh, Samvaad, Vachan, Clash of Words), each with 150-200 participants. Responsibilities included planning, execution, and post-event analysis, ensuring smooth operations and high attendee satisfaction.",
    impactLabel: "Participants per Event Series",
    impactValue: "150-200+",
    impactIcon: <Users size={24} className="text-accent" />,
    imageUrl: 'https://i.ibb.co/s9K5d6j7/875a3943-9026-4af9-ab9d-514f7c2ed301.png',
    id: 'achieve-unyc', // Added id for key
  },
  {
    title: 'Outstanding Performance Award',
    organization: 'Academor',
    icon: <Zap size={40} className="text-primary" />,
    description: "Recognized for exceptional performance and leadership in data-driven projects. Spearheaded initiatives that directly contributed to a significant boost in client satisfaction metrics through innovative data analysis and solution implementation using ML.",
    impactLabel: "Client Satisfaction Boost",
    impactValue: "40%",
    impactIcon: <BarChart size={24} className="text-accent" />,
    imageUrl: 'https://i.ibb.co/btytXQf/Screenshot-2025-04-22-102101.png',
    id: 'achieve-academor', // Added id for key
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 50, filter: "blur(8px)" },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.6, 0.01, 0.0, 0.95], 
    },
  }),
   hover: {
    opacity: 1, 
    y: -6, 
    scale: 1.02, 
    boxShadow: "0px 10px 25px -5px hsl(var(--primary)/0.6), 0px 6px 15px -8px hsl(var(--bmw-m-blue)/0.4)", 
    transition: { type: "spring", stiffness: 220, damping: 14 }
  }
};

export default function AchievementsPage() {
  const { interactionData } = useUserInteraction(); // Added for sound check

  const handleMilestoneView = (milestoneId: string) => {
    if (interactionData.isSoundEnabled && soundService) {
      soundService.playSound('milestoneReveal');
    }
  };

  return (
    <Section id="achievements" className="min-h-screen">
      <div className="text-center mb-12 md:mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-heading text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Lap <span className="text-primary">Records</span>
        </motion.h1>
        <motion.div 
          className="w-32 h-1 bg-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="relative pl-6 md:pl-0 before:absolute before:top-0 before:left-6 md:before:left-1/2 before:w-1 before:h-full before:bg-border/50 before:-translate-x-1/2">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className="mb-12 md:mb-16 flex md:[&:nth-child(odd)]:flex-row-reverse"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            onViewportEnter={() => handleMilestoneView(achievement.id)}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="hidden md:flex w-1/2"></div> {/* Spacer for alternating layout */}
            <div className="relative md:w-1/2">
              <div className="absolute -left-[30.5px] md:left-auto md:-right-[7.5px] md:group-[&:nth-child(odd)]:-left-[7.5px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-md">
                <div className="absolute inset-0.5 bg-primary/50 rounded-full animate-pulse"></div>
              </div>
               <Card className={cn(
                "bg-card/80 backdrop-blur-sm border-border/50 shadow-xl card-m-glow overflow-hidden group flex flex-col w-full rounded-sm carbon-texture-panel card-with-glowing-seal", // Added carbon-texture and seal
                "transition-m-throttle" // Ensure transition class is on the card
              )}> 
                <div className="relative w-full aspect-video overflow-hidden rounded-t-sm"> 
                  <Image
                    src={achievement.imageUrl}
                    alt={achievement.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                  />
                </div>
                <CardHeader className="flex flex-row items-start gap-4 p-4 md:p-6"> {/* Reduced padding */}
                  <div className="p-3 bg-primary/20 rounded-sm shadow-inner">
                    {achievement.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl text-primary-foreground group-hover:text-primary transition-colors font-heading">{achievement.title}</CardTitle>
                    <CardDescription className="text-accent font-semibold mt-1 uppercase tracking-wider text-xs">{achievement.organization}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 flex-grow flex flex-col">
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm flex-grow">{achievement.description}</p> {/* Reduced text size and margin */}
                  <div className="mt-auto border-t border-border/30 pt-3 bg-card/50 p-3 rounded-sm shadow-sm"> {/* Reduced padding */}
                    <h4 className="font-semibold text-primary-foreground/90 mb-1 text-xs uppercase tracking-wider">{achievement.impactLabel}:</h4>
                    <div className="flex items-center">
                      {achievement.impactIcon}
                      <p className="text-primary text-xl font-bold ml-2">{achievement.impactValue}</p> {/* Reduced text size */}
                    </div>
                  </div>
                  <Award className="mt-4 h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:rotate-[15deg] group-hover:scale-125 ml-auto self-end" />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
