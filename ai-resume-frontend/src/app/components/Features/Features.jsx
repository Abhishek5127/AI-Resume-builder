"use client";

import FeatureCard from "./FeatureCard.jsx";
import "./Feature.css";

export default function Features() {
  const cardDetails = [
    { heading: "AI Powered Resume", description: "Generate professional resumes tailored to job descriptions." },
    { heading: "ATS-Friendly Format", description: "Craft resumes that pass applicant tracking systems easily." },
    { heading: "Smart Suggestions", description: "AI recommends improvements to strengthen your resume." },
    { heading: "Multiple Templates", description: "Choose from modern, elegant, and professional layouts." },
    { heading: "One-Click Download", description: "Export your resume instantly in PDF format." },
    { heading: "Auto Job Matching", description: "Find roles based on your skills and resume content." }
  ];

  const loopedCards = [...cardDetails, ...cardDetails];

  return (
    <section
      id="features"
      className="
      relative py-24 overflow-hidden
      bg-[#0f0f0f]
      "
    >
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_0%,_#222_100%)]"></div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"></div>

      {/* TITLE */}
      <h3
        className="
        text-center text-4xl font-extrabold text-white tracking-wide mb-16
        bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text
        "
      >
        Futuristic AI Features
      </h3>

      {/* CYBER LIGHT ORBS */}
      <div className="absolute -top-10 left-1/4 w-48 h-48 bg-yellow-300 blur-[120px] opacity-20"></div>
      <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-yellow-500 blur-[150px] opacity-10"></div>

      {/* CAROUSEL */}
      <div className="overflow-hidden w-full">
        <div
          className="
          flex gap-10 whitespace-nowrap 
          animate-slide 
          will-change-transform
        "
        >
          {loopedCards.map((item, idx) => (
            <FeatureCard key={idx} heading={item.heading} description={item.description} />
          ))}
        </div>
      </div>

      {/* BOTTOM GLOW LINE */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
    </section>
  );
}
