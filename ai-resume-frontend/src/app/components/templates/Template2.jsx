export default function Template2({ data }) {
  // safe defaults
  const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []);
  const langs = Array.isArray(data.languages) ? data.languages : (data.languages ? [data.languages] : []);
  const education = Array.isArray(data.education) ? data.education : [];
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];

  return (
    <div className="font-sans text-gray-800 w-full max-w-[850px] mx-auto bg-white p-10">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-semibold tracking-wide">
          {data.name || "OLIVIA WILSON"}
        </h1>
        <p className="text-lg tracking-widest text-gray-500 mt-2">
          {data.role || "MARKETING MANAGER"}
        </p>
      </div>

      <div className="grid grid-cols-[260px_1fr] gap-10">

        {/* LEFT SIDEBAR */}
        <div className="flex flex-col gap-8">

          {/* CONTACT */}
          <div>
            <h2 className="text-xl font-semibold tracking-widest mb-3">CONTACT</h2>
            <ul className="text-gray-600 flex flex-col gap-2 text-sm">
              <li>📞 {data.phone || "+123-456-7890"}</li>
              <li>✉️ {data.email || "hello@email.com"}</li>
              <li>📍 {data.address || "123 Anywhere St, Any City"}</li>
              <li>🌐 {data.website || "www.portfolio.com"}</li>
            </ul>
          </div>

          {/* EDUCATION */}
          <div>
            <h2 className="text-xl font-semibold tracking-widest mb-3">EDUCATION</h2>
            {education.length > 0 ? (
              education.map((edu, i) => (
                <div key={i} className="mb-4 text-sm">
                  <p className="font-semibold">{edu.year}</p>
                  <p className="uppercase tracking-wide text-gray-700">{edu.college}</p>
                  <ul className="list-disc ml-5 mt-1">
                    {(edu.details || []).map((d, j) => <li key={j}>{d}</li>)}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No education added yet</p>
            )}
          </div>

          {/* SKILLS */}
          <div>
            <h2 className="text-xl font-semibold tracking-widest mb-3">SKILLS</h2>
            <ul className="text-sm text-gray-700 list-disc ml-5 flex flex-col gap-1">
              {skills.length > 0 ? skills.map((s, i) => <li key={i}>{s}</li>) : (
                <>
                  <li>Project Management</li>
                  <li>Teamwork</li>
                  <li>Communication</li>
                </>
              )}
            </ul>
          </div>

          {/* LANGUAGES */}
          <div>
            <h2 className="text-xl font-semibold tracking-widest mb-3">LANGUAGES</h2>
            <ul className="text-sm text-gray-700 list-disc ml-5 flex flex-col gap-1">
              {langs.length > 0 ? langs.map((l, i) => <li key={i}>{l}</li>) : (
                <>
                  <li>English: Fluent</li>
                  <li>French: Fluent</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-8">

          {/* PROFILE SUMMARY */}
          <div>
            <h2 className="text-xl font-semibold tracking-widest mb-3">PROFILE SUMMARY</h2>
            <p className="text-gray-700 text-sm leading-6">
              {data.summary || `Experienced and results-driven Marketing Manager with a proven track record.`}
            </p>
          </div>

          {/* WORK EXPERIENCE */}
          <div>
            <h2 className="text-xl font-semibold tracking-widest mb-3">WORK EXPERIENCE</h2>

            {experience.length > 0 ? experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between text-sm">
                  <p className="font-semibold">{exp.company || "Company"}</p>
                  <p className="text-gray-600">{exp.date || ""}</p>
                </div>

                <p className="uppercase text-gray-700 text-sm">{exp.role || "Job Title"}</p>

                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                  {(exp.bullets || []).map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            )) : <p className="text-gray-500 text-sm">No experience added yet</p>}
          </div>

          {/* PROJECTS */}
          <div>
            <h2 className="text-xl font-semibold tracking-widest mb-3">PROJECTS</h2>
            {projects.length > 0 ? projects.map((p, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold">{p.name}</p>
                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                  {(p.bullets || []).map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
              </div>
            )) : <p className="text-gray-500 text-sm">No projects yet</p>}
          </div>

        </div>
      </div>
    </div>
  );
}
