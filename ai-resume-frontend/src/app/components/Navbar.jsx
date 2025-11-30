"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
      fixed top-0 left-0 w-full z-50
      backdrop-blur-xl 
      bg-[#0b0b0b]/60
      border-b border-white/10
      shadow-[0_0_15px_rgba(255,225,0,0.15)]
      "
    >
      {/* LIGHT ORBS */}
      <div className="absolute left-10 top-0 w-20 h-20 bg-yellow-300 opacity-10 blur-2xl pointer-events-none"></div>
      <div className="absolute right-10 top-0 w-24 h-24 bg-yellow-500 opacity-10 blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        
        {/* LOGO */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide
          bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text
        ">
          AI Resume Builder
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 text-gray-300">
          {[
            { label: "Features", link: "#features" },
            { label: "How it works", link: "#how" },
            { label: "Generate", link: "#resume" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.link}
              className="
              relative text-sm tracking-wide 
              hover:text-yellow-300 transition
              after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px]
              after:bg-yellow-300 after:transition-all after:duration-300
              hover:after:w-full
            "
            >
              {item.label}
            </a>
          ))}

          {/* LOGIN BUTTON */}
          <button
            className="
            relative px-5 py-2 rounded-full font-semibold
            bg-gradient-to-r from-yellow-300 to-yellow-500 text-black
            hover:shadow-[0_0_20px_rgba(255,225,0,0.5)]
            transition-all
            overflow-hidden
            "
          >
            <span className="relative z-10">Login</span>

            {/* SHINY EFFECT */}
            <span
              className="
              absolute inset-0 
              bg-white/30 
              opacity-0 hover:opacity-100 
              transition-all duration-300 
              mix-blend-overlay
            "
            ></span>
          </button>
        </div>

        {/* MOBILE BURGER ICON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`w-7 h-0.5 bg-gray-300 transition ${open ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`w-7 h-0.5 bg-gray-300 transition ${open ? "opacity-0" : ""}`} />
          <span className={`w-7 h-0.5 bg-gray-300 transition ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
          md:hidden flex flex-col gap-4 px-6 py-4 
          bg-[#0e0e0e]/90 backdrop-blur-lg 
          border-t border-white/10
          animate-slideDown
        "
        >
          <a href="#features" className="text-gray-300 hover:text-yellow-300">Features</a>
          <a href="#how" className="text-gray-300 hover:text-yellow-300">How it works</a>
          <a href="#resume" className="text-gray-300 hover:text-yellow-300">Generate</a>

          <button
            className="
            mt-2 w-full py-2 rounded-full font-semibold
            bg-gradient-to-r from-yellow-300 to-yellow-500 text-black
            hover:shadow-[0_0_20px_rgba(255,225,0,0.5)]
          "
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
