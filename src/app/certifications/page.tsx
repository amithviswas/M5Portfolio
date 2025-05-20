
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Award, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: 'NPTEL Certification in Software Testing',
    issuer: 'NPTEL (IIT Kharagpur)',
    image: 'https://i.ibb.co/G4SbmYpd/6fec1819-e21f-4618-a38f-9d58ffa341cc.png',
    dataAiHint: 'certificate document',
    description: 'Completed a comprehensive course and examination on software testing methodologies and practices, covering various testing levels, techniques, black-box and white-box testing, test case design, and automated test tools.',
  },
  {
    title: 'Internship at Academor',
    issuer: 'Academor',
    image: 'https://i.ibb.co/NgzyW2JK/76090043-7164-48a1-a9ca-121350494613.png',
    dataAiHint: 'internship award',
    description: 'Successfully completed an internship program focusing on data-driven projects and real-world web development, gaining hands-on experience in data analysis, problem-solving, front-end technologies, and teamwork in an agile environment.',
  },
  {
    title: 'Full Stack Development using Python and Django',
    issuer: 'CipherSchools',
    image: 'https://i.ibb.co/fVs8kXZs/Screenshot-2025-04-21-192249.png',
    dataAiHint: 'web development certificate',
    description: 'Mastered full-stack web development principles using Python and Django framework, including front-end and back-end technologies, and integrating databases effectively.',
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 50, filter: "blur(5px)" },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.6, 0.01, 0.0, 0.95], // Corrected
    },
  }),
  hover: {
    scale: 1.03,
    boxShadow: "0px 8px 25px -5px hsl(var(--primary)/0.5), 0px 5px 15px -8px hsl(var(--bmw-m-blue)/0.3)",
    transition: { type: "spring", stiffness: 250, damping: 15 }
  }
};

export default function CertificationsPage() {
  return (
    <Section id="certifications" className="min-h-screen">
      <div className="text-center mb-12 md:mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          My <span className="text-primary">Certifications</span>
        </motion.h1>
        <motion.div 
          className="w-36 h-1 bg-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-10">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            custom={index}
            variants={cardVariants}
            initial="initial"
            animate="animate" 
            whileHover="hover"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg overflow-hidden h-full flex flex-col md:flex-row group">
                <div className="w-full md:w-1/3 h-60 md:h-auto relative overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                    data-ai-hint={cert.dataAiHint}
                  />
                   <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card/70 via-card/10 to-transparent"></div>
                </div>
                <CardContent className="p-6 md:p-8 w-full md:w-2/3 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2 group-hover:text-primary transition-colors duration-300">{cert.title}</h3>
                  <p className="text-sm text-accent font-medium mb-3 uppercase tracking-wider">{cert.issuer}</p>
                  <p className="text-muted-foreground leading-relaxed">{cert.description}</p>
                  <CheckCircle className="mt-4 h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-start md:self-end" />
                </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
