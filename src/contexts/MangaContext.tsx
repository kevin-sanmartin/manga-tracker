"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface MangaContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export const useMangaContext = () => {
  const context = useContext(MangaContext);
  if (!context) {
    throw new Error("useMangaContext must be used within a MangaProvider");
  }
  return context;
};

interface MangaProviderProps {
  children: ReactNode;
}

export const MangaProvider = ({ children }: MangaProviderProps) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <MangaContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </MangaContext.Provider>
  );
};