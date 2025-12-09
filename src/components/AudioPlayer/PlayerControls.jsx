import { useAudioPlayer } from "../../context/AudioPlayerContext";
import LoadingSpinner from "../UI/LoadingSpinner";
import { LuRepeat2 } from "react-icons/lu";
import { LuRepeat1 } from "react-icons/lu";
import { TbRepeatOff } from "react-icons/tb";
import { TiArrowShuffle } from "react-icons/ti";
import { IoPauseSharp } from "react-icons/io5";
import { IoPlaySharp } from "react-icons/io5";
import { TbPlayerSkipBack } from "react-icons/tb";
import { TbPlayerSkipForward } from "react-icons/tb"; 

/**
 * Main player controls - play, pause, next, previous, shuffle, repeat
 */
const PlayerControls = () => {
  const {
    isPlaying,
    isLoading,
    isShuffle,
    repeatMode,
    togglePlayPause,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
  } = useAudioPlayer();

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case "one":
        return <LuRepeat1 />; 
      case "all":
        return <LuRepeat2 />; 
      default:
        return <TbRepeatOff />; 
    }
  };

  return (
    <div className="flex items-center justify-center gap-6">
      {/* Shuffle Button */}
      <button
        onClick={toggleShuffle}
        className={`text-2xl transition-all duration-200 ${ isShuffle
            ? "text-green-400 scale-110"
            : "text-gray-500 hover:text-gray-300"
        }`}
        title="Shuffle"
      >
        <TiArrowShuffle />
      </button>

      {/* Previous Button */}
      <button
        onClick={playPrevious}
        className="text-3xl text-gray-300 hover:text-white hover:scale-110 transition-all duration-200"
        title="Previous"
      >
        <TbPlayerSkipBack />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        disabled={isLoading}
        className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isLoading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <span className="text-3xl text-black">
            {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
          </span>
        )}
      </button>

      {/* Next Button */}
      <button
        onClick={playNext}
        className="text-3xl text-gray-300 hover:text-white hover:scale-110 transition-all duration-200"
        title="Next"
      >
        <TbPlayerSkipForward />
      </button>

      {/* Repeat Button */}
      <button
        onClick={toggleRepeat}
        className={`text-2xl transition-all duration-200 ${
          repeatMode !== "off"
            ? "text-green-400 scale-110"
            : "text-gray-500 hover:text-gray-300"
        }`}
        title={`Repeat: ${repeatMode}`}
      >
        {getRepeatIcon()}
      </button>
    </div>
  );
};

export default PlayerControls;
