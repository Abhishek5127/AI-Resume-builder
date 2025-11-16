export default function Template1({ data }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-[800px] mx-auto">
      <h1 className="text-4xl font-bold">{data.name || "Full Name"}</h1>
      <p className="text-xl text-gray-600">{data.role || "Job Title"}</p>

      <h2 className="mt-6 text-xl font-semibold">Summary</h2>
      <p className="text-gray-700">
        {data.summary || "Your professional summary appears here."}
      </p>

      <h2 className="mt-6 text-xl font-semibold">Skills</h2>
      <p>{data.skills || "List your skills here"}</p>
    </div>
  );
}
