"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntroContext } from '@/contexts/IntroContext';
import { Geist } from 'next/font/google'; // Using Geist as per existing layout

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const TachometerIcon = ({ sweepAngle }: { sweepAngle: number }) => (
  <svg viewBox="0 0 200 110" className="w-48 h-auto md:w-64 drop-shadow-[0_0_10px_hsl(var(--primary))]">
    <defs>
      <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary)/0.5)', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path 
      d="M 30 100 A 70 70 0 0 1 170 100" 
      fill="none" 
      stroke="hsl(var(--muted-foreground)/0.5)" 
      strokeWidth="8" 
      strokeLinecap="round"
    />
    <path 
      d="M 130 100 A 70 70 0 0 1 170 100" 
      fill="none" 
      stroke="url(#gradRed)"
      strokeWidth="10" 
      strokeLinecap="round"
    />
    {/* Markings */}
    {[...Array(6)].map((_, i) => {
        const angle = -90 + (i * 180/5); // 0 to 5 markings spread over 180 deg
        const x1 = 100 + 65 * Math.cos(angle * Math.PI / 180);
        const y1 = 100 + 65 * Math.sin(angle * Math.PI / 180);
        const x2 = 100 + 75 * Math.cos(angle * Math.PI / 180);
        const y2 = 100 + 75 * Math.sin(angle * Math.PI / 180);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--muted-foreground)/0.7)" strokeWidth="2" />
    })}
    <motion.line 
      x1="100" 
      y1="100" 
      x2="100" 
      y2="30" 
      stroke="hsl(var(--primary-foreground))" 
      strokeWidth="4" 
      strokeLinecap="round"
      style={{ transformOrigin: '100px 100px', rotate: -90 }}
      animate={{ rotate: sweepAngle }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 1.5 }}
    />
    <circle cx="100" cy="100" r="5" fill="hsl(var(--primary))" />
  </svg>
);

const GlitchText = ({ text, resolved }: { text: string, resolved: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "!<>-_\\/[]{}—=+*^?#________";

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
    <span className={`${geistSans.variable} font-sans font-bold uppercase tracking-wider`}>
      {displayText}
    </span>
  );
};

export default function IntroAnimation() {
  const { setIntroCompleted } = useIntroContext();
  const [step, setStep] = useState(0); // 0: initial, 1: name resolving, 2: tachometer peak, 3: final glow, 4: fading
  const [tachometerAngle, setTachometerAngle] = useState(-90); // Start angle for needle (0 degrees relative to horizontal)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // Step 1: Start name glitch
    timers.push(setTimeout(() => setStep(1), 100));

    // Step 1.5: Start tachometer sweep
    timers.push(setTimeout(() => setTachometerAngle(70), 300)); // Sweep to ~160 deg from start (-90 + 160 = 70)

    // Step 2: Resolve name, camera shake
    timers.push(setTimeout(() => setStep(2), 1800));
    
    // Step 3: Final glow, spark burst
    timers.push(setTimeout(() => setStep(3), 2000));
    
    // Step 4: Fade out intro
    timers.push(setTimeout(() => setStep(4), 2800));
    
    // Complete intro
    timers.push(setTimeout(() => setIntroCompleted(true), 3300)); // Total 3.3s

    return () => timers.forEach(clearTimeout);
  }, [setIntroCompleted]);

  const nameResolved = step >= 2;

  return (
    <AnimatePresence>
      {step < 4 && (
        <motion.div
          key="intro-screen"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Headlight flashes - subtle */}
          <AnimatePresence>
          {step >= 1 && step < 3 && (
            <>
              <motion.div
                key="flash1"
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary-foreground)/0.2)_0%,transparent_70%)]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], transition: { duration: 0.6, times: [0, 0.5, 1], delay: 1.5 } }}
                exit={{opacity: 0}}
              />
              <motion.div
                key="flash2"
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary-foreground)/0.2)_0%,transparent_70%)]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], transition: { duration: 0.6, times: [0, 0.5, 1], delay: 1.7 } }}
                exit={{opacity: 0}}
              />
            </>
          )}
          </AnimatePresence>

          <motion.div 
            className="relative flex flex-col items-center justify-center"
            animate={ step === 2 ? { x: [0, 5, -5, 5, -5, 0], y: [0, -3, 3, -3, 3, 0], transition: { duration: 0.3 } } : {} }
          >
            <div className="mb-8">
              <TachometerIcon sweepAngle={tachometerAngle} />
            </div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl text-center text-primary-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <GlitchText text="AMITH VISWAS REDDY" resolved={nameResolved} />
            </motion.h1>

            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  key="final-glow-spark"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    boxShadow: [
                      "0 0 0px 0px hsl(var(--primary-foreground)/0)", 
                      "0 0 60px 20px hsl(var(--primary-foreground)/0.3), 0 0 30px 10px hsl(var(--primary)/0.5)",
                      "0 0 0px 0px hsl(var(--primary-foreground)/0)"
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
