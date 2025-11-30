// Template4.jsx — Tech Startup Resume (with smart defaults + strict A4 layout)

export default function Template4({ data = {},  }) {
  // -----------------------------
  // SMART DEFAULT FALLBACK LOGIC
  // -----------------------------

  const skills =
    Array.isArray(data.skills) && data.skills.length > 0
      ? data.skills
      : [
          "JavaScript",
          "React",
          "Next.js",
          "Node.js",
          "Tailwind CSS",
          "MongoDB",
          "REST APIs",
          "Git"
        ];

  const langs =
    Array.isArray(data.languages) && data.languages.length > 0
      ? data.languages
      : ["English — Fluent", "Hindi — Native", "German — Basic"];

  const education =
    Array.isArray(data.education) && data.education.length > 0
      ? data.education
      : [
          {
            college: "BCA — Maharshi Dayanand Saraswati University",
            year: "2023 – Present",
            details: [
              "Computer Science Fundamentals",
              "Object-Oriented Programming",
              "Database Management Systems"
            ]
          },
          {
            college: "Higher Secondary School",
            year: "2021 – 2023",
            details: ["Physics", "Mathematics", "Computer Applications"]
          }
        ];

  const experience =
    Array.isArray(data.experience) && data.experience.length > 0
      ? data.experience
      : [
          {
            company: "TechNova Solutions",
            role: "Frontend Developer Intern",
            date: "2024 – Present",
            bullets: [
              "Built reusable UI components in React + Tailwind",
              "Improved page load performance by 28%",
              "Integrated REST APIs and optimized state management"
            ]
          },
          {
            company: "Open Source Community",
            role: "Contributor",
            date: "2023 – Present",
            bullets: [
              "Contributed meaningful PRs to public repositories",
              "Wrote clean, modular JavaScript utilities",
              "Improved documentation & DX for new contributors"
            ]
          }
        ];

  const projects =
    Array.isArray(data.projects) && data.projects.length > 0
      ? data.projects
      : [
          {
            name: "AI Resume Builder",
            bullets: [
              "Developed using Next.js and Tailwind CSS",
              "Integrated OpenAI-based enhancement engine",
              "Feature-rich template switching UI"
            ]
          },
          {
            name: "Chess Move Analyzer",
            bullets: [
              "YOLOv5 model for piece recognition",
              "Python engine suggesting next best moves",
              "Real-time visual detection pipeline"
            ]
          },
          {
            name: "Personal Portfolio",
            bullets: [
              "React + Framer Motion animations",
              "SEO optimized and responsive",
              "Dark/light theme support"
            ]
          }
        ];

  const name =
    data?.name && data.name.trim() !== ""
      ? data.name.toUpperCase()
      : "ABHISHEK CHOUDHARY";

  const role =
    data?.role && data.role.trim() !== ""
      ? data.role.toUpperCase()
      : "FULL STACK DEVELOPER";

  const phone = data?.phone && data.phone.trim() !== "" ? data.phone : "+91 98765 43210";
  const email = data?.email && data.email.trim() !== "" ? data.email : "abhishek@example.com";
  const address = data?.address && data.address.trim() !== "" ? data.address : "Jaipur, Rajasthan";
  const website = data?.website && data.website.trim() !== "" ? data.website : "abhishek.dev";

  const summary =
    data?.summary && data.summary.trim() !== ""
      ? data.summary
      : "Full-stack developer passionate about building scalable, modern web applications. Skilled in JavaScript, React, Next.js, Node.js and cloud-first development. Strong focus on writing clean code, optimizing performance, and delivering polished user experiences.";

  // -----------------------------
  // TEMPLATE LAYOUT (STRICT A4)
  // -----------------------------

  return (
    <div className="w-[850px] h-[1123px] bg-white font-sans text-gray-900 box-border border border-gray-200 overflow-visible p-10">

      {/* HEADER */}
      <header className="w-full border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900">{name}</h1>
        <p className="text-sm tracking-[0.25em] text-gray-500 mt-1">{role}</p>

        <div className="flex flex-wrap gap-6 text-[13px] text-gray-700 mt-4">
          <span>{phone}</span>
          <span>{email}</span>
          <span>{address}</span>
          <span>{website}</span>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-[260px_1fr] gap-6 mt-6">

        {/* LEFT COLUMN */}
        <aside className="flex flex-col gap-6">

          {/* SKILLS */}
          <section>
            <h2 className="text-xs font-semibold text-gray-600 tracking-widest mb-2">SKILLS</h2>
            <ul className="text-[13px] text-gray-800 list-disc ml-5 space-y-1">
              {skills.slice(0, 8).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </section>

          {/* LANGUAGES */}
          <section>
            <h2 className="text-xs font-semibold text-gray-600 tracking-widest mb-2">LANGUAGES</h2>
            <ul className="text-[13px] text-gray-800 list-disc ml-5 space-y-1">
              {langs.slice(0, 3).map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-xs font-semibold text-gray-600 tracking-widest mb-2">EDUCATION</h2>
            {education.slice(0, 2).map((edu, i) => (
              <div key={i} className="mb-4">
                <p className="text-[13px] font-semibold text-gray-900">{edu.college}</p>
                <p className="text-[12px] text-gray-600">{edu.year}</p>
                <ul className="list-disc ml-5 text-[12px] mt-1">
                  {(edu.details || []).slice(0, 3).map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

        </aside>

        {/* RIGHT COLUMN */}
        <main className="flex flex-col gap-6">

          {/* SUMMARY */}
          <section>
            <h2 className="text-xs font-semibold tracking-widest text-gray-600 mb-2">SUMMARY</h2>
            <p className="text-[13px] leading-relaxed text-gray-800">{summary}</p>
          </section>

          {/* EXPERIENCE */}
          <section>
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-semibold tracking-widest text-gray-600">EXPERIENCE</h2>
              <span className="text-xs text-gray-400">
                ({Math.min(experience.length, 2)} / 2)
              </span>
            </div>

            <div className="mt-3 space-y-5">
              {experience.slice(0, 2).map((ex, i) => (
                <div key={i}>
                  <p className="font-semibold text-[13px] text-gray-900">{ex.company}</p>
                  <p className="text-[12px] text-gray-600">{ex.role} — {ex.date}</p>
                  <ul className="list-disc ml-5 mt-1 text-[12px] text-gray-700 space-y-1">
                    {(ex.bullets || []).slice(0, 6).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section>
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-semibold tracking-widest text-gray-600">PROJECTS</h2>
              <span className="text-xs text-gray-400">
                ({Math.min(projects.length, 3)} / 3)
              </span>
            </div>

            <div className="mt-3 space-y-5">
              {projects.slice(0, 3).map((p, i) => (
                <div key={i}>
                  <p className="font-semibold text-[13px] text-gray-900">{p.name}</p>
                  <ul className="list-disc ml-5 mt-1 text-[12px] text-gray-700 space-y-1">
                    {(p.bullets || []).slice(0, 4).map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
