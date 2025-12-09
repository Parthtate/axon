import { NavLink, useNavigate } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext"; 
import { useFavourites } from "../../context/FavouritesContext";
import { useRecentlyPlayed } from "../../context/RecentlyPlayedContext";
import { GoHomeFill } from "react-icons/go";
import { LuClock2 } from "react-icons/lu";
import { FcLikePlaceholder } from "react-icons/fc";
import { LiaArtstation } from "react-icons/lia";
import { FcMusic } from "react-icons/fc";
import { PiSignOutBold } from "react-icons/pi";

const Sidebar = ({ isMobileMenuOpen, closeMobileMenu }) => {
  const { favourites } = useFavourites();
  const { recentlyPlayed } = useRecentlyPlayed();
  const { signOut } = useAuth(); 
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navLinks = [
    { to: "/", icon: <GoHomeFill />, label: "Home", count: null },
    {
      to: "/favourites",
      icon: <FcLikePlaceholder />,
      label: "Favourites",
      count: favourites.length,
    },
    {
      to: "/recently-played",
      icon: <LuClock2 />,
      label: "Recently Played",
      count: recentlyPlayed.length,
    },
  ];

  return (
    <aside
      className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-black
        transform transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
    >
      <div className="h-full flex flex-col p-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <LiaArtstation /> <span className="text-white">Axon</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMobileMenu}
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-green-500 text-black font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                  </div>
                  {link.count !== null && link.count > 0 && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isActive
                          ? "bg-green-700 text-white"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {link.count}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sign Out Button */}
        <div className="mt-auto mb-6 pt-4 border-t border-gray-800">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-900/10 rounded-lg transition-all"
          >
            <span className="text-2xl"><PiSignOutBold /></span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-1">
            Built with <FcMusic />
          </p>
          <a
            href="https://www.bensound.com/free-music-for-videos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 hover:text-gray-300 transition-colors cursor-pointer text-xs mt-2"
          >
            Bensound - Royalty Free Music
          </a>
          <a href="https://github.com/Parthtate/axon" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 hover:text-gray-300 transition-colors cursor-pointer text-xs mt-2">Github repo</a>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 -z-10 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </aside>
  );
};

export default Sidebar;
