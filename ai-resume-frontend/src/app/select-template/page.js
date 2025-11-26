"use client";
import React from "react";
import { useRouter } from "next/navigation";

import Template2 from "../components/templates/Template3";
import Template3 from "../components/templates/Template1";
import Template4 from "../components/templates/Template4";
import Template5 from "../components/templates/Template5";
import Template6 from "../components/templates/Template6";

const templates = [
  { component: Template2, name: "Modern Clean" },
  { component: Template3, name: "Classic Minimal" },
  { component: Template4, name: "Bold Professional" },
  { component: Template5, name: "Navy Blue" },
  { component: Template6, name: "Blank Man" }
];

const SelectCard = () => {
  const router = useRouter();

  const handleSelect = (index) => {
    const saved =
      JSON.parse(localStorage.getItem("resume-builder-data")) || {};

    saved.templateIndex = index;

    localStorage.setItem("resume-builder-data", JSON.stringify(saved));

    router.push("/builder");
  };

  return (
    <div className="w-full min-h-screen p-12 bg-[#050505] text-white flex">
      <div className="w-[60%]">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-wide">
            Pick a Resume Template
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Preview and choose a template style you want to build with.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map(({ component: Component, name }, index) => (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className="
                rounded-xl overflow-hidden cursor-pointer relative
                bg-[#0a0a0a] border border-gray-800 
                hover:border-blue-500/60 hover:shadow-[0_0_20px_#005eff40]
                transition-all duration-300 
                hover:-translate-y-2
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] to-[#070707] opacity-80" />
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-blue-600/10 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-purple-600/10 blur-2xl" />

              <div className="relative p-4 flex items-center justify-center h-[40vh]">
                <div className="scale-[0.24] origin-center pointer-events-none">
                  <Component />
                </div>
              </div>

              <div className="relative p-4 border-t border-gray-800 bg-[#0b0b0b] text-center">
                <p className="text-sm text-gray-300">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCard;
