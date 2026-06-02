import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#2C2C2A] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          VogueGen
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/generate" className="hover:text-gray-300">Generate</a>
          <a href="/gallery" className="hover:text-gray-300">Gallery</a>
          <a href="/profile" className="hover:text-gray-300">Profile</a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
          <a href="/">Home</a>
          <a href="/generate">Generate</a>
          <a href="/gallery">Gallery</a>
          <a href="/profile">Profile</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;