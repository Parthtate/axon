import { useContext } from "react";
import AudioPlayerContext from "../context/AudioPlayerContext";

/**
 * Custom hook to access audio player context
 * Provides all audio player functionality and state
 */
export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);

  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return context;
};

export default useAudioPlayer;
