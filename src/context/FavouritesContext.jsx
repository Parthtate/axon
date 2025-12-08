// src/context/FavouritesContext.jsx
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * Manages favourite tracks using localStorage
 * Requirement #10: Store favourites in LocalStorage
 */
const FavouritesContext = createContext(undefined);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  const toggleFavourite = (trackId) => {
    setFavourites((prev) => {
      if (prev.includes(trackId)) {
        // Remove from favourites
        return prev.filter((id) => id !== trackId);
      } else {
        // Add to favourites
        return [...prev, trackId];
      }
    });
  };

  const isFavourite = (trackId) => {
    return favourites.includes(trackId);
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const value = {
    favourites,
    toggleFavourite,
    isFavourite,
    clearFavourites,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error("useFavourites must be used within FavouritesProvider");
  }
  return context;
};

export default FavouritesContext;
