
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Server, Cog, Volume2, VolumeX, Eye, EyeOff, Zap } from 'lucide-react'; // Added Zap for AI Energy
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
// import { useUserInteraction } from '@/contexts/UserInteractionContext'; // Rolled back
import { M5DriveToggle } from '@/components/M5StyledComponents';
import { cn } from '@/lib/utils';

const consoleLogMessagesBase = [
  "SYSTEM ONLINE. XENOFRAME OS v4.13 INITIALIZED.",
  "PERFORMANCE METRICS CALIBRATED.",
  "AWAITING USER INPUT...",
  "MONITORING ENGAGEMENT LEVELS.",
  "COGNITIVE PATHWAYS STABLE.",
];

export default function SentientConsole() {
  const [isVisible, setIsVisible] = useState(false);
  const [consoleLog, setConsoleLog] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  
  // Rolled back context usage
  // const { interactionData, toggleSoundEnabled, toggleGhostlineMode } = useUserInteraction();
  // const { isSoundEnabled, isGhostlineModeEnabled, fastScrollCount, skillHovers, sectionVisitCounts, isGhostlineFullModeUnlocked } = interactionData;
  const isSoundEnabled = false; // Placeholder
  const isGhostlineModeEnabled = false; // Placeholder
  const isGhostlineFullModeUnlocked = false; // Placeholder
  const fastScrollCount = 0; // Placeholder
  const skillHovers = {}; // Placeholder


  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const logAreaRef = useRef<HTMLDivElement>(null);

  // Placeholder toggle functions
  const toggleSoundEnabled = () => console.log("Sound toggle clicked (no context)");
  const toggleGhostlineMode = () => console.log("Ghostline toggle clicked (no context)");


  useEffect(() => {
    // Initial "boot sequence" messages
    setConsoleLog([
      // "Last session: Analyzing previous interaction patterns...", // Rolled back
      // `Fast scroll events: ${fastScrollCount || 0}`, // Rolled back
      // `Most engaged skill: ${getMostEngagedSkill() || 'N/A'}`, // Rolled back
      consoleLogMessagesBase[0]
    ]);
    setDisplayedMessage("");
    setCurrentMessageIndex(0);

    // Timer to update time on page
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    // Scroll listener
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const currentScrollDepth = (scrollTop / (docHeight - winHeight)) * 100;
      setScrollDepth(currentScrollDepth > 100 ? 100 : currentScrollDepth < 0 ? 0 : currentScrollDepth);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    // Delayed visibility for console
    const visibilityTimer = setTimeout(() => setIsVisible(true), 2500); // Appears after intro

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(visibilityTimer);
    };
  }, [/* fastScrollCount, skillHovers - Rolled back deps */]);

  // Typewriter effect for console logs
  useEffect(() => {
    if (consoleLog.length === 0 || currentMessageIndex >= consoleLog.length) return;

    const messageToDisplay = consoleLog[currentMessageIndex];
    if (displayedMessage.length < messageToDisplay.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedMessage(messageToDisplay.substring(0, displayedMessage.length + 1));
      }, 50); // Adjust typing speed here
      return () => clearTimeout(timeoutId);
    } else if (currentMessageIndex < consoleLog.length -1 ) { // If not the last message, move to next
       const nextMessageTimer = setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
            setDisplayedMessage("");
        }, 1500); // Pause before next message
        return () => clearTimeout(nextMessageTimer);
    } else if (consoleLog.length < consoleLogMessagesBase.length + (/*Object.keys(skillHovers).length > 0 ? 1 : 0 Rolled back */ 0) ) { // Add more generic messages if needed
        const addMoreMessagesTimer = setTimeout(() => {
            const nextBaseMessageIndex = consoleLog.length - (/*(Object.keys(skillHovers).length > 0 ? 1 : 0) + (fastScrollCount > 0 ? 1 : 0) Rolled back */ 0);
            if(consoleLogMessagesBase[nextBaseMessageIndex]) {
                setConsoleLog(prev => [...prev, consoleLogMessagesBase[nextBaseMessageIndex]]);
                setCurrentMessageIndex(prev => prev + 1);
                setDisplayedMessage("");
            }
        }, 3000); // Pause before adding another generic message
        return () => clearTimeout(addMoreMessagesTimer);
    }
  }, [displayedMessage, consoleLog, currentMessageIndex, /* skillHovers, fastScrollCount - Rolled back deps */]);

  useEffect(() => {
    if (logAreaRef.current) {
      logAreaRef.current.scrollTop = logAreaRef.current.scrollHeight;
    }
  }, [displayedMessage, consoleLog]);

  // const getMostEngagedSkill = () => { // Rolled back
  //   if (!skillHovers || Object.keys(skillHovers).length === 0) return null;
  //   return Object.entries(skillHovers).sort(([,a],[,b]) => b.count - a.count)[0][0];
  // };

  // const aiEnergy = Math.min(100, (scrollDepth / 2) + (fastScrollCount * 5) + (Object.keys(skillHovers).length * 10)); // Rolled back AI Energy calculation
  const systemLoad = Math.min(100, (scrollDepth / 2) + (timeOnPage / 2)); // Simplified system load


  if (!isVisible && !prefersReducedMotion) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <motion.div
      className={cn(
        "hud-console-panel", // Main styling class
        isGhostlineFullModeUnlocked && "hud-console-uv-glow" // UV Glow when Ghostline Full Mode is active
      )}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 2.5, ease: "easeOut" }}
    >
      <div className="hud-console-header">
        <h4 className="hud-console-title">XENOFRAME OS</h4>
        {/* <Settings2 size={14} className="hud-console-settings-icon animate-spin-slow" /> */}
      </div>

      <div className="hud-console-log console-log-area" ref={logAreaRef}>
        {consoleLog.slice(0, currentMessageIndex).map((msg, idx) => (
          <div key={`log-${idx}`} className="console-log-line">{msg}</div>
        ))}
        {displayedMessage && (
          <div className="console-log-line">
            {displayedMessage}
            <span className="typewriter-cursor"></span>
          </div>
        )}
      </div>
      
      <div className="space-y-1.5 py-1">
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Activity /> THROTTLE</span>
          <span className="hud-gauge-value">{scrollDepth.toFixed(0)}%</span>
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Server /> GEAR</span>
          <span className="hud-gauge-value">{pathname === '/' ? 'N' : pathname.substring(1).toUpperCase().slice(0,4) || 'P'}</span>
        </div>
         <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Cog /> SESSION UPTIME</span>
          <span className="hud-gauge-value">{formatTime(timeOnPage)}</span>
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Zap /> SYSTEM LOAD</span> {/* Changed icon */}
          <span className="hud-gauge-value">{systemLoad.toFixed(0)}%</span>
        </div>
        <div className="hud-meter-track">
          <div 
            className="hud-meter-fill" 
            style={{ 
              width: `${systemLoad}%`,
              background: `linear-gradient(90deg, hsl(var(--bmw-m-blue)), hsl(var(--primary)) ${systemLoad}%, hsl(var(--neutral-700)) ${systemLoad}%)`
            }}
          />
        </div>
      </div>

      <div className="hud-console-button-container">
        <M5DriveToggle
          enabled={isSoundEnabled}
          toggle={toggleSoundEnabled}
          className={cn("hud-console-button", isSoundEnabled && "active-toggle")}
        >
          {isSoundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
          <span className="ml-1">SOUND</span>
        </M5DriveToggle>
        <M5DriveToggle
          enabled={isGhostlineModeEnabled}
          toggle={toggleGhostlineMode}
          className={cn("hud-console-button", isGhostlineModeEnabled && "active-toggle")}
        >
          {isGhostlineModeEnabled ? <Eye size={12} /> : <EyeOff size={12} />}
           <span className="ml-1">GHOST</span>
        </M5DriveToggle>
      </div>
    </motion.div>
  );
}
