"use client";

import { useEffect, useRef, useState } from "react";
import Template2 from "../components/templates/Template3";
import Template3 from "../components/templates/Template1";
import Template4 from "../components/templates/Template4";
import Template5 from "../components/templates/Template5";
import Template6 from "../components/templates/Template6";
import Navbar from "../components/Navbar";
import { handleDownloadPDF } from "../utils/downloadPdf";

export default function PreviewPage() {
  const [data, setData] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const resumeRef = useRef(null);

  // IMPORTANT: read saved resume from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("resume-builder-data");
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to read saved data", err);
    }

    setHydrated(true);
  }, []);

  if (!hydrated || !data) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Loading preview...
      </div>
    );
  }

  // Template Index is stored INSIDE formData
  const templates = [Template2, Template3, Template4, Template5, Template6];
  const SelectedTemplate =
    templates[data.templateIndex] ?? templates[0];

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 flex flex-col items-center gap-6">

        <h1 className="text-xl font-semibold">Resume Preview</h1>

        {/* Actual A4 resume container */}
        <div
          ref={resumeRef}
          style={{
            width: 850,
            height: 1123,
            background: "white",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
          }}
        >
          <SelectedTemplate data={data} forwardedRef={resumeRef} />
        </div>

        <button
          onClick={() => handleDownloadPDF(resumeRef)}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm"
        >
          Download PDF
        </button>

        <button
          onClick={() => history.back()}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg text-sm"
        >
          ← Back to Builder
        </button>
      </div>
    </div>
  );
}
