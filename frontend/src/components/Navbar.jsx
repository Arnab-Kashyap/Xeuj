import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `transition text-sm font-medium ${
      isActive
        ? "text-green-700"
        : "text-gray-700 hover:text-green-700"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div
        className={`max-w-6xl mx-auto transition-all duration-500 rounded-2xl ${
          isScrolled
            ? "backdrop-blur-xl bg-white/40 border border-white/30 shadow-lg"
            : "backdrop-blur-0 bg-transparent border border-transparent"
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/images/xeuj-logo-navbar-transparent.png"
              alt="Xeuj Logo"
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/track" className={navLinkClass}>
              Track
            </NavLink>

            <NavLink to="/report" className={navLinkClass}>
              Report
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <SignedIn>
              <Link
                to="/report"
                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full font-semibold text-sm transition shadow-md hover:shadow-lg"
              >
                Report Issue
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <Link
                to="/register"
                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full font-semibold text-sm transition shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </SignedOut>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
          >
            <span className="text-2xl text-gray-800">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/20 px-6 py-4 space-y-3">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              <div className="px-3 py-2 rounded-lg hover:bg-white/20 transition">
                Home
              </div>
            </NavLink>

            <NavLink
              to="/track"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              <div className="px-3 py-2 rounded-lg hover:bg-white/20 transition">
                Track
              </div>
            </NavLink>

            <NavLink
              to="/report"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              <div className="px-3 py-2 rounded-lg hover:bg-white/20 transition">
                Report
              </div>
            </NavLink>

            <div className="pt-2 space-y-2">
              <SignedIn>
                <Link
                  to="/report"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-green-700 hover:bg-green-800 text-white text-center px-5 py-2 rounded-full font-semibold transition"
                >
                  Report Issue
                </Link>
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              <SignedOut>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-green-700 hover:bg-green-800 text-white text-center px-5 py-2 rounded-full font-semibold transition"
                >
                  Get Started
                </Link>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;