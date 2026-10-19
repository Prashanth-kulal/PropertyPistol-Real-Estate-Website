"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building,
  ShieldCheck,
  PhoneCall,
  Eye,
  Sparkles,
  Columns3,
  LayoutGrid
} from "lucide-react";
import { CITIES, PROJECTS, getProjectSlug } from "@/data";
import WishlistButton from "@/components/common/WishlistButton";

export default function TopProjects({
  selectedCity,
  onSelectCity,
  onInquireProject,
  searchFilter
}) {
  const [activeCityTab, setActiveCityTab] = useState(selectedCity || "mumbai");
  const [projectImageIndexes, setProjectImageIndexes] = useState({});
  const [layoutMode, setLayoutMode] = useState("carousel"); // 'carousel' | 'grid'

  // Scroll ref and state for carousel arrows
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const checkScrollState = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScrollState();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollState);
      window.addEventListener("resize", checkScrollState);
      return () => {
        el.removeEventListener("scroll", checkScrollState);
        window.removeEventListener("resize", checkScrollState);
      };
    }
  }, [checkScrollState, activeCityTab, layoutMode]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -420 : 420;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title, Badge & Navigation Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
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

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-[#AE7419] bg-[#FBF1DF] px-3 py-1.5 rounded-xl border border-[#D29324]/30">
              <ShieldCheck className="w-4 h-4 text-[#D29324]" />
              <span>{displayedProjects.length} Verified Properties</span>
            </div>

            {/* Layout Toggle (Compact Carousel vs Grid) */}
            <div className="flex items-center bg-[#FAF8F4] border border-[#E8E3DA] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setLayoutMode("carousel")}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  layoutMode === "carousel"
                    ? "bg-[#D29324] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#AE7419]"
                }`}
                title="Compact Horizontal Scroll View"
                aria-label="Compact Horizontal Scroll View"
              >
                <Columns3 className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">Scroll</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  layoutMode === "grid"
                    ? "bg-[#D29324] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#AE7419]"
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">Grid</span>
              </button>
            </div>

            {/* Carousel Navigation Arrow Controls */}
            {layoutMode === "carousel" && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous Projects"
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    canScrollLeft
                      ? "border-[#E8E3DA] bg-white text-[#252525] hover:bg-[#FAF8F4] hover:border-[#D29324] shadow-xs cursor-pointer"
                      : "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Next Projects"
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    canScrollRight
                      ? "border-[#E8E3DA] bg-white text-[#252525] hover:bg-[#FAF8F4] hover:border-[#D29324] shadow-xs cursor-pointer"
                      : "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
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

        {/* 
          COMPACT SIDE-BY-SIDE PROJECT CARDS (Image on LEFT, Information on RIGHT):
          Uses either compact horizontal scroll track or 2-column grid.
        */}
        <div
          ref={scrollRef}
          className={
            layoutMode === "carousel"
              ? "flex items-stretch gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4 pt-1 snap-x"
              : "grid grid-cols-1 md:grid-cols-2 gap-5"
          }
          style={layoutMode === "carousel" ? { scrollbarWidth: "none", msOverflowStyle: "none" } : {}}
        >
          {displayedProjects.map((project) => {
            const projectSlug = getProjectSlug(project);
            const currentImgIndex = projectImageIndexes[project.id] || 0;
            const imagesList = project.images || [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            ];
            const activeImage = imagesList[currentImgIndex];

            return (
              <div
                key={project.id}
                className={`property-card bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden flex flex-col sm:flex-row shadow-xs hover:shadow-lg transition-all duration-300 group ${
                  layoutMode === "carousel"
                    ? "w-[330px] sm:w-[470px] shrink-0 snap-start"
                    : "w-full"
                }`}
              >
                {/* LEFT: Project Image with Badges & Slide Controls */}
                <div className="w-full sm:w-[190px] md:w-[210px] shrink-0 relative min-h-[190px] sm:min-h-full overflow-hidden bg-gray-100">
                  <Link href={`/projects/${projectSlug}`} className="block w-full h-full">
                    <img
                      src={activeImage}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

                  {/* Tag Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none z-10">
                    <span className="px-2 py-0.5 rounded-md bg-[#D29324] text-white text-[10px] font-bold tracking-wide uppercase shadow-xs">
                      {project.tag || "Verified"}
                    </span>
                  </div>

                  {/* Wishlist Heart Button */}
                  <div className="absolute top-2.5 right-2.5 z-20">
                    <WishlistButton project={project} size="sm" variant="floating" />
                  </div>

                  {/* Image Carousel Arrows */}
                  {imagesList.length > 1 && (
                    <>
                      <button
                        onClick={(e) => handlePrevImage(project.id, imagesList.length, e)}
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer z-10"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(project.id, imagesList.length, e)}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer z-10"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  {/* Price Banner Overlay */}
                  <Link href={`/projects/${projectSlug}`} className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <div className="text-base sm:text-lg font-black tracking-tight drop-shadow-sm">₹{project.price}</div>
                    <div className="text-[10px] text-gray-200 truncate">{project.avgPrice}</div>
                  </Link>
                </div>

                {/* RIGHT: Information, Specs & Actions */}
                <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between space-y-3 min-w-0">
                  <div className="space-y-1.5">
                    {/* Builder & Initial */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#AE7419] block tracking-wide truncate">
                          {project.builder}
                        </span>
                        <Link href={`/projects/${projectSlug}`}>
                          <h3 className="text-sm sm:text-base font-extrabold text-[#252525] group-hover:text-[#AE7419] transition-colors truncate">
                            {project.name}
                          </h3>
                        </Link>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-[#FAF8F4] border border-[#E8E3DA] flex items-center justify-center text-[#D29324] shrink-0 font-bold text-xs shadow-2xs">
                        {project.builder.charAt(0)}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3 text-[#D29324] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E3DA] bg-[#FAF8F4] p-2 rounded-xl text-xs">
                      <div className="min-w-0">
                        <span className="text-[10px] text-gray-400 block font-medium">BHK</span>
                        <span className="font-bold text-[#252525] truncate block text-[11px] sm:text-xs">{project.flatTypes}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-gray-400 block font-medium">Carpet Area</span>
                        <span className="font-bold text-[#252525] truncate block text-[11px] sm:text-xs">{project.carpetArea}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onInquireProject && onInquireProject(project)}
                      className="flex-1 py-2 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </button>
                    <Link
                      href={`/projects/${projectSlug}`}
                      className="px-3 py-2 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-white text-gray-700 hover:text-[#AE7419] text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                      title="View Project Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
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
