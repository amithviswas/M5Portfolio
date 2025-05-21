
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Server, Cog, Power, Settings2, Volume2, Eye } from 'lucide-react'; // Added Volume2, Eye
import { usePathname } from 'next/navigation';
import { M5DriveToggle } from '@/components/M5StyledComponents'; 
import { cn } from '@/lib/utils';
// import { useUserInteraction } from '@/contexts/UserInteractionContext'; // Removed context

const consoleLogMessagesBase = [
  "XENOFRAME OS v2.1 CSL Initialized.", // Updated
  "M|PERFORMANCE CORE: ONLINE.",
  "AWAITING DRIVER DIRECTIVE...", // Updated
  "MONITORING SYSTEM INTEGRITY.", // Updated
  "ACTIVE TERRAIN: DIGITAL GRID",
  "DRIVE MODE: M SPORT PLUS [AGGRESSIVE]" // Updated
];

export default function SentientConsole() {
  // const { interactionData, toggleSoundEnabled, toggleGhostlineMode } = useUserInteraction(); // Removed
  // Simplified states since context is removed
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isGhostlineModeEnabled, setIsGhostlineModeEnabled] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [consoleLog, setConsoleLog] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const logAreaRef = useRef<HTMLDivElement>(null);

  // Placeholder for interaction data that was previously from context
  const interactionData = {
    isSoundEnabled: isSoundEnabled,
    isGhostlineModeEnabled: isGhostlineModeEnabled,
    isGhostlineFullModeUnlocked: false, // Assuming not unlocked without context
    fastScrollCount: 0,
    skillHoverCounts: {},
  };

  const toggleSoundEnabled = () => setIsSoundEnabled(prev => !prev);
  const toggleGhostlineMode = () => setIsGhostlineModeEnabled(prev => !prev);


  const showUvGlow = interactionData.isGhostlineModeEnabled || interactionData.isGhostlineFullModeUnlocked;


  useEffect(() => {
    let memoryReplay = "MEMORY LOG: No prior session data. System nominal.";
    // Simplified memory replay as detailed interaction data is not available
    
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

    const visibilityTimer = setTimeout(() => setIsVisible(true), 2500); // Faster appearance

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(visibilityTimer);
    };
  }, []); 

  useEffect(() => {
    if (consoleLog.length === 0 || currentMessageIndex >= consoleLog.length) return;

    const messageToDisplay = consoleLog[currentMessageIndex];
    if (displayedMessage.length < messageToDisplay.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedMessage(messageToDisplay.substring(0, displayedMessage.length + 1));
      }, prefersReducedMotion ? 0 : 20); 
      return () => clearTimeout(timeoutId);
    } else if (currentMessageIndex < consoleLog.length -1 ) { 
       const nextMessageTimer = setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
            setDisplayedMessage("");
        }, prefersReducedMotion ? 250 : 800); 
        return () => clearTimeout(nextMessageTimer);
    }
  }, [displayedMessage, consoleLog, currentMessageIndex, prefersReducedMotion]);

  useEffect(() => {
    if (logAreaRef.current) {
      logAreaRef.current.scrollTop = logAreaRef.current.scrollHeight;
    }
  }, [displayedMessage, consoleLog]);

  // Re-themed as "System Load" for CSL
  const systemLoad = Math.min( 
    100,
    (scrollDepth / 2) + 
    (timeOnPage / 10) + // Faster fill from time
    (interactionData.fastScrollCount * 1.5) + 
    (Object.values(interactionData.skillHoverCounts).reduce((sum, countObj: any) => sum + (countObj?.count || 0), 0) / 3)
  );

  const getSystemLoadGradient = (load: number) => {
    const blue = 'hsl(var(--bmw-m-blue))'; 
    const violet = 'hsl(var(--m-violet-hsl))'; 
    const red = 'hsl(var(--primary))';

    if (load <= 33) return `linear-gradient(to right, ${blue} ${load * 3}%, transparent ${load * 3}%)`;
    if (load <= 66) return `linear-gradient(to right, ${blue}, ${violet} ${(load - 33) * 3}%, transparent ${(load - 33) * 3}%)`;
    return `linear-gradient(to right, ${blue}, ${violet}, ${red} ${(load - 66) * 3}%, transparent ${(load - 66) * 3}%)`;
  };
  

  if (!isVisible && !prefersReducedMotion) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  
  // CSL Theme: "Gear", "Velocity", "System Load"
  const getGearIndicator = () => {
    if (pathname === '/') return 'N'; 
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'P'; 
    // Use first char, uppercase. For multi-word, consider initials or a symbol
    return lastSegment.length > 3 ? lastSegment.substring(0,3).toUpperCase() : lastSegment.charAt(0).toUpperCase();
  };
  
  return (
    <motion.div
      className={cn(
        "hud-console-panel", 
        showUvGlow && "uv-glow" 
      )}
      initial={{ opacity: 0, x: -30 }} // Adjusted initial position
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.1, ease: "easeOut" }}
    >
      <div className="hud-console-header">
        <h4 className="hud-console-title">M Cockpit OS</h4> {/* Updated Title */}
        <Settings2 size={12} className="hud-console-settings-icon" /> {/* Smaller Icon */}
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
      
      <div className="space-y-0.5 py-0.5"> {/* Tighter spacing */}
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Activity size={10}/> VELOCITY</span> {/* CSL: Velocity */}
          <span className="hud-gauge-value">{scrollDepth.toFixed(0)} km/h</span> {/* Thematic unit */}
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Server size={10}/> GEAR</span> {/* CSL: Gear */}
          <span className="hud-gauge-value">{getGearIndicator()}</span>
        </div>
         <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Cog size={10}/> UPTIME</span> {/* Simplified */}
          <span className="hud-gauge-value">{formatTime(timeOnPage)}</span>
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Power size={10}/> SYS. LOAD</span> {/* CSL: System Load */}
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
          <Volume2 size={10} /> {/* CSL: Sound Icon, smaller */}
          <span className="ml-1 font-monospace-subheader">AUDIO</span>
        </M5DriveToggle>
        <M5DriveToggle
          enabled={interactionData.isGhostlineModeEnabled}
          toggle={toggleGhostlineMode}
          className={cn("hud-console-button", interactionData.isGhostlineModeEnabled && "active-toggle")}
        >
          <Eye size={10} /> {/* CSL: Ghostline Icon, smaller */}
           <span className="ml-1 font-monospace-subheader">GHOST</span>
        </M5DriveToggle>
      </div>
    </motion.div>
  );
}
