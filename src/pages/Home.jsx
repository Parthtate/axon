import { tracks } from "../utils/dummyData";
import TrackList from "../components/TrackList/TrackListContainer";
import Player from "../components/AudioPlayer/Player";

const Home = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">All Tracks</h1>
        <p className="text-gray-400">{tracks.length} songs available</p>
      </div>
      <Player />
      <div className="bg-gray-800 rounded-lg p-6">
        <TrackList tracks={tracks} showSearch={true} />
      </div>
    </div>
  );
};

export default Home;
