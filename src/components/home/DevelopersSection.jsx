"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Building2,
  Sparkles
} from "lucide-react";
import { DEVELOPERS_DATA } from "@/data/developersData";

export default function DevelopersSection({ onSelectDeveloper }) {
  const scrollRef = useRef(null);
  const router = useRouter();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const handleCardClick = (dev, e) => {
    // If clicked on an internal link, let that link navigate
    if (e.target.closest("a")) return;
    if (onSelectDeveloper) {
      onSelectDeveloper(dev);
    }
    router.push(`/developers/${dev.slug}`);
  };

  return (
    <section id="featured-developers" className="py-14 bg-white border-b border-[#E8E3DA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title, Badge & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5 text-[#D29324]" />
              <span>Grade-A Builder Partnerships</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              2,000+ Developers Under One Roof
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Direct developer access, verified project blueprints, and zero brokerage consulting.
            </p>
          </div>

          {/* Action buttons & Carousel Controls */}
          <div className="flex items-center gap-3">
            <Link
              href="/developers"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-[#FAF8F4] hover:bg-white text-xs font-bold text-[#AE7419] transition-all shadow-2xs hover:shadow-sm"
            >
              <span>View All Developers</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#FBF1DF] border border-[#E8E3DA] text-gray-700 hover:text-[#AE7419] flex items-center justify-center transition-all shadow-2xs hover:shadow-md cursor-pointer"
                title="Previous Developers"
                aria-label="Previous Developers"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all shadow-2xs hover:shadow-md cursor-pointer"
                title="Next Developers"
                aria-label="Next Developers"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Developers Horizontal Scrolling Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 overflow-x-auto scroll-smooth no-scrollbar py-2"
        >
          {DEVELOPERS_DATA.map((dev) => {
            const featured = dev.featuredProjects?.[0];
            return (
              <div
                key={dev.slug}
                onClick={(e) => handleCardClick(dev, e)}
                className="w-[280px] sm:w-[310px] shrink-0 p-5 rounded-2xl border border-[#E8E3DA] bg-[#FAF8F4] hover:bg-white hover:border-[#D29324] hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group"
              >
                {/* Developer Identity Row */}
                <div>
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-14 h-14 rounded-xl bg-white border border-[#E8E3DA] p-1.5 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#D29324] transition-colors overflow-hidden">
                      {dev.logo ? (
                        <img
                          src={dev.logo}
                          alt={dev.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="w-full h-full rounded-lg bg-[#FBF1DF] text-[#AE7419] font-extrabold text-lg flex items-center justify-center"
                        style={{ display: dev.logo ? "none" : "flex" }}
                      >
                        {dev.name.charAt(0)}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors truncate">
                        {dev.name}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#D29324] font-semibold mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{dev.projectCount}</span>
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        Est. {dev.established} • {dev.experience}
                      </div>
                    </div>
                  </div>

                  {/* Short Tagline / Excerpt */}
                  <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4">
                    {dev.aboutUs}
                  </p>
                </div>

                {/* Featured Project Preview Box */}
                {featured && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-[#E8E3DA] bg-white group/preview transition-all hover:border-[#D29324]">
                    <div className="relative h-28 w-full overflow-hidden bg-gray-100">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between text-white">
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#FBF1DF] block">
                            Featured Project
                          </span>
                          <span className="text-xs font-bold truncate block">
                            {featured.title}
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-[#FBF1DF] shrink-0">
                          {featured.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom View Profile Action */}
                <div className="pt-2 border-t border-[#E8E3DA]/80 flex items-center justify-between text-xs font-bold text-[#AE7419]">
                  <span className="group-hover:text-[#D29324] transition-colors">
                    Explore Developer Portfolio
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#FBF1DF] group-hover:bg-[#D29324] text-[#AE7419] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4" />
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
