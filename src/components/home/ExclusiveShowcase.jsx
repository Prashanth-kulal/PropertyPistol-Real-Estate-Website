"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Crown, ArrowRight, ChevronLeft, ChevronRight, MapPin, Building, Eye } from "lucide-react";
import { EXCLUSIVE_PROJECTS, getProjectSlug } from "@/data";
import WishlistButton from "@/components/common/WishlistButton";

export default function ExclusiveShowcase({ onInquireProject }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? EXCLUSIVE_PROJECTS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === EXCLUSIVE_PROJECTS.length - 1 ? 0 : prev + 1));
  };

  const current = EXCLUSIVE_PROJECTS[activeIndex];
  const projectSlug = getProjectSlug(current);

  return (
    <section id="exclusive" className="py-14 bg-[#FAF8F4] border-b border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
            <Crown className="w-3.5 h-3.5 text-[#D29324]" />
            <span>Ultra Luxury Collection</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            AuraLiving <span className="text-[#D29324]">Exclusive</span>
          </h2>
          <p className="text-sm text-[#6B7280] mt-1.5">
            Handpicked signature residences, private waterfront estates, and international trophy properties.
          </p>
        </div>

        {/* Featured Showcase Card */}
        <div className="relative bg-white rounded-3xl border border-[#E8E3DA] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image Banner */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] overflow-hidden group">
              <Link href={`/projects/${projectSlug}`} className="block w-full h-full">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"></div>

              {/* Exclusive Tag Badge */}
              <div className="absolute top-5 left-5 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full bg-[#D29324] text-white text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {current.badge}
                </span>
              </div>

              {/* Wishlist Heart Button */}
              <div className="absolute top-5 right-5 z-20">
                <WishlistButton project={current} size="lg" variant="floating" />
              </div>

              {/* Slider Arrows */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2 z-10">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#252525] flex items-center justify-center backdrop-blur-xs transition-all shadow-md cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-white to-[#FAF8F4]">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D29324]">
                  <Building className="w-4 h-4" />
                  <span>{current.builder}</span>
                </div>

                <Link href={`/projects/${projectSlug}`}>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#252525] leading-snug hover:text-[#AE7419] transition-colors">
                    {current.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <MapPin className="w-4 h-4 text-[#D29324] shrink-0" />
                  <span>{current.location}</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {current.description}
                </p>

                <div className="pt-2 border-t border-[#E8E3DA] grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] uppercase text-gray-400 font-semibold block">
                      Configuration
                    </span>
                    <span className="text-sm font-bold text-[#252525]">
                      {current.configuration}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase text-gray-400 font-semibold block">
                      Investment Range
                    </span>
                    <span className="text-sm font-bold text-[#AE7419]">
                      {current.priceRange}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8E3DA] flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href={`/projects/${projectSlug}`}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Project Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() =>
                    onInquireProject &&
                    onInquireProject({
                      id: current.id,
                      name: current.name,
                      builder: current.builder,
                      location: current.location,
                      price: current.priceRange,
                      flatTypes: current.configuration,
                      images: [current.image]
                    })
                  }
                  className="w-full sm:w-auto py-3 px-5 rounded-xl border border-[#E8E3DA] bg-white hover:bg-[#FAF8F4] text-xs font-bold text-[#252525] text-center transition-colors cursor-pointer"
                >
                  Inquire
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Pills */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {EXCLUSIVE_PROJECTS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                activeIndex === idx
                  ? "border-[#D29324] bg-[#FBF1DF] text-[#AE7419] font-bold shadow-xs"
                  : "border-[#E8E3DA] bg-white text-gray-600 hover:border-[#D29324]"
              }`}
            >
              {item.name.replace("Aura ", "")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
