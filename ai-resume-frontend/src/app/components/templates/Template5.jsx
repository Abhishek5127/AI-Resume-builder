"use client";

// Template5.jsx — Classic Sidebar Resume (Navy Edition) + Achievements Section
export default function Template5({ data = {} }) {
  // -----------------------------
  // SAFE TEXT FIELDS
  // -----------------------------
  const name =
    data?.name?.trim() ? data.name.toUpperCase() : "HANNAH MORALES";

  const role =
    data?.role?.trim() ? data.role.toUpperCase() : "MARKETING MANAGER";

  const phone = data?.phone?.trim() ? data.phone : "123-456-7890";
  const email = data?.email?.trim() ? data.email : "hello@reallygreatsite.com";
  const address =
    data?.address?.trim() ? data.address : "123 Anywhere St, Any City";
  const website =
    data?.website?.trim() ? data.website : "www.reallygreatsite.com";

  const summary =
    data?.summary?.trim()
      ? data.summary
      : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non tristique massa. Donec feugiat elit ut dui tristique feugiat.";

  // -----------------------------
  // SAFE ARRAYS WITH DEFAULTS
  // -----------------------------
  const skills = Array.isArray(data.skills) && data.skills.length > 0
    ? data.skills
    : [
        "Management Skills",
        "Negotiation",
        "Critical Thinking",
        "Leadership",
        "Marketing Strategy",
      ];

  const langs = Array.isArray(data.languages) && data.languages.length > 0
    ? data.languages
    : ["English", "German", "Spanish"];

  const education = Array.isArray(data.education) && data.education.length > 0
    ? data.education
    : [
        {
          college: "Rimberio University",
          year: "2019 – 2023",
          details: ["Bachelor of Business Management"],
        },
        {
          college: "Borcelle University",
          year: "2014 – 2018",
          details: ["Bachelor of Business Management"],
        },
      ];

  const experience = Array.isArray(data.experience) && data.experience.length > 0
    ? data.experience
    : [
        {
          company: "Arowwai Industries",
          role: "Marketing Manager",
          date: "2022 – 2023",
          bullets: [
            "Led brand marketing for multi-channel campaigns.",
            "Developed growth strategies increasing ROI.",
          ],
        },
        {
          company: "Ginyard International Co.",
          role: "Marketing Manager",
          date: "2020 – 2021",
          bullets: [
            "Managed digital marketing operations.",
            "Collaborated with cross-functional teams.",
          ],
        },
      ];

  const achievements =
    Array.isArray(data.achievements) && data.achievements.length > 0
      ? data.achievements
      : [
          "Awarded Best Performer – 2023",
          "Achieved 40% YoY revenue growth",
          "Recognized for outstanding leadership",
          "Built successful nationwide campaign",
        ];

  // -----------------------------
  // TEMPLATE MARKUP (SAFE)
  // -----------------------------

  return (
    <div className="w-[850px] h-[1123px] bg-white font-sans text-gray-900 border border-gray-300 overflow-hidden">

      {/* HEADER */}
      <header className="text-center py-8 border-b border-gray-300">
        <h1 className="text-4xl font-serif font-bold tracking-wide text-gray-900">
          {name}
        </h1>
        <p className="tracking-[0.3em] text-gray-700 text-sm mt-2">{role}</p>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-[260px_1fr] h-[calc(1123px-120px)]">

        {/* LEFT SIDEBAR */}
        <aside className="bg-[#1e2a39] text-white p-6 flex flex-col gap-8">

          {/* ABOUT ME */}
          <section>
            <h2 className="text-lg font-semibold mb-3 tracking-wide">ABOUT ME</h2>
            <p className="text-sm leading-relaxed opacity-90">{summary}</p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-lg font-semibold mb-3 tracking-wide">CONTACT</h2>
            <ul className="text-sm space-y-2 opacity-90">
              <li>{phone}</li>
              <li>{email}</li>
              <li>{website}</li>
              <li>{address}</li>
            </ul>
          </section>

          {/* SKILLS */}
          <section>
            <h2 className="text-lg font-semibold mb-3 tracking-wide">SKILLS</h2>
            <ul className="list-disc ml-4 text-sm opacity-90 space-y-1">
              {(skills ?? []).slice(0, 8).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>

          {/* LANGUAGES */}
          <section>
            <h2 className="text-lg font-semibold mb-3 tracking-wide">LANGUAGE</h2>
            <ul className="list-disc ml-4 text-sm opacity-90 space-y-1">
              {(langs ?? []).slice(0, 3).map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </section>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="p-8 overflow-hidden flex flex-col gap-10">

          {/* WORK EXPERIENCE */}
          <section>
            <h2 className="text-lg font-semibold tracking-wide border-b pb-1 border-gray-300">
              WORK EXPERIENCE
            </h2>

            <div className="mt-4 space-y-6 text-sm">
              {(experience ?? []).slice(0, 2).map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <p className="font-semibold">{exp?.role || ""}</p>
                    <p className="text-gray-600">{exp?.date || ""}</p>
                  </div>

                  <p className="text-gray-800 font-medium mt-1">
                    {exp?.company || ""}
                  </p>

                  <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    {(exp?.bullets ?? []).slice(0, 6).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-lg font-semibold tracking-wide border-b pb-1 border-gray-300">
              EDUCATION
            </h2>

            <div className="mt-4 space-y-5 text-sm">
              {(education ?? []).slice(0, 2).map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <p className="font-semibold">{edu?.college || ""}</p>
                    <p className="text-gray-600">{edu?.year || ""}</p>
                  </div>

                  <ul className="ml-5 list-disc mt-1 text-gray-700 space-y-1">
                    {(edu?.details ?? []).slice(0, 3).map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section>
            <h2 className="text-lg font-semibold tracking-wide border-b pb-1 border-gray-300">
              ACHIEVEMENTS
            </h2>

            <ul className="list-disc ml-5 mt-3 text-sm text-gray-700 space-y-1">
              {(achievements ?? []).slice(0, 4).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
