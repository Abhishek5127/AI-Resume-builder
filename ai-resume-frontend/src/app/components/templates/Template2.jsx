export default function Template2({ data }) {
  const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []);
  const langs = Array.isArray(data.languages) ? data.languages : (data.languages ? [data.languages] : []);
  const education = Array.isArray(data.education) ? data.education : [];
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];

  return (
    <div className="font-sans text-gray-800 w-full max-w-[900px] mx-auto bg-white p-10 rounded-xl shadow-xl border border-gray-200">

      {/* HEADER */}
      <div className="text-center mb-12 pb-6 border-b border-gray-300">
        <h1 className="text-5xl font-bold tracking-widest text-gray-900">
          {data?.name?.toUpperCase() || "OLIVIA WILSON"}
        </h1>
        <p className="text-sm tracking-[0.5em] text-gray-500 mt-3">
          {data?.role?.toUpperCase() || "MARKETING MANAGER"}
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-[280px_1fr] gap-8">

        {/* LEFT SIDEBAR */}
        <div className="flex flex-col gap-8">

          {/* SECTION BOX */}
          <div className="p-6 rounded-xl shadow-sm border border-gray-300 bg-gradient-to-b from-gray-50 to-gray-100">
            <h2 className="text-lg font-semibold tracking-widest mb-4 text-gray-700">
              CONTACT
            </h2>
            <ul className="text-gray-700 flex flex-col gap-2 text-sm">
              <li>📞 {data.phone || "+123-456-7890"}</li>
              <li>✉️ {data.email || "hello@email.com"}</li>
              <li>📍 {data.address || "123 Anywhere St, Any City"}</li>
              <li>🌐 {data.website || "www.portfolio.com"}</li>
            </ul>
          </div>

          {/* EDUCATION */}
          <div className="p-6 rounded-xl shadow-sm border border-gray-300 bg-gradient-to-b from-gray-50 to-gray-100">
            <h2 className="text-lg font-semibold tracking-widest mb-4 text-gray-700">
              EDUCATION
            </h2>

            {education.length > 0 ? (
              education.map((edu, i) => (
                <div key={i} className="mb-4 text-sm">
                  <p className="font-semibold text-gray-900">{edu.year}</p>
                  <p className="uppercase tracking-wide font-bold mt-1 text-gray-800">
                    {edu.college?.toUpperCase()}
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-gray-700">
                    {(edu.details || []).map((d, j) => <li key={j}>{d}</li>)}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No education added yet</p>
            )}
          </div>

          {/* SKILLS */}
          <div className="p-6 rounded-xl shadow-sm border border-gray-300 bg-gradient-to-b from-gray-50 to-gray-100">
            <h2 className="text-lg font-semibold tracking-widest mb-4 text-gray-700">
              SKILLS
            </h2>
            <ul className="list-disc ml-5 text-sm flex flex-col gap-1 text-gray-700">
              {skills.length > 0 ? skills.map((s, i) => <li key={i}>{s}</li>) : (
                <>
                  <li>Leadership</li>
                  <li>Communication</li>
                  <li>Teamwork</li>
                </>
              )}
            </ul>
          </div>

          {/* LANGUAGES */}
          <div className="p-6 rounded-xl shadow-sm border border-gray-300 bg-gradient-to-b from-gray-50 to-gray-100">
            <h2 className="text-lg font-semibold tracking-widest mb-4 text-gray-700">
              LANGUAGES
            </h2>
            <ul className="list-disc ml-5 text-sm flex flex-col gap-1 text-gray-700">
              {langs.length > 0 ? langs.map((l, i) => <li key={i}>{l}</li>) :
                <>
                  <li>English — Fluent</li>
                  <li>German — Basic</li>
                </>
              }
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-8">

          {/* PROFILE */}
          <div className="p-6 rounded-xl shadow-sm border border-gray-300 bg-white">
            <h2 className="text-lg font-semibold tracking-widest mb-4 text-gray-700">
              PROFILE SUMMARY
            </h2>
            <p className="text-gray-700 text-sm leading-6">
              {data.summary ||
                "Experienced and results-driven Marketing Manager with a proven track record in strategy, branding, analytics, and leadership."}
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="p-6 rounded-xl shadow-sm border border-gray-300 bg-white">
            <h2 className="text-lg font-semibold tracking-widest mb-4 text-gray-700">
              WORK EXPERIENCE
            </h2>

            {experience.length > 0 ? experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between text-sm">
                  <p className="font-bold text-gray-900">{exp.company}</p>
                  <p className="text-gray-600">{exp.date}</p>
                </div>

                <p className="uppercase text-gray-700 text-sm mt-1 font-semibold">
                  {exp.role}
                </p>

                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                  {(exp.bullets || []).map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            )) : (
              <p className="text-gray-500 text-sm">No experience yet</p>
            )}
          </div>

          {/* PROJECTS */}
          <div className="p-6 rounded-xl shadow-sm border border-gray-300 bg-white">
            <h2 className="text-lg font-semibold tracking-widest mb-4 text-gray-700">
              PROJECTS
            </h2>
            {projects.length > 0 ? projects.map((p, i) => (
              <div key={i} className="mb-4">
                <p className="font-bold text-gray-900">{p.name}</p>
                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                  {(p.bullets || []).map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
              </div>
            )) : (
              <p className="text-gray-500 text-sm">No projects yet</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
