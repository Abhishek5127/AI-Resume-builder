// Template3.jsx

import React from "react";
export default function Template2({ data = {}, previewMode = false, forwardedRef }) {
  const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []);
  const langs = Array.isArray(data.languages) ? data.languages : (data.languages ? [data.languages] : []);
  const education = Array.isArray(data.education) ? data.education : [];
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];

  const name = (data?.name || "OLIVIA WILSON ").toUpperCase();
  const role = (data?.role || "MARKETING MANAGER").toUpperCase();
  const phone = data?.phone || "+123-456-7890";
  const email = data?.email || "hello@email.com";
  const address = data?.address || "123 Anywhere St, Any City";
  const website = data?.website || "www.portfolio.com";
  const summary = data?.summary || "Experienced and results-driven Marketing Manager with a proven track record in strategy, branding, analytics, and leadership.";

  
  return (
    <div ref={forwardedRef}
      className="bg-white font-body text-gray-900 w-[850px] h-[1123px] box-border border border-gray-200 overflow-hidden"
      aria-label="Resume page"
    >
      {/* Optional decorative background image (not used by default).
          If you later set data.bgImage to a URL, it will render as a faint decorative <img>.
          Example path you uploaded earlier (not used by default): /mnt/data/Minimalist White and Grey Professional Resume.png */}
      {data.bgImage && (
        <img
          src={data.bgImage}
          alt=""
          className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 top-9 opacity-5 w-[520px] h-[200px] object-cover"
          aria-hidden
        />
      )}

      {/* Page inner padding */}
      <div className="w-full h-full p-7 flex flex-col box-border">
        {/* Header */}
        <header className="relative z-10">
          <div className="border-t border-gray-200 pt-3 pb-2" />

          <div className="flex flex-col items-center mt-2">
            <h1 className="font-heading text-3xl tracking-widest text-gray-800">{name}</h1>
            <div className="h-1" />
            <div className="text-xs tracking-wider text-gray-600 uppercase font-semibold">{role}</div>
          </div>

          <div className="border-b border-gray-200 mt-4" />
        </header>

        {/* Main grid */}
        <div className="mt-4 grid grid-cols-[280px_1fr] gap-6 flex-1 min-h-0">
          {/* Left column */}
          <aside className="flex flex-col gap-3 z-10">
            {/* CONTACT */}
            <section className="bg-gray-50 border border-gray-200 rounded-md p-3">
              <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs tracking-wider font-semibold text-gray-600">CONTACT</div>
              <div className="mt-3 text-sm text-gray-800 space-y-1">
                <div>{phone}</div>
                <div>{email}</div>
                <div>{address}</div>
                <div>{website}</div>
              </div>
            </section>

            {/* EDUCATION */}
            <section className="bg-white border border-gray-200 rounded-md p-3">
              <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs tracking-wider font-semibold text-gray-600">EDUCATION</div>
              <div className="mt-3 text-sm text-gray-800 space-y-2">
                {education.length > 0 ? (
                  education.slice(0, 2).map((edu, i) => (
                    <div key={i}>
                      <div className="text-sm font-semibold text-gray-900">{edu.college}</div>
                      <div className="text-xs text-gray-500 mt-1">{edu.year}</div>
                      {(edu.details || []).length > 0 && (
                        <ul className="list-disc ml-4 mt-2 text-sm text-gray-700">
                          {(edu.details || []).slice(0, 3).map((d, j) => <li key={j}>{d}</li>)}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-400">No education</div>
                )}
              </div>
            </section>

            {/* SKILLS */}
            <section className="bg-white border border-gray-200 rounded-md p-3">
              <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs tracking-wider font-semibold text-gray-600">SKILLS</div>
              <ul className="mt-3 ml-4 text-sm text-gray-800 list-disc space-y-1">
                {(skills.length > 0 ? skills.slice(0, 8) : ["Leadership", "Communication", "Teamwork"]).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            {/* LANGUAGES */}
            <section className="bg-white border border-gray-200 rounded-md p-3">
              <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs tracking-wider font-semibold text-gray-600">LANGUAGES</div>
              <ul className="mt-3 ml-4 text-sm text-gray-800 space-y-1">
                {(langs.length > 0 ? langs.slice(0, 3) : ["English — Fluent", "French — Fluent"]).map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </section>
          </aside>

          {/* Right column */}
          <main className="flex flex-col gap-3 min-h-0">
            {/* PROFILE */}
            <section className="bg-white border border-gray-200 rounded-md p-3">
              <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs tracking-wider font-semibold text-gray-600">PROFILE SUMMARY</div>
              <p className="mt-3 text-sm text-gray-800 leading-relaxed">{summary}</p>
            </section>

            {/* EXPERIENCE */}
            <section className="bg-white border border-gray-200 rounded-md p-3 flex-1 min-h-0 overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs tracking-wider font-semibold text-gray-600">WORK EXPERIENCE</div>
                <div className="text-xs text-gray-400">({Math.min(experience.length, 2)} / 2)</div>
              </div>

              <div className="mt-3 flex flex-col gap-3 overflow-y-auto pr-2">
                {experience.length > 0 ? experience.slice(0, 2).map((exp, i) => (
                  <div key={i} className="last:mb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{exp.company}</div>
                        <div className="text-xs text-gray-600 mt-1">{exp.role}</div>
                      </div>
                      <div className="text-xs text-gray-500">{exp.date}</div>
                    </div>

                    {(exp.bullets || []).length > 0 && (
                      <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                        {(exp.bullets || []).slice(0, 6).map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                )) : (
                  <div className="text-sm text-gray-400">No work experience</div>
                )}
              </div>
            </section>

            {/* PROJECTS */}
            <section className="bg-white border border-gray-200 rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs tracking-wider font-semibold text-gray-600">PROJECTS</div>
                <div className="text-xs text-gray-400">({Math.min(projects.length, 3)} / 3)</div>
              </div>


              <div className="mt-3 text-sm text-gray-800 space-y-2">
                {projects.length > 0 ? projects.slice(0, 3).map((p, i) => (
                  <div key={i}>
                    <div className="text-sm font-semibold text-gray-900">{p.name}</div>
                    {(p.bullets || []).length > 0 && (
                      <ul className="list-disc ml-5 mt-1 text-sm text-gray-700 space-y-1">
                        {(p.bullets || []).slice(0, 4).map((b, bi) => <li key={bi}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                )) : (
                  <div className="text-sm text-gray-400">No projects</div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>

    </div>
  );
}
