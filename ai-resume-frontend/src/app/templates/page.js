import TemplateCard from "@/components/templates/TemplateCard";

export default function TemplatesPage() {
  const templates = [
    {
      id: 1,
      title: "Modern Clean",
      img: "/images/template1.png",
    },
    {
      id: 2,
      title: "Minimal Professional",
      img: "/images/template2.png",
    },
    {
      id: 3,
      title: "ATS-Friendly",
      img: "/images/template3.png",
    }
  ];

  return (
    <section className="min-h-screen bg-gray-100 py-20">
      <h1 className="text-center text-4xl font-bold mb-10">
        Choose Your Resume Template
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {templates.map((t) => (
          <TemplateCard key={t.id} title={t.title} img={t.img} />
        ))}
      </div>
    </section>
  );
}
