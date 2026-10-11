"use client";

import React, { useRef } from "react";
import { Building2, Award, ArrowUpRight, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { DEVELOPERS } from "@/data";

export default function DevelopersSection({ onSelectDeveloper }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <section id="featured-developers" className="py-14 bg-white border-b border-[#E8E3DA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Arrow Buttons */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5 text-[#D29324]" />
              <span>Trusted Partnerships</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              2,000+ Developers Under One Roof
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Direct partnerships with India&apos;s most reputable Grade-A real estate developers.
            </p>
          </div>

          {/* Left and Right Carousel Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#FBF1DF] border border-[#E8E3DA] text-gray-700 hover:text-[#AE7419] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
              title="Previous Developers"
              aria-label="Previous Developers"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
              title="Next Developers"
              aria-label="Next Developers"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real Estate Developer Feature Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-40 sm:h-48 md:h-52 bg-gradient-to-r from-black/80 via-black/60 to-transparent border border-[#E8E3DA] shadow-md">
          {/* Architectural Skyline Photography */}
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="Premier Real Estate Developers"
            className="w-full h-full object-cover mix-blend-overlay absolute inset-0 -z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#252525]/90 via-[#252525]/75 to-transparent"></div>

          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-center max-w-2xl text-white space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D29324] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#D29324]" />
              <span>Direct Builder Inventory • Zero Brokerage</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              Exclusive Developer Tie-ups & Guaranteed Best Market Pricing
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
              From Godrej and Lodha to Tata Housing and Prestige, get priority inventory access, pre-launch discounts, and authorized escrow booking.
            </p>
          </div>
        </div>

        {/* Developers Horizontal Scrolling Track */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2"
        >
          {DEVELOPERS.map((dev) => (
            <div
              key={dev.id}
              onClick={() => onSelectDeveloper && onSelectDeveloper(dev)}
              className="w-[190px] sm:w-[210px] shrink-0 p-5 rounded-2xl border border-[#E8E3DA] bg-[#FAF8F4] hover:bg-white hover:border-[#D29324] hover:shadow-lg transition-all text-center flex flex-col items-center justify-between min-h-[160px] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E3DA] flex items-center justify-center text-[#D29324] font-bold text-base shadow-2xs group-hover:bg-[#FBF1DF] transition-colors">
                {dev.name.split(" ")[0].charAt(0)}
              </div>

              <div className="my-2">
                <h3 className="text-xs font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors">
                  {dev.name}
                </h3>
                <div className="text-[11px] text-gray-500 font-medium">
                  {dev.projects}
                </div>
                <div className="text-[10px] text-gray-400">
                  {dev.experience}
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-[#AE7419] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Listings</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
