
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Users, Zap, BarChart, Award } from 'lucide-react'; 
// import { useUserInteraction } from '@/contexts/UserInteractionContext'; // Removed
// import soundService from '@/services/soundService'; // Removed
import { cn } from '@/lib/utils';

const achievements = [
  {
    title: 'Event Manager at UNYC Events',
    organization: 'Vitharkh, Samvaad, Vachan, Clash of Words',
    icon: <Users size={32} className="text-primary" />, // Adjusted icon size
    description: "Successfully managed and coordinated multiple large-scale events (Vitharkh, Samvaad, Vachan, Clash of Words), each with 150-200 participants. Responsibilities included planning, execution, and post-event analysis, ensuring smooth operations and high attendee satisfaction.",
    impactLabel: "Participants per Event Series",
    impactValue: "150-200+",
    impactIcon: <Users size={20} className="text-accent" />, // Adjusted icon size
    imageUrl: 'https://i.ibb.co/s9K5d6j7/875a3943-9026-4af9-ab9d-514f7c2ed301.png',
    id: 'achieve-unyc', 
  },
  {
    title: 'Outstanding Performance Award',
    organization: 'Academor',
    icon: <Zap size={32} className="text-primary" />, // Adjusted icon size
    description: "Recognized for exceptional performance and leadership in data-driven projects. Spearheaded initiatives that directly contributed to a significant boost in client satisfaction metrics through innovative data analysis and solution implementation using ML.",
    impactLabel: "Client Satisfaction Boost",
    impactValue: "40%",
    impactIcon: <BarChart size={20} className="text-accent" />, // Adjusted icon size
    imageUrl: 'https://i.ibb.co/btytXQf/Screenshot-2025-04-22-102101.png',
    id: 'achieve-academor', 
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
   hover: { // "Drive-Mode Engage" style handled by .card-m-glow:hover
    // y: -8,  // Handled by .card-m-glow:hover
    // scale: 1.03, // If needed for specific Framer Motion override
    // boxShadow: "0px 10px 25px -5px hsl(var(--primary)/0.6), 0px 6px 15px -8px hsl(var(--bmw-m-blue)/0.4)", 
    transition: { type: "spring", stiffness: 280, damping: 12 } // Snappy spring
  }
};

export default function AchievementsPage() {
  // const { interactionData } = useUserInteraction(); // Removed

  // const handleMilestoneView = (milestoneId: string) => { // Removed
  //   if (interactionData?.isSoundEnabled && soundService) {
  //     soundService.playSound('milestoneReveal');
  //   }
  // };

  return (
    <Section id="achievements" className="min-h-screen">
      <div className="text-center mb-12 md:mb-16">
        <motion.h1 
          className="text-3xl md:text-4xl font-heading text-primary-foreground" // Adjusted size
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Lap <span className="text-primary">Records</span>
        </motion.h1>
        <motion.div 
          className="w-32 h-0.5 bg-primary mx-auto mt-3 rounded-full" // Thinner underline
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="relative pl-6 md:pl-0 before:absolute before:top-0 before:left-6 md:before:left-1/2 before:w-0.5 before:h-full before:bg-border/40 before:-translate-x-1/2"> {/* Thinner timeline line */}
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className="mb-10 md:mb-12 flex md:[&:nth-child(odd)]:flex-row-reverse" // Adjusted margin
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }} // Adjusted slide distance
            whileInView={{ opacity: 1, x: 0 }}
            // onViewportEnter={() => handleMilestoneView(achievement.id)} // Removed
            viewport={{ once: true, amount: 0.2 }} // Adjusted amount
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="hidden md:flex w-1/2"></div> 
            <div className="relative md:w-1/2">
              <div className="absolute -left-[29.5px] md:left-auto md:-right-[6.5px] md:group-[&:nth-child(odd)]:-left-[6.5px] top-0 w-3.5 h-3.5 rounded-full bg-primary border-2 border-background shadow-md"> {/* Smaller dot */}
                <div className="absolute inset-0.5 bg-primary/40 rounded-full animate-pulse"></div> {/* Subtler pulse */}
              </div>
               <Card className={cn(
                "carbon-texture-panel card-m-glow card-with-glowing-seal", // Apply CSL styles
                "overflow-hidden group flex flex-col w-full transition-m-throttle" 
              )}> 
                <div className="relative w-full aspect-video overflow-hidden"> 
                  <Image
                    src={achievement.imageUrl}
                    alt={achievement.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                  />
                </div>
                <CardHeader className="flex flex-row items-start gap-3 p-4 md:p-5"> {/* Adjusted padding/gap */}
                  <div className="p-2.5 bg-primary/15 rounded-sm shadow-inner"> {/* Adjusted padding */}
                    {achievement.icon}
                  </div>
                  <div className="card-text-skew transition-transform duration-100 ease-m-throttle"> {/* Text skew on hover */}
                    <CardTitle className="text-lg md:text-xl text-primary-foreground group-hover:text-primary transition-colors font-heading">{achievement.title}</CardTitle> {/* Adjusted size */}
                    <CardDescription className="text-accent font-semibold mt-0.5 uppercase tracking-wider text-[11px] md:text-xs">{achievement.organization}</CardDescription> {/* Adjusted size */}
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-5 pt-0 flex-grow flex flex-col card-text-skew transition-transform duration-100 ease-m-throttle"> {/* Text skew on hover */}
                  <p className="text-muted-foreground leading-relaxed mb-3 text-xs md:text-sm flex-grow">{achievement.description}</p> 
                  <div className="mt-auto border-t border-border/30 pt-2.5 bg-card/40 p-2.5 rounded-sm shadow-sm"> {/* Adjusted padding */}
                    <h4 className="font-semibold text-primary-foreground/80 mb-0.5 text-[11px] uppercase tracking-wider">{achievement.impactLabel}:</h4> {/* Adjusted size */}
                    <div className="flex items-center">
                      {achievement.impactIcon}
                      <p className="text-primary text-lg font-bold ml-1.5">{achievement.impactValue}</p> {/* Adjusted size */}
                    </div>
                  </div>
                  <Award className="mt-3 h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:rotate-[15deg] group-hover:scale-125 ml-auto self-end" /> {/* Adjusted size */}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
