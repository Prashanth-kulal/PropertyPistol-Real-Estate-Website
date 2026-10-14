"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { CITIES } from "@/data";

export default function TopCities({ onSelectCity }) {
  const router = useRouter();
  const scrollContainerRef = useRef(null);

  const categories = [
    { label: "New Projects", slugPattern: (city) => `new-projects-in-${city}` },
    { label: "Ready to Move", slugPattern: (city) => `ready-to-move-properties-in-${city}` },
    { label: "Under Construction", slugPattern: (city) => `under-construction-properties-in-${city}` },
    { label: "RERA Compliant", slugPattern: (city) => `rera-compliant-properties-in-${city}` },
    { label: "Developer Listings", slugPattern: (city) => `developer-listings-in-${city}` }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const handleCityNavigation = (cityId) => {
    if (onSelectCity) {
      onSelectCity(cityId);
    }
    router.push(`/${cityId}`);
  };

  return (
    <section className="py-14 bg-[#FAF8F4] border-b border-[#E8E3DA] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Navigation Controls Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#D29324]" />
              <span>Pan-India Presence</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              Top Cities
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Explore premium verified developments, builder handovers, and ready-to-move homes across key metros.
            </p>
          </div>

          {/* Left/Right Carousel Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#FBF1DF] border border-[#E8E3DA] text-gray-700 hover:text-[#AE7419] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
              title="Previous Cities"
              aria-label="Previous Cities"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
              title="Next Cities"
              aria-label="Next Cities"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Single Horizontal Row Carousel Container */}
        <div className="relative group/carousel">
          {/* Edge Navigation Buttons Overlay */}
          <button
            onClick={scrollLeft}
            className="sm:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-lg backdrop-blur-xs"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            className="sm:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-lg backdrop-blur-xs"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Scrollable Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-3 pt-1"
          >
            {CITIES.map((city) => (
              <div
                key={city.id}
                onClick={() => handleCityNavigation(city.id)}
                className="w-[260px] sm:w-[280px] shrink-0 h-[370px] rounded-2xl overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/60"
              >
                {/* Background City Photograph */}
                <img
                  src={city.image || "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80"}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 absolute inset-0"
                />

                {/* Ambient Dark Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 group-hover:via-black/90 group-hover:to-black/75 transition-all duration-300" />

                {/* Default Clean View (Bottom-aligned, fades out smoothly on hover) */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white z-10 transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
                  <div className="flex items-center gap-1.5 text-xs text-[#FFE2A7] font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D29324]" />
                    <span>{city.state}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight drop-shadow-sm">
                    {city.name}
                  </h3>
                  <p className="text-xs text-gray-300 font-medium mt-0.5">
                    {city.projectsCount}+ Verified Properties
                  </p>
                </div>

                {/* Hover-Only Clean View (Neatly organized inside card boundaries) */}
                <div className="absolute inset-0 p-5 text-white z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto flex flex-col justify-between">
                  {/* Top: City Details */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#FFE2A7] font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D29324]" />
                      <span>{city.state}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold tracking-tight drop-shadow-sm text-white">
                      {city.name}
                    </h3>
                    <p className="text-xs text-gray-300 font-medium mt-0.5">
                      {city.projectsCount}+ Verified Properties
                    </p>
                  </div>

                  {/* Bottom: Categories List & Action Button */}
                  <div className="space-y-3">
                    <div className="border-t border-white/20 pt-2.5">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-[#D29324] mb-2">
                        Explore Categories
                      </p>
                      <ul className="space-y-1.5 text-xs">
                        {categories.map((cat, i) => {
                          const href = `/${city.id}/buy/${cat.slugPattern(city.id)}`;
                          return (
                            <li key={i}>
                              <Link
                                href={href}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onSelectCity) onSelectCity(city.id);
                                }}
                                className="w-full text-left text-gray-200 hover:text-[#FFE2A7] flex items-center justify-between transition-colors py-0.5 cursor-pointer group/cat"
                              >
                                <span className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D29324] group-hover/cat:bg-[#FFE2A7] transition-colors"></span>
                                  <span>{cat.label}</span>
                                </span>
                                <span className="text-[10px] text-gray-400 group-hover/cat:text-[#FFE2A7] transition-colors">→</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCityNavigation(city.id);
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View All Properties</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
