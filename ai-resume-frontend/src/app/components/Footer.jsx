"use client";

export default function Footer() {
  return (
    <footer className="w-full py-6 text-center bg-gray-100 text-gray-600">
      <p>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
    </footer>
  );
}
