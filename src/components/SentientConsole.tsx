
"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Settings2, Percent, Clock, Mic, MicOff, Eye, EyeOff, BarChartHorizontalBig, Power } from 'lucide-react';
import { useUserInteraction } from '@/contexts/UserInteractionContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import soundService from '@/services/soundService';


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

  const { 
    isSoundEnabled, 
    isGhostlineModeEnabled, 
    fastScrollCount, 
    skillHoverCounts,
    sectionVisitCounts,
    isGhostlineFullModeUnlocked
  } = interactionData;

  const consoleLogMessages = [
    "System nominal.",
    "Monitoring user telemetry...",
    "Calibrating response matrix...",
    "Ghostline OS active.",
    "Adaptive learning engaged.",
    "Neural pathways syncing...",
    `Power Spike: ${scrollPercent.toFixed(0)}% Scroll Penetration Achieved.`,
    `Fast Scroll Events: ${fastScrollCount}`,
    isGhostlineFullModeUnlocked ? "Ghostline Full Mode: ACCESS GRANTED" : "Awaiting Full Mode Unlock...",
    "[BOOT SEQUENCE v4.13.XF]",
    "⊶ Xenodrive Cortex Engaged",
  ];


  useEffect(() => {
    const visibilityTimer = setTimeout(() => setIsVisible(true), 3500); 

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
    handleScroll(); 

    return () => {
      clearTimeout(visibilityTimer);
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let initialMessage = "[BOOT SEQUENCE v4.13.XF]";
    if (hasPreviousInteraction) {
      const topSkill = Object.entries(skillHoverCounts).sort(([,a],[,b]) => b.count - a.count)[0];
      const topSection = Object.entries(sectionVisitCounts).sort(([,a],[,b]) => b - a)[0];
      
      initialMessage += ` | Drift Logs Parsed [${topSkill ? `${topSkill[0]} x${topSkill[1].count}` : 'N/A'} | RPM Max Surge ${scrollPercent.toFixed(0)}% | ${topSection ? `Sector ${topSection[0]} favored` : ''}]`;
    }
    initialMessage += " | ⊶ Apex Console Calibration… Online";
    setCurrentLogMessage(initialMessage);

    const logInterval = setInterval(() => {
      setLogMessageIndex(prevIndex => (prevIndex + 1) % consoleLogMessages.length);
    }, 7000); 

    return () => clearInterval(logInterval);
  }, [hasPreviousInteraction, skillHoverCounts, sectionVisitCounts, scrollPercent]); // Add dependencies

  useEffect(() => {
    if (isVisible) {
      if (fastScrollCount > 3 && Math.random() < 0.5) { // Example condition for warning
        setCurrentLogMessage("Cognitive Input Surpassing Nominal Limits.");
      } else {
        // Check if we're on initial load to avoid overwriting the complex initial message
        if (logMessageIndex > 0 || !hasPreviousInteraction) { 
            setCurrentLogMessage(consoleLogMessages[logMessageIndex % consoleLogMessages.length]);
        }
      }
    }
  }, [logMessageIndex, isVisible, consoleLogMessages, fastScrollCount, hasPreviousInteraction]);
  
  const handleToggleGhostline = () => {
    const willBeEnabled = !isGhostlineModeEnabled;
    toggleGhostlineMode(); // This updates the context
    if (willBeEnabled && isSoundEnabled) {
      soundService.playSound('alienStartup');
    }
  };

  if (!isVisible) {
    return null;
  }

  const aiEnergy = Math.min(100, (scrollPercent / 2) + (Object.keys(skillHoverCounts).length * 5) + (fastScrollCount * 2));


  return (
    <motion.div
      className={cn(
        "fixed bottom-4 left-4 w-72 md:w-80 bg-black/80 backdrop-blur-md text-sm text-neutral-300 p-4 rounded-lg shadow-2xl border border-neutral-700/70 z-50 sentient-console",
        isGhostlineFullModeUnlocked && "sentient-console-uv-glow"
      )}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      onClick={() => { /* CSS handles pulse, no JS needed for basic click pulse */ }}
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-600/50">
        <div className="flex items-center space-x-2">
          <Cpu size={18} className={isGhostlineFullModeUnlocked ? "text-uv-accent" : "text-primary"} />
          <h3 className="font-rajdhani text-base font-semibold text-primary-foreground uppercase tracking-wider">XENOFRAME OS</h3>
        </div>
        <Settings2 size={16} className="text-neutral-400 animate-spin-slow" />
      </div>

      <div className="mb-3 h-5 overflow-hidden">
        <motion.p
          key={currentLogMessage} 
          className="font-mono text-xs text-lime-400/90 whitespace-nowrap"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: currentLogMessage.length * 0.025, ease: "linear" }} // Slightly faster
        >
          {currentLogMessage}
        </motion.p>
      </div>
      
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
          <div className="w-1/2 h-2 bg-neutral-600 rounded-full overflow-hidden border border-neutral-500">
            <motion.div 
              className={cn(
                "h-full rounded-full",
                isGhostlineFullModeUnlocked ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" : "bg-gradient-to-r from-bmw-m-blue to-primary"
              )}
              style={{ width: `${aiEnergy}%`}}
              initial={{width: '0%'}}
              animate={{width: `${aiEnergy}%`}}
              transition={{type: "spring", stiffness: 50}}
            />
          </div>
        </div>
         <div className="flex items-center justify-between">
            <span className="flex items-center text-neutral-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 text-accent">
                    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
                </svg>
                HUD Status:
            </span>
            <span className={cn("font-mono", isGhostlineFullModeUnlocked ? "text-uv-accent animate-pulse" : "text-green-400")}>
              {isGhostlineFullModeUnlocked ? "OVERDRIVE" : "Active"}
            </span>
        </div>
      </div>

      <div className="flex space-x-2 pt-3 border-t border-neutral-600/50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSoundEnabled}
          className={cn(
            "flex-1 text-xs py-1 px-2 h-auto border-neutral-600 hover:border-primary hover:bg-primary/10",
            isSoundEnabled ? "text-primary border-primary" : "text-neutral-400",
            isGhostlineFullModeUnlocked && isSoundEnabled && "border-uv-accent text-uv-accent"
          )}
          aria-label={isSoundEnabled ? "Disable XenoSound" : "Enable XenoSound"}
        >
          {isSoundEnabled ? <Mic size={14} className="mr-1.5" /> : <MicOff size={14} className="mr-1.5" />}
          XenoSound
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleGhostline}
          className={cn(
            "flex-1 text-xs py-1 px-2 h-auto border-neutral-600 hover:border-accent hover:bg-accent/10",
            isGhostlineModeEnabled ? "text-accent border-accent" : "text-neutral-400",
             isGhostlineFullModeUnlocked && isGhostlineModeEnabled && "border-uv-accent text-uv-accent animate-pulse"
          )}
          aria-label={isGhostlineModeEnabled ? "Disable Ghostline" : "Enable Ghostline"}
        >
          {isGhostlineModeEnabled ? <Eye size={14} className="mr-1.5" /> : <EyeOff size={14} className="mr-1.5" />}
          Ghostline
        </Button>
      </div>
    </motion.div>
  );
}
