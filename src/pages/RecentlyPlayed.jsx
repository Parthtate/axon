import { useRecentlyPlayed } from "../context/RecentlyPlayedContext";
import TrackList from "../components/TrackList/TrackListContainer";
import EmptyState from "../components/UI/EmptyState";
import { useNavigate } from "react-router-dom";
import { LuClock2 } from "react-icons/lu";

const RecentlyPlayed = () => {
  const { recentlyPlayed, clearRecentlyPlayed } = useRecentlyPlayed();
  const navigate = useNavigate();

  const emptyState = (
    <EmptyState
      icon={<LuClock2 />}
      title="No recent tracks"
      description="Tracks you play will appear here. Start listening to build your history!"
      action={
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-400 transition-colors"
        >
          Start Listening
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
            <LuClock2 /> Recently Played
          </h1>
          <p className="text-gray-400">
            Last {recentlyPlayed.length}{" "}
            {recentlyPlayed.length === 1 ? "track" : "tracks"}
          </p>
        </div>

        {/* Clear Button */}
        {recentlyPlayed.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("Clear recently played history?")) {
                clearRecentlyPlayed();
              }
            }}
            className="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg hover:bg-red-900 hover:bg-opacity-20 transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Info Banner */}
      {recentlyPlayed.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">
            Recently played tracks are stored for this session only and will
            clear when you close the browser.
          </p>
        </div>
      )}

      {/* Track List */}
      <div className="bg-gray-800 rounded-lg p-6">
        <TrackList
          tracks={recentlyPlayed}
          showSearch={false}
          emptyState={emptyState}
        />
      </div>
    </div>
  );
};

export default RecentlyPlayed;
