"use client";

import React from "react";
import { Building2, Users, Smile, Briefcase, Globe2 } from "lucide-react";
import { ACHIEVEMENTS } from "@/data";

export default function AchievementsCounter() {
  const iconMap = {
    Building2: <Building2 className="w-8 h-8 text-[#D29324]" />,
    Users: <Users className="w-8 h-8 text-[#D29324]" />,
    Smile: <Smile className="w-8 h-8 text-[#D29324]" />,
    Briefcase: <Briefcase className="w-8 h-8 text-[#D29324]" />
  };

  return (
    <section
      id="achievements"
      className="py-20 text-white relative overflow-hidden bg-[#1C1B18] bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed"
    >
      {/* Dark Luxury Vignette & Brand Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/90 backdrop-blur-[2px]"></div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D29324]/20 border border-[#D29324]/50 text-[#FFE2A7] text-xs font-semibold tracking-wider uppercase mb-1">
            <Globe2 className="w-3.5 h-3.5 text-[#D29324]" />
            <span>Unmatched Scale & Global Reach</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            A one-stop solution for all your property needs, globally!
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-normal max-w-xl mx-auto">
            Empowering property transactions across prime Indian metros, the Gulf, and international destinations with verified diligence.
          </p>
        </div>

        {/* 4 Stat Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {ACHIEVEMENTS.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-7 rounded-2xl bg-white/10 border border-white/15 hover:border-[#D29324] backdrop-blur-md transition-all text-center flex flex-col items-center justify-center space-y-3 group hover:-translate-y-1 hover:shadow-xl shadow-black/20"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-[#D29324]/20 group-hover:scale-110 transition-all">
                {iconMap[item.icon] || <Building2 className="w-8 h-8 text-[#D29324]" />}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#D29324] tracking-tight">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-200">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
