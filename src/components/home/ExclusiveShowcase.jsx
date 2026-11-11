"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Crown, ArrowRight, ChevronLeft, ChevronRight, MapPin, Building } from "lucide-react";
import { EXCLUSIVE_PROJECTS, getProjectSlug } from "@/data";
import WishlistButton from "@/components/common/WishlistButton";

const AUTO_ROTATE_INTERVAL_MS = 4000;

export default function ExclusiveShowcase({ onInquireProject }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [interactionTick, setInteractionTick] = useState(0);
  const detailsRef = useRef(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncPreference);
      return () => mediaQuery.removeEventListener("change", syncPreference);
    }
    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);

  useEffect(() => {
    if (EXCLUSIVE_PROJECTS.length <= 1 || isHovered || prefersReducedMotion) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setActiveIndex((prev) => (prev === EXCLUSIVE_PROJECTS.length - 1 ? 0 : prev + 1));
    }, AUTO_ROTATE_INTERVAL_MS);

    return () => window.clearTimeout(timerId);
  }, [activeIndex, isHovered, prefersReducedMotion, interactionTick]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (prefersReducedMotion || !detailsRef.current?.animate) return;

    const animation = detailsRef.current.animate(
      [
        { opacity: 0.25, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );

    return () => animation.cancel();
  }, [activeIndex, prefersReducedMotion]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? EXCLUSIVE_PROJECTS.length - 1 : prev - 1));
    setInteractionTick((tick) => tick + 1);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === EXCLUSIVE_PROJECTS.length - 1 ? 0 : prev + 1));
    setInteractionTick((tick) => tick + 1);
  };

  const current = EXCLUSIVE_PROJECTS[activeIndex];
  const projectSlug = getProjectSlug(current);

  return (
    <section id="exclusive" className="relative py-6 sm:py-8 bg-[#FAF8F4] border-b border-[#E8E3DA] overflow-hidden">
      {/* Subtle warm ambient illumination behind frosted glass label */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[480px] h-[220px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(210,147,36,0.11),rgba(246,214,158,0.05)_50%,transparent_75%)] blur-2xl"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-br from-[#FFFDF9]/72 via-[#FBF1DF]/58 to-[#F6E2BE]/52 backdrop-blur-[14px] backdrop-saturate-150 border border-[#D29324]/35 text-[#8C5809] text-[11px] font-semibold tracking-[0.12em] uppercase mb-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_4px_16px_-2px_rgba(174,116,25,0.12)] transition-all duration-300 hover:border-[#D29324]/55 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_18px_-2px_rgba(174,116,25,0.18)]">
            <Crown className="w-3.5 h-3.5 text-[#B97814] shrink-0" />
            <span>Ultra Luxury Collection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#252525] tracking-tight leading-tight">
            AuraLiving <span className="text-[#D29324]">Exclusive</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Handpicked signature residences, private waterfront estates, and international trophy properties.
          </p>
        </div>

        {/* Fixed-Layout Carousel Region */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="AuraLiving Exclusive Featured Projects"
        >
          {/* Featured Showcase Card */}
          <div className="relative bg-white rounded-3xl border border-[#E8E3DA] shadow-[0_12px_36px_rgba(37,37,37,0.07)] hover:shadow-[0_18px_44px_rgba(37,37,37,0.1)] hover:border-[#D29324]/40 transition-shadow duration-500 overflow-hidden">
            <div className="flex flex-col md:flex-row w-full md:h-[420px] lg:h-[440px]">
              {/* Fixed-Size Image Column (58% on tablet/desktop) */}
              <div className="relative w-full h-[220px] sm:h-[260px] md:h-full md:w-[58%] shrink-0 overflow-hidden bg-[#1F1A14] group">
                <Link
                  href={`/projects/${projectSlug}`}
                  aria-label={`View ${current.name} details`}
                  className="block relative w-full h-full overflow-hidden"
                >
                  <div
                    className={`relative w-full h-full ${prefersReducedMotion ? "" : "transition-transform duration-700 ease-out group-hover:scale-105"
                      }`}
                  >
                    {EXCLUSIVE_PROJECTS.map((item, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <img
                          key={item.id}
                          src={item.image}
                          alt={isActive ? item.name : ""}
                          aria-hidden={!isActive}
                          loading={idx === 0 ? "eager" : "lazy"}
                          className={`absolute inset-0 w-full h-full object-cover object-center ${prefersReducedMotion ? "" : "transition-opacity duration-700 ease-out"
                            } ${isActive ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"}`}
                        />
                      );
                    })}
                  </div>
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 pointer-events-none z-10"></div>

                {/* Exclusive Tag Badge */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 pointer-events-none max-w-[calc(100%-5.5rem)]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#D29324]/30 text-[#8A560B] text-[11px] font-semibold tracking-wider uppercase shadow-sm max-w-full">
                    <Sparkles className="w-3 h-3 text-[#C5871E] shrink-0" />
                    <span className="truncate">{current.badge}</span>
                  </span>
                </div>

                {/* Wishlist Heart Button */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20">
                  <WishlistButton project={current} size="lg" variant="floating" />
                </div>

                {/* Slider Arrows */}
                <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 flex items-center gap-2 z-20">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-[#252525] border border-white/50 flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                    aria-label="Previous Showcase"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                    aria-label="Next Showcase"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Information Column (42% on tablet/desktop) */}
              <div className="w-full md:w-[42%] md:h-full p-5 sm:p-6 lg:p-7 xl:p-8 bg-gradient-to-b from-white to-[#FAF8F4] overflow-hidden">
                <div ref={detailsRef} className="h-full flex flex-col justify-between gap-4 min-h-0">
                  <div className="space-y-2 sm:space-y-2.5 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9A6311] min-w-0">
                      <Building className="w-3.5 h-3.5 text-[#D29324] shrink-0" />
                      <span className="truncate">{current.builder}</span>
                    </div>

                    <Link href={`/projects/${projectSlug}`} className="block">
                      <h3 className="text-xl sm:text-2xl lg:text-[25px] xl:text-[28px] font-extrabold text-[#252525] leading-snug hover:text-[#AE7419] transition-colors line-clamp-2">
                        {current.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280] min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-[#D29324] shrink-0" />
                      <span className="truncate">{current.location}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 pt-0.5">
                      {current.description}
                    </p>
                  </div>

                  <div className="space-y-3.5 shrink-0">
                    <div className="pt-3 border-t border-[#E8E3DA] grid grid-cols-2 gap-2.5 lg:gap-3.5 items-stretch">
                      <div className="p-2.5 rounded-xl bg-white/80 border border-[#E8E3DA]/90 min-w-0 flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block truncate">
                          Configuration
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-[#252525] leading-snug line-clamp-2 min-h-[2.4em] flex items-center mt-0.5">
                          {current.configuration}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/80 border border-[#E8E3DA]/90 min-w-0 flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block truncate">
                          Investment Range
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-[#9A6311] leading-snug line-clamp-2 min-h-[2.4em] flex items-center mt-0.5">
                          {current.priceRange}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E8E3DA] flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-2.5">
                      <Link
                        href={`/projects/${projectSlug}`}
                        className="w-full sm:flex-1 md:w-full lg:flex-1 py-2.5 px-4 lg:px-5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-semibold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer btn-tactile group/cta whitespace-nowrap"
                      >
                        <span>Explore Project Details</span>
                        <ArrowRight className="w-4 h-4 shrink-0 group-hover/cta:translate-x-1 transition-transform duration-200" />
                      </Link>
                      <button
                        type="button"
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
                        className="w-full sm:w-auto md:w-full lg:w-auto py-2.5 px-5 rounded-xl border border-[#E8E3DA] hover:border-[#D29324]/60 bg-white hover:bg-[#FAF8F4] text-xs font-semibold text-[#252525] hover:text-[#AE7419] text-center transition-all duration-200 cursor-pointer btn-tactile whitespace-nowrap"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
