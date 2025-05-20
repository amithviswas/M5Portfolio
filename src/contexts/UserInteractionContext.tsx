
"use client";

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import soundService from '@/services/soundService'; // Import soundService

interface SkillHoverDetail {
  count: number;
  lastTimestamp: number;
}

interface InteractionData {
  sectionVisitCounts: Record<string, number>;
  skillHoverCounts: Record<string, SkillHoverDetail>; // Updated to store SkillHoverDetail
  isSoundEnabled: boolean;
  isGhostlineModeEnabled: boolean;
  lastVisitTimestamp?: number;
  fastScrollCount: number;
  isGhostlineFullModeUnlocked: boolean;
}

interface UserInteractionContextType {
  interactionData: InteractionData;
  setInteractionData: Dispatch<SetStateAction<InteractionData>>;
  incrementSectionVisit: (sectionId: string) => void;
  incrementSkillHover: (skillName: string) => void;
  toggleSoundEnabled: () => void;
  toggleGhostlineMode: () => void;
  hasPreviousInteraction: boolean;
  logFastScroll: () => void;
  unlockGhostlineFullMode: () => void;
  getSkillHoverDetail: (skillName: string) => SkillHoverDetail | undefined;
}

const defaultInteractionData: InteractionData = {
  sectionVisitCounts: {},
  skillHoverCounts: {},
  isSoundEnabled: false, // Default sound to off
  isGhostlineModeEnabled: false,
  lastVisitTimestamp: undefined,
  fastScrollCount: 0,
  isGhostlineFullModeUnlocked: false,
};

const UserInteractionContext = createContext<UserInteractionContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'userInteractionData_xenofram_v2'; // Updated key for new structure

export function UserInteractionProvider({ children }: { children: ReactNode }) {
  const [interactionData, setInteractionData] = useState<InteractionData>(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData) as Partial<InteractionData>;
          // Merge stored data with defaults to ensure all keys are present
          return { 
            ...defaultInteractionData, 
            ...parsedData,
            skillHoverCounts: parsedData.skillHoverCounts || {}, // Ensure skillHoverCounts is an object
            sectionVisitCounts: parsedData.sectionVisitCounts || {}, // Ensure sectionVisitCounts is an object
            lastVisitTimestamp: Date.now() 
          };
        } catch (error) {
          console.error("XENOFRAME: Error parsing user interaction data from localStorage:", error);
          return { ...defaultInteractionData, lastVisitTimestamp: Date.now() };
        }
      }
    }
    return { ...defaultInteractionData, lastVisitTimestamp: Date.now() };
  });
  const [hasPreviousInteraction, setHasPreviousInteraction] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
            setHasPreviousInteraction(true);
            // Attempt to start audio context if sound was previously enabled
            try {
              const parsed = JSON.parse(storedData) as Partial<InteractionData>;
              if (parsed.isSoundEnabled && !soundService.isAudioContextStarted()) {
                console.log("XENOFRAME: Attempting to resume AudioContext on load as sound was enabled.");
                // Tone.start() should ideally be tied to a more direct user interaction
                // but for resuming state, this is a common pattern.
                // Might still require a click on some browsers.
                soundService.startContext().catch(e => console.warn("AudioContext auto-start on load failed, user interaction needed.", e));
              }
            } catch (e) {
              console.error("Error parsing stored sound settings", e);
            }
        }
        const currentData = storedData ? JSON.parse(storedData) : {};
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...currentData, lastVisitTimestamp: Date.now() }));
    }
  }, []);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(interactionData));
    }
  }, [interactionData]);

  const incrementSectionVisit = useCallback((sectionId: string) => {
    setInteractionData(prev => ({
      ...prev,
      sectionVisitCounts: {
        ...prev.sectionVisitCounts,
        [sectionId]: (prev.sectionVisitCounts[sectionId] || 0) + 1,
      },
    }));
  }, []);

  const incrementSkillHover = useCallback((skillName: string) => {
    setInteractionData(prev => {
      const currentDetail = prev.skillHoverCounts[skillName] || { count: 0, lastTimestamp: 0 };
      return {
        ...prev,
        skillHoverCounts: {
          ...prev.skillHoverCounts,
          [skillName]: {
            count: currentDetail.count + 1,
            lastTimestamp: Date.now(),
          },
        },
      };
    });
  }, []);

  const toggleSoundEnabled = useCallback(async () => {
    if (typeof window !== 'undefined' && !soundService.isAudioContextStarted()) {
      try {
        await soundService.startContext(); // Ensure Tone.start() is called on user gesture
      } catch (e) {
        console.error("XENOFRAME: Failed to start AudioContext on sound toggle.", e);
        // Potentially show a message to the user that interaction is needed
        // For now, we'll proceed to toggle the state.
      }
    }
    setInteractionData(prev => ({
      ...prev,
      isSoundEnabled: !prev.isSoundEnabled,
    }));
  }, []);

  const toggleGhostlineMode = useCallback(() => {
    setInteractionData(prev => ({
      ...prev,
      isGhostlineModeEnabled: !prev.isGhostlineModeEnabled,
    }));
  }, []);

  const logFastScroll = useCallback(() => {
    setInteractionData(prev => ({
      ...prev,
      fastScrollCount: prev.fastScrollCount + 1,
    }));
  }, []);

  const unlockGhostlineFullMode = useCallback(() => {
    // Example condition: unlock after 5 total skill hovers across any skills
    const totalHovers = Object.values(interactionData.skillHoverCounts).reduce((sum, detail) => sum + detail.count, 0);
    if (totalHovers > 2 || interactionData.isGhostlineFullModeUnlocked) { // Make it easier to trigger for testing
       console.log("XENOFRAME: Ghostline Full Mode Unlocked Criteria Met.");
       setInteractionData(prev => ({
        ...prev,
        isGhostlineFullModeUnlocked: true,
      }));
    } else {
      console.log(`XENOFRAME: Ghostline Full Mode criteria not met. Total hovers: ${totalHovers}`);
    }
  }, [interactionData.skillHoverCounts, interactionData.isGhostlineFullModeUnlocked]);


  const getSkillHoverDetail = useCallback((skillName: string) => {
    return interactionData.skillHoverCounts[skillName];
  }, [interactionData.skillHoverCounts]);


  return (
    <UserInteractionContext.Provider value={{ 
        interactionData, 
        setInteractionData,
        incrementSectionVisit,
        incrementSkillHover,
        toggleSoundEnabled,
        toggleGhostlineMode,
        hasPreviousInteraction,
        logFastScroll,
        unlockGhostlineFullMode,
        getSkillHoverDetail,
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
