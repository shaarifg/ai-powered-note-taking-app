import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../data/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleProtectedClick = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 sm:px-10 flex items-center justify-between">
      {/* Brand Logo */}
      <BrandLogo />

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <Link to="/create" title="New Note">
          <span className="w-7 h-7 flex items-center justify-center rounded-full border border-primary group-hover:bg-white hover:bg-primary hover:text-white transition-all duration-300">
            <i className="fas fa-plus text-xs" />
          </span>
        </Link>

        {!isAuthenticated ? (
          <>
            <Link
              to="/signin"
              className="text-sm text-gray-700 hover:underline"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-sm text-white bg-primary px-4 py-2  hover:bg-primary/80 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative z-50">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <i className="fa-solid fa-user text-gray-700 text-lg" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white  border  overflow-hidden">
                <div className="flex flex-col text-sm">
                  {navLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => handleProtectedClick(link.path)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                    >
                      <i className={link.icon}></i>
                      {link.label}
                    </button>
                  ))}
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-50"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
