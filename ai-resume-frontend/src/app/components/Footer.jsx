"use client";
import './Footer.css'
export default function Footer() {
  return (
    <footer className="relative w-full mt-24">
      {/* TOP NEON LINE */}
      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>

      {/* FOOTER CONTENT */}
      <div className="
        py-12 px-6
        text-center
        bg-[#0f0f0f]/80
        backdrop-blur-xl
        border-t border-white/10
        shadow-[0_0_40px_rgba(255,225,0,0.15)]
      ">
        {/* BRAND */}
        <h1 className="text-3xl font-extrabold mb-3 
          bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text
        ">
          AI Resume Builder
        </h1>

        {/* SUBTEXT */}
        <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
          Create stunning, job-winning resumes powered by advanced AI.  
          Designed for modern job seekers.
        </p>

        {/* NAV LINKS */}
        <div className="flex justify-center gap-8 mt-8 text-gray-300 text-sm">
          <a href="#features" className="hover:text-yellow-300 transition">Features</a>
          <a href="#how" className="hover:text-yellow-300 transition">How it Works</a>
          <a href="#templates" className="hover:text-yellow-300 transition">Templates</a>
          <a href="#resume" className="hover:text-yellow-300 transition">Generate</a>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex justify-center gap-6 mt-8">
          <a className="footer-icon" href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a className="footer-icon" href="#">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a className="footer-icon" href="#">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a className="footer-icon" href="#">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>

        {/* COPYRIGHT */}
        <p className="text-gray-500 mt-10 text-xs">
          © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
