
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Users, Zap, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      ease: [0.6, 0.01, 0, 0.95], 
    },
  }),
   hover: {
    opacity: 1, 
    y: -6, // Consistent lift with other cards
    scale: 1.02, 
    boxShadow: "0px 10px 25px -5px hsl(var(--primary)/0.6), 0px 6px 15px -8px hsl(var(--bmw-m-blue)/0.4)", 
    transition: { type: "spring", stiffness: 220, damping: 14 }
  }
};

export default function AchievementsPage() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            custom={index}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true, amount: 0.1 }}
            className="flex transition-m-throttle" // Added throttle transition to motion.div
          >
            <Card className={cn(
              "bg-card/80 backdrop-blur-sm border-border/50 shadow-xl card-m-glow overflow-hidden group flex flex-col w-full rounded-lg"
            )}> 
              <div className="relative w-full aspect-video overflow-hidden rounded-t-lg"> 
                <Image
                  src={achievement.imageUrl}
                  alt={achievement.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                />
              </div>
              <CardHeader className="flex flex-row items-start gap-4 p-6 md:p-8">
                <div className="p-3 bg-primary/20 rounded-md shadow-inner">
                  {achievement.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-primary-foreground group-hover:text-primary transition-colors duration-300 font-heading">{achievement.title}</CardTitle>
                  <CardDescription className="text-accent font-semibold mt-1 uppercase tracking-wider">{achievement.organization}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0 flex-grow flex flex-col">
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg flex-grow">{achievement.description}</p>
                <div className="mt-auto border-t border-border/30 pt-4 bg-card/50 p-4 rounded-md shadow-sm">
                  <h4 className="font-semibold text-primary-foreground/90 mb-2 text-sm uppercase tracking-wider">{achievement.impactLabel}:</h4>
                  <div className="flex items-center">
                    {achievement.impactIcon}
                    <p className="text-primary text-2xl font-bold ml-2">{achievement.impactValue}</p>
                  </div>
                </div>
                <Trophy className="mt-6 h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:rotate-[15deg] group-hover:scale-125 ml-auto self-end" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
