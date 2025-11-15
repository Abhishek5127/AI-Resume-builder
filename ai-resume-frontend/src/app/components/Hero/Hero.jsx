"use client";

import Image from "next/image";
import "./Hero.css";
import { assets } from "@/app/assets/assets";
import { useRouter } from "next/navigation";

const Hero = () => {

  const router = useRouter();

  const CTAButton = ({ href, icon, label }) => (
    <button type="button" onClick={() => router.push(href)} className="gap-2 button-theme space-big transition flex">
      <Image
        className="rounded-xl"
        src={icon}
        width={30}
        height={30}
        alt="label" />
      {label}
    </button>
  )


  return (
    <section className="bg-[#1d1f1e] py-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">

        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start mt-10 font-fruktur gap-4">

          <h1 className="text-[80px] get-hover-big leading-none">Build</h1>

          <div className="flex gap-3 get-hover-big leading-none">
            <span className="text-[40px]">a</span>
            <span className="text-[50px]">Job</span>
          </div>

          <div className="flex gap-3 items-center get-hover-big text-[30px] leading-none">
            <span className="text-[#FFFF00] hover:underline hover:text-[#fcdc3e] text-[40px]">Winning</span>
            <span>Resume with AI</span>
          </div>

          <div className="fire-text text-3xl my-6">
            Turn Your Boring Resume Into <br /> Pure Fire
          </div>

          <div className="flex-center gap-10 font-poppins mt-10">
            <CTAButton href='/create-cv-select-template' icon={assets.CV} label='Create CV' />
            <CTAButton href='/create-resume-select-template' icon={assets.Resume} label='Create Resume' />

          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex justify-end">
          <Image
            loading="lazy"
            className="rounded-xl"
            src={assets.ResumeTemplate2}
            width={600}
            height={800}
            alt="resume template" />
        </div>

      </div>
    </section>
  );
};

export default Hero;
