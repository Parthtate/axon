// src/hooks/useKeyboardShortcuts.js
import { useEffect } from "react";

/**
 * Keyboard shortcuts for player controls
 * Requirement #14: Space (play/pause), arrows (next/previous)
 */
export const useKeyboardShortcuts = ({
  onPlayPause,
  onNext,
  onPrevious,
  onVolumeUp,
  onVolumeDown,
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if typing in input fields
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          onPlayPause?.();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext?.();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrevious?.();
          break;
        case "ArrowUp":
          e.preventDefault();
          onVolumeUp?.();
          break;
        case "ArrowDown":
          e.preventDefault();
          onVolumeDown?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onPlayPause, onNext, onPrevious, onVolumeUp, onVolumeDown]);
};

export default useKeyboardShortcuts;
