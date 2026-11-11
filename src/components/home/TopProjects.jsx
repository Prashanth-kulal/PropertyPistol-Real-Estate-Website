"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShieldCheck,
  PhoneCall,
  Eye,
  Sparkles,
  Columns3,
  LayoutGrid,
  ArrowRight
} from "lucide-react";
import { CITIES, PROJECTS, getProjectSlug } from "@/data";
import WishlistButton from "@/components/common/WishlistButton";

function formatProjectPrice(rawPrice) {
  if (!rawPrice) return "On Request";
  const cleaned = String(rawPrice).trim();
  if (!cleaned || /^on request$/i.test(cleaned) || cleaned.startsWith("₹")) {
    return cleaned || "On Request";
  }
  return `₹ ${cleaned}`;
}

export default function TopProjects({
  selectedCity,
  onSelectCity,
  onInquireProject,
  searchFilter
}) {
  const [localCityTab, setLocalCityTab] = useState(selectedCity || "mumbai");
  const activeCityTab = selectedCity || localCityTab;
  const [projectImageIndexes, setProjectImageIndexes] = useState({});
  const [layoutMode, setLayoutMode] = useState("carousel"); // 'carousel' | 'grid'

  // Scroll ref and state for carousel arrows
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const selectedCityObj =
    CITIES.find((c) => c.id.toLowerCase() === (activeCityTab || "mumbai").toLowerCase()) ||
    CITIES[0];

  // Filter projects by active city and search input
  let cityProjects = PROJECTS.filter((p) => {
    const matchCity = activeCityTab === "all" || p.city.toLowerCase() === activeCityTab.toLowerCase();
    return matchCity;
  });

  if (cityProjects.length === 0) {
    cityProjects = PROJECTS.slice(0, 16);
  }

  let displayedProjects = cityProjects;

  if (searchFilter && searchFilter.trim()) {
    const q = searchFilter.toLowerCase().trim();
    const searchMatches = PROJECTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.builder.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
    );
    if (searchMatches.length > 0) {
      displayedProjects = searchMatches.slice(0, 5);
    }
  } else {
    // Exactly 5 top projects displayed in Top Projects section
    displayedProjects = cityProjects.slice(0, 5);
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

  const viewAllHref =
    activeCityTab && activeCityTab.toLowerCase() !== "mumbai"
      ? `/projects?city=${encodeURIComponent(activeCityTab.toLowerCase())}`
      : "/projects";

  return (
    <section id="top-projects" className="relative py-6 sm:py-8 bg-gradient-to-b from-white via-[#FDFBF7] to-[#FAF8F4]/70 border-b border-[#E8E3DA] overflow-hidden">
      {/* Subtle champagne ambient warmth behind glass surfaces */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-12 w-[520px] h-[220px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(210,147,36,0.10),rgba(246,214,158,0.05)_50%,transparent_75%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-16 w-[380px] h-[200px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(210,147,36,0.08),transparent_70%)] blur-2xl"
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1 & 2. Compact Heading, Eyebrow & Frosted Glass Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3.5">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-br from-[#FFFDF9]/72 via-[#FBF1DF]/58 to-[#F6E2BE]/52 backdrop-blur-[14px] backdrop-saturate-150 border border-[#D29324]/30 text-[11px] font-semibold text-[#8C5809] uppercase tracking-[0.1em] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_4px_14px_-2px_rgba(174,116,25,0.12)] mb-1.5">
              <Sparkles className="w-3 h-3 text-[#B97814] shrink-0" />
              <span>Handpicked Real Estate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight leading-tight">
              Top Projects
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
              Prime residential developments with direct builder pricing and zero brokerage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#7A5416] bg-gradient-to-br from-[#FFFDF9]/75 to-[#FBF1DF]/60 backdrop-blur-[14px] backdrop-saturate-150 px-3 py-1.5 rounded-xl border border-[#D29324]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_10px_rgba(174,116,25,0.08)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B97814] shrink-0" />
              <span>{displayedProjects.length} Verified Properties</span>
            </div>

            {/* Compact Segmented Layout Toggle (Scroll vs Grid) */}
            <div
              className="inline-flex items-center p-0.5 rounded-xl bg-gradient-to-b from-[#FAF6EE]/80 to-[#F5EFE3]/70 backdrop-blur-[14px] backdrop-saturate-150 border border-[#D29324]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_2px_10px_rgba(174,116,25,0.08)]"
              role="group"
              aria-label="Layout View"
            >
              <button
                type="button"
                onClick={() => setLayoutMode("carousel")}
                aria-pressed={layoutMode === "carousel"}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer ${layoutMode === "carousel"
                    ? "bg-gradient-to-b from-white/95 to-[#FBF1DF]/80 text-[#8C5809] border border-[#D29324]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_6px_rgba(174,116,25,0.12)]"
                    : "text-[#4B5563] hover:text-[#252525] border border-transparent"
                  }`}
                title="Compact Horizontal Scroll View"
                aria-label="Compact Horizontal Scroll View"
              >
                <Columns3 className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Scroll</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("grid")}
                aria-pressed={layoutMode === "grid"}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer ${layoutMode === "grid"
                    ? "bg-gradient-to-b from-white/95 to-[#FBF1DF]/80 text-[#8C5809] border border-[#D29324]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_6px_rgba(174,116,25,0.12)]"
                    : "text-[#4B5563] hover:text-[#252525] border border-transparent"
                  }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Carousel Navigation Arrow Controls */}
            {layoutMode === "carousel" && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous Projects"
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 backdrop-blur-[14px] ${canScrollLeft
                      ? "border-[#D29324]/30 bg-gradient-to-b from-white/85 to-[#FBF4E7]/75 text-[#252525] hover:border-[#D29324]/60 hover:text-[#8C5809] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_2px_8px_rgba(174,116,25,0.1)] cursor-pointer"
                      : "border-[#E8E3DA]/80 bg-white/50 text-gray-300 cursor-not-allowed"
                    }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Next Projects"
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 backdrop-blur-[14px] ${canScrollRight
                      ? "border-[#D29324]/30 bg-gradient-to-b from-white/85 to-[#FBF4E7]/75 text-[#252525] hover:border-[#D29324]/60 hover:text-[#8C5809] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_2px_8px_rgba(174,116,25,0.1)] cursor-pointer"
                      : "border-[#E8E3DA]/80 bg-white/50 text-gray-300 cursor-not-allowed"
                    }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. Connected City Tabs Row Directly Above Cards + Highlighted View All CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-3.5 pb-2.5 border-b border-[#E8E3DA]/80">
          <div
            className="flex-1 min-w-0 overflow-x-auto no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex items-center gap-1.5 min-w-max">
              {CITIES.map((city) => {
                const isActive = activeCityTab.toLowerCase() === city.id.toLowerCase();
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => {
                      setLocalCityTab(city.id);
                      if (onSelectCity) onSelectCity(city.id);
                    }}
                    aria-pressed={isActive}
                    className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all duration-200 cursor-pointer whitespace-nowrap backdrop-blur-[12px] ${isActive
                        ? "bg-gradient-to-b from-[#FBF1DF]/95 to-[#F5E0BA]/80 border border-[#D29324]/45 text-[#8C5809] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_2px_8px_rgba(174,116,25,0.12)]"
                        : "bg-white/60 border border-[#E5DDD0]/90 text-[#4B5563] font-medium hover:bg-[#FFFBF4]/85 hover:border-[#D29324]/35 hover:text-[#252525] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                      }`}
                  >
                    {city.name}
                  </button>
                );
              })}
            </div>
          </div>

          <Link
            href={viewAllHref}
            className="group/viewall inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FBF0DA]/90 via-[#F9E7C5]/85 to-[#F4D9A6]/80 backdrop-blur-[14px] backdrop-saturate-150 border border-[#D29324]/50 text-[#734505] hover:text-[#523002] hover:from-[#F9E8C6] hover:to-[#EFC986] hover:border-[#AE7419]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_3px_12px_-2px_rgba(174,116,25,0.18)] text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <span>View All {selectedCityObj.name} Projects</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9A6311] shrink-0 transition-transform duration-200 group-hover/viewall:translate-x-0.5" />
          </Link>
        </div>

        {/*
          UNIFORM PROJECT CARDS (Image LEFT, Structured Details RIGHT on sm+):
          Uses fixed horizontal card height on sm+ and structured clamping across all cards.
        */}
        <div
          ref={scrollRef}
          className={
            layoutMode === "carousel"
              ? "flex items-stretch gap-4 sm:gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-1 pt-0.5 snap-x"
              : "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
          }
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayedProjects.map((project) => {
            const projectSlug = getProjectSlug(project);
            const currentImgIndex = projectImageIndexes[project.id] || 0;
            const imagesList = project.images || [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            ];
            const activeImage = imagesList[currentImgIndex];
            const formattedPrice = formatProjectPrice(project.price);

            return (
              <div
                key={project.id}
                className={`property-card bg-white rounded-2xl border border-[#E8E3DA]/90 overflow-hidden flex flex-col sm:flex-row sm:h-[238px] shadow-[0_4px_16px_rgba(37,37,37,0.04)] group ${layoutMode === "carousel"
                    ? "w-[310px] sm:w-[465px] lg:w-[480px] shrink-0 snap-start"
                    : "w-full"
                  }`}
              >
                {/* LEFT: Fixed-Proportion Project Image */}
                <div className="w-full h-[185px] sm:h-full sm:w-[195px] md:w-[210px] shrink-0 relative overflow-hidden bg-[#F5F2EC]">
                  <Link href={`/projects/${projectSlug}`} className="block w-full h-full">
                    <img
                      src={activeImage}
                      alt={project.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/20 pointer-events-none"></div>

                  {/* Tag Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center pointer-events-none z-10 max-w-[calc(100%-3.5rem)]">
                    <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs border border-[#D29324]/30 text-[#8A560B] text-[10px] font-semibold tracking-wide uppercase shadow-2xs truncate">
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
                        type="button"
                        onClick={(e) => handlePrevImage(project.id, imagesList.length, e)}
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-90 shadow-sm cursor-pointer z-10"
                        aria-label="Previous Project Image"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleNextImage(project.id, imagesList.length, e)}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-90 shadow-sm cursor-pointer z-10"
                        aria-label="Next Project Image"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  {/* Price Banner Overlay */}
                  <Link href={`/projects/${projectSlug}`} className="absolute bottom-2.5 left-2.5 right-2.5 text-white z-10">
                    <div className="text-base sm:text-[17px] font-bold tracking-tight drop-shadow-sm truncate">
                      {formattedPrice}
                    </div>
                    {project.avgPrice && (
                      <div className="text-[10px] text-white/85 font-medium truncate">
                        {project.avgPrice}
                      </div>
                    )}
                  </Link>
                </div>

                {/* RIGHT: Structured & Aligned Specs + Actions */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-2 min-w-0">
                    {/* Developer, Title & Monogram */}
                    <div className="flex items-start justify-between gap-2 min-w-0">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-semibold text-[#9A6311] block tracking-wider truncate">
                          {project.builder}
                        </span>
                        <Link href={`/projects/${projectSlug}`} className="block">
                          <h3 className="text-sm sm:text-[15px] font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors truncate mt-0.5">
                            {project.name}
                          </h3>
                        </Link>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-[#FAF8F4] border border-[#E8E3DA] flex items-center justify-center text-[#AE7419] shrink-0 font-bold text-xs shadow-2xs group-hover:border-[#D29324]/40 transition-colors">
                        {project.builder?.charAt(0) || "P"}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-[#6B7280] min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-[#D29324] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 border border-[#E8E3DA]/80 bg-[#FAF8F4]/90 p-2 rounded-xl text-xs">
                      <div className="min-w-0">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-medium">
                          Configuration
                        </span>
                        <span className="font-semibold text-[#252525] truncate block text-[11px] sm:text-xs mt-0.5">
                          {project.flatTypes || project.configuration || "On Request"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-medium">
                          Carpet Area
                        </span>
                        <span className="font-semibold text-[#252525] truncate block text-[11px] sm:text-xs mt-0.5">
                          {project.carpetArea || "On Request"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Aligned Controls */}
                  <div className="pt-2.5 mt-3 sm:mt-0 border-t border-[#E8E3DA]/70 flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onInquireProject && onInquireProject(project)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-semibold transition-all duration-200 shadow-2xs hover:shadow-sm flex items-center justify-center gap-1.5 cursor-pointer btn-tactile"
                    >
                      <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                      <span>Enquire</span>
                    </button>
                    <Link
                      href={`/projects/${projectSlug}`}
                      className="px-3 py-2 rounded-xl border border-[#E8E3DA] hover:border-[#D29324]/60 bg-white text-gray-700 hover:text-[#9A6311] text-xs font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer shadow-2xs btn-tactile"
                      title="View Project Details"
                      aria-label={`View details for ${project.name}`}
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
