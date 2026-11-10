"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import { useWishlist } from "@/context/WishlistContext";
import { CITIES, getProjectSlug } from "@/data";
import { getCityDetails, getPropertiesForCity } from "@/data/cityData";
import { resolveCategory } from "@/data/categoryData";

// Helper for dynamic numbered pagination with ellipses (matching Screenshot 2)
function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, "...", total];
  }
  if (current >= total - 2) {
    return [1, "...", total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

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

  // Wishlist context
  const { savedCount } = useWishlist ? useWishlist() : { savedCount: 0 };

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

  // Quick Filter Chips State (Screenshot 1: New Projects, Ready to Move, 70 L - 1 Cr, Possession in 1 Year)
  const [activeQuickFilter, setActiveQuickFilter] = useState("new-projects");

  // Pagination State (Screenshot 2: 20 per page)
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 20;

  // Floating Back to Top Button state (Screenshot 2)
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    setActiveQuickFilter("all");
    setSelectedBhk("all");
    setSelectedBudget("all");
    setSelectedAmenity("all");
    setSelectedPossession("all");
    setSearchQuery("");
    setSortBy("relevance");
    setCurrentPage(1);
  };

  // Automatically reset to page 1 whenever any filter, search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedBhk,
    selectedBudget,
    selectedAmenity,
    selectedPossession,
    searchQuery,
    sortBy,
    activeQuickFilter,
    cityId,
    categorySlug
  ]);

  // Switch City while preserving current category
  const handleCityChange = (newCity) => {
    setIsCityModalOpen(false);
    const targetSlug = categoryConfig.getCitySlug
      ? categoryConfig.getCitySlug(newCity)
      : `${categoryConfig.slugKey}-in-${newCity}`;
    router.push(`/${newCity}/buy/${targetSlug}`);
  };

  // Filtered and sorted properties for this category
  const filteredProperties = useMemo(() => {
    let list = [...rawProperties];

    // Category-specific or Custom-slug base filtering
    if (categoryConfig.developerFilter) {
      const devQ = categoryConfig.developerFilter.toLowerCase().replace(/[^a-z0-9]/g, "");
      const devMatch = list.filter((p) => {
        const bNorm = (p.builder || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const sNorm = (p.developerSlug || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        return bNorm.includes(devQ) || devQ.includes(bNorm) || sNorm.includes(devQ) || devQ.includes(sNorm);
      });
      if (devMatch.length > 0) list = devMatch;
    } else if (categoryConfig.regionFilter) {
      const regMatch = list.filter(
        (p) =>
          (p.region && p.region.toLowerCase().includes(categoryConfig.regionFilter.toLowerCase())) ||
          (p.location && p.location.toLowerCase().includes(categoryConfig.regionFilter.toLowerCase()))
      );
      if (regMatch.length > 0) list = regMatch;
    } else if (categoryConfig.localityFilter) {
      const locQ = categoryConfig.localityFilter.toLowerCase();
      const locMatch = list.filter(
        (p) =>
          (p.locality && p.locality.toLowerCase().includes(locQ)) ||
          (p.location && p.location.toLowerCase().includes(locQ)) ||
          (p.name && p.name.toLowerCase().includes(locQ))
      );
      if (locMatch.length > 0) list = locMatch;
    }

    // Quick Filter Chips Logic (Screenshot 1)
    if (activeQuickFilter === "new-projects") {
      list = list.filter((p) => {
        const st = (p.status || p.possessionStatus || "").toLowerCase();
        return st.includes("new") || st.includes("construction") || st.includes("launch") || st.includes("under");
      });
    } else if (activeQuickFilter === "ready-to-move") {
      list = list.filter((p) => {
        const st = (p.status || p.possessionStatus || "").toLowerCase();
        const pos = (p.possessionDate || p.possession || "").toLowerCase();
        return st.includes("ready") || pos.includes("ready") || st.includes("immediate") || pos.includes("immediate");
      });
    } else if (activeQuickFilter === "70l-1cr") {
      list = list.filter((p) => (p.priceNumeric || 0) >= 7000000 && (p.priceNumeric || 0) <= 10000000);
    } else if (activeQuickFilter === "possession-1yr") {
      list = list.filter((p) => {
        const pos = (p.possessionDate || p.possession || p.possessionStatus || "").toLowerCase();
        return (
          pos.includes("2024") ||
          pos.includes("2025") ||
          pos.includes("2026") ||
          pos.includes("ready") ||
          pos.includes("immediate")
        );
      });
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
    categoryConfig.regionFilter,
    categoryConfig.localityFilter,
    activeQuickFilter,
    selectedBhk,
    selectedBudget,
    selectedAmenity,
    selectedPossession,
    searchQuery,
    sortBy
  ]);

  // Dynamic Pagination calculations (20 items per page)
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + PAGE_SIZE);

  const cityFaqs = useMemo(() => {
    return categoryConfig.faqs(matchedCity.name);
  }, [categoryConfig, matchedCity.name]);

  const overviewParagraphs = useMemo(() => {
    return categoryConfig.overviewContent(matchedCity.name);
  }, [categoryConfig, matchedCity.name]);

  const hasActiveFilters =
    activeQuickFilter !== "all" ||
    selectedBhk !== "all" ||
    selectedBudget !== "all" ||
    selectedAmenity !== "all" ||
    selectedPossession !== "all" ||
    searchQuery.trim() !== "";

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#252525] selection:bg-[#EA580C] selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#252525] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Global Header */}
      <Header
        selectedCity={matchedCity.id}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. Sticky Sub-Search Bar below Header matching Screenshot 1 */}
      <div className="bg-white border-b border-gray-200/80 sticky top-[70px] z-30 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3">
          {/* City Selector Pill */}
          <button
            type="button"
            onClick={() => setIsCityModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 hover:border-gray-300 bg-white text-xs font-bold text-gray-800 transition-colors shrink-0 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>{matchedCity.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Search Input matching Screenshot 1 */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Locality, Property or Developer"
              className="w-full pl-10 pr-8 py-2 rounded-xl border border-gray-200 bg-white text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#EA580C] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>

          {/* Commute Search Button matching Screenshot 1 */}
          <button
            type="button"
            onClick={() => showToast("Commute search will be available soon!")}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 hover:border-gray-300 bg-white text-xs font-semibold text-gray-700 transition-colors shrink-0 cursor-pointer"
          >
            <span className="text-sm">🚗</span>
            <span>Commute Search</span>
          </button>

          {/* More Filters Toggle for Mobile */}
          <button
            type="button"
            onClick={() => setShowMobileFilterDrawer(true)}
            className="inline-flex lg:hidden items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* 3. Main Layout Container: Sticky Left Sidebar + Right Listings Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        
        {/* Mobile Filter Drawer Toggle */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-4 bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
          <button
            type="button"
            onClick={() => setShowMobileFilterDrawer(!showMobileFilterDrawer)}
            className="flex items-center gap-2 text-xs font-bold text-gray-800 bg-[#FAF8F4] px-4 py-2 rounded-xl border border-gray-200 cursor-pointer"
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
          {/* LEFT SIDEBAR: Sticky Filters & Accordions (Screenshots 1 & 2) */}
          {/* ========================================================= */}
          <aside
            className={`w-72 lg:w-76 shrink-0 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-5 ${
              showMobileFilterDrawer
                ? "fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto block shadow-2xl p-6"
                : "hidden lg:block sticky top-[138px] self-start max-h-[calc(100vh-150px)] overflow-y-auto no-scrollbar"
            }`}
          >
            {/* Mobile Close Button */}
            {showMobileFilterDrawer && (
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 lg:hidden">
                <span className="font-extrabold text-sm text-gray-900">Filters</span>
                <button
                  type="button"
                  onClick={() => setShowMobileFilterDrawer(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* 1. Saved Properties Box matching Screenshot 1 */}
            <div className="bg-[#FAF8F4] rounded-xl border border-[#E8E3DA] p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900">Saved Properties</span>
                <span className="text-[10px] font-semibold text-gray-500">
                  {savedCount > 0 ? `${savedCount} Saved` : "0 Saved"}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug">
                You don&apos;t have any saved properties or projects, click an <span className="inline-block text-xs">🤍</span> to save
              </p>
            </div>

            {/* 2. Active Filters Header with Clear All link matching Screenshot 1 */}
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

              {/* Active Filter Chips with Orange Border matching Screenshot 1 */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeQuickFilter !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#EA580C] bg-[#EA580C]/5 text-[#EA580C] text-xs font-semibold">
                    <span>
                      {activeQuickFilter === "new-projects"
                        ? "New Projects"
                        : activeQuickFilter === "ready-to-move"
                        ? "Ready to Move"
                        : activeQuickFilter === "70l-1cr"
                        ? "70 L – 1 Cr"
                        : "Possession in 1 Year"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveQuickFilter("all")}
                      className="hover:text-black transition-colors cursor-pointer"
                    >
                      &times;
                    </button>
                  </span>
                )}

                {selectedBhk !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#EA580C] bg-[#EA580C]/5 text-[#EA580C] text-xs font-semibold">
                    <span>{selectedBhk}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedBhk("all")}
                      className="hover:text-black transition-colors cursor-pointer"
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
                      className="hover:text-black transition-colors cursor-pointer"
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
                      className="hover:text-black transition-colors cursor-pointer"
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
                      className="hover:text-black transition-colors cursor-pointer"
                    >
                      &times;
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* 3. Accordion: No. of Bedrooms */}
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

            {/* 4. Accordion: Budget */}
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

            {/* 5. Accordion: Amenities */}
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

            {/* 6. Accordion: Possession */}
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
          {/* RIGHT MAIN AREA: Top Info, Chips & Project Cards          */}
          {/* ========================================================= */}
          <main className="flex-1 min-w-0 space-y-4">
            
            {/* Missing Top Section matching Screenshot 1 */}
            <div className="space-y-2">
              {/* Breadcrumb Navigation matching Screenshot 1 */}
              <nav className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="/" className="hover:text-[#EA580C] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href={`/${matchedCity.id}`} className="hover:text-[#EA580C] transition-colors capitalize">
                  {matchedCity.name}
                </Link>
                <span>/</span>
                <span className="text-gray-700 font-semibold">
                  Real Estate {matchedCity.name}
                </span>
              </nav>

              {/* Introductory Description matching Screenshot 1 */}
              <p className="text-xs text-gray-600 leading-relaxed">
                Choose from our comprehensive list of luxury residential properties available for sale. Have an enriching home buying experience with PropertyPistol!
              </p>

              {/* Main Listing Heading matching Screenshot 1 */}
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight pt-1">
                Real Estate {matchedCity.name} – Property to buy in {matchedCity.name}
              </h1>

              {/* Quick-Filter Chips + Sorting Dropdown matching Screenshot 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 pb-1">
                {/* Quick Filter Chips on Left */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {[
                    { id: "new-projects", label: "New Projects" },
                    { id: "ready-to-move", label: "Ready to Move" },
                    { id: "70l-1cr", label: "70 L – 1 Cr" },
                    { id: "possession-1yr", label: "Possession in 1 Year" }
                  ].map((chip) => {
                    const isActive = activeQuickFilter === chip.id;
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => {
                          setActiveQuickFilter(isActive ? "all" : chip.id);
                          setCurrentPage(1);
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "border border-[#EA580C] text-gray-900 font-bold bg-white shadow-2xs"
                            : "border border-gray-200 text-gray-700 bg-white hover:border-gray-400 font-medium"
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>

                {/* Sort Dropdown on Right matching Screenshot 1: [ ≡ Relevance ⌵ ] */}
                <div className="relative inline-flex items-center self-end sm:self-auto shrink-0">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="bg-transparent text-xs font-semibold text-gray-800 focus:outline-hidden cursor-pointer pr-1"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="most-recent">Most Recent</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dynamic Project Result Count matching Screenshot 1 */}
              <div className="text-xs text-gray-500 font-medium">
                Showing {filteredProperties.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + PAGE_SIZE, filteredProperties.length)} of {filteredProperties.length}
              </div>
            </div>

            {/* Project Cards Grid (20 items per page) */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F4] text-gray-400 flex items-center justify-center mx-auto">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-800">
                  No projects match your current filter selection
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try clearing some bedroom, budget or quick filters to explore other luxury developments in {matchedCity.name}.
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
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {paginatedProperties.map((project, idx) => {
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
                      className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group overflow-hidden"
                    >
                      {/* Left: Photo Container */}
                      <div className="w-full sm:w-[220px] md:w-[250px] shrink-0 relative min-h-[190px] sm:min-h-full overflow-hidden bg-gray-100">
                        <Link href={`/projects/${projectSlug}`} className="block w-full h-full">
                          <img
                            src={images[activeIdx]}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>

                        {/* Top-Left: Offers Available Badge */}
                        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EA580C] text-white text-[9px] font-extrabold uppercase tracking-wider shadow-xs">
                            <Flame className="w-3 h-3 fill-current text-white" />
                            <span>Offers Available</span>
                          </span>
                        </div>

                        {/* Top-Right: Heart (Wishlist) & Compare Checkbox */}
                        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
                          <WishlistButton
                            project={project}
                            size="sm"
                            variant="minimal"
                            className="w-7 h-7 rounded-md bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors shadow-xs backdrop-blur-xs"
                          />
                          <CompareCheckbox project={project} size="sm" />
                        </div>

                        {/* Bottom-Center Image Dots Indicator */}
                        {images.length > 1 && (
                          <div className="absolute bottom-2.5 left-1/2 -translate-y-0 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
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
                        <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
                          <div className="px-2.5 py-0.5 bg-white/95 backdrop-blur-xs rounded-full shadow-md text-xs font-black text-[#252525]">
                            ₹ {project.price}
                          </div>
                        </div>

                        {/* Hover Next/Prev Image Arrows */}
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

                      {/* Right: Card Body Details */}
                      <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between space-y-3 min-w-0">
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
                              className="text-sm sm:text-base font-extrabold text-[#252525] truncate hover:text-[#EA580C] transition-colors"
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

                          {/* 2x2 Specs Grid */}
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-2 border-t border-gray-100 text-xs">
                            <div className="min-w-0">
                              <span className="font-semibold text-gray-900 block truncate text-xs">
                                {project.flatTypes}
                              </span>
                              <span className="text-[10px] text-gray-400 block font-medium">
                                Configurations
                              </span>
                            </div>

                            <div className="min-w-0">
                              <span className="font-semibold text-gray-900 block truncate text-xs">
                                {project.avgPrice || "INR 28.08 K"}
                              </span>
                              <span className="text-[10px] text-gray-400 block font-medium">
                                Per Sq.ft
                              </span>
                            </div>

                            <div className="min-w-0">
                              <span className="font-semibold text-gray-900 block truncate text-xs">
                                {project.builtUpArea || "On request"}
                              </span>
                              <span className="text-[10px] text-gray-400 block font-medium">
                                Built up Area
                              </span>
                            </div>

                            <div className="min-w-0">
                              <span className="font-semibold text-gray-900 block truncate text-xs">
                                {project.carpetArea || "On Request"}
                              </span>
                              <span className="text-[10px] text-gray-400 block font-medium">
                                Carpet Area
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom CTA: Get in Touch */}
                        <div className="pt-2 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => setInquiryProject(project)}
                            className="w-full py-2 rounded-xl border border-[#EA580C]/40 text-[#EA580C] hover:bg-[#EA580C]/5 font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
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

            {/* Centered Pagination matching Screenshot 2: [ < ] [ 1 ] [ 2 ] [ 3 ] [ ... ] [ 34 ] [ > ] */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-10 pb-4">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((p) => p - 1);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }
                  }}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 bg-white"
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Numbered Page Buttons & Ellipsis */}
                {getPageNumbers(currentPage, totalPages).map((item, idx) => {
                  if (item === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-9 h-9 flex items-center justify-center text-gray-400 text-xs font-semibold select-none"
                      >
                        ...
                      </span>
                    );
                  }

                  const pageNum = Number(item);
                  const isActive = currentPage === pageNum;

                  return (
                    <button
                      key={`page-${pageNum}`}
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 120, behavior: "smooth" });
                      }}
                      className={`w-9 h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "border border-[#EA580C] text-[#EA580C] bg-white shadow-2xs font-bold"
                          : "border border-gray-200 text-gray-700 bg-white hover:border-gray-400"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage((p) => p + 1);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                    currentPage === totalPages
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 bg-white"
                  }`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 4. Missing Bottom Section matching Screenshot 2: "Properties in Mumbai For Sale" */}
      <PropertiesForSalePreFooter cityId={matchedCity.id} />

      {/* 5. In-Depth Category Guide / Overview & FAQs */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Knowledge Base */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 space-y-4 shadow-xs">
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

        {/* FAQs Accordion */}
        {cityFaqs && cityFaqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 space-y-6 shadow-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-2.5 py-0.5 rounded-full inline-block mb-1">
                Got Questions?
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#252525] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#EA580C]" />
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
                        className={`w-4 h-4 text-[#EA580C] transition-transform duration-200 shrink-0 ${
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
      </div>

      {/* Floating Persistent Compare Tray */}
      <CompareTray />

      {/* Floating Back to Top Button matching Screenshot 2 */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center text-[#EA580C] hover:text-[#D29324] hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group"
          aria-label="Back to top"
          title="Back to top"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

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
