import React from "react";
import heroModel from "../assets/hero-img.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] rounded-[2rem] p-8 md:p-16 mb-16 grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative overflow-hidden shadow-lg border border-white/50">
      
      {/* Custom Keyframes for Floating & Scanning Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes scan {
          0% { top: 5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }
        .animate-float-slow { animation: float 6s ease-in-out infinite; }
        .animate-float-fast { animation: float 4s ease-in-out infinite; }
        .animate-scan { animation: scan 4s linear infinite; }
      `}</style>

      {/* Decorative Gradient Overlay */}
      <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-radial from-accent/20 to-transparent z-0 pointer-events-none blur-2xl" />
      
      {/* Hero Text */}
      <div className="z-10 flex flex-col items-start text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-800 leading-tight mb-6 font-bold tracking-tight">
          Discover Your <span className="font-normal italic text-primary-nav block mt-2">Signature Style with AI</span>
        </h1>
        <p className="text-sm md:text-base text-slate-600 mb-8 max-w-md leading-relaxed">
          Personalized high-fashion recommendations and wardrobe curated by artificial intelligence. Experience e-commerce designed for you.
        </p>
        <Link
         to="/products" className="group bg-primary-nav cursor-pointer text-white px-8 py-4 rounded-lg text-sm font-semibold tracking-wider hover:bg-accent hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center gap-3 shadow-md"
        >
          <span>Shop the Collection</span>
          <svg className="group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </Link>
      </div>

      {/* Hero Image with AI Animations */}
      <div className="z-10 hidden md:flex justify-center items-center relative">
        
        {/* Floating Element 1: AI Fabric Color Extraction */}
        <div className="absolute top-4 -left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/60 z-30 animate-float-slow flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-5 h-5 rounded-full bg-[#E5D0C5] border-2 border-white shadow-sm" />
            <div className="w-5 h-5 rounded-full bg-[#2A3B4C] border-2 border-white shadow-sm" />
            <div className="w-5 h-5 rounded-full bg-[#8E9B90] border-2 border-white shadow-sm" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-800">Palette Extracted</p>
            <p className="text-[9px] text-slate-500">AI Color Match Active</p>
          </div>
        </div>

        {/* Main Image Container */}
        <div className="relative group p-2 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-2xl">
          
          {/* AI Holographic Scanning Line */}
          <div className="absolute left-0 right-0 h-[2px] bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.8)] z-20 animate-scan rounded-full mx-6 pointer-events-none mix-blend-overlay" />

          <img
            src={heroModel}
            alt="Editorial Fashion Collection Model"
            className="max-w-[105%] rounded-xl object-cover shadow-inner transition-all duration-500"
          />
        </div>

        {/* Floating Element 2: Perfect Fit Tag */}
        <div className="absolute -bottom-6 -right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/60 z-30 animate-float-fast flex items-center gap-3">
          <div className="bg-slate-100 p-2 rounded-xl text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
              Perfect Fit <span className="text-emerald-500 text-xs">●</span>
            </p>
            <p className="text-[10px] text-slate-500">Based on your sizing</p>
          </div>
        </div>

      </div>
    </section>
  );
}