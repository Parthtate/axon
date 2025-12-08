// src/hooks/useAudioPlayer.js
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

/**
 * Extended hook with additional utilities
 */
export const useAudioPlayerWithUtils = () => {
  const audioPlayer = useAudioPlayer();

  // Calculate progress percentage
  const progressPercentage = audioPlayer.duration
    ? (audioPlayer.currentTime / audioPlayer.duration) * 100
    : 0;

  // Check if track is near end (last 5 seconds)
  const isNearEnd = audioPlayer.duration
    ? audioPlayer.duration - audioPlayer.currentTime < 5
    : false;

  // Format current time
  const formattedCurrentTime = formatTime(audioPlayer.currentTime);
  const formattedDuration = formatTime(audioPlayer.duration);

  // Get next track
  const nextTrack =
    audioPlayer.allTracks?.[
      (audioPlayer.currentTrackIndex + 1) % audioPlayer.allTracks.length
    ];

  // Get previous track
  const previousTrack =
    audioPlayer.allTracks?.[
      audioPlayer.currentTrackIndex === 0
        ? audioPlayer.allTracks.length - 1
        : audioPlayer.currentTrackIndex - 1
    ];

  return {
    ...audioPlayer,
    progressPercentage,
    isNearEnd,
    formattedCurrentTime,
    formattedDuration,
    nextTrack,
    previousTrack,
  };
};

// Helper function
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default useAudioPlayer;
