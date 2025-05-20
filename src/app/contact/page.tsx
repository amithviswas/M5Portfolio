
"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Github, Linkedin, Instagram, Mail, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const socialLinks = [
  {
    name: 'GitHub',
    icon: <Github size={28} />,
    href: 'https://github.com/amithviswas',
    ariaLabel: "Amith Viswas Reddy's GitHub Profile",
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin size={28} />,
    href: 'https://www.linkedin.com/in/amith-viswas-reddy/',
    ariaLabel: "Amith Viswas Reddy's LinkedIn Profile",
  },
  {
    name: 'Instagram',
    icon: <Instagram size={28} />,
    href: 'https://instagram.com/amithviswas_reddy',
    ariaLabel: "Amith Viswas Reddy's Instagram Profile",
  },
];

const iconVariants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -3,
    scale: 1.08,
    filter: 'drop-shadow(0 0 8px hsl(var(--primary)/0.6))',
    transition: { type: 'spring', stiffness: 280, damping: 12 }
  },
};

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form data submitted:', formData);
    toast({
      title: "Message Sent!",
      description: `Thank you, ${formData.name}. Your message has been received.`,
      variant: "default", // or "success" if you add such a variant
    });
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <Section id="contact-page" className="min-h-screen">
      <div className="text-center mb-12 md:mb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-heading text-primary-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Connect <span className="text-primary">With Me</span>
        </motion.h1>
        <motion.div
          className="w-48 h-1 bg-primary mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Contact Information */}
        <motion.div
          className="space-y-8 bg-card/50 p-6 md:p-8 rounded-lg shadow-xl card-m-glow"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div>
            <h3 className="text-2xl font-semibold text-primary-foreground mb-4 font-heading">Contact Details</h3>
            <div className="space-y-4">
              <a href="mailto:amithviswas0909@gmail.com" className="flex items-center text-muted-foreground hover:text-primary transition-colors group">
                <Mail className="h-6 w-6 mr-3 text-accent group-hover:scale-110 transition-transform" />
                <span>amithviswas0909@gmail.com</span>
              </a>
              <a href="tel:+919143336888" className="flex items-center text-muted-foreground hover:text-primary transition-colors group">
                <Phone className="h-6 w-6 mr-3 text-accent group-hover:scale-110 transition-transform" />
                <span>+91 9143336888</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary-foreground mt-8 mb-4 font-heading">Find Me Online</h3>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}>
                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-card/70 hover:bg-primary/10 border border-border/30 hover:border-primary text-primary-foreground/80 hover:text-primary transition-all duration-300 ease-in-out card-m-glow">
                      {link.icon}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-card/50 p-6 md:p-8 rounded-lg shadow-xl card-m-glow"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-2xl font-semibold text-primary-foreground mb-6 font-heading">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 bg-background/70 border-border/50 focus:border-primary"
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 bg-background/70 border-border/50 focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-muted-foreground">Your Message</Label>
              <Textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-2 bg-background/70 border-border/50 focus:border-primary"
                placeholder="Let's talk about..."
              />
            </div>
            <div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-primary-foreground button-m-glow" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
