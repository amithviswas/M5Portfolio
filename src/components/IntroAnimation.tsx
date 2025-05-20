
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntroContext } from '@/contexts/IntroContext';

// Simplified tachometer-like icon, focusing on a sweeping line
const RevNeedle = ({ sweepAngle }: { sweepAngle: number }) => (
  <div className="relative w-48 h-24 md:w-64 md:h-32">
    <div className="absolute bottom-0 left-1/2 w-2 h-full bg-transparent transform -translate-x-1/2">
      {/* Needle pivot point */}
      <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-[-6px] z-10 shadow-md"></div>
      {/* Needle */}
      <motion.div 
        className="absolute bottom-0 left-1/2 w-1 h-1/2 bg-primary-foreground rounded-t-full"
        style={{ transformOrigin: '50% 100%', rotate: -90 }} // Start at -90 deg (left)
        animate={{ rotate: sweepAngle }}
        transition={{ type: 'spring', stiffness: 80, damping: 12, duration: 1.5 }}
      />
    </div>
    {/* Simplified arc */}
    <div className="absolute inset-x-0 bottom-0 h-1/2 border-2 border-muted-foreground/50 rounded-t-full border-b-0"></div>
    <div className="absolute inset-x-[20%] bottom-0 h-1/2 border-2 border-primary rounded-t-full border-b-0 
                  clip-path-polygon-[0%_0%,_100%_0%,_100%_100%,_80%_100%,_80%_20%,_20%_20%,_20%_100%,_0%_100%]"
                  style={{ clipPath: 'path("M 40 100 A 60 60 0 0 1 160 100 L 160 80 A 40 40 0 0 0 40 80 Z")' }} // Example path
    ></div>

  </div>
);


const GlitchText = ({ text, resolved, className }: { text: string, resolved: boolean, className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "!<>-_\\/[]{}—=+*^?#_M5"; // Added M5 for flavor

  useEffect(() => {
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
    updateText();
    return () => cancelAnimationFrame(animationFrameId);
  }, [resolved, text]);

  return (
    <span className={`font-heading tracking-wider ${className}`}>
      {displayText}
    </span>
  );
};

export default function IntroAnimation() {
  const { setIntroCompleted } = useIntroContext();
  const [step, setStep] = useState(0); 
  const [needleAngle, setNeedleAngle] = useState(-90); // Start angle for needle

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    timers.push(setTimeout(() => setStep(1), 100)); // Start glitch
    timers.push(setTimeout(() => setNeedleAngle(45), 300)); // Sweep needle to +45 deg (total 135 deg sweep)
    timers.push(setTimeout(() => setStep(2), 1800)); // Resolve name
    timers.push(setTimeout(() => setStep(3), 2000)); // Final visual pulse (e.g. screen flash)
    timers.push(setTimeout(() => setStep(4), 2800)); // Fade out intro screen
    timers.push(setTimeout(() => setIntroCompleted(true), 3300));

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
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Subtle headlight beam hint */}
           <motion.div
            className="absolute top-1/2 left-0 w-1/2 h-64 bg-gradient-to-r from-white/5 to-transparent opacity-50 blur-3xl transform -translate-y-1/2"
            initial={{ x: "-100%" }}
            animate={{ x: "50%", transition: {delay: 2.2, duration: 0.6, ease: "circOut"} }}
            exit={{ x: "-100%"}}
          ></motion.div>
          <motion.div
            className="absolute top-1/2 right-0 w-1/2 h-64 bg-gradient-to-l from-white/5 to-transparent opacity-50 blur-3xl transform -translate-y-1/2"
            initial={{ x: "100%" }}
            animate={{ x: "-50%", transition: {delay: 2.2, duration: 0.6, ease: "circOut"} }}
            exit={{ x: "100%"}}
          ></motion.div>
          
          <motion.div 
            className="relative flex flex-col items-center justify-center"
            animate={ step === 2 ? { scale: [1, 1.02, 1], transition: { duration: 0.3 } } : {} } // Subtle "thump"
          >
            {/* Simplified Tachometer/Rev Limiter Visual */}
            <div className="mb-8">
               {/* Placeholder for tachometer, focusing on text for now */}
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
                      "0 0 100px 50px hsl(var(--primary)/0.4), 0 0 40px 20px hsl(var(--primary-foreground)/0.2)", // Red and white pulse
                      "0 0 0px 0px hsl(var(--primary)/0)"
                    ], 
                    transition: { duration: 0.8, times: [0, 0.5, 1] } 
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
