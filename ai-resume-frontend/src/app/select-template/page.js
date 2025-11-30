"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Template2 from "../components/templates/Template3";
import Template3 from "../components/templates/Template1";
import Template4 from "../components/templates/Template4";
import Template5 from "../components/templates/Template5";
import Template6 from "../components/templates/Template6";

const templates = [
  { component: Template2, name: "Modern Clean", description: "Perfect for tech and creative roles" },
  { component: Template3, name: "Classic Minimal", description: "Timeless design for any industry" },
  { component: Template4, name: "Bold Professional", description: "Stand out with confidence" },
  { component: Template5, name: "Navy Blue", description: "Corporate and sophisticated" },
  { component: Template6, name: "Blank Man", description: "Clean slate for customization" }
];

export default function SelectCard() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleSelect = (index) => {
    const saved = JSON.parse(localStorage.getItem("resume-builder-data")) || {};
    saved.templateIndex = index;
    localStorage.setItem("resume-builder-data", JSON.stringify(saved));
    router.push("/builder");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0a0a0a] text-white">
      
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yellow-300/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 flex gap-8 p-8 lg:p-12 max-w-[1800px] mx-auto">
        
        {/* LEFT PANEL */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-3">
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Choose Your
              </span>
              <br />
              <span className="text-white">Resume Template</span>
            </h1>
            <p className="text-gray-400 text-base mt-4 max-w-xl">
              Select a professionally designed template that showcases your experience and helps you land your dream job.
            </p>
          </div>

          {/* TEMPLATE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {templates.map(({ component: Component, name, description }, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSelect(index)}
                className={`
                  group rounded-2xl overflow-hidden cursor-pointer relative
                  bg-gradient-to-br from-[#111111] to-[#0a0a0a]
                  border transition-all duration-500 transform
                  ${
                    selected === index
                      ? "border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.3)] scale-[1.02] -translate-y-1"
                      : hoveredIndex === index
                      ? "border-yellow-400/50 shadow-[0_0_25px_rgba(250,204,21,0.15)] scale-[1.01]"
                      : "border-gray-800/50 hover:border-gray-700"
                  }
                `}
              >
                {/* Glow effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500
                `}></div>

                {/* Selection indicator */}
                {selected === index && (
                  <div className="absolute top-4 right-4 z-20 bg-yellow-400 text-black rounded-full p-2 shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                )}

                {/* TEMPLATE PREVIEW */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center h-[350px] overflow-hidden">
                  {/* Centered preview with proper scaling */}
                  <div className="flex items-center justify-center w-full h-full p-4">
                    <div className="transform scale-[0.28] origin-center shadow-2xl">
                      <Component />
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                    flex items-end justify-center pb-6
                    transition-opacity duration-300
                    ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}
                  `}>
                    <span className="text-yellow-400 font-semibold text-sm tracking-wider">
                      CLICK TO SELECT
                    </span>
                  </div>
                </div>

                {/* NAME & DESCRIPTION */}
                <div className="relative p-5 bg-[#0d0d0d] border-t border-gray-800/50">
                  <p className="text-white font-semibold text-base mb-1">{name}</p>
                  <p className="text-gray-500 text-xs">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="hidden lg:block w-[380px] sticky top-8 h-fit">
          <div className="
            p-8 rounded-3xl 
            bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a]
            border border-yellow-400/20
            shadow-[0_0_50px_rgba(250,204,21,0.1)]
            backdrop-blur-sm
          ">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">
                Quick Preview
              </h2>
            </div>

            {selected === null && hoveredIndex === null ? (
              <div className="space-y-4">
                <p className="text-gray-500 text-sm leading-relaxed">
                  Hover over any template to see details, or click to start building your resume immediately.
                </p>
                
                <div className="pt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-400 text-xs">✓</span>
                    </div>
                    <p className="text-gray-400 text-xs">ATS-friendly formats</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-400 text-xs">✓</span>
                    </div>
                    <p className="text-gray-400 text-xs">Professionally designed</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-400 text-xs">✓</span>
                    </div>
                    <p className="text-gray-400 text-xs">Easy to customize</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <p className="text-2xl font-bold text-yellow-400 mb-2">
                    {templates[hoveredIndex ?? selected].name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {templates[hoveredIndex ?? selected].description}
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  This template features a clean, modern design that's optimized for Applicant Tracking Systems (ATS). 
                  It perfectly balances visual appeal with professional structure to help you stand out.
                </p>

                <button
                  onClick={() => handleSelect(hoveredIndex ?? selected)}
                  className="
                    w-full py-4 rounded-xl
                    bg-gradient-to-r from-yellow-400 to-yellow-500
                    text-black font-bold text-sm tracking-wide
                    hover:from-yellow-300 hover:to-yellow-400
                    transform hover:scale-[1.02] active:scale-[0.98]
                    transition-all duration-200
                    shadow-[0_0_20px_rgba(250,204,21,0.3)]
                    hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]
                  "
                >
                  Use This Template →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}