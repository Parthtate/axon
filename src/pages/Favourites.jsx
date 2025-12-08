// src/pages/Favourites.jsx
import { useMemo } from "react";
import { useFavourites } from "../context/FavouritesContext";
import { tracks } from "../utils/dummyData";
import TrackList from "../components/TrackList/TrackListContainer";
import EmptyState from "../components/UI/EmptyState";
import { useNavigate } from "react-router-dom";
import { RiDislikeLine } from "react-icons/ri";
import { FcLikePlaceholder } from "react-icons/fc";

/**
 * Favourites page
 * Requirement #10: Display favourite tracks from LocalStorage
 * Requirement #15: Elegant empty state
 */
const Favourites = () => {
  const { favourites, clearFavourites } = useFavourites();
  const navigate = useNavigate();

  // Get full track objects for favourite IDs
  const favouriteTracks = useMemo(() => {
    return favourites
      .map((id) => tracks.find((track) => track.id === id))
      .filter(Boolean);
  }, [favourites]);

  const emptyState = (
    <EmptyState
      icon={<RiDislikeLine />}
      title="No favourites yet"
      description="Start adding tracks to your favourites by clicking the heart icon on any song."
      action={
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-400 transition-colors"
        >
          Browse Tracks
        </button>
      }
    />
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <FcLikePlaceholder /> Favourites
          </h1>
          <p className="text-gray-400">
            {favouriteTracks.length}{" "}
            {favouriteTracks.length === 1 ? "song" : "songs"}
          </p>
        </div>

        {/* Clear All Button */}
        {favouriteTracks.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("Clear all favourites?")) {
                clearFavourites();
              }
            }}
            className="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg hover:bg-red-900 hover:bg-opacity-20 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Track List */}
      <div className="bg-gray-800 rounded-lg p-6">
        <TrackList
          tracks={favouriteTracks}
          showSearch={favouriteTracks.length > 5}
          emptyState={emptyState}
        />
      </div>
    </div>
  );
};

export default Favourites;
