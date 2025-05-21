
"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import { Cpu, Settings2, Percent, Clock, Mic, MicOff, Eye, EyeOff, BarChartHorizontalBig, Power, Activity, Server } from 'lucide-react'; // Added Activity, Server
import { useUserInteraction } from '@/contexts/UserInteractionContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import soundService from '@/services/soundService';
import { usePathname } from 'next/navigation'; // Import usePathname
import { M5DriveToggle } from '@/components/M5StyledComponents'; // Import M5DriveToggle

export default function SentientConsole() {
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentLogMessage, setCurrentLogMessage] = useState("Initializing XENOFRAME OS...");
  const [logMessageIndex, setLogMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname(); // Get current pathname

  const { 
    interactionData, 
    toggleSoundEnabled, 
    toggleGhostlineMode,
    hasPreviousInteraction,
    getSkillHoverDetail,
    unlockGhostlineFullMode,
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
    "System nominal. Monitoring user telemetry...",
    "Calibrating response matrix... Ghostline OS active.",
    "Adaptive learning engaged. Neural pathways syncing...",
    `Power Spike: ${scrollPercent.toFixed(0)}% Scroll Penetration Achieved.`,
    `Fast Scroll Events Detected: ${fastScrollCount}`,
    isGhostlineFullModeUnlocked ? "Ghostline Full Mode: ACCESS GRANTED" : "Awaiting Ghostline Full Mode Unlock...",
    "[XENOFRAME BOOT SEQUENCE v4.13.XF]",
    "⊶ Xenodrive Cortex Engaged. Awaiting user input.",
    "Cognitive Input Analysis: Normal.",
    "System Integrity: 100%. All modules operational."
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
    let initialMessage = "[XENOFRAME BOOT SEQUENCE v4.13.XF]";
    if (hasPreviousInteraction) {
      const topSkillEntry = Object.entries(skillHoverCounts).sort(([,a],[,b]) => b.count - a.count)[0];
      const topSkill = topSkillEntry ? `${topSkillEntry[0]} (x${topSkillEntry[1].count})` : 'N/A';
      
      const topSectionEntry = Object.entries(sectionVisitCounts).sort(([,a],[,b]) => b - a)[0];
      const topSection = topSectionEntry ? `Sector ${topSectionEntry[0]} (x${topSectionEntry[1]})` : 'N/A';
      
      initialMessage += ` | Drift Logs Parsed [Skill Focus: ${topSkill} | Max Throttle: ${scrollPercent.toFixed(0)}% | Favored: ${topSection}]`;
    }
    initialMessage += " | ⊶ Apex Console Calibration… Online";
    setCurrentLogMessage(initialMessage);

    const logInterval = setInterval(() => {
      setLogMessageIndex(prevIndex => (prevIndex + 1)); // Cycle through messages
    }, 7000); 

    return () => clearInterval(logInterval);
  }, [hasPreviousInteraction, skillHoverCounts, sectionVisitCounts, scrollPercent]); // Added dependencies

  useEffect(() => {
    if (isVisible) {
      const currentMessageIndex = logMessageIndex % consoleLogMessages.length;
      let displayMessage = consoleLogMessages[currentMessageIndex];

      if (fastScrollCount > 2 && Math.random() < 0.3) { 
        displayMessage = "Cognitive Input Surpassing Nominal Limits.";
      } else if (isGhostlineFullModeUnlocked && currentMessageIndex === consoleLogMessages.findIndex(msg => msg.includes("Awaiting Ghostline Full Mode Unlock"))) {
        // If full mode unlocked, skip the "awaiting" message and show the "granted" one or next.
        displayMessage = consoleLogMessages[consoleLogMessages.findIndex(msg => msg.includes("ACCESS GRANTED")) || currentMessageIndex + 1];
      }
      
      // For repeated hover warning
      const frequentlyHoveredSkill = Object.entries(skillHoverCounts).find(([,detail]) => detail.count >=3 && (Date.now() - detail.lastTimestamp < 10000));
      if (frequentlyHoveredSkill) {
        displayMessage = `Pattern Repetition Detected: Skill Node '${frequentlyHoveredSkill[0]}'`;
      }

      setCurrentLogMessage(displayMessage);
    }
  }, [logMessageIndex, isVisible, consoleLogMessages, fastScrollCount, skillHoverCounts, isGhostlineFullModeUnlocked]);
  
  const handleToggleGhostline = () => {
    const willBeEnabled = !isGhostlineModeEnabled;
    toggleGhostlineMode(); 
    if (willBeEnabled && isSoundEnabled) {
      soundService.playSound('alienStartup');
    }
    // Check for full mode unlock eligibility
    unlockGhostlineFullMode();
  };

  const handleToggleSound = async () => {
    await toggleSoundEnabled(); // toggleSoundEnabled from context now handles Tone.start()
  };

  if (!isVisible && !interactionData.isGhostlineFullModeUnlocked) { // Keep visible if full mode unlocked
    return null;
  }

  const aiEnergy = Math.min(100, (scrollPercent / 2) + (Object.values(skillHoverCounts).reduce((sum, {count}) => sum + count, 0) * 2) + (fastScrollCount * 5));


  return (
    <motion.div
      className={cn(
        "hud-console-panel", // Main styling class from globals.css
        (isGhostlineFullModeUnlocked || isVisible) && "opacity-100 translate-x-0", // Ensure visible if full mode
        !(isGhostlineFullModeUnlocked || isVisible) && "opacity-0 -translate-x-12", // Hidden initially
        isGhostlineFullModeUnlocked && "sentient-console-uv-glow"
      )}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: (isGhostlineFullModeUnlocked ? 0.2 : 3.5), ease: "easeOut" }} // Quicker if already unlocked
      onClick={() => { /* Basic pulse on click, mainly CSS driven */ }}
    >
      <div className="hud-console-header">
        <div className="hud-console-title">
          <Cpu size={18} />
          <h3>XENOFRAME OS</h3>
        </div>
        <Settings2 size={16} className="hud-console-settings-icon" />
      </div>

      <div className="hud-console-log">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentLogMessage} 
            className="whitespace-nowrap" // Ensure no wrap for typewriter
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.1} }}
            transition={{ duration: currentLogMessage.length * 0.020, ease: "linear" }} 
          >
            {currentLogMessage}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <div className="space-y-1.5 text-xs mb-3"> {/* Reduced spacing */}
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Activity size={12} /> THROTTLE:</span> {/* Changed icon */}
          <span className="hud-gauge-value">{scrollPercent.toFixed(0)}%</span>
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Server size={12} /> GEAR:</span> {/* Changed icon */}
          <span className="hud-gauge-value truncate w-28 text-right">{pathname === '/' ? 'HOME' : pathname.substring(1).toUpperCase()}</span>
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Clock size={12} /> SESSION UPTIME:</span>
          <span className="hud-gauge-value">{new Date(timeOnPage * 1000).toISOString().substr(14, 5)}</span>
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><BarChartHorizontalBig size={12} /> SYSTEM LOAD:</span>
          <div className="hud-meter-track">
            <motion.div 
              className="hud-meter-fill" // Styled in globals.css
              style={{ width: `${aiEnergy}%`}}
              initial={{width: '0%'}}
              animate={{width: `${aiEnergy}%`}}
              transition={{type: "spring", stiffness: 50, damping: 15}}
            />
          </div>
        </div>
         <div className="hud-gauge-item">
            <span className="hud-gauge-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 text-accent">
                    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
                </svg>
                HUD STATUS:
            </span>
            <span className={cn("font-mono", isGhostlineFullModeUnlocked ? "text-uv-blue animate-pulse" : "text-green-400")}>
              {isGhostlineFullModeUnlocked ? "OVERDRIVE" : "ACTIVE"}
            </span>
        </div>
      </div>

      <div className="flex space-x-2 pt-2 border-t border-border/30"> {/* Reduced padding top */}
        <M5DriveToggle
          enabled={isSoundEnabled}
          toggle={handleToggleSound}
          className={cn(
            isSoundEnabled && isGhostlineFullModeUnlocked && "!border-uv-blue !text-uv-blue !shadow-uv-blue/50",
            isSoundEnabled && !isGhostlineFullModeUnlocked && "!border-primary !text-primary !shadow-primary/50"
          )}
          aria-label={isSoundEnabled ? "Disable XenoSound" : "Enable XenoSound"}
        >
          {isSoundEnabled ? <Mic size={14} /> : <MicOff size={14} />}
          <span className="ml-1.5 text-xs">SOUND</span>
        </M5DriveToggle>
        <M5DriveToggle
          enabled={isGhostlineModeEnabled}
          toggle={handleToggleGhostline}
          className={cn(
            isGhostlineModeEnabled && isGhostlineFullModeUnlocked && "!border-uv-blue !text-uv-blue !shadow-uv-blue/50 animate-pulse",
            isGhostlineModeEnabled && !isGhostlineFullModeUnlocked && "!border-accent !text-accent !shadow-accent/50"
          )}
          aria-label={isGhostlineModeEnabled ? "Disable Ghostline" : "Enable Ghostline"}
        >
          {isGhostlineModeEnabled ? <Eye size={14} /> : <EyeOff size={14} />}
          <span className="ml-1.5 text-xs">GHOST</span>
        </M5DriveToggle>
      </div>
    </motion.div>
  );
}

