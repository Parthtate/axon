import { useState } from "react";
import { useAudioPlayer } from "../../context/AudioPlayerContext";
import { TiVolumeMute } from "react-icons/ti";
import { IoVolumeLowOutline } from "react-icons/io5";
import { IoVolumeMediumOutline } from "react-icons/io5";

const VolumeControl = () => {
  const { volume, changeVolume } = useAudioPlayer();
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    changeVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      changeVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      changeVolume(0);
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <TiVolumeMute />;
    if (volume < 0.5) return <IoVolumeLowOutline />;
    return <IoVolumeMediumOutline />;
  };

  return (
    <div className="flex items-center gap-2">
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="text-2xl text-gray-400 hover:text-white hover:scale-110 transition-all"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #22c55e 0%, #22c55e ${
            volume * 100
          }%, #374151 ${volume * 100}%, #374151 100%)`,
        }}
      />
    </div>
  );
};

export default VolumeControl;
