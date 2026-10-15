"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  ShieldCheck,
  Award,
  ChevronRight,
  ChevronLeft,
  PhoneCall,
  Eye,
  SlidersHorizontal,
  ArrowUpDown,
  Download,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectInquiryModal from "@/components/common/ProjectInquiryModal";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import EmiCalculatorModal from "@/components/common/EmiCalculatorModal";
import UnitConverterModal from "@/components/common/UnitConverterModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import WishlistButton from "@/components/common/WishlistButton";

import {
  getDeveloperBySlug,
  getRelatedDevelopers,
  getAllDevelopers
} from "@/data/developersData";
import { getProjectSlug } from "@/data";

function DeveloperDetailContent() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  // Resolve developer data
  const developer = useMemo(() => {
    return getDeveloperBySlug(slug);
  }, [slug]);

  // Related developers
  const relatedDevelopers = useMemo(() => {
    return getRelatedDevelopers(developer.slug, 4);
  }, [developer.slug]);

  // Modals state
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [isConverterModalOpen, setIsConverterModalOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState(null);

  // Developer page interactive states
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeCityTab, setActiveCityTab] = useState(
    developer.cities?.[0]?.citySlug || "mumbai"
  );
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'Ongoing' | 'Upcoming'
  const [sortBy, setSortBy] = useState("recommended"); // 'recommended' | 'price-asc' | 'price-desc' | 'area-desc'
  const [projectImageIndexes, setProjectImageIndexes] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Active city object
  const activeCity = useMemo(() => {
    return (
      developer.cities?.find((c) => c.citySlug === activeCityTab) ||
      developer.cities?.[0]
    );
  }, [developer, activeCityTab]);

  // Filtered & sorted projects for the active city
  const displayedProjects = useMemo(() => {
    if (!activeCity || !activeCity.projects) return [];

    let list = [...activeCity.projects];

    // Status filter
    if (statusFilter !== "all") {
      list = list.filter((p) => p.status === statusFilter);
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.priceNumeric - a.priceNumeric);
    } else if (sortBy === "area-desc") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCity, statusFilter, sortBy]);

  const handleNextImage = (projId, total, e) => {
    e.stopPropagation();
    setProjectImageIndexes((prev) => ({
      ...prev,
      [projId]: ((prev[projId] || 0) + 1) % total
    }));
  };

  const handlePrevImage = (projId, total, e) => {
    e.stopPropagation();
    setProjectImageIndexes((prev) => ({
      ...prev,
      [projId]: ((prev[projId] || 0) - 1 + total) % total
    }));
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* 1. Global Header */}
      <Header
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. Breadcrumbs Bar */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF8F4] border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center flex-wrap gap-2 text-xs text-[#6B7280]">
            <li>
              <Link href="/" className="hover:text-[#AE7419] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <Link href="/developers" className="hover:text-[#AE7419] transition-colors">
                Developers
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="font-semibold text-[#252525] truncate max-w-xs">
              {developer.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* 3. Hero Header Banner */}
      <section className="bg-gradient-to-b from-[#FAF8F4] to-white border-b border-[#E8E3DA] py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Developer Branding */}
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 border-[#E8E3DA] p-2 flex items-center justify-center shrink-0 shadow-md">
                {developer.logo ? (
                  <img
                    src={developer.logo}
                    alt={developer.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-[#FBF1DF] text-[#AE7419] font-extrabold text-2xl flex items-center justify-center">
                    {developer.name.charAt(0)}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D29324]" />
                    <span>RERA Compliant Grade-A Developer</span>
                  </span>
                  <span className="text-xs text-[#6B7280]">
                    Established {developer.established}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
                  Properties by {developer.name}
                </h1>
                <p className="text-sm text-[#6B7280] mt-1 max-w-2xl font-medium">
                  {developer.tagline}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleShare}
                className="px-4 py-2.5 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-white text-xs font-semibold text-[#252525] hover:text-[#AE7419] transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#D29324]" />
                <span>{copiedLink ? "Link Copied!" : "Share Profile"}</span>
              </button>

              <button
                onClick={() =>
                  setInquiryProject({
                    id: developer.slug,
                    name: `${developer.name} Priority Portfolio`,
                    builder: developer.name,
                    price: "Direct Builder Quote",
                    location: `${activeCity?.name || "Pan-India"} Region`,
                    flatTypes: "Exclusive Residential Enquiries",
                    images: [developer.featuredProjects?.[0]?.image || developer.logo]
                  })
                }
                className="px-5 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Enquire with Specialist</span>
              </button>
            </div>
          </div>

          {/* Developer Performance Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-[#E8E3DA]">
            {developer.stats?.map((st, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] text-center"
              >
                <div className="text-xs text-[#6B7280] font-medium">{st.label}</div>
                <div className="text-lg sm:text-xl font-extrabold text-[#252525] mt-0.5">
                  {st.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sub-Navigation Sticky Jump Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E8E3DA] shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar text-xs font-bold py-3.5">
            <a
              href="#overview"
              className="text-[#AE7419] border-b-2 border-[#D29324] pb-1 min-w-max hover:text-[#AE7419]"
            >
              Overview & Heritage
            </a>
            <a
              href="#projects"
              className="text-[#6B7280] hover:text-[#252525] pb-1 min-w-max transition-colors"
            >
              Residential Projects ({displayedProjects.length})
            </a>
            <a
              href="#related-developers"
              className="text-[#6B7280] hover:text-[#252525] pb-1 min-w-max transition-colors"
            >
              Similar Developers
            </a>
          </div>
        </div>
      </div>

      {/* 5. Main Content Area */}
      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">
        {/* Section: Overview & Description with Expandable Toggle */}
        <section id="overview" className="scroll-mt-24">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D29324] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Developer Heritage</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#252525]">
              About {developer.name}
            </h2>
            <p className="text-sm text-[#252525] leading-relaxed mt-2 font-medium">
              {developer.aboutUs}
            </p>

            <div className="mt-4 pt-4 border-t border-[#E8E3DA]">
              <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">
                Company Background & Construction Philosophy
              </h3>
              <div
                className={`text-sm text-[#6B7280] leading-relaxed whitespace-pre-line ${
                  isDescriptionExpanded ? "" : "line-clamp-3"
                }`}
              >
                {developer.description}
              </div>

              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-3 text-xs font-bold text-[#AE7419] hover:text-[#D29324] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{isDescriptionExpanded ? "Read Less" : "Read More"}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isDescriptionExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Section: City-Wise Project Showcase */}
        <section id="projects" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D29324] uppercase tracking-wider mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Prime Residential Inventory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                Explore {developer.name} Projects in {activeCity?.name || "India"}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                Verified RERA pricing, architectural blueprints, and direct builder availability.
              </p>
            </div>

            {/* City Selector Pills (if developer operates in multiple cities) */}
            {developer.cities?.length > 1 && (
              <div className="flex items-center gap-2 p-1 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] overflow-x-auto no-scrollbar">
                {developer.cities.map((c) => (
                  <button
                    key={c.citySlug}
                    onClick={() => {
                      setActiveCityTab(c.citySlug);
                      setStatusFilter("all");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeCityTab === c.citySlug
                        ? "bg-[#D29324] text-white shadow-xs"
                        : "text-[#6B7280] hover:text-[#252525]"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Working Filters & Sorting Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA] mb-8">
            {/* Status Pills: All, Ongoing, Upcoming */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-white text-[#AE7419] border border-[#D29324] shadow-xs"
                    : "text-[#6B7280] hover:text-[#252525] border border-transparent"
                }`}
              >
                All Projects ({activeCity?.projects?.length || 0})
              </button>

              <button
                onClick={() => setStatusFilter("Ongoing")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "Ongoing"
                    ? "bg-white text-[#AE7419] border border-[#D29324] shadow-xs"
                    : "text-[#6B7280] hover:text-[#252525] border border-transparent"
                }`}
              >
                Ongoing ({activeCity?.ongoingCount || 0})
              </button>

              <button
                onClick={() => setStatusFilter("Upcoming")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "Upcoming"
                    ? "bg-white text-[#AE7419] border border-[#D29324] shadow-xs"
                    : "text-[#6B7280] hover:text-[#252525] border border-transparent"
                }`}
              >
                Upcoming ({activeCity?.upcomingCount || 0})
              </button>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#6B7280] flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Sort By:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E8E3DA] rounded-xl px-3 py-1.5 text-xs font-bold text-[#252525] focus:outline-hidden focus:border-[#D29324] cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Top Rated First</option>
              </select>
            </div>
          </div>

          {/* Project Listings Grid */}
          {displayedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project) => {
                const activeImgIdx = projectImageIndexes[project.id] || 0;
                const projectSlug = project.slug || getProjectSlug(project);
                const images = project.images || [
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                ];

                return (
                  <div
                    key={project.id}
                    className="rounded-2xl border border-[#E8E3DA] bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Gallery Header with Slide Controls */}
                      <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
                        <Link href={`/projects/${projectSlug}`} className="block w-full h-full">
                          <img
                            src={images[activeImgIdx]}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none z-10">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#D29324] text-white shadow-xs">
                            {project.tag || "Verified Project"}
                          </span>

                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-[#252525] backdrop-blur-xs">
                            {project.status}
                          </span>
                        </div>

                        {/* Wishlist Heart Button */}
                        <div className="absolute top-3 right-3 z-20">
                          <WishlistButton project={project} size="md" variant="floating" />
                        </div>

                        {/* Arrows for multi-image */}
                        {images.length > 1 && (
                          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                            <button
                              onClick={(e) => handlePrevImage(project.id, images.length, e)}
                              className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center pointer-events-auto transition-colors cursor-pointer"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => handleNextImage(project.id, images.length, e)}
                              className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center pointer-events-auto transition-colors cursor-pointer"
                              aria-label="Next image"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {/* Bottom Image Indicators */}
                        {images.length > 1 && (
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                            {images.map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${
                                  activeImgIdx === i ? "w-5 bg-[#D29324]" : "w-1.5 bg-white/60"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content Box */}
                      <div className="p-5 space-y-3">
                        {/* Title & Price */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link href={`/projects/${projectSlug}`}>
                              <h3 className="text-base font-extrabold text-[#252525] group-hover:text-[#AE7419] transition-colors line-clamp-1">
                                {project.title}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-[#D29324] shrink-0" />
                              <span className="truncate">{project.location}</span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-sm font-extrabold text-[#AE7419]">
                              ₹{project.price}
                            </div>
                            <div className="text-[10px] text-[#6B7280] font-medium">
                              {project.avgPrice}
                            </div>
                          </div>
                        </div>

                        {/* Config Specs Grid */}
                        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] text-xs">
                          <div>
                            <span className="text-[10px] text-[#6B7280] block font-medium uppercase tracking-wider">
                              Typology
                            </span>
                            <span className="font-bold text-[#252525]">
                              {project.flatTypes}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#6B7280] block font-medium uppercase tracking-wider">
                              Carpet Area
                            </span>
                            <span className="font-bold text-[#252525]">
                              {project.carpetArea}
                            </span>
                          </div>
                        </div>

                        {/* RERA Badge */}
                        <div className="flex items-center justify-between text-[11px] text-[#6B7280] pt-1">
                          <span className="font-medium">RERA: {project.rera}</span>
                          <span className="inline-flex items-center gap-1 text-[#AE7419] font-bold">
                            ★ {project.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-5 pt-0 flex items-center gap-2">
                      <button
                        onClick={() =>
                          setInquiryProject({
                            id: project.id,
                            name: project.title,
                            builder: developer.name,
                            price: project.price,
                            location: project.location,
                            flatTypes: project.flatTypes,
                            images: project.images
                          })
                        }
                        className="flex-1 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Enquire Now</span>
                      </button>

                      <Link
                        href={`/projects/${projectSlug}`}
                        className="px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-white text-[#252525] hover:text-[#AE7419] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FBF1DF] text-[#D29324] flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#252525]">
                No projects found for current filter
              </h3>
              <p className="text-xs text-[#6B7280]">
                Try changing the status filter or select another city tab.
              </p>
              <button
                onClick={() => setStatusFilter("all")}
                className="px-4 py-2 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Section: Related Prominent Developers */}
        <section id="related-developers" className="scroll-mt-24 pt-8 border-t border-[#E8E3DA]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-bold text-[#D29324] uppercase tracking-wider mb-1">
                Explore The Market
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#252525]">
                Other Leading Grade-A Developers
              </h2>
            </div>

            <Link
              href="/developers"
              className="text-xs font-bold text-[#AE7419] hover:text-[#D29324] flex items-center gap-1"
            >
              <span>View Directory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedDevelopers.map((rel) => (
              <Link
                key={rel.slug}
                href={`/developers/${rel.slug}`}
                className="p-4 rounded-2xl border border-[#E8E3DA] bg-[#FAF8F4] hover:bg-white hover:border-[#D29324] hover:shadow-lg transition-all flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E3DA] p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#D29324] transition-colors overflow-hidden">
                  {rel.logo ? (
                    <img
                      src={rel.logo}
                      alt={rel.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-[#FBF1DF] text-[#AE7419] font-bold text-sm flex items-center justify-center">
                      {rel.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors truncate">
                    {rel.name}
                  </h4>
                  <div className="text-[11px] text-[#6B7280]">{rel.projectCount}</div>
                  <div className="text-[10px] text-[#AE7419] font-semibold mt-0.5">
                    Explore Portfolio →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 6. Global Modals */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(cityId) => setSelectedCity(cityId)}
      />

      <ProjectInquiryModal
        isOpen={!!inquiryProject}
        onClose={() => setInquiryProject(null)}
        project={inquiryProject}
      />

      <EmiCalculatorModal
        isOpen={isEmiModalOpen}
        onClose={() => setIsEmiModalOpen(false)}
      />

      <UnitConverterModal
        isOpen={isConverterModalOpen}
        onClose={() => setIsConverterModalOpen(false)}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectProject={(proj) => setInquiryProject(proj)}
      />

      {/* 7. Global Footer */}
      <Footer />
    </div>
  );
}

export default function DeveloperDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#D29324] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DeveloperDetailContent />
    </Suspense>
  );
}
