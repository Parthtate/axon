// src/pages/Home.jsx
import { tracks } from "../utils/dummyData";
import TrackList from "../components/TrackList/TrackListContainer";
import Player from "../components/AudioPlayer/Player";

/**
 * Home page - displays all tracks
 */
const Home = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">All Tracks</h1>
        <p className="text-gray-400">{tracks.length} songs available</p>
      </div>

      {/* Main Player */}
      <Player />

      {/* Track List */}
      <div className="bg-gray-800 rounded-lg p-6">
        <TrackList tracks={tracks} showSearch={true} />
      </div>
    </div>
  );
};

export default Home;
