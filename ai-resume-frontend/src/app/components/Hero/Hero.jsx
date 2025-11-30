"use client";

import { useState } from "react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import { useRouter } from "next/navigation";
import Loader from "../Loaders/Loader";

export default function Hero() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const withLoader = async (callback) => {
    setLoading(true);
    try {
      await callback();
    } finally {
      setLoading(false);
    }
  };

  const CTAButton = ({ href, icon, label }) => (
    <button
      onClick={() => withLoader(async () => router.push(href))}
      className="
        px-8 py-4 rounded-full text-black font-semibold 
        bg-gradient-to-r from-yellow-300 to-yellow-500 
        hover:shadow-[0_0_20px_rgba(255,225,0,0.6)]
        hover:scale-105 active:scale-95
        flex items-center gap-3 transition-all duration-300
      "
    >
      <Image src={icon} width={28} height={28} alt={label} />
      {label}
    </button>
  );


  return (
    <>
      {loading && <Loader />}

      <section className="relative overflow-hidden py-24 bg-[#0b0b0b] text-white">

        {/* ⚡ BACKGROUND LAYERS */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(#1a1a1a_1px,transparent_1px),linear-gradient(90deg,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111] to-[#0b0b0b] opacity-70"></div>

        {/* ⚡ AI NEON ORB */}
        <div className="absolute top-1/3 left-[15%] w-72 h-72 bg-yellow-300 opacity-20 blur-[130px] rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-yellow-500 opacity-10 blur-[160px] rounded-full"></div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[3px] h-[3px] bg-yellow-300 opacity-40 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>

        {/* CONTENT WRAPPER */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* LEFT — TEXT */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
              Create a  
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                Futuristic Resumes
              </span>
              Powered by AI
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Transform your career story using next-gen AI.  
              Build resumes with unmatched precision, ATS-proof formatting,  
              and visually stunning templates.
            </p>

            {/* MINI FEATURES */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {["AI Insights", "ATS Friendly", "Instant Export", "Smart Design"].map((item, i) => (
                <div
                  key={i}
                  className="
                    bg-white/5 border border-white/10 
                    px-4 py-3 rounded-xl text-gray-200 
                    backdrop-blur-md
                    hover:border-yellow-300/40 hover:shadow-lg 
                    transition-all duration-300
                  "
                >
                  ✦ {item}
                </div>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="flex items-center gap-6 pt-6">
              <CTAButton href="/select-template" icon={assets.CV} label="Create CV" />
              <CTAButton href="/select-template" icon={assets.Resume} label="Create Resume" />
            </div>

            {/* TRUST BADGE */}
            <p className="text-gray-400 text-sm">
              ⭐ Trusted by <span className="text-yellow-300">20,000+ users</span> worldwide.
            </p>
          </div>

          {/* RIGHT — FUTURISTIC TEMPLATE CARD */}
          <div className="relative flex justify-center items-center">
            {/* Floating hologram ring */}
            <div className="absolute w-[380px] h-[380px] border border-yellow-300/20 rounded-full animate-spin-slow blur-[1px]"></div>
            <div className="absolute w-[440px] h-[440px] border border-yellow-500/10 rounded-full animate-spin-slower"></div>

            {/* Resume Preview */}
            <div className="
              relative 
              rounded-2xl overflow-hidden 
              shadow-[0_0_40px_rgba(255,225,0,0.3)]
              hover:shadow-[0_0_70px_rgba(255,225,0,0.5)]
              transition-all duration-500
              hover:scale-[1.03]
            ">
              <Image
                src={assets.ResumeTemplate3}
                width={550}
                height={700}
                alt="Resume Template"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom glowing line */}
        <div className="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-40"></div>
      </section>
    </>
  );
}
