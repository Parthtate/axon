// src/components/AudioPlayer/ProgressBar.jsx
import { useAudioPlayer } from "../../context/AudioPlayerContext";
import { formatDuration } from "../../utils/dummyData";

/**
 * Progress bar with time display - shows current playback position
 */
const ProgressBar = () => {
  const { currentTime, duration, seekTo } = useAudioPlayer();

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  const handleChange = (e) => {
    const newTime = parseFloat(e.target.value);
    seekTo(newTime);
  };

  return (
    <div className="w-full px-2">
      {/* Time Display */}
      <div className="flex justify-between text-xs text-gray-400 mb-3 font-mono">
        <span className="text-white">{formatDuration(currentTime)}</span>
        <span>{formatDuration(duration)}</span>
      </div>

      {/* Progress Slider */}
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleChange}
        className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer progress-slider"
        style={{
          background: `linear-gradient(to right, white 0%, white ${progressPercentage}%, #374151 ${progressPercentage}%, #374151 100%)`
        }}
      />
    </div>
  );
};

export default ProgressBar;
