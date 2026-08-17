import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-green-700 font-semibold"
        : "text-gray-700 hover:text-green-700"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">X</span>
            </div>

            <div>
              <h1 className="text-xl font-bold text-green-700">
                Xeuj
              </h1>
              <p className="text-[10px] text-gray-500 -mt-1">
                Civic Issue Reporting
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <SignedIn>
              <NavLink to="/report" className={navLinkClass}>
                Report Issue
              </NavLink>

              <NavLink to="/track" className={navLinkClass}>
                Track Complaint
              </NavLink>
            </SignedIn>

            <SignedIn>
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
            </SignedIn>

            <SignedOut>
              <Link
                to="/login"
                className="text-gray-700 hover:text-green-700 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg transition"
              >
                Get Started
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <span className="text-2xl">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-3">

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              <div className="px-3 py-2 rounded-lg hover:bg-green-50">
                Home
              </div>
            </NavLink>

            <SignedIn>
              <NavLink
                to="/report"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                <div className="px-3 py-2 rounded-lg hover:bg-green-50">
                  Report Issue
                </div>
              </NavLink>

              <NavLink
                to="/track"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                <div className="px-3 py-2 rounded-lg hover:bg-green-50">
                  Track Complaint
                </div>
              </NavLink>

              <NavLink
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                <div className="px-3 py-2 rounded-lg hover:bg-green-50">
                  Admin
                </div>
              </NavLink>

              <div className="px-3 py-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-gray-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block bg-green-700 text-white text-center px-4 py-2 rounded-lg"
              >
                Get Started
              </Link>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;