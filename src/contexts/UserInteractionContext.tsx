
"use client";

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface InteractionData {
  sectionVisitCounts: Record<string, number>;
  skillHoverCounts: Record<string, number>;
  isSoundEnabled: boolean;
  isGhostlineModeEnabled: boolean;
  lastVisitTimestamp?: number;
}

interface UserInteractionContextType {
  interactionData: InteractionData;
  setInteractionData: Dispatch<SetStateAction<InteractionData>>;
  incrementSectionVisit: (sectionId: string) => void;
  incrementSkillHover: (skillName: string) => void;
  toggleSoundEnabled: () => void;
  toggleGhostlineMode: () => void;
  hasPreviousInteraction: boolean;
}

const defaultInteractionData: InteractionData = {
  sectionVisitCounts: {},
  skillHoverCounts: {},
  isSoundEnabled: false,
  isGhostlineModeEnabled: false,
  lastVisitTimestamp: undefined,
};

const UserInteractionContext = createContext<UserInteractionContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'userInteractionData_ghostline';

export function UserInteractionProvider({ children }: { children: ReactNode }) {
  const [interactionData, setInteractionData] = useState<InteractionData>(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData) as InteractionData;
          return { ...defaultInteractionData, ...parsedData, lastVisitTimestamp: Date.now() };
        } catch (error) {
          console.error("Error parsing user interaction data from localStorage:", error);
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
        }
        // Update timestamp on initial load if there's data, or set initial if none.
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
    setInteractionData(prev => ({
      ...prev,
      skillHoverCounts: {
        ...prev.skillHoverCounts,
        [skillName]: (prev.skillHoverCounts[skillName] || 0) + 1,
      },
    }));
  }, []);

  const toggleSoundEnabled = useCallback(() => {
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

  return (
    <UserInteractionContext.Provider value={{ 
        interactionData, 
        setInteractionData,
        incrementSectionVisit,
        incrementSkillHover,
        toggleSoundEnabled,
        toggleGhostlineMode,
        hasPreviousInteraction
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
