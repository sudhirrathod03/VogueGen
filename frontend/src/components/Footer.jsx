// We only import Mail and MessageSquare (which is a generic chat bubble) from lucide-react
import { MessageSquare, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2A] text-[#E4E3DE] pt-16 px-6 pb-8 border-t border-[#3E3D3A]">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
                Vogue<span className="font-normal italic text-accent">Gen</span>
              </h2>
              <p className="text-xs text-[#8C8B85] max-w-xs leading-relaxed">
                Bringing next-generation fashion rendering and artificial intelligence styling straight to your wardrobe.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-3 max-w-sm">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Stay Updated
              </h4>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-[#232321] text-xs text-white placeholder-[#6C6B66] px-3 py-2 rounded border border-[#3E3D3A] focus:outline-none focus:border-[#E4E3DE] w-full transition-colors duration-200"
                />
                <button 
                  type="submit"
                  className="bg-[#E4E3DE] text-[#2C2C2A] text-xs font-semibold px-4 py-2 rounded hover:bg-white transition-colors duration-200"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 flex flex-wrap gap-12 md:gap-20 md:justify-end text-left">
            
            {/* Navigation */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Explore
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs text-[#8C8B85]">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">Home</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">Features</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">Pricing</a>
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
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                  >
                    {/* Inline SVG for GitHub Logo */}
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                  >
                    <MessageSquare size={14} /> Discord
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[#3E3D3A] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#8C8B85]">
          <div className="flex items-center gap-4">
            <p>&copy; {new Date().getFullYear()} VogueGen. All rights reserved.</p>
            
            {/* System Status Dot */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#232321] px-2 py-0.5 rounded border border-[#3E3D3A] text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Systems Normal</span>
            </div>
          </div>
          
          <p className="text-[10px] tracking-wider uppercase text-[#6C6B66]">Built for next-gen fashion</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;