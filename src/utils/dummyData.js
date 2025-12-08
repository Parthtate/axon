// src/utils/dummyData.js

const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;

// Helper to get public URL
const getPublicUrl = (bucket, filename) => {
  if (!PROJECT_URL) {
    console.error("❌ VITE_SUPABASE_URL is missing in .env file");
    return "";
  }
  
  // Validate URL format
  if (!PROJECT_URL.startsWith('https://') || !PROJECT_URL.includes('supabase.co')) {
    console.error("❌ Invalid VITE_SUPABASE_URL format:", PROJECT_URL);
    console.error("Expected format: https://[project-ref].supabase.co");
    return "";
  }
  
  const url = `${PROJECT_URL}/storage/v1/object/public/${bucket}/${filename}`;
  
  // Log first generated URL for debugging
  if (!getPublicUrl.logged) {
    console.log("✅ Supabase Storage URL format:", url);
    console.log("📁 Using buckets: 'images' and 'audio'");
    getPublicUrl.logged = true;
  }
  
  return url;
};

export const tracks = [
  {
    id: 1,
    title: "Floating Garden",
    artistName: "Aventure",
    thumbnail: getPublicUrl("images", "file1.webp"),
    musicUrl: getPublicUrl("audio", "01_floatinggarden.mp3"),
    duration: 182,
  },
  {
    id: 2,
    title: "Moonlight Drive",
    artistName: "Yunior Arronte",
    thumbnail: getPublicUrl("images", "file2.webp"),
    musicUrl: getPublicUrl("audio", "02_moonlightdrive.mp3"),
    duration: 248,
  },
  {
    id: 3,
    title: "Rhythm Magnet",
    artistName: "Marcus P.",
    thumbnail: getPublicUrl("images", "file3.webp"),
    musicUrl: getPublicUrl("audio", "03_rhythmmagnet.mp3"),
    duration: 137,
  },
  {
    id: 4,
    title: "Funday",
    artistName: "Bensound (Benjamin Tissot)",
    thumbnail: getPublicUrl("images", "file4.webp"),
    musicUrl: getPublicUrl("audio", "04_funday.mp3"),
    duration: 193,
  },
  {
    id: 5,
    title: "Echo of Sadness",
    artistName: "TURNIQUE",
    thumbnail: getPublicUrl("images", "file5.webp"),
    musicUrl: getPublicUrl("audio", "05_echoofsadness.mp3"),
    duration: 139,
  },
  {
    id: 6,
    title: "Against All Odds",
    artistName: "Nick Petrov",
    thumbnail: getPublicUrl("images", "file6.webp"),
    musicUrl: getPublicUrl("audio", "06_againstallodds.mp3"),
    duration: 156,
  },
  {
    id: 7,
    title: "Memories",
    artistName: "Bensound (Benjamin Tissot)",
    thumbnail: getPublicUrl("images", "file7.webp"),
    musicUrl: getPublicUrl("audio", "07_memories.mp3"),
    duration: 230,
  },
  {
    id: 8,
    title: "Event Horizon",
    artistName: "Lunar Years",
    thumbnail: getPublicUrl("images", "file8.webp"),
    musicUrl: getPublicUrl("audio", "08_eventhorizon.mp3"),
    duration: 156,
  },
  {
    id: 9,
    title: "Doing Damage",
    artistName: "Dollshade",
    thumbnail: getPublicUrl("images", "file9.webp"),
    musicUrl: getPublicUrl("audio", "09_doingdamage.mp3"),
    duration: 137,
  },
  {
    id: 10,
    title: "Downtown",
    artistName: "Bensound (Benjamin Tissot)",
    thumbnail: getPublicUrl("images", "file10.webp"),
    musicUrl: getPublicUrl("audio", "10_downtown.mp3"),
    duration: 182,
  },
  {
    id: 11,
    title: "On Repeat",
    artistName: "Marcus P.",
    thumbnail: getPublicUrl("images", "file11.webp"),
    musicUrl: getPublicUrl("audio", "11_onrepeat.mp3"),
    duration: 136,
  },
  {
    id: 12,
    title: "Hip Jazz",
    artistName: "Bensound (Benjamin Tissot)",
    thumbnail: getPublicUrl("images", "file12.webp"),
    musicUrl: getPublicUrl("audio", "12_hipjazz.mp3"),
    duration: 163,
  },
  {
    id: 13,
    title: "Slow Life",
    artistName: "Benjamin Lazzarus",
    thumbnail: getPublicUrl("images", "file13.webp"),
    musicUrl: getPublicUrl("audio", "13_slowlife.mp3"),
    duration: 237,
  },
  {
    id: 14,
    title: "Echo of Sadness",
    artistName: "TURNIQUE",
    thumbnail: getPublicUrl("images", "file14.webp"),
    musicUrl: getPublicUrl("audio", "14_echoofsadness.mp3"),
    duration: 139,
  },
  {
    id: 15,
    title: "Sleepless",
    artistName: "Diffie Bosman",
    thumbnail: getPublicUrl("images", "file15.webp"),
    musicUrl: getPublicUrl("audio", "15_sleepless.mp3"),
    duration: 153,
  },
];

// Helper function to format duration (seconds to MM:SS)
export const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Search tracks by title
export const searchTracks = (query) => {
  if (!query) return tracks;
  const lowerQuery = query.toLowerCase();
  return tracks.filter((track) =>
    track.title.toLowerCase().includes(lowerQuery)
  );
};

// Get track by ID
export const getTrackById = (id) => {
  return tracks.find((track) => track.id === id);
};

// Sort tracks
export const sortTracks = (tracks, sortBy) => {
  const sorted = [...tracks];

  switch (sortBy) {
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "duration-asc":
      return sorted.sort((a, b) => a.duration - b.duration);
    case "duration-desc":
      return sorted.sort((a, b) => b.duration - a.duration);
    default:
      return sorted;
  }
};

export default tracks;
