import { useAudioPlayer } from "../../context/AudioPlayerContext";
import { useFavourites } from "../../context/FavouritesContext";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";

/**
 * Main player component - displays current track and controls
 */
const Player = () => {
  const { currentTrack, isPlaying } = useAudioPlayer();
  const { isFavourite, toggleFavourite } = useFavourites();

  if (!currentTrack) return null;

  const isFav = isFavourite(currentTrack.id);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center gap-6 mb-6">
        <div className="relative group">
          <img
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            className={`w-32 h-32 rounded-lg shadow-lg object-cover transition-transform ${
              isPlaying ? "animate-pulse-slow" : ""
            }`}
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">
            {currentTrack.title}
          </h2>
          <p className="text-gray-400 text-lg">
            {currentTrack.artistName || "Unknown Artist"}
          </p>

          <button
            onClick={() => toggleFavourite(currentTrack.id)}
            className="mt-3 text-2xl hover:scale-110 transition-transform"
            title={isFav ? "Remove from favourites" : "Add to favourites"}
          >
            {isFav ? <FcLike /> : <FcLikePlaceholder />}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <ProgressBar />
      </div>

      <div className="mb-4">
        <PlayerControls />
      </div>

      <div className="flex justify-center">
        <VolumeControl />
      </div>
    </div>
  );
};

export default Player;
