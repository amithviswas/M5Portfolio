
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Server, Cog, Power, Zap, Eye, EyeOff, Volume2, VolumeX, Settings2 } from 'lucide-react'; 
import { usePathname } from 'next/navigation';
import { M5DriveToggle } from '@/components/M5StyledComponents'; 
import { cn } from '@/lib/utils';
import { useUserInteraction } from '@/contexts/UserInteractionContext'; 

const consoleLogMessagesBase = [
  "XENOFRAME OS v1.0 Initialized.",
  "M|PERFORMANCE CORE: ONLINE.",
  "AWAITING DRIVER INPUT...",
  "MONITORING COGNITIVE LOAD.",
  "ACTIVE TERRAIN: DIGITAL GRID",
  "DRIVE MODE: SPORT PLUS [AGGRESSIVE]"
];

export default function SentientConsole() {
  const { interactionData, toggleSoundEnabled, toggleGhostlineMode, logFastScroll } = useUserInteraction();
  const [isVisible, setIsVisible] = useState(false); // Controls overall console visibility
  const [consoleLog, setConsoleLog] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const logAreaRef = useRef<HTMLDivElement>(null);

  // Determine if console should have UV glow (e.g., Ghostline active or other criteria)
  // For now, let's tie it to Ghostline mode for demonstration
  const showUvGlow = interactionData.isGhostlineModeEnabled;


  useEffect(() => {
    // Simulate loading previous interactions for "memory replay"
    let memoryReplay = "MEMORY LOG: No prior session data.";
    const totalHovers = Object.values(interactionData.skillHoverCounts).reduce((sum, skill) => sum + skill.count, 0);
    if (interactionData.fastScrollCount > 0 || totalHovers > 0) {
      memoryReplay = `MEMORY LOG: Last session anomalies: Scroll Surges (${interactionData.fastScrollCount}), Skill Node Interactions (${totalHovers}).`;
    }
    
    setConsoleLog([consoleLogMessagesBase[0], memoryReplay, ...consoleLogMessagesBase.slice(1)]);
    setDisplayedMessage("");
    setCurrentMessageIndex(0);

    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScrollDepth = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollDepth(Math.min(100, Math.max(0, currentScrollDepth)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    // Delay visibility for dramatic effect, if desired
    const visibilityTimer = setTimeout(() => setIsVisible(true), 6500); // Example: show after intro

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(visibilityTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  useEffect(() => {
    if (consoleLog.length === 0 || currentMessageIndex >= consoleLog.length) return;

    const messageToDisplay = consoleLog[currentMessageIndex];
    if (displayedMessage.length < messageToDisplay.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedMessage(messageToDisplay.substring(0, displayedMessage.length + 1));
      }, prefersReducedMotion ? 0 : 25); // Faster typewriter
      return () => clearTimeout(timeoutId);
    } else if (currentMessageIndex < consoleLog.length -1 ) { 
       const nextMessageTimer = setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
            setDisplayedMessage("");
        }, prefersReducedMotion ? 300 : 1000); // Shorter pause
        return () => clearTimeout(nextMessageTimer);
    }
  }, [displayedMessage, consoleLog, currentMessageIndex, prefersReducedMotion]);

  useEffect(() => {
    if (logAreaRef.current) {
      logAreaRef.current.scrollTop = logAreaRef.current.scrollHeight;
    }
  }, [displayedMessage, consoleLog]);

  const systemLoad = Math.min( // Re-themed as "SYSTEM LOAD"
    100,
    (scrollDepth / 2) + 
    (timeOnPage / 12) + // Slower fill from time
    (interactionData.fastScrollCount * 2) + 
    (Object.values(interactionData.skillHoverCounts).reduce((sum, count) => sum + count.count, 0) / 4)
  );

  const getSystemLoadGradient = (load: number) => {
    const blue = 'hsl(var(--bmw-m-blue))'; 
    const violet = 'hsl(var(--m-violet-hsl))'; 
    const red = 'hsl(var(--primary))';

    if (load <= 33) return `linear-gradient(to right, ${blue} ${load * 3}%, transparent ${load * 3}%)`;
    if (load <= 66) return `linear-gradient(to right, ${blue}, ${violet} ${(load - 33) * 3}%, transparent ${(load - 33) * 3}%)`;
    return `linear-gradient(to right, ${blue}, ${violet}, ${red} ${(load - 66) * 3}%, transparent ${(load - 66) * 3}%)`;
  };
  

  if (!isVisible && !prefersReducedMotion) { // Keep initial hide for effect
    return null;
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  
  const getGearIndicator = () => {
    if (pathname === '/') return 'N'; 
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'P'; 
    return lastSegment.charAt(0).toUpperCase();
  };
  
  return (
    <motion.div
      className={cn(
        "hud-console-panel", // Base style for HUD panel
        showUvGlow && "uv-glow" // Conditional UV glow
      )}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }} // Faster entry
    >
      <div className="hud-console-header">
        <h4 className="hud-console-title">XENOFRAME OS</h4>
        <Settings2 size={14} className="hud-console-settings-icon" />
      </div>

      <div className="hud-console-log" ref={logAreaRef}>
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
      
      <div className="space-y-1 py-1">
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Activity size={12}/> THROTTLE</span> {/* Re-labeled */}
          <span className="hud-gauge-value">{scrollDepth.toFixed(0)}%</span>
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Server size={12}/> GEAR</span> {/* Re-labeled */}
          <span className="hud-gauge-value">{getGearIndicator()}</span>
        </div>
         <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Cog size={12}/> SESSION UPTIME</span> {/* Re-labeled */}
          <span className="hud-gauge-value">{formatTime(timeOnPage)}</span>
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Power size={12}/> SYSTEM LOAD</span> {/* Re-labeled (was AI Energy/Engine Temp) */}
          <span className="hud-gauge-value">{systemLoad.toFixed(0)}%</span>
        </div>
        <div className="hud-meter-track">
          <div 
            className="hud-meter-fill" 
            style={{ 
              width: `${systemLoad}%`,
              background: getSystemLoadGradient(systemLoad)
            }}
          />
        </div>
      </div>

      <div className="hud-console-button-container">
        <M5DriveToggle
          enabled={interactionData.isSoundEnabled}
          toggle={toggleSoundEnabled}
          className={cn("hud-console-button", interactionData.isSoundEnabled && "active-toggle")}
        >
          {interactionData.isSoundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
          <span className="ml-1 font-monospace-subheader">SOUND</span>
        </M5DriveToggle>
        <M5DriveToggle
          enabled={interactionData.isGhostlineModeEnabled}
          toggle={toggleGhostlineMode}
          className={cn("hud-console-button", interactionData.isGhostlineModeEnabled && "active-toggle")}
        >
          {interactionData.isGhostlineModeEnabled ? <Eye size={12} /> : <EyeOff size={12} />}
           <span className="ml-1 font-monospace-subheader">GHOST</span>
        </M5DriveToggle>
      </div>
    </motion.div>
  );
}
