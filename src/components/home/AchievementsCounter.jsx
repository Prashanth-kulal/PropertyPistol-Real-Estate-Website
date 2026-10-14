"use client";

import React from "react";
import { Building2, Users, Smile, Briefcase, Globe2, Sparkles } from "lucide-react";
import { ACHIEVEMENTS } from "@/data";

export default function AchievementsCounter() {
  const iconMap = {
    Building2: <Building2 className="w-7 h-7 text-[#D29324]" />,
    Users: <Users className="w-7 h-7 text-[#D29324]" />,
    Smile: <Smile className="w-7 h-7 text-[#D29324]" />,
    Briefcase: <Briefcase className="w-7 h-7 text-[#D29324]" />
  };

  return (
    <section
      id="achievements"
      className="py-20 sm:py-24 text-white relative overflow-hidden bg-[#1C1B18] bg-[url('/images/global-architecture-skyline.jpg')] bg-cover bg-center bg-fixed transition-all duration-300"
    >
      {/* Carefully designed architectural overlay allowing the international cityscape to be clearly visible while maintaining crystal-clear text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1B18]/80 via-black/70 to-[#1C1B18]/85 pointer-events-none" />

      {/* Subtle gold ambient glow in center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D29324]/15 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D29324]/25 border border-[#D29324]/60 text-[#FFE2A7] text-xs font-bold tracking-wider uppercase mb-1 shadow-sm backdrop-blur-md">
            <Globe2 className="w-3.5 h-3.5 text-[#D29324]" />
            <span>Unmatched Scale & Global Reach</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
            A one-stop solution for all your property needs, globally!
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Empowering property transactions across prime Indian metros, the Gulf, and international destinations with verified diligence.
          </p>
        </div>

        {/* 4 Stat Metric Cards with Glassmorphism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {ACHIEVEMENTS.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#D29324] backdrop-blur-md transition-all duration-300 text-center flex flex-col items-center justify-center space-y-3 group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center group-hover:bg-[#D29324]/30 group-hover:border-[#D29324]/60 group-hover:scale-110 transition-all duration-300 shadow-sm">
                {iconMap[item.icon] || <Building2 className="w-7 h-7 text-[#D29324]" />}
              </div>

              <div className="text-3xl sm:text-4xl lg:text-[40px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5DC] via-[#FFE2A7] to-[#D29324] tracking-tight drop-shadow-sm">
                {item.value}
              </div>

              <div className="text-xs sm:text-sm font-bold text-gray-200 tracking-wide">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
