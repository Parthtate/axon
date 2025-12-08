// src/components/TrackList/TrackItem.jsx
import { useAudioPlayer } from "../../context/AudioPlayerContext";
import { useFavourites } from "../../context/FavouritesContext";
import { formatDuration } from "../../utils/dummyData";
import AudioVisualizer from "../AudioPlayer/AudioVisualizer";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";

/**
 * Individual track item in list
 */
const TrackItem = ({ track, index }) => {
  const { currentTrack, isPlaying, playTrack } = useAudioPlayer();
  const { isFavourite, toggleFavourite } = useFavourites();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isFav = isFavourite(track.id);

  const handlePlay = () => {
    playTrack(index);
  };

  return (
    <div
      className={`group flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isCurrentTrack 
          ? "bg-gray-800" 
          : "hover:bg-gray-800"
      }`}
      onClick={handlePlay}
    >
      {/* Track Number / Playing Indicator */}
      <div className="w-8 text-center">
        {isCurrentTrack && isPlaying ? (
          <div className="scale-50">
            <AudioVisualizer />
          </div>
        ) : (
          <span className={`${
            isCurrentTrack ? "text-green-400 font-semibold" : "text-gray-400 group-hover:text-white"
          }`}>
            {index + 1}
          </span>
        )}
      </div>

      {/* Thumbnail */}
      <img
        src={track.thumbnail}
        alt={track.title}
        className="w-14 h-14 rounded object-cover shadow-md"
        loading="lazy"
      />

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h4
          className={`font-semibold truncate ${
            isCurrentTrack ? "text-green-400" : "text-white"
          }`}
        >
          {track.title}
        </h4>
        <p className="text-sm text-gray-400 truncate">
          {track.artistName || "Unknown Artist"}
        </p>
      </div>

      {/* Duration */}
      <span className="text-sm text-gray-400 hidden md:block">
        {formatDuration(track.duration)}
      </span>

      {/* Favourite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavourite(track.id);
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-xl hover:scale-110"
        title={isFav ? "Remove from favourites" : "Add to favourites"}
      >
        {isFav ? <FcLike /> : <FcLikePlaceholder />}
      </button>
    </div>
  );
};

export default TrackItem;
