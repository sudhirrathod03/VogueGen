import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Generate", href: "/generate" },
    { label: "Gallery", href: "/gallery" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-bg-page/85 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="text-2xl font-bold font-serif text-primary-nav tracking-tight hover:text-accent transition-colors duration-200"
          >
            Vogue<span className="font-normal italic text-accent">Gen</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-wider text-text-main hover:text-primary-nav transition-colors duration-200 relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-nav hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="hidden sm:flex items-center gap-4">

          {/* Search */}
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

          {/* Login Dropdown */}
          <div className="relative group">

  <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21a8 8 0 1 0-16 0"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>

    Login
  </button>

  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

    <div className="flex justify-between items-center p-4 border-b">
      <span>New Customer?</span>

      <Link
        to="/signup"
        className="text-blue-600 font-semibold hover:underline"
      >
        Sign Up
      </Link>
    </div>

    <Link
      to="/login"
      className="block px-4 py-3 hover:bg-gray-100"
    >
      👤 Login
    </Link>

    <Link
      to="/profile"
      className="block px-4 py-3 hover:bg-gray-100"
    >
      👤 My Profile
    </Link>

    <Link
      to="/orders"
      className="block px-4 py-3 hover:bg-gray-100"
    >
      📦 Orders
    </Link>

    <Link
      to="/wishlist"
      className="block px-4 py-3 hover:bg-gray-100"
    >
      ❤️ Wishlist
    </Link>

  </div>
</div>

          {/* Cart */}
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-text-main hover:bg-bg-card hover:text-primary-nav transition-all duration-300 relative">
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
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-text-main hover:bg-bg-card hover:text-primary-nav transition-all duration-300"
          aria-label="Toggle Navigation"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-bg-page border-t border-border-color px-6 py-4 flex flex-col gap-4 shadow-inner">

          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary-nav"
            >
              {item.label}
            </a>
          ))}

          <a
            href="/login"
            className="text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary-nav"
          >
            Login
          </a>

          

          <div className="border-t pt-4">
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary-nav">
              🛒 Cart (3)
            </button>
          </div>

        </div>
      )}
    </header>
  );
}