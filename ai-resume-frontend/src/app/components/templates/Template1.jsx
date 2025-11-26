// Template3.jsx — Strict One-Page Pastel Creative Resume (Left Sidebar + Right Content)
export default function Template3({ data = {}, forwardedRef}) {
  // SAME LOGIC — DO NOT CHANGE
  const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []);
  const langs = Array.isArray(data.languages) ? data.languages : (data.languages ? [data.languages] : []);
  const education = Array.isArray(data.education) ? data.education : [];
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];

  const name = (data?.name || "OLIVIA WILSON").toUpperCase();
  const role = (data?.role || "MARKETING MANAGER").toUpperCase();
  const phone = data?.phone || "+123-456-7890";
  const email = data?.email || "hello@email.com";
  const address = data?.address || "123 Anywhere St, Any City";
  const website = data?.website || "www.portfolio.com";
  const summary = data?.summary || "Experienced and results-driven Marketing Manager skilled in strategy, branding, analytics, and leadership.";

  return (
    <div ref={forwardedRef}
      className="
        w-[794px] 
        h-[1123px] 
        bg-gray-50 
        font-sans 
        text-gray-900 
        border border-gray-200 
        box-border 
        overflow-hidden
      "
    >

      {/* Soft Green Header */}
      <div className="w-full h-[180px] bg-green-200/70 rounded-b-[70px] shadow-sm flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-3xl font-bold tracking-wide text-gray-800 leading-tight">
          {name}
        </h1>
        <p className="text-xs tracking-[0.3em] text-gray-700 mt-1">
          {role}
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="px-8 pt-6 grid grid-cols-[260px_1fr] gap-6">

        {/* LEFT SIDEBAR */}
        <div className="flex flex-col gap-5">

          {/* CONTACT */}
          <section className="bg-white p-4 rounded-xl shadow-md border border-green-100">
            <h2 className="text-[10px] font-semibold tracking-widest text-green-700">CONTACT</h2>
            <div className="mt-2 text-[13px] space-y-1">
              <p>{phone}</p>
              <p>{email}</p>
              <p>{address}</p>
              <p>{website}</p>
            </div>
          </section>

          {/* EDUCATION */}
          <section className="bg-white p-4 rounded-xl shadow-md border border-green-100">
            <h2 className="text-[10px] font-semibold tracking-widest text-green-700">EDUCATION</h2>
            <div className="mt-2 text-[13px] space-y-3">
              {education.slice(0, 2).map((edu, i) => (
                <div key={i}>
                  <p className="font-semibold text-[13px]">{edu.college}</p>
                  <p className="text-[11px] text-gray-600">{edu.year}</p>
                  <ul className="list-disc ml-4 text-[12px] mt-1">
                    {(edu.details || []).slice(0, 3).map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section className="bg-white p-4 rounded-xl shadow-md border border-green-100">
            <h2 className="text-[10px] font-semibold tracking-widest text-green-700">SKILLS</h2>
            <ul className="mt-2 ml-4 text-[13px] list-disc space-y-[2px]">
              {skills.slice(0, 8).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>

          {/* LANGUAGES */}
          <section className="bg-white p-4 rounded-xl shadow-md border border-green-100">
            <h2 className="text-[10px] font-semibold tracking-widest text-green-700">LANGUAGES</h2>
            <ul className="mt-2 ml-4 text-[13px] list-disc space-y-[2px]">
              {langs.slice(0, 3).map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </section>

        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-5">

          {/* SUMMARY */}
          <section className="bg-white p-5 rounded-xl shadow-md border border-green-100">
            <h2 className="text-[10px] font-semibold tracking-widest text-green-700">PROFILE SUMMARY</h2>
            <p className="text-[13px] mt-2 leading-5">{summary}</p>
          </section>

          {/* EXPERIENCE */}
          <section className="bg-white p-5 rounded-xl shadow-md border border-green-100">
            <div className="flex justify-between">
              <h2 className="text-[10px] font-semibold tracking-widest text-green-700">WORK EXPERIENCE</h2>
              <p className="text-[10px] text-gray-600">({Math.min(experience.length, 2)} / 2)</p>
            </div>

            <div className="mt-3 space-y-4">
              {experience.slice(0, 2).map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-[13px]">{exp.company}</p>
                      <p className="text-[11px] text-gray-600">{exp.role}</p>
                    </div>
                    <p className="text-[11px] text-gray-500">{exp.date}</p>
                  </div>

                  <ul className="list-disc ml-5 mt-1 text-[12px] space-y-[2px]">
                    {(exp.bullets || []).slice(0, 6).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section className="bg-white p-5 rounded-xl shadow-md border border-green-100">
            <div className="flex justify-between">
              <h2 className="text-[10px] font-semibold tracking-widest text-green-700">PROJECTS</h2>
              <p className="text-[10px] text-gray-600">({Math.min(projects.length, 3)} / 3)</p>
            </div>

            <div className="mt-3 space-y-4">
              {projects.slice(0, 3).map((p, i) => (
                <div key={i}>
                  <p className="font-semibold text-[13px]">{p.name}</p>
                  <ul className="list-disc ml-5 mt-1 text-[12px] space-y-[2px]">
                    {(p.bullets || []).slice(0, 4).map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
