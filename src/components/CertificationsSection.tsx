
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function CertificationsSection() {
  return (
    <Section id="certifications" className="min-h-screen">
      <div className="text-center mb-12 md:mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-heading text-primary-foreground" 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Racing <span className="text-primary">Credentials</span> 
        </motion.h1>
        <motion.div 
          className="w-48 h-1 bg-gradient-to-r from-bmw-m-blue via-primary-foreground to-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="space-y-6 md:space-y-8"> 
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            custom={index}
            initial="initial"
            whileInView="animate" 
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              initial: { opacity: 0, x: -40, filter: "blur(4px)" },
              animate: {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                transition: {
                  delay: index * 0.1,
                  duration: 0.6, 
                  ease: [0.6, 0.01, 0.0, 0.95] as any, 
                },
              },
            }}
            className="transition-m-throttle" 
          >
            <Card className={cn(
              "carbon-texture-panel card-m-glow card-with-glowing-seal", 
              "h-full flex flex-col md:flex-row group overflow-hidden"
            )}> 
                <div className="w-full md:w-2/5 h-52 md:h-auto relative overflow-hidden p-1.5 bg-black/35 rounded-l-sm md:rounded-r-none md:rounded-l-lg">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    style={{ objectFit: "contain" }} 
                    className="transition-transform duration-500 ease-in-out group-hover:scale-105 rounded-sm"
                    data-ai-hint={cert.dataAiHint}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <CardContent className="p-5 md:p-6 w-full md:w-3/5 flex flex-col justify-center card-text-skew transition-transform duration-100 ease-m-throttle"> 
                  <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-1.5 group-hover:text-primary transition-colors duration-300 font-heading">{cert.title}</h3> 
                  <p className="text-xs text-accent font-medium mb-2.5 uppercase tracking-wider">{cert.issuer}</p> 
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{cert.description}</p> 
                  <Award className="mt-3 h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-start md:self-end" /> 
                </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
