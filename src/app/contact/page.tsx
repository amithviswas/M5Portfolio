
"use client";

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Github, Linkedin, Instagram, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

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

const interactiveElementHoverClass = "hover:translate-y-[-1px] hover:shadow-[0_2px_8px_hsl(var(--primary)/0.5),_0_2px_8px_hsl(var(--bmw-m-blue)/0.5)] transition-m-blip";

export default function ContactPage() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<IFormInput>();
  const [isTextareaFocused, setIsTextareaFocused] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form data submitted:', data);
    toast({
      title: (
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Message Sent!
        </div>
      ),
      description: "Team M Pit-Wall will respond ASAP.",
      variant: "default", 
    });
    reset();
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  
  const columnVariants = {
    initialLeft: { opacity: 0, x: prefersReducedMotion ? 0 : -50 },
    initialRight: { opacity: 0, x: prefersReducedMotion ? 0 : 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  };


  return (
    <Section id="contact-page" className="min-h-screen !py-12 md:!py-16">
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <div className="text-center mb-10 md:mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-heading text-primary-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            M Pit-Lane <span className="text-primary">Command Center</span>
          </motion.h1>
          <motion.div
            className="w-64 h-1 bg-gradient-to-r from-bmw-m-blue via-primary-foreground to-primary mx-auto mt-4 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          />
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          <motion.div
            className="md:col-span-5 space-y-8 bg-card/60 p-6 md:p-8 rounded-lg shadow-xl card-m-glow backdrop-blur-sm border border-border/30"
            variants={columnVariants}
            initial="initialLeft"
            animate="animate"
          >
            <div>
              <h3 className="text-2xl font-heading text-primary-foreground mb-6">Telemetry</h3>
              <div className="space-y-5">
                <a href="tel:+919143336888" className={cn("flex items-center group", interactiveElementHoverClass)}>
                  <Phone className="h-7 w-7 mr-4 text-accent group-hover:text-primary transition-colors" />
                  <span className="text-lg font-bold text-primary-foreground group-hover:text-primary transition-colors tracking-wider">+91 9143336888</span>
                </a>
                <a href="mailto:amithviswas0909@gmail.com" className={cn("flex items-center group", interactiveElementHoverClass)}>
                  <Mail className="h-7 w-7 mr-4 text-accent group-hover:text-primary transition-colors" />
                  <span className="text-lg font-bold text-primary-foreground group-hover:text-primary transition-colors tracking-wider">amithviswas0909@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-xs uppercase text-muted-foreground mb-2 tracking-widest">Signal Strength</h4>
              <div className="space-y-1.5 group">
                <div className="h-1.5 w-10 bg-bmw-m-blue rounded-full transition-all duration-200 group-hover:shadow-[0_0_10px_hsl(var(--bmw-m-blue))] group-hover:scale-x-110"></div>
                <div className="h-1.5 w-10 bg-primary rounded-full transition-all duration-200 group-hover:shadow-[0_0_10px_hsl(var(--primary))] group-hover:scale-x-110 delay-75"></div>
                <div className="h-1.5 w-10 bg-primary-foreground/70 rounded-full transition-all duration-200 group-hover:shadow-[0_0_10px_hsl(var(--primary-foreground))] group-hover:scale-x-110 delay-150"></div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-heading text-primary-foreground mt-10 mb-6">Connect Channels</h3>
              <div className="flex flex-col space-y-4">
                {socialLinks.map((link) => (
                  <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}
                    className={cn(
                      "group w-full p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700",
                      "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bmw-m-blue focus-visible:ring-offset-background",
                      "hover:shadow-[0_0_12px_hsl(var(--bmw-m-blue)/0.6),_0_0_12px_hsl(var(--primary)/0.6)] hover:translate-y-[-1px]",
                      "transition-m-blip" 
                    )}
                  >
                    <div className="flex items-center justify-center text-primary-foreground group-hover:text-primary transition-colors">
                      {React.cloneElement(link.icon, { size: 24 })}
                      <span className="ml-3 font-semibold tracking-wider">{link.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className={cn(
                "md:col-span-7 bg-gradient-to-b from-neutral-800/70 to-neutral-900/70 p-6 md:p-8 rounded-lg shadow-xl card-m-glow backdrop-blur-sm border border-border/30",
                "form-container-halo", // Base halo class
                isTextareaFocused && !prefersReducedMotion && "form-container-halo-active" // Active halo class
            )}
            variants={columnVariants}
            initial="initialRight"
            animate="animate"
          >
            <div className="h-0.5 w-full bg-gradient-to-r from-bmw-m-blue to-primary mb-6 rounded-full"></div>
            <h3 className="text-3xl font-heading text-primary-foreground mb-8">Send a Pit-Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-muted-foreground font-semibold tracking-wider">Your Name</Label>
                <Input
                  type="text"
                  id="name"
                  className={cn("mt-2 bg-background/70 border-border/50 focus:border-primary focus:ring-primary placeholder:text-muted-foreground/70 transition-m-blip", errors.name && "border-destructive focus:border-destructive ring-destructive")}
                  placeholder="e.g. Lewis Hamilton"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-muted-foreground font-semibold tracking-wider">Your Email</Label>
                <Input
                  type="email"
                  id="email"
                  className={cn("mt-2 bg-background/70 border-border/50 focus:border-primary focus:ring-primary placeholder:text-muted-foreground/70 transition-m-blip", errors.email && "border-destructive focus:border-destructive ring-destructive")}
                  placeholder="lewis@mercedesamgf1.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-muted-foreground font-semibold tracking-wider">Your Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  className={cn("mt-2 bg-background/70 border-border/50 focus:border-primary focus:ring-primary placeholder:text-muted-foreground/70 transition-m-blip", errors.message && "border-destructive focus:border-destructive ring-destructive")}
                  placeholder="Race strategy, feedback, or just to say hi..."
                  {...register("message", { required: "Message is required" })}
                  onFocus={() => setIsTextareaFocused(true)}
                  onBlur={() => setIsTextareaFocused(false)}
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
              </div>
              <div className="pt-2 flex justify-center">
                <Button 
                  type="submit" 
                  className={cn(
                    "w-32 h-32 rounded-full bg-primary hover:bg-primary/80 text-primary-foreground text-xl font-bold uppercase tracking-wider shadow-lg hover:shadow-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
                    interactiveElementHoverClass, "transition-m-blip"
                  )} 
                  disabled={isSubmitting}
                  aria-label="Send Message"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-8 w-8 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "SEND"
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
