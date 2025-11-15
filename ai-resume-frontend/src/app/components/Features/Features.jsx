"use client";
import FeatureCard from "./FeatureCard.jsx";
import './Feature.css'


export default function Features() {
  const cardDetails = [
    {
      heading: "AI Powered Resume",
      description: "Generate professional resumes tailored to job descriptions."
    },
    {
      heading: "ATS-Friendly Format",
      description: "Create resumes that pass applicant tracking systems easily."
    },
    {
      heading: "Smart Suggestions",
      description: "AI recommends improvements to strengthen your resume."
    },
    {
      heading: "Multiple Templates",
      description: "Choose from modern, elegant, and professional layouts."
    },
    {
      heading: "One-Click Download",
      description: "Export your resume instantly in PDF format."
    },
    {
      heading: "Auto Job Matching",
      description: "Find roles based on your skills and resume content."
    }
  ];

  // Duplicate for seamless infinite scroll
  const loopedCards = [...cardDetails, ...cardDetails];

  return (
    <section id="features" className="py-20 bg-[#212322]">
      <h3 className="text-3xl font-bold text-center mb-12 text-white">
        Features
      </h3>

      <div className="overflow-hidden w-full">
        <div className="flex gap-10 whitespace-nowrap carousel-track">
          {loopedCards.map((item, idx) => (
            <FeatureCard
              key={idx}
              heading={item.heading}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
