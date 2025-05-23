
"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntroContext } from '@/contexts/IntroContext';
import { cn } from '@/lib/utils';

// GlitchText sub-component
const GlitchText = ({ text, resolved, className }: { text: string, resolved: boolean, className?: string }) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, '\u00A0'));
  const [isMounted, setIsMounted] = useState(false);
  const animationFrameIdRef = useRef<number | undefined>();
  const chars = "!<>-_\\/[]{}—=+*^?#_M5";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      setDisplayText(resolved ? text : text.replace(/./g, '\u00A0'));
      return;
    }

    if (resolved) {
      setDisplayText(text);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = undefined;
      }
      return;
    }

    const updateText = () => {
      setDisplayText(
        text
          .split('')
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join('')
      );
      animationFrameIdRef.current = requestAnimationFrame(updateText);
    };

    updateText(); // Start animation immediately if not resolved and mounted

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = undefined;
      }
    };
  }, [resolved, text, isMounted, chars]); // Rerun effect if these change

  if (!isMounted && !resolved) {
    return <span className={cn("font-heading tracking-wider", className)}>{text.replace(/./g, '\u00A0')}</span>;
  }
  if (!isMounted && resolved) {
    return <span className={cn("font-heading tracking-wider", className)}>{text}</span>;
  }


  return (
    <span className={cn("font-heading tracking-wider", className)}>
      {displayText}
    </span>
  );
};


export default function IntroAnimation() {
  const { setIntroCompleted } = useIntroContext();
  const [step, setStep] = useState(0); // 0: initial, 1: text glitch, 2: text revealed, 3: final pulse, 4: completed/fading
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStep(1), 100)); // Start glitch text
    timers.push(setTimeout(() => setStep(2), 2500)); // Resolve name text
    timers.push(setTimeout(() => setStep(3), 2800)); // Final visual pulse
    timers.push(setTimeout(() => {
      setStep(4); // Mark internal step as completed (though parent AnimatePresence handles removal)
      setIntroCompleted(true); // Signal parent
    }, 4000)); // Total intro duration 4 seconds

    return () => timers.forEach(clearTimeout);
  }, [setIntroCompleted, hasMounted]);

  if (!hasMounted) {
    return null;
  }

  const nameResolved = step >= 2;

  return (
    <motion.div
      key="intro-screen"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] } }}
    >
      {/* Background Image */}
      <motion.img
        src="https://i.ibb.co/DHPKdq3n/generated-image-1.png"
        alt="Aggressive BMW M5 backdrop"
        data-ai-hint="BMW M5 night"
        className="absolute inset-0 w-full h-full object-cover z-[-2]" // Ensure it's behind text and overlay
        initial={{ scale: 1.05 }}
        animate={{ scale: 1, transition: { duration: 4.0, ease: "easeInOut" } }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black opacity-40 z-[-1]"></div>

      {/* Subtle headlight beam hint - Render only on client after mount */}
      {hasMounted && (
        <>
          <motion.div
            className="absolute top-1/2 left-0 w-1/2 h-64 bg-gradient-to-r from-white/5 to-transparent opacity-50 blur-3xl transform -translate-y-1/2"
            initial={{ x: "-100%" }}
            animate={{ x: "50%", transition: {delay: 1.8, duration: 0.7, ease: "circOut"} }}
            exit={{ x: "-100%"}}
          ></motion.div>
          <motion.div
            className="absolute top-1/2 right-0 w-1/2 h-64 bg-gradient-to-l from-white/5 to-transparent opacity-50 blur-3xl transform -translate-y-1/2"
            initial={{ x: "100%" }}
            animate={{ x: "-50%", transition: {delay: 1.8, duration: 0.7, ease: "circOut"} }}
            exit={{ x: "100%"}}
          ></motion.div>
        </>
      )}

      {/* Text content block - Render only on client after mount */}
      {hasMounted && (
        <motion.div
          className="relative flex flex-col items-center justify-center"
          animate={ step === 2 ? { scale: [1, 1.02, 1], transition: { duration: 0.3 } } : {} }
        >
          <div className="mb-8">
             {/* Placeholder for tachometer or M logo, can be added later */}
          </div>

          <motion.div
            className="text-center text-primary-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
          >
            <GlitchText text="AMITH VISWAS REDDY" resolved={nameResolved} className="text-4xl md:text-5xl lg:text-6xl block" />
            <GlitchText text="AI/MACHINE LEARNING ENGINEER" resolved={nameResolved} className="text-xl md:text-2xl lg:text-3xl text-primary mt-2 block" />
          </motion.div>

          {/* Screen flash / pulse - Render only on client after mount */}
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
        </motion.div>
      )}
    </motion.div>
  );
}
