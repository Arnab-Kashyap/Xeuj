function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-700">
          Xeuj
        </h1>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#">Home</a>
          <a href="#">Report</a>
          <a href="#">Track</a>
          <a href="#">About</a>
        </div>

        <button className="bg-green-700 text-white px-5 py-2 rounded-full font-medium hover:bg-green-800 transition">
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;