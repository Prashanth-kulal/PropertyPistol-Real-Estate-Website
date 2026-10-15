"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Search,
  Filter,
  ChevronDown,
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
  ArrowLeft
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import ProjectInquiryModal from "@/components/common/ProjectInquiryModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import WishlistButton from "@/components/common/WishlistButton";
import { CITIES, getProjectSlug } from "@/data";
import { getCityDetails, getPropertiesForCity } from "@/data/cityData";
import { resolveCategory } from "@/data/categoryData";

export default function CategoryListingPage({ cityId = "mumbai", categorySlug = "new-projects" }) {
  const router = useRouter();

  // Normalize city & category
  const normalizedCityId = (cityId || "mumbai").toLowerCase().trim();
  const matchedCity = useMemo(() => {
    return CITIES.find(
      (c) => c.id.toLowerCase() === normalizedCityId || c.name.toLowerCase() === normalizedCityId.replace(/-/g, " ")
    ) || CITIES[0];
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
  const [selectedPill, setSelectedPill] = useState("all");
  const [selectedBhk, setSelectedBhk] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  // Interactive UI states
  const [activeImageIndexes, setActiveImageIndexes] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [openFaq, setOpenFaq] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleToggleWishlist = (projectId, e) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const updated = !prev[projectId];
      showToast(updated ? "Property added to saved favorites!" : "Property removed from favorites.");
      return { ...prev, [projectId]: updated };
    });
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
    setSelectedPill("all");
    setSelectedBhk("all");
    setSelectedBudget("all");
    setSelectedType("all");
    setSearchQuery("");
    setSortBy("relevance");
  };

  // Switch City while preserving current category
  const handleCityChange = (newCity) => {
    setIsCityModalOpen(false);
    const targetSlug = categoryConfig.getCitySlug ? categoryConfig.getCitySlug(newCity) : `${categoryConfig.slugKey}-in-${newCity}`;
    router.push(`/${newCity}/buy/${targetSlug}`);
  };

  // Safe Back Navigation returning to originating City page
  const handleBackNavigation = () => {
    if (typeof window !== "undefined" && window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host) && !document.referrer.endsWith(window.location.pathname)) {
      router.back();
    } else {
      router.push(`/${matchedCity.id}`);
    }
  };

  // Filtered and sorted properties for this category
  const filteredProperties = useMemo(() => {
    let list = [...rawProperties];

    // Category-specific base filtering
    if (categoryConfig.id === "new-projects") {
      // Prioritize new launches or newly added projects
      list.sort((a, b) => (b.status === "New Launch" ? 1 : 0) - (a.status === "New Launch" ? 1 : 0));
    } else if (categoryConfig.id === "ready-to-move") {
      // Prioritize or filter ready-to-move projects
      list = list.filter((p) => p.status === "Ready to Move" || p.status === "New Launch");
    } else if (categoryConfig.id === "under-construction") {
      // Prioritize ongoing projects
      list = list.filter((p) => p.status === "Under Construction" || p.status === "New Launch");
    } else if (categoryConfig.id === "rera-compliant") {
      // All listings in database have RERA numbers
      list = list.filter((p) => Boolean(p.rera));
    } else if (categoryConfig.id === "developer-listings") {
      // Direct builder listings
      list.sort((a, b) => (b.tag === "Exclusive" ? 1 : 0) - (a.tag === "Exclusive" ? 1 : 0));
    }

    // Pill Filter
    if (selectedPill !== "all") {
      const pLower = selectedPill.toLowerCase();
      if (pLower.includes("ready") || pLower.includes("oc")) {
        list = list.filter((p) => p.status === "Ready to Move");
      } else if (pLower.includes("launch")) {
        list = list.filter((p) => p.status === "New Launch");
      } else if (pLower.includes("under-construction") || pLower.includes("possession")) {
        list = list.filter((p) => p.status === "Under Construction");
      }
    }

    // BHK filter
    if (selectedBhk !== "all") {
      list = list.filter((p) => p.flatTypes.toLowerCase().includes(selectedBhk.toLowerCase()));
    }

    // Property Type
    if (selectedType !== "all") {
      list = list.filter((p) => (p.type || "Apartment").toLowerCase() === selectedType.toLowerCase());
    }

    // Budget range
    if (selectedBudget === "under-1cr") {
      list = list.filter((p) => (p.priceNumeric || 0) < 10000000);
    } else if (selectedBudget === "1cr-2.5cr") {
      list = list.filter((p) => (p.priceNumeric || 0) >= 10000000 && (p.priceNumeric || 0) <= 25000000);
    } else if (selectedBudget === "above-2.5cr") {
      list = list.filter((p) => (p.priceNumeric || 0) > 25000000);
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

    // Sorting matching PropertyPistol options
    if (sortBy === "price-low") {
      list.sort((a, b) => (a.priceNumeric || 0) - (b.priceNumeric || 0));
    } else if (sortBy === "price-high") {
      list.sort((a, b) => (b.priceNumeric || 0) - (a.priceNumeric || 0));
    } else if (sortBy === "most-recent") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [rawProperties, categoryConfig.id, selectedPill, selectedBhk, selectedType, selectedBudget, searchQuery, sortBy]);

  const cityFaqs = useMemo(() => {
    return categoryConfig.faqs(matchedCity.name);
  }, [categoryConfig, matchedCity.name]);

  const overviewParagraphs = useMemo(() => {
    return categoryConfig.overviewContent(matchedCity.name);
  }, [categoryConfig, matchedCity.name]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#252525] selection:bg-[#D29324] selection:text-white">
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

      {/* 2. Breadcrumbs & Back Navigation Header matching PropertyPistol */}
      <div className="bg-white border-b border-[#E8E3DA] py-2.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Back Button returning to originating city page */}
            <button
              type="button"
              onClick={handleBackNavigation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E3DA] bg-[#FAF8F4] hover:bg-[#FBF1DF] text-xs font-bold text-[#252525] hover:text-[#AE7419] transition-all cursor-pointer shadow-2xs shrink-0 group"
              title={`Back to ${matchedCity.name} City Page`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D29324] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>

            {/* Breadcrumb links */}
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
              <span className="text-[#AE7419] font-bold">
                {categoryConfig.breadcrumbLabel(matchedCity.name)}
              </span>
            </nav>
          </div>

          {/* Quick link back to city */}
          <Link
            href={`/${matchedCity.id}`}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#AE7419] hover:text-[#D29324] shrink-0 transition-colors"
          >
            <span>{matchedCity.name} Overview</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* 3. Sticky Search & Filter Bar (`searchbarSort` matching PropertyPistol) */}
      <div className="bg-white border-b border-[#E8E3DA] sticky top-[70px] z-30 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Left: City Selector & Search Input */}
            <div className="flex-1 flex items-center gap-2">
              {/* City Switcher Pill */}
              <button
                type="button"
                onClick={() => setIsCityModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] text-xs font-extrabold text-[#252525] hover:border-[#D29324] hover:text-[#AE7419] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                title="Change City"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D29324]" />
                <span className="capitalize">{matchedCity.name}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {/* Search Bar Input */}
              <div className="flex-1 relative flex items-center bg-[#FAF8F4] rounded-xl border border-[#E8E3DA] px-3 py-1.5 focus-within:border-[#D29324] transition-colors">
                <Search className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search location, project, or developer in ${matchedCity.name}...`}
                  className="w-full text-xs sm:text-sm font-semibold text-[#252525] bg-transparent focus:outline-hidden placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs font-bold text-gray-400 hover:text-gray-700 px-1"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Right: Filter Trigger & Sort Options */}
            <div className="flex items-center gap-2.5 shrink-0 justify-between md:justify-end">
              {/* Filter Controls Button */}
              <button
                type="button"
                onClick={() => setShowFilterDrawer(!showFilterDrawer)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                  showFilterDrawer || selectedBhk !== "all" || selectedBudget !== "all" || selectedType !== "all"
                    ? "bg-[#D29324] border-[#D29324] text-white"
                    : "bg-[#FAF8F4] border-[#E8E3DA] text-[#252525] hover:border-[#D29324]"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {(selectedBhk !== "all" || selectedBudget !== "all" || selectedType !== "all") && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>

              {/* Sort Dropdown matching PropertyPistol options */}
              <div className="flex items-center gap-1.5 bg-[#FAF8F4] border border-[#E8E3DA] px-2.5 py-1.5 rounded-xl shadow-2xs">
                <ArrowUpDown className="w-3 h-3 text-[#D29324]" />
                <span className="text-[11px] font-bold text-[#6B7280] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-extrabold text-[#252525] focus:outline-hidden cursor-pointer"
                >
                  <option value="relevance">Relevance</option>
                  <option value="most-recent">Most Recent</option>
                  <option value="price-low">Price - Low to High</option>
                  <option value="price-high">Price - High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Expandable Filter Drawer Panel */}
          {showFilterDrawer && (
            <div className="mt-3 pt-3 border-t border-[#E8E3DA] grid grid-cols-1 sm:grid-cols-4 gap-3 animate-in fade-in duration-200">
              {/* BHK Filter */}
              <div>
                <label className="text-[10px] font-bold uppercase text-[#6B7280] block mb-1">
                  BHK Configuration
                </label>
                <select
                  value={selectedBhk}
                  onChange={(e) => setSelectedBhk(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E8E3DA] text-xs font-bold text-[#252525] bg-[#FAF8F4]"
                >
                  <option value="all">All Configurations</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4+ BHK</option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label className="text-[10px] font-bold uppercase text-[#6B7280] block mb-1">
                  Budget Range
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E8E3DA] text-xs font-bold text-[#252525] bg-[#FAF8F4]"
                >
                  <option value="all">All Budgets</option>
                  <option value="under-1cr">Under ₹1 Crore</option>
                  <option value="1cr-2.5cr">₹1 Cr - ₹2.5 Cr</option>
                  <option value="above-2.5cr">Above ₹2.5 Crore</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="text-[10px] font-bold uppercase text-[#6B7280] block mb-1">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E8E3DA] text-xs font-bold text-[#252525] bg-[#FAF8F4]"
                >
                  <option value="all">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa / Penthouse</option>
                </select>
              </div>

              {/* Reset Actions */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="w-full py-1.5 rounded-lg border border-[#E8E3DA] text-xs font-bold text-[#AE7419] hover:bg-[#FBF1DF] transition-all flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Category H1 & Introductory Banner Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF1DF] text-[#AE7419] text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Zero Brokerage Verified Allotments</span>
              </div>

              {/* Exact Reference H1 */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#252525] tracking-tight">
                {categoryConfig.h1Template(matchedCity.name)}
              </h1>

              <p className="text-xs sm:text-sm text-[#6B7280] max-w-3xl leading-relaxed">
                {categoryConfig.metaDesc(matchedCity.name)}
              </p>
            </div>

            <div className="text-left lg:text-right shrink-0">
              <span className="text-xs font-bold text-[#6B7280] block">Available Inventory</span>
              <div className="text-2xl font-black text-[#D29324]">
                {filteredProperties.length}+ Properties
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Pills Row matching PropertyPistol */}
          <div className="pt-3 border-t border-[#E8E3DA] flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categoryConfig.pills.map((pill) => {
              const isActive = selectedPill === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedPill(pill.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#D29324] text-white shadow-xs"
                      : "bg-[#FAF8F4] border border-[#E8E3DA] text-[#6B7280] hover:text-[#252525] hover:border-gray-400"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Property Cards Grid */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E3DA] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FBF1DF] text-[#D29324] flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#252525]">
              No {categoryConfig.label} Found with Current Criteria
            </h3>
            <p className="text-xs text-[#6B7280] max-w-md mx-auto">
              Try adjusting your BHK selection or budget slider to explore more verified developments in {matchedCity.name}.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.slice(0, visibleCount).map((project, idx) => {
              const activeIdx = activeImageIndexes[project.id] || 0;
              const isSaved = !!wishlist[project.id];
              const projectSlug = getProjectSlug(project);
              const images = project.images || [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
              ];

              return (
                <div
                  key={project.id || idx}
                  className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Photo Carousel Container */}
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    <Link href={`/projects/${projectSlug}`} className="block w-full h-full">
                      <img
                        src={images[activeIdx]}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Category & Status Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#D29324] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                        {categoryConfig.label}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                        {project.status}
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3 z-20">
                      <WishlistButton project={project} size="md" variant="floating" />
                    </div>

                    {/* Image Prev/Next Navigation */}
                    {images.length > 1 && (
                      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => handlePrevImage(project.id, images.length, e)}
                          className="w-7 h-7 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleNextImage(project.id, images.length, e)}
                          className="w-7 h-7 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Price Tag Overlay */}
                    <Link href={`/projects/${projectSlug}`} className="absolute bottom-3 inset-x-3 flex items-end justify-between z-10 text-white">
                      <div>
                        <div className="text-xl font-black drop-shadow-sm">
                          ₹{project.price}
                        </div>
                        <div className="text-[10px] text-gray-200 font-semibold drop-shadow-xs">
                          {project.avgPrice}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded text-gray-200 font-mono">
                          {project.rera ? "RERA Verified" : "Direct Allotment"}
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                        <Building className="w-3.5 h-3.5 text-[#D29324] shrink-0" />
                        <span className="font-extrabold text-[#252525] truncate">{project.builder}</span>
                      </div>

                      <Link href={`/projects/${projectSlug}`}>
                        <h3 className="text-base font-extrabold text-[#252525] line-clamp-1 group-hover:text-[#AE7419] transition-colors">
                          {project.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                        <MapPin className="w-3.5 h-3.5 text-[#AE7419] shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>

                      {/* Configurations & Carpet Area */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E3DA] text-xs">
                        <div>
                          <span className="text-[10px] text-[#6B7280] block">Configurations</span>
                          <span className="font-bold text-[#252525]">{project.flatTypes}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#6B7280] block">Carpet Area</span>
                          <span className="font-bold text-[#252525]">{project.carpetArea}</span>
                        </div>
                      </div>

                      {/* Amenities Pills */}
                      {project.features && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {project.features.slice(0, 3).map((feat, fIdx) => (
                            <span
                              key={fIdx}
                              className="px-2 py-0.5 rounded-md bg-[#FAF8F4] text-[10px] font-semibold text-[#6B7280] border border-[#E8E3DA]"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-[#E8E3DA] flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setInquiryProject(project)}
                        className="flex-1 py-2.5 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Callback</span>
                      </button>

                      <Link
                        href={`/projects/${projectSlug}`}
                        className="px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-white text-[#252525] hover:text-[#AE7419] text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
                      >
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() => showToast(`Brochure for ${project.name} will be emailed to you.`)}
                        className="p-2.5 rounded-xl border border-[#E8E3DA] text-[#6B7280] hover:text-[#AE7419] hover:bg-[#FAF8F4] transition-all cursor-pointer"
                        title="Download Brochure"
                      >
                        <Download className="w-4 h-4" />
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
              className="px-8 py-3 rounded-2xl bg-white border border-[#D29324] text-[#AE7419] hover:bg-[#D29324] hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Load More Properties ({filteredProperties.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* 4. In-Depth Category Guide / Overview matching PropertyPistol */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] space-y-4 shadow-xs">
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

        {/* 5. Category-Specific FAQs Accordion matching PropertyPistol */}
        {cityFaqs && cityFaqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] space-y-6 shadow-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-2.5 py-0.5 rounded-full inline-block mb-1">
                Got Questions?
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#252525] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#D29324]" />
                <span>Frequently Asked Questions about {categoryConfig.label} in {matchedCity.name}</span>
              </h2>
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

        {/* 6. Quick Free Expert Consultation Banner */}
        <div className="bg-gradient-to-r from-[#252525] to-[#3a3a3a] text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFE2A7] bg-white/10 px-3 py-1 rounded-full inline-block">
              Zero Brokerage VIP Advisory
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Need Assistance Shortlisting {categoryConfig.label} in {matchedCity.name}?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Connect with certified local advisors for direct developer allotments, transparent site tours, and zero brokerage assistance.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setInquiryProject({
                id: `advisory-${categoryConfig.id}-${matchedCity.id}`,
                name: `${categoryConfig.label} VIP Advisory in ${matchedCity.name}`,
                city: matchedCity.name
              });
            }}
            className="px-6 py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
          >
            Request Free Advisory Callback
          </button>
        </div>

      </main>

      {/* 7. Global Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={matchedCity.id}
        onSelectCity={handleCityChange}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <ProjectInquiryModal
        isOpen={!!inquiryProject}
        onClose={() => setInquiryProject(null)}
        project={inquiryProject}
      />
    </div>
  );
}
