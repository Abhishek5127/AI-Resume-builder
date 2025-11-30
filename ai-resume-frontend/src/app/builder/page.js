"use client";

import { useRef, useState, useEffect } from "react";
import Template2 from "../components/templates/Template3";
import Template3 from "../components/templates/Template1";
import Template4 from "../components/templates/Template4";
import Template5 from "../components/templates/Template5";
import Template6 from "../components/templates/Template6";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useSearchParams, useRouter } from "next/navigation";

const STORAGE_KEY = "resume-builder-data";
const DRAFTS_KEY = "resume-builder-drafts";

const DEFAULT_FORM = {
  name: "",
  role: "",
  summary: "",
  skills: [],
  phone: "",
  email: "",
  address: "",
  education: [],
  experience: [],
  languages: [],
  projects: [],
  website: "",
  useAchievements: false,
  achievements: [],
  templateIndex: 0,
};

export default function BuilderPage() {
  // Limits
  const LIMITS = {
    skills: 8,
    experience: 2,
    projects: 3,
    education: 2,
    languages: 3,
    summary: 450,
  };

  // ----- Small helpers for safety -----
  const arr = (v) => (Array.isArray(v) ? v : []);
  const num = (v) => (typeof v === "number" && !Number.isNaN(v) ? v : 0);
  const safeString = (v) =>
    typeof v === "string" ? v : v == null ? "" : String(v);
  const clampIndex = (i, max) =>
    typeof i === "number" && i >= 0 && i < max ? i : 0;

  const sanitizeFormData = (raw) => {
    // Merge with defaults then coerce each field to safe types
    const base = { ...DEFAULT_FORM, ...(raw || {}) };

    return {
      name: safeString(base.name),
      role: safeString(base.role),
      summary: safeString(base.summary).slice(0, LIMITS.summary),
      skills: arr(base.skills).slice(0, LIMITS.skills),
      phone: safeString(base.phone),
      email: safeString(base.email),
      address: safeString(base.address),
      education: arr(base.education).map((e) => ({
        year: safeString(e?.year),
        college: safeString(e?.college),
        details: arr(e?.details).map((d) => safeString(d)),
      })).slice(0, LIMITS.education),
      experience: arr(base.experience).map((ex) => ({
        company: safeString(ex?.company),
        role: safeString(ex?.role),
        date: safeString(ex?.date),
        bullets: arr(ex?.bullets).map((b) => safeString(b)),
      })).slice(0, LIMITS.experience),
      languages: arr(base.languages).slice(0, LIMITS.languages).map((l) => safeString(l)),
      projects: arr(base.projects).map((p) => ({
        name: safeString(p?.name),
        bullets: arr(p?.bullets).map((b) => safeString(b)),
      })).slice(0, LIMITS.projects),
      website: safeString(base.website),
      useAchievements: Boolean(base.useAchievements),
      achievements: arr(base.achievements).map((a) => safeString(a)),
      templateIndex: clampIndex(num(base.templateIndex), 5), // templates length = 5
    };
  };

  // --- Synchronously initialize formData from localStorage to avoid flash/overwrite ---
  const [formData, setFormData] = useState(() => {
    try {
      if (typeof window === "undefined") return DEFAULT_FORM;
      const savedRaw = localStorage.getItem(STORAGE_KEY);
      const parsed = savedRaw ? JSON.parse(savedRaw) : null;
      return sanitizeFormData(parsed);
    } catch (err) {
      console.error("Failed to parse saved formData:", err);
      return DEFAULT_FORM;
    }
  });

  // temporary/draft inputs (persisted separately)
  const [educationInput, setEducationInput] = useState(() => {
    try {
      if (typeof window === "undefined") return { year: "", college: "", details: "" };
      const drafts = localStorage.getItem(DRAFTS_KEY);
      const parsed = drafts ? JSON.parse(drafts) : null;
      const p = parsed?.educationInput ?? { year: "", college: "", details: "" };
      return { year: safeString(p.year), college: safeString(p.college), details: safeString(p.details) };
    } catch {
      return { year: "", college: "", details: "" };
    }
  });

  const [experienceInput, setExperienceInput] = useState(() => {
    try {
      if (typeof window === "undefined") return { company: "", role: "", date: "", bullets: "" };
      const drafts = localStorage.getItem(DRAFTS_KEY);
      const parsed = drafts ? JSON.parse(drafts) : null;
      const p = parsed?.experienceInput ?? { company: "", role: "", date: "", bullets: "" };
      return { company: safeString(p.company), role: safeString(p.role), date: safeString(p.date), bullets: safeString(p.bullets) };
    } catch {
      return { company: "", role: "", date: "", bullets: "" };
    }
  });

  const [projectInput, setProjectInput] = useState(() => {
    try {
      if (typeof window === "undefined") return { name: "", bullets: "" };
      const drafts = localStorage.getItem(DRAFTS_KEY);
      const parsed = drafts ? JSON.parse(drafts) : null;
      const p = parsed?.projectInput ?? { name: "", bullets: "" };
      return { name: safeString(p.name), bullets: safeString(p.bullets) };
    } catch {
      return { name: "", bullets: "" };
    }
  });

  const [skillInput, setSkillInput] = useState(() => {
    try {
      if (typeof window === "undefined") return "";
      const drafts = localStorage.getItem(DRAFTS_KEY);
      const parsed = drafts ? JSON.parse(drafts) : null;
      return safeString(parsed?.skillInput ?? "");
    } catch {
      return "";
    }
  });

  const [languageInput, setLanguageInput] = useState(() => {
    try {
      if (typeof window === "undefined") return "";
      const drafts = localStorage.getItem(DRAFTS_KEY);
      const parsed = drafts ? JSON.parse(drafts) : null;
      return safeString(parsed?.languageInput ?? "");
    } catch {
      return "";
    }
  });

  // UI state
  const [step, setStep] = useState(1);
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notice, setNotice] = useState("");

  // templates array (keep ordering as-is)
  const templates = [Template2, Template3, Template4, Template5, Template6];

  // safely clamp template index and always have a valid SelectedTemplate
  const safeIndex =
    typeof formData.templateIndex === "number" &&
    formData.templateIndex >= 0 &&
    formData.templateIndex < templates.length
      ? formData.templateIndex
      : 0;
  const SelectedTemplate = templates[safeIndex] || templates[0];

  const router = useRouter();

  // Utility: ensure string conversion for saved bullets etc.
  const ensureString = (value) => {
    if (Array.isArray(value)) return value.join("\n\n");
    if (typeof value === "object" && value !== null) return "";
    return typeof value === "string" ? value : "";
  };

  // Persist formData to localStorage whenever it changes (store sanitized)
  useEffect(() => {
    try {
      // Sanitize just before saving to avoid corruption
      const safe = sanitizeFormData(formData);
      // If sanitized differs from current formData, update state quietly to keep invariants
      // Note: shallow compare minimal fields to avoid infinite loops
      const needsUpdate =
        safe.templateIndex !== formData.templateIndex ||
        safe.summary !== formData.summary ||
        safe.name !== formData.name;
      if (needsUpdate) {
        setFormData(safe);
        // still save safe below
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
      }
    } catch (err) {
      console.error("Failed saving formData:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Persist drafts (temporary inputs) whenever they change
  useEffect(() => {
    try {
      const drafts = {
        educationInput,
        experienceInput,
        projectInput,
        skillInput,
        languageInput,
      };
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    } catch (err) {
      console.error("Failed saving drafts:", err);
    }
  }, [educationInput, experienceInput, projectInput, skillInput, languageInput]);

  // Notice auto-clear
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 2500);
    return () => clearTimeout(t);
  }, [notice]);

  // --- Handlers for form changes (these update state only) ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Always coerce input values to safe types
    const safeVal = name === "summary" ? safeString(value).slice(0, LIMITS.summary) : safeString(value);

    if (name === "summary") {
      if (safeVal.length > LIMITS.summary) {
        setNotice(`Summary max ${LIMITS.summary} characters`);
        setTimeout(() => setNotice(""), 2200);
        setFormData((prev) => ({ ...prev, summary: safeVal.slice(0, LIMITS.summary) }));
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: safeVal }));
  };

  // Education input handlers
  const handleEducationChange = (e) => {
    setEducationInput((prev) => ({ ...prev, [e.target.name]: safeString(e.target.value) }));
  };

  const addEducation = () => {
    if (!educationInput.year.trim() || !educationInput.college.trim()) return;
    const currentLen = arr(formData.education).length;
    if (currentLen >= LIMITS.education) {
      setNotice(`Maximum ${LIMITS.education} education entries allowed`);
      setTimeout(() => setNotice(""), 2000);
      return;
    }
    setFormData((prev) => {
      const newEducation = [
        ...arr(prev.education),
        {
          year: safeString(educationInput.year),
          college: safeString(educationInput.college),
          details: educationInput.details ? educationInput.details.split("\n").map(safeString) : [],
        },
      ].slice(0, LIMITS.education);
      return { ...prev, education: newEducation };
    });
    setEducationInput({ year: "", college: "", details: "" });
  };

  const removeEducation = (i) => {
    setFormData((prev) => ({ ...prev, education: arr(prev.education).filter((_, idx) => idx !== i) }));
  };

  // Skills
  const addSkill = () => {
    const v = safeString(skillInput).trim();
    if (!v) return;
    const currentLen = arr(formData.skills).length;
    if (currentLen >= LIMITS.skills) {
      setNotice(`Maximum ${LIMITS.skills} skills allowed`);
      setTimeout(() => setNotice(""), 2000);
      return;
    }
    setFormData((prev) => ({ ...prev, skills: [...arr(prev.skills), v].slice(0, LIMITS.skills) }));
    setSkillInput("");
  };

  const removeSkill = (i) => {
    setFormData((prev) => ({ ...prev, skills: arr(prev.skills).filter((_, idx) => idx !== i) }));
  };

  // Languages
  const addLanguage = () => {
    const v = safeString(languageInput).trim();
    if (!v) return;
    const currentLen = arr(formData.languages).length;
    if (currentLen >= LIMITS.languages) {
      setNotice(`Maximum ${LIMITS.languages} languages allowed`);
      setTimeout(() => setNotice(""), 2000);
      return;
    }
    setFormData((prev) => ({ ...prev, languages: [...arr(prev.languages), v].slice(0, LIMITS.languages) }));
    setLanguageInput("");
  };

  const removeLanguage = (i) => {
    setFormData((prev) => ({ ...prev, languages: arr(prev.languages).filter((_, idx) => idx !== i) }));
  };

  // Experience
  const handleExperienceChange = (e) => {
    setExperienceInput((prev) => ({ ...prev, [e.target.name]: safeString(e.target.value) }));
  };

  const addExperience = () => {
    if (!experienceInput.company.trim() || !experienceInput.role.trim()) return;
    const currentLen = arr(formData.experience).length;
    if (currentLen >= LIMITS.experience) {
      setNotice(`Maximum ${LIMITS.experience} work experience entries allowed`);
      setTimeout(() => setNotice(""), 2000);
      return;
    }
    setFormData((prev) => {
      const newExp = [
        ...arr(prev.experience),
        {
          company: safeString(experienceInput.company),
          role: safeString(experienceInput.role),
          date: safeString(experienceInput.date),
          bullets: ensureString(experienceInput.bullets)
            ? ensureString(experienceInput.bullets).split("\n").map((s) => safeString(s)).filter(Boolean)
            : [],
        },
      ].slice(0, LIMITS.experience);
      return { ...prev, experience: newExp };
    });
    setExperienceInput({ company: "", role: "", date: "", bullets: "" });
  };

  const removeExperience = (i) => {
    setFormData((prev) => ({ ...prev, experience: arr(prev.experience).filter((_, idx) => idx !== i) }));
  };

  // Projects
  const handleProjectChange = (e) => {
    setProjectInput((prev) => ({ ...prev, [e.target.name]: safeString(e.target.value) }));
  };

  const addProject = () => {
    if (!projectInput.name.trim()) return;
    const currentLen = arr(formData.projects).length;
    if (currentLen >= LIMITS.projects) {
      setNotice(`Maximum ${LIMITS.projects} projects allowed`);
      setTimeout(() => setNotice(""), 2000);
      return;
    }
    setFormData((prev) => {
      const newProjects = [
        ...arr(prev.projects),
        {
          name: safeString(projectInput.name),
          bullets: projectInput.bullets ? projectInput.bullets.split("\n").map((s) => safeString(s)).filter(Boolean) : [],
        },
      ].slice(0, LIMITS.projects);
      return { ...prev, projects: newProjects };
    });
    setProjectInput({ name: "", bullets: "" });
  };

  const removeProject = (i) => {
    setFormData((prev) => ({ ...prev, projects: arr(prev.projects).filter((_, idx) => idx !== i) }));
  };

  // Enhance functions (unchanged logic but with safety)
  const getEnhancedSummary = async () => {
    try {
      const result = await axios.post("https://resume-backend-xyz.onrender.com/api/summary", {
        role: formData.role,
        summary: formData.summary,
      });
      const newTextRaw = result.data?.enhanced?.summary;
      const newText = safeString(newTextRaw).slice(0, LIMITS.summary);
      if (newText) setFormData((prev) => ({ ...prev, summary: newText }));
    } catch (err) {
      alert("Error generating summary");
      console.error(err);
    }
  };

  const getEnhancedData = async () => {
    const bulletsString = ensureString(experienceInput.bullets);
    if (!bulletsString.trim()) return;

    const payload = {
      company: experienceInput.company,
      role: experienceInput.role,
      date: experienceInput.date,
      bullets: bulletsString,
    };

    try {
      const result = await axios.post("https://resume-backend-xyz.onrender.com/api/enhance/enhance", payload);
      const enhancedArrayRaw = result.data?.enhanced?.bullets || [];
      const enhancedArray = arr(enhancedArrayRaw).map((x) => safeString(x));
      setExperienceInput((prev) => ({ ...prev, bullets: enhancedArray.join("\n") }));
    } catch (err) {
      setNotice("Enhance failed — check server");
      setTimeout(() => setNotice(""), 2600);
    }
  };

  const enhanceProject = async () => {
    if (!projectInput.name.trim() || !projectInput.bullets.trim()) {
      alert("Project name and bullets required");
      return;
    }

    try {
      const payload = {
        name: projectInput.name,
        bullets: projectInput.bullets.split("\n").map((s) => safeString(s)).filter(Boolean),
      };

      const result = await axios.post("https://resume-backend-xyz.onrender.com/api/project/enhance", payload);
      const improvedBulletsRaw = result.data?.enhanced;
      const improvedBullets = arr(improvedBulletsRaw).map((b) => safeString(b));
      if (!improvedBullets.length) {
        alert("Enhancer returned no data");
        return;
      }
      setProjectInput((prev) => ({ ...prev, bullets: improvedBullets.join("\n") }));
    } catch (error) {
      console.error(error);
      alert("Error enhancing project");
    }
  };

  // Predict skills
  const predictSkills = async () => {
    if (!formData.role || !formData.role.trim()) {
      setNotice("Enter role to predict skills");
      setTimeout(() => setNotice(""), 1800);
      return;
    }
    try {
      const res = await axios.post("https://resume-backend-xyz.onrender.com/api/enhance/predict-skills", {
        role: formData.role.trim(),
      });
      const s = arr(res.data?.skills).map((x) => safeString(x));
      setSuggestedSkills(s);
      setShowSuggestions(true);
    } catch (err) {
      setNotice("Failed to predict skills");
      setTimeout(() => setNotice(""), 1800);
    }
  };

  const handleClearAll = () => {
    if (!confirm("Clear all resume data? This cannot be undone.")) return;

    setFormData((prev) => {
      const preservedTemplate = typeof prev?.templateIndex === "number" ? prev.templateIndex : 0;
      const newForm = { ...DEFAULT_FORM, templateIndex: clampIndex(preservedTemplate, templates.length) };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newForm));
      } catch (e) {
        console.warn("Could not write cleared data to localStorage", e);
      }
      return newForm;
    });

    setEducationInput({ year: "", college: "", details: "" });
    setExperienceInput({ company: "", role: "", date: "", bullets: "" });
    setSkillInput("");
    setLanguageInput("");
    setProjectInput({ name: "", bullets: "" });
    setSuggestedSkills([]);
    setShowSuggestions(false);
    setNotice("");
  };

  // Preview: simply push to /preview — preview page should read localStorage.
  const goToPreview = () => {
    try {
      const safe = sanitizeFormData(formData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    } catch { }
    router.push("/preview");
  };

  // Safe derived UI values
  const safeSummary = safeString(formData.summary);
  const educationLen = arr(formData.education).length;
  const skillsLen = arr(formData.skills).length;
  const experienceLen = arr(formData.experience).length;
  const projectsLen = arr(formData.projects).length;
  const languagesLen = arr(formData.languages).length;
  const achievementsLen = arr(formData.achievements).length;

  // UI --- kept close to original, but using safe values
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-gray-100">
      <h1>Decade</h1>
      <div className="max-w-[1500px] mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-8">
        {/* LEFT FORM */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-gray-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Resume Builder</h3>
            </div>
            <div className="text-right">
              <button onClick={handleClearAll} className="text-sm text-red-500">Clear All</button>
            </div>
          </div>

          {/* stepper */}
          <div className="mt-6 grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setStep(n)}
                className={`py-2 text-xs rounded-md transition ${step === n ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-700 border border-gray-100"}`}
              >
                {n}
              </button>
            ))}
          </div>

          {/* content */}
          <div className="mt-6 space-y-4">
            {step === 1 && (
              <>
                <h4 className="text-lg font-semibold">Personal</h4>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className="w-full rounded-md border border-gray-200 p-2" />
                <input name="role" value={formData.role} onChange={handleChange} placeholder="Role (Frontend Developer)" className="w-full rounded-md border border-gray-200 p-2 mt-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="rounded-md border border-gray-200 p-2" />
                  <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="rounded-md border border-gray-200 p-2" />
                </div>
                <input name="website" value={formData.website} onChange={handleChange} placeholder="Website" className="w-full rounded-md border border-gray-200 p-2 mt-2" />
                <input name="address" value={formData.address} onChange={handleChange} placeholder="City, Country" className="w-full rounded-md border border-gray-200 p-2 mt-2" />
                <textarea
                  name="summary"
                  value={safeSummary}
                  onChange={handleChange}
                  placeholder="Short summary (max 450 chars)"
                  className="w-full rounded-md border border-gray-200 p-2 mt-2 h-28"
                />
                <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                  <span>{safeSummary.length}/{LIMITS.summary}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-50 rounded-md text-sm" disabled>←</button>
                    <button onClick={getEnhancedSummary} className="px-3 py-1 bg-gray-50 rounded-md text-sm">Enhance</button>
                    <button onClick={() => setStep(2)} className="px-3 py-1 bg-gray-900 text-white rounded-md text-sm">Next →</button>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h4 className="text-lg font-semibold">Education</h4>
                <input name="year" value={educationInput.year} onChange={handleEducationChange} placeholder="2020 - 2024" className="w-full rounded-md border border-gray-200 p-2" />
                <input name="college" value={educationInput.college} onChange={handleEducationChange} placeholder="University Name" className="w-full rounded-md border border-gray-200 p-2 mt-2" />
                <textarea name="details" value={educationInput.details} onChange={handleEducationChange} placeholder="• bullet per line" className="w-full rounded-md border border-gray-200 p-2 mt-2 h-20" />
                <div className="flex gap-2 mt-3">
                  <button onClick={addEducation} disabled={educationLen >= LIMITS.education} className={`px-3 py-2 rounded-md text-sm ${educationLen >= LIMITS.education ? "bg-gray-200 text-gray-400" : "bg-gray-900 text-white"}`}>Add</button>
                  <button onClick={() => setEducationInput({ year: "", college: "", details: "" })} className="px-3 py-2 rounded-md bg-gray-50 text-sm border border-gray-100">Clear</button>
                </div>

                <div className="mt-3 space-y-2">
                  {arr(formData.education).map((e, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-sm">{e.college}</div>
                        <div className="text-xs text-gray-500">{e.year}</div>
                      </div>
                      <button onClick={() => removeEducation(i)} className="text-xs text-red-500">Remove</button>
                    </div>
                  ))}
                  {educationLen === 0 && <div className="text-sm text-gray-400">No education added</div>}
                </div>

                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(1)} className="px-3 py-2 rounded-md bg-gray-50 text-sm border border-gray-100">← Back</button>
                  <button onClick={() => setStep(3)} className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm">Next →</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h4 className="text-lg font-semibold">Experience</h4>
                <input name="company" value={experienceInput.company} onChange={handleExperienceChange} placeholder="Company" className="w-full rounded-md border border-gray-200 p-2" />
                <input name="role" value={experienceInput.role} onChange={handleExperienceChange} placeholder="Role" className="w-full rounded-md border border-gray-200 p-2 mt-2" />
                <input name="date" value={experienceInput.date} onChange={handleExperienceChange} placeholder="2021 - Present" className="w-full rounded-md border border-gray-200 p-2 mt-2" />
                <textarea name="bullets" value={ensureString(experienceInput.bullets)} onChange={handleExperienceChange} placeholder="• bullet per line" className="w-full rounded-md border border-gray-200 p-2 mt-2 h-28" />

                <div className="flex gap-2 mt-3">
                  <button onClick={addExperience} disabled={experienceLen >= LIMITS.experience} className={`px-3 py-2 rounded-md text-sm ${experienceLen >= LIMITS.experience ? "bg-gray-200 text-gray-400" : "bg-gray-900 text-white"}`}>Add</button>
                  <button onClick={getEnhancedData} className="px-3 py-2 rounded-md text-sm bg-gray-700 text-white">Enhance ✨</button>
                </div>

                <div className="mt-3 space-y-3">
                  {arr(formData.experience).map((ex, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-md border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{ex.company}</div>
                          <div className="text-xs text-gray-500">{ex.role}</div>
                        </div>
                        <div className="text-xs text-gray-500">{ex.date}</div>
                      </div>

                      <ul className="mt-2 text-sm text-gray-700 list-disc ml-5">
                        {arr(ex.bullets).map((b, bi) => <li key={bi}>{b}</li>)}
                      </ul>

                      <div className="text-right">
                        <button onClick={() => removeExperience(i)} className="text-xs text-red-500 mt-2">Remove</button>
                      </div>
                    </div>
                  ))}
                  {experienceLen === 0 && <div className="text-sm text-gray-400">No experience added</div>}
                </div>

                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(2)} className="px-3 py-2 rounded-md bg-gray-50 text-sm border border-gray-100">← Back</button>
                  <button onClick={() => setStep(4)} className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm">Next →</button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h4 className="text-lg font-semibold">Skills & Languages</h4>
                <div className="flex items-center gap-2">
                  <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="React, Tailwind..." className="flex-1 rounded-md border border-gray-200 p-2" />
                  <button onClick={addSkill} disabled={skillsLen >= LIMITS.skills} className={`px-3 py-2 rounded-md ${skillsLen >= LIMITS.skills ? "bg-gray-200 text-gray-400" : "bg-gray-900 text-white"}`}>Add</button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {arr(formData.skills).map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-md text-sm flex items-center gap-2">
                      {s}
                      <button onClick={() => removeSkill(i)} className="text-xs text-gray-500">✕</button>
                    </span>
                  ))}
                </div>

                <div className="mt-3">
                  <button onClick={predictSkills} className="px-3 py-2 rounded-md bg-gray-700 text-white text-sm">Predict Skills ⚡</button>
                </div>

                {showSuggestions && suggestedSkills.length > 0 && (
                  <div className="mt-3 p-3 bg-gray-50 border border-gray-100 rounded-md">
                    <div className="text-xs text-gray-500 mb-2">Click to add</div>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map((skill, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (!arr(formData.skills).includes(skill)) {
                              if (arr(formData.skills).length >= LIMITS.skills) {
                                setNotice(`Maximum ${LIMITS.skills} skills allowed`);
                                setTimeout(() => setNotice(""), 2000);
                                return;
                              }
                              setFormData((prev) => ({ ...prev, skills: [...arr(prev.skills), skill].slice(0, LIMITS.skills) }));
                            }
                          }}
                          className="text-sm px-2 py-1 bg-white border border-gray-200 rounded-md"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <hr className="my-4 border-gray-100" />

                <div className="flex items-center gap-2">
                  <input value={languageInput} onChange={(e) => setLanguageInput(e.target.value)} placeholder="English — Fluent" className="flex-1 rounded-md border border-gray-200 p-2" />
                  <button onClick={addLanguage} disabled={languagesLen >= LIMITS.languages} className={`px-3 py-2 rounded-md ${languagesLen >= LIMITS.languages ? "bg-gray-200 text-gray-400" : "bg-gray-900 text-white"}`}>Add</button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {arr(formData.languages).map((l, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-md text-sm flex items-center gap-2">
                      {l}
                      <button onClick={() => removeLanguage(i)} className="text-xs text-gray-500">✕</button>
                    </span>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(3)} className="px-3 py-2 rounded-md bg-gray-50 text-sm border border-gray-100">← Back</button>
                  <button onClick={() => setStep(5)} className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm">Next →</button>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h4 className="text-lg font-semibold">Projects / Achievements</h4>
                <div className="flex items-center gap-2 mb-4 mt-1">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.useAchievements)}
                    onChange={(e) => setFormData(prev => ({ ...prev, useAchievements: Boolean(e.target.checked) }))}
                    className="w-4 h-4"
                  />
                  <label className="text-sm text-gray-700">Use Achievements instead of Projects</label>
                </div>

                {formData.useAchievements ? (
                  <>
                    <textarea placeholder="• Achievement per line (max 6)" value={projectInput.bullets} onChange={(e) => setProjectInput(prev => ({ ...prev, bullets: safeString(e.target.value) }))} className="w-full rounded-md border border-gray-200 p-2 h-28" />
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => {
                        const lines = safeString(projectInput.bullets).split("\n").map(s => s.trim()).filter(Boolean);
                        if (lines.length > 6) { alert("Only 6 achievements allowed"); return; }
                        setFormData(prev => ({ ...prev, achievements: lines }));
                      }} className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm">Save Achievements</button>
                      <button onClick={() => setProjectInput({ name: "", bullets: "" })} className="px-4 py-2 rounded-md bg-gray-50 text-sm border border-gray-100">Clear</button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {arr(formData.achievements).map((a, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                          <span className="text-sm">{a}</span>
                          <button onClick={() => setFormData(prev => ({ ...prev, achievements: arr(prev.achievements).filter((_, idx) => idx !== i) }))} className="text-xs text-red-500">Remove</button>
                        </div>
                      ))}
                      {achievementsLen === 0 && <div className="text-sm text-gray-400">No achievements added</div>}
                    </div>
                  </>
                ) : (
                  <>
                    <input name="name" value={projectInput.name} onChange={handleProjectChange} placeholder="Project Name" className="w-full rounded-md border border-gray-200 p-2" />
                    <textarea name="bullets" value={projectInput.bullets} onChange={handleProjectChange} placeholder="• bullet per line" className="w-full rounded-md border border-gray-200 p-2 mt-2 h-24" />
                    <div className="flex gap-2 mt-3">
                      <button onClick={addProject} disabled={projectsLen >= LIMITS.projects} className={`px-3 py-2 rounded-md text-sm ${projectsLen >= LIMITS.projects ? "bg-gray-200 text-gray-400" : "bg-gray-900 text-white"}`}>Add</button>
                      <button onClick={enhanceProject} className="px-5 py-3 bg-purple-600 rounded-md hover:bg-purple-700">Enhance ✨</button>
                      <button onClick={() => setProjectInput({ name: "", bullets: "" })} className="px-3 py-2 rounded-md bg-gray-50 text-sm border border-gray-100">Clear</button>
                    </div>

                    <div className="mt-3 space-y-3">
                      {arr(formData.projects).map((p, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-md">
                          <div className="flex justify-between">
                            <div className="font-semibold">{p.name}</div>
                            <button onClick={() => removeProject(i)} className="text-xs text-red-500">Remove</button>
                          </div>
                          <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                            {arr(p.bullets).map((b, bi) => <li key={bi}>{b}</li>)}
                          </ul>
                        </div>
                      ))}
                      {projectsLen === 0 && <div className="text-sm text-gray-400">No projects added</div>}
                    </div>
                  </>
                )}

                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(4)} className="px-3 py-2 rounded-md bg-gray-50 text-sm border border-gray-100">← Back</button>
                  <button onClick={() => setStep(1)} className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm">Finish</button>
                </div>
              </>
            )}

          </div>

          {notice && <div className="mt-4 text-sm text-orange-400">{notice}</div>}
        </div>

        {/* RIGHT PREVIEW (scaled) */}
        <div className="flex-1">
          <div className="sticky top-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow p-6">
              <div className="flex items-center justify-between mb-4">Preview</div>

              <div className="flex justify-center">
                <div style={{
                  width: 850,
                  height: 1123,
                  transform: "scale(0.95)",
                  transformOrigin: "top center",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                  borderRadius: 8,
                  overflow: "hidden",
                }}>
                  {/* Render the selected template using current formData safely */}
                  <SelectedTemplate data={formData} />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={goToPreview} className="px-4 py-2 bg-gray-900 text-white rounded-md">Preview Resume</button>
                <button onClick={() => {
                  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeFormData(formData))); } catch { }
                  setNotice("Saved");
                }} className="px-4 py-2 bg-gray-50 border rounded-md">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
