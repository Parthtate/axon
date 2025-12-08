// src/components/MiniPlayer.jsx
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { useFavourites } from "../context/FavouritesContext";
import { FcLikePlaceholder } from "react-icons/fc";
import { RiDislikeLine } from "react-icons/ri";
import { MdOutlinePlayCircle } from "react-icons/md";
import { IoPlaySkipForward } from "react-icons/io5";
import { IoPauseSharp } from "react-icons/io5";


/**
 * Mini player - pinned at bottom
 * Bonus Feature: Mini-player view
 */
const MiniPlayer = ({ onExpand }) => {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    playNext,
    currentTime,
    duration,
  } = useAudioPlayer();
  const { isFavourite, toggleFavourite } = useFavourites();

  if (!currentTrack) return null;

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const isFav = isFavourite(currentTrack.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-lg border-t border-gray-800 z-40">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-800">
        <div
          className="h-full bg-linear-to-r from-purple-500 to-pink-500 transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Mini Player Content */}
      <div className="flex items-center gap-4 p-3 px-4">
        {/* Track Info (clickable to expand) */}
        <div
          className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
          onClick={onExpand}
        >
          <img
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-medium text-sm truncate">
              {currentTrack.title}
            </h4>
            <p className="text-gray-400 text-xs truncate">
              {currentTrack.artistName || "Unknown Artist"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Favourite */}
          <button
            onClick={() => toggleFavourite(currentTrack.id)}
            className="text-xl hover:scale-110 transition-transform hidden sm:block"
          >
            {isFav ? <FcLikePlaceholder />: <RiDislikeLine />}
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlayPause}
            className="text-2xl hover:scale-110 transition-transform"
          >
            {isPlaying ? <IoPauseSharp /> : <MdOutlinePlayCircle />}
          </button>

          {/* Next */}
          <button
            onClick={playNext}
            className="text-xl hover:scale-110 transition-transform"
          >
            <IoPlaySkipForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
