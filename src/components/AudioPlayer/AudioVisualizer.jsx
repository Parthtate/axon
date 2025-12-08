// src/components/AudioPlayer/AudioVisualizer.jsx
import { useEffect, useState } from "react";
import { useAudioPlayer } from "../../context/AudioPlayerContext";

/**
 * Simple audio visualizer - animated bars
 * Requirement #13: Simple audio visual indicator (waveform or equalizer)
 */
const AudioVisualizer = () => {
  const { isPlaying } = useAudioPlayer();
  const [bars] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="flex items-end gap-1 h-8">
      {bars.map((bar, index) => (
        <div
          key={bar}
          className={`w-1 bg-gradient-to-t from-green-600 to-green-400 rounded-full transition-all duration-300 ${
            isPlaying ? "animate-pulse" : "h-2"
          }`}
          style={{
            height: isPlaying ? `${Math.random() * 100 + 20}%` : "8px",
            animationDelay: `${index * 0.1}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
