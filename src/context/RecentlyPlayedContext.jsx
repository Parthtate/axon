// src/context/RecentlyPlayedContext.jsx
import { createContext, useContext, useCallback } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

/**
 * Manages recently played tracks using sessionStorage
 * Requirement #9: Store last 10 tracks in SessionStorage
 */
const RecentlyPlayedContext = createContext(undefined);

export const RecentlyPlayedProvider = ({ children }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useSessionStorage(
    "recentlyPlayed",
    []
  );

  const addToRecentlyPlayed = useCallback(
    (track) => {
      setRecentlyPlayed((prev) => {
        // Remove if already exists (avoid duplicates)
        const filtered = prev.filter((t) => t.id !== track.id);

        // Add to beginning and keep only last 10
        const updated = [track, ...filtered].slice(0, 10);

        return updated;
      });
    },
    [setRecentlyPlayed]
  );

  const clearRecentlyPlayed = () => {
    setRecentlyPlayed([]);
  };

  const value = {
    recentlyPlayed,
    addToRecentlyPlayed,
    clearRecentlyPlayed,
  };

  return (
    <RecentlyPlayedContext.Provider value={value}>
      {children}
    </RecentlyPlayedContext.Provider>
  );
};

export const useRecentlyPlayed = () => {
  const context = useContext(RecentlyPlayedContext);
  if (context === undefined) {
    throw new Error(
      "useRecentlyPlayed must be used within RecentlyPlayedProvider"
    );
  }
  return context;
};

export default RecentlyPlayedContext;
