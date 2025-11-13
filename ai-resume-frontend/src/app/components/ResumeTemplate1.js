export default function ResumeTemplate1({ data }) {
  if (!data) return null;

  return (
    <div id="resume" className="bg-white p-10 max-w-3xl mx-auto shadow-md">
      
      {/* Name */}
      <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>

      {/* Summary */}
      <h2 className="mt-6 text-xl font-semibold text-gray-800">Summary</h2>
      <p className="text-gray-700 mt-1">{data.summary}</p>

      {/* Skills */}
      <h2 className="mt-6 text-xl font-semibold text-gray-800">Skills</h2>
      <ul className="flex flex-wrap gap-2 mt-2">
        {data.skills.map((skill, i) => (
          <li key={i} className="px-3 py-1 bg-gray-200 rounded-md">
            {skill}
          </li>
        ))}
      </ul>

      {/* Experience */}
      <h2 className="mt-6 text-xl font-semibold text-gray-800">Experience</h2>
      {data.experience.map((exp, i) => (
        <div key={i} className="mt-2">
          <p className="font-semibold">{exp.role} — {exp.company}</p>
          <p className="text-sm text-gray-600">{exp.date}</p>
          <ul className="list-disc ml-6 text-gray-700 mt-1">
            {exp.bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Projects */}
      {data.projects.length > 0 && (
        <>
          <h2 className="mt-6 text-xl font-semibold text-gray-800">Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="mt-2">
              <p className="font-semibold">{proj.name}</p>
              <ul className="list-disc ml-6 text-gray-700 mt-1">
                {proj.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <>
          <h2 className="mt-6 text-xl font-semibold text-gray-800">Education</h2>
          {data.education.map((edu, i) => (
            <p key={i} className="mt-1 text-gray-700">
              {edu.degree} — {edu.college} ({edu.year})
            </p>
          ))}
        </>
      )}

    </div>
  );
}
