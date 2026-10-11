"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building,
  ShieldCheck,
  PhoneCall,
  Eye,
  Sparkles
} from "lucide-react";
import { CITIES, PROJECTS } from "@/data";

export default function TopProjects({
  selectedCity,
  onSelectCity,
  onInquireProject,
  searchFilter
}) {
  const [activeCityTab, setActiveCityTab] = useState(selectedCity || "mumbai");
  const [projectImageIndexes, setProjectImageIndexes] = useState({});

  // Filter projects by active city and search input
  let displayedProjects = PROJECTS.filter((p) => {
    const matchCity = activeCityTab === "all" || p.city.toLowerCase() === activeCityTab.toLowerCase();
    return matchCity;
  });

  // If active city has fewer projects in seed, show remaining seed projects to provide rich UI
  if (displayedProjects.length === 0) {
    displayedProjects = PROJECTS.slice(0, 6);
  }

  if (searchFilter && searchFilter.trim()) {
    const q = searchFilter.toLowerCase().trim();
    const searchMatches = PROJECTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.builder.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
    );
    if (searchMatches.length > 0) {
      displayedProjects = searchMatches;
    }
  }

  const handleNextImage = (projId, totalImages, e) => {
    e.stopPropagation();
    setProjectImageIndexes((prev) => ({
      ...prev,
      [projId]: ((prev[projId] || 0) + 1) % totalImages
    }));
  };

  const handlePrevImage = (projId, totalImages, e) => {
    e.stopPropagation();
    setProjectImageIndexes((prev) => ({
      ...prev,
      [projId]: ((prev[projId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  return (
    <section id="top-projects" className="py-14 bg-white border-b border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Filter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D29324] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Real Estate</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              Top Projects
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Prime residential developments with direct builder pricing and zero brokerage.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#AE7419]">
            <ShieldCheck className="w-4 h-4 text-[#D29324]" />
            <span>Showing {displayedProjects.length} Verified Properties</span>
          </div>
        </div>

        {/* City Navigation Slider / Tabs */}
        <div className="mb-8 border-b border-[#E8E3DA] overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 pb-3 min-w-max">
            {CITIES.map((city) => {
              const isActive = activeCityTab.toLowerCase() === city.id.toLowerCase();
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    setActiveCityTab(city.id);
                    if (onSelectCity) onSelectCity(city.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#D29324] text-white shadow-md shadow-amber-950/10"
                      : "bg-[#FAF8F4] text-gray-700 hover:bg-[#FBF1DF] hover:text-[#AE7419] border border-[#E8E3DA]"
                  }`}
                >
                  {city.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProjects.map((project) => {
            const currentImgIndex = projectImageIndexes[project.id] || 0;
            const imagesList = project.images || [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            ];
            const activeImage = imagesList[currentImgIndex];

            return (
              <div
                key={project.id}
                className="property-card bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden flex flex-col shadow-xs"
              >
                {/* Image Section with Carousel Controls */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-gray-100 group">
                  <img
                    src={activeImage}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                  {/* Tag Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#D29324] text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                      {project.tag || "Verified"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
                      RERA: {project.rera}
                    </span>
                  </div>

                  {/* Image Carousel Arrows */}
                  {imagesList.length > 1 && (
                    <>
                      <button
                        onClick={(e) => handlePrevImage(project.id, imagesList.length, e)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(project.id, imagesList.length, e)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Indicator Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {imagesList.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === currentImgIndex ? "w-4 bg-[#D29324]" : "w-1.5 bg-white/70"
                        }`}
                      ></span>
                    ))}
                  </div>

                  {/* Price Banner Overlay */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="text-xl font-bold tracking-tight">₹{project.price}</div>
                    <div className="text-[11px] text-gray-200">{project.avgPrice}</div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Project Title & Builder */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors line-clamp-1">
                          {project.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                          By {project.builder}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8F4] border border-[#E8E3DA] flex items-center justify-center text-[#D29324] shrink-0 font-bold text-xs">
                        {project.builder.charAt(0)}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-[#D29324] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    {/* Config Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E3DA] bg-[#FAF8F4] p-2.5 rounded-xl text-xs">
                      <div>
                        <span className="text-[11px] text-gray-400 block font-medium">BHK Typology</span>
                        <span className="font-bold text-[#252525]">{project.flatTypes}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-gray-400 block font-medium">Carpet Area</span>
                        <span className="font-bold text-[#252525]">{project.carpetArea}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onInquireProject && onInquireProject(project)}
                      className="flex-1 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Enquire Now</span>
                    </button>
                    <button
                      onClick={() => onInquireProject && onInquireProject(project)}
                      className="px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-white text-gray-700 text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
