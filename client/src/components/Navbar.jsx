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
        <Link
          to="/create"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:shadow-md transition"
        >
          <span className="w-5 h-5 rounded-full flex items-center justify-center bg-white text-black group-hover:rotate-90 transition-transform duration-300">
            +
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
              className="text-sm text-white bg-primary px-4 py-2  hover:bg-gray-900 transition"
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
