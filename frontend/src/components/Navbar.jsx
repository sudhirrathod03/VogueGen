import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Chatbot from "./Chatbot";
const BASE_URL= import.meta.env.VITE_BACKEND_URL


export default function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user");
   
  return storedUser
    ? JSON.parse(storedUser)
    : null;
});

  // for add to cart 
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setUser(null);
  setCartCount(0);
  setIsDropdownOpen(false);
  setIsOpen(false);

  window.dispatchEvent(
    new Event("authChanged")
  );

  navigate("/");
};

useEffect(() => {
  const handleAuthChange = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  window.addEventListener(
    "authChanged",
    handleAuthChange
  );

  return () => {
    window.removeEventListener(
      "authChanged",
      handleAuthChange
    );
  };
}, []);

// Add to cart 
  useEffect(() => {
  fetchCartCount();

  window.addEventListener(
    "cartUpdated",
    fetchCartCount
  );

  return () => {
    window.removeEventListener(
      "cartUpdated",
      fetchCartCount
    );
  };
}, []);

  const fetchCartCount = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const { data } = await axios.get(
      `${BASE_URL}/api/cart`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const count =
      data?.items?.reduce(
        (sum, item) => sum + item.quantity,
        0
      ) || 0;

    setCartCount(count);
  } catch (error) {
    console.log(error);
  }
};

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo Section */}
        <div className="flex items-center transform hover:scale-[1.02] active:scale-95 transition-all duration-200 ease-out">
          <Link
            to="/"
            className="text-2xl font-extrabold font-serif text-blue-600 tracking-tight hover:opacity-90 transition-opacity"
          >
            Vogue<span className="font-normal italic text-blue-400">Gen</span>
          </Link>
        </div>

        {/* Center Section: Balanced Desktop Links */}
        <nav className="hidden md:block">
          <ul className="flex gap-10">
            {menuItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `text-xs font-bold uppercase tracking-wider transition-all duration-300 relative pb-1.5 block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 ${
                      isActive
                        ? "text-blue-600 after:w-full"
                        : "text-gray-600 hover:text-blue-600 after:w-0 hover:after:w-full"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section: Dynamic Control Hub */}
        <div className="hidden md:flex items-center gap-6">
          {/* Authentication Workflow Area */}
          {!user ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 ease-out shadow-sm"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 rounded-xl hover:bg-blue-700 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 ease-out shadow-sm hover:shadow-md"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50/30 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-100 transform hover:scale-105 active:scale-95 transition-all duration-200 ease-out shadow-sm"
                aria-label="User profile options"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>

              {/* Enhanced Zoom-In Profile Dropdown Menu Card */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3.5 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-2 transform origin-top-right transition-all duration-300 ease-out animate-in fade-in zoom-in-95 slide-in-from-top-3 z-50">
                  
                  {/* Visual Hierarchy Identity Info Cluster */}
                  <div className="px-3.5 py-3 border-b border-gray-100 mb-1.5 bg-gray-50/50 rounded-xl">
                    <p className="text-sm font-bold text-gray-900 tracking-tight truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5 font-medium">
                      {user?.email}
                    </p>
                  </div>

                  {/* Dropdown Items Navigation Stack */}
                  <div className="space-y-0.5 text-xs font-bold uppercase tracking-wider text-gray-700">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-blue-50/60 hover:text-blue-600 transition-all duration-150"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V16zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V16z" />
                      </svg>
                      Dashboard
                    </Link>

                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-blue-50/60 hover:text-blue-600 transition-all duration-150"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>

                    <Link
                      to="/add-product"
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-blue-50/60 hover:text-blue-600 transition-all duration-150"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Product
                    </Link>
                  </div>

                  {/* Redesigned Destructive Logout Action Container */}
                  <div className="border-t border-gray-100 mt-1.5 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded-xl text-left transition-all duration-150"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Icon Button with Advanced Scaling & Hover Transitions */}
          <Link
            to="/cart"
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-transparent hover:border-gray-100 transform hover:scale-110 active:scale-90 transition-all duration-300 ease-out relative group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:rotate-6 transition-transform duration-200"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
{cartCount > 0 && (
  <span className="absolute top-0.5 right-0.5 bg-blue-600 text-white text-[9px] font-bold min-w-4 h-4 rounded-full flex items-center justify-center p-0.5 shadow-sm">
    {cartCount}
  </span>
)}
          </Link>
        </div>

        {/* Mobile Layout Control Toggle Button */}
        <button
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-90 transition-all duration-200 ease-out"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="text-xl font-medium">{isOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4 shadow-inner transform origin-top transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-blue-600 transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}

          {/* Conditional Mobile Auth Handling */}
          {!user ? (
            <div className="flex flex-col gap-3.5 pt-3.5 border-t border-gray-100">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-blue-500 hover:text-blue-600"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5 pt-3.5 border-t border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-700">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600 transition-colors"
              >
                Profile
              </Link>

              <Link
                to="/add-product"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600 transition-colors"
              >
                Add Product
              </Link>

              <button
                onClick={handleLogout}
                className="text-left text-xs font-bold uppercase tracking-wider text-red-500 pt-3 border-t border-gray-100"
              >
                Logout ({user?.name})
              </button>
            </div>
          )}

          <div className="border-t border-gray-100 pt-4">
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-blue-600"
            >
              🛒 Cart ({cartCount})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}