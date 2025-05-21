
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntroContext } from '@/contexts/IntroContext';

// GlitchText sub-component
const GlitchText = ({ text, resolved, className }: { text: string, resolved: boolean, className?: string }) => {
  const [displayText, setDisplayText] = useState(resolved ? text : text.replace(/./g, '\u00A0'));
  const [isMounted, setIsMounted] = useState(false);
  const chars = "!<>-_\\/[]{}—=+*^?#_M5";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      // Ensure server and initial client render are consistent before effects
      setDisplayText(resolved ? text : text.replace(/./g, '\u00A0'));
      return;
    }

    if (resolved) {
      setDisplayText(text);
      return;
    }

    let animationFrameId: number;
    const updateText = () => {
      setDisplayText(
        text
          .split('')
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join('')
      );
      animationFrameId = requestAnimationFrame(updateText);
    };

    if (isMounted) {
      updateText();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [resolved, text, isMounted, chars]);

  if (!isMounted && !resolved) {
    return <span className={`font-heading tracking-wider ${className}`}>{text.replace(/./g, '\u00A0')}</span>;
  }
  if (!isMounted && resolved) {
    return <span className={`font-heading tracking-wider ${className}`}>{text}</span>;
  }

  return (
    <span className={`font-heading tracking-wider ${className}`}>
      {displayText}
    </span>
  );
};


export default function IntroAnimation() {
  const { setIntroCompleted } = useIntroContext();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Adjusted timings for ~2.8 second animation
    timers.push(setTimeout(() => setStep(1), 100)); // Start glitch
    timers.push(setTimeout(() => setStep(2), 1500));  // Resolve name
    timers.push(setTimeout(() => setStep(3), 1800)); // Final visual pulse
    timers.push(setTimeout(() => setStep(4), 2400)); // Fade out intro screen
    timers.push(setTimeout(() => setIntroCompleted(true), 2800)); // Intro complete

    return () => timers.forEach(clearTimeout);
  }, [setIntroCompleted]);

  const nameResolved = step >= 2;

  return (
    <AnimatePresence>
      {step < 4 && (
        <motion.div
          key="intro-screen"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden" // Black background
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }} // Adjusted fade out duration
        >
          {/* Background Image */}
          <motion.img
            src="https://i.ibb.co/DHPKdq3n/generated-image-1.png"
            alt="Aggressive BMW M5 backdrop"
            className="absolute inset-0 w-full h-full object-cover z-[-2]" // Ensure it's behind text and overlay
            initial={{ scale: 1.05 }}
            animate={{ scale: 1, transition: { duration: 2.8, ease: "easeInOut" } }} // Match duration
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 w-full h-full bg-black opacity-40 z-[-1]"></div>

          {/* Subtle headlight beam hint */}
           <motion.div
            className="absolute top-1/2 left-0 w-1/2 h-64 bg-gradient-to-r from-white/5 to-transparent opacity-50 blur-3xl transform -translate-y-1/2"
            initial={{ x: "-100%" }}
            animate={{ x: "50%", transition: {delay: 1.2, duration: 0.5, ease: "circOut"} }} // Adjusted delay and duration
            exit={{ x: "-100%"}}
          ></motion.div>
          <motion.div
            className="absolute top-1/2 right-0 w-1/2 h-64 bg-gradient-to-l from-white/5 to-transparent opacity-50 blur-3xl transform -translate-y-1/2"
            initial={{ x: "100%" }}
            animate={{ x: "-50%", transition: {delay: 1.2, duration: 0.5, ease: "circOut"} }} // Adjusted delay and duration
            exit={{ x: "100%"}}
          ></motion.div>

          <motion.div
            className="relative flex flex-col items-center justify-center"
            animate={ step === 2 ? { scale: [1, 1.02, 1], transition: { duration: 0.3 } } : {} } // Subtle "thump"
          >
            <div className="mb-8">
               {/* Placeholder for tachometer */}
            </div>

            <motion.div
              className="text-center text-primary-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <GlitchText text="AMITH VISWAS REDDY" resolved={nameResolved} className="text-4xl md:text-5xl lg:text-6xl block" />
              <GlitchText text="AI/MACHINE LEARNING ENGINEER" resolved={nameResolved} className="text-xl md:text-2xl lg:text-3xl text-primary mt-2 block" />
            </motion.div>

            {/* Screen flash / pulse */}
            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  key="final-pulse"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    boxShadow: [
                      "0 0 0px 0px hsl(var(--primary)/0)",
                      "0 0 100px 50px hsl(var(--primary)/0.4), 0 0 40px 20px hsl(var(--primary-foreground)/0.2)", 
                      "0 0 0px 0px hsl(var(--primary)/0)"
                    ],
                    transition: { duration: 0.4, times: [0, 0.5, 1] } 
                  }}
                  exit={{opacity: 0}}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
