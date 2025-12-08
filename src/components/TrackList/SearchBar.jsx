// src/components/TrackList/SearchBar.jsx
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

/**
 * Search bar with clear button
 * Requirement #8: Search functionality based on track title
 */
const SearchBar = ({ onSearch, placeholder = "Search tracks..." }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">
        <IoSearchSharp />
      </span>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-gray-800 text-white placeholder-gray-500 pl-12 pr-12 py-3 rounded-lg focus:outline-none transition"
      />

      {/* Clear Button */}
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xl transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
