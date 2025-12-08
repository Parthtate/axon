import { useAudioPlayer } from "../context/AudioPlayerContext";
import { useFavourites } from "../context/FavouritesContext";
import { formatDuration } from "../utils/dummyData";
import { IoPlaySharp, IoPauseSharp, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";

/**
 * Mini Player - Sticky bottom player bar
 * Displays when a track is playing
 */
function MiniPlayer({ onExpand }) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
  } = useAudioPlayer();
  
  const { isFavourite, toggleFavourite } = useFavourites();

  if (!currentTrack) return null;

  const isFav = isFavourite(currentTrack.id);
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black z-40 animate-slide-up">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800 cursor-pointer group">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Mini Player Content */}
      <div className="max-w-screen-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0 max-w-md">
            <img
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              className="flex-shrink-0 w-14 h-14 rounded object-cover shadow-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={onExpand}
              style={{ display: 'block', minWidth: '56px', minHeight: '56px' }}
            />
            <div className="flex-1 min-w-0 overflow-hidden">
              <h4 className="text-white font-semibold truncate hover:text-gray-300 cursor-pointer transition-colors" onClick={onExpand}>
                {currentTrack.title}
              </h4>
              <p className="text-gray-400 text-sm truncate">
                {currentTrack.artistName || "Unknown Artist"}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite(currentTrack.id);
              }}
              className="hidden md:block text-xl hover:scale-110 transition-transform flex-shrink-0"
              title={isFav ? "Remove from favourites" : "Add to favourites"}
            >
              {isFav ? <FcLike /> : <FcLikePlaceholder />}
            </button>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={playPrevious}
              className="text-2xl text-gray-400 hover:text-white transition-colors hidden md:block"
              title="Previous"
            >
              <IoPlaySkipBack />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 hover:scale-105 transition-all"
              title={isPlaying ? "Pause" : "Play"}
            >
              <span className="text-2xl text-black">
                {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
              </span>
            </button>

            <button
              onClick={playNext}
              className="text-2xl text-gray-400 hover:text-white transition-colors hidden md:block"
              title="Next"
            >
              <IoPlaySkipForward />
            </button>
          </div>

          {/* Time Display */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400 font-mono min-w-[100px] justify-end">
            <span className="text-white">{formatDuration(currentTime)}</span>
            <span>/</span>
            <span>{formatDuration(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniPlayer;