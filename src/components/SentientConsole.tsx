
"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Settings2, Percent, Clock, Mic, MicOff, Eye, EyeOff, BarChartHorizontalBig } from 'lucide-react';
import { useUserInteraction } from '@/contexts/UserInteractionContext';
import { cn } from '@/lib/utils';

const consoleLogMessages = [
  "System nominal.",
  "Monitoring user telemetry...",
  "Calibrating response matrix...",
  "Ghostline OS active.",
  "Adaptive learning engaged.",
  "Neural pathways syncing...",
  "Preparing for optimal interaction..."
];

export default function SentientConsole() {
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentLogMessage, setCurrentLogMessage] = useState("Initializing Ghostline OS...");
  const [logMessageIndex, setLogMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { 
    interactionData, 
    toggleSoundEnabled, 
    toggleGhostlineMode,
    hasPreviousInteraction 
  } = useUserInteraction();

  const { isSoundEnabled, isGhostlineModeEnabled } = interactionData;

  useEffect(() => {
    // Delay visibility to allow intro animation to complete
    const visibilityTimer = setTimeout(() => setIsVisible(true), 3500); // Adjust delay as needed

    const timer = setInterval(() => {
      setTimeOnPage(prevTime => prevTime + 1);
    }, 1000);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      clearTimeout(visibilityTimer);
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (hasPreviousInteraction && isVisible) {
      setCurrentLogMessage("Memory sync complete. Welcome back, Engineer.");
    } else if (isVisible) {
        setCurrentLogMessage("Ghostline OS initializing...");
    }

    const logInterval = setInterval(() => {
      setLogMessageIndex(prevIndex => (prevIndex + 1) % consoleLogMessages.length);
    }, 7000); // Change log message every 7 seconds

    return () => clearInterval(logInterval);
  }, [hasPreviousInteraction, isVisible]);

  useEffect(() => {
    if (isVisible && !hasPreviousInteraction) {
      setCurrentLogMessage(consoleLogMessages[logMessageIndex]);
    }
  }, [logMessageIndex, isVisible, hasPreviousInteraction]);
  

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-4 left-4 w-72 md:w-80 bg-black/70 backdrop-blur-md text-sm text-neutral-300 p-4 rounded-lg shadow-2xl border border-neutral-700/70 z-50 sentient-console"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-600/50">
        <div className="flex items-center space-x-2">
          <Cpu size={18} className="text-primary" />
          <h3 className="font-rajdhani text-base font-semibold text-primary-foreground uppercase tracking-wider">Ghostline OS</h3>
        </div>
        <Settings2 size={16} className="text-neutral-400 animate-spin-slow" />
      </div>

      {/* Typewriter Log */}
      <div className="mb-3 h-5 overflow-hidden">
        <motion.p
          key={currentLogMessage} // Change key to re-trigger animation
          className="font-mono text-xs text-green-400/90 whitespace-nowrap"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: currentLogMessage.length * 0.03, ease: "linear" }}
        >
          {currentLogMessage}
        </motion.p>
      </div>
      
      {/* Data Displays */}
      <div className="space-y-2 text-xs mb-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center text-neutral-400"><Percent size={12} className="mr-1.5 text-accent" /> Scroll Depth:</span>
          <span className="font-mono text-primary-foreground">{scrollPercent.toFixed(0)}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-neutral-400"><Clock size={12} className="mr-1.5 text-accent" /> Session Time:</span>
          <span className="font-mono text-primary-foreground">{new Date(timeOnPage * 1000).toISOString().substr(14, 5)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-neutral-400"><BarChartHorizontalBig size={12} className="mr-1.5 text-accent" /> AI Energy:</span>
          <div className="w-1/2 h-2 bg-neutral-600 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-bmw-m-blue to-primary rounded-full"
              style={{ width: `${scrollPercent}%`}}
              initial={{width: '0%'}}
              animate={{width: `${scrollPercent}%`}}
              transition={{type: "spring", stiffness: 50}}
            />
          </div>
        </div>
         {/* Placeholder for Mini-Reactive BMW HUD Diagram */}
        <div className="flex items-center justify-between">
            <span className="flex items-center text-neutral-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 text-accent">
                    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
                </svg>
                HUD Status:
            </span>
            <span className="font-mono text-green-400">Active</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex space-x-2 pt-3 border-t border-neutral-600/50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSoundEnabled}
          className={cn(
            "flex-1 text-xs py-1 px-2 h-auto border-neutral-600 hover:border-primary hover:bg-primary/10",
            isSoundEnabled ? "text-primary border-primary" : "text-neutral-400"
          )}
        >
          {isSoundEnabled ? <Mic size={14} className="mr-1.5" /> : <MicOff size={14} className="mr-1.5" />}
          Sound
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleGhostlineMode}
          className={cn(
            "flex-1 text-xs py-1 px-2 h-auto border-neutral-600 hover:border-accent hover:bg-accent/10",
            isGhostlineModeEnabled ? "text-accent border-accent" : "text-neutral-400"
          )}
        >
          {isGhostlineModeEnabled ? <Eye size={14} className="mr-1.5" /> : <EyeOff size={14} className="mr-1.5" />}
          Ghostline
        </Button>
      </div>
    </motion.div>
  );
}
