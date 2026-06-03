import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Generate", href: "/generate" },
    { label: "Gallery", href: "/gallery" },
    { label: "Profile", href: "/profile" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-bg-page/85 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/" className="text-2xl font-bold font-serif text-primary-nav tracking-tight hover:text-accent transition-colors duration-200">
            Vogue<span className="font-normal italic text-accent">Gen</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
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

        {/* Right Actions (Search Bar & E-commerce Icons) */}
        <div className="hidden sm:flex items-center gap-4">
          
          {/* Search bar */}
          <div className="flex items-center bg-bg-card border border-border-color rounded-sm px-3 py-1.5 w-44 lg:w-64 focus-within:border-accent focus-within:bg-white focus-within:ring-3 focus-within:ring-accent/15 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              placeholder="Search designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none pl-2 text-xs text-text-main w-full placeholder-text-muted"
            />
          </div>

          {/* Cart Button (Dummy) */}
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-text-main hover:bg-bg-card hover:text-primary-nav transition-all duration-300 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="mx-auto"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <span className="absolute top-1 right-1 bg-primary-nav text-white text-[9px] font-bold min-w-4 h-4 rounded-full flex items-center justify-center p-0.5">
              3
            </span>
          </button>

        </div>

        {/* Mobile Menu Button (Hamburger icon) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-text-main hover:bg-bg-card hover:text-primary-nav transition-all duration-300"
          aria-label="Toggle Navigation"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-bg-page border-t border-border-color px-6 py-4 flex flex-col gap-4 shadow-inner text-left animate-in fade-in slide-in-from-top-4 duration-200">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary-nav transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="border-t border-border-color pt-4 flex gap-4">
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-main hover:text-primary-nav">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span>Cart (3)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
