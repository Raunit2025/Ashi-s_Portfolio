// src/components/ThemePreview.jsx
import React from 'react';
// We don't need GSAP for this version, so you can remove those imports if you like
// import gsap from 'gsap';
import Background3D from './Background3D'; // Import the new 3D component

export const ThemeGsap = () => {
  // The useEffect for GSAP is no longer needed for the background
  // so you can remove it.

  return (
    <main className="min-h-screen bg-black text-gray-300 font-sans flex items-center justify-center relative">
      {/* The 3D background is now self-contained and self-animating */}
      <Background3D />

      {/* Content container */}
      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="text-6xl font-bold text-white mb-4">
          Project Showcase
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          A deep black background with frosted glass elements creates a sleek, modern interface for your 3D work.
        </p>
        <button className="bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
          View My Work
        </button>
      </div>
    </main>
  );
};