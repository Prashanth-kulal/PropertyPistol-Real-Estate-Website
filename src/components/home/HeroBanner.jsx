"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  ChevronDown,
  LocateFixed,
  SlidersHorizontal,
  Train,
  Car,
  MapPin,
  Check
} from "lucide-react";
import { CITIES, PROJECTS } from "@/data";

export default function HeroBanner({
  selectedCity,
  isCityPage = false,
  onSelectCity,
  onOpenCityModal,
  onOpenAiModal,
  onOpenCommuteModal,
  onSearch
}) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState("ai");

  // City Dropdown state
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const cityDropdownRef = useRef(null);
  const cityInputRef = useRef(null);

  // Close dropdown on click or touch outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const currentCityObj =
    CITIES.find((c) => c.id.toLowerCase() === (selectedCity || "").toLowerCase()) || {
      name: "Mumbai",
      id: "mumbai"
    };

  // Filter cities for the dropdown
  const filteredDropdownCities = useMemo(() => {
    if (!citySearchQuery.trim()) return CITIES;
    const q = citySearchQuery.toLowerCase().trim();
    return CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.state && c.state.toLowerCase().includes(q))
    );
  }, [citySearchQuery]);

  const popularCities = useMemo(() => CITIES.filter((c) => c.popular), []);

  const handleCitySelect = (cityId) => {
    setIsCityDropdownOpen(false);
    setCitySearchQuery("");
    setHighlightedIndex(-1);
    if (onSelectCity) {
      onSelectCity(cityId);
    } else {
      router.push(`/${cityId}`);
    }
  };

  const handleKeyDown = (e) => {
    if (!isCityDropdownOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsCityDropdownOpen(true);
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsCityDropdownOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filteredDropdownCities.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + filteredDropdownCities.length) % filteredDropdownCities.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredDropdownCities.length) {
        handleCitySelect(filteredDropdownCities[highlightedIndex].id);
      } else if (filteredDropdownCities.length > 0) {
        handleCitySelect(filteredDropdownCities[0].id);
      }
    }
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
    <section className="relative w-full overflow-hidden sm:overflow-visible bg-[#1C1B18] bg-[url('/images/hero-luxury-residence.jpg')] bg-cover bg-center bg-no-repeat pt-8 pb-10 sm:pt-14 sm:pb-16 min-h-[440px] sm:min-h-[490px] lg:min-h-[520px] flex flex-col justify-center transition-all duration-300">
      {/* Refined gradient overlay ensuring the luxury property photo shines through with readable text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75 pointer-events-none" />

      {/* Subtle radial warmth vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D29324]/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Top Centered Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-3 mb-5 sm:mb-8">
          {/* Main Headline */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 drop-shadow-md leading-tight">
            <span>Find Your</span>
            {/* Magnifying Glass Icon Badge */}
            <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-white/70 bg-white/15 backdrop-blur-md text-white shadow-sm">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFE2A7]" />
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
        <div className="w-full max-w-4xl lg:max-w-[940px] mx-auto bg-white rounded-2xl shadow-2xl border border-white/40 overflow-visible relative z-30 backdrop-blur-xs">
          {/* Top Row: Service & Feature Tabs */}
          <div className="flex items-center justify-between px-4 sm:px-8 border-b border-gray-100 bg-[#FAF8F4]/80 rounded-t-2xl">
            {/* Left Tabs Group */}
            <div className="flex items-center gap-5 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth">
              {/* Ask AI Tab */}
              <Link
                href="/ask-ai"
                onClick={() => setActiveTab("ai")}
                className={`relative flex items-center gap-1.5 py-3 sm:py-3.5 transition-colors cursor-pointer whitespace-nowrap text-xs sm:text-[13px] font-semibold shrink-0 ${
                  activeTab === "ai"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D29324] fill-[#D29324]/30" />
                <span>Ask AI</span>
                {activeTab === "ai" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D29324] rounded-full shadow-xs" />
                )}
              </Link>

              {/* Home Loan */}
              <Link
                href="/home-loan"
                onClick={() => setActiveTab("loan")}
                className={`relative flex items-center gap-1.5 py-3 sm:py-3.5 transition-colors cursor-pointer whitespace-nowrap text-xs sm:text-[13px] font-semibold shrink-0 ${
                  activeTab === "loan"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                <span>Home Loan</span>
                {activeTab === "loan" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D29324] rounded-full shadow-xs" />
                )}
              </Link>

              {/* PropCheck */}
              <Link
                href="/propcheck"
                onClick={() => setActiveTab("check")}
                className={`relative flex items-center gap-1.5 py-3 sm:py-3.5 transition-colors cursor-pointer whitespace-nowrap text-xs sm:text-[13px] font-semibold shrink-0 ${
                  activeTab === "check"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                <span>PropCheck</span>
                {activeTab === "check" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D29324] rounded-full shadow-xs" />
                )}
              </Link>

              {/* Price Trends (rendered ONLY on city destination page banner near PropCheck) */}
              {isCityPage && (
                <Link
                  href={`/${currentCityObj.id || "mumbai"}/price-trends`}
                  onClick={() => setActiveTab("price-trends")}
                  className={`relative flex items-center gap-1.5 py-3 sm:py-3.5 transition-colors cursor-pointer whitespace-nowrap text-xs sm:text-[13px] font-semibold shrink-0 ${
                    activeTab === "price-trends"
                      ? "text-[#D29324] font-bold"
                      : "text-gray-700 hover:text-[#D29324]"
                  }`}
                >
                  <span>Price Trends</span>
                  {activeTab === "price-trends" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D29324] rounded-full shadow-xs" />
                  )}
                </Link>
              )}

              {/* Rent Agreement */}
              <Link
                href="/rent-agreement"
                onClick={() => setActiveTab("rent")}
                className={`relative flex items-center gap-1.5 py-3 sm:py-3.5 transition-colors cursor-pointer whitespace-nowrap text-xs sm:text-[13px] font-semibold shrink-0 ${
                  activeTab === "rent"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-700 hover:text-[#D29324]"
                }`}
              >
                <span>Rent Agreement</span>
                {activeTab === "rent" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D29324] rounded-full shadow-xs" />
                )}
              </Link>
            </div>

            {/* Right Tab: Dubai Desk with Exclusive Badge */}
            <div className="hidden sm:flex items-center pl-6 border-l border-gray-200">
              <a
                href="#exclusive"
                onClick={() => setActiveTab("dubai")}
                className={`relative flex items-center gap-1.5 py-3 sm:py-3.5 transition-colors whitespace-nowrap text-xs sm:text-[13px] font-semibold ${
                  activeTab === "dubai"
                    ? "text-[#D29324] font-bold"
                    : "text-gray-800 hover:text-[#D29324]"
                }`}
              >
                <span>Dubai Desk</span>
                <span className="px-1.5 py-[1px] rounded-full bg-[#1D7E95] text-white text-[9.5px] font-bold tracking-wider uppercase">
                  Exclusive
                </span>
                {activeTab === "dubai" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D29324] rounded-full shadow-xs" />
                )}
              </a>
            </div>
          </div>

          {/* Bottom Row: Search Controls */}
          <form
            onSubmit={handleSearchSubmit}
            className="p-2.5 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 relative bg-white rounded-b-2xl"
          >
            {/* City Selector Dropdown */}
            <div className="shrink-0 relative" ref={cityDropdownRef}>
              <button
                type="button"
                id="city-dropdown-button"
                aria-haspopup="listbox"
                aria-expanded={isCityDropdownOpen}
                onClick={() => {
                  setIsCityDropdownOpen((prev) => !prev);
                  setCitySearchQuery("");
                  setHighlightedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2.5 sm:py-2 text-xs sm:text-[13.5px] font-semibold transition-all rounded-xl cursor-pointer ${
                  isCityDropdownOpen
                    ? "text-[#AE7419] bg-[#FBF1DF] border border-[#D29324]/40"
                    : "text-gray-700 hover:text-gray-900 bg-gray-50/80 sm:bg-transparent border border-gray-200/80 sm:border-transparent hover:bg-[#FAF8F4]"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-[#D29324] shrink-0" />
                  <span className="font-bold truncate max-w-[140px] sm:max-w-none">
                    {isCityPage ? currentCityObj.name : "Select City"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 shrink-0 ${
                    isCityDropdownOpen ? "rotate-180 text-[#D29324]" : ""
                  }`}
                />
              </button>

              {/* City Dropdown Menu Panel */}
              {isCityDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Select City"
                  className="absolute top-full left-0 mt-2 w-[calc(100vw-3rem)] sm:w-80 max-w-[340px] bg-white rounded-2xl shadow-2xl border border-[#E8E3DA] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-black/5"
                >
                  {/* Quick Search inside Dropdown */}
                  <div className="relative mb-2.5">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      ref={cityInputRef}
                      type="text"
                      value={citySearchQuery}
                      onChange={(e) => {
                        setCitySearchQuery(e.target.value);
                        setHighlightedIndex(0);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Search city or state..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF8F4] border border-[#E8E3DA] rounded-xl text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#D29324] focus:bg-white font-medium transition-all"
                      autoFocus
                    />
                  </div>

                  {/* Popular Metros Quick Chips */}
                  {!citySearchQuery && (
                    <div className="mb-2.5 pb-2.5 border-b border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 px-1">
                        Popular Metros
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {popularCities.slice(0, 7).map((c) => {
                          const isSelected = selectedCity?.toLowerCase() === c.id.toLowerCase();
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => handleCitySelect(c.id)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#D29324] text-white shadow-xs"
                                  : "bg-[#FAF8F4] text-gray-700 hover:bg-[#FBF1DF] hover:text-[#AE7419] border border-[#E8E3DA]"
                              }`}
                            >
                              {c.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Cities Scrollable List */}
                  <div className="max-h-56 overflow-y-auto no-scrollbar space-y-0.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1 px-1">
                      {citySearchQuery ? "Search Results" : "All Operating Cities"}
                    </span>
                    {filteredDropdownCities.length > 0 ? (
                      filteredDropdownCities.map((city, idx) => {
                        const isSelected = selectedCity?.toLowerCase() === city.id.toLowerCase();
                        const isHighlighted = highlightedIndex === idx;
                        return (
                          <button
                            key={city.id}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleCitySelect(city.id)}
                            onMouseEnter={() => setHighlightedIndex(idx)}
                            className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#FBF1DF] text-[#AE7419] font-bold"
                                : isHighlighted
                                ? "bg-[#FAF8F4] text-gray-900"
                                : "text-gray-700 hover:bg-[#FAF8F4]"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <MapPin
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isSelected ? "text-[#D29324]" : "text-gray-400"
                                }`}
                              />
                              <div className="truncate">
                                <span className="font-semibold text-gray-900">{city.name}</span>
                                {city.state && (
                                  <span className="text-[10px] text-gray-400 ml-1.5">
                                    ({city.state})
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              {city.projectsCount && (
                                <span className="text-[10px] text-gray-400 font-medium">
                                  {city.projectsCount}+
                                </span>
                              )}
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#D29324]" />}
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div className="py-4 text-center text-xs text-gray-400">
                        No cities match &ldquo;{citySearchQuery}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Footer link to open full City Selector Modal */}
                  <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between px-1">
                    <span className="text-[10px] text-gray-400 font-medium">
                      {CITIES.length} Metros Available
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCityDropdownOpen(false);
                        if (onOpenCityModal) onOpenCityModal();
                      }}
                      className="text-[11px] font-bold text-[#AE7419] hover:text-[#D29324] transition-colors cursor-pointer"
                    >
                      View All Details &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-7 w-px bg-gray-200 mx-1" />

            {/* Locality, Property, Developer Input */}
            <div className="relative flex-1 flex items-center bg-gray-50/80 sm:bg-transparent border border-gray-200/80 sm:border-transparent rounded-xl px-2.5 sm:px-0 py-1 sm:py-0">
              <Search className="w-4 h-4 text-gray-400 ml-1 sm:ml-2 mr-2 shrink-0" />
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
                className="p-1.5 text-gray-400 hover:text-[#D29324] transition-colors cursor-pointer shrink-0"
                title="Detect My Location"
              >
                <LocateFixed className="w-4 h-4" />
              </button>

              {/* Filter Sliders Icon */}
              <button
                type="button"
                onClick={onOpenCityModal}
                className="p-1.5 text-gray-400 hover:text-[#D29324] transition-colors cursor-pointer mr-0.5 sm:mr-1 shrink-0"
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
              className="w-full sm:w-auto bg-[#252525] hover:bg-[#D29324] text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer text-center"
            >
              Find Property
            </button>
          </form>

          {/* Search by Rail Network or Commute Time (rendered ONLY on city destination page banner) */}
          {isCityPage && (
            <div className="pt-2.5 pb-2 flex items-center justify-center border-t border-gray-100 px-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full bg-white text-[11px] sm:text-xs font-semibold text-[#252525] flex-wrap justify-center">
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
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
          title="WhatsApp Support"
        >
          <svg className="w-7 h-7 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
