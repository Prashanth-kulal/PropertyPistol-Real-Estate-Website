"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Building2,
  Award,
  Search,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Filter
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import EmiCalculatorModal from "@/components/common/EmiCalculatorModal";
import UnitConverterModal from "@/components/common/UnitConverterModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import ProjectInquiryModal from "@/components/common/ProjectInquiryModal";

import { DEVELOPERS_DATA } from "@/data/developersData";

export default function DevelopersDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  // Modals state
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [isConverterModalOpen, setIsConverterModalOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState(null);

  // Filter developers by search and city
  const filteredDevelopers = useMemo(() => {
    let list = [...DEVELOPERS_DATA];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.tagline.toLowerCase().includes(q) ||
          d.aboutUs.toLowerCase().includes(q)
      );
    }

    if (selectedCity !== "all") {
      list = list.filter((d) =>
        d.cities?.some((c) => c.citySlug === selectedCity.toLowerCase())
      );
    }

    return list;
  }, [searchQuery, selectedCity]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* 1. Global Header */}
      <Header
        selectedCity="mumbai"
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF8F4] border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-xs text-[#6B7280]">
            <li>
              <Link href="/" className="hover:text-[#AE7419] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="font-semibold text-[#252525]">Developers Directory</li>
          </ol>
        </div>
      </nav>

      {/* 3. Hero Banner */}
      <section className="bg-gradient-to-b from-[#FAF8F4] to-white border-b border-[#E8E3DA] py-10 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-[#D29324]" />
            <span>Grade-A Real Estate Developers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#252525] tracking-tight">
            2,000+ Developers Under One Roof
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280] mt-3 leading-relaxed">
            Browse India&apos;s most reputable real estate developers. Discover verified upcoming and ongoing residential developments with zero brokerage VIP advisory.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search developers by name (e.g. Godrej, Lodha, L&T, Prestige)..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#E8E3DA] rounded-2xl text-sm focus:outline-hidden focus:border-[#D29324] shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 4. Directory Grid */}
      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8E3DA]">
          <div className="text-sm font-bold text-[#252525]">
            Showing <span className="text-[#AE7419]">{filteredDevelopers.length}</span> Developers
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#6B7280] hidden sm:inline">Filter by City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-[#FAF8F4] border border-[#E8E3DA] rounded-xl px-3 py-1.5 text-xs font-bold text-[#252525] focus:outline-hidden focus:border-[#D29324] cursor-pointer"
            >
              <option value="all">All Cities</option>
              <option value="mumbai">Mumbai</option>
              <option value="pune">Pune</option>
              <option value="bangalore">Bangalore</option>
            </select>
          </div>
        </div>

        {filteredDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDevelopers.map((dev) => (
              <Link
                key={dev.slug}
                href={`/developers/${dev.slug}`}
                className="p-5 rounded-2xl border border-[#E8E3DA] bg-[#FAF8F4] hover:bg-white hover:border-[#D29324] hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-14 h-14 rounded-xl bg-white border border-[#E8E3DA] p-1.5 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#D29324] transition-colors overflow-hidden">
                      {dev.logo ? (
                        <img
                          src={dev.logo}
                          alt={dev.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full rounded-lg bg-[#FBF1DF] text-[#AE7419] font-bold text-lg flex items-center justify-center">
                          {dev.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors truncate">
                        {dev.name}
                      </h3>
                      <div className="inline-flex items-center gap-1 text-xs text-[#D29324] font-semibold mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{dev.projectCount}</span>
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        Est. {dev.established} • {dev.experience}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4">
                    {dev.aboutUs}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E3DA] flex items-center justify-between text-xs font-bold text-[#AE7419]">
                  <span>Explore Developer Portfolio</span>
                  <div className="w-7 h-7 rounded-full bg-[#FBF1DF] group-hover:bg-[#D29324] text-[#AE7419] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA] space-y-3">
            <h3 className="text-base font-bold text-[#252525]">
              No developers match your search &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-[#6B7280]">Try searching for Godrej, Lodha, L&T, or Prestige.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCity("all");
              }}
              className="px-4 py-2 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-colors cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}
      </main>

      {/* 5. Modals */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity="mumbai"
        onSelectCity={() => {}}
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
        onSelectProject={() => {}}
      />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
