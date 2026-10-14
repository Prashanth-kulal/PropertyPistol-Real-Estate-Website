"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  ShieldCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Calendar,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Calculator
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectInquiryModal from "@/components/common/ProjectInquiryModal";
import EmiCalculatorModal from "@/components/common/EmiCalculatorModal";
import UnitConverterModal from "@/components/common/UnitConverterModal";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";

import { DEVELOPERS_DATA } from "@/data/developersData";
import { PROJECTS } from "@/data";

function ProjectDetailContent() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  // Search project from DEVELOPERS_DATA cities or PROJECTS
  const project = useMemo(() => {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();

    // 1. Search in developer projects
    for (const dev of DEVELOPERS_DATA) {
      for (const city of dev.cities || []) {
        for (const p of city.projects || []) {
          if (
            p.slug === cleanSlug ||
            p.id === cleanSlug ||
            p.title.toLowerCase().replace(/[^a-z0-9]/g, "-") === cleanSlug
          ) {
            return { ...p, developerData: dev };
          }
        }
      }
    }

    // 2. Search in global PROJECTS
    const foundInGlobal = PROJECTS.find(
      (p) =>
        p.id === cleanSlug ||
        p.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === cleanSlug
    );
    if (foundInGlobal) {
      return {
        id: foundInGlobal.id,
        slug: cleanSlug,
        title: foundInGlobal.name,
        builder: foundInGlobal.builder,
        city: foundInGlobal.city,
        location: foundInGlobal.location,
        status: foundInGlobal.status,
        price: foundInGlobal.price,
        avgPrice: foundInGlobal.avgPrice,
        flatTypes: foundInGlobal.flatTypes,
        carpetArea: foundInGlobal.carpetArea,
        rera: foundInGlobal.rera,
        rating: foundInGlobal.rating,
        tag: foundInGlobal.tag,
        images: foundInGlobal.images,
        features: foundInGlobal.features
      };
    }

    // Fallback default project
    return {
      id: "godrej-ascend",
      slug: "godrej-ascend",
      title: "Godrej Ascend",
      builder: "Godrej Properties",
      city: "mumbai",
      location: "Dhokali, Thane, Mumbai",
      status: "Ongoing",
      price: "1.07 Cr onwards",
      avgPrice: "₹28.08 K / sq.ft",
      flatTypes: "1, 2 & 3 BHK",
      carpetArea: "381 - 1,058 sq.ft",
      rera: "P51700034608",
      rating: 4.8,
      tag: "Trending",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Clubhouse", "Infinity Swimming Pool", "Landscaped Sky Deck", "EV Charging Station"]
    };
  }, [slug]);

  // Image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Modals
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isEmiOpen, setIsEmiOpen] = useState(false);
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = project?.images || [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  ];

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
        selectedCity={project?.city || "mumbai"}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. Breadcrumbs Bar */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF8F4] border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <ol className="flex items-center gap-2 text-xs text-[#6B7280]">
            <li>
              <Link href="/" className="hover:text-[#AE7419] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            {project?.developerData ? (
              <>
                <li>
                  <Link
                    href={`/developers/${project.developerData.slug}`}
                    className="hover:text-[#AE7419] transition-colors"
                  >
                    {project.builder}
                  </Link>
                </li>
                <li className="text-gray-300">/</li>
              </>
            ) : null}
            <li className="font-semibold text-[#252525] truncate max-w-xs">
              {project?.title}
            </li>
          </ol>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#AE7419] hover:text-[#D29324] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>
      </nav>

      {/* 3. Hero Visual Section */}
      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative h-80 sm:h-[460px] rounded-3xl overflow-hidden bg-gray-100 border border-[#E8E3DA] shadow-md">
              <img
                src={images[activeImageIndex]}
                alt={project?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#D29324] text-white shadow-sm">
                  {project?.tag || "Featured Development"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-[#252525] backdrop-blur-xs">
                  {project?.status}
                </span>
              </div>

              {images.length > 1 && (
                <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={() =>
                      setActiveImageIndex(
                        (prev) => (prev - 1 + images.length) % images.length
                      )
                    }
                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center pointer-events-auto transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev + 1) % images.length)
                    }
                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center pointer-events-auto transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h1 className="text-2xl sm:text-4xl font-extrabold">{project?.title}</h1>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-200 mt-1">
                  <MapPin className="w-4 h-4 text-[#D29324]" />
                  <span>{project?.location}</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === i
                        ? "border-[#D29324] shadow-md"
                        : "border-[#E8E3DA] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Specs Card */}
            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA] space-y-4">
              <h2 className="text-lg font-bold text-[#252525]">Property Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E8E3DA]">
                  <span className="text-[#6B7280] block font-medium">Pricing</span>
                  <span className="text-sm font-extrabold text-[#AE7419]">
                    ₹{project?.price}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E8E3DA]">
                  <span className="text-[#6B7280] block font-medium">Typology</span>
                  <span className="text-sm font-extrabold text-[#252525]">
                    {project?.flatTypes}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E8E3DA]">
                  <span className="text-[#6B7280] block font-medium">Carpet Area</span>
                  <span className="text-sm font-extrabold text-[#252525]">
                    {project?.carpetArea}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E8E3DA]">
                  <span className="text-[#6B7280] block font-medium">RERA Number</span>
                  <span className="text-sm font-extrabold text-[#252525] truncate block">
                    {project?.rera}
                  </span>
                </div>
              </div>

              {/* Amenities */}
              {project?.features?.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">
                    Signature Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E3DA] text-xs font-semibold text-[#252525]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D29324]" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Booking & Enquiry Box */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-white border border-[#E8E3DA] shadow-lg space-y-5 sticky top-20">
              <div>
                <span className="text-xs font-bold text-[#D29324] uppercase tracking-wider">
                  Direct Builder Inventory
                </span>
                <div className="text-2xl font-extrabold text-[#AE7419] mt-0.5">
                  ₹{project?.price}
                </div>
                <div className="text-xs text-[#6B7280]">
                  Avg. Rate: {project?.avgPrice} • Zero Brokerage Advisory
                </div>
              </div>

              {project?.developerData && (
                <Link
                  href={`/developers/${project.developerData.slug}`}
                  className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] flex items-center gap-3 hover:border-[#D29324] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E8E3DA] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    {project.developerData.logo ? (
                      <img
                        src={project.developerData.logo}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Building2 className="w-5 h-5 text-[#D29324]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-[#6B7280] block font-medium">Developed By</span>
                    <span className="text-xs font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors truncate block">
                      {project.builder}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D29324] transition-colors" />
                </Link>
              )}

              <div className="space-y-2.5">
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Request Instant Site Visit & Pricing</span>
                </button>

                <button
                  onClick={() => setIsEmiOpen(true)}
                  className="w-full py-2.5 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-[#FAF8F4] hover:bg-white text-xs font-bold text-[#252525] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#D29324]" />
                  <span>Calculate Monthly EMI</span>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full py-2.5 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-white text-xs font-bold text-[#6B7280] hover:text-[#252525] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? "Link Copied!" : "Share Project"}</span>
                </button>
              </div>

              <div className="pt-3 border-t border-[#E8E3DA] flex items-center gap-2 text-xs text-[#6B7280]">
                <ShieldCheck className="w-4 h-4 text-[#D29324] shrink-0" />
                <span>Authorized developer channel partner. No broker fees.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Modals */}
      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        project={{
          id: project?.id,
          name: project?.title,
          builder: project?.builder,
          price: project?.price,
          location: project?.location,
          flatTypes: project?.flatTypes,
          images: project?.images
        }}
      />

      <EmiCalculatorModal
        isOpen={isEmiOpen}
        onClose={() => setIsEmiOpen(false)}
      />

      <UnitConverterModal
        isOpen={isConverterOpen}
        onClose={() => setIsConverterOpen(false)}
      />

      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity="mumbai"
        onSelectCity={() => {}}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectProject={() => {}}
      />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

export default function ProjectDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#D29324] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProjectDetailContent />
    </Suspense>
  );
}
