"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  X,
  Share2,
  ExternalLink,
  ArrowLeft,
  Check,
  Building,
  MapPin,
  Calendar,
  Layers,
  FileCheck,
  Compass,
  PhoneCall,
  Download,
  CheckCircle2
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectInquiryModal from "@/components/common/ProjectInquiryModal";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import { useComparison, resolveCompareProject, MAX_COMPARE_PROJECTS } from "@/context/ComparisonContext";
import { getProjectSlug } from "@/data/projectsData";

function ComparePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    selectedProjects,
    removeCompare,
    clearAllCompare,
    isLoaded,
    triggerToast
  } = useComparison();

  const [inquiryProject, setInquiryProject] = useState(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [activeToast, setActiveToast] = useState("");

  const showToast = (msg) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(""), 3500);
  };

  // If query params are provided (e.g. ?projects=godrej-ascend,lodha-corinthia)
  // Resolve projects from URL if context is empty or syncing
  const urlProjectsParam = searchParams.get("projects");
  const resolvedProjects = useMemo(() => {
    if (urlProjectsParam) {
      const slugsOrIds = urlProjectsParam.split(",").map((s) => s.trim()).filter(Boolean);
      const fromUrl = slugsOrIds.map((id) => resolveCompareProject(id)).filter(Boolean);
      if (fromUrl.length > 0) return fromUrl.slice(0, MAX_COMPARE_PROJECTS);
    }
    return selectedProjects;
  }, [urlProjectsParam, selectedProjects]);

  const handleShare = async () => {
    try {
      const slugs = resolvedProjects.map((p) => p.slug || p.id).join(",");
      const shareUrl = `${window.location.origin}/compare?projects=${encodeURIComponent(slugs)}`;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedShareLink(true);
        showToast("Comparison link copied to clipboard!");
        setTimeout(() => setCopiedShareLink(false), 2500);
      }
    } catch (e) {
      showToast("Comparison link ready to share");
    }
  };

  const projectTitlesList = resolvedProjects.map((p) => p.title || p.name).join(", ");

  // Attributes list matching Screenshot 3
  const comparisonRows = [
    {
      id: "builder",
      label: "Builder Name",
      render: (p) => p.builder || "Not available"
    },
    {
      id: "location",
      label: "Location",
      render: (p) => p.fullAddress || p.location || "Not available"
    },
    {
      id: "configurations",
      label: "Configuration Available",
      render: (p) => p.configuration || p.flatTypes || "Not available"
    },
    {
      id: "carpetArea",
      label: "Carpet Area",
      render: (p) => p.carpetArea || "Not available"
    },
    {
      id: "minPricePerSqft",
      label: "Min Price Per Sqft",
      render: (p) => p.minPricePerSqft || p.avgPrice || "Not available"
    },
    {
      id: "possessionStatus",
      label: "Possession Status",
      render: (p) => p.possessionStatus || p.status || "Not available"
    },
    {
      id: "possessionDate",
      label: "Possession Date",
      render: (p) => p.possessionDate || p.possession || "Not available"
    },
    {
      id: "projectArea",
      label: "Project Area",
      render: (p) => p.projectArea || "Not available"
    },
    {
      id: "rera",
      label: "RERA",
      render: (p) => {
        if (!p.rera) return "Not available";
        return (
          <span className="text-blue-600 font-mono text-xs font-semibold leading-relaxed break-all">
            {p.rera}
          </span>
        );
      }
    },
    {
      id: "description",
      label: "Project Description",
      render: (p) => p.description || p.overview || "Not available"
    },
    {
      id: "startingPrice",
      label: "Starting Price",
      render: (p) => (p.price ? `₹${p.price}` : "Not available")
    },
    {
      id: "amenities",
      label: "Key Amenities",
      render: (p) => {
        const list = Array.isArray(p.features)
          ? p.features
          : Array.isArray(p.amenities)
          ? p.amenities.map((a) => (typeof a === "string" ? a : a.name))
          : [];
        if (list.length === 0) return "Not available";
        return (
          <div className="flex flex-wrap gap-1.5">
            {list.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-[#FAF8F4] border border-[#E8E3DA] text-[11px] font-medium text-gray-700"
              >
                {item}
              </span>
            ))}
          </div>
        );
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* Toast Alert */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#252525] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
          <span>{activeToast}</span>
        </div>
      )}

      {/* 1. Global Header */}
      <Header
        selectedCity="mumbai"
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-gray-100">
          <Link
            href="/mumbai/buy/new-projects-in-mumbai"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#EA580C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to New Projects</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/mumbai/buy/new-projects-in-mumbai" className="hover:text-gray-700">New Projects</Link>
            <span>/</span>
            <span className="text-[#EA580C] font-bold">Compare</span>
          </nav>
        </div>

        {/* Empty State */}
        {resolvedProjects.length === 0 ? (
          <div className="bg-[#FAF8F4] border border-[#E8E3DA] rounded-3xl p-12 text-center max-w-xl mx-auto my-12 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#FBF1DF] text-[#D29324] flex items-center justify-center mx-auto shadow-inner">
              <Compass className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#252525]">
              No Projects Selected for Comparison
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Select up to 3 projects from our verified New Projects catalog to evaluate configurations, carpet area, possession dates, RERA approvals, and pricing side-by-side.
            </p>
            <div>
              <Link
                href="/mumbai/buy/new-projects-in-mumbai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-[#D29324] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Explore New Projects</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Subheader & Project Column Cards matching Screenshot 3 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start border-b border-gray-200 pb-8">
              
              {/* Left Column: Title & Share Link */}
              <div className="md:col-span-1 space-y-3">
                <span className="text-xs text-gray-500 font-medium block">
                  Comparison between
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
                  {projectTitlesList}
                </h1>
                
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#EA580C] transition-colors cursor-pointer group"
                    title="Share comparison link"
                  >
                    <Share2 className="w-4 h-4 text-gray-400 group-hover:text-[#EA580C] transition-colors" />
                    <span>{copiedShareLink ? "Link Copied!" : "Share"}</span>
                  </button>
                </div>
              </div>

              {/* Right Columns: One for each selected project */}
              <div className={`md:col-span-3 grid grid-cols-1 sm:grid-cols-${Math.min(resolvedProjects.length, 3)} gap-6`}>
                {resolvedProjects.map((project) => {
                  const id = project.id || project.slug;
                  const slug = project.slug || getProjectSlug(project);
                  const title = project.title || project.name || "Project";
                  const image =
                    Array.isArray(project.images) && project.images.length > 0
                      ? project.images[0]
                      : project.image ||
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

                  return (
                    <div
                      key={id}
                      className="bg-white rounded-2xl border border-gray-200 shadow-xs p-3.5 flex flex-col sm:flex-row gap-3.5 relative group items-start"
                    >
                      {/* Left: Image Thumbnail with Remove Button */}
                      <div className="w-full sm:w-28 md:w-32 h-28 sm:h-32 shrink-0 rounded-xl overflow-hidden relative bg-gray-100 border border-gray-100">
                        <Link href={`/projects/${slug}`} className="block w-full h-full">
                          <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>

                        {/* Top-Right Remove X Button */}
                        <button
                          type="button"
                          onClick={() => removeCompare(id)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 hover:bg-[#EA580C] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md z-10"
                          title={`Remove ${title} from comparison`}
                          aria-label={`Remove ${title}`}
                        >
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Right: Project Information & Action Buttons */}
                      <div className="flex-1 flex flex-col justify-between w-full min-w-0 space-y-2">
                        <div>
                          <Link
                            href={`/projects/${slug}`}
                            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#252525] hover:text-[#EA580C] transition-colors group/title"
                          >
                            <span className="line-clamp-1">{title}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover/title:text-[#EA580C] transition-colors shrink-0" />
                          </Link>
                          {project.builder && (
                            <span className="text-[11px] text-[#AE7419] font-bold block truncate">
                              {project.builder}
                            </span>
                          )}
                          {project.price && (
                            <span className="text-xs font-black text-[#252525] block mt-0.5">
                              ₹{project.price}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1.5 pt-1">
                          {/* Primary CTA: Contact Seller */}
                          <button
                            type="button"
                            onClick={() => setInquiryProject(project)}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#EA580C] hover:bg-[#D29324] text-white font-bold text-xs tracking-wide shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>Contact Seller</span>
                          </button>

                          {/* Secondary Link: Download Brochure */}
                          <button
                            type="button"
                            onClick={() => showToast(`Brochure for ${title} has been requested. It will be emailed to you.`)}
                            className="w-full py-0.5 text-center text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3 h-3 text-blue-500" />
                            <span>Download Brochure</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Side-by-Side Comparison Table matching Screenshot 3 */}
            <div className="overflow-x-auto no-scrollbar border border-gray-200 rounded-2xl bg-white shadow-xs">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-[#FAF8F4]/50"}
                    >
                      {/* Row Label (Sticky on horizontal scroll for mobile) */}
                      <th
                        scope="row"
                        className="w-48 sm:w-60 min-w-[180px] p-4 sm:p-5 text-xs font-bold text-gray-700 border-b border-gray-100 align-top bg-inherit"
                      >
                        {row.label}
                      </th>

                      {/* Project Columns */}
                      {resolvedProjects.map((p) => {
                        const id = p.id || p.slug;
                        return (
                          <td
                            key={id}
                            className="min-w-[240px] sm:min-w-[280px] p-4 sm:p-5 text-xs text-gray-800 border-b border-l border-gray-100 align-top leading-relaxed"
                          >
                            {row.render(p)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-12">
              <Link
                href="/mumbai/buy/new-projects-in-mumbai"
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#EA580C] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Add More Projects from New Projects Listing</span>
              </Link>

              <button
                type="button"
                onClick={clearAllCompare}
                className="text-xs font-bold text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                Clear All Comparison Projects
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
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
        selectedCity="mumbai"
        onSelectCity={(cityId) => {
          setIsCityModalOpen(false);
          router.push(`/${cityId}`);
        }}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectProject={(proj) => setInquiryProject(proj)}
      />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#EA580C] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ComparePageContent />
    </Suspense>
  );
}
