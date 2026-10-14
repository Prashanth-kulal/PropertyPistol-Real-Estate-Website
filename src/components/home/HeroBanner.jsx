"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ChevronDown,
  LocateFixed,
  SlidersHorizontal,
  Train,
  Car
} from "lucide-react";
import { CITIES, PROJECTS } from "@/data";

export default function HeroBanner({
  selectedCity,
  isCityPage = false,
  onOpenCityModal,
  onOpenAiModal,
  onOpenCommuteModal,
  onSearch
}) {
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState("ai");

  const currentCityObj =
    CITIES.find((c) => c.id.toLowerCase() === selectedCity.toLowerCase()) || {
      name: "Mumbai",
      id: "mumbai"
    };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch(searchInput);
    }
    const el = document.getElementById("top-projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Filter suggestion list
  const matchingProjects = PROJECTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      p.location.toLowerCase().includes(searchInput.toLowerCase()) ||
      p.builder.toLowerCase().includes(searchInput.toLowerCase())
  ).slice(0, 4);

  return (
    <section className="relative w-full overflow-visible bg-[#1C1B18] bg-[url('/images/hero-luxury-residence.jpg')] bg-cover bg-center bg-no-repeat pt-10 pb-12 sm:pt-14 sm:pb-16 min-h-[440px] sm:min-h-[490px] lg:min-h-[520px] flex flex-col justify-center transition-all duration-300">
      {/* Refined gradient overlay ensuring the luxury property photo shines through with readable text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75 pointer-events-none" />

      {/* Subtle radial warmth vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D29324]/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Top Centered Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-3 mb-6 sm:mb-8">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight flex items-center justify-center flex-wrap gap-2.5 drop-shadow-md leading-tight">
            <span>Find Your</span>
            {/* Magnifying Glass Icon Badge */}
            <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white/70 bg-white/15 backdrop-blur-md text-white shadow-sm">
              <Search className="w-4 h-4 text-[#FFE2A7]" />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5DC] via-[#FFE3A7] to-[#FBF1DF] font-black drop-shadow-sm">
              Dream Home
            </span>
            <span>on AuraLiving</span>
          </h1>

          {/* Supporting Statement with Highlighted Gold Accents */}
          <p className="text-xs sm:text-sm md:text-base text-gray-100 font-normal tracking-wide drop-shadow-md max-w-2xl mx-auto leading-relaxed flex items-center justify-center flex-wrap gap-1.5">
            <span>Over</span>
            <span className="font-bold text-[#FFE2A7] px-2 py-0.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 shadow-xs">
              40K+
            </span>
            <span>properties worth</span>
            <span className="font-bold text-[#FFE2A7] px-2 py-0.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 shadow-xs">
              3 Billion Dollars
            </span>
            <span>sold with</span>
            <span className="font-bold text-[#FFE2A7] px-2 py-0.5 rounded-lg bg-[#D29324]/30 backdrop-blur-md border border-[#D29324]/50 shadow-xs">
              0% brokerage!
            </span>
          </p>
        </div>

        {/* Floating White Search Card Container */}
        <div className="max-w-4xl lg:max-w-[940px] mx-auto bg-white rounded-2xl shadow-2xl border border-white/40 overflow-visible relative z-30 backdrop-blur-xs">
          {/* Top Row: Service & Feature Tabs */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-gray-100 text-xs sm:text-[13px] font-semibold text-gray-800 bg-[#FAF8F4]/80 rounded-t-2xl">
            {/* Left Tabs Group */}
            <div className="flex items-center gap-6 sm:gap-9 overflow-x-auto no-scrollbar">
              {/* Ask AI Tab */}
              <Link
                href="/ask-ai"
                className={`flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "ai"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D29324] fill-[#D29324]/30" />
                <span>Ask AI</span>
              </Link>

              {/* Home Loan */}
              <Link
                href="/home-loan"
                className={`transition-colors whitespace-nowrap ${
                  activeTab === "loan"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                Home Loan
              </Link>

              {/* PropCheck */}
              <Link
                href="/propcheck"
                className={`transition-colors whitespace-nowrap ${
                  activeTab === "check"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                PropCheck
              </Link>

              {/* Price Trends (rendered ONLY on city destination page banner near PropCheck) */}
              {isCityPage && (
                <Link
                  href={`/${currentCityObj.id || "mumbai"}/price-trends`}
                  className={`transition-colors whitespace-nowrap ${
                    activeTab === "price-trends"
                      ? "text-[#D29324] font-bold"
                      : "text-gray-700 hover:text-[#D29324]"
                  }`}
                >
                  Price Trends
                </Link>
              )}

              {/* Rent Agreement */}
              <Link
                href="/rent-agreement"
                className={`transition-colors whitespace-nowrap ${
                  activeTab === "rent"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                Rent Agreement
              </Link>
            </div>

            {/* Right Tab: Dubai Desk with Exclusive Badge */}
            <div className="hidden sm:flex items-center pl-6 border-l border-gray-200">
              <a
                href="#exclusive"
                className="flex items-center gap-1.5 text-gray-800 hover:text-[#D29324] transition-colors whitespace-nowrap font-medium"
              >
                <span>Dubai Desk</span>
                <span className="px-1.5 py-[1px] rounded-full bg-[#1D7E95] text-white text-[9.5px] font-bold tracking-wider uppercase">
                  Exclusive
                </span>
              </a>
            </div>
          </div>

          {/* Bottom Row: Search Controls */}
          <form
            onSubmit={handleSearchSubmit}
            className="p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 relative bg-white rounded-b-2xl"
          >
            {/* City Selector */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={onOpenCityModal}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-1.5 px-3 py-2 text-xs sm:text-[13.5px] font-semibold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <span>Select City</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-7 w-px bg-gray-200 mx-1" />

            {/* Locality, Property, Developer Input */}
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-gray-400 ml-2 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Search a Locality, Property or Developer"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden py-1.5 font-medium"
              />

              {/* Crosshair / Detect Location Icon */}
              <button
                type="button"
                onClick={() => {
                  setSearchInput(currentCityObj.name);
                  setShowSuggestions(false);
                }}
                className="p-1.5 text-gray-400 hover:text-[#D29324] transition-colors cursor-pointer"
                title="Detect My Location"
              >
                <LocateFixed className="w-4 h-4" />
              </button>

              {/* Filter Sliders Icon */}
              <button
                type="button"
                onClick={onOpenCityModal}
                className="p-1.5 text-gray-400 hover:text-[#D29324] transition-colors cursor-pointer mr-1"
                title="Filter by City / Budget"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* Suggestions Dropdown */}
              {showSuggestions && searchInput.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 z-40 space-y-1">
                  <div className="text-[10px] font-bold text-gray-400 px-3 py-1 uppercase tracking-wider">
                    Matching Projects in {currentCityObj.name}
                  </div>
                  {matchingProjects.length > 0 ? (
                    matchingProjects.map((proj) => (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => {
                          setSearchInput(proj.name);
                          setShowSuggestions(false);
                          if (onSearch) onSearch(proj.name);
                          const el = document.getElementById("top-projects");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FAF8F4] flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <div className="font-bold text-gray-900">{proj.name}</div>
                          <div className="text-gray-500 text-[11px]">
                            {proj.location} • {proj.builder}
                          </div>
                        </div>
                        <span className="font-bold text-[#AE7419]">₹{proj.price}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-gray-400">
                      Press &apos;Find Property&apos; to search all listings.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Find Property CTA Button */}
            <button
              type="submit"
              className="bg-[#252525] hover:bg-[#D29324] text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer"
            >
              Find Property
            </button>
          </form>

          {/* Search by Rail Network or Commute Time (rendered ONLY on city destination page banner) */}
          {isCityPage && (
            <div className="pt-2.5 pb-2 flex items-center justify-center border-t border-gray-100">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white text-xs font-semibold text-[#252525]">
                <span className="text-[#6B7280]">Search by</span>
                <Link
                  href={`/rail-network/${currentCityObj.id || "mumbai"}`}
                  className="inline-flex items-center gap-1.5 font-bold text-[#AE7419] hover:text-[#D29324] transition-colors group/rail"
                >
                  <Train className="w-3.5 h-3.5 text-[#D29324]" />
                  <span className="underline decoration-[#D29324] decoration-2 underline-offset-2">
                    Rail Network
                  </span>
                </Link>
                <span className="text-gray-400">or</span>
                <button
                  type="button"
                  onClick={() => onOpenCommuteModal && onOpenCommuteModal()}
                  className="inline-flex items-center gap-1.5 font-bold text-[#AE7419] hover:text-[#D29324] transition-colors cursor-pointer group/commute"
                >
                  <Car className="w-3.5 h-3.5 text-[#D29324]" />
                  <span className="underline decoration-[#D29324] decoration-2 underline-offset-2">
                    Commute Time
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating WhatsApp Help Widget */}
      <div className="hidden lg:flex items-center gap-2 absolute right-6 -bottom-5 z-20">
        <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-gray-100 text-right leading-tight">
          <div className="text-[11px] text-gray-700 font-semibold">Looking for a property?</div>
          <div className="text-[10px] text-gray-400">Let us help you!</div>
        </div>
        <a
          href="https://wa.me/918080190190?text=Hi%20AuraLiving,%20I%20am%20looking%20for%20a%20property"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
          title="WhatsApp Support"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.056-2.072-.511-1.636-.677-2.738-2.317-2.82-2.427-.08-.109-.661-.881-.661-1.68 0-.8.419-1.192.569-1.353.15-.162.329-.202.439-.202.11 0 .22.002.316.007.102.006.239-.039.373.284.144.35.492 1.202.535 1.29.043.088.072.19.014.306-.058.115-.088.188-.175.29-.088.102-.185.228-.264.306-.088.087-.18.182-.077.359.102.175.455.751.977 1.216.671.597 1.238.783 1.413.87.175.088.277.073.38-.044.103-.117.439-.511.556-.686.117-.175.234-.146.395-.088.161.058 1.023.482 1.199.57.175.088.293.131.336.204.044.074.044.431-.1.836z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
