"use client";

import { useEffect, useRef, useState } from "react";

export default function Template6({ data = {}, previewMode = false }) {
  // ------------------------------
  // SAFE DEFAULT FIELDS
  // ------------------------------

  const name = data?.name?.trim() || "OLIVIA WILSON";
  const role = data?.role?.trim() || "SOFTWARE ENGINEER";

  const address = data?.address?.trim() || "123 Main Street, New York";
  const email = data?.email?.trim() || "olivia@example.com";
  const phone = data?.phone?.trim() || "+1 234 567 890";
  const website = data?.website?.trim() || "www.olivia.dev";

  const summary =
    data?.summary?.trim() ||
    "A passionate software engineer with expertise in scalable systems, clean architecture, and modern development workflows.";

  // SAFE ARRAY FALLBACKS
  const skills =
    Array.isArray(data.skills) && data.skills.length > 0
      ? data.skills
      : ["React", "Node.js", "MongoDB", "Express", "Git", "Docker"];

  const projects =
    Array.isArray(data.projects) && data.projects.length > 0
      ? data.projects
      : [
          {
            name: "Portfolio Website",
            bullets: [
              "Designed a modern UI in React",
              "Optimized performance using lazy loading",
              "Integrated contact API backend",
            ],
          },
        ];

  const education =
    Array.isArray(data.education) && data.education.length > 0
      ? data.education
      : [
          {
            year: "2020 - 2024",
            college: "New York University",
            details: ["Bachelor of Computer Science • CGPA: 8.3"],
          },
        ];

  const experience =
    Array.isArray(data.experience) && data.experience.length > 0
      ? data.experience
      : [
          {
            company: "TechNova Labs",
            role: "Frontend Developer",
            date: "2022 - 2023",
            bullets: [
              "Developed responsive dashboards",
              "Improved API performance",
              "Maintained reusable UI components",
            ],
          },
        ];

  const achievements =
    Array.isArray(data.achievements) && data.achievements.length > 0
      ? data.achievements
      : [
          "Winner — Hackathon 2023",
          "Top 10 — UI/UX Design Challenge",
          "Employee of The Month — TechNova Labs",
        ];

  // ------------------------------
  // AUTO FONT SCALE SYSTEM
  // ------------------------------

  const wrapperRef = useRef(null);
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    if (!previewMode) return;

    const el = wrapperRef.current;
    if (!el) return;

    let scale = 1;

    const shrinkUntilFits = () => {
      while (el.scrollHeight > el.clientHeight && scale > 0.7) {
        scale -= 0.05;
      }
      setFontScale(scale);
    };

    shrinkUntilFits();
  }, [data, previewMode]);

  // ------------------------------
  // TEMPLATE
  // ------------------------------

  return (
    <div
      ref={wrapperRef}
      className="bg-white text-gray-900 font-sans"
      style={{
        width: "850px",
        height: "1123px",
        padding: "40px",
        overflow: "hidden",
        transform: `scale(${fontScale})`,
        transformOrigin: "top left",
      }}
    >
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-wider">
          {name.toUpperCase()}
        </h1>

        <div className="mt-2 text-sm tracking-wide text-gray-600">
          {address} | {email} | {phone} | {website}
        </div>

        <div className="mt-1 uppercase text-xs tracking-widest text-gray-800 font-semibold">
          {role}
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-8 space-y-6">

        {/* SUMMARY */}
        <section>
          <div className="bg-gray-200 py-1 px-3 font-semibold text-xs tracking-widest">
            PROFILE SUMMARY
          </div>
          <p className="mt-3 text-sm leading-relaxed">{summary}</p>
        </section>

        {/* SKILLS */}
        <section>
          <div className="bg-gray-200 py-1 px-3 font-semibold text-xs tracking-widest">
            TECHNICAL SKILLS
          </div>

          <ul className="mt-3 text-sm grid grid-cols-2 list-disc ml-6 gap-y-1">
            {(skills ?? []).slice(0, 10).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        {/* PROJECTS */}
        <section>
          <div className="bg-gray-200 py-1 px-3 font-semibold text-xs tracking-widest">
            PROJECTS
          </div>

          <div className="mt-3 space-y-4">
            {(projects ?? []).slice(0, 3).map((p, i) => (
              <div key={i}>
                <span className="font-semibold text-sm">{p?.name}</span>
                <ul className="list-disc ml-6 mt-1 text-sm space-y-1">
                  {(p?.bullets ?? []).slice(0, 4).map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section>
          <div className="bg-gray-200 py-1 px-3 font-semibold text-xs tracking-widest">
            EDUCATION
          </div>

          <div className="mt-3 space-y-3">
            {(education ?? []).slice(0, 3).map((edu, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <div className="font-semibold text-sm">
                    {edu?.college || ""}
                  </div>
                  <ul className="list-disc ml-5 mt-1 text-sm space-y-1">
                    {(edu?.details ?? []).slice(0, 3).map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs text-gray-600">{edu?.year || ""}</div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section>
          <div className="bg-gray-200 py-1 px-3 font-semibold text-xs tracking-widest">
            WORK EXPERIENCE
          </div>

          <div className="mt-3 space-y-4">
            {(experience ?? []).slice(0, 3).map((ex, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold text-sm">
                      {ex?.company || ""}
                    </div>
                    <div className="text-xs text-gray-600">{ex?.role || ""}</div>
                  </div>
                  <div className="text-xs text-gray-600">{ex?.date || ""}</div>
                </div>

                <ul className="list-disc ml-6 mt-1 text-sm space-y-1">
                  {(ex?.bullets ?? []).slice(0, 5).map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section>
          <div className="bg-gray-200 py-1 px-3 font-semibold text-xs tracking-widest">
            AWARDS & ACHIEVEMENTS
          </div>

          <ul className="mt-3 list-disc ml-6 text-sm space-y-1">
            {(achievements ?? []).slice(0, 5).map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
