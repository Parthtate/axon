// src/components/TrackListContainer/TrackListContainer.jsx
import { useState, useMemo } from "react";
import TrackItem from "./TrackItem";
import SearchBar from "./SearchBar";
import { searchTracks, sortTracks } from "../../utils/dummyData";
import EmptyState from "../UI/EmptyState";
import { IoSearchSharp } from "react-icons/io5";


/**
 * Track list container with search and sort
 * Requirement #8: Search functionality
 * Bonus: Sorting options
 */
const TrackListContainer = ({ tracks, showSearch = true, emptyState }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Filter and sort tracks
  const displayedTracks = useMemo(() => {
    let filtered = searchQuery
      ? searchTracks(searchQuery).filter((track) =>
          tracks.some((t) => t.id === track.id)
        )
      : tracks;

    if (sortBy !== "default") {
      filtered = sortTracks(filtered, sortBy);
    }

    return filtered;
  }, [tracks, searchQuery, sortBy]);

  return (
    <div className="space-y-4">
      {/* Search and Sort Controls */}
      {showSearch && (
        <div className="flex gap-4 flex-col md:flex-row">
          {/* Search Bar */}
          <div className="flex-1">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search tracks..."
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none cursor-pointer"
          >
            <option value="default">Default Order</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="duration-asc">Shortest First</option>
            <option value="duration-desc">Longest First</option>
          </select>
        </div>
      )}

      {/* Track List */}
      {displayedTracks.length > 0 ? (
        <div className="space-y-1 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {displayedTracks.map((track, index) => (
            <TrackItem key={track.id} track={track} index={index} />
          ))}
        </div>
      ) : (
        emptyState || (
          <EmptyState
            icon={<IoSearchSharp />}
            title="No tracks found"
            description={
              searchQuery
                ? `No results for "${searchQuery}"`
                : "No tracks available"
            }
          />
        )
      )}
    </div>
  );
};

export default TrackListContainer;
