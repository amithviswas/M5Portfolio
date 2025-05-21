
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Server, Cog, Volume2, VolumeX, Eye, EyeOff, Zap, Settings2, Power } from 'lucide-react'; 
import { usePathname } from 'next/navigation';
import { M5DriveToggle } from '@/components/M5StyledComponents'; 
import { cn } from '@/lib/utils';
import { useUserInteraction } from '@/contexts/UserInteractionContext'; // Re-added for toggles

const consoleLogMessagesBase = [
  "SYSTEM ONLINE. M-DRIVE OS v5.8 INITIALIZED.",
  "PERFORMANCE METRICS CALIBRATED.",
  "AWAITING DIRECTIVE...",
  "MONITORING TELEMETRY DATA.",
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
  
  const { interactionData, toggleSoundEnabled, toggleGhostlineMode } = useUserInteraction();

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

    const visibilityTimer = setTimeout(() => setIsVisible(true), 6500);

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

  // Calculate SYSTEM LOAD (previously ENGINE TEMP / AI Energy)
  const systemLoad = Math.min(
    100,
    (scrollDepth / 2) + // Scroll depth contributes up to 50%
    (timeOnPage / 6) +  // Time on page contributes up to 50% for 5 mins (300s / 6 = 50)
    (interactionData.fastScrollCount * 5) + // Each fast scroll adds 5%
    (Object.values(interactionData.skillHoverCounts).reduce((sum, count) => sum + count.count, 0) / 2) // Each skill hover adds 0.5%
  );

  const getSystemLoadGradient = (load: number) => {
    const blue = 'hsl(var(--bmw-m-blue))'; // M Performance Blue
    const violet = 'hsl(var(--m-violet-hsl))'; // M Violet
    const red = 'hsl(var(--primary))'; // Neon Red

    if (load <= 50) {
      const percent = load / 50;
      return `linear-gradient(to right, ${blue} ${percent * 50}%, ${violet} ${percent * 100}%, transparent ${percent * 100}%)`;
    } else {
      const percentFromMid = (load - 50) / 50;
      return `linear-gradient(to right, ${blue}, ${violet} 50%, ${red} ${50 + percentFromMid * 50}%, transparent ${50 + percentFromMid * 50}%)`;
    }
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
  
  const getGearIndicator = () => {
    if (pathname === '/') return 'N'; 
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'P'; 
    return lastSegment.charAt(0).toUpperCase();
  };
  
  return (
    <motion.div
      className={cn(
        "hud-console-panel",
        interactionData.isGhostlineFullModeUnlocked && "uv-glow"
      )}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
    >
      <div className="hud-console-header">
        <h4 className="hud-console-title">M-DRIVE OS</h4> {/* Updated title for theme */}
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
          <span className="hud-gauge-label"><Power size={12}/> SYSTEM LOAD</span> {/* Re-labeled to ENGINE TEMP (or SYSTEM LOAD) */}
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
          <span className="ml-1">SOUND</span>
        </M5DriveToggle>
        <M5DriveToggle
          enabled={interactionData.isGhostlineModeEnabled}
          toggle={toggleGhostlineMode}
          className={cn("hud-console-button", interactionData.isGhostlineModeEnabled && "active-toggle")}
        >
          {interactionData.isGhostlineModeEnabled ? <Eye size={12} /> : <EyeOff size={12} />}
           <span className="ml-1">GHOST</span>
        </M5DriveToggle>
      </div>
    </motion.div>
  );
}

    