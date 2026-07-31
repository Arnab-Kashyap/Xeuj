import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Logo />

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <NavLinks />
        </div>

        <div className="flex items-center gap-4">

          <SignedOut>
            <Link
              to="/login"
              className="bg-green-700 text-white px-5 py-2 rounded-full font-medium hover:bg-green-800 transition"
            >
              Get Started
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;