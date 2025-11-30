// Template6.jsx
import { useEffect, useRef, useState } from "react";

export default function Template6({ data = {}, previewMode = false, }) {
  const {
    name = "OLIVIA WILSON",
    role = "SOFTWARE ENGINEER",
    address = "123 Main Street, New York",
    email = "olivia@example.com",
    phone = "+1 234 567 890",
    website = "www.olivia.dev",
    summary = "A passionate software engineer with expertise in scalable systems, clean architecture, and modern development workflows.",
    skills = ["React", "Node.js", "MongoDB", "Express", "Git", "Docker"],
    projects = [
      {
        name: "Portfolio Website",
        bullets: [
          "Designed a modern UI in React",
          "Optimized performance using lazy loading",
          "Integrated contact API backend",
        ],
      },
    ],
    education = [
      {
        year: "2020 - 2024",
        college: "New York University",
        details: ["Bachelor of Computer Science • CGPA: 8.3"],
      },
    ],
    experience = [
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
    ],
    achievements = [
      "Winner — Hackathon 2023",
      "Top 10 — UI/UX Design Challenge",
      "Employee of The Month — TechNova Labs",
    ],
  } = data;

  // AUTO-FONT-SCALE IF OVERFLOW
  const wrapperRef = useRef(null);
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    if (!previewMode) return;

    const el = wrapperRef.current;
    if (!el) return;

    const checkOverflow = () => {
      let scale = fontScale;

      while (el.scrollHeight > el.clientHeight && scale > 0.7) {
        scale -= 0.05;
      }

      setFontScale(scale);
    };

    checkOverflow();
  }, [data]);

  return (
    <div
      
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
        <h1 className="text-3xl font-bold tracking-wider">{name.toUpperCase()}</h1>

        <div className="mt-2 text-sm tracking-wide text-gray-600">
          {address} | {email} | {phone} | {website}
        </div>

        <div className="mt-1 uppercase text-xs tracking-widest text-gray-800 font-semibold">
          {role}
        </div>
      </div>

      <div className="mt-8 space-y-6">

        {/* PROFILE SUMMARY */}
        <section>
          <div className="bg-gray-200 py-1 px-3 font-semibold text-xs tracking-widest">
            PROFILE SUMMARY
          </div>
          <p className="mt-3 text-sm leading-relaxed">
            {summary}
          </p>
        </section>

        {/* SKILLS */}
        <section>
          <div className="bg-gray-200 py-1 px-3 font-semibold text-xs tracking-widest">
            TECHNICAL SKILLS
          </div>

          <ul className="mt-3 text-sm grid grid-cols-2 list-disc ml-6 gap-y-1">
            {skills.slice(0, 10).map((s, i) => (
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
            {projects.slice(0, 3).map((p, i) => (
              <div key={i}>
                <span className="font-semibold text-sm">{p.name}</span>
                <ul className="list-disc ml-6 mt-1 text-sm space-y-1">
                  {p.bullets?.slice(0, 4).map((b, j) => (
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
            {education.slice(0, 3).map((edu, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <div className="font-semibold text-sm">{edu.college}</div>
                  <ul className="list-disc ml-5 mt-1 text-sm space-y-1">
                    {edu.details?.slice(0, 3).map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs text-gray-600">{edu.year}</div>
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
            {experience.slice(0, 3).map((ex, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold text-sm">{ex.company}</div>
                    <div className="text-xs text-gray-600">{ex.role}</div>
                  </div>
                  <div className="text-xs text-gray-600">{ex.date}</div>
                </div>

                <ul className="list-disc ml-6 mt-1 text-sm space-y-1">
                  {ex.bullets?.slice(0, 5).map((b, j) => (
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
            {achievements.slice(0, 5).map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
