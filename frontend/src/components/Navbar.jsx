import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const dropdownRef = useRef(null);

  // --- AUTHENTICATION STATE ---
  const [user, setUser] = useState({
    name: "Alex Mercer",
    email: "alex.mercer@voguegen.com",
  });

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Profile", href: "/profile" },
  ];

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setUser(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-bg-page/85 backdrop-blur-md shadow-sm border-b border-border-color/60">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-2xl font-bold font-serif text-primary-nav tracking-tight hover:text-accent transition-colors duration-200"
          >
            Vogue<span className="font-normal italic text-accent">Gen</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="text-xs font-semibold uppercase tracking-wider text-text-main hover:text-primary-nav transition-colors duration-200 relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-nav hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Controlled Elements Section */}
        <div className="hidden sm:flex items-center gap-4">

          {/* Search Input field */}
          <div className="flex items-center bg-bg-card border border-border-color rounded-sm px-3 py-1.5 w-44 lg:w-64 focus-within:border-accent focus-within:bg-white focus-within:ring-2 focus-within:ring-accent/20 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-muted"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none pl-2 text-xs text-text-main w-full placeholder-text-muted"
            />
          </div>

          {/* Dynamic Authentication Target Area */}
          <div className="relative" ref={dropdownRef}>
            {!user ? (
              /* GUEST USER EXPERIENCE: Prominent Primary Call Actions */
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-main border border-border-color rounded hover:bg-bg-card hover:text-primary-nav transition-all duration-200"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-primary-nav rounded hover:bg-accent shadow-sm transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              /* AUTHENTICATED USER EXPERIENCE: Profile Hub Toggle Trigger */
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-full transition-all duration-200 group"
                  aria-label="User menu"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  
                  <div className="w-9 h-9 rounded-full bg-bg-card border border-border-color group-hover:border-accent shadow-sm flex items-center justify-center text-text-muted group-hover:text-primary-nav transition-all duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21a8 8 0 1 0-16 0"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu Box Panel */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-60 bg-white rounded-xl shadow-lg border border-border-color p-1.5 transform origin-top-right transition-all duration-200 animate-in fade-in slide-in-from-top-2 z-50">
                    
                    {/* Identification Cluster Header */}
                    <div className="px-3.5 py-2.5 border-b border-border-color/60 mb-1">
                      <p className="text-xs font-bold text-text-main tracking-tight truncate">{user.name}</p>
                      <p className="text-[11px] text-text-muted truncate mt-0.5 font-medium">{user.email}</p>
                    </div>

                    {/* Navigation Items Link Node Group */}
                    <div className="space-y-0.5 text-xs font-semibold uppercase tracking-wider text-text-main">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg hover:bg-bg-card hover:text-primary-nav transition-all duration-150"
                      >
                        📊 Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg hover:bg-bg-card hover:text-primary-nav transition-all duration-150"
                      >
                        👤 My Profile
                      </Link>
                    </div>

                    
                    <div className="border-t border-border-color/60 mt-1.5 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded-lg text-left transition-all duration-150"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="w-10 h-10 rounded-full flex items-center justify-center text-text-main hover:bg-bg-card hover:text-primary-nav transition-all duration-300 relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="absolute top-1 right-1 bg-primary-nav text-white text-[9px] font-bold min-w-4 h-4 rounded-full flex items-center justify-center p-0.5">
              3
            </span>
          </Link>

        </div>

        {/* Mobile Layout Menu Button Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-text-main hover:bg-bg-card hover:text-primary-nav transition-all duration-300"
          aria-label="Toggle Navigation"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Responsive Navigation Drawer Link Blocks */}
      {isOpen && (
        <div className="md:hidden bg-bg-page border-t border-border-color px-6 py-4 flex flex-col gap-4 shadow-inner animate-in fade-in slide-in-from-top-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary-nav"
            >
              {item.label}
            </Link>
          ))}

          {/* Responsive Mobile Auth Elements Mapping */}
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary-nav"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-accent"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary-nav"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary-nav"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs font-bold uppercase tracking-wider text-red-600 text-left pt-1 border-t border-border-color/40"
              >
                Logout ({user.name})
              </button>
            </>
          )}

          <div className="border-t border-border-color pt-4">
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary-nav"
            >
              🛒 Cart (3)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}