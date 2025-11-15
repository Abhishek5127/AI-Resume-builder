"use client";


export default function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center bg-[#1d1f1e] shadow-sm">
      <h1 className="text-2xl font-bold text-blue-600">AI Resume Builder</h1>

      <div className="flex items-center gap-6 text-gray-700">
        <a href="#features" className="hover:text-blue-600">Features</a>
        <a href="#how" className="hover:text-blue-600">How it works</a>
        <a href="#resume" className="hover:text-blue-600">Generate</a>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Login
        </button>
      </div>
    </nav>
  );
}
