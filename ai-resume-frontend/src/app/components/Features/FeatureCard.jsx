"use client";
import React from "react";

export default function FeatureCard({ heading, description }) {
  return (
    <div
      className="
      futuristic-card
      min-w-[280px] max-w-[320px]
      p-6 rounded-2xl 
      bg-gradient-to-b from-[#1c1c1c] to-[#0e0e0e]
      border border-white/10 
      shadow-[0_0_20px_rgba(255,255,255,0.05)]
      hover:shadow-[0_0_25px_rgba(255,223,0,0.5)]
      hover:border-yellow-300/40
      transition-all duration-300 
      text-white
      relative
      overflow-hidden
      cursor-pointer
      group
      "
    >
      {/* NEON CORNER LIGHT */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-300 blur-2xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-500 blur-xl opacity-10"></div>
        </div>
      </div>

      {/* HEADING */}
      <h4 className="text-xl font-semibold mb-2 tracking-wide 
        bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text
      ">
        {heading}
      </h4>

      {/* DESCRIPTION */}
      <p className="text-gray-300 leading-relaxed text-sm">{description}</p>

      {/* FUTURISTIC BOTTOM LINE */}
      <div className="mt-4 h-[2px] w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></div>
    </div>
  );
}
