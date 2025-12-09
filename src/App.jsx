// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { RecentlyPlayedProvider } from "./context/RecentlyPlayedContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useAudioPlayer } from "./context/AudioPlayerContext";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import ErrorBoundary from "./components/UI/ErrorBoundary";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import Auth from "./pages/Auth";

/**
 * Protected Route Wrapper
 * Redirects to /auth if user is not logged in
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="text-gray-400">Loading your music...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

/**
 * Main App Layout with dynamic background
 */
const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    currentTrack,
    togglePlayPause,
    playNext,
    playPrevious,
    changeVolume,
    volume,
  } = useAudioPlayer();

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onPlayPause: togglePlayPause,
    onNext: playNext,
    onPrevious: playPrevious,
    onVolumeUp: () => changeVolume(Math.min(volume + 0.1, 1)),
    onVolumeDown: () => changeVolume(Math.max(volume - 0.1, 0)),
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [window.location.pathname]);

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out"
      style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-40">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            isMobileMenuOpen={isMobileMenuOpen}
            closeMobileMenu={() => setIsMobileMenuOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile Header */}
            <Header
              toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/favourites" element={<Favourites />} />
                  <Route path="/recently-played" element={<RecentlyPlayed />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Root App Component with all providers
 */
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <FavouritesProvider>
            <RecentlyPlayedProvider>
              <AudioPlayerProvider>
                  <Routes>
                    {/* Public Auth Route - No Authentication Required */}
                    <Route path="/auth" element={<Auth />} />

                    {/* Protected Routes - Authentication Required */}
                    <Route
                      path="/*"
                      element={
                        <ProtectedRoute>
                          <AppLayout />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </AudioPlayerProvider>
              </RecentlyPlayedProvider>
            </FavouritesProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
