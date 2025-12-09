# Axon Music Player

Axon is a web-based music player built with React and Supabase. It features authenticated user sessions, audio playback controls, and a responsive design for both desktop and mobile.

## Features

- Email and Google authentication via Supabase
- Protected routes for authenticated users
- Audio playback with play, pause, previous, next, shuffle, repeat, and volume controls
- Favourites and recently played track lists
- Search and sort functionality
- Keyboard shortcuts for playback control
- Responsive layout for desktop and mobile

## Tech Stack

- React 19 (Vite)
- Supabase (Auth, Storage)
- React Router
- Tailwind CSS
- React Context API and custom hooks

## Getting Started

### Prerequisites

- Node.js 18 or later
- A Supabase project with:
  - Auth enabled (Email and Google)
  - Public storage buckets named `audio` and `images`

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Parthtate/axon.git
cd axon
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Start the development server:

```bash
npm run dev
```

5. Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

The build output will be in the `dist` folder.

### Deployment

This project is configured for Vercel deployment. Push to your repository and connect it to Vercel. Set the environment variables in the Vercel dashboard.

## Project Structure

```
src/
  components/      # UI components
  context/         # React Context providers
  hooks/           # Custom hooks
  pages/           # Route pages
  utils/           # Utility functions
  conf/            # Configuration files
```

## License

This project is licensed under the MIT License.
