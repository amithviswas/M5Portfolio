
"use client";

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { soundService } from '@/services/soundService'; // type import

interface SkillHoverData {
  count: number;
  lastTimestamp: number;
}

interface InteractionData {
  isSoundEnabled: boolean;
  isGhostlineModeEnabled: boolean;
  isGhostlineFullModeUnlocked: boolean;
  fastScrollCount: number;
  sectionVisitCounts: Record<string, number>;
  skillHoverCounts: Record<string, SkillHoverData>;
  // Add other interaction data points as needed
}

interface UserInteractionContextType {
  interactionData: InteractionData;
  setInteractionData: Dispatch<SetStateAction<InteractionData>>;
  toggleSoundEnabled: () => void;
  incrementSkillHover: (skillName: string) => void;
  logFastScroll: () => void;
  incrementSectionVisit: (sectionId: string) => void;
  unlockGhostlineFullMode: () => void;
  toggleGhostlineMode: () => void;
}

const initialInteractionData: InteractionData = {
  isSoundEnabled: false,
  isGhostlineModeEnabled: false,
  isGhostlineFullModeUnlocked: false,
  fastScrollCount: 0,
  sectionVisitCounts: {},
  skillHoverCounts: {},
};

const UserInteractionContext = createContext<UserInteractionContextType | undefined>(undefined);

export function UserInteractionProvider({ children }: { children: ReactNode }) {
  const [interactionData, setInteractionData] = useState<InteractionData>(initialInteractionData);

  useEffect(() => {
    // Load sound preference from localStorage
    const storedSoundPreference = localStorage.getItem('isSoundEnabled');
    if (storedSoundPreference !== null) {
      setInteractionData(prev => ({ ...prev, isSoundEnabled: JSON.parse(storedSoundPreference) }));
    }
    // Other preferences like Ghostline mode could be loaded here
  }, []);

  const toggleSoundEnabled = useCallback(() => {
    setInteractionData(prev => {
      const newSoundState = !prev.isSoundEnabled;
      localStorage.setItem('isSoundEnabled', JSON.stringify(newSoundState));
      // if (newSoundState && typeof window !== "undefined" && soundService) {
      //   soundService.startContext(); // Ensure Tone.js context is started on user interaction
      // }
      return { ...prev, isSoundEnabled: newSoundState };
    });
  }, []);

  const incrementSkillHover = useCallback((skillName: string) => {
    setInteractionData(prev => ({
      ...prev,
      skillHoverCounts: {
        ...prev.skillHoverCounts,
        [skillName]: {
          count: (prev.skillHoverCounts[skillName]?.count || 0) + 1,
          lastTimestamp: Date.now(),
        },
      },
    }));
  }, []);

  const logFastScroll = useCallback(() => {
    setInteractionData(prev => ({ ...prev, fastScrollCount: prev.fastScrollCount + 1 }));
  }, []);

  const incrementSectionVisit = useCallback((sectionId: string) => {
    setInteractionData(prev => ({
      ...prev,
      sectionVisitCounts: {
        ...prev.sectionVisitCounts,
        [sectionId]: (prev.sectionVisitCounts[sectionId] || 0) + 1,
      },
    }));
  }, []);
  
  const unlockGhostlineFullMode = useCallback(() => {
    setInteractionData(prev => ({ ...prev, isGhostlineFullModeUnlocked: true }));
  }, []);

  const toggleGhostlineMode = useCallback(() => {
    setInteractionData(prev => ({ ...prev, isGhostlineModeEnabled: !prev.isGhostlineModeEnabled }));
  }, []);


  return (
    <UserInteractionContext.Provider value={{ 
        interactionData, 
        setInteractionData, 
        toggleSoundEnabled, 
        incrementSkillHover,
        logFastScroll,
        incrementSectionVisit,
        unlockGhostlineFullMode,
        toggleGhostlineMode
    }}>
      {children}
    </UserInteractionContext.Provider>
  );
}

export function useUserInteraction() {
  const context = useContext(UserInteractionContext);
  if (context === undefined) {
    throw new Error('useUserInteraction must be used within a UserInteractionProvider');
  }
  return context;
}
