
"use client";
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'; // Added Mail for potential email
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const socialLinks = [
  {
    name: 'GitHub',
    icon: <Github size={36} />,
    href: 'https://github.com/amithviswas',
    ariaLabel: "Amith Viswas Reddy's GitHub Profile",
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin size={36} />,
    href: 'https://www.linkedin.com/in/amith-viswas-reddy/',
    ariaLabel: "Amith Viswas Reddy's LinkedIn Profile",
  },
  {
    name: 'Instagram',
    icon: <Instagram size={36} />,
    href: 'https://instagram.com/amithviswas_reddy',
    ariaLabel: "Amith Viswas Reddy's Instagram Profile",
  },
  // Optional: Add Email
  // { 
  //   name: 'Email', 
  //   icon: <Mail size={36} />, 
  //   href: 'mailto:your.email@example.com',
  //   ariaLabel: "Email Amith Viswas Reddy" 
  // },
];

const iconVariants = {
  initial: { y: 0, scale: 1 },
  hover: { 
    y: -5, 
    scale: 1.1,
    filter: 'drop-shadow(0 0 10px hsl(var(--primary)/0.7))',
    transition: { type: 'spring', stiffness: 250, damping: 10 }
  },
};

export default function ContactSection() {
  return (
    <Section id="contact" className="bg-card/30">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-heading text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Connect <span className="text-primary">With Me</span>
        </motion.h2>
        <motion.div 
          className="w-48 h-1 bg-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
        <motion.p 
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </motion.p>
      </div>

      <motion.div 
        className="flex justify-center items-center space-x-6 md:space-x-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {socialLinks.map((link) => (
          <motion.div
            key={link.name}
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}>
              <Button variant="ghost" size="icon" className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-card/70 hover:bg-primary/10 border border-border/30 hover:border-primary text-primary-foreground/80 hover:text-primary transition-all duration-300 ease-in-out card-m-glow">
                {link.icon}
              </Button>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
