"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Building,
  ShieldCheck,
  PhoneCall,
  Download,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  SlidersHorizontal,
  Home,
  Check,
  ArrowRight,
  ArrowLeft,
  Flame,
  X
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertiesForSalePreFooter from "@/components/common/PropertiesForSalePreFooter";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import ProjectInquiryModal from "@/components/common/ProjectInquiryModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import WishlistButton from "@/components/common/WishlistButton";
import CompareCheckbox from "@/components/common/CompareCheckbox";
import CompareTray from "@/components/common/CompareTray";
import { CITIES, getProjectSlug } from "@/data";
import { getCityDetails, getPropertiesForCity } from "@/data/cityData";
import { resolveCategory } from "@/data/categoryData";

export default function CategoryListingPage({ cityId = "mumbai", categorySlug = "new-projects" }) {
  const router = useRouter();

  // Normalize city & category
  const normalizedCityId = (cityId || "mumbai").toLowerCase().trim();
  const matchedCity = useMemo(() => {
    return (
      CITIES.find(
        (c) =>
          c.id.toLowerCase() === normalizedCityId ||
          c.name.toLowerCase() === normalizedCityId.replace(/-/g, " ")
      ) || CITIES[0]
    );
  }, [normalizedCityId]);

  const categoryConfig = useMemo(() => {
    return resolveCategory(categorySlug);
  }, [categorySlug]);

  const cityData = useMemo(() => {
    return getCityDetails(matchedCity.id);
  }, [matchedCity.id]);

  const rawProperties = useMemo(() => {
    return getPropertiesForCity(matchedCity.id);
  }, [matchedCity.id]);

  // Modals state
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState(null);

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBhk, setSelectedBhk] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedAmenity, setSelectedAmenity] = useState("all");
  const [selectedPossession, setSelectedPossession] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Accordion Expand/Collapse States for Sidebar
  const [openAccordions, setOpenAccordions] = useState({
    bedrooms: true,
    budget: true,
    amenities: true,
    possession: true
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Interactive UI states
  const [activeImageIndexes, setActiveImageIndexes] = useState({});
  const [openFaq, setOpenFaq] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleNextImage = (projId, total, e) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [projId]: ((prev[projId] || 0) + 1) % total
    }));
  };

  const handlePrevImage = (projId, total, e) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [projId]: ((prev[projId] || 0) - 1 + total) % total
    }));
  };

  const handleResetFilters = () => {
    setSelectedBhk("all");
    setSelectedBudget("all");
    setSelectedAmenity("all");
    setSelectedPossession("all");
    setSearchQuery("");
    setSortBy("relevance");
  };

  // Switch City while preserving current category
  const handleCityChange = (newCity) => {
    setIsCityModalOpen(false);
    const targetSlug = categoryConfig.getCitySlug
      ? categoryConfig.getCitySlug(newCity)
      : `${categoryConfig.slugKey}-in-${newCity}`;
    router.push(`/${newCity}/buy/${targetSlug}`);
  };

  // Safe Back Navigation returning to originating City page
  const handleBackNavigation = () => {
    if (
      typeof window !== "undefined" &&
      window.history.length > 1 &&
      document.referrer &&
      document.referrer.includes(window.location.host) &&
      !document.referrer.endsWith(window.location.pathname)
    ) {
      router.back();
    } else {
      router.push(`/${matchedCity.id}`);
    }
  };

  // Filtered and sorted properties for this category
  const filteredProperties = useMemo(() => {
    let list = [...rawProperties];

    // Category-specific or Custom-slug base filtering
    if (categoryConfig.developerFilter) {
      const devMatch = list.filter((p) =>
        p.builder.toLowerCase().includes(categoryConfig.developerFilter.toLowerCase())
      );
      if (devMatch.length > 0) list = devMatch;
    } else if (categoryConfig.localityFilter) {
      const locMatch = list.filter(
        (p) =>
          p.location.toLowerCase().includes(categoryConfig.localityFilter.toLowerCase()) ||
          p.name.toLowerCase().includes(categoryConfig.localityFilter.toLowerCase())
      );
      if (locMatch.length > 0) list = locMatch;
    }

    // BHK filter
    if (selectedBhk !== "all") {
      const bLower = selectedBhk.toLowerCase();
      if (bLower.includes("4+")) {
        list = list.filter((p) => {
          const ft = (p.flatTypes || p.configuration || "").toLowerCase();
          return ft.includes("4") || ft.includes("5") || ft.includes("penthouse");
        });
      } else {
        const num = bLower.split(" ")[0]; // "1", "2", "3", "4"
        list = list.filter((p) => {
          const ft = (p.flatTypes || p.configuration || "").toLowerCase();
          return ft.includes(`${num} bhk`) || ft.includes(`${num},`) || ft.includes(`${num} &`);
        });
      }
    }

    // Budget range matching Screenshot 1
    if (selectedBudget === "under-40l") {
      list = list.filter((p) => (p.priceNumeric || 0) < 4000000);
    } else if (selectedBudget === "40l-70l") {
      list = list.filter((p) => (p.priceNumeric || 0) >= 4000000 && (p.priceNumeric || 0) <= 7000000);
    } else if (selectedBudget === "70l-1cr") {
      list = list.filter((p) => (p.priceNumeric || 0) >= 7000000 && (p.priceNumeric || 0) <= 10000000);
    } else if (selectedBudget === "1cr-2cr") {
      list = list.filter((p) => (p.priceNumeric || 0) >= 10000000 && (p.priceNumeric || 0) <= 20000000);
    } else if (selectedBudget === "above-2cr") {
      list = list.filter((p) => (p.priceNumeric || 0) > 20000000);
    } else if (selectedBudget === "on-request") {
      list = list.filter((p) => !p.priceNumeric || p.priceNumeric === 0 || (p.price || "").toLowerCase().includes("request"));
    }

    // Amenities filter
    if (selectedAmenity !== "all") {
      const aLower = selectedAmenity.toLowerCase();
      list = list.filter((p) => {
        const feats = Array.isArray(p.features) ? p.features.map((f) => f.toLowerCase()) : [];
        const amens = Array.isArray(p.amenities)
          ? p.amenities.map((a) => (typeof a === "string" ? a.toLowerCase() : (a.name || "").toLowerCase()))
          : [];
        const combined = [...feats, ...amens];
        return combined.some((item) => item.includes(aLower));
      });
    }

    // Possession filter
    if (selectedPossession !== "all") {
      const posLower = selectedPossession.toLowerCase();
      list = list.filter((p) => {
        const statusLower = (p.possessionStatus || p.status || "").toLowerCase();
        return statusLower.includes(posLower);
      });
    }

    // Search input
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.builder.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => (a.priceNumeric || 0) - (b.priceNumeric || 0));
    } else if (sortBy === "price-high") {
      list.sort((a, b) => (b.priceNumeric || 0) - (a.priceNumeric || 0));
    } else if (sortBy === "most-recent") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [
    rawProperties,
    categoryConfig.developerFilter,
    categoryConfig.localityFilter,
    selectedBhk,
    selectedBudget,
    selectedAmenity,
    selectedPossession,
    searchQuery,
    sortBy
  ]);

  const cityFaqs = useMemo(() => {
    return categoryConfig.faqs(matchedCity.name);
  }, [categoryConfig, matchedCity.name]);

  const overviewParagraphs = useMemo(() => {
    return categoryConfig.overviewContent(matchedCity.name);
  }, [categoryConfig, matchedCity.name]);

  const hasActiveFilters =
    selectedBhk !== "all" ||
    selectedBudget !== "all" ||
    selectedAmenity !== "all" ||
    selectedPossession !== "all" ||
    searchQuery !== "";

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#252525] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Global Header */}
      <Header
        selectedCity={matchedCity.id}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. Breadcrumbs & Header Bar */}
      <div className="bg-white border-b border-[#E8E3DA] py-2.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={handleBackNavigation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E3DA] bg-[#FAF8F4] hover:bg-[#FBF1DF] text-xs font-bold text-[#252525] hover:text-[#AE7419] transition-all cursor-pointer shrink-0 group"
              title={`Back to ${matchedCity.name} City Page`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D29324] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>

            <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link href="/" className="hover:text-[#D29324] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href={`/${matchedCity.id}`} className="hover:text-[#D29324] transition-colors capitalize">
                {matchedCity.name}
              </Link>
              <span>/</span>
              <span className="text-[#6B7280]">Flats for Sale in {matchedCity.name}</span>
              <span>/</span>
              <span className="text-[#EA580C] font-bold">
                {categoryConfig.breadcrumbLabel(matchedCity.name)}
              </span>
            </nav>
          </div>

          <Link
            href={`/${matchedCity.id}`}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#AE7419] hover:text-[#D29324] shrink-0 transition-colors"
          >
            <span>{matchedCity.name} Overview</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Layout Container: Left Sidebar Filters + Right Listings Grid (Matching Screenshots 1 & 2) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-4 bg-white p-3 rounded-xl border border-[#E8E3DA] shadow-xs">
          <button
            type="button"
            onClick={() => setShowMobileFilterDrawer(!showMobileFilterDrawer)}
            className="flex items-center gap-2 text-xs font-bold text-[#252525] bg-[#FAF8F4] px-4 py-2 rounded-xl border border-[#E8E3DA]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
            )}
          </button>

          <span className="text-xs font-bold text-gray-500">
            {filteredProperties.length} Projects
          </span>
        </div>

        <div className="flex items-start gap-8">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR: Active Filters & Accordions (Screenshot 1)  */}
          {/* ========================================================= */}
          <aside
            className={`w-72 lg:w-76 shrink-0 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-6 ${
              showMobileFilterDrawer
                ? "fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto block shadow-2xl p-6"
                : "hidden lg:block sticky top-[85px]"
            }`}
          >
            {/* Mobile Close Button */}
            {showMobileFilterDrawer && (
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 lg:hidden">
                <span className="font-extrabold text-sm text-gray-900">Filters</span>
                <button
                  type="button"
                  onClick={() => setShowMobileFilterDrawer(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* 1. Active Filters Header with Clear All link */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                  Active Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-[#EA580C] hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Active Filter Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {/* Default Tag for Category */}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#EA580C] bg-[#EA580C]/5 text-[#EA580C] text-xs font-semibold">
                  <span>{categoryConfig.label}</span>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="hover:text-black transition-colors"
                  >
                    &times;
                  </button>
                </span>

                {selectedBhk !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#EA580C] bg-[#EA580C]/5 text-[#EA580C] text-xs font-semibold">
                    <span>{selectedBhk}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedBhk("all")}
                      className="hover:text-black transition-colors"
                    >
                      &times;
                    </button>
                  </span>
                )}

                {selectedBudget !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#EA580C] bg-[#EA580C]/5 text-[#EA580C] text-xs font-semibold">
                    <span>{selectedBudget.replace(/-/g, " ").toUpperCase()}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedBudget("all")}
                      className="hover:text-black transition-colors"
                    >
                      &times;
                    </button>
                  </span>
                )}

                {selectedAmenity !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#EA580C] bg-[#EA580C]/5 text-[#EA580C] text-xs font-semibold">
                    <span>{selectedAmenity}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedAmenity("all")}
                      className="hover:text-black transition-colors"
                    >
                      &times;
                    </button>
                  </span>
                )}

                {selectedPossession !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#EA580C] bg-[#EA580C]/5 text-[#EA580C] text-xs font-semibold">
                    <span>{selectedPossession}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedPossession("all")}
                      className="hover:text-black transition-colors"
                    >
                      &times;
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* 2. Accordion: No. of Bedrooms */}
            <div className="pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => toggleAccordion("bedrooms")}
                className="w-full flex items-center justify-between text-xs font-bold text-gray-800 cursor-pointer mb-3"
              >
                <span>No. of Bedrooms</span>
                {openAccordions.bedrooms ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {openAccordions.bedrooms && (
                <div className="flex flex-wrap gap-2 animate-in fade-in duration-200">
                  {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map((bhk) => {
                    const isSelected = selectedBhk === bhk;
                    return (
                      <button
                        key={bhk}
                        type="button"
                        onClick={() => setSelectedBhk(isSelected ? "all" : bhk)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#EA580C]/10 border-2 border-[#EA580C] text-[#EA580C] font-bold shadow-2xs"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {bhk}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Accordion: Budget */}
            <div className="pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => toggleAccordion("budget")}
                className="w-full flex items-center justify-between text-xs font-bold text-gray-800 cursor-pointer mb-3"
              >
                <span>Budget</span>
                {openAccordions.budget ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {openAccordions.budget && (
                <div className="flex flex-wrap gap-2 animate-in fade-in duration-200">
                  {[
                    { id: "under-40l", label: "Under 40 L" },
                    { id: "40l-70l", label: "40 L - 70 L" },
                    { id: "70l-1cr", label: "70 L - 1 Cr" },
                    { id: "1cr-2cr", label: "1 Cr - 2 Cr" },
                    { id: "above-2cr", label: "Above 2 Cr" },
                    { id: "on-request", label: "On Request" }
                  ].map((item) => {
                    const isSelected = selectedBudget === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedBudget(isSelected ? "all" : item.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#EA580C]/10 border-2 border-[#EA580C] text-[#EA580C] font-bold shadow-2xs"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Accordion: Amenities */}
            <div className="pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => toggleAccordion("amenities")}
                className="w-full flex items-center justify-between text-xs font-bold text-gray-800 cursor-pointer mb-3"
              >
                <span>Amenities</span>
                {openAccordions.amenities ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {openAccordions.amenities && (
                <div className="flex flex-wrap gap-2 animate-in fade-in duration-200">
                  {["Parking", "Swimming Pool", "Lift", "Gated Community", "Gas Pipeline"].map(
                    (amenity) => {
                      const isSelected = selectedAmenity === amenity;
                      return (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => setSelectedAmenity(isSelected ? "all" : amenity)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#EA580C]/10 border-2 border-[#EA580C] text-[#EA580C] font-bold shadow-2xs"
                              : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
                          }`}
                        >
                          {amenity}
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* 5. Accordion: Possession */}
            <div className="pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => toggleAccordion("possession")}
                className="w-full flex items-center justify-between text-xs font-bold text-gray-800 cursor-pointer mb-3"
              >
                <span>Possession</span>
                {openAccordions.possession ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {openAccordions.possession && (
                <div className="flex flex-wrap gap-2 animate-in fade-in duration-200">
                  {["Ready to Move", "Under Construction", "New Launch"].map((pos) => {
                    const isSelected = selectedPossession === pos;
                    return (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setSelectedPossession(isSelected ? "all" : pos)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#EA580C]/10 border-2 border-[#EA580C] text-[#EA580C] font-bold shadow-2xs"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {pos}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          {/* ========================================================= */}
          {/* RIGHT MAIN AREA: Search/Sort Header + 3-Col Project Cards */}
          {/* ========================================================= */}
          <main className="flex-1 min-w-0 space-y-6">
            
            {/* Top Bar: Title, Count, Search, & Sort Controls */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  New Projects in {matchedCity.name}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  Showing {filteredProperties.length} Verified Developments
                </p>
              </div>

              {/* Search & Sort Dropdown */}
              <div className="flex items-center gap-2.5">
                {/* Search Input */}
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search project or area..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-800 bg-[#FAF8F4] focus:outline-hidden focus:border-[#EA580C] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-gray-400 hover:text-gray-700 absolute right-2.5 top-1/2 -translate-y-1/2"
                    >
                      &times;
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 bg-[#FAF8F4] border border-gray-200 px-2.5 py-1.5 rounded-xl shrink-0">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#EA580C]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-xs font-bold text-gray-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="most-recent">Most Recent</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3-Column Grid of Project Cards matching Screenshot 1 & 2 */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F4] text-gray-400 flex items-center justify-center mx-auto">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-800">
                  No projects match your current filter selection
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try clearing some bedroom or budget filters to explore other luxury developments in {matchedCity.name}.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2 rounded-xl bg-[#EA580C] text-white text-xs font-bold hover:bg-[#D29324] transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProperties.slice(0, visibleCount).map((project, idx) => {
                  const activeIdx = activeImageIndexes[project.id] || 0;
                  const projectSlug = getProjectSlug(project);
                  const images = project.images || [
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                  ];

                  const title = project.shortTitle || project.title || project.name;
                  const tagText = project.tag || "Trending";
                  const isRera = tagText.toLowerCase().includes("rera");

                  return (
                    <div
                      key={project.id || idx}
                      className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                    >
                      {/* Photo Container */}
                      <div className="relative h-56 bg-gray-100 overflow-hidden">
                        <Link href={`/projects/${projectSlug}`} className="block w-full h-full">
                          <img
                            src={images[activeIdx]}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>

                        {/* Top-Left: Offers Available Badge */}
                        <div className="absolute top-3 left-3 z-10 pointer-events-none">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EA580C] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                            <Flame className="w-3 h-3 fill-current text-white" />
                            <span>Offers Available</span>
                          </span>
                        </div>

                        {/* Top-Right: Heart (Wishlist) & Compare Checkbox (Completely Independent) */}
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                          {/* Heart Wishlist Button */}
                          <WishlistButton
                            project={project}
                            size="sm"
                            variant="minimal"
                            className="w-7 h-7 rounded-md bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors shadow-xs backdrop-blur-xs"
                          />

                          {/* Compare Checkbox */}
                          <CompareCheckbox project={project} size="sm" />
                        </div>

                        {/* Bottom-Center Image Dots Indicator */}
                        {images.length > 1 && (
                          <div className="absolute bottom-3 left-1/2 -translate-y-0 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
                            {images.map((_, dotIdx) => (
                              <span
                                key={dotIdx}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  dotIdx === activeIdx
                                    ? "bg-white w-3"
                                    : "bg-white/60"
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        {/* Bottom-Left Price Tag Overlay Pill */}
                        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                          <div className="px-3 py-1 bg-white/95 backdrop-blur-xs rounded-full shadow-md text-xs font-black text-[#252525]">
                            ₹ {project.price}
                          </div>
                        </div>

                        {/* Hover Next/Prev image arrows */}
                        {images.length > 1 && (
                          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={(e) => handlePrevImage(project.id, images.length, e)}
                              className="w-6 h-6 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleNextImage(project.id, images.length, e)}
                              className="w-6 h-6 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                        <div className="space-y-1.5">
                          {/* Tag: Trending or RERA Verified */}
                          <div className="flex items-center gap-1.5">
                            {isRera ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-100">
                                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                <span>RERA Verified</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">
                                <Sparkles className="w-3 h-3 text-blue-500" />
                                <span>Trending</span>
                              </span>
                            )}
                          </div>

                          {/* Project Name */}
                          <Link href={`/projects/${projectSlug}`}>
                            <h2
                              className="text-base font-extrabold text-[#252525] truncate hover:text-[#EA580C] transition-colors"
                              title={project.name}
                            >
                              {title}
                            </h2>
                          </Link>

                          {/* Subtitle / Location */}
                          <p
                            className="text-xs text-gray-500 truncate font-medium"
                            title={`${project.flatTypes} for Sale in ${project.location}`}
                          >
                            {project.flatTypes} for Sale in {project.location}
                          </p>

                          {/* 2x2 Specs Grid matching Screenshot 1 */}
                          <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-3 border-t border-gray-100 text-xs">
                            {/* Configurations */}
                            <div className="min-w-0">
                              <span className="font-semibold text-gray-900 block truncate text-xs">
                                {project.flatTypes}
                              </span>
                              <span className="text-[11px] text-gray-400 block font-medium">
                                Configurations
                              </span>
                            </div>

                            {/* Per Sq.ft */}
                            <div className="min-w-0">
                              <span className="font-semibold text-gray-900 block truncate text-xs">
                                {project.avgPrice || "INR 28.08 K"}
                              </span>
                              <span className="text-[11px] text-gray-400 block font-medium">
                                Per Sq.ft
                              </span>
                            </div>

                            {/* Built up Area */}
                            <div className="min-w-0">
                              <span className="font-semibold text-gray-900 block truncate text-xs">
                                {project.builtUpArea || "On request"}
                              </span>
                              <span className="text-[11px] text-gray-400 block font-medium">
                                Built up Area
                              </span>
                            </div>

                            {/* Carpet Area */}
                            <div className="min-w-0">
                              <span className="font-semibold text-gray-900 block truncate text-xs">
                                {project.carpetArea || "On Request"}
                              </span>
                              <span className="text-[11px] text-gray-400 block font-medium">
                                Carpet Area
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom CTA Button: Get in Touch (Screenshot 1) */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setInquiryProject(project)}
                            className="w-full py-2.5 rounded-full border border-[#EA580C]/40 text-[#EA580C] hover:bg-[#EA580C]/5 font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Get in Touch</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Load More Button */}
            {filteredProperties.length > visibleCount && (
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 rounded-2xl bg-white border border-[#EA580C] text-[#EA580C] hover:bg-[#EA580C] hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Load More Properties ({filteredProperties.length - visibleCount} remaining)
                </button>
              </div>
            )}

            {/* 4. In-Depth Category Guide / Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 space-y-4 shadow-xs mt-8">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-2.5 py-0.5 rounded-full inline-block">
                Buyer&apos;s Knowledge Base
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#252525]">
                {categoryConfig.overviewTitle(matchedCity.name)}
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {overviewParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>

            {/* 5. FAQs Accordion */}
            {cityFaqs && cityFaqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 space-y-6 shadow-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Got Questions?
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#252525] flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#D29324]" />
                    <span>Frequently Asked Questions about {categoryConfig.label} in {matchedCity.name}</span>
                  </h3>
                </div>

                <div className="space-y-3">
                  {cityFaqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-[#E8E3DA] rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                          className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#252525] flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#D29324] transition-transform duration-200 shrink-0 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-4 text-xs text-[#6B7280] leading-relaxed border-t border-[#E8E3DA] bg-[#FAF8F4]/40">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Persistent Compare Tray matching Screenshot 2 */}
      <CompareTray />

      {/* Pre-Footer Locality Links matching Screenshot 2 */}
      <PropertiesForSalePreFooter cityId={matchedCity.id} />

      {/* Global Footer */}
      <Footer />

      {/* Modals */}
      <ProjectInquiryModal
        isOpen={!!inquiryProject}
        onClose={() => setInquiryProject(null)}
        project={inquiryProject}
      />

      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={matchedCity.id}
        onSelectCity={(cityId) => handleCityChange(cityId)}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectProject={(proj) => setInquiryProject(proj)}
      />
    </div>
  );
}
