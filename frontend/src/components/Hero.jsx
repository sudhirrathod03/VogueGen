import React from "react";
import heroModel from "../assets/hero_model.png";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#F0F4FA] to-[#D8E4F3] rounded-3xl p-8 md:p-16 mb-16 grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative overflow-hidden shadow-md">
      {/* Decorative Gradient Overlay */}
      <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-radial from-accent/15 to-transparent z-0 pointer-events-none" />

      {/* Hero Text */}
      <div className="z-10 flex flex-col items-start text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-main leading-tight mb-6 font-bold">
          Discover Your <span className="font-normal italic text-primary-nav block mt-1">Signature Style with AI</span>
        </h1>
        <p className="text-sm md:text-base text-text-muted mb-8 max-w-md">
          Personalized high-fashion recommendations and wardrobe curated by artificial intelligence. Experience e-commerce designed for you.
        </p>
        <button
          className="bg-primary-nav text-white px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wider hover:bg-accent hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center gap-3 shadow-md"
        >
          <span>Shop the Collection</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>

      {/* Hero Image */}
      <div className="z-10 hidden md:flex justify-center items-center">
        <img
          src={heroModel}
          alt="Editorial Fashion Collection Model"
          className="max-w-[110%] rounded-xl object-cover shadow-xl rotate-[1deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-500"
        />
      </div>
    </section>
  );
}
