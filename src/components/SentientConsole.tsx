
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Server, Cog, Volume2, VolumeX, Eye, EyeOff, Zap, Settings2, Power } from 'lucide-react'; 
import { usePathname } from 'next/navigation';
// import { useUserInteraction } from '@/contexts/UserInteractionContext'; // Temporarily removed for rollback
import { M5DriveToggle } from '@/components/M5StyledComponents'; 
import { cn } from '@/lib/utils';

// Placeholder for UserInteractionContext data if context is removed
const placeholderInteractionData = {
  fastScrollCount: 0,
  totalSkillHovers: 0,
  isSoundEnabled: false,
  isGhostlineModeEnabled: false,
  // Add other fields if SentientConsole uses them and context is absent
};
// Placeholder for UserInteractionContext functions
const placeholderToggleSoundEnabled = () => console.warn("toggleSoundEnabled called on placeholder");
const placeholderToggleGhostlineMode = () => console.warn("toggleGhostlineMode called on placeholder");


const consoleLogMessagesBase = [
  "SYSTEM ONLINE. M-DRIVE OS v5.8 INITIALIZED.", // Updated for Aggressive Elegance
  "PERFORMANCE METRICS CALIBRATED.",
  "AWAITING DIRECTIVE...", // Shortened
  "MONITORING TELEMETRY DATA.", // More specific
  "ACTIVE TERRAIN: DIGITAL GRID",
  "DRIVE MODE: SPORT PLUS ENGAGED"
];

export default function SentientConsole() {
  const [isVisible, setIsVisible] = useState(false);
  const [consoleLog, setConsoleLog] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  
  // Use placeholders if context is removed
  // const { interactionData, toggleSoundEnabled, toggleGhostlineMode } = useUserInteraction() || { 
  //   interactionData: placeholderInteractionData, 
  //   toggleSoundEnabled: placeholderToggleSoundEnabled,
  //   toggleGhostlineMode: placeholderToggleGhostlineMode
  // };
  // For rollback, directly use local state or simpler logic:
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isGhostlineModeEnabled, setIsGhostlineModeEnabled] = useState(false);
  const toggleSoundEnabled = () => setIsSoundEnabled(p => !p);
  const toggleGhostlineMode = () => setIsGhostlineModeEnabled(p => !p);
  const interactionData = placeholderInteractionData; // Use placeholder for other data points

  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const logAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setConsoleLog([consoleLogMessagesBase[0]]);
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

    // Show console slightly after intro animation might complete
    const visibilityTimer = setTimeout(() => setIsVisible(true), 6500); // Adjusted for 6s intro

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(visibilityTimer);
    };
  }, []); // Removed interactionData from deps as it's placeholder or local

  useEffect(() => {
    if (consoleLog.length === 0 || currentMessageIndex >= consoleLog.length) return;

    const messageToDisplay = consoleLog[currentMessageIndex];
    if (displayedMessage.length < messageToDisplay.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedMessage(messageToDisplay.substring(0, displayedMessage.length + 1));
      }, prefersReducedMotion ? 0 : 30); 
      return () => clearTimeout(timeoutId);
    } else if (currentMessageIndex < consoleLog.length -1 ) { 
       const nextMessageTimer = setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
            setDisplayedMessage("");
        }, prefersReducedMotion ? 100 : 1200); 
        return () => clearTimeout(nextMessageTimer);
    } else if (consoleLog.length < consoleLogMessagesBase.length ) { 
        const addMoreMessagesTimer = setTimeout(() => {
            const nextBaseMessageIndex = consoleLog.length;
            if(consoleLogMessagesBase[nextBaseMessageIndex]) {
                setConsoleLog(prev => [...prev, consoleLogMessagesBase[nextBaseMessageIndex]]);
                setCurrentMessageIndex(prev => prev + 1);
                setDisplayedMessage("");
            }
        }, prefersReducedMotion ? 500 : 2500); 
        return () => clearTimeout(addMoreMessagesTimer);
    }
  }, [displayedMessage, consoleLog, currentMessageIndex, prefersReducedMotion]);

  useEffect(() => {
    if (logAreaRef.current) {
      logAreaRef.current.scrollTop = logAreaRef.current.scrollHeight;
    }
  }, [displayedMessage, consoleLog]);

  const systemLoad = Math.min(100, (scrollDepth / 1.5) + (timeOnPage / 10) + (interactionData.fastScrollCount * 2) + (interactionData.totalSkillHovers / 2));

  if (!isVisible && !prefersReducedMotion) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  
  const getGearIndicator = () => {
    if (pathname === '/') return 'N'; // Neutral for Home
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'P'; // Park if no segment
    return lastSegment.charAt(0).toUpperCase();
  };

  const getSystemLoadGradient = (load: number) => {
    const blue = 'hsl(var(--bmw-m-blue))';
    const violet = 'hsl(var(--m-violet-hsl))'; // Ensure this is defined in globals.css
    const red = 'hsl(var(--primary))';
    
    if (load <= 50) {
      const percent = load / 50;
      // Interpolate between blue and violet
      return `linear-gradient(to right, ${blue}, ${violet} ${percent * 100}%)`;
    } else {
      const percent = (load - 50) / 50;
      // Interpolate between violet and red
      return `linear-gradient(to right, ${blue}, ${violet}, ${red} ${percent * 100}%)`;
    }
  };
  
  return (
    <motion.div
      className={cn(
        "hud-console-panel", // Using new class for Aggressive Elegance
        // interactionData.isGhostlineFullModeUnlocked && "sentient-console-uv-glow" // UV Glow for XENOFRAME
      )}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }} // Sync with intro length
    >
      <div className="hud-console-header">
        <h4 className="hud-console-title">M-DRIVE OS</h4>
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
      
      <div className="space-y-1 py-1"> {/* Adjusted spacing */}
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Activity size={12}/> THROTTLE</span>
          <span className="hud-gauge-value">{scrollDepth.toFixed(0)}%</span>
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Server size={12}/> GEAR</span>
          <span className="hud-gauge-value">{getGearIndicator()}</span>
        </div>
         <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Cog size={12}/> SESSION UPTIME</span>
          <span className="hud-gauge-value">{formatTime(timeOnPage)}</span>
        </div>
        <div className="hud-gauge-item">
          <span className="hud-gauge-label"><Power size={12}/> SYSTEM LOAD</span> {/* Changed icon */}
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
