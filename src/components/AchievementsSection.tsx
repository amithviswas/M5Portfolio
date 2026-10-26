
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Users, Zap, BarChart, Award } from 'lucide-react'; 
import { cn } from '@/lib/utils';

const achievements = [
  {
    title: 'Event Manager at UNYC Events',
    organization: 'Vitharkh, Samvaad, Vachan, Clash of Words',
    icon: <Users size={32} className="text-primary" />,
    description: "Successfully managed and coordinated multiple large-scale events (Vitharkh, Samvaad, Vachan, Clash of Words), each with 150-200 participants. Responsibilities included planning, execution, and post-event analysis, ensuring smooth operations and high attendee satisfaction.",
    impactLabel: "Participants per Event Series",
    impactValue: "150-200+",
    impactIcon: <Users size={20} className="text-accent" />,
    imageUrl: 'https://i.ibb.co/s9K5d6j7/875a3943-9026-4af9-ab9d-514f7c2ed301.png',
    id: 'achieve-unyc', 
  },
  {
    title: 'Outstanding Performance Award',
    organization: 'Academor',
    icon: <Zap size={32} className="text-primary" />,
    description: "Recognized for exceptional performance and leadership in data-driven projects. Spearheaded initiatives that directly contributed to a significant boost in client satisfaction metrics through innovative data analysis and solution implementation using ML.",
    impactLabel: "Client Satisfaction Boost",
    impactValue: "40%",
    impactIcon: <BarChart size={20} className="text-accent" />,
    imageUrl: 'https://i.ibb.co/btytXQf/Screenshot-2025-04-22-102101.png',
    id: 'achieve-academor', 
  },
];

export default function AchievementsSection() {

  return (
    <Section id="achievements">
      <div className="text-center mb-12 md:mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-heading text-primary-foreground" 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-primary">Achievements</span>
        </motion.h1>
        <motion.div 
          className="w-48 h-1 bg-gradient-to-r from-bmw-m-blue via-primary-foreground to-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10 items-stretch">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className="flex group" 
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-full flex">
               <Card className={cn(
                "carbon-texture-panel card-m-glow card-with-glowing-seal", 
                "overflow-hidden group flex flex-col w-full h-full transition-m-throttle" 
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
                <CardHeader className="flex flex-row items-start gap-3 p-4 md:p-5"> 
                  <div className="p-2.5 bg-primary/15 rounded-sm shadow-inner"> 
                    {achievement.icon}
                  </div>
                  <div className="card-text-skew transition-transform duration-100 ease-m-throttle"> 
                    <CardTitle className="text-lg md:text-xl text-primary-foreground group-hover:text-primary transition-colors font-heading">{achievement.title}</CardTitle> 
                    <CardDescription className="text-accent font-semibold mt-0.5 uppercase tracking-wider text-[11px] md:text-xs">{achievement.organization}</CardDescription> 
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-5 pt-0 flex-grow flex flex-col card-text-skew transition-transform duration-100 ease-m-throttle"> 
                  <p className="text-muted-foreground leading-relaxed mb-3 text-xs md:text-sm flex-grow">{achievement.description}</p> 
                  <div className="mt-auto border-t border-border/30 pt-2.5 bg-card/40 p-2.5 rounded-sm shadow-sm"> 
                    <h4 className="font-semibold text-primary-foreground/80 mb-0.5 text-[11px] uppercase tracking-wider">{achievement.impactLabel}:</h4> 
                    <div className="flex items-center">
                      {achievement.impactIcon}
                      <p className="text-primary text-lg font-bold ml-1.5">{achievement.impactValue}</p> 
                    </div>
                  </div>
                  <Award className="mt-3 h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:rotate-[15deg] group-hover:scale-125 ml-auto self-end" /> 
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
