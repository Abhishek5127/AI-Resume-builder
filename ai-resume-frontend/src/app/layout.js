import "./globals.css";
import { Inter } from "next/font/google";
import { Fruktur } from "next/font/google";
import { Poppins } from "next/font/google";

<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>


const inter = Inter({ subsets: ["latin"] });

const fruktur = Fruktur({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fruktur",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "AI Resume Builder",
  description: "Generate ATS-ready resumes using AI",
};

export default function RootLayout({ children }) {
  return (
     <html lang="en" className={`${fruktur.variable} ${poppins.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}


