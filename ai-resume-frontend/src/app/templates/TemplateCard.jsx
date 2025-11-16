"use client";
import { useRouter } from "next/navigation";
export default function TemplateCard({ img, title, id }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/builder?template=${id}`);
  };

  return (
    <div className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition">
      <img src={img} className="w-full h-64 object-cover rounded-lg" />

      <h3 className="text-xl font-semibold mt-4">{title}</h3>

      <button 
        onClick={handleClick}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Use this template
      </button>
    </div>
  );
}
