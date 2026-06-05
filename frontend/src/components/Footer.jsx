const Footer = () => {
  return (
    <footer className="bg-[#2C2C2A] text-[#E4E3DE] pt-16 px-6 pb-8 border-t border-[#2C2C2B]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
        
        {/* Left Side */}
        <div className="space-y-4 text-left">
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
            Vogue<span className="font-normal italic text-accent">Gen</span>
          </h2>
          <p className="text-xs text-[#8C8B85] max-w-xs leading-relaxed">
            Bringing next-generation fashion rendering and artificial intelligence styling straight to your wardrobe.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap gap-12 md:gap-20 text-left">
          
          {/*Navigation */}
          <div>
            <h3 className="text-xs font-bold text-[#2C2C2A] uppercase tracking-wider text-white mb-4">
              Explore
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[#8C8B85]">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Features</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[#8C8B85]">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Community/Socials */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[#8C8B85]">
              <li>
                <a 
                  href="https://github.com/sudhirrathod03/VogueGen" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors duration-200"
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
