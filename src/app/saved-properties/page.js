"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Building,
  PhoneCall,
  ArrowRight,
  Trash2,
  Search,
  Sparkles,
  SlidersHorizontal,
  Home,
  CheckCircle2,
  Building2,
  ExternalLink
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WishlistButton from "@/components/common/WishlistButton";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import ProjectInquiryModal from "@/components/common/ProjectInquiryModal";
import { useWishlist } from "@/context/WishlistContext";
import { CITIES } from "@/data";

export default function SavedPropertiesPage() {
  const { savedProperties, savedCount, isLoaded, clearAllSaved, removeSave } =
    useWishlist();

  // Modals state
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState(null);

  // Search & Filter state
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProperties = useMemo(() => {
    let list = [...savedProperties];

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.builder?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      list = list.filter((p) =>
        p.status?.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }

    return list;
  }, [savedProperties, searchFilter, statusFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* 1. Global Header */}
      <Header
        selectedCity="mumbai"
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. Breadcrumbs Bar */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-[#E8E3DA] py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-xs text-[#6B7280]">
            <li>
              <Link href="/" className="hover:text-[#AE7419] transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="font-semibold text-[#252525]">Saved Properties</li>
          </ol>
        </div>
      </nav>

      {/* 3. Hero Header Section */}
      <section className="bg-gradient-to-b from-white to-[#FAF8F4] border-b border-[#E8E3DA] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-bold mb-3">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Personalized Wishlist</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#252525] tracking-tight">
                Saved Properties
              </h1>
              <p className="text-sm sm:text-base text-[#6B7280] mt-2 max-w-2xl leading-relaxed">
                Review, compare, and inquire on your shortlisted luxury apartments and residences.
                Direct builder pricing with zero brokerage advisory.
              </p>
            </div>

            {/* Quick stats / Clear action */}
            {savedCount > 0 && (
              <div className="flex items-center gap-3 shrink-0">
                <div className="px-4 py-2.5 rounded-xl bg-white border border-[#E8E3DA] text-xs font-bold text-[#252525] shadow-2xs">
                  <span className="text-[#D29324]">{savedCount}</span> {savedCount === 1 ? "Property" : "Properties"} Saved
                </div>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to clear all saved properties?")) {
                      clearAllSaved();
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 hover:border-rose-300 bg-white hover:bg-rose-50 text-rose-600 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Clear all saved properties"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>

          {/* Filter & Search Bar (Only shown if items exist) */}
          {savedCount > 0 && (
            <div className="mt-8 pt-6 border-t border-[#E8E3DA] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter by project, builder, or location..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E8E3DA] text-xs font-medium text-[#252525] focus:outline-hidden focus:border-[#D29324] shadow-2xs placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === "all"
                      ? "bg-[#D29324] text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-[#FBF1DF] border border-[#E8E3DA]"
                  }`}
                >
                  All ({savedProperties.length})
                </button>
                <button
                  onClick={() => setStatusFilter("Ready to Move")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === "Ready to Move"
                      ? "bg-[#D29324] text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-[#FBF1DF] border border-[#E8E3DA]"
                  }`}
                >
                  Ready to Move
                </button>
                <button
                  onClick={() => setStatusFilter("Under Construction")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === "Under Construction"
                      ? "bg-[#D29324] text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-[#FBF1DF] border border-[#E8E3DA]"
                  }`}
                >
                  Under Construction
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Main Body: Grid or Empty State */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {isLoaded && savedCount === 0 ? (
          /* EMPTY STATE */
          <div className="max-w-2xl mx-auto py-16 px-6 rounded-3xl bg-white border border-[#E8E3DA] shadow-sm text-center">
            {/* Heart Icon Illustration */}
            <div className="w-20 h-20 rounded-3xl bg-[#FBF1DF] border border-[#D29324]/30 text-rose-500 flex items-center justify-center mx-auto mb-6 shadow-xs animate-bounce-slow">
              <Heart className="w-10 h-10 fill-rose-500/20 text-rose-500 stroke-[1.5]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
              No Saved Properties Yet
            </h2>
            <p className="text-sm text-[#6B7280] mt-2.5 max-w-md mx-auto leading-relaxed">
              You haven&apos;t added any properties to your wishlist yet. Tap the heart icon on any property card to save homes for quick comparison and future visits.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/#top-projects"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Top Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#exclusive"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-white hover:bg-[#FAF8F4] text-[#252525] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D29324]" />
                <span>View Exclusive Showcase</span>
              </Link>
            </div>

            {/* Quick Metro Shortcuts */}
            <div className="mt-12 pt-8 border-t border-[#E8E3DA]">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                Explore Properties by City
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {CITIES.slice(0, 6).map((city) => (
                  <Link
                    key={city.id}
                    href={`/${city.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F4] hover:bg-[#FBF1DF] border border-[#E8E3DA] text-xs font-bold text-[#252525] hover:text-[#AE7419] transition-all"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : filteredProperties.length === 0 && savedCount > 0 ? (
          /* NO FILTER MATCHES */
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E3DA] p-8">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#252525]">No matching properties found</h3>
            <p className="text-xs text-[#6B7280] mt-1">Try clearing your search query or filters.</p>
            <button
              onClick={() => {
                setSearchFilter("");
                setStatusFilter("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#FAF8F4] text-xs font-bold text-[#AE7419] hover:bg-[#FBF1DF]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* PROPERTIES GRID */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
            {filteredProperties.map((project) => {
              const projectSlug = project.slug;
              const image = project.image || project.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80";

              return (
                <div
                  key={project.id || project.slug}
                  className="property-card bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden flex flex-col sm:flex-row shadow-xs hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Left: Card Image Area */}
                  <div className="w-full sm:w-[220px] md:w-[250px] shrink-0 relative min-h-[190px] sm:min-h-full overflow-hidden bg-gray-100">
                    <Link href={`/projects/${projectSlug}`} className="block w-full h-full">
                      <img
                        src={image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                    {/* Left Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md bg-[#D29324] text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                        {project.tag || "Verified"}
                      </span>
                      {project.status && (
                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
                          {project.status}
                        </span>
                      )}
                    </div>

                    {/* Right Wishlist Heart Button with instant remove */}
                    <div className="absolute top-3 right-3 z-20">
                      <WishlistButton
                        project={project}
                        size="md"
                        variant="floating"
                      />
                    </div>

                    {/* Price Banner Overlay */}
                    <Link
                      href={`/projects/${projectSlug}`}
                      className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between z-10"
                    >
                      <div>
                        <div className="text-lg font-extrabold tracking-tight drop-shadow-sm">
                          ₹{project.price}
                        </div>
                        {project.avgPrice && (
                          <div className="text-[10px] text-gray-200">
                            {project.avgPrice}
                          </div>
                        )}
                      </div>
                      {project.rera && (
                        <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[9px] text-gray-200 font-mono">
                          RERA Verified
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* Right: Card Body & Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      {/* Builder & Title */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-bold text-[#AE7419] uppercase tracking-wide block truncate">
                            {project.builder}
                          </span>
                          <Link href={`/projects/${projectSlug}`}>
                            <h3 className="text-base sm:text-lg font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors line-clamp-1">
                              {project.name}
                            </h3>
                          </Link>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-[#FAF8F4] border border-[#E8E3DA] flex items-center justify-center text-[#D29324] shrink-0 font-bold text-xs">
                          {project.builder?.charAt(0) || "A"}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                        <MapPin className="w-3.5 h-3.5 text-[#D29324] shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E3DA] bg-[#FAF8F4] p-2.5 rounded-xl text-xs">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-medium">
                            Typology
                          </span>
                          <span className="font-bold text-[#252525] truncate block">
                            {project.flatTypes}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block font-medium">
                            Carpet Area
                          </span>
                          <span className="font-bold text-[#252525] truncate block">
                            {project.carpetArea || "Spacious Layout"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2.5 border-t border-[#E8E3DA] flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setInquiryProject({
                            id: project.id,
                            name: project.name,
                            builder: project.builder,
                            location: project.location,
                            price: project.price,
                            flatTypes: project.flatTypes,
                            images: project.images || [image]
                          })
                        }
                        className="flex-1 py-2 px-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Inquire</span>
                      </button>

                      <Link
                        href={`/projects/${projectSlug}`}
                        className="flex-1 py-2 px-3 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-white text-[#252525] hover:text-[#AE7419] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 5. Modals */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity="mumbai"
        onSelectCity={() => setIsCityModalOpen(false)}
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

      {/* 6. Global Footer */}
      <Footer />
    </div>
  );
}
