"use client";


import { useState } from "react";
import { generateResume } from "@/app/lib/api.js";
import ResumeTemplate1 from "@/app/components/ResumeTemplate1";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    skills: "",
    experience: "",
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setLoading(true);

    // Convert form data → structured resume format
    const payload = {
      summary: form.role,
      skills: form.skills.split(",").map((s) => s.trim()),
      experience: [
        {
          company: "User Provided",
          role: form.role,
          date: "Not Provided",
          bullets: form.experience
            .split(".")
            .map((x) => x.trim())
            .filter(Boolean),
        },
      ],
      projects: [],
      education: [],
    };

    try {
      const res = await generateResume(payload);
      setResume({ ...res.resume, name: form.name });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const downloadPDF = async () => {
  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.getElementById("resume");
  html2pdf().from(element).save("resume.pdf");
};

  return (
    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold mb-6 text-center">
        AI Resume Builder
      </h1>

      <div className="space-y-4 bg-white p-6 rounded shadow">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 border rounded"
        />

        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role (Example: Frontend Developer)"
          className="w-full p-3 border rounded"
        />

        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="w-full p-3 border rounded"
        />

        <textarea
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Write experience. Separate bullet points with a dot (.)"
          className="w-full p-3 border rounded h-32"
        />

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </div>

      {/* Resume Template Preview */}
      {resume && (
        <div className="mt-10">
          <ResumeTemplate1 data={resume} />

          <button
            onClick={downloadPDF}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
