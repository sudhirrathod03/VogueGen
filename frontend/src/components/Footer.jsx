import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#E8EEF5] text-[#5F5E5A] py-8 px-6 mt-auto border-t border-[#D3D1C7]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Left Side */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#2C2C2A] tracking-wide">VogueGen</h2>
          <p className="text-xs text-[#5F5E5A]">
            &copy; 2026 VogueGen. All rights reserved.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap gap-12 md:gap-16">
          
          {/*Navigation */}
          <div>
            <h3 className="text-xs font-bold text-[#2C2C2A] uppercase tracking-wider mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#378ADD] transition-colors duration-150">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#378ADD] transition-colors duration-150">Features</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold text-[#2C2C2A] uppercase tracking-wider mb-3">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#378ADD] transition-colors duration-150">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#378ADD] transition-colors duration-150">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Community/Socials */}
          <div>
            <h3 className="text-xs font-bold text-[#2C2C2A] uppercase tracking-wider mb-3">
              Community
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#378ADD] transition-colors duration-150"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#378ADD] transition-colors duration-150"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;