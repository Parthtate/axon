# Axon Music Player

Axon is a modern web-based music player built with React and Supabase, designed to showcase authenticated, media-heavy front-end applications. This project uses Supabase for authentication and storage following Supabase’s recommended React integration patterns. [web:47]

## Features

- Email, Google authentication via Supabase
- Protected routes for authenticated users
- Audio playback with play, pause, previous, next, and volume controls
- Favourites and recently played track lists
- Responsive layout for desktop and mobile

## Tech Stack

- React (Vite)
- Supabase (Auth, Storage)
- React Router
- Tailwind CSS
- React Context API and custom hooks

## Getting Started

### Prerequisites

- Node.js 18 or later
- A Supabase project with:
  - Auth enabled (Email, Google as needed)
  - Public storage buckets for `audio` and `images`

### Installation

git clone https://github.com/YOUR_USERNAME/music-player-task.git
cd music-player-task
npm install


Open `http://localhost:5173` in your browser.

### Production Build


Open `http://localhost:5173` in your browser.

### Production Build

npm run build


## License

This project is licensed under the MIT License. You are free to use, modify, and distribute it in accordance with the license terms.
