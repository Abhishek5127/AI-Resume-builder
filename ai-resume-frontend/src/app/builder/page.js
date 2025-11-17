"use client";

import { useState } from "react";
import Template2 from "../components/templates/Template2";

export default function BuilderPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    summary: "",
    skills: [],         // array
    phone: "",
    email: "",
    address: "",
    education: [],
    experience: [],
    languages: [],      // array
    projects: [],       // array of { name, bullets: [] }
  });

  // local inputs
  const [educationInput, setEducationInput] = useState({ year: "", college: "", details: "" });
  const [experienceInput, setExperienceInput] = useState({ company: "", role: "", date: "", bullets: "" });
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [projectInput, setProjectInput] = useState({ name: "", bullets: "" });
  

  // Generic form change for top-level simple fields
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ------------- Education handlers -------------
  const handleEducationChange = (e) => {
    setEducationInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addEducation = () => {
    if (!educationInput.year || !educationInput.college) return;
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { year: educationInput.year, college: educationInput.college, details: educationInput.details ? educationInput.details.split("\n") : [] }
      ]
    }));
    setEducationInput({ year: "", college: "", details: "" });
  };
  const removeEducation = (i) => {
    setFormData(prev => ({ ...prev, education: prev.education.filter((_, idx) => idx !== i) }));
  };

  // ------------- Skills handlers -------------
  const addSkill = () => {
    const v = skillInput.trim();
    if (!v) return;
    setFormData(prev => ({ ...prev, skills: [...prev.skills, v] }));
    setSkillInput("");
  };
  const removeSkill = (i) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }));
  };

  // ------------- Languages handlers -------------
  const addLanguage = () => {
    const v = languageInput.trim();
    if (!v) return;
    setFormData(prev => ({ ...prev, languages: [...prev.languages, v] }));
    setLanguageInput("");
  };
  const removeLanguage = (i) => {
    setFormData(prev => ({ ...prev, languages: prev.languages.filter((_, idx) => idx !== i) }));
  };

  // ------------- Experience handlers -------------
  const handleExperienceChange = (e) => {
    setExperienceInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addExperience = () => {
    if (!experienceInput.company || !experienceInput.role) return;
    setFormData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: experienceInput.company, role: experienceInput.role, date: experienceInput.date, bullets: experienceInput.bullets ? experienceInput.bullets.split("\n") : [] }
      ]
    }));
    setExperienceInput({ company: "", role: "", date: "", bullets: "" });
  };
  const removeExperience = (i) => {
    setFormData(prev => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }));
  };

  // ------------- Projects handlers -------------
  const handleProjectChange = (e) => {
    setProjectInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addProject = () => {
    if (!projectInput.name) return;
    setFormData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { name: projectInput.name, bullets: projectInput.bullets ? projectInput.bullets.split("\n") : [] }
      ]
    }));
    setProjectInput({ name: "", bullets: "" });
  };
  const removeProject = (i) => {
    setFormData(prev => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }));
  };

  const changeStep = (step)=>{
    setStep(step)
  }

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen grid grid-cols-1 md:grid-cols-[480px_1fr]">

      {/* LEFT FORM PANEL */}
      <div className="border-r border-gray-800 p-6 flex flex-col gap-6 bg-[#111]">
        {/* STEP INDICATOR */}
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <div onClick={()=>changeStep(1)} className={`px-3 cursor-pointer py-1 rounded ${step===1 ? "bg-blue-600" : "bg-transparent border border-gray-700"}`}>1</div>
          <div onClick={()=>changeStep(2)} className={`px-3 cursor-pointer py-1 rounded ${step===2 ? "bg-blue-600" : "bg-transparent border border-gray-700"}`}>2</div>
          <div onClick={()=>changeStep(3)} className={`px-3 cursor-pointer py-1 rounded ${step===3 ? "bg-blue-600" : "bg-transparent border border-gray-700"}`}>3</div>
          <div onClick={()=>changeStep(4)} className={`px-3 cursor-pointer py-1 rounded ${step===4 ? "bg-blue-600" : "bg-transparent border border-gray-700"}`}>4</div>
        </div>

        {/* --- STEP 1: Personal --- */}
        {step === 1 && (
          <>
            <h2 className="text-3xl font-bold">Personal Details</h2>
            <div className="flex flex-col gap-3">
              <label className="text-sm text-gray-400">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="input-dark" />

              <label className="text-sm text-gray-400">Job Title</label>
              <input name="role" value={formData.role} onChange={handleChange} placeholder="Frontend Developer" className="input-dark" />

              <label className="text-sm text-gray-400">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 99999 99999" className="input-dark" />

              <label className="text-sm text-gray-400">Email</label>
              <input name="email" value={formData.email} onChange={handleChange} placeholder="mail@gmail.com" className="input-dark" />

              <label className="text-sm text-gray-400">Address</label>
              <input name="address" value={formData.address} onChange={handleChange} placeholder="City, Country" className="input-dark" />

              <div className="flex justify-between">
                <div />
                <button onClick={() => setStep(2)} className="btn-next">Next →</button>
              </div>
            </div>
          </>
        )}

        {/* --- STEP 2: Education --- */}
        {step === 2 && (
          <>
            <h2 className="text-3xl font-bold">Education</h2>
            <input name="year" value={educationInput.year} onChange={handleEducationChange} placeholder="2020 - 2024" className="input-dark" />
            <input name="college" value={educationInput.college} onChange={handleEducationChange} placeholder="University Name" className="input-dark" />
            <textarea name="details" value={educationInput.details} onChange={handleEducationChange} placeholder="Details (line per bullet)" className="input-dark h-28" />
            <div className="flex gap-2">
              <button onClick={addEducation} className="btn-green">Add Education</button>
              <button onClick={() => { setEducationInput({ year: "", college: "", details: "" }); }} className="btn-gray">Clear</button>
            </div>

            {/* list existing */}
            {formData.education.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.education.map((e, i) => (
                  <div key={i} className="flex justify-between items-start bg-[#0b0b0b] p-3 rounded">
                    <div>
                      <p className="font-semibold">{e.year}</p>
                      <p className="text-sm">{e.college}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => removeEducation(i)} className="btn-gray">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button onClick={() => setStep(1)} className="btn-gray">← Back</button>
              <button onClick={() => setStep(3)} className="btn-next">Next →</button>
            </div>
          </>
        )}

        {/* --- STEP 3: Skills & Experience & Languages --- */}
        {step === 3 && (
          <>
            <h2 className="text-3xl font-bold">Skills, Experience & Languages</h2>

            {/* Skills */}
            <label className="text-sm text-gray-400 mt-2">Add Skill</label>
            <div className="flex gap-2">
              <input value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="React" className="input-dark flex-1" />
              <button onClick={addSkill} className="btn-green">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-blue-700 rounded-md flex items-center gap-2 text-sm">
                  {s}
                  <button onClick={() => removeSkill(i)} className="text-sm opacity-80">✕</button>
                </span>
              ))}
            </div>

            <hr className="border-gray-700 my-4" />

            {/* Experience */}
            <label className="text-sm text-gray-400">Add Experience</label>
            <input name="company" value={experienceInput.company} onChange={handleExperienceChange} placeholder="Company" className="input-dark" />
            <input name="role" value={experienceInput.role} onChange={handleExperienceChange} placeholder="Role" className="input-dark" />
            <input name="date" value={experienceInput.date} onChange={handleExperienceChange} placeholder="2022 - Present" className="input-dark" />
            <textarea name="bullets" value={experienceInput.bullets} onChange={handleExperienceChange} placeholder="Bullet per line" className="input-dark h-28" />
            <div className="flex gap-2">
              <button onClick={addExperience} className="btn-green">Add Experience</button>
              <button onClick={() => setExperienceInput({ company: "", role: "", date: "", bullets: "" })} className="btn-gray">Clear</button>
            </div>

            {formData.experience.length > 0 && (
              <div className="mt-4 space-y-3">
                {formData.experience.map((ex, i) => (
                  <div key={i} className="bg-[#0b0b0b] p-3 rounded">
                    <div className="flex justify-between">
                      <p className="font-semibold">{ex.company}</p>
                      <p className="text-sm text-gray-400">{ex.date}</p>
                    </div>
                    <p className="text-sm">{ex.role}</p>
                    <ul className="list-disc ml-5 text-sm mt-2">
                      {ex.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                    <div className="mt-2"><button onClick={() => removeExperience(i)} className="btn-gray">Remove</button></div>
                  </div>
                ))}
              </div>
            )}

            <hr className="border-gray-700 my-4" />

            {/* Languages */}
            <label className="text-sm text-gray-400">Add Language</label>
            <div className="flex gap-2">
              <input value={languageInput} onChange={e => setLanguageInput(e.target.value)} placeholder="English: Fluent" className="input-dark flex-1" />
              <button onClick={addLanguage} className="btn-green">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.languages.map((l, i) => (
                <span key={i} className="px-3 py-1 bg-[#2b2b2b] rounded-md flex items-center gap-2 text-sm">
                  {l}
                  <button onClick={() => removeLanguage(i)} className="text-sm opacity-80">✕</button>
                </span>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button onClick={() => setStep(2)} className="btn-gray">← Back</button>
              <button onClick={() => setStep(4)} className="btn-next">Next →</button>
            </div>
          </>
        )}

        {/* --- STEP 4: Projects --- */}
        {step === 4 && (
          <>
            <h2 className="text-3xl font-bold">Projects</h2>

            <input name="name" value={projectInput.name} onChange={handleProjectChange} placeholder="Project name" className="input-dark" />
            <textarea name="bullets" value={projectInput.bullets} onChange={handleProjectChange} placeholder="Bullet per line" className="input-dark h-28" />
            <div className="flex gap-2">
              <button onClick={addProject} className="btn-green">Add Project</button>
              <button onClick={() => setProjectInput({ name: "", bullets: "" })} className="btn-gray">Clear</button>
            </div>

            {formData.projects.length > 0 && (
              <div className="mt-4 space-y-3">
                {formData.projects.map((p, i) => (
                  <div key={i} className="bg-[#0b0b0b] p-3 rounded">
                    <div className="flex justify-between">
                      <p className="font-semibold">{p.name}</p>
                      <button onClick={() => removeProject(i)} className="btn-gray">Remove</button>
                    </div>
                    <ul className="list-disc ml-5 mt-2 text-sm">
                      {p.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(3)} className="btn-gray">← Back</button>
              <button onClick={() => setStep(1)} className="btn-next">Finish</button>
            </div>
          </>
        )}
      </div>

      {/* PREVIEW PANEL */}
      <div className="p-8 overflow-y-auto bg-[#0b0b0b]">
        <Template2 data={formData} />
      </div>
    </div>
  );
}
