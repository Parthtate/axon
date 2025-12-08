# Axon - Music Player

A modern, feature-rich music player built with React, Vite, and Supabase. Stream your favorite tracks with an intuitive interface, playlist management, and dynamic visual effects.

**Live Demo:** [Deployed on Vercel](https://music-player-task.vercel.app)

---

## Features

### Core Playback

- HTML5 Audio Streaming - Seamless playback from Supabase Storage
- Play/Pause Controls - Instant audio control with visual feedback
- Next/Previous Navigation - Skip tracks or restart current track
- Progress Tracking - Interactive progress bar with time display
- Volume Control - Adjustable volume with mute toggle
- Audio Visualizer - Animated equalizer bars while playing

### Playback Modes

- Shuffle - Randomize track order
- Repeat Modes - Off / Repeat All / Repeat One
- Keyboard Shortcuts - Space (play/pause), Arrow Keys (next/prev/volume)

### User Features

- Favourites - Save favorite tracks (persisted in localStorage)
- Recently Played - Auto-generated history of last 10 tracks (session-based)
- Search - Filter tracks by title in real-time
- Sort Options - Sort by title or duration

### User Interface

- Dark Theme - Sleek dark interface with smooth animations
- Dynamic Gradients - Background colors extracted from album artwork
- Responsive Design - Optimized for mobile, tablet, and desktop
- Mini Player - Compact bottom player bar with quick controls
- Empty States - Elegant empty screens with actionable prompts

### Authentication

- Email/Password Auth - Secure account creation and login
- Google OAuth - Quick sign-in with Google
- Session Persistence - Stay logged in across browser sessions

---

## Quick Start

### Prerequisites

- Node.js 16+ (includes npm)
- Supabase Account (free tier works)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Parthtate/axon.git
   cd axon
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Get these from your [Supabase Dashboard](https://app.supabase.com)

4. Start development server
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser

---

## Setup Supabase

1. Create Storage Buckets

   - Create a bucket named `audio` for music files
   - Create a bucket named `images` for album artwork
   - Set both buckets to **Public**

2. Upload Media

   ```bash
   npm run build
   ```

   Use the Supabase dashboard or the provided upload script to add tracks

3. Enable Authentication
   - Go to Authentication → Providers
   - Enable Email/Password
   - Enable Google OAuth and add your credentials

---

## Usage

### For Users

1. Sign up with email or Google account
2. Browse all tracks on the home page
3. Click any track to start playing
4. Heart icon to add/remove from favorites
5. Search for specific tracks
6. Check History in Recently Played tab

### For Developers

```jsx
// Access audio player context
import { useAudioPlayer } from "./context/AudioPlayerContext";

const MyComponent = () => {
  const { currentTrack, isPlaying, togglePlayPause, playNext } =
    useAudioPlayer();

  return <button onClick={togglePlayPause}>Play</button>;
};
```

---

## Project Structure

```
src/
├── components/          # React components
│   ├── AudioPlayer/     # Player UI (controls, progress, volume)
│   ├── TrackList/       # Track listing and search
│   ├── Layout/          # Sidebar, header, navigation
│   └── UI/              # Shared components (spinner, empty state)
├── context/             # Global state management
│   ├── AudioPlayerContext.jsx      # Audio playback state
│   ├── AuthContext.jsx             # Authentication
│   ├── FavouritesContext.jsx       # Saved favorites
│   ├── RecentlyPlayedContext.jsx   # Play history
│   └── ThemeContext.jsx            # Theme preferences
├── hooks/               # Custom React hooks
│   ├── useAudioPlayer.js           # Access audio state
│   ├── useColorExtractor.js        # Extract colors from images
│   ├── useKeyboardShortcuts.js     # Keyboard controls
│   ├── useLocalStorage.js          # Persistent storage
│   ├── useSessionStorage.js        # Session storage
│   └── useSmoothScroll.js          # Smooth scrolling
├── pages/               # Page components
│   ├── Home.jsx         # All tracks
│   ├── Favourites.jsx   # Favorite tracks
│   ├── RecentlyPlayed.jsx
│   └── Auth.jsx         # Login/signup
├── utils/               # Utility functions
│   ├── dummyData.js     # Track list and helpers
│   └── formatTime.js    # Time formatting
├── conf/                # Configuration
│   ├── supabaseClient.js
│   └── config.js
└── App.jsx              # Root component
```

---

## Tech Stack

- Frontend: React 19, React Router 7
- Build Tool: Vite 7
- Styling: Tailwind CSS 4
- Backend: Supabase (Auth + Storage)
- Icons: React Icons
- Deployment: Vercel

---

## Key Concepts

### Global Audio Context

Music continues playing even when navigating between pages thanks to a persistent audio context and ref-based audio element.

### Dynamic Styling

Album artwork colors are extracted using Canvas API and applied as gradient backgrounds for an immersive visual experience.

### Smart Storage

- localStorage - Favorites persist across sessions
- sessionStorage - Recently played clears on browser close

### Keyboard Control

- Space - Play/Pause
- Right Arrow - Next track
- Left Arrow - Previous track
- Up/Down Arrow - Volume up/down

---

## Responsive Breakpoints

- Mobile (<768px) - Hamburger menu, compact player
- Tablet (768-1024px) - Sidebar visible, optimized layout
- Desktop (>1024px) - Full sidebar, expanded player

---

## Security

- Supabase RLS (Row Level Security) policies on tables
- Public storage buckets for media access
- Environment variables for sensitive config
- No credentials stored in code

---

## Troubleshooting

### Audio not playing?

- Check if Supabase storage buckets are **Public**
- Verify audio file URLs in browser console
- Ensure browser allows audio autoplay

### Authentication issues?

- Confirm email confirmation email received
- Check Supabase email templates are enabled
- Verify Google OAuth credentials

### Build errors?

```bash
npm install         # Fresh install
npm run build       # Build for production
npm run lint        # Check for linting errors
```

---

## Future Enhancements

- Playlist creation and management
- User library syncing across devices
- Offline playback with Service Workers
- Audio equalizer with presets
- Social sharing features
- Dark/Light theme toggle

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

**Parth**

### Acknowledgments

- Music by [Bensound](https://www.bensound.com/free-music-for-videos) (Royalty Free)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)

## Support

Found a bug or have a feature request? Open an issue on GitHub or reach out directly.
