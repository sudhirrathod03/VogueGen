import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
    setIsDropdownOpen(false);

    navigate("/");
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          VogueGen
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="font-medium hover:text-blue-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="border rounded-lg px-3 py-2"
          />

          {/* Auth Section */}
          {!user ? (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-4 py-2 border rounded-lg"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() =>
                  setIsDropdownOpen(!isDropdownOpen)
                }
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
              >
                👤
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border rounded-xl shadow-lg p-2">

                  <div className="border-b pb-2 mb-2">
                    <p className="font-semibold">
                      {user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  <div className="flex flex-col">

                    <Link
                      to="/dashboard"
                      className="px-3 py-2 hover:bg-gray-100 rounded-lg"
                      onClick={() =>
                        setIsDropdownOpen(false)
                      }
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/profile"
                      className="px-3 py-2 hover:bg-gray-100 rounded-lg"
                      onClick={() =>
                        setIsDropdownOpen(false)
                      }
                    >
                      Profile
                    </Link>

                    <Link
                      to="/add-product"
                      className="px-3 py-2 hover:bg-gray-100 rounded-lg"
                      onClick={() =>
                        setIsDropdownOpen(false)
                      }
                    >
                      Add Product
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="text-xl"
          >
            🛒
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 py-4 border-t flex flex-col gap-3">

          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>

              <Link
                to="/add-product"
                onClick={() => setIsOpen(false)}
              >
                Add Product
              </Link>

              <button
                onClick={handleLogout}
                className="text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}