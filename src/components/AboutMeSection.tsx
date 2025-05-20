
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function AboutMeSection() {
  return (
    <Section id="about" className="bg-background">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          About <span className="text-primary">Me</span>
        </motion.h2>
        <motion.div 
          className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden">
        <CardContent className="p-0 md:p-0">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="w-full md:w-1/3 h-80 md:h-auto relative group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src="https://i.ibb.co/PGgTrngH/d2d27295-61a5-43fa-bd33-5f44c25e813a.png"
                alt="Amith Viswas Reddy"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="professional portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card/80 via-card/20 to-transparent"></div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-2/3 p-6 md:p-10 lg:p-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-3xl font-bold text-primary-foreground mb-4">D. Amith Viswas Reddy</h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                A passionate Data Scientist & Robotics Developer with a deep-rooted enthusiasm for Artificial Intelligence and Machine Learning. My journey in tech is fueled by a relentless curiosity and a desire to leverage data for solving complex, real-world problems and innovating automation.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                Currently pursuing B.Tech in Computer Science at Lovely Professional University, I'm honing skills in Python, Java, JavaScript, HTML, CSS, and Unix/Linux. I thrive in dynamic environments where I can apply my analytical skills and innovative thinking to uncover insights and drive impactful solutions. From developing predictive models to crafting intelligent systems and web applications, I'm always eager to explore new frontiers.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                I believe in continuous learning and collaboration to make a tangible difference. You can explore my skills and projects further on this site or check out my <Link href="/resume" passHref><span className="text-primary hover:underline relative group cursor-pointer">Resume<span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></span></Link>.
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
