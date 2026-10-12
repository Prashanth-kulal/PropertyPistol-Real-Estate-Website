"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ChevronDown,
  LocateFixed,
  SlidersHorizontal
} from "lucide-react";
import { CITIES, PROJECTS } from "@/data";

export default function HeroBanner({
  selectedCity,
  onOpenCityModal,
  onOpenAiModal,
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
    <section className="relative w-full overflow-visible bg-[#C87D1A] bg-[url('/images/hero-banner-bg.png')] bg-cover bg-center bg-no-repeat pt-7 pb-9 sm:pt-9 sm:pb-11 min-h-[385px] sm:min-h-[420px] flex flex-col justify-center">
      {/* Subtle overlay for enhanced text readability and warm golden interior tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none"></div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Centered Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-1.5 mb-5 sm:mb-7">
          <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-white tracking-tight flex items-center justify-center flex-wrap gap-2 drop-shadow-md leading-tight">
            <span>Find Your</span>
            {/* Magnifying Glass Icon Circle */}
            <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-xs text-white shadow-xs">
              <Search className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5DC] via-[#FFE3A7] to-[#FFF8EA] font-extrabold drop-shadow-sm">
              Dream
            </span>
            <span>Home on AuraLiving</span>
          </h1>

          <p className="text-xs sm:text-sm text-white/95 font-normal tracking-wide drop-shadow-sm">
            Over <strong className="font-bold text-white">40K+</strong> properties worth{" "}
            <strong className="font-bold text-white">3 Billion Dollars</strong> sold with{" "}
            <strong className="font-bold text-white">0% brokerage!</strong>
          </p>
        </div>

        {/* Floating White Search Card Container */}
        <div className="max-w-4xl lg:max-w-[940px] mx-auto bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-visible relative z-30">
          {/* Top Row: Service & Feature Tabs */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-3 border-b border-gray-100 text-xs sm:text-[13px] font-semibold text-gray-800">
            {/* Left Tabs Group */}
            <div className="flex items-center gap-6 sm:gap-9 overflow-x-auto no-scrollbar">
              {/* Aura AI Tab */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("ai");
                  onOpenAiModal && onOpenAiModal();
                }}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "ai"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D29324] fill-[#D29324]/30" />
                <span>Aura AI</span>
              </button>

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
              <a
                href="#consultation_form"
                onClick={() => setActiveTab("check")}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === "check"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                PropCheck
              </a>

              {/* Rent Agreement */}
              <a
                href="#shots"
                onClick={() => setActiveTab("rent")}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === "rent"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                Rent Agreement
              </a>
            </div>

            {/* Right Tab: Dubai Desk with Exclusive Badge */}
            <div className="hidden sm:flex items-center pl-6 border-l border-gray-200">
              <a
                href="#exclusive"
                className="flex items-center gap-1.5 text-gray-800 hover:text-[#D29324] transition-colors whitespace-nowrap"
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
            className="p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 relative bg-white rounded-b-xl sm:rounded-b-2xl"
          >
            {/* City Selector */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={onOpenCityModal}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-1.5 px-3 py-2 text-xs sm:text-[13.5px] font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <span>Select City</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-7 w-px bg-gray-200 mx-1"></div>

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
                className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden py-1.5"
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
              className="bg-[#252525] hover:bg-[#111111] text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer"
            >
              Find Property
            </button>
          </form>
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
