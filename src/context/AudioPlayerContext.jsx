// src/context/AudioPlayerContext.jsx
import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { tracks } from "../utils/dummyData";
import { useRecentlyPlayed } from "./RecentlyPlayedContext";

/**
 * Global audio controller - ensures music doesn't stop on navigation
 * Requirement #7: Music should NOT stop when navigating between tabs
 * Requirement #11: Global audio controller for consistent playback
 */
const AudioPlayerContext = createContext(undefined);

export const AudioPlayerProvider = ({ children }) => {
  const { addToRecentlyPlayed } = useRecentlyPlayed();

  // Core state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // 'off', 'one', 'all'
  const [isLoading, setIsLoading] = useState(false);

  // Refs - persist across renders and route changes
  const audioRef = useRef(new Audio());
  const animationRef = useRef(null);

  // Current track
  const currentTrack = tracks[currentTrackIndex];

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    
    // Performance optimization: Preload and specific settings
    audio.preload = "auto";
    audio.crossOrigin = "anonymous";

    if (!currentTrack) return;

    const wasPlaying = isPlaying;
    const isSameTrack = audio.src.includes(currentTrack.musicUrl);

    // Only reset if it's a new track
    if (!isSameTrack) {
      setIsLoading(true);
      audio.src = currentTrack.musicUrl;
      audio.volume = volume;
      setCurrentTime(0);
      audio.load(); // Explicitly request loading
    }

    // Update duration when metadata loads
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      // Only auto-play if we were playing and it's a new track
      if (wasPlaying && !isSameTrack) {
        // Use a small timeout to ensure the browser execution stack is clear
        setTimeout(() => {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.error("Auto-play prevented or failed:", error);
                    setIsPlaying(false);
                });
            }
        }, 0);
      }
    };

    const handleError = (e) => {
      console.error("Audio loading error:", e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    // Update current time as audio plays
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    // Events
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleCanPlay); // Trigger sooner than canplaythrough
    audio.addEventListener("error", handleError);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    // Add to recently played only for new tracks
    if (!isSameTrack) {
      addToRecentlyPlayed(currentTrack);
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentTrackIndex, currentTrack]);

  // Update progress bar animation
  const updateProgress = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  // Play/Pause toggle
  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      audio
        .play()
        .then(() => {
          animationRef.current = requestAnimationFrame(updateProgress);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, updateProgress]);

  // Play next track
  const playNext = useCallback(() => {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * tracks.length);
      } while (randomIndex === currentTrackIndex && tracks.length > 1);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) =>
        prev === tracks.length - 1 ? 0 : prev + 1
      );
    }
  }, [isShuffle, currentTrackIndex]);

  // Play previous track
  const playPrevious = useCallback(() => {
    if (currentTime > 3) {
      // If more than 3 seconds played, restart current track
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      setCurrentTrackIndex((prev) =>
        prev === 0 ? tracks.length - 1 : prev - 1
      );
    }
  }, [currentTime]);

  // Play specific track
  const playTrack = useCallback((index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  }, []);

  // Seek to specific time
  const seekTo = useCallback((time) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  // Change volume
  const changeVolume = useCallback((newVolume) => {
    const vol = Math.max(0, Math.min(1, newVolume));
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, []);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  // Toggle repeat
  const toggleRepeat = useCallback(() => {
    const modes = ["off", "all", "one"];
    setRepeatMode((prev) => {
      const currentIndex = modes.indexOf(prev);
      return modes[(currentIndex + 1) % modes.length];
    });
  }, []);

  // Handle track end
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else if (
        repeatMode === "all" ||
        currentTrackIndex < tracks.length - 1
      ) {
        playNext();
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [repeatMode, currentTrackIndex, playNext]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const value = {
    // State
    currentTrack,
    currentTrackIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
    isShuffle,
    repeatMode,
    isLoading,
    allTracks: tracks,

    // Methods
    togglePlayPause,
    playNext,
    playPrevious,
    playTrack,
    seekTo,
    changeVolume,
    toggleShuffle,
    toggleRepeat,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return context;
};

export default AudioPlayerContext;
