const Header = ({ toggleMobileMenu, title = "Music Player" }) => {
  return (
    <header className="bg-black p-4 md:hidden sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <button
          onClick={toggleMobileMenu}
          className="text-white text-2xl hover:text-green-400 transition-colors"
        >
          ☰
        </button>

        <h1 className="text-xl font-bold text-white">{title}</h1>

        <div className="w-8" />
      </div>
    </header>
  );
};

export default Header;
