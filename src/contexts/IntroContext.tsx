"use client";
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

interface IntroContextType {
  introCompleted: boolean;
  setIntroCompleted: Dispatch<SetStateAction<boolean>>;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <IntroContext.Provider value={{ introCompleted, setIntroCompleted }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntroContext() {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error('useIntroContext must be used within an IntroProvider');
  }
  return context;
}
